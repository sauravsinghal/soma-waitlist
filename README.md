<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run locally (frontend + secure SOMA voice backend)

## What this setup does
- `TALK_TO_SOMA_ASSISTANT` opens a realtime voice assistant (mic conversation, not chat text).
- OpenAI key stays only on server (`OPENAI_API_KEY` in `.env`).
- Browser gets short-lived token from `/api/realtime/session` and connects to OpenAI Realtime directly over WebRTC.

## Setup
1. Install dependencies:
   `npm install`
2. Create `.env` in project root:
   `OPENAI_API_KEY=your_openai_api_key`

Optional:
- `OPENAI_REALTIME_MODEL=gpt-realtime`
- `OPENAI_VOICE=verse`
- `OPENAI_MODEL=gpt-4.1-mini`
- `PORT=8787`

## Run
- Start frontend + backend:
  `npm run dev:full`

Frontend: `http://localhost:3000`
Backend health check: `http://localhost:8787/api/health`
