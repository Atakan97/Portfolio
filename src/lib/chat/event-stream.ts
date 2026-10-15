import { ChatServiceError } from "./errors";

export async function* readEventData(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const chunk = await reader.read();
      buffer += chunk.done
        ? decoder.decode()
        : decoder.decode(chunk.value, { stream: true });

      let separator = buffer.match(/\r?\n\r?\n/);
      while (separator && separator.index !== undefined) {
        const eventText = buffer.slice(0, separator.index);
        buffer = buffer.slice(separator.index + separator[0].length);
        const dataLines = eventText
          .split(/\r?\n/)
          .filter((line) => line.startsWith("data:"));
        if (dataLines.length > 0) {
          yield dataLines.map((line) => line.slice(5).trimStart()).join("\n");
        }
        separator = buffer.match(/\r?\n\r?\n/);
      }

      if (buffer.length > 65536) {
        throw new ChatServiceError(
          "INVALID_RESPONSE",
          "The answer could not be read. Please try again.",
        );
      }
      if (chunk.done) {
        if (buffer.trim()) {
          throw new ChatServiceError(
            "INTERRUPTED",
            "The answer was interrupted. Please try again.",
          );
        }
        break;
      }
    }
  } finally {
    reader.releaseLock();
  }
}

export function parseEventJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new ChatServiceError(
        "INVALID_RESPONSE",
        "The answer could not be read. Please try again.",
      );
    }
    throw error;
  }
}
