import { Router } from 'express'
import { createForm, getFormResponses } from '../services/typeformService'
import { postToTelex } from '../services/telexService'

const router = Router()

router.get('/send-check-in', async (req, res) => {
  try {
    const form = await createForm()
    console.log('Form after creation:', JSON.stringify(form, null, 2)) // Log to see structure

    // Correctly extract the form URL from the response
    const formUrl = form._links?.display || 'URL not found'

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

export default router
