import express from 'express'
import { config } from 'dotenv'
import wellnessRouter from './routes/wellness'
import schedule from 'node-schedule'

config()

const app = express()
app.use(express.json())

app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.send('Team health monitor!')
})

app.use('/api', wellnessRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
