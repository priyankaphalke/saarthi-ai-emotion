import { Emotion, LearningMode } from "./types";

const emotionKeywords: Record<Emotion, string[]> = {
  confused: ["samajh nahi", "understand", "confused", "don't get", "kya hai", "what is", "how does", "explain", "nahi aa rahi", "nahi samjha", "what", "why"],
  fearful: ["scared", "afraid", "fear", "dar", "nervous", "anxious", "hard", "difficult", "tough", "mushkil"],
  frustrated: ["hate", "stupid", "can't", "impossible", "ugh", "frustrated", "irritating", "annoying", "kuch nahi hota"],
  curious: ["interesting", "cool", "tell me more", "what if", "how about", "explore", "aur batao", "curious"],
  confident: ["got it", "understand now", "easy", "samajh aa gaya", "clear", "makes sense", "aasan"],
  neutral: [],
};

export function detectEmotion(message: string): Emotion {
  const lower = message.toLowerCase();
  let bestEmotion: Emotion = "neutral";
  let bestScore = 0;

  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    if (emotion === "neutral") continue;
    const score = keywords.filter(k => lower.includes(k)).length;
    if (score > bestScore) {
      bestScore = score;
      bestEmotion = emotion as Emotion;
    }
  }

  return bestEmotion;
}

export function getEmotionEmoji(emotion: Emotion): string {
  const map: Record<Emotion, string> = {
    confused: "😕",
    fearful: "😰",
    frustrated: "😤",
    curious: "🤔",
    confident: "😊",
    neutral: "😐",
  };
  return map[emotion];
}

export function getEmotionLabel(emotion: Emotion): string {
  const map: Record<Emotion, string> = {
    confused: "Confused",
    fearful: "Fearful",
    frustrated: "Frustrated",
    curious: "Curious",
    confident: "Confident",
    neutral: "Neutral",
  };
  return map[emotion];
}

export function getEmotionColor(emotion: Emotion): string {
  const map: Record<Emotion, string> = {
    confused: "bg-saarthi-orange",
    fearful: "bg-saarthi-pink",
    frustrated: "bg-destructive",
    curious: "bg-saarthi-teal",
    confident: "bg-saarthi-green",
    neutral: "bg-muted-foreground",
  };
  return map[emotion];
}

const topicKeywords: Record<string, string[]> = {
  "Recursion": ["recursion", "recursive", "base case", "call stack"],
  "Linked List": ["linked list", "node", "pointer", "linked"],
  "Arrays": ["array", "index", "element", "sort"],
  "Trees": ["tree", "binary", "bst", "traversal"],
  "Sorting": ["sort", "bubble", "merge", "quick sort"],
  "OOP": ["oop", "class", "object", "inheritance", "polymorphism"],
  "Database": ["database", "sql", "query", "table", "join"],
  "Networking": ["network", "tcp", "http", "ip", "protocol"],
  "Machine Learning": ["ml", "machine learning", "neural", "ai", "model"],
  "General": [],
};

export function detectTopic(messages: string[]): string {
  const combined = messages.join(" ").toLowerCase();
  let bestTopic = "General";
  let bestScore = 0;
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (topic === "General") continue;
    const score = keywords.filter(k => combined.includes(k)).length;
    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }
  return bestTopic;
}

interface SimulatedResponse {
  response: string;
  practiceQuestion?: string;
  confidenceDelta: number;
}

export function generateResponse(
  message: string,
  emotion: Emotion,
  mode: LearningMode,
  confidence: number
): SimulatedResponse {
  const lower = message.toLowerCase();
  
  // Detect topic for tailored response
  const isRecursion = ["recursion", "recursive", "base case"].some(k => lower.includes(k));
  const isLinkedList = ["linked list", "linked", "node", "pointer"].some(k => lower.includes(k));
  const isOOP = ["oop", "class", "object", "inheritance"].some(k => lower.includes(k));

  let opener = "";
  switch (emotion) {
    case "confused":
      opener = "Don't worry! This concept can feel tricky at first, but I'm here to help you understand it step by step. 💪\n\n";
      break;
    case "fearful":
      opener = "I can see this feels a bit overwhelming, but trust me — once we break it down, you'll see it's not as scary as it seems! 🌟\n\n";
      break;
    case "frustrated":
      opener = "I understand the frustration — it's completely normal! Let's take a fresh approach and tackle this together. You've got this! 💪\n\n";
      break;
    case "curious":
      opener = "Love your curiosity! That's the best way to learn. Let's dive deeper into this! 🚀\n\n";
      break;
    case "confident":
      opener = "Great to see your confidence! Let's build on that and explore even more. 🎯\n\n";
      break;
    default:
      opener = "Great question! Let's explore this together. 📚\n\n";
  }

  let explanation = "";
  let practice = "";

  if (isRecursion) {
    if (mode === "simple") {
      explanation = `## 🎯 What is Recursion?\n\n**Simple Explanation:**\nRecursion is when a function calls itself to solve a smaller version of the same problem.\n\n**🌍 Real-World Analogy:**\nImagine you're standing in a line and want to know your position. You ask the person in front, "What's your position?" They ask the person in front of them, and so on. When the first person says "I'm #1," each person adds 1 and passes it back. That's recursion!\n\n**📝 Step-by-Step:**\n1. A function is called with a problem\n2. It checks: "Is this simple enough to solve directly?" (base case)\n3. If yes → solve it and return\n4. If no → break it into a smaller problem and call itself\n5. Results bubble back up\n\n**💡 Summary:**\nRecursion = solving big problems by breaking them into identical smaller problems, with a base case to stop.\n\n---\n*Want to go deeper? Ask me about tail recursion or recursion vs iteration!*`;
      practice = "Quick check: What happens when recursion reaches the base case? 🤔";
    } else if (mode === "exam") {
      explanation = `## 📝 Recursion – Exam Ready\n\n**Definition:**\nRecursion is a programming technique where a function calls itself directly or indirectly to solve a problem by breaking it into smaller subproblems.\n\n**Key Components:**\n1. **Base Case** – The terminating condition that stops recursion\n2. **Recursive Case** – The function calls itself with modified parameters\n3. **Call Stack** – Each call is pushed onto the stack until base case is reached\n\n**Example (Factorial):**\n\`\`\`python\ndef factorial(n):\n    if n <= 1:        # Base case\n        return 1\n    return n * factorial(n-1)  # Recursive case\n\`\`\`\n\n**Time Complexity:** O(n) for linear recursion\n**Space Complexity:** O(n) due to call stack\n\n**Types:** Direct, Indirect, Tail, Tree recursion\n\n**💡 Exam Tip:** Always mention base case and recursive case in your answer!`;
      practice = "Write the recursive formula for Fibonacci series. What's the time complexity?";
    } else {
      explanation = `## 💼 Recursion – Interview Ready\n\n**Core Concept:**\nRecursion solves problems by self-reference. Every recursive solution has a base case (termination) and recursive case (decomposition).\n\n**Why Interviewers Ask This:**\nRecursion tests your ability to think about problem decomposition, understand call stacks, and optimize solutions.\n\n**Common Interview Patterns:**\n1. **Tree/Graph Traversals** – DFS is naturally recursive\n2. **Divide & Conquer** – Merge sort, Quick sort\n3. **Dynamic Programming** – Start recursive, then memoize\n4. **Backtracking** – N-Queens, Sudoku solver\n\n**Optimization Techniques:**\n- **Memoization** – Cache results of expensive calls\n- **Tail Recursion** – Compiler optimizes stack usage\n- **Convert to Iteration** – When stack overflow is a concern\n\n**🎯 Interview Tip:** When solving recursively, always discuss:\n1. What's the base case?\n2. What's the recurrence relation?\n3. Can it be optimized with memoization?\n4. Should it be converted to iteration?\n\n**Possible Follow-up Questions:**\n- "How would you convert this to an iterative solution?"\n- "What's the space complexity of the call stack?"\n- "How does tail recursion optimization work?"`;
      practice = "Given a binary tree, how would you find its maximum depth using recursion? What's the time and space complexity?";
    }
  } else if (isLinkedList) {
    explanation = `## 🔗 Understanding Linked Lists\n\n**Simple Explanation:**\nA linked list is like a treasure hunt — each clue (node) tells you where to find the next one!\n\n**🌍 Real-World Analogy:**\nThink of a train. Each coach (node) is connected to the next one. You can only move forward by going through each coach. Unlike an array (bus with numbered seats), you can't jump to seat #5 directly.\n\n**📝 Step-by-Step:**\n1. Each node stores: **data** + **pointer to next node**\n2. The first node is called the **head**\n3. The last node points to **null** (end of list)\n4. To add/remove: just change the pointers!\n\n**vs Arrays:**\n| Feature | Array | Linked List |\n|---------|-------|-------------|\n| Access | O(1) | O(n) |\n| Insert | O(n) | O(1) |\n| Memory | Fixed | Dynamic |\n\n**💡 Summary:**\nLinked lists trade random access for efficient insertions/deletions. Great when data size is unknown!`;
    practice = "What's the difference between a singly linked list and a doubly linked list?";
  } else if (isOOP) {
    explanation = `## 🏗️ Object-Oriented Programming (OOP)\n\n**Simple Explanation:**\nOOP is a way of organizing code by grouping related data and actions together into "objects" — just like real-world things!\n\n**🌍 Real-World Analogy:**\nThink of a **Car** blueprint (class). Every car built from it (object) has properties (color, speed) and can do things (drive, brake). You can create a **SportsCar** blueprint that inherits everything from Car but adds turbo!\n\n**📝 Four Pillars:**\n1. **Encapsulation** – Hide internal details, show only what's needed\n2. **Abstraction** – Simplify complex systems into simple interfaces\n3. **Inheritance** – Create new classes from existing ones\n4. **Polymorphism** – Same action, different behaviors\n\n**💡 Summary:**\nOOP = organizing code like real-world objects with properties and behaviors. Makes code reusable, maintainable, and scalable!`;
    practice = "Can you give an example of polymorphism in real life?";
  } else {
    explanation = `## 📚 Let Me Help You!\n\nThat's a great question! Here's how I'd approach it:\n\n**🌍 Think of it simply:**\nEvery complex concept can be broken into smaller, simpler pieces. Let's start with the basics and build up.\n\n**📝 Key Points:**\n1. Start with **why** this concept matters\n2. Understand the **core idea** in simple terms\n3. See **how it connects** to things you already know\n4. Practice with **small examples** first\n\n**💡 Remember:**\nLearning is a journey, not a race. Every expert was once a beginner!\n\n*Try asking me about a specific topic like recursion, linked lists, OOP, or any CS concept, and I'll give you a detailed, personalized explanation!*`;
    practice = "Try asking me a specific concept question — I'll break it down for you!";
  }

  const confidenceDelta = emotion === "confused" ? 3 : emotion === "fearful" ? 2 : emotion === "frustrated" ? 2 : emotion === "curious" ? 2 : 1;

  return {
    response: opener + explanation,
    practiceQuestion: practice,
    confidenceDelta: Math.min(confidenceDelta, 10 - confidence),
  };
}
