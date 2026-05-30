import React, { useState } from 'react'
import { Filter } from 'lucide-react'
import BlogBanner from '../Components/BlogBanner'
import BlogCard from '../Components/BlogCard'
import BlogSearch from '../Components/BlogSearch'
import BlogFilters from '../Components/BlogFilters'
import { blogData } from '../data/blogData'

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...new Set(blogData.map(b => b.category))]

  const filteredBlogs = blogData.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="w-full text-slate-800 dark:text-c-text select-none overflow-hidden pb-24 bg-[#FAF9F6] dark:bg-[#0A0A0F] min-h-screen">
      
      {/* Banner Hero */}
      <BlogBanner />

      {/* Main Grid and Controls Section */}
      <section id="blogs-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-left">
        
        {/* Dynamic decorative backlight glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 rounded-[3rem]">
          <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-c-primary/10 dark:bg-c-primary/5 blur-[120px]" />
          <div className="absolute bottom-[20%] right-[20%] w-[450px] h-[450px] bg-c-accent/8 dark:bg-c-accent/5 blur-[130px]" />
        </div>

        {/* Filter controls row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200/60 dark:border-white/5">
          <BlogFilters 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
            categories={categories} 
          />
          <BlogSearch 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
        </div>

        {/* Blog Cards Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <div className="inline-flex p-4 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-gray-500">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-800 dark:text-white">No Articles Found</h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 max-w-sm mx-auto font-medium">
              We couldn't find any articles matching your search query. Try typing something else or select another category!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mt-12">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}

      </section>

    </div>
  )
}

export default Blogs
