"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { streamChatAnswer } from "@/lib/chat/client";
import { ChatServiceError } from "@/lib/chat/errors";
import {
  MAX_HISTORY_PAIRS,
  MAX_QUESTION_LENGTH,
  type ChatRequestMessage,
  type ChatErrorDetails,
} from "@/lib/chat/protocol";

interface ChatTurn {
  id: string;
  question: string;
  answer: string;
  status: "sending" | "complete" | "stopped" | "error";
}

interface ChatContextValue {
  isOpen: boolean;
  isSending: boolean;
  turns: ChatTurn[];
  error: ChatErrorDetails | undefined;
  openChat: () => void;
  closeChat: () => void;
  clearChat: () => void;
  stopAnswer: () => void;
  sendQuestion: (question: string) => Promise<void>;
  retryLastQuestion: () => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used inside ChatProvider.");
  return context;
}

export default function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [error, setError] = useState<ChatErrorDetails>();
  const activeRequest = useRef<AbortController | undefined>(undefined);
  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);

  useEffect(() => () => activeRequest.current?.abort(), []);

  function setTurnStatus(turnId: string, status: ChatTurn["status"]) {
    setTurns((currentTurns) =>
      currentTurns.map((turn) => {
        if (turn.id !== turnId) return turn;
        return { ...turn, status };
      }),
    );
  }

  function stopAnswer() {
    activeRequest.current?.abort();
    activeRequest.current = undefined;
    setIsSending(false);
    setTurns((currentTurns) =>
      currentTurns.map((turn) =>
        turn.status === "sending" ? { ...turn, status: "stopped" } : turn,
      ),
    );
  }

  function clearChat() {
    stopAnswer();
    setTurns([]);
    setError(undefined);
  }

  async function sendQuestion(question: string) {
    const trimmedQuestion = question.trim();
    if (activeRequest.current || !trimmedQuestion) return;
    if (trimmedQuestion.length > MAX_QUESTION_LENGTH) {
      setError({
        code: "QUESTION_TOO_LONG",
        message: "Please keep your question under 1,000 characters.",
      });
      return;
    }

    const history: ChatRequestMessage[] = turns
      .filter((turn) => turn.status === "complete")
      .slice(-MAX_HISTORY_PAIRS)
      .flatMap((turn) => [
        { role: "user", content: turn.question },
        { role: "assistant", content: turn.answer },
      ]);
    const requestController = new AbortController();
    activeRequest.current = requestController;
    const requestSignal = AbortSignal.any([
      requestController.signal,
      AbortSignal.timeout(45000),
    ]);
    const turnId = crypto.randomUUID();
    setError(undefined);
    setIsSending(true);
    setTurns((currentTurns) => [
      ...currentTurns,
      { id: turnId, question: trimmedQuestion, answer: "", status: "sending" },
    ]);

    try {
      for await (const answerText of streamChatAnswer(
        [...history, { role: "user", content: trimmedQuestion }],
        requestSignal,
      )) {
        if (requestController.signal.aborted) break;
        setTurns((currentTurns) =>
          currentTurns.map((turn) =>
            turn.id === turnId
              ? { ...turn, answer: turn.answer + answerText }
              : turn,
          ),
        );
      }
      setTurnStatus(
        turnId,
        requestController.signal.aborted ? "stopped" : "complete",
      );
    } catch (chatError) {
      if (requestController.signal.aborted) {
        setTurnStatus(turnId, "stopped");
      } else if (chatError instanceof ChatServiceError) {
        setError({
          code: chatError.code,
          message: chatError.message,
          retryAfter: chatError.retryAfter,
        });
        setTurnStatus(turnId, "error");
      } else {
        setTurnStatus(turnId, "error");
        throw chatError;
      }
    } finally {
      requestController.abort();
      if (activeRequest.current === requestController) {
        activeRequest.current = undefined;
        setIsSending(false);
      }
    }
  }

  function retryLastQuestion() {
    const lastTurn = turns.at(-1);
    if (!lastTurn || isSending || lastTurn.status === "complete") return;
    setTurns((currentTurns) =>
      currentTurns.filter((turn) => turn.id !== lastTurn.id),
    );
    void sendQuestion(lastTurn.question);
  }

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        isSending,
        turns,
        error,
        openChat,
        closeChat,
        clearChat,
        stopAnswer,
        sendQuestion,
        retryLastQuestion,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
