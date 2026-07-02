import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onOpenVoice: () => void;
  onOpenChat: () => void;
}

export default function Navbar({ onOpenVoice, onOpenChat }: NavbarProps) {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    // Sync dark mode class
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <header className="w-full sticky top-0 z-40 border-b border-border transition-colors duration-200" style={{ backgroundColor: 'color-mix(in oklch, var(--background) 95%, transparent)', backdropFilter: 'blur(10px)' }}>
      <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
        
        {/* Logo */}
        <a href="#/" className="flex items-center gap-2.5 font-extrabold text-[15.5px] tracking-tight text-foreground select-none">
          <span className="w-[26px] h-[26px] bg-primary relative flex-none">
            <span className="absolute inset-[7px] bg-primary-foreground" />
          </span>
          SuprBuild
        </a>

        {/* Links (Always Visible, clean responsive wrap) */}
        <nav className="flex items-center gap-1 md:gap-1.5 text-[13px] md:text-[13.5px] font-medium text-muted-foreground relative flex-wrap justify-center">
          <a href="#/services" className="px-2 md:px-3 py-1.5 transition-colors duration-200 hover:text-foreground">Services</a>
          <a href="#/pricing" className="px-2 md:px-3 py-1.5 transition-colors duration-200 hover:text-foreground">Pricing</a>
          <a href="#/infrastructure" className="px-2 md:px-3 py-1.5 transition-colors duration-200 hover:text-foreground">Infrastructure</a>
          <a href="#/about" className="px-2 md:px-3 py-1.5 transition-colors duration-200 hover:text-foreground">About the Company</a>
          <a href="#/contact" className="px-2 md:px-3 py-1.5 transition-colors duration-200 hover:text-foreground">Contact Us</a>
        </nav>

        {/* Right Actions (Always Visible) */}
        <div className="flex items-center gap-2.5 flex-none">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-[34px] h-[34px] border border-border bg-background rounded-none flex items-center justify-center text-muted-foreground hover:border-ring hover:text-foreground transition-all duration-200"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Start a build CTA button */}
          <a
            href="#/contact"
            className="inline-flex items-center gap-2 font-medium text-[12.5px] bg-primary text-primary-foreground hover:opacity-90 active:translate-y-[1px] px-4 py-2 border border-transparent transition-all"
          >
            Start a build
          </a>
        </div>
      </div>
    </header>
  );
}

