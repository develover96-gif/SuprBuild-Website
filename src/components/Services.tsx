import { motion } from 'motion/react';
import { Server, Cpu, Database, ShieldCheck } from 'lucide-react';
import { servicesData } from '../data';

// Map icon name strings to Lucide React component objects
const iconMap: { [key: string]: any } = {
  Server: Server,
  Cpu: Cpu,
  Database: Database,
  ShieldCheck: ShieldCheck
};

export default function Services() {
  return (
    <section className="py-20 md:py-24 border-b border-border bg-background transition-colors duration-200" id="services">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        {/* Section Heading */}
        <div className="max-w-[600px] mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-wider uppercase border border-border bg-secondary text-secondary-foreground px-2 py-0.5 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-4 mb-3.5">
            Four disciplines, one build process
          </h2>
          <p className="text-muted-foreground text-[14px] sm:text-[15px] leading-relaxed">
            The same people who design the schema ship the UI and harden the server it runs on.
          </p>
        </div>

        {/* Services Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border bg-card divide-y sm:divide-y-0 lg:divide-x divide-border select-none overflow-hidden">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Server;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 md:p-8 flex flex-col gap-4 hover:bg-accent border-b sm:border-b-0 border-border transition-colors duration-200"
              >
                {/* Icon Container */}
                <div className="w-[36px] h-[36px] border border-border flex items-center justify-center text-primary bg-background">
                  <IconComponent className="w-4 h-4" />
                </div>

                {/* Title & Description */}
                <h3 className="text-[15.5px] font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-[13px] leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
