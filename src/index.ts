import express from 'express'
import https from 'https'
import { config } from 'dotenv'
import wellnessRouter from './routes/wellness'
import schedule from 'node-schedule'
import cron from 'node-cron'
import cors from 'cors'

config()

const app = express()
app.use(express.json())

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.send('Team health monitor!')
})

app.use('/api', wellnessRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

function keepAlive(url: string) {
  https
    .get(url, (res) => {
      console.log(`Status: ${res.statusCode}`)
    })
    .on('error', (error) => {
      console.error(`Error: ${error.message}`)
    })
}

// Schedule a job to keep the server alive
cron.schedule('*/5 * * * *', () => {
  keepAlive('https://telex-team-health-monitor.onrender.com/')
  console.log('Pinged the server every 5 minutes')
})
