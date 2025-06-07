"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Dummy data types
interface Note {
  id: number;
  title: string;
  content: string;
  is_public: boolean;
  created_at: string;
  slug: string;
}

// Mock shared notes data with slugs
const mockSharedNotes: Note[] = [
  {
    id: 1,
    title: "Complete JavaScript Interview Guide",
    content: `# JavaScript Interview Guide

## Table of Contents
1. [Fundamentals](#fundamentals)
2. [ES6+ Features](#es6-features)
3. [Asynchronous JavaScript](#async-js)
4. [DOM Manipulation](#dom)
5. [Common Interview Questions](#questions)

## Fundamentals

### Variables and Scope
\`\`\`javascript
// var vs let vs const
var globalVar = "I'm global";
let blockScoped = "I'm block scoped";
const constant = "I can't be reassigned";
\`\`\`

### Hoisting
JavaScript moves variable and function declarations to the top of their scope during compilation.

\`\`\`javascript
console.log(x); // undefined (not ReferenceError)
var x = 5;

// Function hoisting
sayHello(); // "Hello!" - works!
function sayHello() {
  console.log("Hello!");
}
\`\`\`

## ES6+ Features

### Arrow Functions
\`\`\`javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;
\`\`\`

### Destructuring
\`\`\`javascript
// Array destructuring
const [first, second] = [1, 2, 3];

// Object destructuring
const { name, age } = { name: "John", age: 30 };
\`\`\`

### Template Literals
\`\`\`javascript
const name = "World";
const greeting = \`Hello, \${name}!\`;
\`\`\`

## Asynchronous JavaScript

### Promises
\`\`\`javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched!");
    }, 1000);
  });
};

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
\`\`\`

### Async/Await
\`\`\`javascript
async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

## Common Interview Questions

### 1. What is the difference between == and ===?
- \`==\` performs type coercion
- \`===\` checks both value and type

### 2. Explain closures
A closure is when an inner function has access to variables from its outer function's scope.

\`\`\`javascript
function outerFunction(x) {
  return function innerFunction(y) {
    return x + y; // Inner function has access to 'x'
  };
}
\`\`\`

### 3. What is the event loop?
The event loop is what allows JavaScript to perform non-blocking operations despite being single-threaded.

### 4. Explain prototypal inheritance
JavaScript objects can inherit directly from other objects through the prototype chain.

## Best Practices
- Use strict mode
- Avoid global variables
- Use meaningful variable names
- Handle errors properly
- Use modern ES6+ features
- Write clean, readable code`,
    is_public: true,
    created_at: "2024-01-15T10:30:00Z",
    slug: "javascript-interview-guide",
  },
  {
    id: 2,
    title: "React Hooks Deep Dive",
    content: `# React Hooks Deep Dive

## Introduction
React Hooks allow you to use state and other React features in functional components.

## useState Hook

### Basic Usage
\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

### Functional Updates
\`\`\`jsx
// When new state depends on previous state
setCount(prevCount => prevCount + 1);
\`\`\`

## useEffect Hook

### Basic Effect
\`\`\`jsx
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Dependency array

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}
\`\`\`

### Cleanup
\`\`\`jsx
useEffect(() => {
  const subscription = subscribeToSomething();
  
  return () => {
    // Cleanup function
    subscription.unsubscribe();
  };
}, []);
\`\`\`

## useContext Hook

### Creating Context
\`\`\`jsx
import { createContext, useContext } from 'react';

const ThemeContext = createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Header />
    </ThemeContext.Provider>
  );
}

function Header() {
  const theme = useContext(ThemeContext);
  return <h1 className={theme}>Hello World</h1>;
}
\`\`\`

## useReducer Hook

### Complex State Logic
\`\`\`jsx
import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
    </div>
  );
}
\`\`\`

## Custom Hooks

### Creating Reusable Logic
\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
\`\`\`

## Performance Hooks

### useMemo
\`\`\`jsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
\`\`\`

### useCallback
\`\`\`jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
\`\`\`

## Rules of Hooks
1. Only call hooks at the top level
2. Only call hooks from React functions
3. Use ESLint plugin for hooks

## Best Practices
- Keep effects focused and specific
- Use dependency arrays correctly
- Extract custom hooks for reusable logic
- Use useCallback and useMemo sparingly`,
    is_public: true,
    created_at: "2024-01-20T14:15:00Z",
    slug: "react-hooks-deep-dive",
  },
  {
    id: 3,
    title: "System Design Fundamentals",
    content: `# System Design Fundamentals

## Overview
System design is the process of defining the architecture, components, modules, interfaces, and data for a system to satisfy specified requirements.

## Key Concepts

### Scalability

#### Horizontal vs Vertical Scaling
- **Vertical Scaling (Scale Up)**: Adding more power to existing machines
- **Horizontal Scaling (Scale Out)**: Adding more machines to the pool of resources

#### Load Balancing
\`\`\`
Client → Load Balancer → [Server 1, Server 2, Server 3]
\`\`\`

Types of load balancers:
- Layer 4 (Transport Layer)
- Layer 7 (Application Layer)

### Caching

#### Cache Levels
1. **Browser Cache**: Client-side caching
2. **CDN**: Content Delivery Network
3. **Application Cache**: In-memory caching (Redis, Memcached)
4. **Database Cache**: Query result caching

#### Cache Patterns
- **Cache-Aside**: Application manages cache
- **Write-Through**: Write to cache and database simultaneously
- **Write-Behind**: Write to cache first, database later

### Database Design

#### SQL vs NoSQL

**SQL Databases (RDBMS)**
- ACID properties
- Strong consistency
- Complex queries with JOINs
- Examples: PostgreSQL, MySQL

**NoSQL Databases**
- BASE properties (Basically Available, Soft state, Eventual consistency)
- Horizontal scaling
- Flexible schema
- Types: Document, Key-Value, Column-family, Graph

#### Database Sharding
Partitioning data across multiple databases:
\`\`\`
User ID 1-1000 → Shard 1
User ID 1001-2000 → Shard 2
User ID 2001-3000 → Shard 3
\`\`\`

### Microservices Architecture

#### Benefits
- Independent deployment
- Technology diversity
- Fault isolation
- Team autonomy

#### Challenges
- Network complexity
- Data consistency
- Service discovery
- Monitoring and debugging

#### Communication Patterns
- **Synchronous**: HTTP/REST, gRPC
- **Asynchronous**: Message queues, Event streaming

### Message Queues

#### Use Cases
- Decoupling services
- Handling traffic spikes
- Ensuring reliability

#### Popular Solutions
- Apache Kafka
- RabbitMQ
- Amazon SQS
- Redis Pub/Sub

### API Design

#### REST Principles
- Stateless
- Cacheable
- Uniform interface
- Layered system

#### GraphQL
- Single endpoint
- Client-specified queries
- Strong type system
- Real-time subscriptions

### Security

#### Authentication vs Authorization
- **Authentication**: Who you are
- **Authorization**: What you can do

#### Common Security Measures
- HTTPS/TLS encryption
- JWT tokens
- OAuth 2.0
- Rate limiting
- Input validation

### Monitoring and Observability

#### The Three Pillars
1. **Metrics**: Quantitative measurements
2. **Logs**: Discrete events
3. **Traces**: Request flow through system

#### Key Metrics
- Latency
- Throughput
- Error rate
- Saturation

## Common System Design Patterns

### Circuit Breaker
Prevents cascading failures by monitoring service health.

### Bulkhead
Isolates critical resources to prevent total system failure.

### Saga Pattern
Manages distributed transactions across microservices.

### CQRS (Command Query Responsibility Segregation)
Separates read and write operations for better performance.

## Design Process

### 1. Requirements Gathering
- Functional requirements
- Non-functional requirements
- Scale estimation

### 2. High-Level Design
- Major components
- Data flow
- API design

### 3. Detailed Design
- Database schema
- Algorithms
- Technology choices

### 4. Scale the Design
- Identify bottlenecks
- Add caching
- Implement load balancing
- Consider data partitioning

## Example: Designing a URL Shortener

### Requirements
- Shorten long URLs
- Redirect to original URL
- Custom aliases
- Analytics
- 100:1 read/write ratio
- 100M URLs per day

### High-Level Design
\`\`\`
Client → Load Balancer → Web Servers → Cache → Database
                                    ↓
                              Analytics Service
\`\`\`

### Database Schema
\`\`\`sql
CREATE TABLE urls (
  id BIGINT PRIMARY KEY,
  short_url VARCHAR(7) UNIQUE,
  long_url TEXT,
  created_at TIMESTAMP,
  expires_at TIMESTAMP
);
\`\`\`

### Algorithm for Short URL Generation
- Base62 encoding (a-z, A-Z, 0-9)
- 7 characters = 62^7 ≈ 3.5 trillion combinations

This covers the fundamental concepts you need to understand for system design interviews and real-world applications.`,
    is_public: true,
    created_at: "2024-01-25T09:45:00Z",
    slug: "system-design-fundamentals",
  },
  {
    id: 4,
    title: "Data Structures and Algorithms Cheat Sheet",
    content: `# Data Structures and Algorithms Cheat Sheet

## Time Complexity Cheat Sheet

### Big O Notation
- **O(1)**: Constant time
- **O(log n)**: Logarithmic time
- **O(n)**: Linear time
- **O(n log n)**: Linearithmic time
- **O(n²)**: Quadratic time
- **O(2^n)**: Exponential time

## Data Structures

### Arrays
**Time Complexity:**
- Access: O(1)
- Search: O(n)
- Insertion: O(n)
- Deletion: O(n)

**Use Cases:**
- When you need indexed access
- Mathematical operations
- Implementing other data structures

### Linked Lists
**Time Complexity:**
- Access: O(n)
- Search: O(n)
- Insertion: O(1)
- Deletion: O(1)

**Types:**
- Singly Linked List
- Doubly Linked List
- Circular Linked List

**Implementation:**
\`\`\`javascript
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  
  prepend(val) {
    this.head = new ListNode(val, this.head);
  }
  
  append(val) {
    if (!this.head) {
      this.head = new ListNode(val);
      return;
    }
    
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = new ListNode(val);
  }
}
\`\`\`

### Stacks
**LIFO (Last In, First Out)**

**Operations:**
- Push: O(1)
- Pop: O(1)
- Peek: O(1)

**Use Cases:**
- Function call management
- Undo operations
- Expression evaluation
- Backtracking algorithms

### Queues
**FIFO (First In, First Out)**

**Operations:**
- Enqueue: O(1)
- Dequeue: O(1)
- Front: O(1)

**Use Cases:**
- BFS traversal
- Process scheduling
- Handling requests

### Hash Tables
**Time Complexity (Average):**
- Search: O(1)
- Insertion: O(1)
- Deletion: O(1)

**Collision Resolution:**
- Chaining
- Open Addressing (Linear Probing, Quadratic Probing)

### Trees

#### Binary Trees
**Properties:**
- Each node has at most 2 children
- Left and right subtrees

#### Binary Search Trees (BST)
**Properties:**
- Left subtree < root < right subtree
- In-order traversal gives sorted sequence

**Time Complexity (Balanced):**
- Search: O(log n)
- Insertion: O(log n)
- Deletion: O(log n)

**Traversals:**
\`\`\`javascript
// In-order (Left, Root, Right)
function inorder(root) {
  if (!root) return;
  inorder(root.left);
  console.log(root.val);
  inorder(root.right);
}

// Pre-order (Root, Left, Right)
function preorder(root) {
  if (!root) return;
  console.log(root.val);
  preorder(root.left);
  preorder(root.right);
}

// Post-order (Left, Right, Root)
function postorder(root) {
  if (!root) return;
  postorder(root.left);
  postorder(root.right);
  console.log(root.val);
}
\`\`\`

### Heaps
**Properties:**
- Complete binary tree
- Max Heap: Parent ≥ children
- Min Heap: Parent ≤ children

**Operations:**
- Insert: O(log n)
- Extract Max/Min: O(log n)
- Peek: O(1)

### Graphs
**Representations:**
- Adjacency Matrix: O(V²) space
- Adjacency List: O(V + E) space

**Traversals:**
- DFS (Depth-First Search): O(V + E)
- BFS (Breadth-First Search): O(V + E)

## Algorithms

### Sorting Algorithms

#### Quick Sort
**Time Complexity:**
- Best/Average: O(n log n)
- Worst: O(n²)

\`\`\`javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
\`\`\`

#### Merge Sort
**Time Complexity:** O(n log n)
**Space Complexity:** O(n)

\`\`\`javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i), right.slice(j));
}
\`\`\`

### Search Algorithms

#### Binary Search
**Time Complexity:** O(log n)
**Prerequisite:** Sorted array

\`\`\`javascript
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}
\`\`\`

### Dynamic Programming

#### Common Patterns
1. **Fibonacci Sequence**
2. **Longest Common Subsequence**
3. **Knapsack Problem**
4. **Coin Change**

#### Example: Fibonacci with Memoization
\`\`\`javascript
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}
\`\`\`

## Common Algorithm Patterns

### Two Pointers
**Use Cases:**
- Pair with target sum
- Palindrome checking
- Removing duplicates

### Sliding Window
**Use Cases:**
- Maximum sum subarray
- Longest substring problems
- Minimum window substring

### Fast and Slow Pointers
**Use Cases:**
- Cycle detection in linked lists
- Finding middle of linked list

### Merge Intervals
**Use Cases:**
- Overlapping intervals
- Meeting rooms problems

### Top K Elements
**Use Cases:**
- K largest/smallest elements
- Top K frequent elements

This cheat sheet covers the most important data structures and algorithms you'll encounter in technical interviews and real-world programming.`,
    is_public: true,
    created_at: "2024-01-30T16:20:00Z",
    slug: "data-structures-algorithms-cheat-sheet",
  },
];

export default function SharedNotePage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        if (!slug || typeof slug !== "string") {
          setError("Invalid note URL");
          setLoading(false);
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const foundNote = mockSharedNotes.find((n) => n.slug === slug);

        if (foundNote) {
          setNote(foundNote);
        } else {
          setError("Note not found or is not public");
        }
      } catch (err) {
        setError("An error occurred while fetching the note");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [slug]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date";
    }
  };

  const renderMarkdown = (content: string) => {
    return (
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/notes"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to notes
          </Link>

          {loading ? (
            <Card className="animate-pulse">
              <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </CardContent>
            </Card>
          ) : error ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Error</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button asChild>
                  <Link href="/notes">Go back to notes</Link>
                </Button>
              </CardContent>
            </Card>
          ) : note ? (
            <Card className="shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="text-3xl font-bold">
                  {note.title}
                </CardTitle>
                <CardDescription className="text-base">
                  Shared on {formatDate(note.created_at)} • Public Note
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8">
                {renderMarkdown(note.content)}
              </CardContent>
            </Card>
          ) : null}
        </div>
      </main>
    </div>
  );
}
