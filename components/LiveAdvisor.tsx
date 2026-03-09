import React, { useEffect, useRef, useState } from 'react';

type LinkStatus =
  | 'CONNECTING'
  | 'LIVE'
  | 'LISTENING'
  | 'SPEAKING'
  | 'ERROR';

interface OrbPoint {
  theta: number;
  phi: number;
  seed: number;
}

const ORB_POINT_COUNT = 1700;

const LiveAdvisor: React.FC = () => {
  const [status, setStatus] = useState<LinkStatus>('CONNECTING');
  const [statusMessage, setStatusMessage] = useState('Booting realtime uplink...');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const orbPointsRef = useRef<OrbPoint[]>([]);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const points: OrbPoint[] = [];
    for (let i = 0; i < ORB_POINT_COUNT; i++) {
      const y = 1 - (i / (ORB_POINT_COUNT - 1)) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = Math.acos(y);
      const phi = ((Math.PI * (3 - Math.sqrt(5))) * i) % (Math.PI * 2);
      points.push({ theta, phi: phi + radius * 0.02, seed: i * 0.173 });
    }
    orbPointsRef.current = points;

    const startRealtimeSession = async () => {
      try {
        setStatus('CONNECTING');
        setStatusMessage('Requesting microphone access...');

        const localStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        localStreamRef.current = localStream;

        setStatusMessage('Minting secure session token...');
        const sessionResponse = await fetch('/api/realtime/session', {
          method: 'POST',
        });

        if (!sessionResponse.ok) {
          const sessionError = await sessionResponse.text();
          throw new Error(`session token error: ${sessionError}`);
        }

        const sessionData = (await sessionResponse.json()) as {
          clientSecret?: string;
          model?: string;
        };

        const ephemeralKey = sessionData.clientSecret;
        const model = sessionData.model || 'gpt-realtime';

        if (!ephemeralKey) {
          throw new Error('Missing ephemeral token from server.');
        }

        setStatusMessage('Connecting to SOMA realtime...');

        const peer = new RTCPeerConnection();
        peerRef.current = peer;

        remoteAudioRef.current = new Audio();
        remoteAudioRef.current.autoplay = true;

        peer.ontrack = (event) => {
          if (!remoteAudioRef.current) return;
          remoteAudioRef.current.srcObject = event.streams[0];
          remoteAudioRef.current.play().catch(() => {
            setStatusMessage('Tap TERMINATE and reconnect if audio is blocked.');
          });
        };

        localStream.getTracks().forEach((track) => {
          peer.addTrack(track, localStream);
        });

        const dataChannel = peer.createDataChannel('oai-events');
        dataChannelRef.current = dataChannel;

        dataChannel.onopen = () => {
          setStatus('LIVE');
          setStatusMessage('Connected to SOMA. Speak naturally.');

          dataChannel.send(
            JSON.stringify({
              type: 'response.create',
              response: {
                instructions:
                  'You are now connected to a user on SOMA website. Respond in English only unless the user explicitly asks to switch language. Greet briefly, then invite them to ask about Soma.',
              },
            }),
          );
        };

        dataChannel.onmessage = (event) => {
          try {
            const payload = JSON.parse(event.data);
            if (payload?.type === 'input_audio_buffer.speech_started') {
              setStatus('LISTENING');
              setStatusMessage('Listening...');
            }
            if (payload?.type === 'response.audio.delta' || payload?.type === 'response.audio_transcript.delta') {
              setStatus('SPEAKING');
              setStatusMessage('SOMA is speaking...');
            }
            if (payload?.type === 'response.done') {
              setStatus('LIVE');
              setStatusMessage('Connected to SOMA. Speak naturally.');
            }
          } catch (_error) {
            // Ignore non-JSON events.
          }
        };

        const offer = await peer.createOffer({
          offerToReceiveAudio: true,
        });

        await peer.setLocalDescription(offer);

        const sdpResponse = await fetch(`https://api.openai.com/v1/realtime?model=${encodeURIComponent(model)}`, {
          method: 'POST',
          body: offer.sdp,
          headers: {
            Authorization: `Bearer ${ephemeralKey}`,
            'Content-Type': 'application/sdp',
          },
        });

        if (!sdpResponse.ok) {
          const sdpError = await sdpResponse.text();
          throw new Error(`sdp exchange failed: ${sdpError}`);
        }

        const answerSdp = await sdpResponse.text();
        await peer.setRemoteDescription({ type: 'answer', sdp: answerSdp });
      } catch (error) {
        console.error('Realtime link failed:', error);
        setStatus('ERROR');
        setStatusMessage('Realtime uplink failed. Check OPENAI_API_KEY and try again.');
      }
    };

    startRealtimeSession();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (dataChannelRef.current) {
        dataChannelRef.current.close();
        dataChannelRef.current = null;
      }

      if (peerRef.current) {
        peerRef.current.getSenders().forEach((sender) => sender.track?.stop());
        peerRef.current.close();
        peerRef.current = null;
      }

      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;

      if (remoteAudioRef.current) {
        remoteAudioRef.current.pause();
        remoteAudioRef.current.srcObject = null;
        remoteAudioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = (timeMs: number) => {
      const t = timeMs * 0.001;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      const points = orbPointsRef.current;
      const projected: Array<{ x: number; y: number; z: number; alpha: number; radius: number }> = [];
      const isSpeaking = status === 'SPEAKING';
      const isListening = status === 'LISTENING';
      const dynamicEnergy = isSpeaking ? 1 : isListening ? 0.6 : 0.3;
      const pulse = 1 + dynamicEnergy * 0.14 * Math.sin(t * (isSpeaking ? 10.5 : 4.2));

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const rippleStrength = 0.12 + dynamicEnergy * 0.2;
        const ripple =
          rippleStrength * Math.sin(4.0 * p.theta + t * (1.1 + dynamicEnergy * 1.6) + p.seed) +
          (0.08 + dynamicEnergy * 0.12) * Math.cos(5.5 * p.phi - t * (0.8 + dynamicEnergy * 1.1) + p.seed * 0.7);

        const r = (1 + ripple) * pulse;

        const st = Math.sin(p.theta);
        const ct = Math.cos(p.theta);
        const sp = Math.sin(p.phi + t * 0.08);
        const cp = Math.cos(p.phi + t * 0.08);

        let x = r * st * cp;
        let y = r * ct;
        let z = r * st * sp;

        const ry = t * 0.25;
        const rx = Math.sin(t * 0.32) * 0.35;

        const x1 = x * Math.cos(ry) - z * Math.sin(ry);
        const z1 = x * Math.sin(ry) + z * Math.cos(ry);
        const y1 = y * Math.cos(rx) - z1 * Math.sin(rx);
        const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);

        x = x1;
        y = y1;
        z = z2;

        const depth = 3.6 + z;
        const scale = (128 + dynamicEnergy * 18) / depth;
        const sx = cx + x * scale;
        const sy = cy + y * scale;
        const alpha = Math.max(0.06, Math.min(0.9, 0.24 + (z + 1.2) * 0.35));
        const dotRadius = Math.max(0.5, Math.min(2.8, (1.2 + dynamicEnergy * 0.8) * scale * 0.025));

        projected.push({ x: sx, y: sy, z, alpha, radius: dotRadius });
      }

      projected.sort((a, b) => a.z - b.z);

      for (let i = 0; i < projected.length; i++) {
        const point = projected[i];
        const limeBoost = isSpeaking ? 1.15 : isListening ? 0.85 : 0.58;
        ctx.fillStyle = `rgba(108, 242, 13, ${point.alpha * limeBoost})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [status]);

  return (
    <div className="w-[29rem] border border-lime-500/30 bg-black/40 backdrop-blur-2xl rounded-2xl p-4 shadow-[0_0_40px_rgba(108,242,13,0.15),inset_0_0_30px_rgba(255,255,255,0.03)]">
      <div className="flex items-center justify-between text-[10px] tracking-[0.25em] font-bold uppercase mb-3">
        <span className="text-lime-400">SOMA_VOICE_UPLINK</span>
        <span
          className={`
            ${status === 'ERROR' ? 'text-red-400' : 'text-lime-300'}
            ${status === 'LIVE' ? 'animate-pulse' : ''}
          `}
        >
          {status}
        </span>
      </div>

      <div className="relative h-[360px] rounded-xl overflow-hidden border border-lime-500/15 bg-black/70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(108,242,13,0.1),rgba(0,0,0,0.9)_62%)]" />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>

      <p className="mt-3 text-[10px] tracking-[0.18em] uppercase text-zinc-300 leading-relaxed">
        {statusMessage}
      </p>

      <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-lime-500/60 to-transparent" />
      <p className="mt-2 text-[9px] tracking-[0.16em] uppercase text-zinc-500">
        Live SOMA mode. Mic is active while this panel is open.
      </p>
    </div>
  );
};

export default LiveAdvisor;
