import React, { useState, useEffect, useRef } from 'react'
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import './App.css'

interface Message {
  text: string;
  sender: "user" | "bot";
}

function App() {
  const [count, setCount] = useState(0)
  const [daddyCount, setDaddy] = useState(1)
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [llm, setLLM] = useState<string>("mistral");
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // Simulating API call to selected LLM
    const response: string = `Response from ${llm.toUpperCase()}: ${input}`;
    // setTimeout() function executes a function after a specified delay
    setTimeout(() => {
      setMessages([...newMessages, { text: response, sender: "bot" }]);
    }, 1000); 
  };

  return (
    <>
      {/* Add some pictures or a logo here */}
      <h1>Discover new Repositories</h1>
      <header className="p-6 text-center text-2xl font-semibold">
        Welcome to RepoRecall 
      </header>
      {/* Creating the chat input right here */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          {/* Edit <code>src/App.tsx</code> and save to test HMR */}
          Welcome to RepoRecall
        </p>
      </div>
      {/* Creating the increment below */}
      <button className="Testing Daddy Buttons (delete)" onClick={() => setDaddy((daddyCount) => daddyCount + 1)}>
        Press Me Daddy!
        I'm your #{daddyCount}
      </button>
      <h3>Thank you for visiting my site</h3>
    </>
  )
}

export default App
