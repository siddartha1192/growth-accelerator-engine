import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, ChevronDown, Rocket, GitBranch, Brain, Globe, Shield } from 'lucide-react';

const navLinks = ['Solutions', 'Industries', 'Framework', 'Case Studies', 'Insights'];

const solutionItems = [
  { icon: Rocket, title: 'Growth Acceleration Systems', desc: '2–3X lead conversion' },
  { icon: GitBranch, title: 'Business Process Acceleration', desc: 'Scalable operations' },
  { icon: Brain, title: 'AI & Intelligence Systems', desc: 'Data-driven decisions' },
  { icon: Globe, title: 'Digital Identity & Market Presence', desc: 'Convert-ready digital presence' },
  { icon: Shield, title: 'Managed & Professional Services', desc: 'Ongoing performance' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'tk-bg-primary/95 backdrop-blur-xl border-b tk-border-subtle' : 'bg-transparent'
      }`}
      style={scrolled ? { backgroundColor: 'hsl(222 50% 6% / 0.95)', backdropFilter: 'blur(24px)', borderBottom: '1px solid hsl(216 30% 18%)' } : {}}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-display font-bold text-xl">
          <span className="text-foreground">Tek</span>
          <span className="tk-accent-primary">Keys</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link} ref={link === 'Solutions' ? dropdownRef : undefined} className="relative">
              {link === 'Framework' ? (
                <Link to="/framework" className="tk-text-secondary hover:text-foreground transition-colors text-sm font-body">
                  {link}
                </Link>
              ) : (
              <button
                onClick={() => link === 'Solutions' && setSolutionsOpen(!solutionsOpen)}
                className="tk-text-secondary hover:text-foreground transition-colors text-sm font-body flex items-center gap-1"
              >
                {link}
                {link === 'Solutions' && <ChevronDown className="w-3 h-3" />}
              </button>
              )}
              {link === 'Solutions' && solutionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] glass-card p-4 grid grid-cols-1 gap-2"
                >
                  {solutionItems.map((item) => (
                    <a key={item.title} href="#solutions" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors">
                      <item.icon className="w-5 h-5 tk-accent-primary flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-foreground">{item.title}</div>
                        <div className="text-xs tk-text-secondary">{item.desc}</div>
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="#" className="text-sm tk-text-secondary hover:text-foreground transition-colors">Partner Network</a>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <Calendar className="w-4 h-4" />
            Book Strategy Call
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-foreground">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
            style={{ backgroundColor: 'hsl(222 50% 6% / 0.98)' }}
          >
            <div className="px-6 py-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                link === 'Framework' ? (
                  <Link key={link} to="/framework" className="text-lg text-foreground font-display" onClick={() => setMobileOpen(false)}>
                    {link}
                  </Link>
                ) : (
                <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-lg text-foreground font-display" onClick={() => setMobileOpen(false)}>
                  {link}
                </a>
                )
              ))}
              <a href="#cta" className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-primary text-primary-foreground" onClick={() => setMobileOpen(false)}>
                <Calendar className="w-4 h-4" /> Book Strategy Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
