import React from 'react'
import { BookOpen, ArrowDown } from 'lucide-react'
import blogsBg from '../assets/images/blogs_bg.png'

const BlogBanner = () => {
  return (
    <section 
      style={{ 
        backgroundImage: `url(${blogsBg})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100%'
      }}
      className="relative w-full min-h-[400px] sm:min-h-[480px] flex items-center pt-32 pb-24 overflow-hidden border-b border-slate-200/50 dark:border-none shadow-lg dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/70 to-[#FAF9F6] dark:from-[#06060c]/85 dark:via-[#06060c]/92 dark:to-[#0A0A0F] backdrop-blur-[1.5px] z-1" />
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-c-primary/15 rounded-full blur-[110px] pointer-events-none z-1 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-c-accent/15 rounded-full blur-[120px] pointer-events-none z-1 animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-left space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/50 dark:bg-white/5 text-xs font-bold text-c-accent uppercase tracking-wider shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-md">
          <BookOpen className="w-3.5 h-3.5 text-c-accent animate-pulse" />
          <span>Knowledge & Insights</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-7.5xl font-black tracking-tight leading-none text-slate-900 dark:text-c-text">
          My Technical Blogs & <br />
          <span className="bg-gradient-to-r from-c-primary via-c-accent to-c-accent-2 bg-clip-text text-transparent drop-shadow-sm">
            Industry Roadmaps
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-c-sec-text max-w-2xl leading-relaxed font-semibold">
          Stay informed with in-depth structural roadmap tutorials, frontend engineering guides, and expert perspectives on modern software development.
        </p>

        <div className="flex gap-4 pt-2">
          <a 
            href="#blogs-grid" 
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-black text-xs text-white bg-gradient-to-r from-c-primary to-c-accent hover:from-c-primary hover:to-c-accent-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-300 group cursor-pointer"
          >
            <span>Explore Blogs</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default BlogBanner
