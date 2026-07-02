export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-16 transition-colors duration-200">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-border/60">
          {/* Column 1: SuprBuild Brand */}
          <div className="flex flex-col gap-4 md:col-span-5">
            <a href="#top" className="flex items-center gap-2.5 font-extrabold text-[15.5px] tracking-tight text-foreground select-none">
              <span className="w-[26px] h-[26px] bg-primary relative flex-none">
                <span className="absolute inset-[7px] bg-primary-foreground" />
              </span>
              SuprBuild
            </a>
            <p className="text-muted-foreground text-[13px] leading-relaxed max-w-[340px]">
              AI-native custom software, robust backends, and dedicated high-performance cloud infrastructure.
            </p>
          </div>

          {/* Column 2: Services / Products Nav */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <p className="font-mono text-[10px] text-primary uppercase font-bold tracking-wider">Services</p>
            <ul className="flex flex-col gap-2.5 text-[13px] text-muted-foreground">
              <li>
                <a href="#/services" className="hover:text-foreground transition-colors">Autonomous AI Agents</a>
              </li>
              <li>
                <a href="#/services" className="hover:text-foreground transition-colors">Admin Dashboards</a>
              </li>
              <li>
                <a href="#/infrastructure" className="hover:text-foreground transition-colors">Cloud Clustering</a>
              </li>
              <li>
                <a href="#/infrastructure" className="hover:text-foreground transition-colors">CI/CD Orchestration</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <p className="font-mono text-[10px] text-primary uppercase font-bold tracking-wider">Company</p>
            <ul className="flex flex-col gap-2.5 text-[13px] text-muted-foreground">
              <li>
                <a href="#/about" className="hover:text-foreground transition-colors">About Us</a>
              </li>
              <li>
                <a href="#/about" className="hover:text-foreground transition-colors">Our Team</a>
              </li>
              <li>
                <a href="#/contact" className="hover:text-foreground transition-colors">Contact Us</a>
              </li>
              <li>
                <a href="#/about" className="hover:text-foreground transition-colors">Join our team</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Corporate HQ */}
          <div className="flex flex-col gap-4 md:col-span-3">
            <p className="font-mono text-[10px] text-primary uppercase font-bold tracking-wider">Corporate HQ</p>
            <div className="flex flex-col gap-2 text-[13px] text-muted-foreground leading-relaxed">
              <p className="font-semibold text-foreground">SuprBuild LLC</p>
              <p>
                30 N Gould St Ste N<br />
                Sheridan, WY 82801, USA
              </p>
              <div className="flex flex-col gap-1 mt-2 font-medium">
                <a href="mailto:contact@suprbuild.com" className="hover:text-primary transition-colors">contact@suprbuild.com</a>
                <a href="tel:+13072038232" className="hover:text-primary transition-colors">+1 (307) 203-8232</a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
          <p className="font-mono text-[11px] text-muted-foreground text-center sm:text-left">
            © {currentYear} SuprBuild LLC. AI-native software & infrastructure.
          </p>

          <p className="font-mono text-[11px] text-muted-foreground text-center sm:text-right">
            Questions? Dynamic scoping assistant is bottom-right.
          </p>
        </div>
      </div>
    </footer>
  );
}

