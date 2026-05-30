import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, ChevronRight, ArrowUp } from 'lucide-react'
import logo from '../assets/images/logo.svg'

const Footer = () => {
  const quickLinks = [
    { name: 'My Works', href: '/portfolio' },
    { name: 'About Me', href: '/about' },
    { name: 'Blogs & Articles', href: '/blogs' },
    { name: 'Clients Reviews', href: '/reviews' },
    { name: 'Frequently Asked Questions', href: '/faq' },
  ]

  const services = [
    { name: 'Website Design', href: '/services' },
    { name: 'Website Development', href: '/services' },
    { name: 'Bug Fixing & Responsiveness', href: '/services' },
    { name: 'Website Maintenance & Security', href: '/services' },
    { name: 'Speed Optimization & SEO', href: '/services' },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative w-full border-t border-slate-200 dark:border-white/5 bg-[#FAF9F6]/80 dark:bg-[#07070F]/90 backdrop-blur-xl transition-all duration-500 overflow-hidden select-none ">
      {/* Visual Ambient Cyber glows in footer */}
      <div className="absolute top-0 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-c-primary/5 rounded-full blur-[120px] pointer-events-none z-1" />
      <div className="absolute bottom-0 left-1/4 translate-y-1/2 w-[350px] h-[350px] bg-c-accent/5 rounded-full blur-[120px] pointer-events-none z-1" />

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          
          {/* Brand Panel Column */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="flex items-center group cursor-pointer select-none">
              <div className="relative overflow-hidden transition-all duration-300 group-hover:scale-105">
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="h-10 w-10 object-contain transition-transform duration-500 group-hover:rotate-[15deg]"
                />
              </div>
              <span className="text-xl font-black tracking-wider text-slate-900 dark:text-c-text bg-gradient-to-r from-c-primary via-c-accent to-c-accent-2 bg-clip-text text-transparent ml-2">
                PORTFOLIO
              </span>
            </div>
            
            <p className="text-sm sm:text-base text-slate-600 dark:text-c-sec-text font-medium leading-relaxed max-w-sm">
              I am a Senior Web Architect and Fullstack Developer, specializing in creating high-speed React web layouts, highly secure database structures, and premium custom digital experiences built to scale.
            </p>

            {/* Social Panels with cyber-glowing hover triggers */}
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com/Waqas-Tariq7777" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 flex items-center justify-center text-slate-700 dark:text-c-sec-text hover:text-c-primary hover:border-c-primary/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300 hover:scale-110"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/waqas-tariq-9a0a2b332?utm_source=share_via&utm_content=profile&utm_medium=member_ios" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 flex items-center justify-center text-slate-700 dark:text-c-sec-text hover:text-c-primary hover:border-c-primary/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300 hover:scale-110"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/waqas_tariq77?igsh=MWoyNTZmc203NjhyYQ%3D%3D&utm_source=qr" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 flex items-center justify-center text-slate-700 dark:text-c-sec-text hover:text-c-accent-2 hover:border-c-accent-2/30 hover:shadow-[0_0_15px_rgba(244,63,94,0.2)] transition-all duration-300 hover:scale-110"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>

            {/* Get in Touch CTA Button */}
            <div className="pt-2">
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-c-primary to-c-accent hover:from-c-primary hover:to-c-accent-2 shadow-md hover:shadow-purple-500/20 active:scale-98 transition-all duration-300"
              >
                <span>Get in Touch</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-5 text-left">
            <h3 className="text-base font-bold text-slate-900 dark:text-c-text tracking-wider uppercase relative whitespace-nowrap">
              Quick Links
              <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-c-primary rounded-full translate-y-2" />
            </h3>
            <ul className="space-y-3 pt-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="group inline-flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-c-sec-text hover:text-c-primary transition-all duration-300 hover:translate-x-1.5 whitespace-nowrap"
                  >
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-c-primary" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-5 text-left">
            <h3 className="text-base font-bold text-slate-900 dark:text-c-text tracking-wider uppercase relative whitespace-nowrap">
              Services
              <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-c-accent rounded-full translate-y-2" />
            </h3>
            <ul className="space-y-3 pt-2">
              {services.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="group inline-flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-c-sec-text hover:text-c-accent transition-all duration-300 hover:translate-x-1.5 whitespace-nowrap"
                  >
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-c-accent" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-3 space-y-5 text-left">
            <h3 className="text-base font-bold text-slate-900 dark:text-c-text tracking-wider uppercase relative">
              Get in Touch
              <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-c-accent-2 rounded-full translate-y-2" />
            </h3>
            <ul className="space-y-4 pt-2">
              <li className="flex items-start gap-3 text-sm font-semibold text-slate-600 dark:text-c-sec-text group">
                <div className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 flex items-center justify-center text-c-primary flex-shrink-0 group-hover:border-c-primary/30 group-hover:scale-105 transition-all duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:waqastariq9101@gmail.com" className="hover:text-c-primary transition-colors duration-300 break-all self-center">
                  waqastariq9101@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm font-semibold text-slate-600 dark:text-c-sec-text group">
                <div className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 flex items-center justify-center text-c-accent flex-shrink-0 group-hover:border-c-accent/30 group-hover:scale-105 transition-all duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <a href="tel:+923025649101" className="hover:text-c-accent transition-colors duration-300 self-center">
                  +92 302 5649101
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm font-semibold text-slate-600 dark:text-c-sec-text group">
                <div className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 flex items-center justify-center text-c-accent-2 flex-shrink-0 group-hover:border-c-accent-2/30 group-hover:scale-105 transition-all duration-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="leading-relaxed self-center">
                  Gousia Street Mian Muhammad Town Mirpur AJK
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line and back-to-top action */}
        <div className="border-t border-slate-200/60 dark:border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-c-sec-text text-center sm:text-left">
            Copyright © {new Date().getFullYear()} <span className="text-slate-900 dark:text-c-text font-bold">Waqas Tariq</span>. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-slate-400 dark:text-c-sec-text uppercase tracking-wider hidden md:inline">
              Built with High Speed Performance
            </span>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 hover:bg-c-primary/10 hover:border-c-primary/30 flex items-center justify-center text-slate-700 dark:text-c-text hover:text-c-primary transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
