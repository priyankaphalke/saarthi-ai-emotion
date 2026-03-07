import { Emotion, LearningMode } from "./types";

const emotionKeywords: Record<Emotion, string[]> = {
  confused: ["samajh nahi", "understand", "confused", "don't get", "kya hai", "what is", "how does", "explain", "nahi aa rahi", "nahi samjha", "what", "why", "how"],
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
    confused: "😕", fearful: "😰", frustrated: "😤",
    curious: "🤔", confident: "😊", neutral: "😐",
  };
  return map[emotion];
}

export function getEmotionLabel(emotion: Emotion): string {
  const map: Record<Emotion, string> = {
    confused: "Confused", fearful: "Fearful", frustrated: "Frustrated",
    curious: "Curious", confident: "Confident", neutral: "Neutral",
  };
  return map[emotion];
}

export function getEmotionColor(emotion: Emotion): string {
  const map: Record<Emotion, string> = {
    confused: "bg-saarthi-orange", fearful: "bg-saarthi-pink",
    frustrated: "bg-destructive", curious: "bg-saarthi-teal",
    confident: "bg-saarthi-green", neutral: "bg-muted-foreground",
  };
  return map[emotion];
}

const topicKeywords: Record<string, string[]> = {
  "Recursion": ["recursion", "recursive", "base case", "call stack"],
  "Binary Search": ["binary search", "binary", "search algorithm", "sorted array"],
  "Linked List": ["linked list", "node", "pointer", "linked"],
  "Stack": ["stack", "push", "pop", "lifo", "last in first out"],
  "Queue": ["queue", "enqueue", "dequeue", "fifo", "first in first out"],
  "Arrays": ["array", "index", "element"],
  "Trees": ["tree", "binary tree", "bst", "traversal"],
  "Graphs": ["graph", "vertex", "edge", "bfs", "dfs", "adjacency"],
  "Sorting": ["sort", "bubble", "merge", "quick sort", "insertion sort", "selection sort"],
  "Hashing": ["hash", "hashmap", "hash table", "collision", "hashing"],
  "OOP": ["oop", "class", "object", "inheritance", "polymorphism", "encapsulation", "abstraction"],
  "Database": ["database", "sql", "query", "table", "join", "normalization"],
  "Operating System": ["os", "operating system", "process", "thread", "deadlock", "scheduling"],
  "Networking": ["network", "tcp", "http", "ip", "protocol", "osi"],
  "Dynamic Programming": ["dynamic programming", "dp", "memoization", "tabulation", "overlapping"],
  "Machine Learning": ["ml", "machine learning", "neural", "ai", "model", "training"],
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

// ── Emotion-aware openers (one line, not generic) ──────────────────
function getOpener(emotion: Emotion): string {
  switch (emotion) {
    case "confused":
      return "Good question — let's clear this up step by step. 💡\n\n";
    case "fearful":
      return "This might look intimidating, but it's simpler than you think. Let me show you. 🌟\n\n";
    case "frustrated":
      return "I get it — let's take a fresh angle and break this down properly. 💪\n\n";
    case "curious":
      return "Love the curiosity! Let's dive deep into this. 🚀\n\n";
    case "confident":
      return "Nice! Let's push your understanding even further. 🎯\n\n";
    default:
      return "Great question! Let's explore this thoroughly. 📚\n\n";
  }
}

// ── Full-depth topic responses ─────────────────────────────────────

interface TopicResponse {
  simple: string;
  exam: string;
  interview: string;
  practice: string;
}

const topicResponses: Record<string, TopicResponse> = {
  recursion: {
    simple: `## 🔄 What is Recursion?

**Concept:**
Recursion is when a function calls *itself* to solve a smaller version of the same problem. It keeps doing this until it reaches a simple case it can answer directly — called the **base case**.

**Simple Example:**
Imagine counting down from 5:
- countDown(5) → prints 5, then calls countDown(4)
- countDown(4) → prints 4, then calls countDown(3)
- ... until countDown(0) → stops! (base case)

**🌍 Real-World Analogy:**
Think of Russian nesting dolls (Matryoshka). You open the biggest doll to find a smaller one inside. You keep opening until you reach the tiniest doll that can't be opened — that's your base case!

**📝 Step-by-Step Breakdown:**
1. **Define the base case** — the simplest scenario where the function returns without calling itself
2. **Define the recursive case** — break the problem into a smaller subproblem
3. **Trust the recursion** — assume the recursive call returns the correct answer for the smaller problem
4. **Combine** — use that result to solve the current problem

**💻 Code Example:**
\`\`\`python
def factorial(n):
    # Base case: factorial of 0 or 1 is 1
    if n <= 1:
        return 1
    # Recursive case: n! = n × (n-1)!
    return n * factorial(n - 1)

print(factorial(5))  # Output: 120
# How it works: 5 × 4 × 3 × 2 × 1 = 120
\`\`\`

**How the call stack works:**
\`\`\`
factorial(5)
  → 5 × factorial(4)
    → 4 × factorial(3)
      → 3 × factorial(2)
        → 2 × factorial(1)
          → returns 1  ← base case hit!
        → returns 2 × 1 = 2
      → returns 3 × 2 = 6
    → returns 4 × 6 = 24
  → returns 5 × 24 = 120
\`\`\`

**⚡ Quick Summary:**
- Recursion = function calling itself with a smaller input
- Every recursion needs a **base case** (to stop) and a **recursive case** (to continue)
- The call stack stores each function call until the base case is reached
- Common uses: factorials, Fibonacci, tree traversals, divide-and-conquer algorithms`,

    exam: `## 📝 Recursion — Exam-Ready Answer

**Definition:**
Recursion is a programming technique where a function solves a problem by calling itself with a reduced version of the input until a base condition is met.

**Components of Recursion:**
1. **Base Case** — Terminating condition that prevents infinite recursion
2. **Recursive Case** — The function calls itself with modified arguments
3. **Call Stack** — Memory structure that tracks each recursive call

**Example — Factorial:**
\`\`\`python
def factorial(n):
    if n <= 1:        # Base case
        return 1
    return n * factorial(n - 1)  # Recursive case
\`\`\`

**Execution Trace for factorial(4):**
| Call | n | Returns |
|------|---|---------|
| factorial(4) | 4 | 4 × factorial(3) = 24 |
| factorial(3) | 3 | 3 × factorial(2) = 6 |
| factorial(2) | 2 | 2 × factorial(1) = 2 |
| factorial(1) | 1 | 1 (base case) |

**Example — Fibonacci:**
\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
\`\`\`

**Types of Recursion:**
| Type | Description | Example |
|------|-------------|---------|
| Direct | Function calls itself | factorial(n) |
| Indirect | Function A calls B, B calls A | isEven/isOdd |
| Tail | Recursive call is the last operation | optimized factorial |
| Tree | Function makes multiple recursive calls | Fibonacci, merge sort |

**Complexity Analysis:**
- **Linear recursion** (factorial): Time O(n), Space O(n)
- **Tree recursion** (naive Fibonacci): Time O(2ⁿ), Space O(n)
- **Tail recursion** (with optimization): Time O(n), Space O(1)

**Advantages:**
- Clean, readable code for naturally recursive problems
- Ideal for tree/graph traversals, divide-and-conquer

**Disadvantages:**
- Stack overflow risk for deep recursion
- Higher memory usage due to call stack
- Can be slower than iteration without optimization

**Key Exam Points:**
✅ Always mention base case + recursive case
✅ Draw the call stack or recursion tree
✅ Discuss time & space complexity
✅ Mention when iteration is preferred`,

    interview: `## 💼 Recursion — Interview Deep Dive

**Core Concept:**
Recursion decomposes a problem into self-similar subproblems. Every recursive solution maps to a mathematical recurrence relation and can be analyzed using the Master Theorem or recursion trees.

**The Three Laws of Recursion:**
1. Must have a base case
2. Must move toward the base case
3. Must call itself recursively

**Why Interviewers Love Recursion:**
It tests your ability to think about problem decomposition, understand memory models (call stack), and recognize optimization opportunities.

**Pattern 1 — Linear Recursion:**
\`\`\`python
def sum_array(arr, n):
    if n == 0:
        return 0
    return arr[n-1] + sum_array(arr, n-1)
# T(n) = T(n-1) + O(1) → O(n)
\`\`\`

**Pattern 2 — Divide & Conquer:**
\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)
# T(n) = 2T(n/2) + O(n) → O(n log n)
\`\`\`

**Pattern 3 — Backtracking:**
\`\`\`python
def permutations(arr, start=0):
    if start == len(arr):
        print(arr)
        return
    for i in range(start, len(arr)):
        arr[start], arr[i] = arr[i], arr[start]
        permutations(arr, start + 1)
        arr[start], arr[i] = arr[i], arr[start]  # backtrack
\`\`\`

**Pattern 4 — Recursion → DP (Memoization):**
\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
# Reduces O(2ⁿ) → O(n)
\`\`\`

**Critical Interview Discussion Points:**
1. **Stack Overflow:** Python default limit ~1000 frames. Use \`sys.setrecursionlimit()\` or convert to iteration.
2. **Tail Call Optimization:** Some languages (Scheme, Scala) optimize tail recursion. Python/Java do not.
3. **Space Complexity:** Every recursive call uses O(1) stack space → O(depth) total.
4. **When NOT to recurse:** Simple loops, very deep recursion, performance-critical code.

**Common Interview Follow-ups:**
- "Convert this recursive solution to iterative" → Use an explicit stack
- "Optimize this recursive solution" → Add memoization or use DP table
- "What's the space complexity?" → O(max recursion depth)
- "What happens with very large input?" → Stack overflow; consider iteration

**⚡ Summary:**
Recursion is fundamental to CS — master the patterns (linear, divide-and-conquer, backtracking, tree recursion) and always discuss optimization paths in interviews.`,

    practice: "Quick check: In the factorial function, what is the base case, and what would happen if we removed it? 🤔",
  },

  binary_search: {
    simple: `## 🔍 What is Binary Search?

**Concept:**
Binary search is a fast way to find an item in a **sorted** list. Instead of checking every element one by one, it cuts the list in half each time — making it much faster.

**Simple Example:**
Suppose you're looking for the number **7** in this sorted list:
\`[1, 3, 5, 7, 9, 11, 13]\`

1. Check the middle element: **7** vs **7** → Found it! ✅

But if we were looking for **9**:
1. Middle = 7. Is 9 > 7? Yes → search the right half \`[9, 11, 13]\`
2. Middle = 11. Is 9 < 11? Yes → search the left half \`[9]\`
3. Middle = 9. Found it! ✅

Only **3 steps** instead of checking all 7 elements!

**🌍 Real-World Analogy:**
Think of finding a word in a **dictionary**. You don't start from page 1. You open it roughly in the middle. If your word comes after the middle page, you go to the right half. You keep halving until you find the word. That's binary search!

**📝 Step-by-Step Algorithm:**
1. Set \`low = 0\` and \`high = length - 1\`
2. Find the middle: \`mid = (low + high) // 2\`
3. If \`arr[mid] == target\` → found it!
4. If \`target < arr[mid]\` → search left half: \`high = mid - 1\`
5. If \`target > arr[mid]\` → search right half: \`low = mid + 1\`
6. Repeat until \`low > high\` (element not found)

**💻 Code Example:**
\`\`\`python
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        
        if arr[mid] == target:
            return mid          # Found! Return index
        elif arr[mid] < target:
            low = mid + 1       # Search right half
        else:
            high = mid - 1      # Search left half
    
    return -1  # Not found

# Example
numbers = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
result = binary_search(numbers, 23)
print(f"Found at index: {result}")  # Output: Found at index: 5
\`\`\`

**⏱️ Time Complexity:**
| Algorithm | Time Complexity | For 1 million elements |
|-----------|----------------|----------------------|
| Linear Search | O(n) | ~1,000,000 steps |
| Binary Search | O(log n) | ~20 steps! |

**⚡ Quick Summary:**
- Binary search works only on **sorted** data
- It halves the search space each step → O(log n)
- Much faster than linear search for large datasets
- Key requirement: the data must be sorted first`,

    exam: `## 📝 Binary Search — Exam-Ready Answer

**Definition:**
Binary search is a divide-and-conquer search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.

**Precondition:** The array must be sorted.

**Algorithm (Iterative):**
\`\`\`python
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
\`\`\`

**Algorithm (Recursive):**
\`\`\`python
def binary_search_rec(arr, target, low, high):
    if low > high:
        return -1
    mid = (low + high) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_rec(arr, target, mid + 1, high)
    else:
        return binary_search_rec(arr, target, low, mid - 1)
\`\`\`

**Dry Run:** Finding 23 in \`[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\`

| Step | low | high | mid | arr[mid] | Action |
|------|-----|------|-----|----------|--------|
| 1 | 0 | 9 | 4 | 16 | 23 > 16, low = 5 |
| 2 | 5 | 9 | 7 | 56 | 23 < 56, high = 6 |
| 3 | 5 | 6 | 5 | 23 | Found! ✅ |

**Complexity Analysis:**
| Case | Time | Space (Iterative) | Space (Recursive) |
|------|------|--------------------|-------------------|
| Best | O(1) | O(1) | O(1) |
| Average | O(log n) | O(1) | O(log n) |
| Worst | O(log n) | O(1) | O(log n) |

**Comparison with Linear Search:**
| Feature | Linear Search | Binary Search |
|---------|--------------|---------------|
| Array requirement | Any | Sorted |
| Time complexity | O(n) | O(log n) |
| Implementation | Simple | Moderate |
| Best for | Small/unsorted data | Large sorted data |

**Applications:**
- Searching in databases and dictionaries
- Finding boundaries (lower bound, upper bound)
- Square root calculation
- Search in rotated sorted arrays

**Exam Tips:**
✅ Always state "array must be sorted"
✅ Show the dry run table
✅ Compare iterative vs recursive
✅ Mention O(log n) with justification: halving n takes log₂(n) steps`,

    interview: `## 💼 Binary Search — Interview Deep Dive

**Core Insight:**
Binary search isn't just "finding an element." It's a general technique for **searching over a monotonic condition**. Whenever you have a property that transitions from false→true (or true→false), binary search applies.

**Classic Implementation (with overflow-safe mid):**
\`\`\`python
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2  # Prevents integer overflow
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
\`\`\`

**⚠️ Common Bug:** Using \`(lo + hi) // 2\` can overflow in languages like Java/C++. Always use \`lo + (hi - lo) // 2\`.

**Pattern 1 — Lower Bound (first occurrence):**
\`\`\`python
def lower_bound(arr, target):
    lo, hi, result = 0, len(arr) - 1, -1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] >= target:
            result = mid
            hi = mid - 1
        else:
            lo = mid + 1
    return result if result != -1 and arr[result] == target else -1
\`\`\`

**Pattern 2 — Search in Rotated Sorted Array (LeetCode #33):**
\`\`\`python
def search_rotated(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] == target:
            return mid
        if nums[lo] <= nums[mid]:  # Left half is sorted
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:  # Right half is sorted
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1
\`\`\`

**Pattern 3 — Binary Search on Answer (Capacity/Allocation problems):**
\`\`\`python
def min_capacity(weights, days):
    lo, hi = max(weights), sum(weights)
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if can_ship(weights, days, mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
\`\`\`

**Interview Discussion Points:**
1. **When is binary search applicable?** Sorted data or any monotonic predicate
2. **Iterative vs Recursive?** Iterative preferred (O(1) space)
3. **Edge cases:** Empty array, single element, all duplicates, target not present
4. **Variants:** Lower/upper bound, peak finding, rotated arrays, 2D matrix search

**Common Follow-ups:**
- "Find the peak element in an unsorted array" → Binary search on slope
- "Search in a 2D sorted matrix" → Treat as 1D, binary search with row/col mapping
- "Find minimum in rotated sorted array" → Compare mid with hi

**⚡ Key Takeaway:**
Binary search is a technique, not just an algorithm. Master the "search on answer" pattern — it appears in 30%+ of medium/hard LeetCode problems.`,

    practice: "You have a sorted array [1, 3, 5, 7, 9, 11]. How many comparisons does binary search need to find the number 3? Walk through each step. 🤔",
  },

  linked_list: {
    simple: `## 🔗 What is a Linked List?

**Concept:**
A linked list is a data structure where elements (called **nodes**) are stored in sequence, but unlike arrays, they are **not** stored next to each other in memory. Each node holds two things: its **data** and a **pointer** (reference) to the next node.

**Simple Example:**
\`\`\`
[10 | →] → [20 | →] → [30 | →] → [null]
 head                                tail
\`\`\`
Each box is a node. The arrow is the pointer to the next node. The last node points to \`null\` (end of list).

**🌍 Real-World Analogy:**
Think of a **treasure hunt**. Each clue (node) has two things: a message (data) and directions to the next clue (pointer). You can only find clue #3 by first going through clues #1 and #2. That's how a linked list works — you traverse sequentially!

Another analogy: A **train**. Each coach is connected to the next. You can easily add or remove a coach (insert/delete a node) without rearranging the entire train.

**📝 Step-by-Step — How It Works:**
1. **Head** points to the first node
2. Each node stores data + pointer to the next node
3. The last node's pointer is \`null\`
4. To access element #5, you must traverse from head through nodes 1→2→3→4→5
5. To insert: just update pointers (no shifting!)
6. To delete: bypass the node by changing the previous node's pointer

**💻 Code Example:**
\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
    
    def display(self):
        current = self.head
        while current:
            print(current.data, end=" → ")
            current = current.next
        print("None")

# Usage
ll = LinkedList()
ll.append(10)
ll.append(20)
ll.append(30)
ll.display()  # Output: 10 → 20 → 30 → None
\`\`\`

**Array vs Linked List:**
| Feature | Array | Linked List |
|---------|-------|-------------|
| Access by index | O(1) ✅ | O(n) ❌ |
| Insert at beginning | O(n) ❌ | O(1) ✅ |
| Insert at end | O(1)* | O(n) or O(1) with tail |
| Memory | Contiguous | Scattered |
| Size | Fixed (usually) | Dynamic |

**⚡ Quick Summary:**
- Linked list = chain of nodes connected by pointers
- Great for frequent insertions/deletions
- Not great for random access (use arrays for that)
- Types: Singly, Doubly, Circular`,

    exam: `## 📝 Linked List — Exam-Ready Answer

**Definition:**
A linked list is a linear data structure consisting of nodes, where each node contains a data field and a reference (pointer) to the next node in the sequence.

**Types:**

**1. Singly Linked List:**
\`\`\`
[data|next] → [data|next] → [data|null]
\`\`\`

**2. Doubly Linked List:**
\`\`\`
null ← [prev|data|next] ⇄ [prev|data|next] ⇄ [prev|data|next] → null
\`\`\`

**3. Circular Linked List:**
\`\`\`
[data|next] → [data|next] → [data|next] → (back to first)
\`\`\`

**Node Structure:**
\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None  # For doubly: self.prev = None
\`\`\`

**Operations & Complexity:**
| Operation | Singly | Doubly |
|-----------|--------|--------|
| Insert at head | O(1) | O(1) |
| Insert at tail | O(n) / O(1)* | O(1) |
| Delete at head | O(1) | O(1) |
| Delete at tail | O(n) | O(1) |
| Search | O(n) | O(n) |
| Access by index | O(n) | O(n) |

*O(1) if tail pointer is maintained

**Key Operations with Code:**
\`\`\`python
# Insert at beginning - O(1)
def insert_at_head(self, data):
    new_node = Node(data)
    new_node.next = self.head
    self.head = new_node

# Delete a node with given value - O(n)
def delete(self, key):
    current = self.head
    if current and current.data == key:
        self.head = current.next
        return
    prev = None
    while current and current.data != key:
        prev = current
        current = current.next
    if current:
        prev.next = current.next

# Reverse a linked list - O(n)
def reverse(self):
    prev = None
    current = self.head
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    self.head = prev
\`\`\`

**Advantages:**
- Dynamic size — no need to declare size upfront
- Efficient insertions/deletions (no shifting)
- No memory waste (allocate as needed)

**Disadvantages:**
- No random access — must traverse sequentially
- Extra memory for pointers
- Not cache-friendly (nodes scattered in memory)

**Applications:**
- Implementing stacks and queues
- Browser history (doubly linked list)
- Music playlist (circular linked list)
- Polynomial representation
- Hash table chaining`,

    interview: `## 💼 Linked List — Interview Deep Dive

**Why Interviewers Love Linked Lists:**
They test pointer manipulation, edge case handling, and in-place algorithm design. Many problems seem simple but have subtle bugs.

**Essential Patterns:**

**Pattern 1 — Two Pointer (Slow/Fast):**
\`\`\`python
# Detect cycle - Floyd's Algorithm
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False

# Find middle element
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
\`\`\`

**Pattern 2 — Reverse Linked List (iterative):**
\`\`\`python
def reverse(head):
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev  # New head
\`\`\`

**Pattern 3 — Merge Two Sorted Lists:**
\`\`\`python
def merge(l1, l2):
    dummy = Node(0)
    tail = dummy
    while l1 and l2:
        if l1.data <= l2.data:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next
    tail.next = l1 or l2
    return dummy.next
\`\`\`

**Pattern 4 — Remove Nth Node from End:**
\`\`\`python
def remove_nth_from_end(head, n):
    dummy = Node(0)
    dummy.next = head
    fast = slow = dummy
    for _ in range(n + 1):
        fast = fast.next
    while fast:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next
    return dummy.next
\`\`\`

**Critical Edge Cases (interviewers watch for these):**
1. Empty list (\`head = None\`)
2. Single node
3. Operation on head node
4. Operation on tail node
5. Cycle in the list

**Pro Tip — Dummy Node Technique:**
When the head might change (deletions, merges), use a dummy node:
\`\`\`python
dummy = Node(0)
dummy.next = head
# ... operations ...
return dummy.next  # New head
\`\`\`

**Common Interview Questions:**
1. Reverse a linked list (iterative + recursive)
2. Detect and find cycle start
3. Merge K sorted lists (use min-heap)
4. LRU Cache (doubly linked list + hash map)
5. Copy list with random pointer
6. Palindrome linked list
7. Intersection of two linked lists

**⚡ Key Takeaway:**
Master the two-pointer technique and dummy node pattern. These two techniques solve 80% of linked list interview questions.`,

    practice: "If you have a linked list 1→2→3→4→5, what does it look like after reversing it? Can you trace through the pointer changes step by step? 🤔",
  },

  oop: {
    simple: `## 🏗️ What is OOP (Object-Oriented Programming)?

**Concept:**
OOP is a way of writing programs by organizing code around **objects** — things that have properties (data) and behaviors (functions). Instead of writing one big chunk of code, you create blueprints (classes) and build objects from them.

**Simple Example:**
\`\`\`python
class Dog:
    def __init__(self, name, breed):
        self.name = name      # property
        self.breed = breed     # property
    
    def bark(self):            # behavior
        print(f"{self.name} says: Woof! 🐕")

my_dog = Dog("Buddy", "Golden Retriever")
my_dog.bark()  # Output: Buddy says: Woof! 🐕
\`\`\`

**🌍 Real-World Analogy:**
Think of a **cookie cutter** (class) and **cookies** (objects). The cutter defines the shape, but each cookie can have different decorations (different property values). You use one cutter to make many cookies!

**📝 The Four Pillars of OOP:**

### 1. Encapsulation 🔒
Hide internal details, expose only what's needed.
\`\`\`python
class BankAccount:
    def __init__(self):
        self.__balance = 0  # Private - hidden from outside
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
    
    def get_balance(self):
        return self.__balance  # Controlled access
\`\`\`
*Analogy: An ATM. You interact through buttons, but you can't access the cash vault directly.*

### 2. Abstraction 🎭
Simplify complex systems by showing only essential features.
\`\`\`python
class Car:
    def start_engine(self):
        self.__inject_fuel()
        self.__ignite_spark()
        self.__start_pistons()
        print("Engine started! 🚗")
    
    # Complex internal methods hidden from driver
\`\`\`
*Analogy: Driving a car. You turn the key — you don't need to know how the engine works internally.*

### 3. Inheritance 👨‍👧
Create new classes based on existing ones.
\`\`\`python
class Animal:
    def eat(self):
        print("Eating...")

class Dog(Animal):      # Dog inherits from Animal
    def bark(self):
        print("Woof!")

dog = Dog()
dog.eat()   # Inherited from Animal
dog.bark()  # Own method
\`\`\`
*Analogy: You inherit traits from your parents but also have your own unique qualities.*

### 4. Polymorphism 🎭
Same action, different behaviors depending on the object.
\`\`\`python
class Cat:
    def speak(self):
        print("Meow!")

class Dog:
    def speak(self):
        print("Woof!")

for animal in [Cat(), Dog()]:
    animal.speak()  # Same method name, different output
\`\`\`
*Analogy: The word "open" — you can open a door, open a book, open an app. Same word, different actions.*

**⚡ Quick Summary:**
- **Class** = blueprint, **Object** = instance built from it
- **Encapsulation** = hide data, control access
- **Abstraction** = simplify complexity
- **Inheritance** = reuse code from parent classes
- **Polymorphism** = same interface, different implementations`,

    exam: `## 📝 OOP — Exam-Ready Answer

**Definition:**
Object-Oriented Programming is a programming paradigm based on the concept of objects, which contain data (attributes) and code (methods). It organizes software design around data rather than functions and logic.

**Four Pillars with Definitions:**

| Pillar | Definition | Key Benefit |
|--------|-----------|-------------|
| Encapsulation | Bundling data and methods together, restricting direct access | Data protection |
| Abstraction | Hiding complex implementation, showing only interface | Simplicity |
| Inheritance | Deriving new classes from existing ones | Code reuse |
| Polymorphism | Objects of different types responding to same method | Flexibility |

**Key Terminology:**
- **Class:** Blueprint/template for objects
- **Object:** Instance of a class
- **Constructor:** Special method called during object creation (\`__init__\` in Python)
- **Method:** Function defined inside a class
- **Attribute:** Variable belonging to an object

**Types of Inheritance:**
1. **Single:** A → B
2. **Multiple:** A, B → C (Python supports, Java doesn't)
3. **Multilevel:** A → B → C
4. **Hierarchical:** A → B, A → C
5. **Hybrid:** Combination of above

**Types of Polymorphism:**
1. **Compile-time (Static):** Method overloading, operator overloading
2. **Runtime (Dynamic):** Method overriding

**Code Examples:**
\`\`\`python
# Encapsulation
class Student:
    def __init__(self, name, marks):
        self.__name = name      # Private
        self.__marks = marks    # Private
    
    def get_grade(self):        # Public interface
        if self.__marks >= 90: return 'A'
        elif self.__marks >= 80: return 'B'
        else: return 'C'

# Inheritance + Polymorphism
class Shape:
    def area(self):
        raise NotImplementedError

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return 3.14 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w, self.h = w, h
    def area(self):
        return self.w * self.h

# Polymorphism in action
shapes = [Circle(5), Rectangle(4, 6)]
for s in shapes:
    print(f"Area: {s.area()}")
\`\`\`

**OOP vs Procedural Programming:**
| Feature | OOP | Procedural |
|---------|-----|-----------|
| Focus | Objects & data | Functions & logic |
| Data security | Encapsulation | Global variables |
| Code reuse | Inheritance | Function calls |
| Scalability | High | Limited |

**SOLID Principles (bonus):**
- **S**ingle Responsibility, **O**pen/Closed, **L**iskov Substitution, **I**nterface Segregation, **D**ependency Inversion`,

    interview: `## 💼 OOP — Interview Deep Dive

**Why OOP Matters in Interviews:**
OOP questions test system design thinking, not just syntax. Interviewers want to see if you can model real-world problems as clean, maintainable code.

**Beyond the Four Pillars — SOLID Principles:**

\`\`\`python
# Single Responsibility: Each class does ONE thing
class UserAuth:
    def login(self, email, password): ...
    
class UserProfile:
    def update_profile(self, data): ...
# NOT: class User that handles auth + profile + payments

# Open/Closed: Open for extension, closed for modification
class Discount:
    def calculate(self, price): return price

class SeasonalDiscount(Discount):
    def calculate(self, price): return price * 0.8
# Add new discount types without changing existing code

# Dependency Inversion: Depend on abstractions
class NotificationService:
    def __init__(self, sender):  # Accepts any sender
        self.sender = sender
    def notify(self, msg):
        self.sender.send(msg)
# Works with EmailSender, SMSSender, PushSender
\`\`\`

**Design Pattern Questions (frequently asked):**

**Singleton:**
\`\`\`python
class Database:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
\`\`\`

**Factory Pattern:**
\`\`\`python
class VehicleFactory:
    @staticmethod
    def create(vehicle_type):
        if vehicle_type == "car": return Car()
        elif vehicle_type == "bike": return Bike()
\`\`\`

**Observer Pattern:**
\`\`\`python
class EventEmitter:
    def __init__(self):
        self._listeners = {}
    def on(self, event, callback):
        self._listeners.setdefault(event, []).append(callback)
    def emit(self, event, data=None):
        for cb in self._listeners.get(event, []):
            cb(data)
\`\`\`

**Common Interview Questions:**
1. "Design a parking lot system" → Classes: ParkingLot, Floor, Spot, Vehicle, Ticket
2. "Difference between abstract class and interface?"
   - Abstract class: partial implementation, single inheritance
   - Interface: contract only, multiple inheritance
3. "When would you use composition over inheritance?"
   - When "has-a" relationship is more appropriate than "is-a"
   - Prefer composition for flexibility
4. "Explain method resolution order (MRO)"
   - Python uses C3 linearization for multiple inheritance

**Anti-Patterns to Avoid:**
- God Object (one class does everything)
- Deep inheritance hierarchies (prefer composition)
- Breaking encapsulation with getters/setters for everything

**⚡ Key Takeaway:**
In interviews, demonstrate that you think about **extensibility, maintainability, and real-world modeling** — not just class syntax.`,

    practice: "Can you identify which OOP pillar is being used: A Shape class has an area() method, and both Circle and Rectangle override it with their own implementation. What pillar is this? 🤔",
  },

  sorting: {
    simple: `## 📊 What is Sorting?

**Concept:**
Sorting means arranging data in a specific order — usually ascending (smallest to largest) or descending. It's one of the most fundamental operations in computer science because sorted data is much easier to search, merge, and analyze.

**Simple Example:**
Unsorted: \`[64, 25, 12, 22, 11]\`
Sorted:   \`[11, 12, 22, 25, 64]\`

**🌍 Real-World Analogy:**
Think of organizing books on a shelf. You could arrange them by title (A-Z), by author, or by height. Each arrangement method is like a different sorting algorithm — they all achieve the same result but in different ways, some faster than others!

**📝 Common Sorting Algorithms Explained Simply:**

### Bubble Sort 🫧
Compare adjacent elements and swap if they're in wrong order. Repeat until sorted.
\`\`\`
Pass 1: [64, 25, 12, 22, 11] → [25, 12, 22, 11, 64]  (64 bubbles to end)
Pass 2: [25, 12, 22, 11, 64] → [12, 22, 11, 25, 64]  (25 bubbles up)
... continues until no swaps needed
\`\`\`
*Analogy: The biggest bubble rises to the top first!*

### Selection Sort 🎯
Find the minimum, put it first. Find the next minimum, put it second. Repeat.
\`\`\`python
def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i+1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
\`\`\`
*Analogy: Picking the shortest person from a group, one at a time, to form a line.*

### Merge Sort 🔀
Split the array in half, sort each half, then merge them back together.
\`\`\`
[38, 27, 43, 3]
   ↓ split
[38, 27]  [43, 3]
   ↓ split     ↓ split
[38] [27]  [43] [3]
   ↓ merge     ↓ merge
[27, 38]  [3, 43]
      ↓ merge
[3, 27, 38, 43]
\`\`\`

**⏱️ Comparison:**
| Algorithm | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |

**⚡ Quick Summary:**
- Sorting = arranging elements in order
- Simple sorts (Bubble, Selection): Easy to understand, O(n²)
- Efficient sorts (Merge, Quick): Faster at O(n log n), used in practice
- Python's built-in \`sort()\` uses TimSort — a hybrid of Merge + Insertion sort`,

    exam: `## 📝 Sorting Algorithms — Exam-Ready Answer

**Definition:**
Sorting is the process of arranging elements in a specific order (ascending/descending) to facilitate efficient searching and data manipulation.

**Classification:**
| Criteria | Types |
|----------|-------|
| By complexity | Simple O(n²): Bubble, Selection, Insertion; Efficient O(n log n): Merge, Quick, Heap |
| By space | In-place: Quick, Bubble, Selection, Insertion; Not in-place: Merge |
| By stability | Stable: Bubble, Insertion, Merge; Unstable: Quick, Selection, Heap |

**Stability:** A stable sort preserves the relative order of equal elements.

**Detailed Algorithms:**

**1. Bubble Sort:**
\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped: break  # Optimization
    return arr
\`\`\`

**2. Merge Sort:**
\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
\`\`\`

**3. Quick Sort:**
\`\`\`python
def quick_sort(arr):
    if len(arr) <= 1: return arr
    pivot = arr[len(arr)//2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)
\`\`\`

**Complete Complexity Table:**
| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| Counting | O(n+k) | O(n+k) | O(n+k) | O(k) | Yes |

**When to Use What:**
- Small data / nearly sorted → Insertion Sort
- Need guaranteed O(n log n) → Merge Sort
- General purpose → Quick Sort (average case fast, in-place)
- Need stable sort → Merge Sort
- Integer data, small range → Counting Sort`,

    interview: `## 💼 Sorting — Interview Deep Dive

**Key Interview Insight:**
Interviewers don't just want you to implement sorting — they want to see you choose the right algorithm for the constraint and discuss trade-offs.

**Quick Sort — The Interview Favorite:**
\`\`\`python
def quicksort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quicksort(arr, low, pi - 1)
        quicksort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1
\`\`\`

**Why Quick Sort's worst case is O(n²):**
When pivot is always the smallest/largest element (already sorted array + last element as pivot). Fix: use **random pivot** or **median-of-three**.

**Interview Problem Patterns:**

**1. Sort Colors (Dutch National Flag):**
\`\`\`python
def sort_colors(nums):  # 0s, 1s, 2s
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1; mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
\`\`\`

**2. Kth Largest Element (Quick Select):**
\`\`\`python
import random
def quick_select(nums, k):
    pivot = random.choice(nums)
    left = [x for x in nums if x > pivot]
    mid = [x for x in nums if x == pivot]
    right = [x for x in nums if x < pivot]
    if k <= len(left):
        return quick_select(left, k)
    elif k <= len(left) + len(mid):
        return pivot
    else:
        return quick_select(right, k - len(left) - len(mid))
# Average O(n), worst O(n²)
\`\`\`

**3. Merge Intervals:**
\`\`\`python
def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged
\`\`\`

**Discussion Points:**
- **External sorting:** When data doesn't fit in memory → Merge sort (sequential access pattern)
- **Parallel sorting:** Merge sort is naturally parallelizable
- **Hybrid sorts:** TimSort (Python), IntroSort (C++) — combine best properties

**⚡ Key Takeaway:**
Know Quick Sort and Merge Sort cold. Understand when each is preferred. Master Quick Select for Kth element problems.`,

    practice: "Given the array [5, 2, 8, 1, 9], trace through one complete pass of Bubble Sort. How many swaps happen? 🤔",
  },

  dp: {
    simple: `## 🧩 What is Dynamic Programming (DP)?

**Concept:**
Dynamic Programming is a technique to solve complex problems by breaking them into **smaller overlapping subproblems** and storing the results so you don't solve the same subproblem twice.

**Simple Example — Fibonacci:**
To find fib(5), you need fib(4) and fib(3). But fib(4) also needs fib(3). Without DP, you'd calculate fib(3) multiple times. DP says: calculate it once, store it, reuse it!

\`\`\`
Without DP:              With DP:
fib(5)                   fib(5) 
├── fib(4)               ├── fib(4)
│   ├── fib(3)           │   ├── fib(3) ← computed once
│   │   ├── fib(2)       │   └── fib(2) ← stored
│   │   └── fib(1)       └── fib(3) ← reused from cache!
│   └── fib(2)
│       ├── fib(1)       Calls: 5 (instead of 15!)
│       └── fib(0)
└── fib(3)
    ├── fib(2)
    └── fib(1)
Calls: 15!
\`\`\`

**🌍 Real-World Analogy:**
Imagine you're asked: "What's 3 + 7?" You say 10. Then someone asks: "What's 3 + 7 + 5?" You don't recalculate 3 + 7. You remember it's 10 and just add 5. That's DP — **remembering solutions to avoid re-computation!**

**📝 Two Approaches:**

### 1. Top-Down (Memoization) ↓
Start with the big problem, break it down, cache results.
\`\`\`python
def fib(n, memo={}):
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]
\`\`\`

### 2. Bottom-Up (Tabulation) ↑
Start with smallest subproblems, build up to the answer.
\`\`\`python
def fib(n):
    if n <= 1: return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
\`\`\`

**When to Use DP:**
✅ Problem has **overlapping subproblems** (same subproblem solved multiple times)
✅ Problem has **optimal substructure** (optimal solution uses optimal solutions of subproblems)

**Classic DP Problems:**
1. Fibonacci sequence
2. Climbing stairs (how many ways to reach step n?)
3. Coin change (minimum coins to make amount)
4. Longest common subsequence
5. Knapsack problem

**⚡ Quick Summary:**
- DP = "remember past results to avoid redundant work"
- Two styles: Memoization (top-down) or Tabulation (bottom-up)
- Reduces exponential time to polynomial time
- Key question: "Have I solved this subproblem before?"`,

    exam: `## 📝 Dynamic Programming — Exam-Ready Answer

**Definition:**
Dynamic Programming is an algorithmic technique that solves optimization problems by breaking them into overlapping subproblems, solving each subproblem once, and storing results for future use.

**Two Required Properties:**
1. **Overlapping Subproblems:** Same subproblems are solved repeatedly
2. **Optimal Substructure:** Optimal solution contains optimal solutions to subproblems

**Approaches:**

| Approach | Direction | Method | Pros | Cons |
|----------|-----------|--------|------|------|
| Memoization | Top-down | Recursion + cache | Intuitive | Stack overflow risk |
| Tabulation | Bottom-up | Iterative + table | No stack overflow | Must determine order |

**Classic Problems with Solutions:**

**1. Fibonacci:**
\`\`\`python
# Tabulation - O(n) time, O(n) space
def fib(n):
    dp = [0, 1] + [0] * (n - 1)
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# Space-optimized - O(n) time, O(1) space
def fib_opt(n):
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
\`\`\`

**2. 0/1 Knapsack:**
\`\`\`python
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i-1][w], 
                              values[i-1] + dp[i-1][w - weights[i-1]])
            else:
                dp[i][w] = dp[i-1][w]
    return dp[n][capacity]
\`\`\`

**3. Longest Common Subsequence (LCS):**
\`\`\`python
def lcs(X, Y):
    m, n = len(X), len(Y)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if X[i-1] == Y[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]
\`\`\`

**4. Coin Change:**
\`\`\`python
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1
\`\`\`

**Steps to Solve Any DP Problem:**
1. Identify if it's a DP problem (overlapping subproblems + optimal substructure)
2. Define the state: \`dp[i]\` represents...
3. Write the recurrence relation
4. Determine base cases
5. Decide iteration order (bottom-up) or use memoization (top-down)
6. Optimize space if possible`,

    interview: `## 💼 Dynamic Programming — Interview Deep Dive

**The DP Framework for Interviews:**

Every DP problem follows this pattern:
1. **Define state** — What does dp[i] (or dp[i][j]) represent?
2. **Recurrence** — How does dp[i] relate to smaller subproblems?
3. **Base case** — What are the trivial answers?
4. **Order** — In what order should states be filled?
5. **Answer** — Which state gives the final answer?

**Category 1: Linear DP**
\`\`\`python
# Climbing Stairs - dp[i] = ways to reach step i
def climb(n):
    dp = [0] * (n + 1)
    dp[0] = dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# House Robber - dp[i] = max money robbing houses 0..i
def rob(nums):
    if len(nums) <= 2: return max(nums)
    dp = [0] * len(nums)
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    for i in range(2, len(nums)):
        dp[i] = max(dp[i-1], dp[i-2] + nums[i])
    return dp[-1]
\`\`\`

**Category 2: 2D DP**
\`\`\`python
# Edit Distance
def edit_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1): dp[i][0] = i
    for j in range(n + 1): dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    return dp[m][n]
\`\`\`

**Category 3: Interval DP**
\`\`\`python
# Matrix Chain Multiplication
def matrix_chain(dims):
    n = len(dims) - 1
    dp = [[0]*n for _ in range(n)]
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = float('inf')
            for k in range(i, j):
                cost = dp[i][k] + dp[k+1][j] + dims[i]*dims[k+1]*dims[j+1]
                dp[i][j] = min(dp[i][j], cost)
    return dp[0][n-1]
\`\`\`

**Space Optimization Techniques:**
- 2D → 1D: When dp[i] only depends on dp[i-1], use rolling array
- 1D → O(1): When dp[i] depends on dp[i-1] and dp[i-2], use two variables

**Interview Tips:**
1. Start with brute-force recursive solution
2. Identify overlapping subproblems → add memoization
3. Convert to bottom-up if asked for optimization
4. Discuss space optimization as follow-up

**⚡ Key Takeaway:**
DP is pattern recognition. Master these 5 patterns: Linear, Knapsack, LCS/Edit Distance, Interval, and Grid DP — they cover 90% of interview DP problems.`,

    practice: "Using dynamic programming, what is the minimum number of coins needed to make amount 11 using coins [1, 5, 6]? Build the DP table step by step. 🤔",
  },
};

// Map detected topics to response keys
function getResponseKey(message: string): string | null {
  const lower = message.toLowerCase();
  const mappings: [string[], string][] = [
    [["recursion", "recursive", "base case", "call stack"], "recursion"],
    [["binary search", "binary search algorithm"], "binary_search"],
    [["linked list", "node pointer", "singly linked", "doubly linked"], "linked_list"],
    [["oop", "object oriented", "class and object", "inheritance", "polymorphism", "encapsulation", "abstraction", "object-oriented"], "oop"],
    [["sort", "bubble sort", "merge sort", "quick sort", "selection sort", "insertion sort", "sorting algorithm"], "sorting"],
    [["dynamic programming", " dp ", "memoization", "tabulation", "knapsack", "fibonacci dp"], "dp"],
  ];

  for (const [keywords, key] of mappings) {
    if (keywords.some(k => lower.includes(k))) {
      return key;
    }
  }
  return null;
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
  const opener = getOpener(emotion);
  const responseKey = getResponseKey(message);

  let explanation: string;
  let practice: string;

  if (responseKey && topicResponses[responseKey]) {
    const topic = topicResponses[responseKey];
    explanation = mode === "simple" ? topic.simple : mode === "exam" ? topic.exam : topic.interview;
    practice = topic.practice;
  } else {
    // Fallback: still provide structured, helpful content
    explanation = buildGenericExplanation(message, mode);
    practice = "Try rephrasing your question or asking about a specific CS topic like recursion, linked lists, sorting, OOP, binary search, or dynamic programming! 🎯";
  }

  const confidenceDelta = emotion === "confused" ? 3 : emotion === "fearful" ? 2 : emotion === "frustrated" ? 2 : emotion === "curious" ? 2 : 1;

  return {
    response: opener + explanation,
    practiceQuestion: practice,
    confidenceDelta: Math.min(confidenceDelta, 10 - confidence),
  };
}

function buildGenericExplanation(message: string, mode: LearningMode): string {
  const lower = message.toLowerCase();

  // Stack
  if (lower.includes("stack")) {
    return mode === "simple"
      ? `## 📚 What is a Stack?

**Concept:**
A stack is a data structure that follows **LIFO** — Last In, First Out. The last item you put in is the first one you take out.

**🌍 Real-World Analogy:**
Think of a stack of plates. You always take the top plate first. You can't pull out a plate from the middle without removing the ones above it!

**Operations:**
| Operation | What it does | Time |
|-----------|-------------|------|
| push(x) | Add element to top | O(1) |
| pop() | Remove top element | O(1) |
| peek/top() | View top element | O(1) |
| isEmpty() | Check if stack is empty | O(1) |

**💻 Code Example:**
\`\`\`python
stack = []
stack.append(10)   # push: [10]
stack.append(20)   # push: [10, 20]
stack.append(30)   # push: [10, 20, 30]
top = stack.pop()  # pop: returns 30, stack = [10, 20]
print(top)         # Output: 30
\`\`\`

**Common Uses:**
- Undo/Redo functionality
- Browser back button
- Function call stack
- Expression evaluation (parentheses matching)
- DFS traversal

**⚡ Summary:**
Stack = LIFO. Push to add, Pop to remove. O(1) for all operations. Think of it as a stack of plates!`
      : `## 📝 Stack — ${mode === "exam" ? "Exam Ready" : "Interview Ready"}

**Definition:** A Stack is a linear data structure following LIFO (Last In, First Out) principle.

**ADT Operations:** push(x), pop(), peek(), isEmpty(), size()

**Implementation:** Array-based (fixed size) or Linked List-based (dynamic)

\`\`\`python
class Stack:
    def __init__(self):
        self.items = []
    def push(self, item): self.items.append(item)
    def pop(self): return self.items.pop() if self.items else None
    def peek(self): return self.items[-1] if self.items else None
    def is_empty(self): return len(self.items) == 0
\`\`\`

**All operations: O(1) time**

**Applications:** Function calls, expression evaluation, undo operations, DFS, backtracking, parentheses validation.`;
  }

  // Queue
  if (lower.includes("queue")) {
    return `## 🚶 What is a Queue?

**Concept:**
A queue follows **FIFO** — First In, First Out. Like a line at a ticket counter: the first person in line gets served first.

**Operations:**
| Operation | What it does | Time |
|-----------|-------------|------|
| enqueue(x) | Add to rear | O(1) |
| dequeue() | Remove from front | O(1) |
| front() | View front element | O(1) |

**💻 Code Example:**
\`\`\`python
from collections import deque
q = deque()
q.append(10)     # enqueue: [10]
q.append(20)     # enqueue: [10, 20]
q.append(30)     # enqueue: [10, 20, 30]
front = q.popleft()  # dequeue: returns 10
\`\`\`

**Types:** Simple Queue, Circular Queue, Priority Queue, Double-ended Queue (Deque)

**Applications:** BFS traversal, CPU scheduling, print queue, message queues

**⚡ Summary:** Queue = FIFO. First in, first out. Like waiting in a line!`;
  }

  // Hash / HashMap
  if (lower.includes("hash") || lower.includes("hashmap") || lower.includes("dictionary")) {
    return `## #️⃣ What is Hashing?

**Concept:**
Hashing converts data (a key) into a fixed-size index using a **hash function**. This index tells you exactly where to store/find data — giving you O(1) average-time lookups!

**🌍 Analogy:**
Think of a library. Instead of searching every shelf, you use a catalog number (hash) that tells you the exact shelf and position. Instant access!

**How it works:**
\`\`\`
Key "apple" → hash("apple") → index 3
Key "banana" → hash("banana") → index 7

Array: [_, _, _, "apple", _, _, _, "banana", _, _]
                  ↑ index 3          ↑ index 7
\`\`\`

**💻 Code Example:**
\`\`\`python
# Python dict IS a hash map
phonebook = {}
phonebook["Alice"] = "123-456"   # O(1) insert
phonebook["Bob"] = "789-012"
print(phonebook["Alice"])        # O(1) lookup
\`\`\`

**Collision Handling:**
When two keys hash to the same index:
1. **Chaining:** Store a linked list at each index
2. **Open Addressing:** Find the next empty slot (linear probing)

**Complexity:**
| Operation | Average | Worst |
|-----------|---------|-------|
| Insert | O(1) | O(n) |
| Search | O(1) | O(n) |
| Delete | O(1) | O(n) |

**⚡ Summary:** Hashing = convert key to index for instant access. Average O(1) for everything!`;
  }

  // Tree / BST
  if (lower.includes("tree") || lower.includes("bst") || lower.includes("binary tree")) {
    return `## 🌳 What is a Tree?

**Concept:**
A tree is a hierarchical data structure with a **root** node, and every node can have **children** nodes. It's like a family tree — one parent, multiple children!

**Key Terms:**
- **Root:** Top node (no parent)
- **Leaf:** Node with no children
- **Depth:** Distance from root to node
- **Height:** Longest path from node to leaf

**Binary Search Tree (BST):**
A binary tree where: left child < parent < right child

\`\`\`
        8
       / \\
      3   10
     / \\    \\
    1   6   14
       / \\
      4   7
\`\`\`

**💻 BST Operations:**
\`\`\`python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def search(root, target):
    if not root or root.val == target:
        return root
    if target < root.val:
        return search(root.left, target)
    return search(root.right, target)

def insert(root, val):
    if not root:
        return TreeNode(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root
\`\`\`

**BST Complexity:**
| Operation | Average | Worst (skewed) |
|-----------|---------|----------------|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |

**Traversals:** Inorder (left-root-right), Preorder (root-left-right), Postorder (left-right-root), Level-order (BFS)

**⚡ Summary:** Trees are hierarchical. BST enables O(log n) search. Traversals are fundamental!`;
  }

  // Graph
  if (lower.includes("graph") || lower.includes("bfs") || lower.includes("dfs") || lower.includes("adjacency")) {
    return `## 🕸️ What is a Graph?

**Concept:**
A graph is a collection of **vertices** (nodes) connected by **edges** (links). Unlike trees, graphs can have cycles, multiple connections, and no hierarchy.

**Types:**
- **Directed vs Undirected** (one-way vs two-way edges)
- **Weighted vs Unweighted** (edges have costs or not)
- **Cyclic vs Acyclic** (contains loops or not)

**Representation:**
\`\`\`python
# Adjacency List (most common)
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}
\`\`\`

**BFS (Breadth-First Search):**
\`\`\`python
from collections import deque
def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    while queue:
        node = queue.popleft()
        print(node, end=' ')
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
\`\`\`

**DFS (Depth-First Search):**
\`\`\`python
def dfs(graph, node, visited=None):
    if visited is None: visited = set()
    visited.add(node)
    print(node, end=' ')
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
\`\`\`

**BFS vs DFS:**
| Feature | BFS | DFS |
|---------|-----|-----|
| Structure | Queue | Stack/Recursion |
| Shortest path | Yes (unweighted) | No |
| Memory | O(width) | O(depth) |
| Use case | Level-order, shortest path | Cycle detection, topological sort |

**⚡ Summary:** Graphs model relationships. BFS for shortest path, DFS for exploration. Master both!`;
  }

  // Default: provide helpful structured response
  return `## 📚 Let's Explore This!

I'd love to give you a deep explanation! Here's what I can teach you in detail:

**🖥️ Data Structures:**
- Arrays, Linked Lists, Stacks, Queues
- Trees (BST, AVL, Heaps)
- Graphs, Hash Tables

**⚙️ Algorithms:**
- Sorting (Bubble, Merge, Quick Sort)
- Searching (Linear, Binary Search)
- Recursion & Dynamic Programming
- Graph Algorithms (BFS, DFS)

**🏗️ Concepts:**
- OOP (Encapsulation, Inheritance, Polymorphism, Abstraction)
- Time & Space Complexity
- Database concepts

**Try asking something specific like:**
- "Explain binary search with an example"
- "What is dynamic programming?"
- "How does a hash map work?"
- "Mujhe recursion samjhao"

I'll give you a complete explanation with examples, analogies, code, and practice questions! 🎯`;
}
