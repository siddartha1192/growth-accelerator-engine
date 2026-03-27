import { Linkedin, Twitter, Youtube, Mail, Phone, Calendar } from 'lucide-react';

const solutions = ['Growth Acceleration', 'Business Process', 'AI Systems', 'Digital Identity', 'Managed Services'];
const company = ['About TekKeys', 'Framework', 'Case Studies', 'Insights', 'Partner Network', 'Careers'];

export default function Footer() {
  return (
    <footer className="tk-bg-secondary border-t tk-border-subtle" style={{ borderColor: 'hsl(216 30% 18%)' }}>
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <a href="#" className="font-display font-bold text-xl inline-block mb-4">
              <span className="text-foreground">Tek</span><span className="tk-accent-primary">Keys</span>
            </a>
            <p className="text-sm tk-text-secondary leading-relaxed mb-6">
              AI-powered growth systems for ambitious Indian businesses. We design, build, and scale the systems that make revenue predictable.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-muted flex items-center justify-center tk-text-secondary hover:text-foreground hover:border-foreground/30 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-xs tk-text-muted uppercase tracking-widest mb-4">Solutions</h4>
            <div className="flex flex-col gap-2.5">
              {solutions.map((s) => (
                <a key={s} href="#solutions" className="text-sm tk-text-secondary hover:text-foreground transition-colors">{s}</a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs tk-text-muted uppercase tracking-widest mb-4">Company</h4>
            <div className="flex flex-col gap-2.5">
              {company.map((c) => (
                <a key={c} href="#" className="text-sm tk-text-secondary hover:text-foreground transition-colors">{c}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tk-text-muted uppercase tracking-widest mb-4">Get In Touch</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@tekkeys.in" className="flex items-center gap-2 text-sm tk-text-secondary hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" /> hello@tekkeys.in
              </a>
              <a href="tel:+91" className="flex items-center gap-2 text-sm tk-text-secondary hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" /> +91 XXXXX XXXXX
              </a>
              <a href="#cta" className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-primary text-primary-foreground w-fit hover:scale-[1.02] active:scale-[0.98] transition-transform">
                <Calendar className="w-3 h-3" /> Book Strategy Call
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t tk-border-subtle flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'hsl(216 30% 18%)' }}>
          <p className="text-xs tk-text-muted">© 2025 TekKeys. All rights reserved.</p>
          <div className="flex gap-4 text-xs tk-text-muted">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <span>·</span>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
