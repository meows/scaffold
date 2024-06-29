"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Button } from "~/component/ui/button"
import { Card, CardContent, CardHeader } from "~/component/ui/card"
import { Input } from "~/component/ui/input"

import { API_WEBSOCKET } from "~/constant/config"
import client from "~/server/client"

// —————————————————————————————————————————————————————————————————————————————
// Environment

const mock_messages = [
  "Hello, world!",
  "How are you?",
  "I'm fine, thank you.",
  "And you?",
  "I'm fine too.",
  "Goodbye.",
]

// —————————————————————————————————————————————————————————————————————————————
// Page :: Chat

export default function ChatPage() {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [messages, setMessages] = useState<string[]>(mock_messages)
  const [input, setInput] = useState("")
  const $input = useRef<HTMLInputElement>(null)
  const chat = useMemo(() => client.api.ws.subscribe(), [])

  // ---- Handler ---- //
  const onSend = (e:React.FormEvent) => {
    if (input.length === 0) return
    e.preventDefault()
    e.stopPropagation()
    chat.send(input)
    setInput("")
  }
  const onInput = (e:React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)
  const onKeyDown = useCallback((e:KeyboardEvent) => {
    switch (e.key) {
      case "/":
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
  }, [chat])

  return (
    <div className="p-4">
      <Card className="mt-16">
        <CardHeader className="font-bold text-2xl">Chat</CardHeader>
        <CardContent>
          <main className="grid gap-4">
            <article>
              {messages.map((message, i) => <div key={i}>{message}</div>)}
            </article>
            <form>
              <fieldset className="flex gap-2">
                <Input value={input} onChange={onInput} ref={$input} />
                <Button onClick={onSend}>Send</Button>
              </fieldset>
            </form>
          </main>
        </CardContent>
      </Card>
    </div>
  )
}