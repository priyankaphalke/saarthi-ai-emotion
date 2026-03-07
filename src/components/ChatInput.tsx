import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border bg-card p-4">
      <div className="mx-auto flex max-w-3xl items-end gap-3">
        <div className="relative flex-1">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Saarthi anything… (Hinglish bhi chalega! 🇮🇳)"
            rows={1}
            disabled={disabled}
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            style={{ minHeight: "44px", maxHeight: "120px" }}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className="gradient-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-primary-foreground shadow-soft transition-opacity disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
}
