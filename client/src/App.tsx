import './App.css'
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from 'ai'
import { useMemo } from 'react'

function App() {
  const { messages, sendMessage, status, stop, error, regenerate, setMessages, clearError } = useChat({
    transport: useMemo(() => new DefaultChatTransport({
      api: "http://localhost:4111/chat"
    }), [])
  })


  return (
    <div>
      <header>
        <div>
          <h1>AI Chat</h1>
          <p>AI Assistant</p>
        </div>
      </header>
      <main>
        <button onClick={() => sendMessage({ text: "Hello", })}>Submit</button>
        <div>
          {messages.map((message) => {
            const textParts = message.parts.filter((p: any) => p.type === "text")
            const text = textParts.map((p: any) => p.text).join("")
            return (
              <div key={message.id}>
                <div>{message.role}</div>
                <p>{text}</p>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default App
