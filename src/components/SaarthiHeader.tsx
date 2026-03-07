import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function SaarthiHeader() {
  return (
    <header className="gradient-primary px-6 py-4 shadow-elevated">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/20 backdrop-blur-sm">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary-foreground tracking-tight">
              Saarthi AI
            </h1>
            <p className="text-xs text-primary-foreground/70">
              Building confidence, not just knowledge.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden sm:flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 backdrop-blur-sm"
        >
          <div className="h-2 w-2 rounded-full bg-saarthi-green animate-pulse" />
          <span className="text-xs font-medium text-primary-foreground/80">
            Emotion-Aware Tutor
          </span>
        </motion.div>
      </div>
    </header>
  );
}
