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

      // adding the LLM API Integration for both Mistral and Llama
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
              placeholder='Type your message...'
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
