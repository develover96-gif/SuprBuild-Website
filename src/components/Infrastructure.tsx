import { motion } from 'motion/react';
import { LayoutGrid, RefreshCw, Shield, Database, Globe, Activity } from 'lucide-react';
import { infraData } from '../data';

// Map icon names to Lucide icons
const iconMap: { [key: string]: any } = {
  LayoutGrid: LayoutGrid,
  RefreshCw: RefreshCw,
  Shield: Shield,
  Database: Database,
  Globe: Globe,
  Activity: Activity
};

export default function Infrastructure() {
  return (
    <section className="py-20 md:py-24 border-b border-border bg-background transition-colors duration-200" id="infra">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        
        {/* Section Heading */}
        <div className="max-w-[600px] mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-wider uppercase border border-border bg-secondary text-secondary-foreground px-2 py-0.5 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            cloud infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-4 mb-3.5">
            Infrastructure as part of the build
          </h2>
          <p className="text-muted-foreground text-[14px] sm:text-[15px] leading-relaxed">
            Every project ships with the operational layer already in place — not bolted on after launch.
          </p>
        </div>

        {/* Layout Grid container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-border rounded-none select-none overflow-hidden bg-card">
          {/* Left Hero side */}
          <div className="lg:col-span-5 p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-border flex flex-col justify-center gap-6">
            <h3 className="text-[22px] font-extrabold tracking-tight text-foreground leading-snug">
              Built to run, not just to demo
            </h3>
            <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[380px]">
              We provision, harden, and monitor the infrastructure your product runs on — so launch day isn't the first time it's under real load.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {['Docker', 'Kubernetes', 'Supabase', 'AWS / GCP', 'Cloudflare', 'GitHub Actions'].map((tech) => (
                <span
                  key={tech}
                  className="inline-block font-mono text-[10.5px] border border-border bg-secondary text-secondary-foreground px-2 py-0.5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Sub-Grid bento features */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {infraData.map((item, index) => {
              const IconComponent = iconMap[item.iconName] || Database;
              const isFirstRow = index < 2;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`p-6 md:p-8 flex gap-4 hover:bg-accent transition-colors duration-200 border-b border-border ${
                    isFirstRow ? 'sm:border-t-0' : ''
                  }`}
                >
                  <div className="w-[32px] h-[32px] border border-border flex items-center justify-center text-primary bg-background flex-none mt-0.5">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-bold text-foreground mb-1">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground text-[12.5px] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
