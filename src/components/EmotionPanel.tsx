import { motion } from "framer-motion";
import { Emotion } from "@/lib/types";
import { getEmotionEmoji, getEmotionLabel, getEmotionColor } from "@/lib/saarthi-responses";

const allEmotions: Emotion[] = ["confused", "fearful", "frustrated", "curious", "confident", "neutral"];

interface EmotionPanelProps {
  currentEmotion: Emotion;
}

export function EmotionPanel({ currentEmotion }: EmotionPanelProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card space-y-3">
      <h3 className="text-sm font-bold text-foreground">🎭 Emotion Detected</h3>
      <div className="grid grid-cols-3 gap-2">
        {allEmotions.map((emotion) => (
          <motion.div
            key={emotion}
            animate={{
              scale: currentEmotion === emotion ? 1.05 : 1,
              opacity: currentEmotion === emotion ? 1 : 0.5,
            }}
            className={`flex flex-col items-center gap-1 rounded-xl p-2 text-center transition-colors ${
              currentEmotion === emotion
                ? `${getEmotionColor(emotion)} text-primary-foreground`
                : "bg-secondary"
            }`}
          >
            <span className="text-lg">{getEmotionEmoji(emotion)}</span>
            <span className="text-[10px] font-medium">{getEmotionLabel(emotion)}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
