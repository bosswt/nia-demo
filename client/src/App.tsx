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
    <div>
      <header>
        <div>
          <h1>Chat with AI</h1>
        </div>
      </header>
      <main>
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
        <form className="chat-from" onSubmit={handleSubmit}>
          <input value={input} onChange={(e) => setInput(e.target.value)}></input>
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  )
}

export default App
