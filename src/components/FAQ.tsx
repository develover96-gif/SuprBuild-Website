import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { faqData } from '../data';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-24 border-b border-border bg-background transition-colors duration-200" id="faq">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        
        {/* Section Heading */}
        <div className="max-w-[600px] mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-wider uppercase border border-border bg-secondary text-secondary-foreground px-2 py-0.5 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            faq
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-4 mb-3.5">
            Questions people actually ask
          </h2>
          <p className="text-muted-foreground text-[14px] sm:text-[15px] leading-relaxed">
            Can't find it here? Speak with our live AI front door agent in the corner anytime.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-[760px] mx-auto border border-border select-none divide-y divide-border overflow-hidden bg-card">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="border-border">
                {/* Accordion Question button */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between gap-6 px-6 py-5 bg-card hover:bg-accent text-left text-[14.5px] font-bold text-foreground transition-all duration-200"
                >
                  <span>{faq.question}</span>
                  {/* Plus/Minus Sign animation */}
                  <span className="relative flex-none w-4 h-4 text-primary flex items-center justify-center">
                    <span className="absolute w-3.5 h-[1.8px] bg-current transition-transform duration-200" />
                    <span className={`absolute h-3.5 w-[1.8px] bg-current transition-transform duration-200 ${isOpen ? 'rotate-90 scale-0' : ''}`} />
                  </span>
                </button>

                {/* Accordion Answer content with framer-motion smooth height transition */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-5 text-[13.5px] leading-relaxed text-muted-foreground max-w-[640px]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
