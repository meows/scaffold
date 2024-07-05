"use client"
import client from "~/server/client"
import "./page.css"

import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "~/component/ui/button"

// —————————————————————————————————————————————————————————————————————————————
// Environment

const mock_messages = [
  "Hello, world!",
  "How are you?",
  "I'm fine, thank you.",
  "And you?",
  "I'm fine too.",
  "Goodbye.",
  "Hello, world!",
  "How are you?",
  "I'm fine, thank you.",
  "And you?",
  "I'm fine too.",
  "Goodbye.",
  "Hello, world!",
]

// —————————————————————————————————————————————————————————————————————————————
// Page :: Test

export default function Page() {
  return (
    <main id="Test">
      <header>
        <span>Left</span>
        <span>Right</span>
      </header>
      <ChatComponent />
    </main>
  )
}

function ChatComponent() {
  const [ws, setWs] = useState(client.ws.subscribe())
  const [messages, setMessages] = useState<string[]>(mock_messages)
  const [input, setInput] = useState("")
  const $input = useRef<HTMLInputElement>(null)

  const onSend = (e:React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (input.length === 0) return
    ws.send(String(input))
    setInput("")
  }

  const onInput = (e:React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)

  const onKeyDown = useCallback((e:KeyboardEvent) => {
    switch (e.key) {
      case "/":
        if ($input.current === document.activeElement) return
        e.preventDefault()
        e.stopPropagation()
        $input.current?.focus()
        break
      case "Escape":
        e.preventDefault()
        e.stopPropagation()
        $input.current?.blur()
        break
    }
  }, [])

  // ---- Effects ---- //
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [ws])

  useEffect(() => {
    ws.on("message", (message) => {
      console.log("Received:", message)
      setMessages(state => state.concat(message.data))
    })
    return () => void ws.close()
  }, [])

  return (
    <section id="ChatComponent">
      <div className="flex-1 overflow-y-auto">
        {messages.map((message, i) => (
          <div key={i} className="p-2">
            {message}
          </div>
        ))}
      </div>
      <form onSubmit={onSend}>
        <input ref={$input} value={input} onChange={onInput} />
        <Button type="submit" className="p-2">Send</Button>
      </form>
    </section>
  )
}