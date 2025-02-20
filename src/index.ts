import express from 'express'
import { config } from 'dotenv'
import wellnessRouter from './routes/wellness'
import schedule from 'node-schedule'

config()

const app = express()
app.use(express.json())

app.disable('x-powered-by')

app.use('/api', wellnessRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// Schedule daily at 9 AM
schedule.scheduleJob('0 9 * * *', async () => {
  // Here you would call your wellness check function
  console.log('Scheduled wellness check at 9 AM')
})
