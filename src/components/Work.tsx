import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { workData } from '../data';

export default function Work() {
  return (
    <section className="py-20 md:py-24 border-b border-border bg-background transition-colors duration-200" id="work">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        {/* Section Heading */}
        <div className="max-w-[600px] mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-wider uppercase border border-border bg-secondary text-secondary-foreground px-2 py-0.5 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            selected builds
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-4 mb-3.5">
            Shipped, not slideware
          </h2>
          <p className="text-muted-foreground text-[14px] sm:text-[15px] leading-relaxed">
            A sample of products designed, built, and deployed end-to-end.
          </p>
        </div>

        {/* Selected Builds Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-border bg-card divide-y lg:divide-y-0 lg:divide-x divide-border select-none overflow-hidden">
          {workData.map((project, index) => {
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-7 md:p-8 flex flex-col justify-between gap-6 hover:bg-accent border-b lg:border-b-0 border-border transition-colors duration-200"
              >
                <div>
                  {/* Status Kicker */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-semibold text-primary uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {project.status}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-40 hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-[18px] font-bold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-[13.5px] leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-block font-mono text-[10px] md:text-[11px] font-medium border border-border bg-secondary text-secondary-foreground px-2 py-0.5 select-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
