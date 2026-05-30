import { useState, useEffect } from 'react'
import { Search, Compass, Layers, Code2, ShieldCheck, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'

const processSteps = [
  {
    title: "Discovery",
    icon: <Search className="w-8 h-8 text-[#39bdd3]" />,
    desc: "We begin by diving deep into your vision, business goals, and target audience to define a bulletproof project foundation.",
    features: [
      "Goal Alignment & Scoping",
      "Target Audience & User Research",
      "Competitor Market Analysis",
      "Technical Stack Consultation"
    ],
    color: "#39bdd3",
    gradient: "from-[#39bdd3]/25 to-blue-500/25",
    border: "border-[#39bdd3]/30 dark:border-[#39bdd3]/20",
    shadow: "shadow-[#39bdd3]/5"
  },
  {
    title: "Planning",
    icon: <Compass className="w-8 h-8 text-[#a855f7]" />,
    desc: "Creating a comprehensive, high-fidelity engineering roadmap, wireframing user flows, and mapping architecture frameworks.",
    features: [
      "Interactive User Flow Mapping",
      "Agile Backlog & Sprint Schedulers",
      "Database Schema Engineering",
      "API Integration Specifications"
    ],
    color: "#a855f7",
    gradient: "from-[#a855f7]/25 to-indigo-500/25",
    border: "border-[#a855f7]/30 dark:border-[#a855f7]/20",
    shadow: "shadow-[#a855f7]/5"
  },
  {
    title: "Design",
    icon: <Layers className="w-8 h-8 text-[#f97316]" />,
    desc: "Crafting beautiful interactive user interfaces with rich aesthetics, futuristic glassmorphism styles, and harmonious palettes.",
    features: [
      "Figma High-Fidelity Mockups",
      "Reflective Glassmorphism Layouts",
      "Typography & Theme Engineering",
      "Custom Visual Micro-animations"
    ],
    color: "#f97316",
    gradient: "from-[#f97316]/25 to-pink-500/25",
    border: "border-[#f97316]/30 dark:border-[#f97316]/20",
    shadow: "shadow-[#f97316]/5"
  },
  {
    title: "Development",
    icon: <Code2 className="w-8 h-8 text-[#3b82f6]" />,
    desc: "Writing high-speed React web modules, compiling robust server-side APIs, and building fluid layouts at 60fps.",
    features: [
      "Clean, Component-Driven React JS",
      "Futuristic GPU-Promoted CSS Effects",
      "Secure Backend REST/GraphQL APIs",
      "State Management Implementations"
    ],
    color: "#3b82f6",
    gradient: "from-[#3b82f6]/25 to-emerald-500/25",
    border: "border-[#3b82f6]/30 dark:border-[#3b82f6]/20",
    shadow: "shadow-[#3b82f6]/5"
  },
  {
    title: "Testing",
    icon: <ShieldCheck className="w-8 h-8 text-[#6366f1]" />,
    desc: "Executing rigid end-to-end testing, responsive breakpoint diagnostics, and detailed code validation protocols.",
    features: [
      "Comprehensive ESLint & Type Checks",
      "Cross-Browser Rendering Audits",
      "Responsive Touch & Layout Tests",
      "Lightweight Build Optimization"
    ],
    color: "#6366f1",
    gradient: "from-[#6366f1]/25 to-fuchsia-500/25",
    border: "border-[#6366f1]/30 dark:border-[#6366f1]/20",
    shadow: "shadow-[#6366f1]/5"
  },
  {
    title: "Launch",
    icon: <Rocket className="w-8 h-8 text-[#10b981]" />,
    desc: "Seamlessly launching your project into high-performance cloud clusters, validating live web vitals, and handing over assets.",
    features: [
      "Cloud Server & CDN Deployments",
      "Full Search Engine (SEO) Indexing",
      "Google Analytics Setup",
      "Comprehensive Documentation & Handover"
    ],
    color: "#10b981",
    gradient: "from-[#10b981]/25 to-teal-500/25",
    border: "border-[#10b981]/30 dark:border-[#10b981]/20",
    shadow: "shadow-[#10b981]/5"
  }
]

const Process = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto-cycling logic with smooth transitions
  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveStep((prev) => (prev + 1) % 6)
        setIsTransitioning(false)
      }, 350)
    }, 3000)

    return () => clearInterval(interval)
  }, [isHovered, activeStep])

  const handleStepClick = (idx) => {
    if (idx === activeStep) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveStep(idx)
      setIsTransitioning(false)
    }, 350)
  }

  const subtleFadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.section 
      id="process" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={subtleFadeUp}
      className="relative w-full pt-5 pb-12 sm:pt-5 sm:pb-16 select-none overflow-hidden border-b border-c-border"
    >
      
      {/* Volumetric Shifting Glow Backlights (Responsive sizing centered on page) */}
      <div 
        style={{ backgroundColor: processSteps[activeStep].color }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[900px] sm:h-[450px] rounded-full opacity-[0.06] dark:opacity-[0.04] blur-[90px] sm:blur-[150px] pointer-events-none z-1 transition-all duration-1000" 
      />

      <div className="max-w-7xl mx-auto px-4 md:px-5 lg:px-8 w-full relative z-20">
        
        {/* Section Heading Area (Minimal spacing) */}
        <div className="text-center space-y-3 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-c-border bg-c-card/85 text-xs font-bold text-c-accent uppercase tracking-wider select-none shadow-[0_0_15px_rgba(34,211,238,0.05)]">
            My Process
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-c-text">
            How I Work
          </h2>
          <p className="text-c-sec-text max-w-lg mx-auto text-base sm:text-lg font-medium leading-relaxed">
            A dynamic, high-fidelity engineering roadmap designed to transform complex ideas into robust, launch-ready solutions.
          </p>
        </div>

        {/* 1. Concentric Glass Horizontal Process Flow bar (Minimal compact margin) */}
        <div className="relative p-1.5 rounded-[32px] sm:rounded-[40px] border border-black/[0.04] dark:border-white/[0.06] bg-black/[0.003] dark:bg-white/[0.002] shadow-[0_15px_30px_rgba(0,0,0,0.01),inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-md mb-6 sm:mb-8">
          <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 p-2 sm:p-3 rounded-[24px] sm:rounded-[32px] border border-black/[0.05] dark:border-white/[0.1] bg-white/45 dark:bg-white/[0.015] overflow-hidden z-10">
            
            {/* Sliding Glowing active step indicator underneath */}
            <div 
              style={{ 
                left: `${(activeStep / 6) * 100}%`,
                width: '16.6666%',
                backgroundColor: processSteps[activeStep].color,
                boxShadow: `0 0 35px ${processSteps[activeStep].color}`
              }}
              className="absolute top-0 bottom-0 rounded-2xl opacity-10 dark:opacity-[0.08] transition-all duration-700 ease-out hidden lg:block"
            />

            {processSteps.map((step, idx) => {
              const isActive = idx === activeStep
              return (
                <button
                  key={step.title}
                  onClick={() => handleStepClick(idx)}
                  className={`flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl transition-all duration-500 cursor-pointer relative z-20 group outline-none ${
                    isActive 
                      ? 'bg-c-card/90 lg:bg-transparent shadow-[0_8px_20px_rgba(0,0,0,0.02)] lg:shadow-none scale-102 font-bold' 
                      : 'hover:bg-c-card/30 scale-100 font-semibold'
                  }`}
                >
                  <div 
                    style={{ 
                      borderColor: isActive ? step.color : 'transparent',
                      backgroundColor: isActive ? `${step.color}15` : 'rgba(255,255,255,0.02)'
                    }}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all duration-500 flex-shrink-0"
                  >
                    {isActive ? step.icon : <div className="w-2.5 h-2.5 rounded-full bg-c-sec-text/40 group-hover:bg-c-text/60 transition-all duration-300" />}
                  </div>
                  <span className={`text-xs sm:text-sm md:text-base tracking-wide transition-colors duration-500 ${isActive ? 'text-c-text' : 'text-c-sec-text group-hover:text-c-text'}`}>
                    {step.title}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 2. Content Layout: Two-column grid (Reduced gaps) */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch"
        >
          
          {/* Left Side: Active Step Details (Slides in smoothly) */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-4 sm:space-y-6">
            <div className={`space-y-3 transition-all duration-500 transform ${isTransitioning ? 'opacity-0 -translate-x-6' : 'opacity-100 translate-x-0'}`}>
              <div 
                style={{ color: processSteps[activeStep].color }}
                className="text-sm font-bold uppercase tracking-widest"
              >
                Step 0{activeStep + 1} &mdash; {processSteps[activeStep].title}
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-c-text">
                {processSteps[activeStep].title} Stage
              </h3>
              <p className="text-c-sec-text text-base sm:text-lg font-medium leading-relaxed font-sans">
                {processSteps[activeStep].desc}
              </p>
            </div>

            {/* Checklist items list */}
            <div className={`space-y-4 transition-all duration-500 transform delay-100 ${isTransitioning ? 'opacity-0 -translate-x-6' : 'opacity-100 translate-x-0'}`}>
              <h4 className="text-sm font-bold uppercase text-c-sec-text tracking-wide mb-3">Key Focus Areas:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {processSteps[activeStep].features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    <div 
                      style={{ backgroundColor: `${processSteps[activeStep].color}20`, borderColor: `${processSteps[activeStep].color}40` }}
                      className="w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0"
                    >
                      <div 
                        style={{ backgroundColor: processSteps[activeStep].color }}
                        className="w-1.5 h-1.5 rounded-full" 
                      />
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-c-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Dynamic Concentric Glass Graphic Box */}
          <div className="lg:col-span-6 flex items-center justify-center">
            
            {/* Outer Ring */}
            <div 
              style={{ borderColor: `${processSteps[activeStep].color}15` }}
              className={`w-full max-w-md p-2 rounded-[32px] border bg-black/[0.005] dark:bg-white/[0.003] transition-all duration-700 ease-out transform ${
                isTransitioning ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
              }`}
            >
              
              {/* Middle Ring */}
              <div 
                style={{ borderColor: `${processSteps[activeStep].color}25` }}
                className="p-2 rounded-[24px] border bg-black/[0.008] dark:bg-white/[0.005]"
              >
                
                {/* Inner Core Card (Compact padding & heights) */}
                <div 
                  style={{ borderColor: `${processSteps[activeStep].color}35` }}
                  className="relative p-4 sm:p-8 rounded-[16px] border bg-white/45 dark:bg-white/[0.015] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col items-center justify-center text-center space-y-4 min-h-[260px] sm:min-h-[300px]"
                >
                  
                  {/* Dynamic Shifting Layered Background Gradients */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-tr ${processSteps[activeStep].gradient} opacity-90 transition-all duration-700 pointer-events-none`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none" />

                  {/* Corner ambient neon glares inside the card */}
                  <div 
                    style={{ backgroundColor: processSteps[activeStep].color }}
                    className="absolute -top-16 -left-16 w-32 h-32 rounded-full opacity-[0.12] blur-2xl pointer-events-none" 
                  />
                  <div 
                    style={{ backgroundColor: processSteps[activeStep].color }}
                    className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full opacity-[0.12] blur-2xl pointer-events-none" 
                  />

                  {/* Shifter floating glass graphic */}
                  <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-3xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 shadow-[0_12px_30px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-md flex items-center justify-center hover:scale-108 hover:rotate-6 transition-all duration-500 cursor-default group/icon select-none">
                    <div className="transform group-hover/icon:scale-110 group-hover/icon:-translate-y-1 transition-all duration-500">
                      {processSteps[activeStep].icon}
                    </div>
                  </div>

                  <div className="relative z-10 space-y-2 select-none">
                    <span 
                      style={{ color: processSteps[activeStep].color }}
                      className="text-xs font-bold uppercase tracking-widest"
                    >
                      Process Phase {activeStep + 1}
                    </span>
                    <h5 className="text-2xl sm:text-3xl font-black text-c-text tracking-tight">
                      {processSteps[activeStep].title}
                    </h5>
                  </div>
                  
                </div>
              </div>
            </div>
            
          </div>

        </div>

      </div>
    </motion.section>
  )
}

export default Process
