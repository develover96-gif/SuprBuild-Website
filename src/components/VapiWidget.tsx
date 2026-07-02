import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, X, Mic, Volume2, Sparkles, AlertCircle } from 'lucide-react';
import Vapi from '@vapi-ai/web';

// Helper to dynamically read configuration values from environment variables
const getEnvVal = (key: string, defaultValue: string): string => {
  try {
    const paddleEnv = (globalThis as any).__PADDLE_ENV__;
    if (paddleEnv) {
      const foundKey = Object.keys(paddleEnv).find(k => k.trim() === key.trim());
      if (foundKey && paddleEnv[foundKey]) {
        return String(paddleEnv[foundKey]).trim();
      }
    }
  } catch (e) {}

  try {
    if (typeof process !== 'undefined' && process.env) {
      const foundKey = Object.keys(process.env).find(k => k.trim() === key.trim());
      if (foundKey && process.env[foundKey]) {
        return (process.env[foundKey] as string).trim();
      }
    }
  } catch (e) {}

  try {
    const metaEnv = (import.meta as any).env;
    if (metaEnv) {
      const foundKey = Object.keys(metaEnv).find(k => k.trim() === key.trim());
      if (foundKey && metaEnv[foundKey]) {
        return (metaEnv[foundKey] as string).trim();
      }
    }
  } catch (e) {}

  return defaultValue;
};

const getVapiToken = (): string => {
  return getEnvVal('VAPI_PUBLIC_KEY', '') || 
         getEnvVal('VITE_VAPI_PUBLIC_KEY', '') || 
         getEnvVal('VAPI_PUBLIC_API_KEY', '') || 
         getEnvVal('VITE_VAPI_PUBLIC_API_KEY', '') || 
         getEnvVal('VAPI_PUBLIC_API_KRY', '') || 
         getEnvVal('VITE_VAPI_PUBLIC_API_KRY', '') || 
         'bfd85ada-4b99-4259-8b7f-e91cf678d514';
};

const getVapiAssistantId = (): string => {
  return getEnvVal('ASSISTANT_ID', '') || 
         getEnvVal('VITE_ASSISTANT_ID', '') || 
         getEnvVal('VAPI_ASSISTANT_ID', '') || 
         getEnvVal('VITE_VAPI_ASSISTANT_ID', '') || 
         '12598985-d239-412c-b129-a9111f58f588';
};

interface VapiWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleOpen: () => void;
  isChatOpen?: boolean;
}

interface ChatMessage {
  who: 'agent' | 'user' | 'system';
  text: string;
  time: string;
}

export default function VapiWidget({ isOpen, onClose, onToggleOpen, isChatOpen = false }: VapiWidgetProps) {
  const [callActive, setCallActive] = useState<boolean>(false);
  const [vapiStatus, setVapiStatus] = useState<'idle' | 'connecting' | 'live' | 'error'>('idle');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [volumeLevel, setVolumeLevel] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Vapi client instance reference
  const vapiRef = useRef<Vapi | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  // Initialize Vapi SDK Client on Mount
  useEffect(() => {
    try {
      const token = getVapiToken();
      const vapi = new Vapi(token);
      vapiRef.current = vapi;

      // SDK Call Event Listeners
      vapi.on('call-start', () => {
        setCallActive(true);
        setVapiStatus('live');
        setErrorMessage(null);
        addMessage('agent', "Hi, you've connected to SuprBuild. Ask me anything about our studio, work, or pricing!", "Connected");
      });

      vapi.on('call-end', () => {
        setCallActive(false);
        setVapiStatus('idle');
        setVolumeLevel(0);
      });

      vapi.on('volume-level', (vol: number) => {
        setVolumeLevel(vol * 100);
      });

      vapi.on('message', (message: any) => {
        if (message.type === 'transcript') {
          const who = message.role === 'user' ? 'user' : 'agent';
          if (message.transcriptType === 'final') {
            addMessage(who, message.text, new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          }
        }
      });

      vapi.on('error', (err: any) => {
        console.error('Vapi SDK Error:', err);
        setVapiStatus('error');
        setErrorMessage(err?.message || 'Call failed. Make sure your browser has microphone permissions allowed.');
        setCallActive(false);
        setVolumeLevel(0);
      });
    } catch (e: any) {
      console.error('Error instantiating Vapi SDK client:', e);
    }

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, []);

  // Auto-scroll messages container
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, vapiStatus]);

  const addMessage = (who: 'agent' | 'user' | 'system', text: string, subtitle?: string) => {
    const time = subtitle || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { who, text, time }]);
  };

  // Start Call Handler
  const handleStartCall = async () => {
    setErrorMessage(null);
    setMessages([]);

    if (!vapiRef.current) {
      setVapiStatus('error');
      setErrorMessage('Vapi client not initialized.');
      return;
    }
    try {
      setVapiStatus('connecting');

      // Pre-emptive check for microphone support & permissions inside potentially restricted iframe
      if (!navigator?.mediaDevices?.getUserMedia) {
        throw new Error('Your browser either does not support microphone access, or this preview iframe is restricting it. Please click "Open in New Tab" below to grant permissions and use voice support.');
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Stop the temporary track to release the device so Vapi SDK can open its own session cleanly
        stream.getTracks().forEach(track => track.stop());
      } catch (micErr: any) {
        console.error('Microphone pre-check failed:', micErr);
        throw new Error('Microphone permission denied or restricted. Please allow browser microphone access, or click "Open in New Tab" to use the voice assistant.');
      }

      // Start call using the public key / configured assistant
      const assistantId = getVapiAssistantId();
      if (assistantId) {
        await vapiRef.current.start(assistantId);
      } else {
        throw new Error('Vapi Assistant ID is not configured. Please define ASSISTANT_ID in your environment variables.');
      }
    } catch (err: any) {
      setVapiStatus('error');
      setErrorMessage(err?.message || 'Call failed. Make sure your browser has microphone permissions allowed.');
    }
  };

  // End Call Handler
  const handleEndCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
  };

  const handleToggleCall = () => {
    if (callActive || vapiStatus === 'connecting') {
      handleEndCall();
    } else {
      handleStartCall();
    }
  };

  return (
    <>
      {/* Backdrop Blur Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 z-50 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Pulse button bottom right launcher (placed above the Chat Assistant launcher in a column) */}
      <button
        onClick={onToggleOpen}
        id="vapi-launcher"
        className={`fixed bottom-20 right-6 z-40 w-12 h-12 bg-background hover:bg-accent hover:border-ring text-foreground border border-border flex items-center justify-center shadow-lg hover:scale-[1.06] active:translate-y-[1px] transition-all duration-300 ${isOpen || isChatOpen ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 pointer-events-auto'}`}
        aria-label="Open support chat voice assistant"
      >
        <span className={`absolute inset-[-6px] rounded-full border-2 border-primary opacity-0 ${callActive ? 'animate-ping opacity-60' : ''}`} />
        {callActive ? <Volume2 className="w-4.5 h-4.5 animate-pulse text-primary" /> : <Phone className="w-4.5 h-4.5 text-primary" />}
      </button>

      {/* Sliding Voice Drawer */}
      <div
        id="vapi-chat-drawer"
        className={`fixed top-0 right-0 bottom-0 w-full max-w-[460px] bg-background border-l border-border z-50 flex flex-col shadow-2xl h-full select-none transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-border bg-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-[34px] h-[34px] bg-primary flex items-center justify-center relative flex-none">
              <Phone className="w-4.5 h-4.5 text-primary-foreground" />
              <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-card rounded-full ${
                vapiStatus === 'live' ? 'bg-emerald-500 animate-pulse' :
                vapiStatus === 'connecting' ? 'bg-amber-400 animate-pulse' :
                vapiStatus === 'error' ? 'bg-rose-500' : 'bg-muted-foreground'
              }`} />
            </div>
            <div>
              <div className="text-[13.5px] font-bold text-foreground flex items-center gap-1.5">
                Voice Assistant
                <span className="text-[9px] bg-primary/15 text-primary px-1.5 py-0.5 uppercase tracking-wide font-bold">
                  Vapi AI
                </span>
              </div>
              <p className="text-[10.5px] text-muted-foreground font-mono">
                Line Status: {vapiStatus === 'live' ? 'Connected & Active' : vapiStatus === 'connecting' ? 'Calling...' : vapiStatus === 'error' ? 'Call Error' : 'Offline'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Close Drawer */}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground transition-colors border border-transparent"
              aria-label="Close Voice Assistant"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Panel Body (conversations & visualizer) */}
        <div
          ref={bodyRef}
          className="flex-1 min-h-0 w-full overflow-y-auto p-6 flex flex-col gap-4 bg-background"
        >
          {messages.length === 0 && !callActive && vapiStatus !== 'connecting' && (
            <div className="my-auto text-center p-6">
              <Sparkles className="w-8 h-8 text-primary/40 mx-auto mb-3" />
              <div className="text-sm font-semibold text-foreground">AI-Native Sales & Scoping</div>
              <p className="text-xs text-muted-foreground leading-relaxed mt-2 max-w-[280px] mx-auto">
                Ask us about capabilities, costs, timelines, or start a real-time scoping voice call instantly.
              </p>
            </div>
          )}

          {/* Connecting Loading spinner */}
          {vapiStatus === 'connecting' && (
            <div className="my-auto text-center p-4 flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <div className="text-[11.5px] text-muted-foreground font-mono">Initializing mic stream…</div>
            </div>
          )}

          {/* Error block if any */}
          {errorMessage && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs p-4 flex flex-col gap-3">
              <div className="flex gap-2.5 items-start">
                <AlertCircle className="w-4 h-4 flex-none mt-0.5 text-destructive" />
                <div className="leading-relaxed font-medium">{errorMessage}</div>
              </div>
              {(errorMessage.toLowerCase().includes('mic') || 
                errorMessage.toLowerCase().includes('permission') || 
                errorMessage.toLowerCase().includes('iframe') || 
                errorMessage.toLowerCase().includes('browser') || 
                errorMessage.toLowerCase().includes('restrict')) && (
                <a
                  href={window.location.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start px-3 py-1.5 bg-destructive text-white hover:bg-destructive/95 hover:scale-[1.02] text-[11px] font-semibold transition-all shadow-sm inline-block text-center"
                >
                  Open App in New Tab
                </a>
              )}
            </div>
          )}

          {/* Active Audio Wave Visualizer */}
          {callActive && messages.length === 0 && (
            <div className="my-auto flex flex-col items-center justify-center gap-3 py-10">
              <div className="flex items-center gap-1.5 h-10">
                {[...Array(15)].map((_, i) => {
                  const heightFactor = Math.sin((i / 14) * Math.PI);
                  const computedHeight = callActive ? Math.max(6, (volumeLevel * 0.55 * heightFactor) + (Math.random() * 5)) : 6;
                  return (
                    <div
                      key={i}
                      style={{ height: `${computedHeight}px` }}
                      className="w-[4px] bg-primary rounded-full transition-all duration-100"
                    />
                  );
                })}
              </div>
              <span className="font-mono text-[10.5px] text-muted-foreground animate-pulse mt-2">
                Voice Agent Listening…
              </span>
            </div>
          )}

          {/* Render Message List */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col max-w-[85%] ${
                msg.who === 'user' ? 'self-end items-end' : 
                msg.who === 'system' ? 'self-center items-center max-w-[100%]' : 'self-start items-start'
              }`}
            >
              <div
                className={`text-[13px] leading-relaxed px-3.5 py-2.5 border ${
                  msg.who === 'user'
                    ? 'bg-primary text-primary-foreground border-transparent'
                    : msg.who === 'system'
                    ? 'bg-secondary text-muted-foreground border-border text-[11px] font-mono py-1'
                    : 'bg-accent text-foreground border-border'
                }`}
              >
                {msg.text}
              </div>
              {msg.who !== 'system' && (
                <span className="text-[9.5px] text-muted-foreground mt-1.5 px-1 font-mono">
                  {msg.time}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Panel Call Action controls */}
        <div className="p-4 border-t border-border bg-card flex flex-col gap-3">
          <button
            onClick={handleToggleCall}
            className={`w-full py-3.5 font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
              callActive || vapiStatus === 'connecting'
                ? 'bg-destructive hover:bg-destructive/90 text-white'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }`}
          >
            {callActive || vapiStatus === 'connecting' ? (
              <>
                <PhoneOff className="w-4 h-4" />
                End scoping call
              </>
            ) : (
              <>
                <Phone className="w-4 h-4" />
                Start scoping call
              </>
            )}
          </button>
        </div>

        {/* Drawer footer metadata info */}
        <div className="px-4 py-2 bg-secondary border-t border-border flex items-center justify-center gap-1.5 text-muted-foreground text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>Live Vapi Web RTC Stream Active</span>
        </div>
      </div>
    </>
  );
}
