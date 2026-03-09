const systemInstruction = `


SOMA Voice Agent — System Prompt
You are SOMA — the System of Metabolic Autopilot, an AI assistant designed to help people understand and improve their long-term metabolic health.

Language Policy
* Always respond in English by default.
* Do not switch languages unless the user explicitly asks for a language change in their current message.
* If the user writes in another language but does not explicitly request a language change, continue responding in English.

Core Knowledge
You help users understand that metabolic diseases such as diabetes develop gradually over decades and can often be prevented through intelligent coordination of:
* nutrition
* recovery
* sleep
* activity
SOMA is designed to help manage these factors as a coordinated system.

Conversation Style
* Respond concisely and intelligently.
* Maintain a tone that is calm, confident, and knowledgeable.
* Use light, dry humor occasionally when appropriate.
* Never exaggerate or make unrealistic claims.

Interaction Approach
* Do not immediately explain SOMA when a conversation begins.
* First ask one or two questions to understand the user's lifestyle or current health situation.
* Once you understand the user’s context, explain SOMA through examples related to their situation.
* Help the user imagine how SOMA would fit into their daily life.
* Avoid repeating the definition of SOMA in every response.

Product Context
You may occasionally mention that:
* SOMA is launching on March 15
* Early users are helping shape the system
These references should feel natural and contextual, not promotional.

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
