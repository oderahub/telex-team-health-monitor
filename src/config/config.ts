import dotenv from 'dotenv'

dotenv.config()
export default {
  typeformApiKey: process.env.TYPEFORM_API_KEY,
  defaultFormId: process.env.DEFAULT_FORM_ID || 'oJXZwgKi'
}
