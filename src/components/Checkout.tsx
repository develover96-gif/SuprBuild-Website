import { useEffect, useState, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Check, Shield, CreditCard, Lock, Sparkles, 
  HelpCircle, RefreshCw, AlertCircle, ShoppingBag, BadgePercent
} from 'lucide-react';

declare global {
  interface Window {
    Paddle?: any;
  }
}

interface CheckoutProps {
  slug: string;
  onBack: () => void;
}

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

// Legacy helper compatibility
const getEnvPriceId = (key: string, defaultValue: string): string => {
  return getEnvVal(key, defaultValue);
};

const getClientToken = (): string => {
  const token = getEnvVal('VITE_PADDLE_CLIENT_TOKEN', '') || getEnvVal('PADDLE_CLIENT_TOKEN', '');
  return token || 'test_7d279f61a3499fed520f7cd8c08';
};

// Map slug to product information & Paddle price IDs (using sandbox price IDs from documentation)
const planDetails: Record<string, {
  name: string;
  description: string;
  basePrice: string;
  features: string[];
  monthlyPriceId: string;
  yearlyPriceId: string;
}> = {
  'launch': {
    name: 'Launch Plan',
    description: 'A tightly scoped MVP to validate a product or replace a fragile prototype.',
    basePrice: '$5,000.00',
    features: [
      'Discovery & scope sign-off',
      'Single-platform web app',
      'Auth, database & deploy pipeline',
      'Two rounds of design revision',
      '30 days of post-launch support'
    ],
    // Sandbox price IDs matching documentation or environment override
    get monthlyPriceId() { return getEnvPriceId('VITE_PADDLE_PRICE_LAUNCH_SINGLE', 'pri_01kwfnxcevaxhs564n6wpbqqez'); },
    get yearlyPriceId() { return getEnvPriceId('VITE_PADDLE_PRICE_LAUNCH_SINGLE', 'pri_01kwfnxcevaxhs564n6wpbqqez'); }
  },
  'build': {
    name: 'Build Plan',
    description: 'A production-grade product with integrations, compliance, and real infrastructure.',
    basePrice: '$1,500.00',
    features: [
      'Everything in Launch',
      'Multi-platform (web + mobile-ready)',
      'Payments, APIs & 3rd-party integrations',
      'Compliance-aware architecture',
      'Cloud infra setup & 90-day support'
    ],
    get monthlyPriceId() { return getEnvPriceId('VITE_PADDLE_PRICE_BUILD_SINGLE', 'pri_01kwfnrc5jmschvczy3799ja1y'); },
    get yearlyPriceId() { return getEnvPriceId('VITE_PADDLE_PRICE_BUILD_SINGLE', 'pri_01kwfnrc5jmschvczy3799ja1y'); }
  },
  'embedded-team': {
    name: 'Embedded Team',
    description: 'A dedicated senior engineer + PM inside your roadmap, for products that keep shipping.',
    basePrice: '$65.00',
    features: [
      'Dedicated senior engineer(s) + PM',
      'Weekly sprints & roadmap planning',
      'Direct Slack access, no ticket queue',
      'Infra, on-call & incident coverage',
      'Scale hours up or down monthly'
    ],
    get monthlyPriceId() { return getEnvPriceId('VITE_PADDLE_PRICE_TEAM_MONTHLY', 'pri_01kwfnezx1w2hpaa0q38qrjwr2'); },
    get yearlyPriceId() { return getEnvPriceId('VITE_PADDLE_PRICE_TEAM_YEARLY', 'pri_01kwfnj6rpqa4mxcw0cv38zbxr'); }
  }
};

export default function Checkout({ slug, onBack }: CheckoutProps) {
  const currentPlan = planDetails[slug] || planDetails['launch'];
  const [isMonthly, setIsMonthly] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponStatus, setCouponStatus] = useState<'idle' | 'applying' | 'success' | 'error'>('idle');
  const [couponMessage, setCouponMessage] = useState<string>('');
  const [useDemoToken, setUseDemoToken] = useState<boolean>(false);

  // Live price/totals state synced with Paddle callbacks
  const [checkoutTotals, setCheckoutTotals] = useState({
    subtotal: 0,
    discount: 0,
    tax: 0,
    total: 0,
    currency: 'USD'
  });
  const [checkoutItems, setCheckoutItems] = useState<any[]>([]);

  const paddleInitialized = useRef<boolean>(false);

  // Centralized dynamic price ID lookup based on credentials mode
  const getPlanPriceId = (isMonthlyPlan: boolean): string => {
    if (useDemoToken) {
      // Demo price IDs belonging to official Paddle sandbox developer tutorials (test_7d279f61a3499fed520f7cd8c08)
      if (slug === 'launch') {
        return isMonthlyPlan ? 'pri_01gsz8x8sawmvhz1pv30nge1ke' : 'pri_01gsz8z1q1n00f12qt82y31smh';
      } else if (slug === 'build') {
        return isMonthlyPlan ? 'pri_01gsz95g2zrkagg294kpstx54r' : 'pri_01gsz96z29d88jrmsf2ztbfgjg';
      } else {
        return 'pri_01gsz98e27ak2tyhexptwc58yk';
      }
    } else {
      // Environment variables or fallback to official active custom ones
      if (slug === 'launch') {
        const monthlyId = getEnvVal('VITE_PADDLE_PRICE_LAUNCH_MONTHLY', '');
        const yearlyId = getEnvVal('VITE_PADDLE_PRICE_LAUNCH_YEARLY', '');
        const singleId = getEnvVal('VITE_PADDLE_PRICE_LAUNCH_SINGLE', '');

        if (isMonthlyPlan) {
          return monthlyId || singleId || 'pri_01kwfnxcevaxhs564n6wpbqqez';
        } else {
          return yearlyId || singleId || 'pri_01kwfnxcevaxhs564n6wpbqqez';
        }
      } else if (slug === 'build') {
        const monthlyId = getEnvVal('VITE_PADDLE_PRICE_BUILD_MONTHLY', '');
        const yearlyId = getEnvVal('VITE_PADDLE_PRICE_BUILD_YEARLY', '');
        const singleId = getEnvVal('VITE_PADDLE_PRICE_BUILD_SINGLE', '');

        if (isMonthlyPlan) {
          return monthlyId || singleId || 'pri_01kwfnrc5jmschvczy3799ja1y';
        } else {
          return yearlyId || singleId || 'pri_01kwfnrc5jmschvczy3799ja1y';
        }
      } else {
        const monthlyId = getEnvVal('VITE_PADDLE_PRICE_TEAM_MONTHLY', '');
        const yearlyId = getEnvVal('VITE_PADDLE_PRICE_TEAM_YEARLY', '');

        if (isMonthlyPlan) {
          return monthlyId || 'pri_01kwfnezx1w2hpaa0q38qrjwr2';
        } else {
          return yearlyId || 'pri_01kwfnj6rpqa4mxcw0cv38zbxr';
        }
      }
    }
  };

  // Helper to format currency values beautifully
  const formatMoney = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode || 'USD',
      minimumFractionDigits: 2
    }).format(amount / 100); // Paddle returns totals in cents/lowest denomination
  };

  useEffect(() => {
    // Scroll to top when checkout loads
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let timeoutId: any;

    const initPaddleCheckout = () => {
      if (!window.Paddle) {
        setError('Paddle SDK not loaded. Please refresh the page.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Set sandbox environment
        window.Paddle.Environment.set('sandbox');

        // Determine Client Side Token (Demo vs Custom Env)
        const clientToken = useDemoToken 
          ? 'test_7d279f61a3499fed520f7cd8c08'
          : getClientToken();

        // Initialize Paddle with Client Side Token
        window.Paddle.Initialize({
          token: clientToken,
          checkout: {
            settings: {
              displayMode: 'inline',
              frameTarget: 'paddle-checkout-container',
              frameInitialHeight: 480,
              frameStyle: 'width: 100%; min-width: 280px; background-color: transparent; border: none;'
            }
          },
          eventCallback: (event: any) => {
            console.log('Paddle Event:', event);
            if (event.name === 'checkout.loaded' || event.name === 'checkout.updated') {
              setLoading(false);
              if (event.data) {
                // Sync totals from live checkout
                setCheckoutTotals({
                  subtotal: event.data.totals?.subtotal || 0,
                  discount: event.data.totals?.discount || 0,
                  tax: event.data.totals?.tax || 0,
                  total: event.data.totals?.total || 0,
                  currency: event.data.totals?.currency_code || 'USD'
                });
                if (event.data.items) {
                  setCheckoutItems(event.data.items);
                }
              }
            } else if (event.name === 'checkout.completed') {
              setCouponStatus('success');
              setCouponMessage('Payment completed successfully!');
            } else if (event.name === 'checkout.error') {
              console.error('Checkout error event:', event);
              setLoading(false);
              const errorMessage = event.data?.error?.message || event.data?.message || 'Price ID or product configuration mismatch.';
              const errorType = event.data?.error?.type || '';
              setError(
                `Paddle checkout error: "${errorMessage}" (${errorType || 'catalog_error'}). ` +
                `When using your own VITE_PADDLE_CLIENT_TOKEN, please ensure you configure matching Price IDs in your local environment variables (.env) or developer dashboard to match your custom Paddle catalog.`
              );
            }
          }
        });

        paddleInitialized.current = true;

        // Open checkout with current items
        const selectedPriceId = getPlanPriceId(isMonthly);
        window.Paddle.Checkout.open({
          items: [{ priceId: selectedPriceId, quantity: 1 }]
        });

      } catch (err: any) {
        console.error('Paddle initialization error:', err);
        setError('Failed to load SuprBuild Pay checkout frame. ' + (err.message || ''));
        setLoading(false);
      }
    };

    // Give a short delay to make sure script is loaded and parsed
    timeoutId = setTimeout(() => {
      initPaddleCheckout();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [slug, useDemoToken, isMonthly]);

  // Handle plan frequency switch (Monthly <=> Annual)
  const handleFrequencyChange = (monthly: boolean) => {
    setIsMonthly(monthly);
  };

  // Apply discount / coupon code
  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    if (!window.Paddle || !paddleInitialized.current) {
      setError('Checkout frame not ready.');
      return;
    }

    setCouponStatus('applying');
    setCouponMessage('');

    // Simulate real-time coupon application validation with Paddle updateCheckout
    try {
      window.Paddle.Checkout.updateCheckout({
        discountId: couponCode.trim()
      });
      
      // Since sandbox coupons vary, we provide an immediate success notification
      // and let the Paddle checkout frame handle actual discount deduction
      setTimeout(() => {
        setCouponStatus('success');
        setCouponMessage('Discount code attached to checkout session.');
      }, 800);
    } catch (err: any) {
      setCouponStatus('error');
      setCouponMessage(err.message || 'Invalid coupon code for this plan.');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 py-12 md:py-20">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        
        {/* Back Button & Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <button 
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-xs font-mono font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to plans
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className={`inline-flex h-2 w-2 rounded-full ${useDemoToken ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`} />
              <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
                {useDemoToken ? 'Demo Sandbox' : 'Custom Sandbox'}
              </span>
            </div>
            {useDemoToken ? (
              <button
                onClick={() => {
                  setError(null);
                  setUseDemoToken(false);
                }}
                className="text-[10px] font-mono border border-border bg-secondary hover:bg-secondary/80 text-foreground px-2 py-0.5"
              >
                Use Custom Token
              </button>
            ) : (
              <button
                onClick={() => {
                  setError(null);
                  setUseDemoToken(true);
                }}
                className="text-[10px] font-mono border border-border bg-secondary hover:bg-secondary/80 text-foreground px-2 py-0.5"
              >
                Use Demo Token
              </button>
            )}
          </div>
        </div>

        {/* Master Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-border bg-card divide-y lg:divide-y-0 lg:divide-x divide-border overflow-hidden">
          
          {/* LEFT COLUMN: SuprBuild Pay Branded Checkout */}
          <div className="lg:col-span-7 p-6 md:p-10 flex flex-col justify-between">
            <div>
              {/* Branded checkout header */}
              <div className="flex items-center gap-2.5 mb-6">
                <span className="w-6 h-6 bg-primary flex items-center justify-center relative flex-none">
                  <span className="absolute inset-[5px] bg-primary-foreground" />
                </span>
                <span className="font-extrabold text-[16px] tracking-tight text-foreground select-none">
                  SuprBuild <span className="text-primary">Pay</span>
                </span>
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight text-foreground mb-1.5">
                Complete your project order
              </h2>
              <p className="text-muted-foreground text-xs sm:text-[13px] leading-relaxed mb-8">
                Setup your billing details securely via our Paddle-powered gateway. You will receive an official invoice and work-statement immediately after checkout.
              </p>

              {/* Toggle Frequency */}
              <div className="mb-8">
                <label className="block text-[11.5px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Select Billing Terms
                </label>
                <div className="grid grid-cols-2 p-1 bg-secondary border border-border rounded-none max-w-[340px]">
                  <button
                    type="button"
                    onClick={() => handleFrequencyChange(true)}
                    className={`py-2 text-[11px] font-mono uppercase font-semibold transition-all ${
                      isMonthly 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Monthly payment
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFrequencyChange(false)}
                    className={`py-2 text-[11px] font-mono uppercase font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      !isMonthly 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Annual (save 20%)
                  </button>
                </div>
              </div>

              {/* Checkout Frame Loading Indicator */}
              <div className="relative border border-border bg-secondary/30 p-1 min-h-[480px] flex flex-col items-center justify-center">
                {loading && (
                  <div className="absolute inset-0 bg-background/90 z-20 flex flex-col items-center justify-center gap-3">
                    <RefreshCw className="w-6 h-6 text-primary animate-spin" />
                    <span className="font-mono text-[11px] text-muted-foreground">
                      Spawning secure checkout...
                    </span>
                  </div>
                )}

                {error && (
                  <div className="absolute inset-0 bg-background/95 z-30 p-6 flex flex-col items-center justify-center text-center gap-4 overflow-y-auto">
                    <AlertCircle className="w-8 h-8 text-destructive" />
                    <div className="text-xs font-bold font-mono text-destructive bg-destructive/10 p-3 border border-destructive/20 select-text max-w-md break-words">
                      {error}
                    </div>
                    
                    <div className="text-xs text-muted-foreground max-w-md leading-relaxed mt-1">
                      <p className="font-semibold text-foreground mb-1">Why is this happening?</p>
                      You configured a custom client token, but custom price IDs have not been defined or matched on this sandbox account catalog yet.
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mt-3">
                      <button 
                        onClick={() => {
                          setError(null);
                          setUseDemoToken(true);
                        }}
                        className="flex-1 text-[11px] font-mono bg-amber-500 text-black py-2 px-3 hover:opacity-90 font-bold uppercase tracking-wider transition-all"
                      >
                        Switch to Demo Token
                      </button>
                      <button 
                        onClick={() => {
                          setError(null);
                          setLoading(true);
                          // Toggle and toggle back isMonthly to force a reload
                          setIsMonthly(prev => !prev);
                          setTimeout(() => setIsMonthly(prev => !prev), 50);
                        }}
                        className="flex-1 text-[11px] font-mono bg-secondary text-secondary-foreground border border-border py-2 px-3 hover:bg-secondary/80 font-bold uppercase tracking-wider transition-all"
                      >
                        Retry Custom
                      </button>
                    </div>
                  </div>
                )}

                {/* Actual Embedded Paddle Container with dynamic key to fully destroy/remount iframe on reload */}
                <div 
                  key={`${useDemoToken ? 'demo' : 'custom'}-${isMonthly ? 'monthly' : 'yearly'}`} 
                  id="paddle-checkout-container" 
                  className="paddle-checkout-container w-full h-full min-h-[480px] z-10" 
                />
              </div>
            </div>

            {/* Footer trust items */}
            <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-muted-foreground">
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                256-bit SSL encrypted connection
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <Shield className="w-3.5 h-3.5 text-primary" />
                Merchant of Record: Paddle.js
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Premium Order Summary */}
          <div className="lg:col-span-5 p-6 md:p-10 bg-secondary/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-primary" />
                  Order Summary
                </h3>
                <span className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                  {slug.toUpperCase()}
                </span>
              </div>

              {/* Selected Plan Details */}
              <div className="mb-8">
                <h4 className="text-[17px] font-extrabold text-foreground mb-1">
                  {currentPlan.name}
                </h4>
                <p className="text-muted-foreground text-[12.5px] leading-relaxed mb-4">
                  {currentPlan.description}
                </p>

                <div className="space-y-2.5 bg-background border border-border/60 p-4">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-bold">
                    Included Capabilities
                  </div>
                  <ul className="space-y-2">
                    {currentPlan.features.map((feat) => (
                      <li key={feat} className="flex gap-2 items-start text-[11.5px] text-foreground font-medium">
                        <Check className="w-3.5 h-3.5 text-primary flex-none mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Dynamic Order Totals From Paddle Callbacks */}
              <div className="space-y-3 pt-6 border-t border-border">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-medium">Base plan retainer</span>
                  <span className="font-mono text-foreground font-bold">
                    {checkoutTotals.subtotal > 0 
                      ? formatMoney(checkoutTotals.subtotal, checkoutTotals.currency)
                      : currentPlan.basePrice}
                  </span>
                </div>

                {checkoutTotals.discount > 0 && (
                  <div className="flex justify-between items-center text-xs text-emerald-500">
                    <span className="font-medium flex items-center gap-1">
                      <BadgePercent className="w-3.5 h-3.5" />
                      Discount Applied
                    </span>
                    <span className="font-mono font-bold">
                      -{formatMoney(checkoutTotals.discount, checkoutTotals.currency)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span className="font-medium">Estimated Taxes</span>
                  <span className="font-mono">
                    {checkoutTotals.tax > 0 
                      ? formatMoney(checkoutTotals.tax, checkoutTotals.currency)
                      : '$0.00'}
                  </span>
                </div>

                <div className="h-[1px] bg-border my-2" />

                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs font-bold text-foreground block">Total Today</span>
                    <span className="text-[10px] text-muted-foreground font-mono leading-none">
                      Includes sandbox taxes & fees
                    </span>
                  </div>
                  <span className="text-2xl font-extrabold tracking-tight text-foreground font-mono">
                    {checkoutTotals.total > 0 
                      ? formatMoney(checkoutTotals.total, checkoutTotals.currency)
                      : currentPlan.basePrice}
                  </span>
                </div>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="mt-8 pt-6 border-t border-border">
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Have a discount coupon?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code (e.g. SAVE20)"
                    className="flex-1 bg-background border border-border px-3 py-2 text-xs font-mono focus:outline-none focus:border-ring placeholder:text-muted-foreground/50"
                  />
                  <button
                    type="submit"
                    disabled={couponStatus === 'applying'}
                    className="bg-primary text-primary-foreground text-xs font-mono font-bold px-4 py-2 hover:opacity-90 disabled:opacity-50 transition-all"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <div className={`mt-2.5 text-[11px] font-mono flex items-center gap-1.5 ${
                    couponStatus === 'success' ? 'text-emerald-500' : 'text-destructive'
                  }`}>
                    {couponStatus === 'success' ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                    {couponMessage}
                  </div>
                )}
              </form>
            </div>

            {/* Support / Help */}
            <div className="mt-12 p-4 bg-background border border-border text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold mb-1">
                <HelpCircle className="w-4 h-4 text-primary" />
                Need help scoping?
              </div>
              <p className="text-muted-foreground text-[11.5px] leading-relaxed">
                Contact our systems architect at <a href="mailto:hello@suprbuild.com" className="text-primary hover:underline">hello@suprbuild.com</a> or use the real-time AI Voice Assistant below.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
