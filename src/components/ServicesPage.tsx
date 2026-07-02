import { Server, Cpu, Database, ShieldCheck, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const iconMap: { [key: string]: any } = {
  Server: Server,
  Cpu: Cpu,
  Database: Database,
  ShieldCheck: ShieldCheck
};

const detailedServices = [
  {
    icon: Server,
    title: 'Product Engineering',
    description: 'We engineer full-stack software systems from database design to refined frontend interfaces. No generic boilerplates—just hand-written, performance-optimized source code.',
    bullets: [
      'Relational and document-based schema design (PostgreSQL, MongoDB, Redis)',
      'Secure, cookie-based authentication with OAuth 2.0 integrations',
      'Complex dashboard interfaces with real-time state synchronization',
      'Embedded client billing systems using Stripe and Paddle SDKs',
      'Type-safe contract interfaces via TypeScript and automated OpenAPIs'
    ]
  },
  {
    icon: Cpu,
    title: 'Autonomous AI Agent Systems',
    description: 'We construct serverless orchestration loops and LLM-powered workers that interact directly with your database, APIs, and real customers.',
    bullets: [
      'Multi-agent state machines designed using LangChain or custom orchestration',
      'Interactive voice assistants utilizing high-performance WebRTC streams (Vapi, LiveKit)',
      'Automated background workflow triggers and cron loops via n8n',
      'Strict JSON outputs and tool calling for deterministic pipeline routing',
      'Semantic search structures, vector embeddings, and Retrieval-Augmented Generation (RAG)'
    ]
  },
  {
    icon: Database,
    title: 'Infrastructure & DevOps Engineering',
    description: 'We provision hardened server stacks and cloud-native container architectures engineered to withstand real-world traffic.',
    bullets: [
      'Declarative cloud infrastructure using Terraform',
      'Containerization and high-performance clusters (Docker, Kubernetes on GCP/AWS)',
      'Automated zero-downtime CI/CD build actions',
      'Secure key vaults and encrypted environment secret storage (GSM, AWS Secrets)',
      'Proactive monitoring with Prometheus, Grafana, and automated PagerDuty paging'
    ]
  },
  {
    icon: ShieldCheck,
    title: 'Fintech & Compliance Engines',
    description: 'We build verifiable ledgers, financial calculation engines, and compliance pipelines compliant with industry security standards.',
    bullets: [
      'Double-entry database ledger systems with strict mathematical validation',
      'Multi-factor scoring algorithms and real-time underwriting APIs',
      'Compliance-aware architectures conforming to PCI-DSS, SOC2, and HIPAA',
      'Third-party identity and KYC/AML validation pipelines (Pladd, Persona)',
      'Cryptographic signatures and cryptographic validation structures'
    ]
  }
];

interface ServicesPageProps {
  onNavigateToContact: () => void;
}

export default function ServicesPage({ onNavigateToContact }: ServicesPageProps) {
  return (
    <div className="flex-1 bg-background text-foreground transition-colors duration-200">
      {/* Page Header */}
      <section className="pt-24 pb-16 md:py-28 border-b border-border bg-card">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8">
          <div className="max-w-[800px]">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-wider uppercase border border-border bg-secondary text-secondary-foreground px-2 py-0.5 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              standalone view
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mt-4 mb-6 leading-[1.05]">
              Modular capabilities.<br />Unified build process.
            </h1>
            <p className="text-muted-foreground text-[15px] sm:text-[17px] leading-relaxed max-w-[640px]">
              We handle the complex layers of modern application builds. Every line of our source code is written to be secure, type-safe, and self-documenting.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-20 md:py-24 border-b border-border">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8">
          <div className="flex flex-col gap-16 md:gap-24">
            {detailedServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
                >
                  {/* Left Metadata */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    <div className="w-[42px] h-[42px] border border-border flex items-center justify-center text-primary bg-card">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest font-semibold">
                      0{index + 1} / DISCIPLINE
                    </span>
                    <h2 className="text-[22px] sm:text-[26px] font-extrabold text-foreground leading-snug">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground text-[14px] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Right Bullet Details */}
                  <div className="lg:col-span-7 bg-card border border-border p-6 md:p-8">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/80 mb-6 font-mono flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-primary" />
                      Core Technical Deliverables
                    </h3>
                    <ul className="flex flex-col gap-4">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 items-start text-[13px] leading-relaxed text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-none mt-0.5" />
                          <span className="text-foreground font-medium">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20 md:py-24 bg-card">
        <div className="max-w-[750px] mx-auto px-6 text-center flex flex-col items-center gap-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Have a complex project that needs scoping?
          </h2>
          <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[500px]">
            We turn fuzzy requirements into strict technical blueprints and quote with fixed-pricing models. Talk to our systems architect today.
          </p>
          <div className="flex flex-wrap gap-3.5 justify-center mt-2">
            <button
              onClick={onNavigateToContact}
              className="inline-flex items-center gap-2 font-bold text-xs bg-primary text-primary-foreground hover:opacity-90 active:translate-y-[1px] px-6 py-3.5 transition-all"
            >
              Contact our engineering team
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
