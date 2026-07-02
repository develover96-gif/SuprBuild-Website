import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, Calculator, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';
import { pricingData, faqData } from '../data';

interface PricingPageProps {
  onNavigateToContact: () => void;
}

export default function PricingPage({ onNavigateToContact }: PricingPageProps) {
  const [activeTab, setActiveTab] = useState<'plans' | 'calculator'>('plans');

  // Interactive Calculator State
  const [projectScale, setProjectScale] = useState<'mvp' | 'business' | 'enterprise'>('mvp');
  const [platformType, setPlatformType] = useState<'web' | 'mobile' | 'both'>('web');
  const [includeAI, setIncludeAI] = useState<boolean>(false);
  const [includeBilling, setIncludeBilling] = useState<boolean>(false);
  const [includeDB, setIncludeDB] = useState<boolean>(true);
  const [timeline, setTimeline] = useState<number>(8); // weeks

  // Dynamic estimate calculation logic
  const calculateEstimate = () => {
    let base = 15000;
    
    if (projectScale === 'business') base = 45000;
    if (projectScale === 'enterprise') base = 90000;

    let multiplier = 1.0;
    if (platformType === 'mobile') multiplier = 1.15;
    if (platformType === 'both') multiplier = 1.4;

    let addons = 0;
    if (includeAI) addons += 12000;
    if (includeBilling) addons += 45000;
    if (includeDB) addons += 6000;

    // Timeline adjustment: rushing costs more
    let rushMultiplier = 1.0;
    if (timeline <= 4) rushMultiplier = 1.25;
    if (timeline >= 12) rushMultiplier = 0.95;

    const total = Math.round((base * multiplier + addons) * rushMultiplier);
    
    // Suggest the plan
    let planSuggestion = 'Launch Plan';
    if (total > 45000) planSuggestion = 'Build Plan';
    if (projectScale === 'enterprise' || total > 100000) planSuggestion = 'Build Plan or Embedded Team';

    return {
      price: total.toLocaleString(),
      plan: planSuggestion,
      minTimeline: Math.max(4, timeline - 2),
      maxTimeline: timeline + 2
    };
  };

  const estimate = calculateEstimate();

  return (
    <div className="flex-1 bg-background text-foreground transition-colors duration-200">
      {/* Page Header */}
      <section className="pt-24 pb-16 md:py-28 border-b border-border bg-card">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8">
          <div className="max-w-[800px]">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-wider uppercase border border-border bg-secondary text-secondary-foreground px-2 py-0.5 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              pricing & transparency
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mt-4 mb-6 leading-[1.05]">
              No hourly surprises.<br />Fixed-scope pricing.
            </h1>
            <p className="text-muted-foreground text-[15px] sm:text-[17px] leading-relaxed max-w-[640px]">
              We price projects as a single fixed-cost package rather than charging hourly. Choose a base template below or build your own custom scope using our interactive tool.
            </p>

            {/* Plan/Calculator Switcher */}
            <div className="flex justify-start mt-8">
              <div className="inline-flex p-1 bg-secondary border border-border rounded-none">
                <button
                  onClick={() => setActiveTab('plans')}
                  className={`px-4 py-2.5 text-xs font-semibold select-none transition-all ${
                    activeTab === 'plans'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Standard Base Plans
                </button>
                <button
                  onClick={() => setActiveTab('calculator')}
                  className={`px-4 py-2.5 text-xs font-semibold select-none flex items-center gap-1.5 transition-all ${
                    activeTab === 'calculator'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Calculator className="w-3.5 h-3.5" />
                  Interactive Scope Estimator
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 md:py-24 border-b border-border">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8">
          <AnimatePresence mode="wait">
            {activeTab === 'plans' ? (
              <motion.div
                key="plans-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-3 border border-border bg-card divide-y lg:divide-y-0 lg:divide-x divide-border select-none overflow-hidden"
              >
                {pricingData.map((plan) => {
                  const isFeatured = plan.featured;
                  return (
                    <div
                      key={plan.name}
                      className={`p-8 md:p-10 flex flex-col justify-between relative transition-all duration-200 ${
                        isFeatured ? 'bg-foreground text-background dark:bg-foreground dark:text-background' : 'bg-card text-foreground'
                      }`}
                    >
                      {isFeatured && plan.tag && (
                        <span className="absolute top-0 right-0 bg-primary text-primary-foreground font-mono text-[9px] uppercase tracking-wider px-3 py-1.5">
                          {plan.tag}
                        </span>
                      )}

                      <div>
                        <div className={`font-mono text-[10.5px] uppercase tracking-wider mb-3 ${
                          isFeatured ? 'text-background/60' : 'text-muted-foreground'
                        }`}>
                          {plan.kicker}
                        </div>

                        <h3 className="text-[20px] font-bold leading-tight mb-2">
                          {plan.name}
                        </h3>
                        <p className={`text-[13px] leading-relaxed mb-6 min-h-[38px] ${
                          isFeatured ? 'text-background/70' : 'text-muted-foreground'
                        }`}>
                          {plan.description}
                        </p>

                        <div className="flex items-baseline gap-1.5 mb-1.5">
                          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                            {plan.price}
                          </span>
                        </div>
                        <div className={`text-[12px] font-medium mb-6 ${
                          isFeatured ? 'text-background/60' : 'text-muted-foreground'
                        }`}>
                          {plan.unit}
                        </div>

                        <hr className={`border-t my-6 ${isFeatured ? 'border-background/20' : 'border-border'}`} />

                        <ul className="flex flex-col gap-3 mb-8">
                          {plan.features.map((feat) => (
                            <li key={feat} className="flex gap-2.5 items-start text-[13px] font-medium leading-relaxed">
                              <Check className="w-4 h-4 text-primary flex-none mt-0.5" />
                              <span className={isFeatured ? 'text-background/90' : 'text-foreground'}>
                                {feat}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <a
                        href={`#/checkout/${plan.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className={`w-full py-3.5 text-center text-xs font-bold transition-all border ${
                          isFeatured
                            ? 'bg-primary text-primary-foreground border-transparent hover:opacity-90'
                            : 'bg-background border-border text-foreground hover:bg-accent hover:border-ring'
                        }`}
                      >
                        {plan.ctaText}
                      </a>
                    </div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="calculator-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="border border-border bg-card p-6 md:p-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  <div className="lg:col-span-7 flex flex-col gap-8">
                    <div>
                      <h4 className="text-[14.5px] font-bold text-foreground mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        1. Select project scale
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'mvp', title: 'MVP / Startup v1', desc: 'Validating concept' },
                          { id: 'business', title: 'Production App', desc: 'Custom integrations' },
                          { id: 'enterprise', title: 'Complex Platform', desc: 'Security, compliance' }
                        ].map(scale => (
                          <button
                            key={scale.id}
                            onClick={() => setProjectScale(scale.id as any)}
                            className={`p-4 text-left border flex flex-col gap-1.5 transition-all select-none ${
                              projectScale === scale.id
                                ? 'border-primary bg-accent text-foreground'
                                : 'border-border text-muted-foreground hover:text-foreground hover:border-ring'
                            }`}
                          >
                            <span className="text-[12.5px] font-bold leading-tight">{scale.title}</span>
                            <span className="text-[10px] opacity-80 leading-relaxed">{scale.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[14.5px] font-bold text-foreground mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        2. Supported platform clients
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'web', title: 'Web App', desc: 'SaaS desktop + responsive' },
                          { id: 'mobile', title: 'Mobile Client', desc: 'React Native iOS/Android' },
                          { id: 'both', title: 'Web & Mobile', desc: 'Simultaneous deployment' }
                        ].map(plat => (
                          <button
                            key={plat.id}
                            onClick={() => setPlatformType(plat.id as any)}
                            className={`p-4 text-left border flex flex-col gap-1.5 transition-all select-none ${
                              platformType === plat.id
                                ? 'border-primary bg-accent text-foreground'
                                : 'border-border text-muted-foreground hover:text-foreground hover:border-ring'
                            }`}
                          >
                            <span className="text-[12.5px] font-bold leading-tight">{plat.title}</span>
                            <span className="text-[10px] opacity-80 leading-relaxed">{plat.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[14.5px] font-bold text-foreground mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        3. Core features & infrastructure
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          onClick={() => setIncludeDB(!includeDB)}
                          className={`p-3 text-left border flex items-center gap-3 transition-all select-none ${
                            includeDB ? 'border-primary bg-accent text-foreground' : 'border-border text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <div className={`w-4 h-4 border flex items-center justify-center rounded-none flex-none ${includeDB ? 'border-primary bg-primary text-primary-foreground' : 'border-border'}`}>
                            {includeDB && <Check className="w-3 h-3" />}
                          </div>
                          <span className="text-xs font-bold">SQL Database Setup</span>
                        </button>

                        <button
                          onClick={() => setIncludeAI(!includeAI)}
                          className={`p-3 text-left border flex items-center gap-3 transition-all select-none ${
                            includeAI ? 'border-primary bg-accent text-foreground' : 'border-border text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <div className={`w-4 h-4 border flex items-center justify-center rounded-none flex-none ${includeAI ? 'border-primary bg-primary text-primary-foreground' : 'border-border'}`}>
                            {includeAI && <Check className="w-3 h-3" />}
                          </div>
                          <span className="text-xs font-bold">AI Agent Systems</span>
                        </button>

                        <button
                          onClick={() => setIncludeBilling(!includeBilling)}
                          className={`p-3 text-left border flex items-center gap-3 transition-all select-none ${
                            includeBilling ? 'border-primary bg-accent text-foreground' : 'border-border text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <div className={`w-4 h-4 border flex items-center justify-center rounded-none flex-none ${includeBilling ? 'border-primary bg-primary text-primary-foreground' : 'border-border'}`}>
                            {includeBilling && <Check className="w-3 h-3" />}
                          </div>
                          <span className="text-xs font-bold">Stripe/Paddle Ledgers</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-[14.5px] font-bold text-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          4. Requested Timeline
                        </h4>
                        <span className="font-mono text-xs font-bold text-primary select-none">{timeline} Weeks</span>
                      </div>
                      <input
                        type="range"
                        min="4"
                        max="16"
                        value={timeline}
                        onChange={(e) => setTimeline(parseInt(e.target.value))}
                        className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-1.5">
                        <span>4 Weeks (Expedited)</span>
                        <span>16 Weeks (Phased)</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 border border-border bg-secondary p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider border border-border bg-background text-foreground px-2 py-0.5 mb-4 select-none">
                        <Sparkles className="w-3 h-3 text-primary" />
                        Live Estimate Output
                      </span>
                      
                      <h5 className="font-mono text-[10.5px] text-muted-foreground uppercase tracking-widest mb-1.5">Estimated Cost Range</h5>
                      <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
                        ${estimate.price} <span className="text-xs font-medium text-muted-foreground">USD</span>
                      </div>

                      <p className="text-xs leading-relaxed text-muted-foreground mb-6">
                        Estimated timeline is **{estimate.minTimeline} to {estimate.maxTimeline} weeks** based on selected parameters.
                      </p>

                      <div className="bg-card border border-border p-4 mb-6">
                        <div className="flex gap-2.5 items-start">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-none" />
                          <div>
                            <div className="text-xs font-bold text-foreground">Suggested Architecture Plan</div>
                            <div className="text-[11.5px] font-mono text-muted-foreground mt-0.5">{estimate.plan}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <a
                      href={`mailto:hello@suprbuild.com?subject=Project Inquiry - ${estimate.plan}&body=Scale: ${projectScale}%0APlatforms: ${platformType}%0AAI agents: ${includeAI}%0ABilling: ${includeBilling}%0ATimeline: ${timeline} weeks`}
                      className="w-full py-3.5 bg-primary text-primary-foreground font-bold text-center text-xs flex items-center justify-center gap-1.5 hover:opacity-90 active:translate-y-[1px] transition-all"
                    >
                      Lock in Scope Proposal
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Pricing FAQs segment */}
      <section className="py-20 md:py-24 bg-card">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground border border-border bg-secondary px-2 py-0.5">
              pricing faq
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-3">
              Answers to common billing questions
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            {faqData.slice(0, 4).map((faq) => (
              <div key={faq.question} className="border border-border p-6 bg-background">
                <h3 className="font-bold text-[14.5px] text-foreground flex items-center gap-2">
                  <HelpCircle className="w-4.5 h-4.5 text-primary flex-none" />
                  {faq.question}
                </h3>
                <p className="text-muted-foreground text-[13.5px] leading-relaxed mt-2.5 pl-6.5">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
