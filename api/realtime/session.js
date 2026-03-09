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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const openaiApiKey = process.env.OPENAI_API_KEY;
  const openaiRealtimeModel = process.env.OPENAI_REALTIME_MODEL || 'gpt-realtime';
  const openaiVoice = process.env.OPENAI_VOICE || 'verse';

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

    return res.status(200).json({
      clientSecret: token,
      model: openaiRealtimeModel,
    });
  } catch (error) {
    console.error('Realtime session error:', error);
    return res.status(502).json({ error: 'Failed to create realtime session.' });
  }
}
