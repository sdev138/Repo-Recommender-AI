import React, { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [count, setCount] = useState(0)
  const [daddyCount, setDaddy] = useState(1)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Discover new Repositories</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          {/* Edit <code>src/App.tsx</code> and save to test HMR */}
          Welcome to RepoRecall
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* Creating the increment below */}
      <button onClick={() => setDaddy((daddyCount) => daddyCount + 1)}>
        Press Me Daddy!
        I'm your #{daddyCount}
      </button>
      <h3>Thank you for visiting my site</h3>
    </>
  )
}

export default App
