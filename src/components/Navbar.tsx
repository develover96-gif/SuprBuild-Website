import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenVoice: () => void;
  onOpenChat: () => void;
}

export default function Navbar({ onOpenVoice, onOpenChat }: NavbarProps) {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    // Sync dark mode class
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full sticky top-0 z-40 border-b border-border transition-colors duration-200" style={{ backgroundColor: 'color-mix(in oklch, var(--background) 95%, transparent)', backdropFilter: 'blur(10px)' }}>
      <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-4 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <a href="#/" className="flex items-center gap-2.5 font-extrabold text-[15.5px] tracking-tight text-foreground select-none">
          <span className="w-[26px] h-[26px] bg-primary relative flex-none">
            <span className="absolute inset-[7px] bg-primary-foreground" />
          </span>
          SuprBuild
        </a>

        {/* Desktop Links (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-1.5 text-[13.5px] font-medium text-muted-foreground relative">
          <a href="#/services" className="px-3 py-1.5 transition-colors duration-200 hover:text-foreground">Services</a>
          <a href="#/pricing" className="px-3 py-1.5 transition-colors duration-200 hover:text-foreground">Pricing</a>
          <a href="#/infrastructure" className="px-3 py-1.5 transition-colors duration-200 hover:text-foreground">Infrastructure</a>
          <a href="#/about" className="px-3 py-1.5 transition-colors duration-200 hover:text-foreground">About the Company</a>
          <a href="#/contact" className="px-3 py-1.5 transition-colors duration-200 hover:text-foreground">Contact Us</a>
        </nav>

        {/* Right Actions */}
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
            className="hidden sm:inline-flex items-center gap-2 font-medium text-[12.5px] bg-primary text-primary-foreground hover:opacity-90 active:translate-y-[1px] px-4 py-2 border border-transparent transition-all"
          >
            Start a build
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden w-[34px] h-[34px] border border-border bg-background rounded-none flex items-center justify-center text-muted-foreground hover:border-ring hover:text-foreground transition-all duration-200"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Links Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-6 py-4 flex flex-col gap-1.5">
          <a 
            href="#/services" 
            onClick={() => setIsMenuOpen(false)}
            className="px-3 py-2.5 text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-border/40"
          >
            Services
          </a>
          <a 
            href="#/pricing" 
            onClick={() => setIsMenuOpen(false)}
            className="px-3 py-2.5 text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-border/40"
          >
            Pricing
          </a>
          <a 
            href="#/infrastructure" 
            onClick={() => setIsMenuOpen(false)}
            className="px-3 py-2.5 text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-border/40"
          >
            Infrastructure
          </a>
          <a 
            href="#/about" 
            onClick={() => setIsMenuOpen(false)}
            className="px-3 py-2.5 text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-border/40"
          >
            About the Company
          </a>
          <a 
            href="#/contact" 
            onClick={() => setIsMenuOpen(false)}
            className="px-3 py-2.5 text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-border/40"
          >
            Contact Us
          </a>
          
          {/* Mobile-only CTA */}
          <div className="pt-4 flex flex-col gap-2">
            <a
              href="#/contact"
              onClick={() => setIsMenuOpen(false)}
              className="sm:hidden w-full text-center font-medium text-[13px] bg-primary text-primary-foreground hover:opacity-90 py-3 border border-transparent transition-all"
            >
              Start a build
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

