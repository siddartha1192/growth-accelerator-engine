import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Calendar, ChevronDown, Rocket, GitBranch, Brain, Globe, Shield } from 'lucide-react';

const navLinks = ['Framework', 'Case Studies', 'Insights'];

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
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300"
      style={{
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : '0 1px 0 rgba(0,0,0,0.05)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-12 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.jpeg" alt="TekKeys" className="h-7 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-all duration-150"
          >
            Home
          </Link>
          {navLinks.map((link) => (
            <div key={link} ref={link === 'Solutions' ? dropdownRef : undefined} className="relative">
              {link === 'Framework' || link === 'Case Studies' || link === 'Insights' ? (
                <Link
                  to={link === 'Framework' ? '/framework' : link === 'Case Studies' ? '/case-studies' : '#insights'}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-all duration-150"
                >
                  {link}
                </Link>
              ) : (
                <button
                  onClick={() => link === 'Solutions' && setSolutionsOpen(!solutionsOpen)}
                  className="text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-all duration-150 flex items-center gap-1"
                >
                  {link}
                  {link === 'Solutions' && (
                    <ChevronDown
                      className="w-3.5 h-3.5 transition-transform duration-200"
                      style={{ transform: solutionsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  )}
                </button>
              )}

              {link === 'Solutions' && solutionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[460px] p-2 grid grid-cols-1 gap-0.5 rounded-2xl bg-white"
                  style={{ border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}
                >
                  {solutionItems.map((item) => (
                    <a
                      key={item.title}
                      href="#solutions"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-150 group"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, hsl(230 95% 65% / 0.12), hsl(185 100% 55% / 0.12))',
                          border: '1px solid hsl(230 95% 65% / 0.2)',
                        }}
                      >
                        <item.icon className="w-4 h-4" style={{ color: 'hsl(230 95% 55%)' }} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-150">{item.title}</div>
                        <div className="text-xs mt-0.5 text-gray-500">{item.desc}</div>
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="hidden lg:flex items-center gap-2">
          <a
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-all duration-150"
          >
            Partner Network
          </a>
          <a
            href="/ai-growth-engine"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold text-white hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
            style={{
              background: 'linear-gradient(135deg, hsl(230 95% 58%), hsl(220 100% 50%))',
              boxShadow: '0 2px 14px hsl(230 95% 60% / 0.35)',
            }}
          >
            <Calendar className="w-4 h-4" />
            Book Strategy Call
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-150"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-white"
            style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
          >
            <div className="px-4 py-4 flex flex-col gap-0.5">
              <Link
                to="/"
                className="text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2.5 rounded-xl transition-all duration-150"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              {navLinks.map((link) => (
                link === 'Framework' || link === 'Case Studies' || link === 'Insights' ? (
                  <Link
                    key={link}
                    to={link === 'Framework' ? '/framework' : link === 'Case Studies' ? '/case-studies' : '#insights'}
                    className="text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2.5 rounded-xl transition-all duration-150"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link}
                  </Link>
                ) : (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2.5 rounded-xl transition-all duration-150"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link}
                  </a>
                )
              ))}
              <div className="pt-3 mt-2 border-t border-gray-100">
                <a
                  href="/ai-growth-engine"
                  className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity duration-150"
                  style={{
                    background: 'linear-gradient(135deg, hsl(230 95% 58%), hsl(220 100% 50%))',
                    boxShadow: '0 2px 14px hsl(230 95% 60% / 0.3)',
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  <Calendar className="w-4 h-4" /> Book Strategy Call
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
