import React, { useState, useEffect, useRef } from 'react'
import { useExperienceStore } from '../Store/experienceStore'
import { useCertificateStore } from '../Store/certificateStore'
import { 
  ArrowUpRight, Award, Briefcase, Code, CheckCircle, Cpu, ShieldCheck, 
  Clock, BookOpen, Trophy, Loader2, Database, Globe, Lock, Brain, 
  Search, Layout, ShoppingBag, Terminal, Server, Send, Atom, FileCode 
} from 'lucide-react'
import { motion } from 'framer-motion'
import aboutBg from '../assets/images/about_bg.png'
import myImage from '../assets/images/myImage.png'
import ImagePopup from '../Components/ImagePopup'

const About = () => {
  const { experiences, fetchExperiences, loading } = useExperienceStore();
  const { certificates, fetchCertificates, loading: certLoading } = useCertificateStore();
  const [activeTab, setActiveTab] = useState("experience");
  const [popupImage, setPopupImage] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);
  const techSectionRef = useRef(null);

  useEffect(() => {
    fetchExperiences();
    fetchCertificates();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateProgress(true);
        } else {
          setAnimateProgress(false);
        }
      },
      { threshold: 0.1 }
    );

    if (techSectionRef.current) {
      observer.observe(techSectionRef.current);
    }

    return () => {
      if (techSectionRef.current) {
        observer.unobserve(techSectionRef.current);
      }
    };
  }, []);

  const handleImageClick = (imageUrl) => {
    setPopupImage(imageUrl);
    setIsPopupOpen(true);
  };

  const subtleFadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const stats = [
    { label: "Years Experience", value: "4+", icon: <Award className="w-5 h-5 text-c-primary" /> },
    { label: "Completed Projects", value: "100+", icon: <Briefcase className="w-5 h-5 text-c-accent" /> },
    { label: "Client Satisfaction", value: "99%", icon: <CheckCircle className="w-5 h-5 text-c-accent-2" /> },
    { label: "On-Time Delivery", value: "100%", icon: <ShieldCheck className="w-5 h-5 text-emerald-400" /> }
  ]

  const techStack = [
    { name: "HTML", level: 98, icon: <Code className="w-5 h-5 text-orange-500" /> },
    { name: "CSS", level: 95, icon: <Layout className="w-5 h-5 text-blue-500" /> },
    { name: "Bootstrap", level: 92, icon: <Cpu className="w-5 h-5 text-purple-600" /> },
    { name: "Tailwind CSS", level: 96, icon: <Globe className="w-5 h-5 text-cyan-400" /> },
    { name: "JavaScript", level: 95, icon: <FileCode className="w-5 h-5 text-yellow-500" /> },
    { name: "React", level: 94, icon: <Atom className="w-5 h-5 text-cyan-500" /> },
    { name: "Node JS", level: 90, icon: <Server className="w-5 h-5 text-green-600" /> },
    { name: "Express JS", level: 88, icon: <Terminal className="w-5 h-5 text-slate-400" /> },
    { name: "Postman", level: 92, icon: <Send className="w-5 h-5 text-orange-600" /> },
    { name: "REST APIs", level: 94, icon: <Globe className="w-5 h-5 text-blue-400" /> },
    { name: "JWT", level: 90, icon: <Lock className="w-5 h-5 text-indigo-500" /> },
    { name: "Problem Solving", level: 92, icon: <Brain className="w-5 h-5 text-pink-500" /> },
    { name: "SEO Optimization", level: 88, icon: <Search className="w-5 h-5 text-emerald-500" /> },
    { name: "WordPress", level: 90, icon: <Layout className="w-5 h-5 text-sky-600" /> },
    { name: "MySQL", level: 88, icon: <Database className="w-5 h-5 text-blue-600" /> },
    { name: "MongoDB", level: 92, icon: <Database className="w-5 h-5 text-green-500" /> },
    { name: "E-Commerce Store", level: 94, icon: <ShoppingBag className="w-5 h-5 text-rose-500" /> }
  ]

  const education = [
    {
      year: "2022-2026",
      degree: "Bachelor in Software engineering",
      institution: "Mirpur university of science and technology(MUST)",
      desc: "Acquired deep technical knowledge in software engineering methodologies, software architecture, data structures, and database systems, achieving an outstanding 3.9 CGPA."
    },
    {
      year: "2018-2020",
      degree: "Intermediate",
      institution: "Pak kashmir institue of computer sciences mirpur ajk",
      desc: "Completed Intermediate pre-engineering studies with an A+ grade, specializing in computer science fundamentals and academic excellence."
    }
  ]

  return (
    <div className="w-full text-slate-800 dark:text-c-text select-none overflow-hidden pb-16">
      
      {/* 1. Header Hero Banner Section */}
      <section 
         style={{ 
          backgroundImage: `url(${aboutBg})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
        className="relative w-full min-h-[380px] sm:min-h-[460px] flex items-center pt-24 pb-16 overflow-hidden border-b border-slate-200 dark:border-none"
      >
        {/* Parallax adaptive dark overlay tuned perfectly for the neutral silver background image */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/55 to-[#FAF9F6] dark:from-[#06060c]/80 dark:via-[#06060c]/90 dark:to-[#0A0A0F] backdrop-blur-[0.5px] z-1" />

        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-c-primary/10 rounded-full blur-[100px] pointer-events-none z-1" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] bg-c-accent/10 rounded-full blur-[110px] pointer-events-none z-1" />

        {/* Banner Content Container */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={subtleFadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-left space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/5 text-xs font-bold text-c-accent uppercase tracking-wider shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            Explore My Story
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900 dark:text-c-text">
            My Journey & <br />
            <span className="bg-gradient-to-r from-c-primary via-c-accent to-c-accent-2 bg-clip-text text-transparent">
              Professional Expertise
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-c-sec-text max-w-2xl leading-relaxed font-semibold">
            I’m Waqas Tariq, a Senior Web Architect and Fullstack Engineer. I specialize in designing lightning-fast frontend architectures, highly secure REST/GraphQL API systems, and bespoke e-commerce store solutions tailored for conversions and scalable business growth.
          </p>
        </motion.div>
      </section>

      {/* 2. Core content Grid */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={subtleFadeUp}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 w-full relative z-10 text-left"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Left Block: Photo Card & Client Metrics */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative group max-w-md mx-auto w-full">
              {/* Backlight halo glow */}
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-c-primary to-c-accent opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />
              
              {/* Frosted glassy frame */}
              <div className="relative p-3 rounded-[32px] border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-[#1A1A2E]/30 shadow-2xl backdrop-blur-md transition-all duration-700 group-hover:scale-102 group-hover:rotate-[0.5deg] group-hover:border-c-primary/30 overflow-hidden">
                <img 
                  src={myImage} 
                  alt="Waqas Tariq" 
                  className="w-full h-[320px] sm:h-[400px] object-cover rounded-2xl select-none pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Right Block: Journey Bio & Skills Indicators */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Story description */}
            <div className="space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-c-text">
                Every great project begins with an even better solution.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-c-sec-text leading-relaxed font-semibold">
                I’m a creative and detail driven Web Developer who thrives on turning ideas into meaningful digital experiences. My focus is on building websites that are not only visually appealing but also intuitive, fast, and aligned with the goals of the people I work with. Whether it’s a business site, a custom dashboard, or a complete redesign, I aim to create solutions that truly make a difference.
              </p>
              <p className="text-base sm:text-lg text-slate-600 dark:text-c-sec-text leading-relaxed font-semibold">
                What defines my approach is a deep sense of ownership in every project. I believe in listening first, building with purpose, and delivering results that stand the test of time. Outside of client work, I enjoy sharing knowledge on social media, helping others understand and appreciate the power of good design and development. I’m continuously learning and growing, exploring new technologies and better ways to serve those who trust me with their vision.
              </p>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 2.5 Technology Stack Section */}
      <motion.section 
        ref={techSectionRef} 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={subtleFadeUp}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 sm:mt-32 w-full relative z-10 text-left"
      >
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/5 text-xs font-bold text-c-primary uppercase tracking-wider">
            Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-c-text">
            My Technology Stack
          </h2>
          <p className="text-slate-500 dark:text-c-sec-text text-sm sm:text-base font-semibold max-w-lg mx-auto">
            A comprehensive overview of my technical expertise, frameworks, tools, and hands-on skill proficiencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {techStack.map((tech, idx) => (
            <div 
              key={idx}
              className="relative p-5 rounded-2xl border border-slate-200/60 dark:border-white/5 bg-white/50 dark:bg-c-card/20 backdrop-blur-xl hover:border-c-primary/20 dark:hover:border-c-primary/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
            >
              {/* Backlight halo glow */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-c-primary/0 to-c-accent/0 opacity-0 group-hover:opacity-100 group-hover:from-c-primary/5 group-hover:to-c-accent/5 blur-md transition-all duration-500 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                {/* Header: Icon, Name and Percentage */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 group-hover:bg-c-primary/10 group-hover:border-c-primary/20 transition-all duration-300">
                      {tech.icon}
                    </div>
                    <span className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-c-text group-hover:text-c-primary transition-colors duration-300">
                      {tech.name}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-black text-c-accent-2 bg-c-accent-2/5 px-2.5 py-1 rounded-lg border border-c-accent-2/10 shadow-sm">
                    {tech.level}%
                  </span>
                </div>

                {/* Progress bar track */}
                <div className="w-full bg-slate-100 dark:bg-white/5 h-2.5 rounded-full overflow-hidden border border-slate-200/20 dark:border-white/5">
                  <div 
                    style={{ width: animateProgress ? `${tech.level}%` : '0%' }}
                    className="bg-gradient-to-r from-c-primary via-c-accent to-c-accent-2 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(57,189,211,0.3)]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 3. Professional Journey Timeline Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={subtleFadeUp}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 sm:mt-32 w-full relative z-10 text-left"
      >
        {/* Live dynamic flowing smoke effect (#39bdd3) */}
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
          <div className="absolute top-[35%] left-[45%] w-[450px] h-[450px] bg-[#39bdd3]/20 dark:bg-[#39bdd3]/12 blur-[100px] smoke-blob-1 pointer-events-none" />
          <div className="absolute top-[50%] left-[55%] w-[500px] h-[500px] bg-[#39bdd3]/15 dark:bg-[#39bdd3]/10 blur-[125px] smoke-blob-2 pointer-events-none" />
          <div className="absolute top-[65%] left-[35%] w-[400px] h-[400px] bg-[#39bdd3]/20 dark:bg-[#39bdd3]/12 blur-[100px] smoke-blob-3 pointer-events-none" />
        </div>

        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/5 text-xs font-bold text-c-accent-2 uppercase tracking-wider">
            Milestones
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-c-text">
            My Professional Highlights
          </h2>
          <p className="text-slate-500 dark:text-c-sec-text text-sm sm:text-base font-semibold max-w-lg mx-auto">
            Explore a comprehensive layout of my work experience, certified academic training, and achievements.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center items-center gap-3 mb-12 flex-wrap relative z-20">
          <button
            onClick={() => setActiveTab("experience")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer ${
              activeTab === "experience"
                ? "bg-gradient-to-r from-c-primary to-c-accent text-white shadow-lg shadow-purple-500/20"
                : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Experience
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer ${
              activeTab === "education"
                ? "bg-gradient-to-r from-c-primary to-c-accent text-white shadow-lg shadow-purple-500/20"
                : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Education
          </button>
          <button
            onClick={() => setActiveTab("achievements")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer ${
              activeTab === "achievements"
                ? "bg-gradient-to-r from-c-primary to-c-accent text-white shadow-lg shadow-purple-500/20"
                : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10"
            }`}
          >
            <Trophy className="w-4 h-4" />
            Achievements
          </button>
        </div>

        {/* Centralized Chronological Tree Container */}
        <div className="relative max-w-5xl mx-auto py-12 px-4">
          
          {/* Vertical central trunk line (glowing gradient) */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-c-primary via-c-accent to-c-accent-2 rounded-full z-10" />

          {/* Combined milestones logic */}
          {(() => {
            const combinedMilestones = [
              ...experiences.map((exp) => ({
                id: exp._id,
                startDate: exp.startDate,
                endDate: exp.endDate,
                title: exp.title,
                companyName: exp.companyName,
                description: exp.description,
                technologies: exp.technologies,
                type: "experience"
              })),
              ...education.map((edu, idx) => ({
                id: `edu-${idx}`,
                startDate: edu.year,
                endDate: "",
                title: edu.degree,
                companyName: edu.institution,
                description: edu.desc,
                technologies: [],
                type: "education"
              })),
              ...certificates.map((cert) => ({
                id: cert._id,
                startDate: cert.createdAt ? new Date(cert.createdAt).getFullYear().toString() : new Date().getFullYear().toString(),
                endDate: "",
                title: cert.title,
                companyName: "Certified Achievement",
                description: cert.description,
                imageUrl: cert.imageUrl,
                technologies: [],
                type: "achievements"
              }))
            ].filter((item) => item.type === activeTab)
            .sort((a, b) => {
              const aYear = parseInt(a.startDate?.toString().match(/\d+/)?.[0] || "0", 10);
              const bYear = parseInt(b.startDate?.toString().match(/\d+/)?.[0] || "0", 10);
              return bYear - aYear; // Descending chronological order
            });

            if ((loading || certLoading) && experiences.length === 0 && certificates.length === 0) {
              return (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-c-primary" />
                </div>
              );
            }

            if (combinedMilestones.length === 0) {
              return (
                <p className="text-center text-slate-500 dark:text-slate-400 py-12">No milestones loaded.</p>
              );
            }

            return (
              <div className="space-y-12">
                {combinedMilestones.map((item, idx) => {
                  const isLeft = idx % 2 === 0;
                  
                  // Set unique accent colors according to milestone type
                  let typeBadgeColor = "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
                  let typeIcon = <Briefcase className="w-4 h-4 text-purple-500" />;
                  if (item.type === "education") {
                    typeBadgeColor = "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20";
                    typeIcon = <BookOpen className="w-4 h-4 text-cyan-500" />;
                  } else if (item.type === "achievements") {
                    typeBadgeColor = "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
                    typeIcon = <Trophy className="w-4 h-4 text-orange-500" />;
                  }

                  return (
                    <div 
                      key={item.id} 
                      className={`relative flex flex-col md:flex-row items-center justify-between ${
                        isLeft ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      {/* 1. Empty balance container to push active card to side */}
                      <div className="w-full md:w-[46%]" />

                      {/* 2. Pulsing trunk junction node anchor */}
                      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FAF9F6] dark:bg-[#0A0A0F] border-4 border-c-accent flex items-center justify-center z-20 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-c-primary to-c-accent" />
                      </div>

                      {/* 3. Branch Card */}
                      <div className="w-full md:w-[46%] pl-12 md:pl-0">
                        <div className="relative rounded-2xl border border-slate-200/80 dark:border-purple-500/20 bg-white/70 dark:bg-c-card/35 backdrop-blur-xl hover:border-purple-500/30 dark:hover:border-purple-500/25 shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-500 group overflow-hidden">
                          
                          {/* Horizontal connecting branch line to central trunk */}
                          <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-[8.7%] h-0.5 bg-gradient-to-r ${
                            isLeft 
                              ? "left-full from-c-accent to-c-primary" 
                              : "right-full from-c-primary to-c-accent"
                          }`} />

                          {/* Certificate image thumbnail - full width at the top (compact height) */}
                          {item.imageUrl && (
                            <div 
                              onClick={() => handleImageClick(item.imageUrl)}
                              className="relative cursor-pointer overflow-hidden border-b border-slate-200/80 dark:border-white/10 w-full h-36 sm:h-40"
                            >
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                <span className="text-xs font-bold text-white bg-black/60 px-3 py-1.5 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                                  View Certificate
                                </span>
                              </div>
                            </div>
                          )}

                          <div className="p-4 sm:p-5 space-y-3">
                            {/* Header details */}
                            <div className="flex items-center justify-between gap-3 flex-wrap">
                              {item.type !== "achievements" && (
                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase text-c-accent-2 tracking-widest bg-c-accent-2/10 px-2.5 py-0.5 rounded-full border border-c-accent-2/20">
                                  <Clock className="w-3 h-3 shrink-0" />
                                  {item.endDate ? `${item.startDate} – ${item.endDate}` : item.startDate}
                                </span>
                              )}
                              
                              <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${typeBadgeColor} ${item.type === "achievements" ? "ml-auto" : ""}`}>
                                {typeIcon}
                                {item.type}
                              </span>
                            </div>

                            {/* Title & Company */}
                            <div>
                              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-c-text group-hover:text-c-primary transition-colors duration-300">
                                {item.title}
                              </h3>
                              <p className="text-xs font-semibold text-slate-500 dark:text-cyan-400 mt-0.5">
                                {item.companyName}
                              </p>
                            </div>

                            {/* Description text */}
                            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-c-sec-text leading-relaxed break-words whitespace-pre-wrap">
                              {item.description}
                            </p>

                            {/* Tech Tags */}
                            {item.technologies && item.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-1.5">
                                {item.technologies.map((tech, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-0.5 rounded text-[9px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
 
         </div>
       </motion.section>
 
       {/* Certificate Image Popup Modal */}
       <ImagePopup 
         isOpen={isPopupOpen} 
         imageUrl={popupImage} 
         onClose={() => setIsPopupOpen(false)} 
       />
 
     </div>
   )
 }
 
 export default About
