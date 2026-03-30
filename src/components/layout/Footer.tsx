import { Linkedin, Twitter, Youtube, Mail, Phone, Calendar } from 'lucide-react';

const solutions = ['Growth Acceleration', 'Business Process', 'AI Systems', 'Digital Identity', 'Managed Services'];
const company = ['About TekKeys', 'Framework', 'Case Studies', 'Insights', 'Partner Network', 'Careers'];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#f9fafb', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
      <div className="max-w-[1280px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <a href="#" className="inline-block mb-4">
              <img src="/logo.jpeg" alt="TekKeys" className="h-8 w-auto object-contain" />
            </a>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              AI-powered growth systems for ambitious Indian businesses. We design, build, and scale the systems that make revenue predictable.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors duration-150"
                  style={{ border: '1px solid rgba(0,0,0,0.1)', background: '#fff' }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-4">Solutions</h4>
            <div className="flex flex-col gap-2.5">
              {solutions.map((s) => (
                <a key={s} href="#solutions" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-150">{s}</a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-4">Company</h4>
            <div className="flex flex-col gap-2.5">
              {company.map((c) => (
                <a key={c} href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-150">{c}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-4">Get In Touch</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@tekkeys.in" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-150">
                <Mail className="w-4 h-4 text-gray-400" /> hello@tekkeys.in
              </a>
              <a href="tel:+91" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-150">
                <Phone className="w-4 h-4 text-gray-400" /> +91 XXXXX XXXXX
              </a>
              <a
                href="/ai-growth-engine"
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white w-fit hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
                style={{
                  background: 'linear-gradient(135deg, hsl(230 95% 58%), hsl(220 100% 50%))',
                  boxShadow: '0 2px 10px hsl(230 95% 60% / 0.3)',
                }}
              >
                <Calendar className="w-3 h-3" /> Book Strategy Call
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
        >
          <p className="text-xs text-gray-400">© 2025 TekKeys. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-700 transition-colors duration-150">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-gray-700 transition-colors duration-150">Terms of Service</a>
            <span>·</span>
            <a href="#" className="hover:text-gray-700 transition-colors duration-150">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
