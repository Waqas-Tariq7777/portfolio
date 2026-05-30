import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Calendar, Clock, ChevronLeft, ArrowRight, User, Sparkles, Share2, Heart, BookOpen, AlertCircle } from 'lucide-react'
import { blogData } from '../data/blogData'

const BlogDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeHeading, setActiveHeading] = useState(0)

  const blog = blogData.find((b) => b.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  // Scroll Spy for Table of Contents
  useEffect(() => {
    if (!blog) return
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      const headingElements = blog.sections.map((_, idx) => document.getElementById(`sec-${idx}`))
      
      let currentActive = 0
      headingElements.forEach((el, idx) => {
        if (el && el.offsetTop <= scrollPosition) {
          currentActive = idx
        }
      })
      setActiveHeading(currentActive)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [blog])

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-[#FAF9F6] dark:bg-[#0A0A0F]">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">Blog Post Not Found</h2>
        <Link to="/blogs" className="text-c-primary font-bold hover:underline flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Back to Blogs
        </Link>
      </div>
    )
  }

  // Get 3 related blogs
  const relatedBlogs = blogData
    .filter((b) => b.id !== blog.id)
    .sort((a, b) => (b.category === blog.category ? 1 : -1))
    .slice(0, 3)

  // Markdown parsing helper for safe rich formatting without raw star characters
  const parseInline = (text) => {
    if (!text) return "";
    
    const parts = [];
    let currentIndex = 0;
    
    // Regex to match **bold** text
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;
    
    while ((match = boldRegex.exec(text)) !== null) {
      const textBefore = text.substring(currentIndex, match.index);
      if (textBefore) {
        // Strip out single stars from regular text parts
        parts.push(textBefore.replace(/\*/g, ''));
      }
      parts.push(
        <strong key={match.index} className="font-extrabold text-slate-900 dark:text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-c-primary bg-clip-text text-transparent dark:from-purple-400 dark:via-indigo-400 dark:to-c-primary">
          {match[1]}
        </strong>
      );
      currentIndex = boldRegex.lastIndex;
    }
    
    const textRemaining = text.substring(currentIndex);
    if (textRemaining) {
      parts.push(textRemaining.replace(/\*/g, ''));
    }
    
    return parts;
  };

  const renderBlock = (content) => {
    if (!content) return null;

    // Check if the block is a markdown table
    if (content.includes('|') && content.split('\n').some(line => line.includes('---'))) {
      const lines = content.split('\n').map(l => l.trim()).filter(l => l !== "");
      const headerLine = lines[0];
      const dataLines = lines.slice(1).filter(l => !l.includes('---') && l.includes('|'));

      const parseRow = (rowText) => {
        return rowText
          .split('|')
          .map(cell => cell.trim())
          .filter((cell, idx, arr) => idx > 0 && idx < arr.length - 1);
      };

      const headers = parseRow(headerLine);
      const rows = dataLines.map(line => parseRow(line));

      return (
        <div className="w-full my-5 overflow-hidden rounded-2xl border border-slate-200/50 dark:border-white/5 shadow-xl bg-white/60 dark:bg-white/[0.015] backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[550px]">
              <thead>
                <tr className="bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-c-primary/10 border-b border-slate-200/50 dark:border-white/5">
                  {headers.map((h, i) => (
                    <th key={i} className="px-6 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800 dark:text-white">
                      {parseInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/40 dark:divide-white/5">
                {rows.map((row, rowIndex) => (
                  <tr 
                    key={rowIndex} 
                    className="hover:bg-purple-500/5 dark:hover:bg-purple-500/10 transition-colors odd:bg-slate-50/20 even:bg-white/40 dark:odd:bg-white/[0.005] dark:even:bg-white/[0.02]"
                  >
                    {row.map((cell, colIndex) => (
                      <td key={colIndex} className="px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-600 dark:text-c-sec-text">
                        {parseInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // Code blocks rendering
    if (content.trim().startsWith('```')) {
      const lines = content.trim().split('\n');
      const firstLine = lines[0];
      const language = firstLine.replace('```', '').trim() || 'code';
      const code = lines.slice(1, -1).join('\n');
      return (
        <div className="relative my-5 rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/10 bg-slate-950 shadow-2xl">
          <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-slate-800/80">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{language}</span>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(code)
                alert("Code copied to clipboard!")
              }}
              className="text-[10px] font-bold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            >
              Copy Code
            </button>
          </div>
          <pre className="p-5 overflow-x-auto text-xs font-mono text-slate-100 leading-relaxed">
            <code>{code}</code>
          </pre>
        </div>
      );
    }

    // Quotes and Callouts
    if (content.trim().startsWith('>')) {
      const cleanQuote = content.replace(/^>\s*/, '').trim();
      return (
        <div className="relative p-5 sm:p-6 my-5 rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-c-primary/10 border-l-4 border-purple-500 dark:border-purple-400 shadow-md backdrop-blur-xl flex gap-4 items-start">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 shrink-0">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 leading-relaxed italic">
            {parseInline(cleanQuote)}
          </div>
        </div>
      );
    }

    // Handle customized list render
    const lines = content.split('\n');
    const hasBullets = lines.some(line => line.trim().startsWith('* ') || line.trim().startsWith('- '));
    if (hasBullets) {
      const listItems = [];
      lines.forEach((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          listItems.push(trimmed.replace(/^[\*\-]\s*/, ''));
        }
      });

      if (listItems.length > 0) {
        return (
          <ul className="space-y-3.5 my-5 pl-1 list-none">
            {listItems.map((item, index) => (
              <li key={index} className="flex gap-3 items-start text-sm sm:text-base font-semibold text-slate-700 dark:text-c-sec-text">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 mt-2.5 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.5)] animate-pulse" />
                <span>{parseInline(item)}</span>
              </li>
            ))}
          </ul>
        );
      }
    }

    // Regular styled paragraph
    return (
      <p className="text-sm sm:text-base font-semibold text-slate-700 dark:text-c-sec-text leading-relaxed whitespace-pre-line my-3">
        {parseInline(content)}
      </p>
    );
  };

  return (
    <div className="w-full text-slate-800 dark:text-c-text select-none overflow-hidden pb-24 bg-gradient-to-tr from-[#FAF9F6] via-[#F4F3EE] to-[#EAECE9] dark:from-[#08080C] dark:via-[#0E0E15] dark:to-[#050508] min-h-screen pt-28 relative">


      {/* Premium Immersive Background Glow Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[5%] left-[-10%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 dark:from-purple-600/10 dark:to-indigo-600/10 blur-[130px] animate-pulse duration-[8000ms]" />
        <div className="absolute top-[35%] right-[-10%] w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-cyan-500/15 to-blue-500/15 dark:from-cyan-600/10 dark:to-blue-600/10 blur-[150px] animate-pulse duration-[10000ms] delay-2000" />
        <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-pink-500/15 to-purple-500/15 dark:from-pink-600/5 dark:to-purple-600/5 blur-[140px] animate-pulse duration-[9000ms] delay-1000" />
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left relative z-10">

        {/* Back navigation & interactive control shelf */}
        <div className="flex items-center justify-between">
          <Link 
            to="/blogs" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-500 hover:text-c-primary dark:text-slate-400 dark:hover:text-c-primary transition-colors cursor-pointer group"
          >
            <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Hub</span>
          </Link>
        </div>

        {/* Article Meta Header */}
        <div 
          className="space-y-5"
        >
          <span className="inline-flex items-center gap-1.5 text-[10px] bg-gradient-to-r from-purple-500/10 to-indigo-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 px-3.5 py-1 rounded-full font-black tracking-widest uppercase shadow-sm">
            <BookOpen className="w-3 h-3 text-purple-500" />
            {blog.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-c-primary via-c-accent to-c-accent-2 bg-clip-text text-transparent leading-tight tracking-tight pb-1">
            {blog.title}
          </h1>

          {/* Author info & metadata plate */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 border-b border-slate-200/60 dark:border-white/5 pb-6">
            <div className="flex items-center gap-3">
              <img 
                src={blog.author.avatar} 
                alt={blog.author.name} 
                className="w-12 h-12 rounded-full object-cover object-top border-2 border-purple-500/30 shadow-md"
              />
              <div>
                <p className="text-sm font-extrabold text-slate-800 dark:text-white">{blog.author.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-gray-400 font-bold">{blog.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold text-slate-500 dark:text-gray-400 border-l border-slate-200 dark:border-white/10 pl-4 sm:pl-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-500" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span>{blog.readingTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Beautiful Floating Featured Image */}
        {blog.imageUrl && (
          <div 
            className="relative w-full h-[280px] sm:h-[480px] rounded-[32px] overflow-hidden border border-slate-200/60 dark:border-white/10 bg-black/5 dark:bg-black/20 shadow-2xl group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
            <img 
              src={blog.imageUrl} 
              alt={blog.title} 
              className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-all duration-700"
            />
          </div>
        )}

        {/* Article Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4 items-start">
          
          {/* LEFT COLUMN: Longform Text Content Column (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-6 text-left leading-relaxed">
            {blog.sections.map((sec, idx) => (
              <section 
                key={idx} 
                id={`sec-${idx}`}
                className="space-y-2 scroll-mt-24 border-b border-slate-100/50 dark:border-white/[0.02] pb-5 last:border-none last:pb-0"
              >
                <h2 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-c-primary via-c-accent to-c-accent-2 bg-clip-text text-transparent font-sans tracking-tight pb-1">
                  {sec.heading}
                </h2>
                <div className="text-slate-700 dark:text-c-sec-text">
                  {renderBlock(sec.content)}
                </div>
              </section>
            ))}
          </div>

          {/* RIGHT COLUMN: Table of Contents, Related Articles & Sidebar widgets (lg:col-span-4) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-8">
            
            {/* Widget 1: Table of Contents */}
            <div className="p-6 rounded-[24px] border border-slate-200/50 dark:border-white/5 bg-white/40 dark:bg-white/[0.015] backdrop-blur-xl shadow-xl text-left space-y-5">
              <h4 className="text-xs uppercase font-black text-slate-400 dark:text-gray-500 tracking-widest border-b border-slate-200/50 dark:border-white/5 pb-3 flex items-center gap-2">
                <span className="w-1.5 h-3 rounded bg-purple-500" />
                Table of Contents
              </h4>
              <ul className="space-y-3">
                {blog.sections.map((sec, idx) => {
                  const headingText = sec.heading.replace(/^\d+\.\s*/, '');
                  const isActive = activeHeading === idx;
                  return (
                    <li key={idx}>
                      <a 
                        href={`#sec-${idx}`}
                        className={`text-xs font-bold transition-all block py-1 border-l-2 pl-3 ${
                          isActive 
                            ? "text-c-primary border-c-primary font-black translate-x-1" 
                            : "text-slate-600 dark:text-slate-400 border-transparent hover:text-c-primary hover:border-c-primary/30"
                        }`}
                      >
                        {idx + 1}. {headingText}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Widget 2: Sidebar Related Articles Stack */}
            <div className="p-6 rounded-[24px] border border-slate-200/50 dark:border-white/5 bg-white/40 dark:bg-white/[0.015] backdrop-blur-xl shadow-xl text-left space-y-5">
              <h4 className="text-xs uppercase font-black text-slate-400 dark:text-gray-500 tracking-widest border-b border-slate-200/50 dark:border-white/5 pb-3 flex items-center gap-2">
                <span className="w-1.5 h-3 rounded bg-indigo-500" />
                Related Reads
              </h4>
              <div className="space-y-4">
                {relatedBlogs.map((rel) => (
                  <Link 
                    key={rel.id} 
                    to={`/blogs/${rel.id}`}
                    className="flex gap-3 group items-center p-2.5 rounded-xl border border-transparent hover:border-c-primary/10 hover:bg-purple-500/5 dark:hover:bg-purple-500/10 transition-all duration-300"
                  >
                    {rel.imageUrl && (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-black/5 dark:bg-black/20 shadow-inner">
                        <img src={rel.imageUrl} alt={rel.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500" />
                      </div>
                    )}
                    <div className="space-y-1 overflow-hidden">
                      <span className="inline-block text-[7px] bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/10 px-2 py-0.5 rounded font-black tracking-widest uppercase">
                        {rel.category}
                      </span>
                      <h5 className="text-xs font-black text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-c-primary transition-colors">
                        {rel.title}
                      </h5>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Widget 3: Article Metadata Insights Highlights card */}
            <div className="p-6 rounded-[24px] border border-slate-200/50 dark:border-white/5 bg-gradient-to-br from-purple-500/5 via-indigo-500/5 to-c-primary/5 dark:from-purple-500/[0.02] dark:via-indigo-500/[0.02] dark:to-c-primary/[0.02] backdrop-blur-xl shadow-xl text-left space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/10 to-transparent blur-xl pointer-events-none" />
              <h4 className="text-xs uppercase font-black text-slate-400 dark:text-gray-500 tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-3 rounded bg-c-accent" />
                Quick Highlights
              </h4>
              <div className="space-y-3.5">
                <div className="flex justify-between items-center text-xs font-bold border-b border-slate-200/40 dark:border-white/5 pb-2">
                  <span className="text-slate-400">Target Audience</span>
                  <span className="text-slate-800 dark:text-white">Web Engineers</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold border-b border-slate-200/40 dark:border-white/5 pb-2">
                  <span className="text-slate-400">Topic Scope</span>
                  <span className="text-slate-800 dark:text-white">Career & Skills</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold border-b border-slate-200/40 dark:border-white/5 pb-2">
                  <span className="text-slate-400">Language Stack</span>
                  <span className="text-slate-800 dark:text-white">JS / TS / Node</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-400">Level</span>
                  <span className="text-slate-800 dark:text-white bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/10 px-2 py-0.5 rounded font-black tracking-widest uppercase">Intermediate</span>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  alert("Article link copied!")
                }}
                className="w-full mt-2 py-2.5 bg-gradient-to-r from-c-primary to-c-accent text-white font-black text-xs rounded-xl shadow-md hover:shadow-purple-500/20 active:scale-98 transition-all cursor-pointer text-center flex items-center justify-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy Share Link</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default BlogDetails

