import { config } from 'dotenv'

config()

export default {
  port: process.env.PORT || '3000', // Fallback to 3000 locally
  typeformApiKey: process.env.TYPEFORM_API_KEY || '',
  telexWebhookUrl: process.env.TELEX_WEBHOOK_URL || '',
  defaultFormId: process.env.DEFAULT_FORM_ID || 'oJXZwgKi'
}
