import fetch from 'node-fetch'
import config from '../config/config'

interface TypeformQuestion {
  title: string
  type: 'rating' | 'multiple_choice' | 'yes_no' | 'short_text'
  properties?: {
    allow_multiple_selection?: boolean
    choices?: Array<{ label: string }>
    description?: string
    steps?: number
  }
}

interface TypeformResponse {
  id: string
  _links: {
    display: string
  }
}

let currentFormId: string | null = null

export function setCurrentFormId(id: string) {
  currentFormId = id
}

export function getCurrentFormId(): string {
  return currentFormId || config.defaultFormId || 'oJXZwgKi'
}

export async function createForm(): Promise<TypeformResponse> {
  const questions: TypeformQuestion[] = [
    {
      title: 'How are you feeling today?',
      type: 'rating',
      properties: {
        description: 'Scale from 1-10',
        steps: 10
      }
    },
    {
      title: 'What emotions are you experiencing right now?',
      type: 'multiple_choice',
      properties: {
        allow_multiple_selection: true,
        choices: [
          { label: 'Happy' },
          { label: 'Sad' },
          { label: 'Anxious' },
          { label: 'Stressed' },
          { label: 'Excited' },
          { label: 'Neutral' },
          { label: 'Other' }
        ]
      }
    },
    {
      title: 'Have you been able to maintain a good work-life balance this week?',
      type: 'yes_no'
    },
    {
      title: 'Did you get enough sleep last night?',
      type: 'yes_no'
    },
    {
      title: 'Have you experienced any physical health issues recently?',
      type: 'short_text'
    },
    {
      title: 'Are you engaging in regular physical activity?',
      type: 'yes_no'
    },
    {
      title: 'How would you rate your stress level today?',
      type: 'rating',
      properties: {
        description: 'Scale from 1-10',
        steps: 10
      }
    },
    {
      title: 'Do you feel mentally drained?',
      type: 'yes_no'
    },
    {
      title: 'Have you taken breaks or engaged in relaxation activities today?',
      type: 'yes_no'
    },
    {
      title: 'Do you feel your current remote work setup is effective?',
      type: 'yes_no'
    },
    {
      title: 'Are you facing any challenges with your remote work setup?',
      type: 'short_text'
    },
    {
      title: 'How would you rate your productivity this week?',
      type: 'rating',
      properties: {
        description: 'Scale from 1-10',
        steps: 10
      }
    },
    {
      title: 'How connected do you feel with your team members?',
      type: 'rating',
      properties: {
        description: 'Scale from 1-10',
        steps: 10
      }
    },
    {
      title: 'Have you had meaningful interactions with your colleagues this week?',
      type: 'yes_no'
    },
    {
      title: 'Do you feel supported by your team and management?',
      type: 'yes_no'
    },
    {
      title: 'Have you learned something new or grown professionally this week?',
      type: 'yes_no'
    },
    {
      title: 'Are there any skills or resources you feel you need to better perform your job?',
      type: 'short_text'
    }
  ]

  const body = {
    title: 'Remote Team Health Check',
    fields: questions
  }

  const response = await fetch('https://api.typeform.com/forms', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.typeformApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    throw new Error(`Failed to create form: ${response.statusText}`)
  }

  const data = await response.json()
  setCurrentFormId(data.id)
  return data
}

export async function getFormResponses(): Promise<any> {
  const formId = getCurrentFormId()
  const response = await fetch(`https://api.typeform.com/forms/${formId}/responses`, {
    headers: {
      Authorization: `Bearer ${config.typeformApiKey}`
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch responses: ${response.statusText}`)
  }

  return await response.json()
}
