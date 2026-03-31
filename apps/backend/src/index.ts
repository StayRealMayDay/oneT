import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createMessage, listMessages } from './db.js'

const app = new Hono()

app.use('/*', cors())

app.get('/api/health', (c) => {
  return c.json({ status: 'ok' })
})

app.get('/api/messages', (c) => {
  return c.json({ messages: listMessages() })
})

app.post('/api/messages', async (c) => {
  const body = await c.req.json<{ content?: string }>()
  const content = body.content?.trim()

  if (!content) {
    return c.json({ error: 'content is required' }, 400)
  }

  return c.json({ message: createMessage(content) }, 201)
})

const port = Number(process.env.PORT ?? 8787)

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Backend listening on http://localhost:${info.port}`)
  },
)
