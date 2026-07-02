import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, HelpCircle, Building } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    budget: '$15K - $45K'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Submit placeholder log
    console.log('Contact form submitted:', formData);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="flex-1 bg-background text-foreground transition-colors duration-200">
      {/* Page Header */}
      <section className="pt-24 pb-16 md:py-28 border-b border-border bg-card">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8">
          <div className="max-w-[800px]">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-wider uppercase border border-border bg-secondary text-secondary-foreground px-2 py-0.5 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              get in touch
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mt-4 mb-6 leading-[1.05]">
              Let's map out your<br />next software release.
            </h1>
            <p className="text-muted-foreground text-[15px] sm:text-[17px] leading-relaxed max-w-[640px]">
              Provide us with a summary of your objectives and we will compile a detailed, technical scoping brief with a fixed-fee quotation within 24-48 business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form and Corporate Details */}
      <section className="py-20 md:py-24 border-b border-border">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-7 bg-card border border-border p-6 md:p-8">
              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 border border-primary/20 text-primary flex items-center justify-center rounded-full">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h2 className="text-[20px] font-extrabold text-foreground">Scoping Request Received</h2>
                  <p className="text-muted-foreground text-sm max-w-[360px] leading-relaxed">
                    Thank you. An engineering partner will review your system criteria and reach out directly to coordinate a scoping session.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="font-mono text-xs font-bold text-primary hover:underline mt-4"
                  >
                    Submit another response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <h2 className="text-[18px] font-extrabold text-foreground mb-2">Initialize Scope Enquiry</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="font-mono text-[11px] font-bold uppercase text-muted-foreground">Full Name</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Connor"
                        className="p-3 border border-border bg-background text-foreground text-xs rounded-none focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="font-mono text-[11px] font-bold uppercase text-muted-foreground">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. sarah@cyberdyne.io"
                        className="p-3 border border-border bg-background text-foreground text-xs rounded-none focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="company" className="font-mono text-[11px] font-bold uppercase text-muted-foreground">Company Name</label>
                      <input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Cyberdyne Systems"
                        className="p-3 border border-border bg-background text-foreground text-xs rounded-none focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="budget" className="font-mono text-[11px] font-bold uppercase text-muted-foreground">Estimated Project Budget</label>
                      <select
                        id="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="p-3 border border-border bg-background text-foreground text-xs rounded-none focus:outline-none focus:border-primary"
                      >
                        <option value="$15K - $45K">$15K - $45K (Launch MVP)</option>
                        <option value="$45K - $100K">$45K - $100K (Production Eng)</option>
                        <option value="$100K+">$100K+ (Enterprise Platform)</option>
                        <option value="Retainer">Monthly Retainer (Embedded Team)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="font-mono text-[11px] font-bold uppercase text-muted-foreground">Functional Specifications Summary</label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please summarize your core requirements, integrations, and compliance needs."
                      className="p-3 border border-border bg-background text-foreground text-xs rounded-none focus:outline-none focus:border-primary resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto self-start inline-flex items-center justify-center gap-2 font-bold text-xs bg-primary text-primary-foreground hover:opacity-90 active:translate-y-[1px] px-6 py-4.5 border border-transparent transition-all select-none mt-2"
                  >
                    Submit Scope Criteria
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Address and direct contact details */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* HQ details Card */}
              <div className="border border-border p-6 bg-card flex flex-col gap-5 select-none">
                <h3 className="font-mono text-[11.5px] text-primary uppercase font-bold flex items-center gap-1.5">
                  <Building className="w-4 h-4" />
                  Registered Corporate Headquarters
                </h3>
                
                <div>
                  <div className="text-[14.5px] font-extrabold text-foreground mb-1">SuprBuild LLC</div>
                  <address className="not-italic text-muted-foreground text-[13px] leading-relaxed">
                    30 N Gould St Ste N<br />
                    Sheridan, WY 82801, USA
                  </address>
                </div>

                <hr className="border-t border-border" />

                <div className="flex flex-col gap-3.5">
                  <a
                    href="mailto:contact@suprbuild.com"
                    className="flex gap-3 items-center text-[13px] text-foreground hover:text-primary transition-colors font-medium group"
                  >
                    <div className="w-[30px] h-[30px] border border-border bg-background flex items-center justify-center rounded-none group-hover:border-primary transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    contact@suprbuild.com
                  </a>

                  <a
                    href="tel:+13072038232"
                    className="flex gap-3 items-center text-[13px] text-foreground hover:text-primary transition-colors font-medium group"
                  >
                    <div className="w-[30px] h-[30px] border border-border bg-background flex items-center justify-center rounded-none group-hover:border-primary transition-colors">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    +1 (307) 203-8232
                  </a>
                </div>
              </div>

              {/* Scoping call info */}
              <div className="border border-border p-6 bg-secondary flex flex-col gap-3.5 select-none">
                <h4 className="font-bold text-[14px] text-foreground">Immediate scoping call?</h4>
                <p className="text-muted-foreground text-[12.5px] leading-relaxed">
                  Our interactive conversational assistants are available 24/7. Click the chat launcher in the bottom corner or open the voice assistant to map your project requirements instantly.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
