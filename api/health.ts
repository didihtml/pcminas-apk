/**
 * Configuração CORS para as API routes da Vercel
 */
function setCorsHeaders(res: { setHeader: (key: string, value: string) => void }) {
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  )
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  )
}

function handleOptions(res: { status: (code: number) => { end: () => void } }) {
  res.status(200).end()
}

export default function handler(req: { method?: string }, res: { setHeader: (k: string, v: string) => void; status: (c: number) => { end: () => void }; json: (d: unknown) => void }) {
  setCorsHeaders(res)

  if (req.method === "OPTIONS") {
    return handleOptions(res)
  }

  res.json({ ok: true })
}
