import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronDown, Search, ShieldCheck, ArrowDown, Cpu, Sparkles } from 'lucide-react'
import servicesBg from '../assets/images/services_bg.png'

const faqData = [
  {
    question: "What web technologies do you specialize in?",
    answer: "I specialize in the MERN Stack (MongoDB, Express.js, React, Node.js), Next.js, and advanced CSS frameworks like Tailwind CSS. My focus is on creating ultra-fast rendering pipelines, modular component architectures, and secure API gateways.",
    category: "Technical"
  },
  {
    question: "How long does a standard web application project take?",
    answer: "Timelines depend entirely on the project scope. A single landing page with dynamic layouts typically takes 3 to 7 days, whereas a complex B2B FinTech or multi-vendor eCommerce system can span 2 to 4 weeks from architecture design to live deployment.",
    category: "Process"
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer: "Yes, I offer custom maintenance packages covering core system updates, uptime tracking, database optimization audits, security hardening, and minor content updates to ensure your website remains highly performant.",
    category: "Support"
  },
  {
    question: "Can you optimize my existing website's loading speed?",
    answer: "Absolutely. I perform deep Lighthouse audits, optimize rendering cycles, compress assets, set up browser/server caching, and fix Core Web Vitals (LCP, FID, CLS) to push your loading scores past 90+.",
    category: "Technical"
  },
  {
    question: "How do we collaborate, and what is your revision policy?",
    answer: "We start with a thorough requirement analysis. Once the plan is aligned, I deliver milestones for review. All standard contracts include multiple revision rounds to ensure the final layout captures your exact vision.",
    category: "Process"
  },
  {
    question: "Is my project source code and database structure secure?",
    answer: "Security is built into my development lifecycle. I set up secure route guards, strict permission managers, protected backend controllers, and environment variable encryptions to safeguard your business intelligence.",
    category: "Technical"
  },
  {
    question: "Do you work with startups, or only established businesses?",
    answer: "I work with a diverse spectrum—from fast-paced, early-stage Pakistani and global startups needing custom MVPs to established agencies looking for senior consulting and performance tuning.",
    category: "General"
  },
  {
    question: "How do I get started with hiring you?",
    answer: "You can click any of the 'Hire Me' or 'Get in Touch' buttons across the site to access the Contact Form. Once you submit your project brief, I will follow up with you within 24 hours to schedule a discussion.",
    category: "General"
  }
]

const Faq = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [openIndex, setOpenIndex] = useState(null)

  const categories = ["All", "Technical", "Process", "Support", "General"]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filteredFaqs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const toggleAccordion = (index) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  const subtleFadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <div className="w-full text-slate-800 dark:text-c-text select-none overflow-hidden pb-24 bg-[#FAF9F6] dark:bg-[#0A0A0F] min-h-screen">
      
      {/* Premium Hero Banner Section */}
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
            <HelpCircle className="w-3.5 h-3.5 text-c-accent animate-pulse" />
            <span>Faq Page</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7.5xl font-black tracking-tight leading-none text-slate-900 dark:text-c-text">
            Frequently Asked <br />
            <span className="bg-gradient-to-r from-c-primary via-c-accent to-c-accent-2 bg-clip-text text-transparent drop-shadow-sm">
              Questions & Answers
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-c-sec-text max-w-2xl leading-relaxed font-semibold">
            Find answers to standard inquiries regarding my development architecture, design workflow, consulting timelines, and engagement methodologies.
          </p>

          <div className="flex gap-4 pt-2">
            <a 
              href="#faq-interactive" 
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-black text-xs text-white bg-gradient-to-r from-c-primary to-c-accent hover:from-c-primary hover:to-c-accent-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-300 group cursor-pointer"
            >
              <span>Explore FAQs</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Accordion FAQ Area */}
      <section id="faq-interactive" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-left">
        
        {/* Search & Filtering Panel */}
        <div className="space-y-6 mb-12">
          {/* Search bar */}
          <div className="relative rounded-2xl border border-slate-200/60 dark:border-white/5 bg-white/40 dark:bg-white/[0.015] backdrop-blur-xl shadow-md p-1.5 flex items-center">
            <div className="pl-4 text-slate-400 dark:text-gray-500">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search frequently asked questions..."
              className="w-full pl-3 pr-4 py-3 bg-transparent text-slate-900 dark:text-white text-sm font-bold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat)
                  setOpenIndex(null)
                }}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-c-primary to-c-accent text-white border-transparent shadow-md shadow-purple-500/10"
                    : "bg-white/40 border-slate-200 hover:border-slate-300 dark:bg-white/[0.02] dark:border-white/5 dark:hover:border-white/10 text-slate-600 dark:text-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion Grid list */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-800 dark:text-white">No FAQ Results Match</h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 max-w-xs mx-auto font-medium">
              We couldn't find any FAQs matching "{searchQuery}". Please refine your query or choose a different category.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div 
                  key={index}
                  className="rounded-3xl border border-slate-200/50 dark:border-white/5 bg-white/40 dark:bg-white/[0.015] backdrop-blur-xl shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Question Header Accordion Tab */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left outline-none cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl border flex-shrink-0 transition-colors duration-300 ${
                        isOpen 
                          ? "bg-purple-500/10 border-purple-500/20 text-purple-500" 
                          : "bg-white/50 border-slate-200 dark:bg-white/5 dark:border-white/5 text-slate-500 dark:text-gray-400 group-hover:text-c-primary"
                      }`}>
                        <Cpu className="w-4 h-4" />
                      </div>
                      <span className={`text-sm sm:text-base font-extrabold tracking-wide transition-colors duration-300 ${
                        isOpen ? "text-c-primary" : "text-slate-900 dark:text-white group-hover:text-c-primary"
                      }`}>
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 dark:text-gray-500 transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-c-primary" : ""
                    }`} />
                  </button>

                  {/* Expandable Accordion Body Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-slate-100/50 dark:border-white/5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-c-sec-text leading-relaxed pl-13">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        )}

      </section>

    </div>
  )
}

export default Faq
