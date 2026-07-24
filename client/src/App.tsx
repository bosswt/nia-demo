import './App.css'
import { useState, useMemo } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Streamdown } from 'streamdown'

// The backend /chat endpoint. Override with VITE_CHAT_API_URL if needed.
const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL ?? 'http://localhost:4111/chat'

function App() {
  const [input, setInput] = useState('')

  const { messages, sendMessage, status, stop, error, regenerate, setMessages, clearError } =
    useChat({
      transport: useMemo(() => new DefaultChatTransport({ api: CHAT_API_URL }), []),
    })

  const isBusy = status === 'submitted' || status === 'streaming'

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || isBusy) return
    sendMessage({ text })
    setInput('')
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>NIA AI</h1>
          <p className="sub">AI Assistant — Mock Chat</p>
        </div>
        <button
          className="ghost"
          onClick={() => setMessages([])}
          disabled={messages.length === 0 || isBusy}
          title="Clear conversation"
        >
          Clear
        </button>
      </header>

      <main className="messages">
        {messages.length === 0 && (
          <div className="empty">
            <h2>Start a conversation</h2>
            <p>Type a message below and the assistant will reply.</p>
            <div className="suggestions">
              {['Hello!', 'What can you do?', 'สวัสดีครับ'].map((s) => (
                <button
                  key={s}
                  className="chip"
                  onClick={() => {
                    if (isBusy) return
                    sendMessage({ text: s })
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => {
          const textParts = m.parts.filter((p: any) => p.type === 'text')
          const text = textParts.map((p: any) => p.text).join('')

          return (
            <div key={m.id} className={`row ${m.role}`}>
              <div className="bubble">
                <div className="role-tag">{m.role === 'user' ? 'You' : 'NIA AI'}</div>
                {m.role === 'assistant' ? (
                  <Streamdown>{text}</Streamdown>
                ) : (
                  <div className="user-text">{text}</div>
                )}

                {m.role === 'assistant' && text && (
                  <button
                    className="copy"
                    onClick={() => navigator.clipboard.writeText(text)}
                    title="Copy answer"
                  >
                    Copy
                  </button>
                )}
              </div>
            </div>
          )
        })}

        {status === 'submitted' && (
          <div className="row assistant">
            <div className="bubble">
              <div className="role-tag">NIA AI</div>
              <div className="thinking">Thinking…</div>
            </div>
          </div>
        )}
      </main>

      {error && (
        <div className="error-bar">
          <span>Something went wrong: {error.message}</span>
          <div className="error-actions">
            <button
              onClick={() => {
                clearError()
                regenerate()
              }}
            >
              Retry
            </button>
            <button className="ghost" onClick={() => clearError()}>
              Dismiss
            </button>
          </div>
        </div>
      )}

      <form className="composer" onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message…"
          aria-label="Message"
        />
        {isBusy ? (
          <button type="button" className="stop" onClick={() => stop()}>
            Stop
          </button>
        ) : (
          <button type="submit" disabled={!input.trim()}>
            Send
          </button>
        )}
      </form>

      <footer className="status-line">
        <span className={`dot ${status}`} />
        <span>status: {status}</span>
        <span className="api">· {CHAT_API_URL}</span>
      </footer>
    </div>
  )
}

export default App
