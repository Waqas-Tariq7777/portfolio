import { ArrowUpRight, Code2, Database, Palette, Layout, Globe, BookOpen, PenTool, Monitor, Settings, Smartphone, Bug, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const services = [
  {
    title: "Full Stack Web Development",
    icon: <Code2 className="w-8 h-8 text-[#a855f7]" />,
    desc: "End-to-end web architectures with seamless database integration, robust backend logic, and scalable architectures.",
    color: "#a855f7",
    glow: "shadow-[#a855f7]/20"
  },
  {
    title: "MERN Stack Development",
    icon: <Database className="w-8 h-8 text-[#22d3ee]" />,
    desc: "High-performance applications built using MongoDB, Express, React, and Node.js for smooth full-stack operations.",
    color: "#22d3ee",
    glow: "shadow-[#22d3ee]/20"
  },
  {
    title: "Web Design",
    icon: <Palette className="w-8 h-8 text-[#f97316]" />,
    desc: "Stunning, high-fidelity UI/UX layouts utilizing modern design aesthetics, vibrant palettes, and micro-interactions.",
    color: "#f97316",
    glow: "shadow-[#f97316]/20"
  },
  {
    title: "Landing Page Development",
    icon: <Layout className="w-8 h-8 text-[#10b981]" />,
    desc: "Conversion-optimized single-page layouts built with modern framework speed to wow your visitors and boost sales.",
    color: "#10b981",
    glow: "shadow-[#10b981]/20"
  },
  {
    title: "WordPress Expert",
    icon: <Globe className="w-8 h-8 text-[#3b82f6]" />,
    desc: "Custom WordPress themes, robust plugin setups, and high-performance builder integration for scalable setups.",
    color: "#3b82f6",
    glow: "shadow-[#3b82f6]/20"
  },
  {
    title: "Blog Creation",
    icon: <BookOpen className="w-8 h-8 text-[#ec4899]" />,
    desc: "Fully responsive, optimized blogs built with high-quality SEO setups and intuitive content editing panels.",
    color: "#ec4899",
    glow: "shadow-[#ec4899]/20"
  },
  {
    title: "Logo Design",
    icon: <PenTool className="w-8 h-8 text-[#f43f5e]" />,
    desc: "Unique visual branding and high-definition logo vector designs reflecting your brand identity and principles.",
    color: "#f43f5e",
    glow: "shadow-[#f43f5e]/20"
  },
  {
    title: "E-commerce Store",
    icon: <ShoppingBagIcon className="w-8 h-8 text-[#eab308]" />,
    desc: "Secure online stores with cart setups, payment gateways, invoice management, and fluid product browsing.",
    color: "#eab308",
    glow: "shadow-[#eab308]/20"
  },
  {
    title: "Frontend Development",
    icon: <Monitor className="w-8 h-8 text-[#06b6d4]" />,
    desc: "Highly interactive client-side coding with pixel-perfect designs, responsive breakpoints, and animations.",
    color: "#06b6d4",
    glow: "shadow-[#06b6d4]/20"
  },
  {
    title: "Website Maintenance",
    icon: <Settings className="w-8 h-8 text-[#64748b]" />,
    desc: "Ongoing performance audits, database optimizations, code cleanups, dependency upgrades, and security checks.",
    color: "#64748b",
    glow: "shadow-[#64748b]/20"
  },
  {
    title: "Responsive Design",
    icon: <Smartphone className="w-8 h-8 text-[#84cc16]" />,
    desc: "Fully fluid layouts designed to adapt perfectly to all desktop screens, tablet views, and mobile screen heights.",
    color: "#84cc16",
    glow: "shadow-[#84cc16]/20"
  },
  {
    title: "Bug & Issue Fixes",
    icon: <Bug className="w-8 h-8 text-[#ef4444]" />,
    desc: "Rigid diagnostic checking, cross-browser debugs, styling adjustments, and fast hotfixes for any software issues.",
    color: "#ef4444",
    glow: "shadow-[#ef4444]/20"
  },
  {
    title: "Problem Solving",
    icon: <Zap className="w-8 h-8 text-[#d946ef]" />,
    desc: "Algorithmic thinking, data structures implementation, API integration fixes, and complex logical solutions.",
    color: "#d946ef",
    glow: "shadow-[#d946ef]/20"
  }
]

// Custom fallback for ShoppingBag inside Services data context to maintain zero icon compile crashes
function ShoppingBagIcon(props) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

const Services = () => {
  const subtleFadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.section 
      id="services" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={subtleFadeUp}
      className="relative z-10 w-full pt-20 pb-10 select-none overflow-hidden border-b border-c-border"
    >
      {/* Dynamic Ambient Blur Glows matching image layout exactly */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] sm:w-[550px] sm:h-[550px] bg-[#ab5aed]/25 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none z-1" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[350px] h-[350px] sm:w-[550px] sm:h-[550px] bg-[#22d3ee]/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none z-1" />

      <div className="max-w-7xl mx-auto px-4 md:px-5 lg:px-8 w-full relative z-20">
        
        {/* Section Heading Area */}
        <div className="text-center space-y-4 mb-16">
          <div className="text-xs font-extrabold text-[#ab5aed] uppercase tracking-widest select-none">
            SERVICES
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-c-text">
            What I <span className="bg-gradient-to-r from-[#ab5aed] to-[#22d3ee] bg-clip-text text-transparent">Offer</span>
          </h2>
          <p className="text-c-sec-text max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed">
            High-quality development and design solutions tailored to your needs with precision and excellence.
          </p>
        </div>
      </div>

      {/* Continuous Infinite Marquee Slider Container */}
      <div className="w-full relative overflow-hidden py-6 z-20">
        <div className="flex animate-marquee-services hover:[animation-play-state:paused] gap-6 w-max px-4">
          
          {/* Double array representation to ensure seamless infinite looping */}
          {[...services, ...services].map((srv, idx) => (
            <div
              key={`srv-${idx}`}
              style={{ 
                '--srv-color': srv.color,
                borderColor: `${srv.color}30`
              }}
              className="w-[320px] sm:w-[360px] p-6 sm:p-8 rounded-[24px] border bg-white/[0.03] dark:bg-white/[0.015] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.01),inset_0_1px_1px_rgba(255,255,255,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.02)] flex flex-col justify-between items-start text-left min-h-[340px] transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:bg-white/[0.06] dark:hover:bg-white/[0.03] hover:border-[var(--srv-color)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.05),0_0_25px_rgba(var(--srv-color),0.2)] group select-none"
            >
              <div className="space-y-6">
                {/* Custom glowing icon plate */}
                <div
                  style={{
                    backgroundColor: `${srv.color}15`,
                    borderColor: `${srv.color}40`
                  }}
                  className="w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-[6deg] shadow-[0_0_15px_rgba(var(--srv-color),0.1)]"
                >
                  <div className="transform transition-transform duration-500 group-hover:scale-105">
                    {srv.icon}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-black text-c-text group-hover:text-[var(--srv-color)] transition-colors duration-300">
                    {srv.title}
                  </h3>
                  <p className="text-c-sec-text text-sm sm:text-base leading-relaxed font-semibold">
                    {srv.desc}
                  </p>
                </div>
              </div>

              {/* Learn More Interactive button */}
              <div className="pt-6 w-full">
                <Link
                  to="/services"
                  style={{
                    borderColor: `${srv.color}60`,
                    color: srv.color,
                    '--hover-bg': `${srv.color}20`
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs bg-transparent border hover:bg-[var(--hover-bg)] hover:text-white hover:border-[var(--srv-color)] hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm group/btn cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-80 transform transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:opacity-100" />
                </Link>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Center aligned "View all services" button */}
      <div className="flex justify-center mt-6 z-20 relative">
        <Link to="/services" className="flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-c-primary to-c-accent hover:from-c-primary hover:to-c-accent-2 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)] shadow-[0_4px_15px_rgba(168,85,247,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer">
          <span>View all services</span>
          <ArrowUpRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.section>
  )
}

export default Services
