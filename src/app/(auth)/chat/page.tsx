"use client"

import client from "~/server/client"

import { useCallback, useEffect, useRef, useState } from "react"

import { Card, CardContent, CardHeader } from "#/ui/card"
import { Button } from "#/ui/button"
import { Input } from "#/ui/input"

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
  "How are you?",
  "I'm fine, thank you.",
  "And you?",
  "I'm fine too.",
  "Goodbye.",
]

// async function getMessages() {
//   return client.chat({ room: "General" }).get()
// }

// —————————————————————————————————————————————————————————————————————————————
// Page :: Chat

export default function ChatPage() {
  const [ws, setWs] = useState(client.ws.subscribe())
  const [messages, setMessages] = useState<string[]>(mock_messages)
  const [input, setInput] = useState("")
  const $input = useRef<HTMLInputElement>(null)
  // const meow = use(getMessages())

  // ---- Handler ---- //
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
    <Card className="h-full">
      <CardContent className="p-4">
        <section className="grid grid-rows-[1fr_auto] gap-4 overflow-y-auto">
          <div className="grid max-h-full gap-2 overflow-y-auto break-words">
            {messages.map((m, i) => <span key={i}>{m}</span>)}
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <Input value={input} onChange={onInput} ref={$input} />
            <Button onClick={onSend}>Send</Button>
          </div>
        </section>
      </CardContent>
    </Card>
  )
}