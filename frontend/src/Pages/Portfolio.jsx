import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProjectStore } from '../Store/projectStore'
import portfolioBg from '../assets/images/portfolio_bg.png'
import { 
  Briefcase, ArrowDown, Search, ArrowRight, Loader2, 
  Filter, Calendar, Clock, Cpu, ExternalLink 
} from 'lucide-react'

const Portfolio = () => {
  const { projects, fetchProjects, loading } = useProjectStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    fetchProjects()
  }, [])

  // Categories list derived from projects
  const categories = ['All', ...new Set(projects.flatMap(p => p.category || []).filter(Boolean))]

  // Filter projects by category and search term
  const filteredProjects = projects.filter(proj => {
    const matchesSearch = proj.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          proj.mainDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          proj.tools?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          proj.technologies?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = activeCategory === 'All' || 
                            (Array.isArray(proj.category) 
                              ? proj.category.includes(activeCategory) 
                              : proj.category === activeCategory)

    return matchesSearch && matchesCategory
  })

  return (
    <div className="w-full text-slate-800 dark:text-c-text select-none overflow-hidden pb-24 bg-[#FAF9F6] dark:bg-[#0A0A0F] min-h-screen">
      
      {/* 1. Header Hero Banner Section */}
      <section 
        style={{ 
          backgroundImage: `url(${portfolioBg})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
        className="relative w-full min-h-[400px] sm:min-h-[480px] flex items-center pt-28 pb-20 overflow-hidden border-b border-slate-200 dark:border-none"
      >
        {/* Parallax adaptive dark overlay tuned perfectly for the background image */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/60 to-[#FAF9F6] dark:from-[#06060c]/85 dark:via-[#06060c]/92 dark:to-[#0A0A0F] backdrop-blur-[1px] z-1" />

        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-c-primary/10 rounded-full blur-[100px] pointer-events-none z-1" />
        <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] bg-c-accent/10 rounded-full blur-[110px] pointer-events-none z-1" />

        {/* Banner Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 text-xs font-bold text-c-accent uppercase tracking-wider shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md">
            <Briefcase className="w-3.5 h-3.5 text-c-accent" />
            <span>Showcase of Excellence</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900 dark:text-c-text">
            My Projects & <br />
            <span className="bg-gradient-to-r from-c-primary via-c-accent to-c-accent-2 bg-clip-text text-transparent">
              Creative Engineering
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-c-sec-text max-w-2xl leading-relaxed font-semibold">
            Explore a curated gallery of my web applications, custom software designs, and full-stack solutions. Each project reflects a dedication to responsive layouts, elegant system architecture, and pixel-perfect responsive design.
          </p>

          <div className="flex gap-4 pt-2">
            <a 
              href="#projects-grid" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-c-primary to-c-accent hover:from-c-primary hover:to-c-accent-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 group cursor-pointer"
            >
              <span>Explore Showcase</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </div>
      </div>
      </section>

      {/* 2. Interactive Filtering & Grid Section */}
      <section id="projects-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-5 relative z-10 text-left">
        
        {/* Live dynamic flowing smoke effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 rounded-[3rem]">
          <style>{`
            @keyframes smoke-flow-1 {
              0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
              50% { transform: translate(-25%, -35%) rotate(180deg) scale(1.3); border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%; }
              100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
            }
            @keyframes smoke-flow-2 {
              0% { transform: translate(-50%, -50%) rotate(360deg) scale(1.2); border-radius: 50% 50% 30% 70% / 50% 60% 30% 60%; }
              50% { transform: translate(-55%, -55%) rotate(180deg) scale(0.85); border-radius: 30% 70% 70% 30% / 60% 40% 70% 30%; }
              100% { transform: translate(-50%, -50%) rotate(0deg) scale(1.2); border-radius: 50% 50% 30% 70% / 50% 60% 30% 60%; }
            }
            @keyframes smoke-flow-3 {
              0% { transform: translate(-50%, -50%) rotate(0deg) scale(0.9); border-radius: 60% 40% 50% 50% / 50% 30% 70% 50%; }
              50% { transform: translate(-35%, -45%) rotate(-180deg) scale(1.35); border-radius: 40% 60% 30% 70% / 70% 50% 30% 60%; }
              100% { transform: translate(-50%, -50%) rotate(-360deg) scale(0.9); border-radius: 60% 40% 50% 50% / 50% 30% 70% 50%; }
            }
            .smoke-blob-1 { animation: smoke-flow-1 28s infinite ease-in-out; }
            .smoke-blob-2 { animation: smoke-flow-2 34s infinite ease-in-out; }
            .smoke-blob-3 { animation: smoke-flow-3 40s infinite ease-in-out; }
          `}</style>
          <div className="absolute top-[35%] left-[45%] w-[450px] h-[450px] bg-c-primary/10 dark:bg-c-primary/6 blur-[100px] smoke-blob-1 pointer-events-none" />
          <div className="absolute top-[50%] left-[55%] w-[500px] h-[500px] bg-c-accent/8 dark:bg-c-accent/5 blur-[125px] smoke-blob-2 pointer-events-none" />
          <div className="absolute top-[65%] left-[35%] w-[400px] h-[400px] bg-c-primary/10 dark:bg-c-primary/6 blur-[100px] smoke-blob-3 pointer-events-none" />
        </div>

        {/* Filter controls wrapper */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200/60 dark:border-white/5">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
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

          {/* Search box input */}
          <div className="relative w-full md:w-80 shrink-0">
            <input
              type="text"
              placeholder="Search by name or tool..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 text-xs font-semibold focus:outline-none focus:border-c-primary/60 transition-all shadow-sm"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-gray-500" />
          </div>
        </div>

        {/* Projects Grid Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-c-primary" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Loading masterworks...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <div className="inline-flex p-4 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-gray-500">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-800 dark:text-white">No Projects Found</h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 max-w-sm mx-auto font-medium">
              We couldn't find any projects matching your parameters. Try modifying your search or select a different category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mt-12">
              {filteredProjects.map((proj) => (
                <div
                  key={proj._id}
                  className="group relative flex flex-col justify-between rounded-[24px] border border-black/[0.08] dark:border-white/[0.12] bg-white/45 dark:bg-white/[0.015] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md hover:border-c-primary/40 dark:hover:border-c-primary/30 hover:shadow-[0_20px_50px_rgba(168,85,247,0.12)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
                >
                  {/* Glowing decorative border glare on hover */}
                  <div className="absolute -inset-px rounded-[24px] bg-gradient-to-r from-c-primary/0 via-c-accent/0 to-c-accent-2/0 opacity-0 group-hover:opacity-100 group-hover:from-c-primary/10 group-hover:via-c-accent/10 group-hover:to-c-accent-2/10 blur-sm transition-all duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    {/* Project Cover Image */}
                    {proj.imageUrl && (
                      <div className="relative w-full h-52 overflow-hidden border-b border-slate-200/80 dark:border-white/10 bg-black/5 dark:bg-black/20">
                        <img
                          src={proj.imageUrl}
                          alt={proj.projectName}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                        />
                        {/* Semi-transparent Neon Category Badges Floating */}
                        {proj.category && (
                          <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-20">
                            {(Array.isArray(proj.category) ? proj.category : [proj.category]).filter(Boolean).map((cat, idx) => (
                              <span key={idx} className="text-[9px] bg-[#06060c]/85 dark:bg-[#06060c]/90 text-c-accent border border-c-accent/30 backdrop-blur-md px-3 py-1 rounded-full font-black tracking-widest uppercase select-none shadow-lg">
                                {cat}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Content Slot */}
                    <div className="p-6 space-y-4">
                      {/* Project Title */}
                      <h3 className="text-xl font-black text-slate-900 dark:text-c-text group-hover:bg-gradient-to-r group-hover:from-c-primary group-hover:to-c-accent group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 truncate">
                        {proj.projectName}
                      </h3>

                      {/* Main Description (Truncated to strictly 2 lines) */}
                      <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 leading-relaxed tracking-wide line-clamp-2 h-10 overflow-hidden">
                        {proj.mainDescription || "No project overview description provided."}
                      </p>

                      {/* Technologies Tags */}
                      {(() => {
                        const techList = (proj.technologies && proj.technologies.length > 0) ? proj.technologies : (proj.tools || []);
                        if (techList.length === 0) return null;
                        return (
                          <div className="space-y-2 pt-2 border-t border-slate-200/40 dark:border-white/5">
                            <div className="flex flex-wrap gap-1.5">
                              {techList.slice(0, 4).map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-1 rounded-lg text-[9px] font-bold bg-gradient-to-r from-c-primary/5 to-c-accent/5 dark:from-white/5 dark:to-white/5 border border-slate-200/50 dark:border-white/5 text-slate-600 dark:text-slate-300 shadow-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                              {techList.length > 4 && (
                                <span className="px-2.5 py-1 rounded-lg text-[9px] font-black bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-gray-500 border border-slate-200/50 dark:border-white/5">
                                  +{techList.length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-6 pt-0 border-t border-slate-200/40 dark:border-white/5 mt-4 z-10">
                    <Link
                      to={`/project/${proj._id}`}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-c-primary to-c-accent hover:from-c-primary hover:to-c-accent-2 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg hover:shadow-purple-500/15 transition-all duration-300 cursor-pointer group/btn"
                    >
                      <span>View Project</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        )}

      </section>

    </div>
  )
}

export default Portfolio
