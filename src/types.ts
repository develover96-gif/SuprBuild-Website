export interface ServiceItem {
  iconName: string;
  title: string;
  description: string;
}

export interface WorkItem {
  title: string;
  status: 'live' | 'operating' | 'in-progress';
  description: string;
  tags: string[];
}

export interface PricingPlan {
  name: string;
  kicker: string;
  description: string;
  price: string;
  unit: string;
  features: string[];
  ctaText: string;
  featured?: boolean;
  tag?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface InfraItem {
  iconName: string;
  title: string;
  description: string;
}
