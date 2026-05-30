import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useServicesStore } from '../Store/servicesStore'
import servicesBg from '../assets/images/services_bg.png'
import { Laptop, Cpu, CheckCircle2, Loader2, ArrowDown, Check } from 'lucide-react'

const pricingCategories = [
  {
    id: "development",
    name: "Web Development",
    color: "#a855f7",
    glow: "shadow-[#a855f7]/25",
    plans: [
      {
        name: "Basic Development",
        price: "$119",
        period: "/project",
        desc: "Development for simple websites",
        features: [
          "Single page website (HTML/CSS/JS)",
          "Fully mobile responsive development",
          "Basic contact form with email functionality",
          "SEO friendly structure (Semantic HTML)",
          "Basic animations (CSS transitions)",
          "Social media integration",
          "Basic security setup (HTTPS, form validation)",
          "Cross browser compatibility testing",
          "10 days bug fixing support",
          "Delivery in 1 day"
        ],
        popular: false
      },
      {
        name: "Standard Development",
        price: "$250",
        period: "/project",
        desc: "Advanced development for services websites",
        features: [
          "Everything in Basic Development",
          "Up to 6 pages with dynamic content",
          "Interactive elements (Sliders, tabs, accordions)",
          "API integrations (Google Maps, social media)",
          "Advanced animations (GSAP/Scroll-triggered)",
          "User authentication system",
          "Database integration (For forms/data)",
          "Advanced security measures (Firewall setup)",
          "Performance optimization (Lazy loading, etc.)",
          "18 days support",
          "Delivery in 1-2 weeks"
        ],
        popular: true
      },
      {
        name: "Premium Development",
        price: "$500",
        period: "/project",
        desc: "Complex web applications and large sites",
        features: [
          "Everything in Standard Development",
          "Unlimited pages with complex functionality",
          "E-commerce functionality (Shopping cart, checkout)",
          "User accounts system with profiles",
          "Custom database architecture",
          "Premium plugins/licenses included",
          "Multi language support",
          "Advanced search functionality"
        ],
        popular: false
      }
    ]
  },
  {
    id: "design",
    name: "Web Design",
    color: "#f97316",
    glow: "shadow-[#f97316]/25",
    plans: [
      {
        name: "Basic Design",
        price: "$119",
        period: "/project",
        desc: "Professional design for small websites",
        features: [
          "Custom UI/UX design for 1 page",
          "1 design concepts to choose from",
          "2 rounds of revisions included",
          "Brand color scheme integration (Based on your logo)",
          "Typography selection (2 font families)",
          "Basic style guide documentation",
          "Stock image recommendations (3 images)",
          "Social media icon integration",
          "Basic form design (Contact form)",
          "Delivery in 3 days",
          "10 days post delivery support"
        ],
        popular: false
      },
      {
        name: "Standard Design",
        price: "$249",
        period: "/project",
        desc: "Complete design solution for business websites",
        features: [
          "Everything in Basic Design",
          "Custom UI/UX design for 5 pages",
          "1 design concepts to choose from",
          "4 rounds of revisions included",
          "Detailed style guide (Colors, fonts, components)",
          "Custom icon set (Up to 15 icons)",
          "Animation concepts (Hover effects, transitions)",
          "Premium stock images (10 licensed images)",
          "Gallery/portfolio layout options",
          "Delivery in 4 days",
          "18 days post delivery support"
        ],
        popular: true
      },
      {
        name: "Premium Design",
        price: "$389",
        period: "/project",
        desc: "Enterprise grade design with advanced features",
        features: [
          "Everything in Standard Design",
          "Custom UI/UX design for 10+ pages (Full business site)",
          "Micro interactions (Button clicks, loading animations)",
          "Unlimited design concepts",
          "Unlimited revisions (Within project timeline)",
          "Complete design system (For developer handoff)",
          "Custom illustrations (Up to 5 illustrations)",
          "Motion graphics (Animated banners)",
          "Premium stock images",
          "eCommerce product page templates",
          "Accessibility compliance review",
          "Premium support (1 month post delivery)",
          "Delivery in 8-12 days",
          "Priority design revisions"
        ],
        popular: false
      }
    ]
  },
  {
    id: "fixes",
    name: "Bug Fixing",
    color: "#ef4444",
    glow: "shadow-[#ef4444]/25",
    plans: [
      {
        name: "Basic Fixes",
        price: "$59",
        period: "/project",
        desc: "Essential bug fixes and adjustments",
        features: [
          "Single bug fixes (JavaScript, CSS, HTML)",
          "Cross browser compatibility testing",
          "Mobile responsiveness fixes (2 device sizes)",
          "Basic performance tweaks",
          "Form validation fixes",
          "Broken link repair",
          "3 days turnaround time",
          "Detailed report of changes made"
        ],
        popular: false
      },
      {
        name: "Standard Fixes",
        price: "$139",
        period: "/project",
        desc: "Comprehensive debugging package",
        features: [
          "Everything in Basic Fixes",
          "Up to 10 bug fixes of varying complexity",
          "Advanced responsiveness (All device sizes)",
          "Performance optimization (LCP, FID, CLS)",
          "Security patches (XSS, CSRF protection)",
          "Database error resolution",
          "Plugin/script conflict resolution",
          "3 days turnaround for critical issues",
          "Performance audit report",
          "Implementation guide"
        ],
        popular: true
      },
      {
        name: "Premium Fixes",
        price: "$229",
        period: "/project",
        desc: "Complete website overhaul",
        features: [
          "Everything in Standard Fixes",
          "Unlimited bug fixes during project timeline",
          "Complete responsive redesign if needed",
          "Core Web Vitals optimization (90+ scores)",
          "Emergency fixes (24hr response time)",
          "Complete security audit and hardening",
          "Database optimization",
          "Custom code refactoring",
          "Priority support queue",
          "Post optimization monitoring"
        ],
        popular: false
      }
    ]
  },
  {
    id: "maintenance",
    name: "Maintenance",
    color: "#10b981",
    glow: "shadow-[#10b981]/25",
    plans: [
      {
        name: "Basic Care",
        price: "$89",
        period: "/month",
        desc: "Essential website maintenance",
        features: [
          "Weekly automated backups (Cloud storage)",
          "Security monitoring (Malware scans)",
          "Software updates (Core, plugins, themes)",
          "Uptime monitoring (8am-8pm)",
          "Monthly performance reports",
          "Email support (48hr response)",
          "Basic security hardening",
          "Database optimization",
          "Broken link checking",
          "Form functionality testing",
          "Content updates (12 hours/month)",
          "Google Analytics review"
        ],
        popular: false
      },
      {
        name: "Standard Care",
        price: "$169",
        period: "/month",
        desc: "Complete maintenance package",
        features: [
          "Everything in Basic Care",
          "Daily automated backups (Multiple restore points)",
          "24/7 uptime monitoring",
          "Weekly software updates (Core, plugins, themes)",
          "Malware scanning & removal",
          "Performance optimization (Monthly tune-up)",
          "22 hours content updates/month",
          "Phone & email support (24hr response)",
          "Advanced security measures",
          "SEO maintenance (Broken SEO fixes)",
          "Plugin audit and cleanup",
          "Spam protection"
        ],
        popular: true
      },
      {
        name: "Premium Care",
        price: "$299",
        period: "/month",
        desc: "Enterprise grade maintenance",
        features: [
          "Everything in Standard Care",
          "Real time backups (Every change saved)",
          "Advanced security hardening (WAF setup)",
          "Unlimited content updated",
          "Weekly performance reports",
          "Emergency support (1hr response time)",
          "SEO maintenance (Ranking tracking)",
          "Conversion rate optimization",
          "Analytics reporting (Custom dashboards)",
          "Quarterly security audits",
          "White glove onboarding"
        ],
        popular: false
      }
    ]
  },
  {
    id: "optimization",
    name: "SEO & Speed",
    color: "#d946ef",
    glow: "shadow-[#d946ef]/25",
    plans: [
      {
        name: "Basic Optimization",
        price: "$149",
        period: "/project",
        desc: "Essential speed and SEO improvements",
        features: [
          "Comprehensive SEO audit report (50+ factors)",
          "Basic on page SEO optimization",
          "Meta tags optimization (Title, description)",
          "Image optimization (Compression, alt tags)",
          "Caching setup (Browser/server caching)",
          "Minification (CSS, JS, HTML)",
          "XML sitemap generation",
          "Robots.txt optimization",
          "Basic schema markup implementation",
          "1 month monitoring",
          "Basic keyword research",
          "Google Search Console setup"
        ],
        popular: false
      },
      {
        name: "Standard Optimization",
        price: "$289",
        period: "/project",
        desc: "Comprehensive performance package",
        features: [
          "Everything in Basic Optimization",
          "Advanced technical SEO fixes",
          "Content optimization (10 pages)",
          "Core Web Vitals optimization (LCP, FID, CLS)",
          "Advanced schema markup implementation",
          "Internal linking strategy",
          "2 months monitoring",
          "Monthly progress reports",
          "Competitor analysis (3 competitors)",
          "Local SEO optimization",
          "Page speed optimization (90+ scores)",
          "Conversion rate recommendations"
        ],
        popular: true
      },
      {
        name: "Premium Optimization",
        price: "$499",
        period: "/project",
        desc: "Complete SEO and performance overhaul",
        features: [
          "Everything in Standard Optimization",
          "Competitor analysis (5 competitors)",
          "Backlink strategy and acquisition",
          "Conversion rate optimization implementation",
          "Complete website optimization",
          "Local SEO setup",
          "3 months monitoring",
          "Bi weekly progress reports",
          "Advanced keyword research (Long-tail)",
          "Content gap analysis",
          "Technical SEO audit (Crawlability fixes)",
          "eCommerce SEO optimization",
          "Video SEO optimization",
          "Priority support"
        ],
        popular: false
      }
    ]
  }
]

const ServicesPage = () => {
  const { services, fetchServices, loading } = useServicesStore()
  const [activeStep, setActiveStep] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  // Sync active step to 0 when services load
  useEffect(() => {
    if (services.length > 0) {
      setActiveStep(0)
    }
  }, [services])

  const handleStepClick = (idx) => {
    if (idx === activeStep) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveStep(idx)
      setIsTransitioning(false)
    }, 350)
  }

  const subtleFadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const activeService = services[activeStep]

  // Color palette sequence for beautiful matching backlights
  const colors = ["#a855f7", "#22d3ee", "#f97316", "#10b981", "#3b82f6", "#ec4899", "#f43f5e"]
  const getServiceColor = (idx) => colors[idx % colors.length]
  const activeColor = activeService ? getServiceColor(activeStep) : "#a855f7"

  // Dynamic mapping helper
  const getMappedPricingCategory = (serviceName) => {
    if (!serviceName) return "development";
    const name = serviceName.toLowerCase();
    if (name.includes("design") || name.includes("logo") || name.includes("ui") || name.includes("ux") || name.includes("layout")) {
      return "design";
    }
    if (name.includes("bug") || name.includes("fix") || name.includes("debug") || name.includes("issue")) {
      return "fixes";
    }
    if (name.includes("maintenance") || name.includes("care") || name.includes("support") || name.includes("operational")) {
      return "maintenance";
    }
    if (name.includes("seo") || name.includes("speed") || name.includes("optimization") || name.includes("performance") || name.includes("vitals")) {
      return "optimization";
    }
    return "development";
  }

  const activePricingCat = activeService ? getMappedPricingCategory(activeService.name) : "development"
  const currentPricingCategory = pricingCategories.find((cat) => cat.id === activePricingCat)

  return (
    <div className="w-full text-slate-800 dark:text-c-text select-none overflow-hidden pb-24 bg-[#FAF9F6] dark:bg-[#0A0A0F] min-h-screen">
      
      <section 
        style={{ 
          backgroundImage: `url(${servicesBg})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100%'
        }}
        className="relative w-full min-h-[420px] sm:min-h-[500px] flex items-center pt-32 pb-24 overflow-hidden border-b border-slate-200/50 dark:border-none shadow-lg dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
      >
        {/* Parallax adaptive dark overlay tuned perfectly for the background image */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/70 to-[#FAF9F6] dark:from-[#06060c]/85 dark:via-[#06060c]/92 dark:to-[#0A0A0F] backdrop-blur-[1.5px] z-1" />

        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-c-primary/15 rounded-full blur-[110px] pointer-events-none z-1 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-c-accent/15 rounded-full blur-[120px] pointer-events-none z-1 animate-pulse delay-1000" />

        {/* Banner Content Container */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={subtleFadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-left space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/50 dark:bg-white/5 text-xs font-bold text-c-accent uppercase tracking-wider shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-md">
            <Laptop className="w-3.5 h-3.5 text-c-accent animate-pulse" />
            <span>Professional Offerings</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7.5xl font-black tracking-tight leading-none text-slate-900 dark:text-c-text">
            My Services & <br />
            <span className="bg-gradient-to-r from-c-primary via-c-accent to-c-accent-2 bg-clip-text text-transparent drop-shadow-sm">
              Expert Solutions
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-c-sec-text max-w-2xl leading-relaxed font-semibold">
            Discover premium design, full stack development, and technical consulting services customized to bring your ideas to life with high quality standards.
          </p>

          <div className="flex gap-4 pt-2">
            <a 
              href="#services-interactive" 
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-black text-xs text-white bg-gradient-to-r from-c-primary to-c-accent hover:from-c-primary hover:to-c-accent-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-300 group cursor-pointer"
            >
              <span>Explore Services</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* 2. Interactive Services Section */}
      <section id="services-interactive" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-left">
        
        {/* Loader State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-c-primary" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Loading services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-800 dark:text-white">No Services Offerings Found</h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 max-w-sm mx-auto font-medium">
              We couldn't find any service offerings yet. Please check back later or add some in the admin panel.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            
            {/* Shifting Glow backlight */}
            <div 
              style={{ backgroundColor: activeColor }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[950px] sm:h-[500px] rounded-full opacity-[0.1] dark:opacity-[0.06] blur-[100px] sm:blur-[180px] pointer-events-none z-1 transition-all duration-1000" 
            />

            {/* A. Concentric Glass Horizontal Tabs Row */}
            <div className="relative p-[1.5px] rounded-[32px] sm:rounded-[40px] bg-gradient-to-r from-purple-500/35 via-[#22d3ee]/35 to-pink-500/35 dark:from-transparent dark:to-transparent dark:border dark:border-white/[0.06] shadow-[0_15px_30px_rgba(0,0,0,0.01)] backdrop-blur-md">
              <div className="relative flex flex-wrap justify-center gap-2.5 p-2 sm:p-3.5 rounded-[30px] sm:rounded-[38px] border border-black/[0.05] dark:border-white/[0.1] bg-white/80 dark:bg-white/[0.015] overflow-hidden z-10">
                
                {services.map((srv, idx) => {
                  const isActive = idx === activeStep
                  const stepColor = getServiceColor(idx)
                  return (
                    <button
                      key={srv._id}
                      onClick={() => handleStepClick(idx)}
                      className={`flex items-center gap-3 px-3 py-2.5 sm:px-5 sm:py-3.5 rounded-2xl transition-all duration-500 cursor-pointer relative z-20 group outline-none border ${
                        isActive 
                          ? 'bg-c-card/90 dark:bg-white/[0.08] border-purple-500/35 shadow-[0_8px_32px_rgba(0,0,0,0.03)] scale-102 font-bold' 
                          : 'bg-white/20 dark:bg-white/[0.02] border-transparent hover:bg-white/40 dark:hover:bg-white/[0.05] hover:scale-[1.01] hover:border-slate-300/40 dark:hover:border-white/5 font-semibold text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div 
                        style={{ 
                          borderColor: isActive ? stepColor : 'transparent',
                          backgroundColor: isActive ? `${stepColor}15` : 'rgba(255,255,255,0.02)'
                        }}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all duration-500 flex-shrink-0"
                      >
                        {isActive ? <Cpu className="w-5 h-5" style={{ color: stepColor }} /> : <div className="w-2.5 h-2.5 rounded-full bg-c-sec-text/40 group-hover:bg-c-text/60 transition-all duration-300" />}
                      </div>
                      <span className={`text-xs sm:text-sm md:text-base tracking-wide transition-colors duration-500 ${isActive ? 'text-c-text font-black' : 'text-c-sec-text group-hover:text-c-text'}`}>
                        {srv.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* B. Two-Column Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch pt-6">
              
              {/* Left Column: Details & Key Features */}
              <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6">
                <div className={`space-y-4 transition-all duration-500 transform ${isTransitioning ? 'opacity-0 -translate-x-6' : 'opacity-100 translate-x-0'}`}>
                  <div 
                    style={{ color: activeColor }}
                    className="text-sm font-black uppercase tracking-widest"
                  >
                    Service Offer 0{activeStep + 1}
                  </div>
                  <h3 
                    style={{ 
                      backgroundImage: `linear-gradient(to right, ${activeColor}, #22d3ee)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent'
                    }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight"
                  >
                    {activeService.name}
                  </h3>
                  <p className="text-slate-700 dark:text-c-sec-text text-base sm:text-lg font-semibold leading-relaxed font-sans whitespace-pre-line">
                    {activeService.description}
                  </p>
                </div>

                {activeService.keyFeatures && activeService.keyFeatures.length > 0 && (
                  <div 
                    style={{ borderColor: `${activeColor}20` }}
                    className={`p-6 sm:p-8 rounded-3xl border bg-white/40 dark:bg-white/[0.015] backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.01)] space-y-4 transition-all duration-500 transform delay-100 ${
                      isTransitioning ? 'opacity-0 -translate-x-6' : 'opacity-100 translate-x-0'
                    }`}
                  >
                    <h4 className="text-sm font-black uppercase text-c-sec-text tracking-wide flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" style={{ color: activeColor }} />
                      Key Focus Areas:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {activeService.keyFeatures.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-3 group/feat">
                          <div 
                            style={{ backgroundColor: `${activeColor}20`, borderColor: `${activeColor}40` }}
                            className="w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover/feat:scale-110"
                          >
                            <div 
                              style={{ backgroundColor: activeColor }}
                              className="w-1.5 h-1.5 rounded-full" 
                            />
                          </div>
                          <span className="text-sm sm:text-base font-bold text-slate-800 dark:text-c-text">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Dynamic Concentric Glass Graphic Box */}
              <div className="lg:col-span-6 flex items-center justify-center">
                
                {/* Outer Ring */}
                <div 
                  style={{ borderColor: `${activeColor}15` }}
                  className={`w-full max-w-md p-2.5 rounded-[36px] border bg-black/[0.005] dark:bg-white/[0.003] transition-all duration-700 ease-out transform ${
                    isTransitioning ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
                  }`}
                >
                  
                  {/* Middle Ring */}
                  <div 
                    style={{ borderColor: `${activeColor}25` }}
                    className="p-2.5 rounded-[28px] border bg-black/[0.008] dark:bg-white/[0.005]"
                  >
                    
                    {/* Inner Core Card */}
                    <div 
                      style={{ borderColor: `${activeColor}35` }}
                      className="relative p-5 sm:p-9 rounded-[20px] border bg-white/55 dark:bg-[#12121c]/45 backdrop-blur-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col items-center justify-center text-center space-y-5 min-h-[280px] sm:min-h-[320px]"
                    >
                      {/* Dynamic Gradients */}
                      <div 
                        style={{ 
                          backgroundImage: `linear-gradient(to top right, ${activeColor}20, transparent)`
                        }}
                        className="absolute inset-0 opacity-90 transition-all duration-700 pointer-events-none"
                      />
                      
                      <div 
                        style={{ backgroundColor: activeColor }}
                        className="absolute -top-16 -left-16 w-32 h-32 rounded-full opacity-[0.15] blur-2xl pointer-events-none animate-pulse" 
                      />
                      <div 
                        style={{ backgroundColor: activeColor }}
                        className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full opacity-[0.15] blur-2xl pointer-events-none animate-pulse" 
                      />

                      {/* Display image dynamically with high-tech glassmorphic plate */}
                      {activeService.imageUrl ? (
                        <div className="relative z-10 w-full h-52 rounded-2xl overflow-hidden border border-white/30 dark:border-white/10 bg-white/10 dark:bg-white/5 shadow-2xl flex items-center justify-center select-none group">
                          <img src={activeService.imageUrl} alt={activeService.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                      ) : (
                        <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-3xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 shadow-[0_12px_30px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-md flex items-center justify-center hover:scale-108 hover:rotate-6 transition-all duration-500 cursor-default select-none group">
                          <Laptop className="w-12 h-12 text-c-accent transition-transform duration-500 group-hover:scale-110" style={{ color: activeColor }} />
                        </div>
                      )}

                      <div className="relative z-10 space-y-2 select-none">
                        <span 
                          style={{ color: activeColor }}
                          className="text-xs font-black uppercase tracking-widest bg-white/50 dark:bg-white/5 px-3 py-1 rounded-full border border-white/20 dark:border-white/5 inline-block"
                        >
                          Offer Phase 0{activeStep + 1}
                        </span>
                        <h5 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-c-text tracking-tight">
                          {activeService.name}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* C. Dynamic Pricing Plans Section Linked directly to Selected Service */}
            {currentPricingCategory && (
              <div className="pt-20 border-t border-black/[0.06] dark:border-white/10 space-y-12">
                
                {/* Heading Area */}
                <div className="text-center space-y-4">
                  <div 
                    style={{ color: activeColor }}
                    className="text-xs font-black uppercase tracking-widest bg-white/50 dark:bg-white/5 px-4 py-2 rounded-full border border-white/20 dark:border-white/5 inline-block"
                  >
                    Pricing for {currentPricingCategory.name}
                  </div>
                  <h3 className="text-3.5xl sm:text-4.5xl font-black text-slate-900 dark:text-white tracking-tight">
                    Choose Your <span className="bg-gradient-to-r from-c-primary to-c-accent bg-clip-text text-transparent">Plan</span>
                  </h3>
                  <p className="text-c-sec-text text-sm sm:text-base max-w-xl mx-auto font-semibold leading-relaxed">
                    Select a budget-friendly and custom-tailored package designed to fit your unique project needs.
                  </p>
                </div>

                {/* Cards Grid */}
                <div 
                  className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch transition-all duration-500 transform ${
                    isTransitioning ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
                  }`}
                >
                  {currentPricingCategory.plans.map((plan, planIdx) => (
                    <div
                      key={planIdx}
                      style={{ '--plan-color': activeColor }}
                      className={`relative flex flex-col justify-between p-6 rounded-[28px] border transition-all duration-500 bg-white/55 dark:bg-[#12121c]/45 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.015)] ${
                        plan.popular 
                          ? 'border-[var(--plan-color)] shadow-[0_20px_50px_rgba(var(--plan-color),0.12)] scale-102 lg:-translate-y-1.5' 
                          : 'border-black/[0.06] dark:border-white/10 hover:border-[var(--plan-color)]/60 hover:shadow-lg'
                      } group`}
                    >
                      {plan.popular && (
                        <div 
                          style={{ backgroundColor: activeColor }}
                          className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-black text-white tracking-widest uppercase shadow-md select-none animate-bounce"
                        >
                          Most Popular
                        </div>
                      )}

                      <div className="space-y-5">
                        <div className="space-y-1 text-left">
                          <h3 className="text-xl font-black text-c-text">{plan.name}</h3>
                          <p className="text-c-sec-text text-xs font-bold leading-relaxed">{plan.desc}</p>
                        </div>

                        <div className="flex items-baseline gap-1 select-none text-left">
                          <span className="text-3.5xl sm:text-4.5xl font-black text-c-text tracking-tight">{plan.price}</span>
                          <span className="text-c-sec-text text-xs font-bold">{plan.period}</span>
                        </div>

                        <div className="w-full h-px bg-black/[0.06] dark:bg-white/10" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-left">
                          {plan.features.map((feature, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2.5">
                              <div 
                                style={{ backgroundColor: `${activeColor}15`, borderColor: `${activeColor}40` }}
                                className="w-4.5 h-4.5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5"
                              >
                                <Check style={{ color: activeColor }} className="w-3 h-3" />
                              </div>
                              <span className="text-xs sm:text-sm font-bold text-c-text leading-tight">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 mt-6">
                        {plan.popular ? (
                          <button 
                            style={{ 
                              background: `linear-gradient(to right, var(--plan-color), #22d3ee)`,
                              boxShadow: `0 4px 15px ${activeColor}30`
                            }}
                            className="w-full py-3 rounded-xl font-black text-xs text-white hover:scale-[1.02] active:scale-98 transition-all duration-300 shadow-md cursor-pointer select-none"
                          >
                            Choose Plan
                          </button>
                        ) : (
                          <button
                            style={{ 
                              borderColor: `${activeColor}50`, 
                              color: activeColor,
                              '--hover-bg': `${activeColor}10` 
                            }}
                            className="w-full py-3 rounded-xl font-black text-xs bg-transparent border hover:bg-[var(--hover-bg)] hover:border-[var(--plan-color)] hover:scale-[1.02] active:scale-98 transition-all duration-300 cursor-pointer select-none"
                          >
                            Choose Plan
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        )}
      </section>

    </div>
  )
}

export default ServicesPage
