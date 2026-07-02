import { ServiceItem, WorkItem, PricingPlan, FAQItem, InfraItem } from './types';

export const servicesData: ServiceItem[] = [
  {
    iconName: 'Server',
    title: 'Product engineering',
    description: 'Full-stack builds from schema to UI — auth, billing, dashboards, the messy parts.'
  },
  {
    iconName: 'Cpu',
    title: 'AI agent systems',
    description: 'Autonomous agents, voice agents, and orchestration loops that do real work.'
  },
  {
    iconName: 'Database',
    title: 'Infrastructure & DevOps',
    description: 'VPS hardening, container orchestration, CI/CD built to survive production.'
  },
  {
    iconName: 'ShieldCheck',
    title: 'Fintech & compliance',
    description: 'Scoring engines, ledgers, and verification flows built around real constraints.'
  }
];

export const workData: WorkItem[] = [
  {
    title: 'Krostio',
    status: 'live',
    description: 'Credit infrastructure for gig workers — six-factor scoring engine, verifiable credentials, a ledger built for irregular income.',
    tags: ['Supabase', 'TypeScript', 'Solidity']
  },
  {
    title: 'microsaas.space',
    status: 'live',
    description: 'A curated directory and knowledge hub for indie founders, built on a 23-table product knowledge graph.',
    tags: ['Next.js', 'Supabase', 'Tailwind']
  },
  {
    title: 'BDStack',
    status: 'live',
    description: 'A fintech intelligence API surfacing structured data on mobile financial services rails.',
    tags: ['API platform', 'Fintech data', 'GraphQL']
  },
  {
    title: 'GrowthEngine',
    status: 'operating',
    description: 'Self-hosted agent infrastructure — cron-driven loops and orchestration, hardened on a dedicated VPS.',
    tags: ['Docker', 'n8n', 'Python']
  }
];

export const pricingData: PricingPlan[] = [
  {
    name: 'Launch',
    kicker: 'Base plan · fixed scope',
    description: 'A tightly scoped MVP to validate a product or replace a fragile prototype.',
    price: '$5,000',
    unit: 'one-time · single MVP build',
    features: [
      'Discovery & scope sign-off',
      'Single-platform web app',
      'Auth, database & deploy pipeline',
      'Two rounds of design revision',
      '30 days of post-launch support'
    ],
    ctaText: 'Scope a Launch build'
  },
  {
    name: 'Build',
    kicker: 'Base plan · fixed scope',
    description: 'A production-grade product with integrations, compliance, and real infrastructure.',
    price: '$1,500',
    unit: 'one-time · base configuration fee',
    features: [
      'Everything in Launch',
      'Multi-platform (web + mobile-ready)',
      'Payments, APIs & 3rd-party integrations',
      'Compliance-aware architecture',
      'Cloud infra setup & 90-day support'
    ],
    ctaText: 'Scope a Build project'
  },
  {
    name: 'Embedded Team',
    kicker: 'Embedded team · retainer',
    description: 'A dedicated senior engineer + PM inside your roadmap, for products that keep shipping.',
    price: '$65/mo',
    unit: 'or $799/yr billing options',
    features: [
      'Dedicated senior engineer(s) + PM',
      'Weekly sprints & roadmap planning',
      'Direct Slack access, no ticket queue',
      'Infra, on-call & incident coverage',
      'Scale hours up or down monthly'
    ],
    ctaText: 'Talk about a retainer',
    featured: true,
    tag: 'Consultancy'
  }
];

export const faqData: FAQItem[] = [
  {
    question: 'How is pricing actually determined?',
    answer: 'The ranges above are starting points. Integrations, compliance requirements, and platform count are what move a quote — we confirm the real number after a short scoping call, in writing, before any work starts.'
  },
  {
    question: 'Can I start with Launch and move to Build later?',
    answer: 'Yes — Launch is designed to validate the product first. If it earns a bigger build, the codebase carries forward into a Build engagement instead of starting over.'
  },
  {
    question: 'What exactly does the Embedded Team plan include?',
    answer: 'A dedicated senior engineer and project manager working inside your roadmap on a monthly retainer — weekly sprints, direct Slack access, and infra/on-call coverage. It\'s built for products that need continuous iteration, not a one-off build.'
  },
  {
    question: 'Do you ever bill hourly?',
    answer: 'Fixed-scope work is priced and billed as a fixed amount, not hours — it protects your budget from scope drift. The Embedded Team plan is a flat monthly retainer rather than hourly billing too.'
  },
  {
    question: 'Is the AI voice assistant something we can buy?',
    answer: 'No — it\'s not a product we sell. It\'s how our own support and sales run, built by our AI agent systems team. If you want something similar built for your business, that falls under our AI agent systems service.'
  },
  {
    question: 'Who owns the code and IP after launch?',
    answer: 'You do, fully, on delivery — source code, infrastructure configs, and design files. There\'s no lock-in to keep working with us.'
  },
  {
    question: 'Do you sign NDAs and handle compliance needs?',
    answer: 'Yes to NDAs before any scoping call. For regulated builds we design around the relevant compliance requirements from day one rather than retrofitting them later.'
  }
];

export const infraData: InfraItem[] = [
  {
    iconName: 'LayoutGrid',
    title: 'Container orchestration',
    description: 'Docker & Kubernetes deployments built to scale without a rewrite.'
  },
  {
    iconName: 'RefreshCw',
    title: 'CI/CD pipelines',
    description: 'Automated test, build, and deploy on every merge — no manual releases.'
  },
  {
    iconName: 'Shield',
    title: 'VPS hardening & monitoring',
    description: 'Firewalls, secrets, and uptime monitoring configured before go-live.'
  },
  {
    iconName: 'Database',
    title: 'Database & backups',
    description: 'Managed Postgres with automated backups and point-in-time recovery.'
  },
  {
    iconName: 'Globe',
    title: 'CDN & edge caching',
    description: 'Global edge delivery for static assets and API responses that stay fast.'
  },
  {
    iconName: 'Activity',
    title: 'Observability & alerting',
    description: 'Logs, traces, and on-call alerts wired in before anything breaks in prod.'
  }
];
