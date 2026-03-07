import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { ChatMessage } from "@/lib/types";
import { EmotionBadge } from "./EmotionBadge";
import { Bot, User } from "lucide-react";

interface ChatBubbleProps {
  message: ChatMessage;
  onPracticeAnswer?: (answer: string) => void;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser ? "gradient-primary" : "bg-secondary"
        }`}
      >
        {isUser ? (
          <User className="h-4 w-4 text-primary-foreground" />
        ) : (
          <Bot className="h-4 w-4 text-primary" />
        )}
      </div>

      <div className={`max-w-[80%] space-y-2 ${isUser ? "items-end" : "items-start"}`}>
        {!isUser && message.emotion && message.emotion !== "neutral" && (
          <EmotionBadge emotion={message.emotion} size="sm" />
        )}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "gradient-primary text-primary-foreground rounded-tr-sm"
              : "bg-card shadow-card border border-border rounded-tl-sm"
          }`}
        >
          {isUser ? (
            <p className="text-sm">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none text-card-foreground prose-headings:text-card-foreground prose-strong:text-card-foreground prose-code:text-primary">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>

        {message.practiceQuestion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl border-2 border-dashed border-saarthi-teal/30 bg-saarthi-teal/5 px-4 py-3"
          >
            <p className="text-xs font-semibold text-saarthi-teal mb-1">🧠 Micro Practice</p>
            <p className="text-sm text-foreground">{message.practiceQuestion}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
