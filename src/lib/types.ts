export type Emotion = "confused" | "fearful" | "frustrated" | "curious" | "confident" | "neutral";
export type LearningMode = "simple" | "exam" | "interview";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  emotion?: Emotion;
  timestamp: Date;
  practiceQuestion?: string;
}

export interface SessionSummary {
  topic: string;
  emotionJourney: Emotion[];
  confidenceStart: number;
  confidenceEnd: number;
  practiceAttempts: number;
  practiceCorrect: number;
}
