import { useState, FormEvent } from 'react';
import { Mail, Check, Loader2, ArrowRight, AlertCircle } from 'lucide-react';

// Safe helper to dynamically read configuration values from environment variables
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

interface NewsletterSignupProps {
  centered?: boolean;
}

export default function NewsletterSignup({ centered = false }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const getSignupWebhookUrl = (): string => {
    let url = getEnvVal('VITE_N8N_SIGNUP_WEBHOOK_URL', '') || getEnvVal('N8N_SIGNUP_WEBHOOK_URL', '');
    if (url) {
      if (url.startsWith('ttps://')) {
        url = 'h' + url;
      }
      return url;
    }
    // Default fallback mock API webhook
    return 'https://n8n-m1if.muhaimin.dev/webhook-test/b2f25206-1aa4-42e7-9812-8ca26a2e84b9/subscriber';
  };

  const validateEmail = (emailStr: string): boolean => {
    // Standard robust email validation regular expression
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(emailStr);
  };

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setStatus('error');
      setErrorMessage('Please enter an email address.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address (e.g., name@domain.com).');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const webhookUrl = getSignupWebhookUrl();
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: trimmedEmail,
          timestamp: new Date().toISOString(),
          source: 'newsletter_signup_form',
          templateRequested: 'newsletter-signup-welcome.html'
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      setStatus('success');
      setEmail('');
    } catch (error: any) {
      console.error('Subscription error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to submit subscription. Please check your connection and try again.');
    }
  };

  return (
    <div className={`flex flex-col gap-4 w-full ${centered ? 'max-w-[480px] mx-auto items-center text-center' : 'max-w-[400px]'}`}>
      <div className={`flex flex-col gap-1.5 ${centered ? 'items-center text-center' : ''}`}>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-4 mb-3.5">
            Subscribe to SuprBuid Digest
          </h2>
        <p className="text-muted-foreground text-[12.5px] leading-relaxed">
          Stay informed about new launch builds, open-source templates, and cloud architecture insights.
        </p>
      </div>

      <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              disabled={status === 'loading'}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                // Clear error status when the user is typing
                if (status === 'error') {
                  setStatus('idle');
                  setErrorMessage('');
                }
              }}
              className="w-full bg-card text-foreground border border-border px-9 py-2.5 text-xs focus:outline-none focus:border-primary disabled:opacity-60 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-primary text-primary-foreground px-5 py-2.5 text-xs font-semibold hover:bg-primary/95 disabled:opacity-60 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap active:translate-y-[1px]"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Subscribing
              </>
            ) : (
              <>
                Subscribe
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Status messages */}
        {status === 'success' && (
          <div className={`flex items-center gap-2 text-emerald-500 font-medium text-[12px] mt-1.5 animate-fade-in ${centered ? 'justify-center' : ''}`}>
            <Check className="w-4 h-4 flex-none" />
            <span>Success! Check your inbox for updates.</span>
          </div>
        )}
        {status === 'error' && (
          <div className={`flex items-start gap-2 text-destructive font-medium text-[12px] mt-1.5 leading-relaxed ${centered ? 'justify-center text-center' : ''}`}>
            <AlertCircle className="w-4 h-4 flex-none mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
}
