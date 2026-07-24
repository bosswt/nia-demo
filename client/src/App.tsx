import './App.css'
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from 'ai'
import { useMemo, useState } from 'react'

function App() {
  const { messages, sendMessage, status, stop, error, regenerate, setMessages, clearError } = useChat({
    transport: useMemo(() => new DefaultChatTransport({
      api: "http://localhost:4111/chat"
    }), [])
  })

  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    sendMessage({ text })
    setInput("")
  }


  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Chat with AI</h1>
          <p className="sub">AI Assistant</p>
        </div>
      </header>
      <main className="messages">
        <div>
          {messages.map((message) => {
            const textParts = message.parts.filter((p: any) => p.type === "text")
            const text = textParts.map((p: any) => p.text).join("")
            return (
              <div key={message.id}>
                <p>{message.role}: {text}</p>
              </div>
            )
          })}
        </div>
      </main>
      <form className="composer" onSubmit={handleSubmit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask me..."></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
