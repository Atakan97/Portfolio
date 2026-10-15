import { ChatServiceError } from "./errors";

export class AnswerFilter {
  private pendingText = "";
  private isThinking = false;

  push(text: string) {
    this.pendingText += text;
    let answer = "";

    while (this.pendingText) {
      const tag = this.isThinking ? "</think>" : "<think>";
      const tagPosition = this.pendingText.indexOf(tag);

      if (tagPosition >= 0) {
        if (!this.isThinking) answer += this.pendingText.slice(0, tagPosition);
        this.pendingText = this.pendingText.slice(tagPosition + tag.length);
        this.isThinking = !this.isThinking;
        continue;
      }

      // Keep a partial tag until the next chunk arrives.
      let partialTagLength = 0;
      for (let length = 1; length < tag.length; length++) {
        if (this.pendingText.endsWith(tag.slice(0, length)))
          partialTagLength = length;
      }

      const readyLength = this.pendingText.length - partialTagLength;
      if (!this.isThinking) answer += this.pendingText.slice(0, readyLength);
      this.pendingText = this.pendingText.slice(readyLength);
      break;
    }

    return answer;
  }

  finish() {
    if (
      this.isThinking ||
      ("<think>".startsWith(this.pendingText) && this.pendingText.length > 0)
    ) {
      throw new ChatServiceError(
        "INTERRUPTED",
        "The answer was interrupted. Please try again.",
      );
    }
    const remainingText = this.pendingText;
    this.pendingText = "";
    return remainingText;
  }
}
