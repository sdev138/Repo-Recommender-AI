import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Mistral } from '@mistralai/mistralai'
import OpenAI from "openai";
import { Routes, Route, Link } from 'react-router-dom'
import Profile from './Profile'
import Repo from './Repo'
import Login from './Login'
import mistralLogo from './assets/mistral-logo.png'
import openaiLogo from './assets/openai-logo.png'

interface Message {
  text: string | null | undefined,
  sender: "user" | "bot";
  model: 'mistral' | 'openai';
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState<'mistral' | 'openai'>('mistral');

  const handleSend = async () => {
    console.log("Inside the handleSend const")
    if (inputText.trim()) {
      console.log("Their is input text, first if statement")
      setMessages([...messages, { text: inputText, sender: 'user', model: selectedModel}])
      setInputText('');

      console.log("After setting the messages and inputText...")

      // declaring different api keys
      const mistralApiKey = import.meta.env.VITE_MISTRAL_API_KEY
      const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY

      console.log("After setting the api tokens")

      const mistralClient = new Mistral({apiKey: mistralApiKey})
      const openai = new OpenAI({ apiKey: openaiApiKey, dangerouslyAllowBrowser: true });

      console.log("After declarations")

      // adding the LLM API Integration for both Mistral and Llama
      if (selectedModel === 'mistral') {
        console.log("If the selected model is mistral")
        // perform mistral api integration
        const chatResponse = await mistralClient.chat.complete({
          model: 'mistral-large-latest',
          messages: [{role: 'user', content: inputText}]
        })
        console.log("setting the mistral chat")

        // setting the bot messages in the chat
        if (chatResponse.choices && chatResponse.choices.length > 0) {
          setMessages([...messages, {
            text: chatResponse.choices[0].message.content,
            sender: 'bot',
            model: 'mistral' // might have to delete
          }]);
        } else {
          console.error("No choices returned from Mistral API");
        }
      
      } else {
        console.log("Inside the else statement")
        // perform openai api integration
        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            { 
              role: "developer", 
              content: "You are a helpful assistant that is part of a system that tries find repos that complementes a users skill, so that they can contribute to them" 
            },
            {
              role: "user", 
              content: inputText
            }
          ],
          store: true,
        });

        console.log("Finishing openai message integration")

        // setting the openai bot messages in the chat when toggled
        if (completion.choices && completion.choices.length > 0) {
          console.log("Before setting messages")
          setMessages([...messages, {
            text: completion.choices[0].message.content,
            sender: 'bot',
            model: 'openai' // might have to delete
          }]);
          console.log("Finished setting messages")
        } else {
          console.error("No response from openai api")
        }
      }
    }
  }

  return (
    <>
      {/* <img src={reactLogo} alt="react logo" /> */}
      <div className='app-container'>
        <nav className="sidebar">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h2>RepoRecall AI</h2>
          </Link>
          <ul>
            <li><Link to="/">Chat</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/repo">Repositories</Link></li>
          </ul>
          <div className='model-selector'>
            <h3>Select Model</h3>
            {/* Creating the select tag such that it only mistral or llama can be chosen */}
            <select
              value={selectedModel}
              onChange={(i) => setSelectedModel(i.target.value as 'mistral' | 'openai')}
            >
              <option value="mistral">Mistral</option>
              <option value="openai">OpenAI</option>
            </select>
          </div>
        </nav>

        <main className='chat-container'>
          <Routes>
            <Route path="/" element={
              <>
                {/* Creating the messaging function */}
                <div className="chat-messages">
                  {/* placing the images next to chat messages */}
                  {/* All chats will appear in this text box */}
                  {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                      {message.sender === 'bot' && message.model && (
                        <img
                          src={message.model === 'mistral' ? mistralLogo : openaiLogo}
                          alt={`${message.model} logo`}
                          className='bot-logo'
                        />
                      )}
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
                  <button 
                    // syntax is to handle multiple lines of code, not returning anything
                    onClick={() => {
                      console.log("Sending the input message...");
                      handleSend();
                    }}
                    >
                    Send
                  </button>
                </div>
              </>
            } />
            <Route path="/profile" element={<Profile />} />
            <Route path="/repo" element={<Repo />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
