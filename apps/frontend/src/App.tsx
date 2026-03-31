import { useEffect, useState } from 'react'
import { ArrowRight, Database, PanelsTopLeft, Server } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type Message = {
  id: number
  content: string
  created_at: string
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [pending, setPending] = useState(false)

  useEffect(() => {
    void loadMessages()
  }, [])

  async function loadMessages() {
    const response = await fetch('/api/messages')
    const data = (await response.json()) as { messages: Message[] }
    setMessages(data.messages)
  }

  async function handleSeedMessage() {
    setPending(true)

    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `Message created at ${new Date().toLocaleTimeString()}`,
        }),
      })

      await loadMessages()
    } finally {
      setPending(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur md:grid-cols-[1.4fr_0.8fr] md:p-10">
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/10">
              TypeScript Fullstack Monorepo
            </Badge>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl">
                React + Hono running in one pnpm workspace.
              </h1>
              <p className="max-w-2xl text-lg text-slate-300">
                Frontend uses Vite, shadcn/ui and Lucide. Backend uses Hono with SQLite and ships a small API you can extend immediately.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => void handleSeedMessage()} disabled={pending}>
                {pending ? 'Creating...' : 'Create demo message'}
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="outline" asChild>
                <a href="https://ui.shadcn.com/" target="_blank" rel="noreferrer">
                  Open shadcn/ui docs
                </a>
              </Button>
            </div>
          </div>

          <Card className="border-white/10 bg-slate-900/80 text-slate-50">
            <CardHeader>
              <CardTitle>Workspace layout</CardTitle>
              <CardDescription className="text-slate-400">
                Minimal structure for full-stack iteration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-300">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                <PanelsTopLeft className="size-4 text-sky-300" />
                <span>`apps/frontend` for UI and client routing</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                <Server className="size-4 text-violet-300" />
                <span>`apps/backend` for Hono API endpoints</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                <Database className="size-4 text-emerald-300" />
                <span>`dev.db` SQLite database created automatically</span>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card className="border-white/10 bg-slate-900 text-slate-50">
            <CardHeader>
              <CardTitle>Backend messages</CardTitle>
              <CardDescription className="text-slate-400">
                Data loaded from `GET /api/messages`.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {messages.map((message) => (
                <div key={message.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-medium text-slate-100">{message.content}</p>
                  <p className="mt-2 text-xs text-slate-400">{message.created_at}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-900 text-slate-50">
            <CardHeader>
              <CardTitle>Next steps</CardTitle>
              <CardDescription className="text-slate-400">
                Scaffolded defaults you can build on.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Add shared types or a dedicated package when frontend and backend contracts grow.</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Replace the demo endpoint with auth, business logic and migrations.</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Use more shadcn/ui components via `pnpm dlx shadcn@latest add ...` inside `apps/frontend`.</div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}

export default App
