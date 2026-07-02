import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PhoneCall, Mail, ArrowRight, ShieldCheck, HelpCircle, MessageSquare } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Work from './components/Work';
import Pricing from './components/Pricing';
import Infrastructure from './components/Infrastructure';
import FAQ from './components/FAQ';
import VapiWidget from './components/VapiWidget';
import N8nChatWidget from './components/N8nChatWidget';
import Footer from './components/Footer';
import Checkout from './components/Checkout';
import NewsletterSignup from './components/NewsletterSignup';

// Standalone pages
import ServicesPage from './components/ServicesPage';
import PricingPage from './components/PricingPage';
import InfrastructurePage from './components/InfrastructurePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';

type RouteType = 'home' | 'checkout' | 'services' | 'pricing' | 'infrastructure' | 'about' | 'contact';

interface RouteState {
  path: RouteType;
  slug?: string;
}

function parseRoute(): RouteState {
  const hash = window.location.hash;
  const path = window.location.pathname;
  
  // Check hash-based routing first
  if (hash.startsWith('#/checkout/')) {
    const slug = hash.replace('#/checkout/', '');
    return { path: 'checkout', slug };
  }
  if (hash === '#/services') return { path: 'services' };
  if (hash === '#/pricing') return { path: 'pricing' };
  if (hash === '#/infrastructure' || hash === '#/infra') return { path: 'infrastructure' };
  if (hash === '#/about') return { path: 'about' };
  if (hash === '#/contact') return { path: 'contact' };

  // Check pathname routing (if server supports rewrite / during local dev)
  if (path.startsWith('/checkout/')) {
    const slug = path.replace('/checkout/', '');
    return { path: 'checkout', slug };
  }
  if (path === '/services') return { path: 'services' };
  if (path === '/pricing') return { path: 'pricing' };
  if (path === '/infrastructure' || path === '/infra') return { path: 'infrastructure' };
  if (path === '/about') return { path: 'about' };
  if (path === '/contact') return { path: 'contact' };

  return { path: 'home' };
}

export default function App() {
  const [voiceWidgetOpen, setVoiceWidgetOpen] = useState<boolean>(false);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [currentRoute, setCurrentRoute] = useState<RouteState>(() => parseRoute());

  // Listen to route changes & scroll to top
  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentRoute(parseRoute());
      window.scrollTo({ top: 0, behavior: 'instant' as any });
    };
    
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  // SEO: Dynamically update page title and description
  useEffect(() => {
    let title = 'SuprBuild — AI-native software & infrastructure';
    let description = 'AI-native custom software, high-performance backends, serverless stacks, and dedicated DevOps cloud infrastructure by SuprBuild.';

    switch (currentRoute.path) {
      case 'checkout':
        title = `Scoping Brief — ${currentRoute.slug ? currentRoute.slug.toUpperCase() : ''} Build Package — SuprBuild`;
        description = 'Finalize your custom scoping inquiry for the SuprBuild fixed-fee product build packages.';
        break;
      case 'services':
        title = 'Services & Capabilities — SuprBuild';
        description = 'Explore our advanced custom engineering disciplines: Product Engineering, Autonomous AI Agent Systems, Cloud-Native DevOps, and Fintech compliance engines.';
        break;
      case 'pricing':
        title = 'Fixed-Scope Pricing & Cost Estimator — SuprBuild';
        description = 'Use our interactive scope estimator to estimate delivery range and explore our transparent fixed-fee base software packages.';
        break;
      case 'infrastructure':
        title = 'DevOps & Hardened Cloud Infrastructure — SuprBuild';
        description = 'Zero-trust multi-region container clusters, automatic CI/CD actions, database replication, CDNs, and active observability networks.';
        break;
      case 'about':
        title = 'About the Company — SuprBuild LLC';
        description = 'Our foundational technical principles, client-first IP ownership, speed-to-market methodologies, and elite engineering studio roster.';
        break;
      case 'contact':
        title = 'Contact Systems Engineers — SuprBuild LLC';
        description = 'Submit your project specifications or speak with an engineering lead. HQ: Sheridan, WY, USA. Phone: +13072038232. Email: contact@suprbuild.com.';
        break;
      default:
        break;
    }

    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, [currentRoute]);

  const handleOpenVoice = () => {
    setVoiceWidgetOpen(true);
    setChatOpen(false); // Close Chat when opening Voice
    // Smooth scroll to launcher view to guide user attention
    const widget = document.getElementById('vapi-launcher');
    if (widget) {
      widget.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleToggleVoice = () => {
    setVoiceWidgetOpen(prev => {
      const next = !prev;
      if (next) {
        setChatOpen(false); // Close Chat when opening Voice
      }
      return next;
    });
  };

  const handleCloseVoice = () => {
    setVoiceWidgetOpen(false);
  };

  const handleOpenChat = () => {
    setChatOpen(true);
    setVoiceWidgetOpen(false); // Close Voice when opening Chat
  };

  const handleCloseChat = () => {
    setChatOpen(false);
  };

  const handleToggleChat = () => {
    setChatOpen(prev => {
      const next = !prev;
      if (next) {
        setVoiceWidgetOpen(false); // Close Voice when opening Chat
      }
      return next;
    });
  };

  const handleBackToHome = () => {
    window.location.hash = '';
    // If the path was used, fallback history
    if (window.location.pathname.startsWith('/checkout')) {
      window.history.pushState({}, '', '/');
    }
    setCurrentRoute({ path: 'home' });
    
    // Smooth scroll to pricing after layout renders
    setTimeout(() => {
      const pricingSec = document.getElementById('pricing');
      if (pricingSec) {
        pricingSec.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNavigateToContact = () => {
    window.location.hash = '#/contact';
  };

  // Render standby route views dynamically
  const renderContent = () => {
    switch (currentRoute.path) {
      case 'checkout':
        return (
          <Checkout 
            slug={currentRoute.slug || 'launch'} 
            onBack={handleBackToHome} 
          />
        );
      case 'services':
        return <ServicesPage onNavigateToContact={handleNavigateToContact} />;
      case 'pricing':
        return <PricingPage onNavigateToContact={handleNavigateToContact} />;
      case 'infrastructure':
        return <InfrastructurePage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return (
          <main className="flex-1">
            {/* Hero Section */}
            <Hero onOpenVoice={handleOpenVoice} onOpenChat={handleOpenChat} />

            {/* Selected Builds Section */}
            <Work />

            {/* Core Capabilities Section */}
            <Services />

            {/* Scoping and Pricing Section (Includes Dynamic Estimator) */}
            <Pricing />

            {/* Dedicated DevOps Cloud Infrastructure Section */}
            <Infrastructure />

            {/* In-Page AI-Native Assistant Banner */}
            <section className="py-20 md:py-24 border-b border-border bg-background transition-colors duration-200" id="support">
              <div className="max-w-[1180px] mx-auto px-6 md:px-8">
                <div className="max-w-[600px] mx-auto text-center mb-16">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-wider uppercase border border-border bg-secondary text-secondary-foreground px-2 py-0.5 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    talk to us
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-4 mb-3.5">
                    Not a product. Just how you reach us.
                  </h2>
                  <p className="text-muted-foreground text-[14px] sm:text-[15px] leading-relaxed">
                    Before you email, just ask. The voice in the corner is our front-line support and sales rep — answering questions and routing you to the right person, instantly.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 border border-border bg-card divide-y lg:divide-y-0 lg:divide-x divide-border select-none overflow-hidden">
                  {/* Copy Side */}
                  <div className="p-8 md:p-10 flex flex-col justify-center gap-6">
                    <h3 className="text-[20px] font-extrabold text-foreground leading-snug">
                      Always picks up
                    </h3>
                    <p className="text-muted-foreground text-[13.5px] leading-relaxed">
                      It knows what we build, what things cost, and when to hand you off to a real person on the team.
                    </p>
                    <ul className="flex flex-col gap-3">
                      {[
                        'Answers questions about our work, process, and pricing',
                        'Qualifies new project inquiries on the spot',
                        'Hands off to a human the moment it should'
                      ].map((feat) => (
                        <li key={feat} className="flex gap-2.5 items-start text-[13px] font-medium leading-relaxed text-foreground">
                          <ShieldCheck className="w-4.5 h-4.5 text-primary flex-none mt-0.5" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Call Trigger Side */}
                  <div className="p-8 md:p-10 bg-secondary flex items-center justify-center">
                    <button
                      onClick={handleOpenChat}
                      className="inline-flex items-center gap-2.5 font-bold text-xs bg-primary text-primary-foreground hover:opacity-90 active:translate-y-[1px] px-6 py-4.5 border border-transparent transition-all select-none"
                    >
                      <HelpCircle className="w-4 h-4" />
                      Ask support a question
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Accordion FAQ Section */}
            <FAQ />

            {/* Newsletter Subscription Section */}
            <section className="py-20 md:py-24 bg-background border-t border-border/40 transition-colors duration-200" id="newsletter">
              <div className="max-w-[600px] mx-auto px-6 text-center flex flex-col items-center">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-wider uppercase border border-border bg-secondary text-secondary-foreground px-2.5 py-0.5 select-none mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  newsletter
                </span>
                <NewsletterSignup centered={true} />
              </div>
            </section>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-200" id="top">
      {/* Dynamic Header / Navbar */}
      <Navbar onOpenVoice={handleOpenVoice} onOpenChat={handleOpenChat} />

      {/* Conditionally Render Standalone Pages or Home Content */}
      {renderContent()}

      {/* Global Interactive Floating voice widget */}
      <VapiWidget
        isOpen={voiceWidgetOpen}
        onClose={handleCloseVoice}
        onToggleOpen={handleToggleVoice}
        isChatOpen={chatOpen}
      />

      {/* Slide-In Support Chat Widget */}
      <N8nChatWidget
        isOpen={chatOpen}
        onClose={handleCloseChat}
      />

      {/* Global Floating Chat Assistant Launcher (at bottom-right, right-6) */}
      <button
        onClick={handleToggleChat}
        id="chat-launcher"
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 bg-primary text-primary-foreground border border-transparent flex items-center justify-center shadow-lg hover:scale-[1.06] active:translate-y-[1px] transition-all duration-300 ${chatOpen ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 pointer-events-auto'}`}
        aria-label="Open support chat assistant"
      >
        <MessageSquare className="w-5 h-5" />
      </button>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
