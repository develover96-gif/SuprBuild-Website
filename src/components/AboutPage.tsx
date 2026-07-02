import { Shield, Sparkles, Code, Users, Cpu, FileText } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutPage() {
  const values = [
    {
      icon: Code,
      title: 'Architectural honesty',
      desc: 'We do not build unneeded abstractions or overcomplicate codebases to "lock in" clients. We write clean, robust, simple software that is extremely performant.'
    },
    {
      icon: Shield,
      title: 'Complete IP ownership',
      desc: 'You own everything we build—full copyrights, source code repositories, configurations, and assets are handed over on project completion.'
    },
    {
      icon: Sparkles,
      title: 'Fixed scoping model',
      desc: 'We map out precise deliverables beforehand. You pay a clear, fixed price. No bloated hourly bills or runaway development budgets.'
    }
  ];

  return (
    <div className="flex-1 bg-background text-foreground transition-colors duration-200">
      {/* Page Header */}
      <section className="pt-24 pb-16 md:py-28 border-b border-border bg-card">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8">
          <div className="max-w-[800px]">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-wider uppercase border border-border bg-secondary text-secondary-foreground px-2 py-0.5 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              our philosophy
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mt-4 mb-6 leading-[1.05]">
              Elite software engineers.<br />No agency overhead.
            </h1>
            <p className="text-muted-foreground text-[15px] sm:text-[17px] leading-relaxed max-w-[640px]">
              SuprBuild LLC is a specialized software engineering studio. We combine full-stack development, autonomous AI systems, and secure DevOps infrastructure under a single, highly efficient build pipeline.
            </p>
          </div>
        </div>
      </section>

      {/* Studio Story */}
      <section className="py-20 md:py-24 border-b border-border">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">Studio Origin</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-2 mb-4">Why we founded SuprBuild</h2>
              <p className="text-muted-foreground text-[13.5px] leading-relaxed mb-4">
                We observed that standard software agencies are often bloated, slow, and overly reliant on junior developers. Projects fall behind schedule, pricing structure is opaque, and the code generated is hard to maintain or expand.
              </p>
              <p className="text-muted-foreground text-[13.5px] leading-relaxed">
                SuprBuild was established to solve these issues. We are a small team of veteran engineers who work directly with founders and product leaders. We don't have account managers, salesmen, or layers of bureaucracy—just pure engineering talent.
              </p>
            </div>

            <div className="lg:col-span-7 bg-card border border-border p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2.5">
                <div className="text-3xl font-extrabold text-primary font-mono">100%</div>
                <h3 className="font-bold text-[14px] text-foreground">In-House Production</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">Every line of code and server setup is done directly by our vetted core team—never outsourced.</p>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="text-3xl font-extrabold text-primary font-mono">4-16w</div>
                <h3 className="font-bold text-[14px] text-foreground">Averages Delivery Time</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">We scope tightly to release working, production-ready iterations rapidly rather than entering endless design loops.</p>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="text-3xl font-extrabold text-primary font-mono">SOC2</div>
                <h3 className="font-bold text-[14px] text-foreground">Compliant Layouts</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">Security is never an afterthought. We implement multi-factor credentials, secrets storage, and audit logs from day one.</p>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="text-3xl font-extrabold text-primary font-mono">Zero</div>
                <h3 className="font-bold text-[14px] text-foreground">Technical Lock-In</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">We bundle complete deployment files and documentation so your internal team can take over seamlessly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 md:py-24 bg-card">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8">
          <div className="max-w-[600px] mb-16">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground border border-border bg-secondary px-2 py-0.5">
              our values
            </span>
            <h2 className="text-3xl font-extrabold text-foreground mt-4">
              What sets us apart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="border border-border p-8 bg-background flex flex-col gap-4">
                  <div className="w-[38px] h-[38px] border border-border flex items-center justify-center text-primary bg-card">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="font-bold text-[15.5px] text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
