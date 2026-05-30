import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProjectStore } from '../Store/projectStore'
import ImagePopup from '../Components/ImagePopup'
import { 
  ArrowLeft, Calendar, DollarSign, Clock, Link as LinkIcon, 
  Tag, Loader2, Cpu, CheckCircle2, ChevronRight, Award, 
  Settings, Flame, Trophy, Compass, Box
} from 'lucide-react'

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects, fetchProjects, loading } = useProjectStore()

  // Full Screen Preview States for additional images
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState("")

  useEffect(() => {
    if (projects.length === 0) {
      fetchProjects()
    }
  }, [projects, fetchProjects])

  const project = projects.find((p) => p._id === id)

  const subtleFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const handleOpenPreview = (url) => {
    setPreviewUrl(url)
    setIsPreviewOpen(true)
  }

  if (loading && !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6] dark:bg-[#0A0A0F] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-c-primary" />
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Loading masterwork...</p>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6] dark:bg-[#0A0A0F] gap-6 px-4">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">Project Not Found</h2>
        <p className="text-xs text-slate-500 dark:text-gray-400 text-center max-w-sm">
          The requested project might have been moved, deleted, or you followed an incorrect URL pathway.
        </p>
        <Link 
          to="/portfolio"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-c-primary to-c-accent text-white rounded-xl text-xs font-bold shadow-md hover:scale-102 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
      </div>
    )
  }

  const techList = (project.technologies && project.technologies.length > 0) ? project.technologies : (project.tools || []);

  return (
    <div className="w-full text-slate-800 dark:text-c-text select-none overflow-hidden pb-6 bg-[#FAF9F6] dark:bg-[#0A0A0F] min-h-screen relative">
      
      {/* Live dynamic flowing smoke background effect (Just like in the About page) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <style>{`
          @keyframes details-smoke-1 {
            0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
            50% { transform: translate(-20%, -30%) rotate(180deg) scale(1.35); border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%; }
            100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          }
          @keyframes details-smoke-2 {
            0% { transform: translate(-50%, -50%) rotate(360deg) scale(1.2); border-radius: 50% 50% 30% 70% / 50% 60% 30% 60%; }
            50% { transform: translate(-45%, -45%) rotate(180deg) scale(0.85); border-radius: 30% 70% 70% 30% / 60% 40% 70% 30%; }
            100% { transform: translate(-50%, -50%) rotate(0deg) scale(1.2); border-radius: 50% 50% 30% 70% / 50% 60% 30% 60%; }
          }
          .dt-smoke-1 { animation: details-smoke-1 25s infinite ease-in-out; }
          .dt-smoke-2 { animation: details-smoke-2 30s infinite ease-in-out; }
        `}</style>
        <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] bg-c-primary/10 dark:bg-c-primary/6 blur-[120px] dt-smoke-1 pointer-events-none" />
        <div className="absolute bottom-[25%] right-[25%] w-[550px] h-[550px] bg-c-accent/8 dark:bg-c-accent/5 blur-[130px] dt-smoke-2 pointer-events-none" />
      </div>

      {/* Back Button Action Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4 relative z-20 text-left">
        <button
          onClick={() => navigate('/portfolio')}
          className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white/45 dark:bg-white/[0.015] text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-c-primary transition-all duration-300 backdrop-blur-md shadow-sm hover:scale-102 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-c-primary transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span>Back to Portfolio Showcase</span>
        </button>
      </div>

      {/* Core Project Details Layout Grid */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={subtleFadeUp}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 relative z-10 text-left"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Visual Media Gallery & Description slots (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Project Cover Block */}
            {project.imageUrl && (
              <div className="relative group w-full rounded-[24px] overflow-hidden border border-black/[0.08] dark:border-purple-500/20 bg-white/40 dark:bg-c-card/25 backdrop-blur-md shadow-2xl transition-all duration-500 hover:border-c-primary/30">
                <img 
                  src={project.imageUrl} 
                  alt={project.projectName} 
                  className="w-full h-auto max-h-[480px] object-cover transition-transform duration-700 group-hover:scale-[1.01]" 
                />
                <span className="absolute bottom-4 left-4 text-[9px] bg-gradient-to-r from-purple-600 to-cyan-600 px-3 py-1.5 rounded-full text-white font-extrabold tracking-widest uppercase select-none shadow-lg">
                  Cover Showcase
                </span>
              </div>
            )}

            {/* Deep Description Blocks */}
            <div className="space-y-8 bg-white/45 dark:bg-white/[0.015] border border-black/[0.08] dark:border-white/[0.08] rounded-[24px] p-6 sm:p-10 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              
              {/* Main Description */}
              {project.mainDescription && (
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/15 text-[10px] font-black uppercase tracking-wider">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Brief Overview</span>
                  </div>
                  <p className="text-base sm:text-lg font-medium text-slate-700 dark:text-slate-200 leading-relaxed break-words whitespace-pre-wrap pl-1 italic">
                    “{project.mainDescription}”
                  </p>
                </div>
              )}

              {/* Project Overview */}
              {(project.projectOverview || project.overview) && (
                <div className="space-y-3 pt-6 border-t border-black/[0.06] dark:border-white/5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/15 text-[10px] font-black uppercase tracking-wider">
                    <Box className="w-3.5 h-3.5" />
                    <span>Detailed Scope & Objective</span>
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300 leading-relaxed break-words whitespace-pre-wrap pl-1">
                    {project.projectOverview || project.overview}
                  </p>
                </div>
              )}

              {/* Challenges */}
              {(project.projectChallenges || project.challenges) && (
                <div className="space-y-3 pt-6 border-t border-black/[0.06] dark:border-white/5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/15 text-[10px] font-black uppercase tracking-wider">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Challenges Faced</span>
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300 leading-relaxed break-words whitespace-pre-wrap pl-1">
                    {project.projectChallenges || project.challenges}
                  </p>
                </div>
              )}

              {/* Results */}
              {project.results && (
                <div className="space-y-3 pt-6 border-t border-black/[0.06] dark:border-white/5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15 text-[10px] font-black uppercase tracking-wider">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Execution Results & Impact</span>
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300 leading-relaxed break-words whitespace-pre-wrap pl-1">
                    {project.results}
                  </p>
                </div>
              )}

            </div>

          </div>

          {/* RIGHT COLUMN: Metadata specs, Live URL & Features list (5 Columns) - Sticky for synchronized scrolling */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28 h-fit self-start">
            
            {/* Glassmorphic Specifications Card */}
            <div className="p-6 sm:p-8 rounded-[24px] border border-black/[0.08] dark:border-purple-500/25 bg-white/45 dark:bg-white/[0.015] backdrop-blur-md shadow-2xl space-y-6">
              
              <div className="space-y-2">
                {project.category && (
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {(Array.isArray(project.category) ? project.category : [project.category]).filter(Boolean).map((cat, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 text-[9px] bg-purple-600/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full font-black select-none uppercase tracking-wider">
                        <Tag className="w-3 h-3 text-purple-500" />
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
                <h2 className="text-3xl font-black leading-tight bg-gradient-to-r from-c-primary via-c-accent to-c-accent-2 bg-clip-text text-transparent">
                  {project.projectName}
                </h2>
              </div>

              {/* Details table grid */}
              <div className="space-y-4 pt-4 border-t border-black/[0.06] dark:border-white/5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                
                {project.date && (
                  <div className="flex items-center justify-between py-1 border-b border-black/[0.03] dark:border-white/[0.02]">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-gray-500 font-semibold">
                      <Calendar className="w-4 h-4 shrink-0 text-purple-500" />
                      <span>Date Completed</span>
                    </div>
                    <span className="text-slate-800 dark:text-white font-extrabold">{project.date}</span>
                  </div>
                )}

                {project.timeline && (
                  <div className="flex items-center justify-between py-1 border-b border-black/[0.03] dark:border-white/[0.02]">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-gray-500 font-semibold">
                      <Clock className="w-4 h-4 shrink-0 text-cyan-500" />
                      <span>Duration / Timeline</span>
                    </div>
                    <span className="text-slate-800 dark:text-white font-extrabold">{project.timeline}</span>
                  </div>
                )}

                {project.budget && (
                  <div className="flex items-center justify-between py-1 border-b border-black/[0.03] dark:border-white/[0.02]">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-gray-500 font-semibold">
                      <DollarSign className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span>Project Value / Budget</span>
                    </div>
                    <span className="text-emerald-500 font-extrabold">{project.budget}</span>
                  </div>
                )}

              </div>

              {/* Dynamic Live Link Button */}
              {project.liveSiteLink ? (
                <div className="pt-2">
                  <a
                    href={project.liveSiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-gradient-to-r from-c-primary via-c-accent to-c-accent-2 hover:from-c-primary hover:to-c-accent-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] text-white font-black text-xs rounded-xl shadow-lg transition-all duration-300 group/link cursor-pointer"
                  >
                    <LinkIcon className="w-4 h-4" />
                    <span>LAUNCH DEMONSTRATION</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                  </a>
                </div>
              ) : (
                <div className="pt-2">
                  <button
                    disabled
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-slate-100/50 dark:bg-white/5 border border-dashed border-slate-300 dark:border-white/10 text-slate-400 dark:text-gray-500 font-black text-xs rounded-xl cursor-not-allowed select-none line-through relative"
                    title="Live demonstration is currently unavailable for this project"
                  >
                    <LinkIcon className="w-4 h-4 opacity-40" />
                    <span>LAUNCH DEMONSTRATION</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                  </button>
                </div>
              )}

            </div>

            {/* Key Features List Section */}
            {project.keyFeatures && (() => {
              const featuresArray = Array.isArray(project.keyFeatures)
                ? project.keyFeatures
                : typeof project.keyFeatures === 'string'
                  ? project.keyFeatures.split('\n')
                  : [];
              if (featuresArray.filter(Boolean).length === 0) return null;
              return (
                <div className="p-6 sm:p-8 rounded-[24px] border border-black/[0.08] dark:border-white/5 bg-white/45 dark:bg-white/[0.015] backdrop-blur-md space-y-4 shadow-lg">
                  <h3 className="text-xs uppercase font-black tracking-widest text-slate-400 dark:text-gray-500 flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-500 animate-pulse" />
                    <span>KEY PROJECT HIGHLIGHTS</span>
                  </h3>
                  <div className="space-y-3 font-semibold text-slate-600 dark:text-slate-300 text-sm">
                    {featuresArray.filter(Boolean).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5 shadow-sm" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Tools & technologies section */}
            {techList && techList.length > 0 && (
              <div className="p-6 sm:p-8 rounded-[24px] border border-black/[0.08] dark:border-white/5 bg-white/45 dark:bg-white/[0.015] backdrop-blur-md space-y-4 shadow-lg">
                <h3 className="text-xs uppercase font-black tracking-widest text-slate-400 dark:text-gray-500 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-500" />
                  <span>TOOLS & STACK DEPLOYED</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techList.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-2 rounded-lg text-[10px] font-black bg-gradient-to-r from-c-primary/10 to-c-accent/10 border border-c-primary/20 text-slate-700 dark:text-slate-200 shadow-sm uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Project Images Gallery */}
            {project.additionalImages && project.additionalImages.length > 0 && (
              <div className="p-6 sm:p-8 rounded-[24px] border border-black/[0.08] dark:border-white/5 bg-white/45 dark:bg-white/[0.015] backdrop-blur-md space-y-4 shadow-lg">
                <h3 className="text-xs uppercase font-black tracking-widest text-slate-400 dark:text-gray-500 flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-500" />
                  <span>ADDITIONAL PROJECT ASSETS</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {project.additionalImages.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => handleOpenPreview(img.imageUrl)}
                      className="relative group h-28 sm:h-32 rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/10 hover:border-purple-500/50 transition-all bg-white/40 dark:bg-c-card/25 backdrop-blur-md shadow-md cursor-pointer"
                    >
                      <img 
                        src={img.imageUrl} 
                        alt={`Additional ${i}`} 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106" 
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <span className="text-[9px] font-black text-white bg-black/70 border border-white/10 px-2.5 py-1.5 rounded-full select-none uppercase tracking-wider">
                          View Shot
                        </span>
                      </div>
                      <span className="absolute bottom-2 left-2 text-[8px] bg-[#06060c]/85 text-white font-bold select-none uppercase px-2 py-0.5 rounded-full border border-white/5">
                        Shot {i+1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Launch CTA Video Card */}
            <div className="rounded-[24px] border border-black/[0.08] dark:border-purple-500/25 bg-white/45 dark:bg-white/[0.015] backdrop-blur-md shadow-2xl overflow-hidden transition-all duration-500 hover:border-c-primary/30 group">
              {/* Looping Live Animation Engine Backdrop (Guaranteed Compatibility & Speed) */}
              <div className="relative w-full h-44 overflow-hidden bg-[#06060c] flex items-center justify-center border-b border-black/[0.08] dark:border-white/5">
                {/* A. Scanning Tech Grid Layout */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:14px_24px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06060c] via-transparent to-transparent pointer-events-none" />
                
                {/* B. Glowing Pulsating Energy Halos */}
                <div className="absolute w-[220px] h-[220px] rounded-full bg-c-primary/10 dark:bg-c-primary/20 blur-[50px] animate-pulse duration-[4000ms]" />
                <div className="absolute w-[200px] h-[200px] rounded-full bg-c-accent/10 dark:bg-c-accent/20 blur-[60px] animate-pulse duration-[6000ms]" />

                {/* C. Infinite Flowing Code Matrix Streams */}
                <div className="absolute inset-0 flex flex-col justify-start p-4 opacity-40 font-mono text-[8px] text-cyan-400 select-none overflow-hidden space-y-1">
                  <style>{`
                    @keyframes matrix-scroll {
                      0% { transform: translateY(0); }
                      100% { transform: translateY(-50%); }
                    }
                    .matrix-flow {
                      animation: matrix-scroll 14s linear infinite;
                    }
                  `}</style>
                  <div className="matrix-flow space-y-1">
                    <div>{`const project = new WebSolution();`}</div>
                    <div>{`project.setArchitecture('Clean');`}</div>
                    <div>{`project.addFeature('Performance');`}</div>
                    <div>{`project.addFeature('Security');`}</div>
                    <div>{`project.deployToCloud('Production');`}</div>
                    <div>{`console.log('System Active');`}</div>
                    <div>{`const project = new WebSolution();`}</div>
                    <div>{`project.setArchitecture('Clean');`}</div>
                    <div>{`project.addFeature('Performance');`}</div>
                    <div>{`project.addFeature('Security');`}</div>
                    <div>{`project.deployToCloud('Production');`}</div>
                    <div>{`console.log('System Active');`}</div>
                  </div>
                </div>

                {/* D. Spinning Vector Core Component */}
                <div className="relative z-10 flex flex-col items-center justify-center space-y-2">
                  <Cpu className="w-10 h-10 text-cyan-400 animate-spin duration-[15000ms] drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                    System Active
                  </span>
                </div>

                <span className="absolute top-4 left-4 text-[9px] bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 rounded-full text-white font-extrabold tracking-widest uppercase select-none shadow-lg animate-pulse">
                  Custom Build
                </span>
              </div>

              {/* Content Details */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black bg-gradient-to-r from-c-primary via-c-accent to-c-accent-2 bg-clip-text text-transparent">
                    Need same project?
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                    Get a custom-engineered web application built specifically for your business goals. Let's design, build, and deploy your vision with pixel-perfect precision.
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-c-primary via-c-accent to-c-accent-2 hover:from-c-primary hover:to-c-accent-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] text-white font-black text-xs rounded-xl shadow-lg transition-all duration-300 group/btn cursor-pointer"
                >
                  <span>Launch Your Project</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </motion.section>

      {/* Lightbox / preview popup for dynamic galleries */}
      <ImagePopup 
        isOpen={isPreviewOpen} 
        imageUrl={previewUrl} 
        onClose={() => setIsPreviewOpen(false)} 
      />

    </div>
  )
}

export default ProjectDetails
