import express from 'express'
import https from 'https'
import config from './config/config'
import wellnessRouter from './routes/wellness'
import { errorHandler } from './utils/errorHandler'
import cron from 'node-cron'
import cors from 'cors'

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

app.use(errorHandler)

const PORT = config.port
app.listen(PORT, () => console.log(`Server running on port ${config.port}`))

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
