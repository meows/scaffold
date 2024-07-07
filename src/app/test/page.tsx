"use client"
import client from "~/server/client"
import "./page.css"

import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "~/component/ui/button"
import ThemeSwitch from "~/component/ThemeSwitch"

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
        <span>Hello</span>
        <ThemeSwitch />
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
  const $chat = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    $chat.current?.scrollTo(0, $chat.current.scrollHeight)
  }, [messages])

  return (
    <section id="ChatComponent">
      <article ref={$chat} className="p-2">
        {messages.map((message, i) => (
          <div key={i} className="p-2">
            {message}
          </div>
        ))}
      </article>
      <form onSubmit={onSend}>
        <input ref={$input} value={input} onChange={onInput} />
        <Button type="submit" className="p-2">Send</Button>
      </form>
    </section>
  )
}