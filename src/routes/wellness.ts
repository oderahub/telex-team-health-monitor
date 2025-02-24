import { Router } from 'express'
import { createForm, getFormResponses } from '../services/typeformService'
import fetch from 'node-fetch'

const router = Router()
const TELEX_WEBHOOK_URL = 'https://ping.telex.im/v1/webhooks/01953768-51a0-7689-951c-404b5a46a508'

router.post('/send-check-in', async (req, res) => {
  try {
    const form = await createForm()
    const formUrl = form._links?.display || 'URL not found'

    // Send to Telex channel webhook
    const telexPayload = {
      event_name: 'health_check',
      message: `New wellness check-in: ${formUrl}`,
      status: 'success',
      username: 'HealthMonitorBot' // Or your name
    }
    await fetch(TELEX_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(telexPayload)
    }).catch((err) => console.error('Telex webhook error:', err))

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
