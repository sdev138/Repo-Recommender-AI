import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import LlamaAI from 'llamaai';

interface Message {
  text: string,
  sender: "user" | "bot";
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState<'mistral' | 'llama'>('mistral');

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, sender: 'user'}])
      setInputText('');

      const mistralApiKey = ""
      const llamaApiKey = ""

      // adding the LLM API Integration for both Mistral and Llama
      if (selectedModel === 'mistral') {
        // perform mistral api integration
      
      } else {
        // perform llama api integration
      }
    }
  }

  return (
    <>
      {/* <img src={reactLogo} alt="react logo" /> */}
      <div className='app-container'>
        <nav className="sidebar">
          <h2>Welcome</h2>
          <ul>
            <li>Chat</li>
            <li>Profile</li>
          </ul>
          <div className='model-selector'>
            <h3>Select Model</h3>
            {/* Creating the select tag such that it only mistral or llama can be chosen */}
            <select
              value={selectedModel}
              onChange={(i) => setSelectedModel(i.target.value as 'mistral' | 'llama')}
            >
              <option value="mistral">Mistral</option>
              <option value="llama">Llama</option>
            </select>
          </div>
        </nav>

        <main className='chat-container'>
          {/* Creating the messaging function */}
          <div className="chat-messages">
            {/* All chats will appear in this text box */}
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className='chat-input'>
            <input
              type='text'
              value={inputText}
              onChange={(i) => setInputText(i.target.value)}
              placeholder='What repos are you looking for?'
              onKeyDown={(i) => i.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </main>

      </div>
    </>
  )
}

export default App
