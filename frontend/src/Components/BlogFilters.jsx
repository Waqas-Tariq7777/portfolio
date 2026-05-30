import React from 'react'

const BlogFilters = ({ activeCategory, setActiveCategory, categories }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 text-left">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
            activeCategory === cat
              ? "bg-gradient-to-r from-c-primary to-c-accent text-white shadow-lg shadow-purple-500/25 scale-102"
              : "bg-white/80 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/50 dark:border-white/5"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

export default BlogFilters
