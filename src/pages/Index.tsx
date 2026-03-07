import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage, Emotion, LearningMode, SessionSummary } from "@/lib/types";
import { detectEmotion, detectTopic, generateResponse } from "@/lib/saarthi-responses";
import { SaarthiHeader } from "@/components/SaarthiHeader";
import { ChatBubble } from "@/components/ChatBubble";
import { ChatInput } from "@/components/ChatInput";
import { EmotionPanel } from "@/components/EmotionPanel";
import { ConfidenceMeter } from "@/components/ConfidenceMeter";
import { ConfidenceSlider } from "@/components/ConfidenceSlider";
import { LearningModeSelector } from "@/components/LearningModeSelector";
import { SessionSummaryPanel } from "@/components/SessionSummaryPanel";
import { Sparkles } from "lucide-react";

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: `## 👋 Namaste! I'm Saarthi AI\n\nI'm your emotion-aware learning companion. I'm here to help you understand difficult concepts without judgment.\n\n**Here's what I can do:**\n- 🎯 Detect how you're feeling and adapt my explanations\n- 📚 Explain in Simple, Exam-Ready, or Interview-Ready mode\n- 🧠 Give you micro practice questions\n- 📊 Track your confidence journey\n\n**Try asking me:**\n- "Explain recursion"\n- "Mujhe linked list samajh nahi aa rahi"\n- "What is OOP?"\n\nDon't worry about feeling confused — that's where learning begins! 💪`,
  emotion: "curious",
  timestamp: new Date(),
};

export default function Index() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>("neutral");
  const [confidence, setConfidence] = useState(3);
  const [previousConfidence, setPreviousConfidence] = useState<number | undefined>(undefined);
  const [learningMode, setLearningMode] = useState<LearningMode>("simple");
  const [isTyping, setIsTyping] = useState(false);
  const [emotionHistory, setEmotionHistory] = useState<Emotion[]>([]);
  const [initialConfidence] = useState(3);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    const emotion = detectEmotion(text);
    setCurrentEmotion(emotion);
    setEmotionHistory((prev) => [...prev, emotion]);
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const result = generateResponse(text, emotion, learningMode, confidence);

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: result.response,
        emotion,
        timestamp: new Date(),
        practiceQuestion: result.practiceQuestion,
      };

      setPreviousConfidence(confidence);
      setConfidence((prev) => Math.min(10, prev + result.confidenceDelta));
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const summary: SessionSummary = {
    topic: detectTopic(messages.filter((m) => m.role === "user").map((m) => m.content)),
    emotionJourney: emotionHistory,
    confidenceStart: initialConfidence,
    confidenceEnd: confidence,
    practiceAttempts: messages.filter((m) => m.practiceQuestion).length,
    practiceCorrect: Math.floor(messages.filter((m) => m.practiceQuestion).length * 0.7),
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SaarthiHeader />

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-4 p-4">
        {/* Main Chat Area */}
        <div className="flex flex-1 flex-col rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          {/* Mode Selector */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-xs font-medium text-muted-foreground">Learning Mode</span>
            <LearningModeSelector mode={learningMode} onChange={setLearningMode} />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                  <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                </div>
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-xs">Saarthi is thinking...</span>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <ChatInput onSend={handleSend} disabled={isTyping} />
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:flex w-72 flex-col gap-4">
          <EmotionPanel currentEmotion={currentEmotion} />

          <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <ConfidenceMeter value={confidence} previousValue={previousConfidence} />
          </div>

          <ConfidenceSlider value={confidence} onChange={setConfidence} />

          {emotionHistory.length > 0 && <SessionSummaryPanel summary={summary} />}
        </div>
      </div>
    </div>
  );
}
