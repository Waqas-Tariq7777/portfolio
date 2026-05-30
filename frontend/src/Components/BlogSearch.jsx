import React from 'react'
import { Search } from 'lucide-react'

const BlogSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full md:w-80 shrink-0 text-left">
      <input
        type="text"
        placeholder="Search articles, keywords..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 text-xs font-semibold focus:outline-none focus:border-c-primary/60 transition-all shadow-sm"
      />
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-gray-500" />
    </div>
  )
}

export default BlogSearch
