import { useState } from 'react'
import { Code2, Palette, Bug, Settings, Zap, Check } from 'lucide-react'
import { motion } from 'framer-motion'

const pricingCategories = [
  {
    id: "development",
    name: "Web Development",
    icon: <Code2 className="w-5 h-5" />,
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
    icon: <Palette className="w-5 h-5" />,
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
    icon: <Bug className="w-5 h-5" />,
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
    icon: <Settings className="w-5 h-5" />,
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
    icon: <Zap className="w-5 h-5" />,
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

const Pricing = () => {
  const [activePricingCat, setActivePricingCat] = useState("development")
  const [isPricingTransitioning, setIsPricingTransitioning] = useState(false)

  const handlePricingCatClick = (catId) => {
    if (catId === activePricingCat) return
    setIsPricingTransitioning(true)
    setTimeout(() => {
      setActivePricingCat(catId)
      setIsPricingTransitioning(false)
    }, 300)
  }

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
      id="pricing" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={subtleFadeUp}
      className="relative z-10 w-full pt-10 pb-28 select-none overflow-hidden border-b border-c-border"
    >
      {/* Background glowing shadows matching the overall aesthetics */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[350px] h-[350px] bg-c-primary/10 rounded-full blur-[110px] pointer-events-none z-1" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 w-[350px] h-[350px] bg-[#ab5aed]/10 rounded-full blur-[110px] pointer-events-none z-1" />

      <div className="max-w-8xl mx-auto px-4 md:px-5 lg:px-8 w-full relative z-20">
        
        {/* Section Heading Area */}
        <div className="text-center space-y-4 mb-16">
          <div className="text-xs font-extrabold text-[#ab5aed] uppercase tracking-widest select-none">
            PRICING PLANS
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-c-text">
            Transparent <span className="bg-gradient-to-r from-[#ab5aed] to-[#22d3ee] bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="text-c-sec-text max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed">
            Choose the perfect plan tailored to match your specific goals, from simple adjustments to high-performance enterprise applications.
          </p>
        </div>

        {/* Concentric Glass Horizontal Category Selector Bar */}
        <div className="relative p-1.5 rounded-[32px] sm:rounded-[40px] border border-black/[0.04] dark:border-white/[0.06] bg-black/[0.003] dark:bg-white/[0.002] shadow-[0_15px_30px_rgba(0,0,0,0.01),inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-md mb-16">
          <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 p-2 sm:p-3 rounded-[24px] sm:rounded-[32px] border border-black/[0.05] dark:border-white/[0.1] bg-white/45 dark:bg-white/[0.015] overflow-hidden z-10">
            {pricingCategories.map((cat) => {
              const isActive = cat.id === activePricingCat
              return (
                <button
                  key={cat.id}
                  onClick={() => handlePricingCatClick(cat.id)}
                  className={`flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl transition-all duration-500 cursor-pointer relative z-20 group outline-none ${
                    isActive 
                      ? 'bg-c-card/90 dark:bg-white/[0.08] shadow-[0_8px_20px_rgba(0,0,0,0.02)] scale-102 font-bold' 
                      : 'hover:bg-c-card/30 scale-100 font-semibold'
                  }`}
                >
                  <div 
                    style={{ 
                      borderColor: isActive ? cat.color : 'transparent',
                      backgroundColor: isActive ? `${cat.color}15` : 'rgba(255,255,255,0.02)'
                    }}
                    className="w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-500 flex-shrink-0"
                  >
                    <div style={{ color: isActive ? cat.color : undefined }} className="text-c-sec-text group-hover:text-c-text transition-colors">
                      {cat.icon}
                    </div>
                  </div>
                  <span className={`text-xs sm:text-sm tracking-wide transition-colors duration-500 ${isActive ? 'text-c-text font-black' : 'text-c-sec-text group-hover:text-c-text'}`}>
                    {cat.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Dynamic Pricing Cards Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch transition-all duration-500 transform ${isPricingTransitioning ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}>
          {pricingCategories.find((cat) => cat.id === activePricingCat)?.plans.map((plan, planIdx) => {
            const currentCatColor = pricingCategories.find((cat) => cat.id === activePricingCat)?.color
            return (
              <div
                key={planIdx}
                style={{ '--plan-color': currentCatColor }}
                className={`relative flex flex-col justify-between p-5 rounded-[24px] border transition-all duration-500 bg-white/40 dark:bg-white/[0.015] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.01)] ${
                  plan.popular 
                    ? 'border-[var(--plan-color)] shadow-[0_20px_50px_rgba(var(--plan-color),0.08)] scale-102 lg:-translate-y-1' 
                    : 'border-black/[0.06] dark:border-white/10 hover:border-[var(--plan-color)]/60'
                } group`}
              >
                {/* Popular Glow Indicator Badge */}
                {plan.popular && (
                  <div 
                    style={{ backgroundColor: currentCatColor }}
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-black text-white tracking-widest uppercase shadow-md select-none animate-bounce"
                  >
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  {/* Plan Meta Header */}
                  <div className="space-y-0.5 text-left">
                    <h3 className="text-lg sm:text-xl font-black text-c-text">{plan.name}</h3>
                    <p className="text-c-sec-text text-xs font-semibold">{plan.desc}</p>
                  </div>

                  {/* Price Plate */}
                  <div className="flex items-baseline gap-1 select-none text-left">
                    <span className="text-3xl sm:text-4xl font-black text-c-text tracking-tight">{plan.price}</span>
                    <span className="text-c-sec-text text-xs font-semibold">{plan.period}</span>
                  </div>

                  {/* Divider line */}
                  <div className="w-full h-px bg-black/[0.06] dark:bg-white/10" />

                  {/* Features Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-left">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <div 
                          style={{ backgroundColor: `${currentCatColor}15`, borderColor: `${currentCatColor}40` }}
                          className="w-4.5 h-4.5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5"
                        >
                          <Check style={{ color: currentCatColor }} className="w-3 h-3" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-c-text leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call-to-Action Buttons */}
                <div className="pt-4 mt-4">
                  {plan.popular ? (
                    <button 
                      style={{ 
                        background: `linear-gradient(to right, var(--plan-color), #22d3ee)`,
                        boxShadow: `0 4px 15px ${currentCatColor}30`
                      }}
                      className="w-full py-2.5 rounded-xl font-black text-xs text-white hover:scale-[1.02] active:scale-98 transition-all duration-300 shadow-md cursor-pointer select-none"
                    >
                      Choose Plan
                    </button>
                  ) : (
                    <button
                      style={{ 
                        borderColor: `${currentCatColor}50`, 
                        color: currentCatColor,
                        '--hover-bg': `${currentCatColor}10` 
                      }}
                      className="w-full py-2.5 rounded-xl font-black text-xs bg-transparent border hover:bg-[var(--hover-bg)] hover:border-[var(--plan-color)] hover:scale-[1.02] active:scale-98 transition-all duration-300 cursor-pointer select-none"
                    >
                      Choose Plan
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </motion.section>
  )
}

export default Pricing
