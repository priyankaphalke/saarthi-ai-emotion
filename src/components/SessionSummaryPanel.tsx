import { motion } from "framer-motion";
import { SessionSummary, Emotion } from "@/lib/types";
import { getEmotionEmoji, getEmotionLabel } from "@/lib/saarthi-responses";
import { BookOpen, Brain, TrendingUp, CheckCircle2 } from "lucide-react";

interface SessionSummaryPanelProps {
  summary: SessionSummary;
}

export function SessionSummaryPanel({ summary }: SessionSummaryPanelProps) {
  const emotionStart = summary.emotionJourney[0] || "neutral";
  const emotionEnd = summary.emotionJourney[summary.emotionJourney.length - 1] || "neutral";

  const stats = [
    {
      icon: <BookOpen className="h-4 w-4" />,
      label: "Topic",
      value: summary.topic,
    },
    {
      icon: <Brain className="h-4 w-4" />,
      label: "Emotion Journey",
      value: `${getEmotionEmoji(emotionStart)} ${getEmotionLabel(emotionStart)} → ${getEmotionEmoji(emotionEnd)} ${getEmotionLabel(emotionEnd)}`,
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      label: "Confidence",
      value: `${summary.confidenceStart} → ${summary.confidenceEnd}`,
    },
    {
      icon: <CheckCircle2 className="h-4 w-4" />,
      label: "Practice",
      value: `${summary.practiceCorrect}/${summary.practiceAttempts} correct`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-2xl border border-border bg-card p-4 shadow-card space-y-3"
    >
      <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
        📊 Session Summary
      </h3>
      <div className="space-y-2.5">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-sm font-medium text-foreground">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
