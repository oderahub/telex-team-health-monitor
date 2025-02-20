import fetch from 'node-fetch'
import config from '../config/config'

async function postToTelex(message: string): Promise<void> {
  // This is a placeholder. You'll need to implement the actual Telex API interaction.
  console.log('Sending to Telex:', message)
  // Example assuming Telex has an endpoint for sending messages:
  // await fetch(config.telexWebhookUrl, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({ message })
  // });
}

export { postToTelex }
