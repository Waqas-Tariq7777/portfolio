import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Quote, Star, User, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import testimonialBg from '../assets/images/testimonial_bg.png'

// Client profiles with paths to images or markers for default avatars
import c1Img from '../assets/images/c1 (1).jpg'
import c2Img from '../assets/images/c1 (2).jpg'
import c3Img from '../assets/images/c1 (3).jpg'
import c4Img from '../assets/images/c1 (4).jpg'

const testimonials = [
  {
    name: "Aisha Khan",
    role: "CEO, OrganicGlow PK",
    project: "E-Commerce Organic Platform",
    isPakistani: true,
    rating: 5,
    text: "Waqas transformed our online store beautifully! The custom web architecture is incredibly fast, and the mobile performance exceeded all our expectations. His design sense and technical expertise are unmatched."
  },
  {
    name: "Liam Reynolds",
    role: "CTO, ApexGlobal",
    project: "Real-time Analytics Dashboard",
    isPakistani: false,
    image: c1Img,
    rating: 5,
    text: "The high-fidelity Three.js graphics and the robust MERN stack backend designed by Waqas are outstanding. Our system handles complex real-time updates seamlessly. An absolute expert in advanced web technologies."
  },
  {
    name: "Zainab Malik",
    role: "Co-Founder, ilmQuest",
    project: "EdTech Portal & LMS",
    isPakistani: true,
    rating: 5,
    text: "Working with Waqas was a fantastic experience. His technical prowess in frontend UI transitions and backend API integrations made the entire LMS platform exceptionally smooth and beautiful."
  },
  {
    name: "Chloe Henderson",
    role: "Creative Director, Velvet Studio",
    project: "Luxury Brand Portfolio",
    isPakistani: false,
    image: c2Img,
    rating: 5,
    text: "The dynamic visual elements and custom micro-animations Waqas implemented are absolutely jaw-dropping. It captures our premium brand essence perfectly. The response from our clients has been incredible!"
  },
  {
    name: "Muhammad Bilal",
    role: "Head of Product, TezPay",
    project: "B2B FinTech Platform",
    isPakistani: true,
    rating: 5,
    text: "Waqas built a secure, lightning-fast payment interface for our enterprise product. His extreme attention to detail, secure form handling, and clean code organization are world-class."
  },
  {
    name: "Sophia Carter",
    role: "Operations VP, LeadStream Ltd",
    project: "SaaS CRM Architecture",
    isPakistani: false,
    image: c3Img,
    rating: 5,
    text: "Our platform loading speed improved by more than 60% after Waqas optimized our rendering pipelines and redesigned our state management. A highly analytical and skilled senior developer."
  }
]

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [autoplay, setAutoplay] = useState(true)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      handleNext()
    }, 6000)

    return () => clearInterval(interval)
  }, [activeIndex, autoplay])

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
      setIsAnimating(false)
    }, 400)
  }

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
      setIsAnimating(false)
    }, 400)
  }

  const handleDotClick = (index) => {
    if (index === activeIndex || isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setActiveIndex(index)
      setIsAnimating(false)
    }, 400)
  }

  const subtleFadeUp = isMobile ? {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 }
  } : {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.section 
      id="testimonials" 
      initial={isMobile ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
      variants={subtleFadeUp}
      style={{ 
        backgroundImage: `url(${testimonialBg})`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
      className="relative w-full py-10 sm:py-14 overflow-hidden border-t border-b border-c-border select-none"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      {/* Light/Dark theme adaptable overlay for gorgeous parallax grid rendering */}
      <div className="absolute inset-0 bg-white/70 dark:bg-[#040408]/75 backdrop-blur-[1.5px] z-1" />

      {/* Cyberpunk Glow Accents */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-c-primary/10 rounded-full blur-[110px] pointer-events-none z-1" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] bg-c-accent/10 rounded-full blur-[110px] pointer-events-none z-1" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-c-border bg-[#0a0a16]/5 dark:bg-[#0a0a16]/90 text-xs font-bold text-c-accent uppercase tracking-wider shadow-[0_0_15px_rgba(34,211,238,0.05)]">
            Client Success
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-c-text">
            Client Testimonials
          </h2>
          <p className="text-slate-600 dark:text-c-sec-text max-w-lg mx-auto text-sm sm:text-base font-medium leading-relaxed">
            Real stories from enterprise partners and brand startups across both local and global tech ecosystems.
          </p>
        </div>

        {/* Testimonial Box Core Glass Container */}
        <div className="relative p-1.5 sm:p-2.5 rounded-[32px] border border-slate-200/60 dark:border-white/[0.05] bg-white/40 dark:bg-white/[0.01] shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-md max-w-4xl mx-auto">
          <div className="relative p-5 sm:p-8 md:p-10 rounded-[24px] border border-slate-200/80 dark:border-white/[0.08] bg-white/95 dark:bg-[#0c0c1e]/75 overflow-hidden flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
            
            {/* Top decorative glass reflect line */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.01] to-white/[0.05] opacity-50 pointer-events-none" />
            
            {/* Elegant large quote icons as visual graphic watermark */}
            <div className="absolute top-4 right-6 text-slate-900/[0.04] dark:text-white/[0.01] pointer-events-none">
              <Quote className="w-24 h-24 transform translate-x-2 -translate-y-2 scale-x-[-1]" />
            </div>

            {/* Main content slider slot */}
            <div className={`transition-all duration-500 transform ${isAnimating ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'}`}>
              
              {/* Stars Row */}
              <div className="flex gap-1 mb-4 justify-center sm:justify-start">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-slate-800 dark:text-c-text italic leading-relaxed text-center sm:text-left font-sans mb-4">
                “{testimonials[activeIndex].text}”
              </blockquote>

              {/* Client Info Block */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-100 dark:border-white/[0.06] pt-4 mt-2">
                <div className="flex items-center gap-4 text-left">
                  {/* Profile avatar / image */}
                  <div className="w-14 h-14 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 flex items-center justify-center overflow-hidden flex-shrink-0 relative group">
                    {testimonials[activeIndex].isPakistani ? (
                      // Default avatar for Pakistani clients (no custom image)
                      <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/20 dark:to-teal-500/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
                      </div>
                    ) : (
                      // Custom image for international clients
                      <img 
                        src={testimonials[activeIndex].image} 
                        alt={testimonials[activeIndex].name} 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-c-text">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-c-sec-text">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] text-xs font-bold text-c-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-c-accent animate-pulse" />
                  <span>{testimonials[activeIndex].project}</span>
                </div>
              </div>

            </div>

            {/* Slider Navigation controllers */}
            <div className="flex items-center justify-between mt-6">
              {/* Dot Indicators */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    style={{
                      width: index === activeIndex ? '28px' : '8px',
                      backgroundColor: index === activeIndex ? '#22d3ee' : 'rgba(120, 120, 120, 0.3)'
                    }}
                    className="h-2 rounded-full transition-all duration-500 cursor-pointer border-none outline-none"
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="w-11 h-11 rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-c-primary/10 hover:border-slate-300 dark:hover:border-c-primary/30 flex items-center justify-center text-slate-800 dark:text-c-text transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-11 h-11 rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-c-primary/10 hover:border-slate-300 dark:hover:border-c-primary/30 flex items-center justify-center text-slate-800 dark:text-c-text transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Center-aligned premium CTA button */}
        <div className="flex justify-center mt-8 relative z-20">
          <Link 
            to="/reviews"
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-c-primary to-c-accent hover:from-c-primary hover:to-c-accent-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] shadow-[0_4px_12px_rgba(168,85,247,0.2)] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
          >
            <span>View All Testimonials</span>
            <ArrowUpRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

      </div>
    </motion.section>
  )
}

export default Testimonials
