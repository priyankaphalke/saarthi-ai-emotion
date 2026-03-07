import { motion } from "framer-motion";

interface ConfidenceMeterProps {
  value: number;
  previousValue?: number;
}

export function ConfidenceMeter({ value, previousValue }: ConfidenceMeterProps) {
  const percentage = (value / 10) * 100;
  const improved = previousValue !== undefined && value > previousValue;

  const getColor = (val: number) => {
    if (val <= 3) return "from-saarthi-pink to-saarthi-orange";
    if (val <= 6) return "from-saarthi-orange to-saarthi-teal";
    return "from-saarthi-teal to-saarthi-green";
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Confidence Level</span>
        <div className="flex items-center gap-2">
          {previousValue !== undefined && (
            <span className="text-xs text-muted-foreground">{previousValue}/10 →</span>
          )}
          <span className="text-lg font-bold text-foreground">{value}/10</span>
          {improved && (
            <motion.span
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-saarthi-green text-xs font-semibold"
            >
              ↑ +{value - previousValue!}
            </motion.span>
          )}
        </div>
      </div>
      <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: previousValue ? `${(previousValue / 10) * 100}%` : "0%" }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${getColor(value)}`}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Needs help</span>
        <span>Getting there</span>
        <span>Confident!</span>
      </div>
    </div>
  );
}
