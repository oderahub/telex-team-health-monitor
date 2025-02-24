import { Router } from 'express'
import { createForm, getFormResponses } from '../services/typeformService'
import fetch from 'node-fetch'
import config from '../config/config'

const router = Router()

router.post('/send-check-in', async (req, res) => {
  try {
    const form = await createForm()
    const formUrl = form._links?.display || 'URL not found'

    const returnUrl = req.body.return_url || config.telexWebhookUrl

    if (returnUrl) {
      await fetch(returnUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_name: 'health_check',
          message: `New wellness check-in: ${formUrl}`,
          status: 'success',
          username: 'HealthMonitorBot'
        })
      })
    }

    res.json({ success: true, message: 'Check-in sent', formUrl })
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message })
  }
})

router.get('/get-responses', async (req, res) => {
  try {
    const responses = await getFormResponses()
    res.json({ success: true, data: responses })
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message })
  }
})

router.post('/test-return', (req, res) => {
  console.log('Received from return_url:', req.body)
  res.sendStatus(200)
})

export default router
