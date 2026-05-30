import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageSquare, ArrowDown, User, ShieldCheck, HelpCircle } from 'lucide-react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useMessageStore } from '../Store/messageStore'
import servicesBg from '../assets/images/services_bg.png'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const submitMessage = useMessageStore(state => state.submitMessage)
  const loading = useMessageStore(state => state.loading)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsMobile(window.innerWidth < 1024)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all the required fields.')
      return
    }

    submitMessage(formData, () => {
      setFormData({ name: '', email: '', subject: '', message: '' })
    })
  }

  const subtleFadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <div className="w-full text-slate-800 dark:text-c-text select-none overflow-hidden pb-24 bg-[#FAF9F6] dark:bg-[#0A0A0F] min-h-screen">
      
      {/* Premium Hero Banner Section */}
      <section 
        style={{ 
          backgroundImage: `url(${servicesBg})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100%'
        }}
        className="relative w-full min-h-[420px] sm:min-h-[500px] flex items-center pt-32 pb-24 overflow-hidden border-b border-slate-200/50 dark:border-none shadow-lg dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
      >
        {/* Parallax adaptive dark overlay tuned perfectly for the background image */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/70 to-[#FAF9F6] dark:from-[#06060c]/85 dark:via-[#06060c]/92 dark:to-[#0A0A0F] backdrop-blur-[1.5px] z-1" />

        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-c-primary/15 rounded-full blur-[110px] pointer-events-none z-1 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-c-accent/15 rounded-full blur-[120px] pointer-events-none z-1 animate-pulse delay-1000" />

        {/* Banner Content Container */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={subtleFadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-left space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/50 dark:bg-white/5 text-xs font-bold text-c-accent uppercase tracking-wider shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-md">
            <MessageSquare className="w-3.5 h-3.5 text-c-accent animate-pulse" />
            <span>Get in Touch</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7.5xl font-black tracking-tight leading-none text-slate-900 dark:text-c-text">
            Let's Build Something <br />
            <span className="bg-gradient-to-r from-c-primary via-c-accent to-c-accent-2 bg-clip-text text-transparent drop-shadow-sm">
              Great Together
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-c-sec-text max-w-2xl leading-relaxed font-semibold">
            Have a project in mind, need layout optimizations, or want to discuss a fullstack opportunity? Reach out today and let's turn your vision into reality.
          </p>

          <div className="flex gap-4 pt-2">
            <a 
              href="#contact-section" 
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-black text-xs text-white bg-gradient-to-r from-c-primary to-c-accent hover:from-c-primary hover:to-c-accent-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-300 group cursor-pointer"
            >
              <span>Explore Contact Form</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Main Two-Column Contact Section */}
      <section id="contact-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Left Column: Contact Cards & Local Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-black uppercase tracking-widest text-c-primary">Contact Info</span>
              <h2 className="text-3xl sm:text-4.5xl font-black text-slate-900 dark:text-white tracking-tight">
                Connect Directly
              </h2>
              <p className="text-slate-600 dark:text-c-sec-text text-sm sm:text-base leading-relaxed font-semibold">
                I am highly responsive to email inquiries, remote opportunities, and local project discussions. Let's start the conversation.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email Card */}
              <div className="p-6 rounded-3xl border border-slate-200/50 dark:border-white/5 bg-white/40 dark:bg-white/[0.015] backdrop-blur-xl shadow-md flex items-start gap-4 hover:border-c-primary/30 transition-all duration-300">
                <div className="p-3.5 rounded-2xl bg-purple-500/10 text-purple-500 border border-purple-500/10">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest">Email Me</h4>
                  <a href="mailto:your-email@domain.com" className="text-base font-extrabold text-slate-900 dark:text-white hover:text-c-primary transition-colors">
                    waqastariq9101@gmail.com
                  </a>
                  <p className="text-xs font-semibold text-slate-500 dark:text-gray-400">Response within 24 hours</p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="p-6 rounded-3xl border border-slate-200/50 dark:border-white/5 bg-white/40 dark:bg-white/[0.015] backdrop-blur-xl shadow-md flex items-start gap-4 hover:border-c-primary/30 transition-all duration-300">
                <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/10">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest">Call / WhatsApp</h4>
                  <a href="tel:+923001234567" className="text-base font-extrabold text-slate-900 dark:text-white hover:text-c-primary transition-colors">
                    +92 302 5649101
                  </a>
                  <p className="text-xs font-semibold text-slate-500 dark:text-gray-400">Available Monday - Saturday</p>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-6 rounded-3xl border border-slate-200/50 dark:border-white/5 bg-white/40 dark:bg-white/[0.015] backdrop-blur-xl shadow-md flex items-start gap-4 hover:border-c-primary/30 transition-all duration-300">
                <div className="p-3.5 rounded-2xl bg-pink-500/10 text-pink-500 border border-pink-500/10">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest">Location</h4>
                  <p className="text-base font-extrabold text-slate-900 dark:text-white">
                    Mirpur AJK, Pakistan
                  </p>
                  <p className="text-xs font-semibold text-slate-500 dark:text-gray-400">Available for remote & local roles</p>
                </div>
              </div>
            </div>

            {/* Quick FAQ / Security badge */}
            <div className="p-6 rounded-3xl border border-dashed border-slate-200 dark:border-white/10 bg-black/[0.005] dark:bg-white/[0.002] space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Secure & Confidential Submission</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-400 dark:text-gray-500 leading-normal">
                Your credentials and project details are encrypted and securely sent directly to my private inbox. Rest assured, your business ideas remain 100% confidential.
              </p>
            </div>
          </div>

          {/* Right Column: Glassmorphic Interactive Contact Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={isMobile ? false : { opacity: 0, y: 15 }}
              whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 sm:p-10 rounded-[32px] border border-slate-200/60 dark:border-white/5 bg-white/60 dark:bg-white/[0.015] backdrop-blur-xl shadow-xl space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">Send a Message</h3>
                <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-gray-400">
                  Fill out this interactive form to send your message instantly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-gray-400 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    Full Name <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <input 
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] text-slate-900 dark:text-white text-sm font-bold outline-none focus:border-c-primary focus:ring-1 focus:ring-c-primary/50 transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
                  />
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-gray-400 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    Email Address <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] text-slate-900 dark:text-white text-sm font-bold outline-none focus:border-c-primary focus:ring-1 focus:ring-c-primary/50 transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
                  />
                </div>

                {/* Subject field */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-gray-400 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    Subject <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <input 
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this inquiry regarding?"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] text-slate-900 dark:text-white text-sm font-bold outline-none focus:border-c-primary focus:ring-1 focus:ring-c-primary/50 transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
                  />
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-gray-400 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Message / Project Details <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please detail your project specifications, timeline, or query..."
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] text-slate-900 dark:text-white text-sm font-bold outline-none focus:border-c-primary focus:ring-1 focus:ring-c-primary/50 transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)] resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-c-primary to-c-accent text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer text-center disabled:opacity-50 disabled:pointer-events-none select-none"
                  >
                    {loading ? (
                      <>
                        <div className="w-4.5 h-4.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>

        </div>
      </section>

    </div>
  )
}

export default Contact
