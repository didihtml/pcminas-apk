import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import cardsRouter from './routes/cards'

const app = express()
const port = Number(process.env.PORT ?? 3001)

app.use(cors())
app.use(express.json())
app.use('/api', cardsRouter)

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error)

  response.status(500).json({
    message: 'Erro interno ao acessar o banco PostgreSQL.',
  })
})

app.listen(port, () => {
  console.log(`API Prisma disponível em http://localhost:${port}`)
})
