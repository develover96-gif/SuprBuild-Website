import { useEffect, useRef } from 'react';
import { X, MessageSquare, Shield } from 'lucide-react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';

// Helper to dynamically read configuration values from environment variables
const getEnvVal = (key: string, defaultValue: string): string => {
  try {
    const paddleEnv = (globalThis as any).__PADDLE_ENV__;
    if (paddleEnv && paddleEnv[key]) {
      return String(paddleEnv[key]).trim();
    }
  } catch (e) {}

  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return (process.env[key] as string).trim();
    }
  } catch (e) {}

  try {
    const metaEnv = (import.meta as any).env;
    if (metaEnv && metaEnv[key]) {
      return (metaEnv[key] as string).trim();
    }
  } catch (e) {}

  return defaultValue;
};

const getChatWebhookUrl = (): string => {
  let url = getEnvVal('VITE_N8N_CHAT_WEBHOOK_URL', '') || getEnvVal('N8N_CHAT_WEBHOOK_URL', '');
  if (url) {
    if (url.startsWith('ttps://')) {
      url = 'h' + url;
    }
    return url;
  }
  return 'https://n8n-m1if.muhaimin.dev/webhook/013c98f-4150-47f7-9f58-d65199d2fb3d/chat';
};

interface N8nChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function N8nChatWidget({ isOpen, onClose }: N8nChatWidgetProps) {
  const initializedRef = useRef<boolean>(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    try {
      createChat({
        webhookUrl: getChatWebhookUrl(),
        target: '#n8n-chat-container',
        mode: 'fullscreen',
        showWelcomeScreen: false,
        initialMessages: [
          "Hello! Welcome to SuprBuild. I'm your interactive solutions architect. Ask me anything about our software engineering, serverless infrastructure, or subscription options."
        ],
        i18n: {
          en: {
            title: 'Solutions Architect',
            subtitle: "Start a chat. We're here to help you 24/7.",
            footer: '',
            getStarted: 'New Conversation',
            inputPlaceholder: 'Type your question or project request...',
            closeButtonTooltip: 'Close Chat',
          },
        }
      });
    } catch (err) {
      console.error('Error initializing n8n chat:', err);
    }
  }, []);

  return (
    <>
      {/* Backdrop Blur Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 z-50 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Sliding Chat Drawer */}
      <div
        id="n8n-chat-drawer"
        className={`fixed top-0 right-0 bottom-0 w-full max-w-[460px] bg-background border-l border-border z-50 flex flex-col shadow-2xl h-full select-none transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-border bg-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-[34px] h-[34px] bg-primary flex items-center justify-center relative flex-none">
              <MessageSquare className="w-4.5 h-4.5 text-primary-foreground" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-card rounded-full" />
            </div>
            <div>
              <div className="text-[13.5px] font-bold text-foreground flex items-center gap-1.5">
                Solutions Architect
                <span className="text-[9px] bg-primary/15 text-primary px-1.5 py-0.5 uppercase tracking-wide font-bold">
                  n8n AI
                </span>
              </div>
              <p className="text-[10.5px] text-muted-foreground font-mono">
                Session Status: Connected & Online
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Close Drawer */}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground transition-colors border border-transparent"
              aria-label="Close Chat"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Embedded n8n Chat Widget */}
        <div className="flex-1 min-h-0 w-full relative">
          <div id="n8n-chat-container" className="absolute inset-0 w-full h-full" />
        </div>

        {/* Security Notice Banner */}
        <div className="px-4 py-2 bg-secondary border-t border-border flex items-center gap-2 text-muted-foreground text-[10px] select-none">
          <Shield className="w-3.5 h-3.5 text-primary flex-none" />
          <span>Transcripts are TLS-secured and automatically persisted locally.</span>
        </div>
      </div>
    </>
  );
}
