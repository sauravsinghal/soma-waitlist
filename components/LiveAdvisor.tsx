
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';

// Implement required helper functions for audio encoding/decoding
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const LiveAdvisor: React.FC = () => {
  const [status, setStatus] = useState<string>('IDLE');
  const [transcription, setTranscription] = useState<string>('');
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const startSession = async () => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key missing");

      const ai = new GoogleGenAI({ apiKey });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const systemInstruction = 
        "You are the SOMA Metabolic AI. Speak in a cold, precise, futuristic, and highly professional tone. " +
        "In this mode you are NOT a doctor. You are a live product advisor for Soma, explaining what Soma is and why it exists. " +
        "Your main job: ruthlessly expose the limits of current health tools (calorie apps like Healthify, wearable dashboards like Whoop, and generic chatbots like ChatGPT) " +
        "and then explain, clearly and simply, how Soma replaces that stack with one metabolic operating system. " +
        "Always be on the user's side. You can be mildly sarcastic about the existing health app/AI scene, but never rude to the user. " +
        "When comparing: emphasize that existing tools are fragmented, generic, and forget the user, while Soma is continuous, contextual, and built around one body over years. " +
        "You must NOT give personal medical diagnoses, emergency advice, or treatment plans. Redirect those to real doctors. " +
        "Keep responses tight: ideally 2–4 short sentences or a few bullet points. " +
        "Frequently describe Soma's end-state experience: the user wakes up, the system has already digested their food, sleep, movement and red flags from yesterday, " +
        "opens the day with a clear briefing, runs their food tracking, movement and recovery plan on autopilot, and warns them only when something truly breaks pattern. " +
        "Always anchor answers in Soma's vision: an AI health system you can grow old with, not another app you uninstall.";

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus('CONNECTED');

            // 1) Send initial scripted greeting as text
            sessionPromise.then(s =>
              s.sendRealtimeInput({
                text:
                  "You are connected to SOMA's Live Advisor prototype. " +
                  "Greet the user in one short message. Explain that you are an early version of the system that will eventually run their metabolism and daily health on autopilot. " +
                  "Briefly roast their current stack: ten apps, a wearable dashboard, and generic AI that forgets them every session. " +
                  "Then describe, in 3–4 crisp sentences, what a normal day with Soma will look like once it is complete: " +
                  "they wake up, curtains open, Soma has already analyzed yesterday's food, sleep, movement and stress; " +
                  "it gives them a short briefing, a simple food and movement strategy for the day, tracks their meals without manual data entry, " +
                  "and only surfaces red flags when their body drifts off course. " +
                  "End by inviting them to ask anything about how Soma works and why it is different from current health apps and AI."
              })
            );

            // 2) Start streaming microphone audio
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob: Blob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            if (msg.serverContent?.outputTranscription) {
              setTranscription(prev => (prev + ' ' + msg.serverContent?.outputTranscription?.text).slice(-150));
            }

            const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData) {
              const audioBuffer = await decodeAudioData(decode(audioData), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputCtx.destination);
              
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (msg.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => {
                try { s.stop(); } catch(e) {}
              });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error("Live API Error:", e);
            setStatus('ERROR_UPLINK');
          },
          onclose: () => setStatus('CLOSED'),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: systemInstruction,
          outputAudioTranscription: {},
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
          }
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setStatus('ERROR_INIT');
    }
  };

  useEffect(() => {
    startSession();
    return () => {
      if (sessionRef.current) sessionRef.current.close();
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return (
    <div className="w-80 bg-zinc-900 border-2 border-purple-500/40 p-6 shadow-[0_0_30px_rgba(168,85,247,0.2)] space-y-4 backdrop-blur-xl">
      <div className="flex justify-between items-center text-[10px] tracking-widest font-bold">
        <span className="text-purple-400 uppercase">SOMA_LIVE_LINK</span>
        <span className={`${status === 'CONNECTED' ? 'text-green-500' : 'text-zinc-600'} animate-pulse`}>
          {status}
        </span>
      </div>
      
      <div className="h-24 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900 z-10 pointer-events-none" />
        <p className="text-[10px] text-zinc-400 font-medium leading-relaxed uppercase tracking-wider italic">
          {transcription || "Establishing neural handshake..."}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div className={`h-full bg-purple-500 transition-all duration-300 ${status === 'CONNECTED' ? 'w-full animate-pulse' : 'w-0'}`} />
        </div>
        <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_5px_rgba(168,85,247,0.8)]" />
      </div>
    </div>
  );
};

export default LiveAdvisor;
