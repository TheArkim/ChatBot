import "./App.css"
import fetchData from "./helper/fetch"
import React, { useState } from "react"

const App = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState("")

  const handleSendMessage = async (event) => {
    event?.preventDefault()

    const text = input.trim()
    if (!text || isSending) {
      return
    }

    setMessages((previousMessages) => [
      ...previousMessages,
      { text, sender: "user" },
    ])
    setInput("")
    setError("")
    setIsSending(true)

    try {
      const response = await fetchData("chatbot", {
        query: { message: text },
      })

      setMessages((previousMessages) => [
        ...previousMessages,
        { text: response.data, sender: "bot" },
      ])
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <main className="chatbot">
      <h1>Chatbot</h1>
      <div className="messages" aria-live="polite">
        {messages.length === 0 && (
          <p className="empty-state">Ask me something to get started.</p>
        )}
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
      <form className="input-area" onSubmit={handleSendMessage}>
        <input
          aria-label="Message"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          placeholder="Ask something..."
          disabled={isSending}
        />
        <button type="submit" disabled={isSending || !input.trim()}>
          {isSending ? "Sending..." : "Send"}
        </button>
      </form>
    </main>
  )
}

export default App
