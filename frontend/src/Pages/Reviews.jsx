import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, MessageSquare, ShieldCheck, ThumbsUp, Calendar, Filter, ArrowDown } from 'lucide-react'

// Import client photos & backgrounds
import testimonialBg from '../assets/images/testimonial_bg.png'

const reviewsData = [
  {
    name: "Aisha Khan",
    role: "CEO",
    project: "E-Commerce Organic Platform",
    rating: 5,
    text: "Waqas transformed our online store beautifully! The custom web architecture is incredibly fast, and the mobile performance exceeded all our expectations. His design sense and technical expertise are unmatched.",
    date: "March 15, 2026",
    category: "Development",
    avatar: null,
    initials: "AK"
  },
  {
    name: "Muhammad Bilal",
    role: "Head of Product",
    project: "B2B FinTech Platform",
    rating: 5,
    text: "Waqas built a secure, lightning-fast payment interface for our fintech startup. His extreme attention to detail, secure form handling, and clean code organization are world-class.",
    date: "January 14, 2026",
    category: "Fullstack",
    avatar: null,
    initials: "MB"
  },
  {
    name: "Zainab Malik",
    role: "Co-Founder",
    project: "EdTech Portal & LMS",
    rating: 5,
    text: "Working with Waqas was a fantastic experience. His technical prowess in frontend UI transitions and backend API integrations made the entire LMS platform exceptionally smooth and beautiful.",
    date: "February 28, 2026",
    category: "Development",
    avatar: null,
    initials: "ZM"
  },
  {
    name: "Saad Ahmed",
    role: "Creative Director",
    project: "Agency Portfolio Layout",
    rating: 5,
    text: "The custom layouts and micro-animations Waqas implemented are absolutely stunning. It captures our agency's brand essence perfectly. Highly recommend him for high-end frontend work.",
    date: "April 20, 2026",
    category: "Design",
    avatar: null,
    initials: "SA"
  },
  {
    name: "Hamza Siddiqui",
    role: "Founder",
    project: "Landing & Custom Forms",
    rating: 5,
    text: "Clean layout, smooth forms, and excellent mobile support for our food delivery startup. Waqas was professional throughout the process, handled revisions quickly, and wrote clean code.",
    date: "May 12, 2026",
    category: "Development",
    avatar: null,
    initials: "HS"
  },
  {
    name: "Amna Qureshi",
    role: "Founder",
    project: "Shopify Custom Setup",
    rating: 5,
    text: "We needed a custom product recommendation system on our shop page. Waqas delivered it within the agreed timeline. The design is elegant and fits perfectly with our brand's aesthetics.",
    date: "May 02, 2026",
    category: "Design",
    avatar: null,
    initials: "AQ"
  },
  {
    name: "Haris Raza",
    role: "CTO",
    project: "Data Analytics Dashboard",
    rating: 5,
    text: "Waqas reorganized our third-party sensor data pipelines cleanly using the MERN stack. His database queries are highly optimized and saved our team weeks of refactoring.",
    date: "April 11, 2026",
    category: "Fullstack",
    avatar: null,
    initials: "HR"
  },
  {
    name: "Fatima Yousuf",
    role: "Operations Manager",
    project: "SaaS CRM Architecture",
    rating: 5,
    text: "Our platform loading speed improved by more than 60% after Waqas optimized our rendering pipelines and redesigned our state management. A highly analytical and skilled developer.",
    date: "March 29, 2026",
    category: "Optimization",
    avatar: null,
    initials: "FY"
  },
  {
    name: "Waqar Younas",
    role: "Technical Lead",
    project: "Next.js Performance Audit",
    rating: 5,
    text: "Lighthouse audit score went from 45 to 94 after hiring Waqas. We've seen a noticeable drop in bounce rates since the speed optimization was pushed live. Outstanding results.",
    date: "March 18, 2026",
    category: "Optimization",
    avatar: null,
    initials: "WY"
  },
  {
    name: "Sana Bashir",
    role: "Product Owner",
    project: "Dynamic Branding Site",
    rating: 5,
    text: "The page transitions are incredibly smooth and run without lag. We asked for dynamic CSS scroll-animations and Waqas implemented them exactly as designed. Great attention to details.",
    date: "February 10, 2026",
    category: "Design",
    avatar: null,
    initials: "SB"
  },
  {
    name: "Zeeshan Ali",
    role: "Lead Engineer",
    project: "API Portal & Ledger Backend",
    rating: 5,
    text: "The MERN stack backend designed by Waqas is outstanding. Our system handles complex real-time ledger updates seamlessly. An absolute expert in advanced web technologies.",
    date: "April 02, 2026",
    category: "Fullstack",
    avatar: null,
    initials: "ZA"
  },
  {
    name: "Hira Jamil",
    role: "Co-Founder",
    project: "Multi-Vendor Marketplace",
    rating: 5,
    text: "The backend codebase is highly structured and secure. Waqas helped us set up protected route hierarchies and clear permission handlers for our dashboard.",
    date: "April 08, 2026",
    category: "Fullstack",
    avatar: null,
    initials: "HJ"
  }
];

const Reviews = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(false);

  const categories = ["All", "Development", "Design", "Fullstack", "Optimization"];

  const filteredReviews = selectedCategory === "All"
    ? reviewsData
    : reviewsData.filter(r => r.category === selectedCategory);

  const subtleFadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobile(window.innerWidth < 1024);
  }, []);

  return (
    <div className="w-full text-slate-800 dark:text-c-text select-none overflow-hidden pb-24 bg-[#FAF9F6] dark:bg-[#0A0A0F] min-h-screen">
      
      <section 
        style={{ 
          backgroundImage: `url(${testimonialBg})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100%'
        }}
        className="relative w-full min-h-[420px] sm:min-h-[500px] flex items-center pt-32 pb-24 overflow-hidden"
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
            <ShieldCheck className="w-3.5 h-3.5 text-c-accent animate-pulse" />
            <span>Verified Clients Feedback</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7.5xl font-black tracking-tight leading-none text-slate-900 dark:text-c-text">
            What Clients Say & <br />
            <span className="bg-gradient-to-r from-c-primary via-c-accent to-c-accent-2 bg-clip-text text-transparent drop-shadow-sm">
              Honest Reviews
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-c-sec-text max-w-2xl leading-relaxed font-semibold">
            Honest feedback from project partners, startups, and product owners across the tech ecosystem. Discover real reviews on MERN applications, UI optimizations, and layouts.
          </p>

          <div className="flex gap-4 pt-2">
            <a 
              href="#reviews-grid" 
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-black text-xs text-white bg-gradient-to-r from-c-primary to-c-accent hover:from-c-primary hover:to-c-accent-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-300 group cursor-pointer"
            >
              <span>Explore Reviews</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </div>
        </motion.div>
      </section>

      <div id="reviews-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10 text-left pt-20">

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 pb-2">
          <span className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2 mr-2">
            <Filter className="w-3.5 h-3.5" />
            Filter by:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-c-primary to-c-accent text-white border-transparent shadow-md shadow-purple-500/10"
                  : "bg-white/40 border-slate-200 hover:border-slate-300 dark:bg-white/[0.02] dark:border-white/5 dark:hover:border-white/10 text-slate-600 dark:text-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reviews Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={isMobile ? false : { opacity: 0, y: 15 }}
              whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group flex flex-col justify-between p-6 rounded-3xl border border-slate-200/50 dark:border-white/5 bg-white/40 dark:bg-white/[0.015] backdrop-blur-xl shadow-lg hover:border-c-primary/30 hover:shadow-2xl transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Header Stars & Category */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[8px] bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/15 px-2 py-0.5 rounded font-black tracking-widest uppercase">
                    {review.category}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm font-semibold text-slate-700 dark:text-c-sec-text leading-relaxed italic">
                  “{review.text}”
                </p>
              </div>

              {/* Client Profile Footer */}
              <div className="pt-6 border-t border-slate-100 dark:border-white/5 mt-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {review.avatar ? (
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-white/10"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/10 to-indigo-500/10 text-purple-600 dark:text-purple-400 font-black text-xs flex items-center justify-center border border-purple-500/10">
                      {review.initials}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                      {review.name}
                    </h4>
                    <p className="text-[11px] font-bold text-slate-500 dark:text-gray-400">
                      {review.role}
                    </p>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 dark:text-gray-500 font-extrabold flex items-center gap-1.5 shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{review.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic CTA highlights metrics */}
        <div className="p-8 rounded-[32px] border border-slate-200/50 dark:border-white/5 bg-gradient-to-br from-purple-500/5 via-indigo-500/5 to-c-primary/5 dark:from-purple-500/[0.02] dark:via-indigo-500/[0.02] dark:to-c-primary/[0.02] backdrop-blur-xl shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mt-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent blur-xl pointer-events-none" />
          
          <div className="space-y-2 max-w-lg text-center md:text-left">
            <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">Ready to build your success story?</h3>
            <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-gray-400 leading-normal">
              Whether you need a custom e-commerce system, layout styling, MERN backend, or site speed optimization, let's create something high-performance together.
            </p>
          </div>

          <div className="flex gap-4 shrink-0 flex-col sm:flex-row w-full sm:w-auto">
            <Link 
              to="/contact"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-c-primary to-c-accent text-white font-extrabold text-xs rounded-xl shadow-md hover:shadow-purple-500/20 active:scale-98 transition-all cursor-pointer text-center"
            >
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Reviews
