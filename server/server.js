import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import OpenAI from 'openai';

const app = express();
const port = Number(process.env.PORT || 8787);

const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiModel = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
const openaiRealtimeModel = process.env.OPENAI_REALTIME_MODEL || 'gpt-realtime';
const openaiVoice = process.env.OPENAI_VOICE || 'verse';

const systemInstruction = `
You are SOMA — the System of Metabolic Autopilot.

Language policy:
- Always respond in English by default.
- Do not switch languages unless the user explicitly asks you to switch language in their current message.
- If user input appears in another language but does not explicitly request a language change, continue in English.

You speak with calm authority, like a highly intelligent metabolic physician combined with a systems engineer.

Your goal is to help people understand that their metabolism is a system that can be optimized.

You do not sound like a marketing chatbot.

You explain health through clear cause-and-effect mechanisms.

You help users understand that metabolic diseases such as diabetes develop gradually over decades and can be prevented through intelligent coordination of nutrition, recovery, sleep, and activity.

You position SOMA as a system designed to prevent metabolic decline, not just track fitness.

You answer questions concisely and intelligently.

You ask insightful questions to understand what the user is experiencing.

You occasionally reference that SOMA is launching March 15 and early users are helping shape the system.

Your tone is calm, confident, precise, and slightly futuristic.

Never exaggerate or make unrealistic claims.
`;

const openaiClient = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/realtime/session', async (_req, res) => {
  if (!openaiApiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not configured on the server.' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/realtime/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: openaiRealtimeModel,
        voice: openaiVoice,
        instructions: systemInstruction,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Realtime session creation failed:', response.status, errorText);
      return res.status(502).json({ error: 'Failed to create realtime session token.' });
    }

    const data = await response.json();
    const token = data?.client_secret?.value;

    if (!token) {
      return res.status(502).json({ error: 'Realtime session token missing in response.' });
    }

    return res.json({
      clientSecret: token,
      model: openaiRealtimeModel,
    });
  } catch (error) {
    console.error('Realtime session error:', error);
    return res.status(502).json({ error: 'Failed to create realtime session.' });
  }
});

app.post('/api/soma-assistant', async (req, res) => {
  if (!openaiClient) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not configured on the server.' });
  }

  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
  const history = Array.isArray(req.body?.history) ? req.body.history : [];

  if (!message) {
    return res.status(400).json({ error: 'message is required' });
  }

  const sanitizedHistory = history
    .filter((entry) => entry && (entry.role === 'user' || entry.role === 'assistant') && typeof entry.content === 'string')
    .slice(-12)
    .map((entry) => ({
      role: entry.role,
      content: entry.content.slice(0, 2500),
    }));

  try {
    const response = await openaiClient.responses.create({
      model: openaiModel,
      input: [{ role: 'system', content: systemInstruction }, ...sanitizedHistory],
      temperature: 0.7,
    });

    const reply = response.output_text?.trim();

    if (!reply) {
      return res.status(502).json({ error: 'Assistant returned an empty response.' });
    }

    return res.json({ reply });
  } catch (error) {
    console.error('OpenAI API request failed:', error);
    return res.status(502).json({ error: 'Failed to get response from assistant.' });
  }
});

app.listen(port, () => {
  console.log(`SOMA API running on http://localhost:${port}`);
});
