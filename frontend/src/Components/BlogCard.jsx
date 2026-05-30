import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

const BlogCard = ({ blog }) => {
  return (
    <div
      className="group relative flex flex-col justify-between rounded-[24px] border border-black/[0.08] dark:border-white/[0.12] bg-white/45 dark:bg-white/[0.015] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md hover:border-c-primary/40 dark:hover:border-c-primary/30 hover:shadow-[0_20px_50px_rgba(168,85,247,0.12)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden text-left"
    >
      <div className="absolute -inset-px rounded-[24px] bg-gradient-to-r from-c-primary/0 via-c-accent/0 to-c-accent-2/0 opacity-0 group-hover:opacity-100 group-hover:from-c-primary/10 group-hover:via-c-accent/10 group-hover:to-c-accent-2/10 blur-sm transition-all duration-500 pointer-events-none" />

      <div className="relative z-10">
        {/* Blog Image */}
        {blog.imageUrl && (
          <div className="relative w-full h-52 overflow-hidden border-b border-slate-200/80 dark:border-white/10 bg-black/5 dark:bg-black/20">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
            />
            {/* Category badge */}
            <span className="absolute top-4 left-4 text-[9px] bg-[#06060c]/85 dark:bg-[#06060c]/90 text-c-accent border border-c-accent/30 backdrop-blur-md px-3 py-1 rounded-full font-black tracking-widest uppercase select-none shadow-lg">
              {blog.category}
            </span>
          </div>
        )}

        <div className="p-6 space-y-4">
          {/* Metadata */}
          <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-c-primary/80" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-c-accent/80" />
              <span>{blog.readingTime}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-black text-slate-900 dark:text-c-text group-hover:bg-gradient-to-r group-hover:from-c-primary group-hover:to-c-accent group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2 min-h-[56px]">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 leading-relaxed tracking-wide line-clamp-3 min-h-[60px] overflow-hidden">
            {blog.excerpt}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 pt-0 border-t border-slate-200/40 dark:border-white/5 mt-4 z-10">
        <Link
          to={`/blogs/${blog.id}`}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-c-primary to-c-accent hover:from-c-primary hover:to-c-accent-2 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg hover:shadow-purple-500/15 transition-all duration-300 cursor-pointer group/btn"
        >
          <span>Read More</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
