import { motion } from "framer-motion";
import { Emotion } from "@/lib/types";
import { getEmotionEmoji, getEmotionLabel, getEmotionColor } from "@/lib/saarthi-responses";

interface EmotionBadgeProps {
  emotion: Emotion;
  size?: "sm" | "md" | "lg";
}

export function EmotionBadge({ emotion, size = "md" }: EmotionBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-3 py-1 gap-1.5",
    lg: "text-base px-4 py-1.5 gap-2",
  };

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center rounded-full font-medium ${sizeClasses[size]} ${getEmotionColor(emotion)} text-primary-foreground`}
    >
      <span>{getEmotionEmoji(emotion)}</span>
      <span>{getEmotionLabel(emotion)}</span>
    </motion.span>
  );
}
