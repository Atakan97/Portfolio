import { expect, test } from "vitest";
import { AnswerFilter } from "./answer-filter";
import { readCloudflareAnswer } from "./cloudflare";
import { readEventData } from "./event-stream";

test("hides reasoning when tags cross chunk boundaries", () => {
  const filter = new AnswerFilter();
  expect(filter.push("<thi")).toBe("");
  expect(filter.push("nk>private reasoning</th")).toBe("");
  expect(filter.push("ink>Merhaba, Atakan ")).toBe("Merhaba, Atakan ");
  expect(filter.push("Almanya'da çalışmaya açık.")).toBe(
    "Almanya'da çalışmaya açık.",
  );
  expect(filter.finish()).toBe("");
});

test("rejects an unfinished reasoning block", () => {
  const filter = new AnswerFilter();
  filter.push("<think>unfinished private reasoning");
  expect(() => filter.finish()).toThrow("interrupted");
});

test("reads split UTF-8 text and CRLF event boundaries", async () => {
  const bytes = new TextEncoder().encode('data: {"text":"Türkçe"}\r\n\r\n');
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const byte of bytes) controller.enqueue(new Uint8Array([byte]));
      controller.close();
    },
  });
  const events = [];
  for await (const data of readEventData(stream)) events.push(data);
  expect(events).toEqual(['{"text":"Türkçe"}']);
});

test("reads numeric content chunks from Cloudflare, including zero", async () => {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const events = [
        { choices: [{ delta: { content: "A" } }] },
        { choices: [{ delta: { content: 2 } }] },
        { choices: [{ delta: { content: " and " } }] },
        { choices: [{ delta: { content: 0 } }] },
      ];
      const text = events
        .map((event) => `data: ${JSON.stringify(event)}\n\n`)
        .join("");
      controller.enqueue(new TextEncoder().encode(`${text}data: [DONE]\n\n`));
      controller.close();
    },
  });
  let answer = "";
  for await (const text of readCloudflareAnswer(stream)) answer += text;
  expect(answer).toBe("A2 and 0");
});

test("rejects a model stream that ends without DONE", async () => {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        new TextEncoder().encode(
          'data: {"choices":[{"delta":{"content":"Partial answer"}}]}\n\n',
        ),
      );
      controller.close();
    },
  });
  const answer = readCloudflareAnswer(stream);
  expect(await answer.next()).toEqual({ value: "Partial answer", done: false });
  await expect(answer.next()).rejects.toMatchObject({ code: "INTERRUPTED" });
});
