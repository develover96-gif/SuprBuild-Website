import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, HelpCircle, Sparkles, Calculator, CheckCircle2 } from 'lucide-react';
import { pricingData } from '../data';

export default function Pricing() {
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
    <section className="py-20 md:py-24 border-b border-border bg-background transition-colors duration-200" id="pricing">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        
        {/* Section Heading */}
        <div className="max-w-[700px] mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-wider uppercase border border-border bg-secondary text-secondary-foreground px-2 py-0.5 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            pricing & scoping
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-4 mb-3.5">
            Two ways to build, one way to keep shipping
          </h2>
          <p className="text-muted-foreground text-[14px] sm:text-[15px] leading-relaxed">
            Every engagement starts with a scoped proposal — no hourly surprises. Select a base plan or construct your own custom project scope below.
          </p>

          {/* Plan/Calculator Switcher */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex p-1 bg-secondary border border-border rounded-none">
              <button
                onClick={() => setActiveTab('plans')}
                className={`px-4 py-2 text-xs font-semibold select-none transition-all ${
                  activeTab === 'plans'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Base Plans
              </button>
              <button
                onClick={() => setActiveTab('calculator')}
                className={`px-4 py-2 text-xs font-semibold select-none flex items-center gap-1.5 transition-all ${
                  activeTab === 'calculator'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                Scope Estimator
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Panel Rendering */}
        <AnimatePresence mode="wait">
          {activeTab === 'plans' ? (
            <motion.div
              key="plans"
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
                    {/* Tag badge for featured */}
                    {isFeatured && plan.tag && (
                      <span className="absolute top-0 right-0 bg-primary text-primary-foreground font-mono text-[9px] uppercase tracking-wider px-3 py-1.5">
                        {plan.tag}
                      </span>
                    )}

                    <div>
                      {/* Plan kicker header */}
                      <div className={`font-mono text-[10.5px] uppercase tracking-wider mb-3 ${
                        isFeatured ? 'text-background/60' : 'text-muted-foreground'
                      }`}>
                        {plan.kicker}
                      </div>

                      {/* Name & Desc */}
                      <h3 className="text-[20px] font-bold leading-tight mb-2">
                        {plan.name}
                      </h3>
                      <p className={`text-[13px] leading-relaxed mb-6 min-h-[38px] ${
                        isFeatured ? 'text-background/70' : 'text-muted-foreground'
                      }`}>
                        {plan.description}
                      </p>

                      {/* Price Block */}
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

                      {/* Feature Checklist */}
                      <ul className="flex flex-col gap-3 mb-8">
                        {plan.features.map((feat) => (
                          <li key={feat} className="flex gap-2.5 items-start text-[13px] font-medium leading-relaxed">
                            <Check className={`w-4 h-4 flex-none mt-0.5 ${isFeatured ? 'text-primary' : 'text-primary'}`} />
                            <span className={isFeatured ? 'text-background/90' : 'text-foreground'}>
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Action */}
                    <a
                      href={`#/checkout/${plan.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`w-full py-3 text-center text-xs font-bold transition-all border ${
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
              key="calculator"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="border border-border bg-card p-6 md:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Inputs Columns */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                  {/* Select Project Scale */}
                  <div>
                    <h4 className="text-[14.5px] font-bold text-foreground mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      1. What is the scope of your product?
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

                  {/* Select Platform */}
                  <div>
                    <h4 className="text-[14.5px] font-bold text-foreground mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      2. Supported Platforms?
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

                  {/* Core Features / Add-ons */}
                  <div>
                    <h4 className="text-[14.5px] font-bold text-foreground mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      3. Core Infrastructure & Features
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
                        <span className="text-xs font-bold">AI Agent Integration</span>
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
                        <span className="text-xs font-bold">Billing & Ledgers</span>
                      </button>
                    </div>
                  </div>

                  {/* Target Timeline */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-[14.5px] font-bold text-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        4. Target Timeline
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

                {/* Estimate output Box */}
                <div className="lg:col-span-5 border border-border bg-secondary p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider border border-border bg-background text-foreground px-2 py-0.5 mb-4 select-none">
                      <Sparkles className="w-3 h-3 text-primary" />
                      Dynamic estimate
                    </span>
                    
                    <h5 className="font-mono text-[10.5px] text-muted-foreground uppercase tracking-widest mb-1.5">Estimated Cost Range</h5>
                    <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
                      ${estimate.price} <span className="text-xs font-medium text-muted-foreground">USD</span>
                    </div>

                    <p className="text-xs leading-relaxed text-muted-foreground mb-6">
                      Estimated timeline is **{estimate.minTimeline} to {estimate.maxTimeline} weeks** based on selected scale and platforms.
                    </p>

                    <div className="bg-card border border-border p-4 mb-6">
                      <div className="flex gap-2.5 items-start">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-none" />
                        <div>
                          <div className="text-xs font-bold text-foreground">Suggested Plan</div>
                          <div className="text-[11.5px] font-mono text-muted-foreground mt-0.5">{estimate.plan}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`mailto:hello@suprbuild.com?subject=Project Inquiry - ${estimate.plan}&body=Scale: ${projectScale}%0APlatforms: ${platformType}%0AAI agents: ${includeAI}%0ABilling: ${includeBilling}%0ATimeline: ${timeline} weeks`}
                    className="w-full py-3.5 bg-primary text-primary-foreground font-bold text-center text-xs flex items-center justify-center gap-1.5 hover:opacity-90 active:translate-y-[1px] transition-all"
                  >
                    Send scope to team
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center font-mono text-[12.5px] text-muted-foreground mt-8">
          Final pricing is confirmed after a scoping call — it depends on integrations, compliance needs, and platform count.
        </p>
      </div>
    </section>
  );
}
