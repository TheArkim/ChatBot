import "./App.css"
import fecthData from "./helper/fetch"
import React, { useState } from "react"

const App = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  const handleSendMessage = async () => {
    setMessages([...messages, { text: input, sender: "user" }])
    setInput("")

    const apiResponse = await fecthData(`chatbot?message=${input.trim()}`, "GET")
    const message = await apiResponse.json()

    const botResponse = { text: message.data, sender: "bot" }
    setMessages((prevMessages) => [...prevMessages, botResponse])
  }

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Ask something..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}

export default App
