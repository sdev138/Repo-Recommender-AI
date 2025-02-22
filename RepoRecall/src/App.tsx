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

  // setMessages is the array that would contain all messages in the chat box
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
      <header className="p-6 text-center text-2xl font-semibold">
        AI Chat Interface
      </header>
      <main className="flex flex-col flex-grow items-center justify-center px-4">
        <div className="w-full max-w-2xl p-4 bg-gray-900 shadow-lg rounded-2xl">
          <div className="flex flex-col gap-4">
            <select 
              value={llm} 
              onChange={(e) => setLLM(e.target.value)} 
              className="p-2 bg-gray-800 text-white rounded-md"
            >
              <option value="mistral">Mistral</option>
              <option value="llama">Llama</option>
            </select>
            <div className="h-96 overflow-y-auto bg-gray-800 p-4 rounded-lg">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 my-2 rounded-lg w-fit max-w-xs ${
                    msg.sender === "user" ? "bg-blue-500 ml-auto" : "bg-gray-700"
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow p-2 bg-gray-800 text-white rounded-md"
              />
              <button 
                onClick={sendMessage} 
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
          </div>
        </div>
      </div>
    </main>

    











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
