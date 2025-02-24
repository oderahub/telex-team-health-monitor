# Remote Team Health Monitor

A Telex Interval Integration that sends daily wellness check-ins to monitor remote team health using Typeform.

## Overview

This integration automates the process of collecting team well-being data by generating a Typeform survey daily at 9 AM and posting the survey URL to the `team-health-monitor` channel in Telex. It’s designed to help remote teams track physical and mental health, work environment effectiveness, team connectivity, and professional growth.

### Key Features

- Creates a daily Typeform survey with 17 questions covering general well-being, physical/mental health, work setup, team interaction, and personal development.
- Sends the survey URL to the `team-health-monitor` Telex channel at 9 AM.
- Supports response tracking via the `/get-responses` endpoint.

### Project Details

- **Deployed URL:** [https://telex-team-health-monitor.onrender.com](https://telex-team-health-monitor.onrender.com)
- **Integration JSON:** [https://telexintegrations.github.io/telex-team-health-monitor/integration.json](https://telexintegrations.github.io/telex-team-health-monitor/integration.json)
- **Author:** Chidera
- **GitHub Profile:** [https://github.com/oderahub](https://github.com/oderahub)
- **Version:** 1.0.0

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- Typeform API Key (stored in `.env` as `TYPEFORM_API_KEY`)
- GitHub repository under `telexintegrations/telex-team-health-monitor`
- Render account for deployment
- Telex account with access to the `telexintegrations` organization

### Local Development

1. **Clone the Repository:**
   ```bash
   git clone git@github.com:telexintegrations/telex-team-health-monitor.git
   cd telex-team-health-monitor
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Set Environment Variables:**
   - Create a `.env` file in the root:
     ```plaintext
     TYPEFORM_API_KEY=your_typeform_api_key_here
     ```
4. **Run Locally:**
   ```bash
   npm run dev
   ```
   - Server runs on `http://localhost:3000`.

## Deployment

### Build the Project:

```bash
npm run build
```

### Deploy to Render:

1. Link the repository to Render.
2. Set Build Command: `npm install && npm run build`
3. Set Start Command: `npm start`
4. Add Environment Variable: `TYPEFORM_API_KEY`
5. Deployed URL: `https://telex-team-health-monitor.onrender.com`

## Hosting Integration JSON

### Add to `docs/`:

1. Place `integration.json` and `.nojekyll` in the `docs/` folder.
2. **Enable GitHub Pages:**
   - Go to `Settings > Pages > Source: main, Folder: /docs`.
   - URL: [https://telexintegrations.github.io/telex-team-health-monitor/integration.json](https://telexintegrations.github.io/telex-team-health-monitor/integration.json)

## How to Test the Integration

### Local Testing

1. **Start the Server:**
   ```bash
   npm run dev
   ```
2. **Test `/send-check-in`:**
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"return_url": "http://localhost:3000/api/test-return"}' http://localhost:3000/api/send-check-in
   ```
   - **Expected Response:**
     ```json
     {
       "success": true,
       "message": "Check-in sent",
       "formUrl": "https://form.typeform.com/to/[new-id]"
     }
     ```
   - **Verify Form:** Open `formUrl` in a browser, submit a test response.
3. **Test `/get-responses`:**
   ```bash
   curl http://localhost:3000/api/get-responses
   ```
   - **Expected:**
     ```json
     {"success":true,"data":{"items":[...],"total_items":1,"page_count":1}}
     ```
4. **Test Webhook Callback:**
   - Check the console for `Received from return_url with the form URL` message.

### Deployed Testing

1. **Test `/send-check-in`:**
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"return_url": "http://localhost:3000/api/test-return"}' https://telex-team-health-monitor.onrender.com/api/send-check-in
   ```
   - Verify the form URL works.
   - **Check Render Logs:** Ensure no errors and form creation succeeds.

### Telex Integration Testing

1. **Add Integration:**
   - Telex UI > Apps > "Add Integration"
   - Enter: [https://telexintegrations.github.io/telex-team-health-monitor/integration.json](https://telexintegrations.github.io/telex-team-health-monitor/integration.json)
   - Save and confirm "Remote Team Health Monitor" appears.
2. **Set Output:**
   - Apps > "Remote Team Health Monitor" > "Manage Access" > "Output" > Check only `team-health-monitor` > Save.
3. **Test Trigger:**
   - Current interval: `*/5 * * * *` (every 5 minutes).
   - Wait 5 minutes, then check the `team-health-monitor` channel for `New wellness check-in: [form-url]`.
   - Open the URL, submit a response.
4. **Adjust for Production:**
   - Update `integration.json` to `0 9 * * *`, re-push, re-add in Telex.
   - Wait until 9 AM to verify the daily trigger.

## Notes

- **Webhook:** The app uses a hardcoded Telex webhook (`https://ping.telex.im/v1/webhooks/01953768-51a0-7689-951c-404b5a46a508`) to send messages to the `team-health-monitor` channel.
- **Logo:** Uses a Cloudinary placeholder; replace with a custom logo if desired.
- **For issues:** Contact the author or check Render/Telex logs.
