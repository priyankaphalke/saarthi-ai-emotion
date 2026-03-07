import { LearningMode } from "@/lib/types";
import { BookOpen, GraduationCap, Briefcase } from "lucide-react";

interface LearningModeSelectorProps {
  mode: LearningMode;
  onChange: (mode: LearningMode) => void;
}

const modes: { value: LearningMode; label: string; icon: React.ReactNode; desc: string }[] = [
  { value: "simple", label: "Simple", icon: <BookOpen className="h-4 w-4" />, desc: "Stories & analogies" },
  { value: "exam", label: "Exam Ready", icon: <GraduationCap className="h-4 w-4" />, desc: "Structured answers" },
  { value: "interview", label: "Interview", icon: <Briefcase className="h-4 w-4" />, desc: "Deep & practical" },
];

export function LearningModeSelector({ mode, onChange }: LearningModeSelectorProps) {
  return (
    <div className="flex gap-2">
      {modes.map((m) => (
        <button
          key={m.value}
          onClick={() => onChange(m.value)}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
            mode === m.value
              ? "gradient-primary text-primary-foreground shadow-soft"
              : "bg-secondary text-secondary-foreground hover:bg-muted"
          }`}
        >
          {m.icon}
          <span className="hidden sm:inline">{m.label}</span>
        </button>
      ))}
    </div>
  );
}
