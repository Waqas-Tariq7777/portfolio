import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Sun, Moon, Menu, X, Briefcase, ChevronRight } from 'lucide-react'
import logo from '../assets/images/logo.svg'
import { useAuthStore } from '../Store/authStore'

const Navbar = () => {
  const location = useLocation()
  const { user, isAdmin } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    // Check local storage or default strictly to dark theme
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) return savedTheme
      return 'dark'
    }
    return 'dark'
  })

  // Apply theme class to document
  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const baseNavItems = [
    { name: 'Home', href: '/' },
    { name: 'About Me', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Reviews', href: '/reviews' },
  ]

  const navItems = user && isAdmin
    ? [...baseNavItems, { name: 'Dashboard', href: '/dashboard' }]
    : baseNavItems

  const handleNavClick = () => {
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/3 dark:bg-[#0A0A0F]/25 md:backdrop-blur-xl backdrop-blur-md border-b border-white/5 dark:border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-5 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center group cursor-pointer select-none">
            <div className="relative overflow-hidden transition-all duration-300 group-hover:scale-108">
              <img 
                src={logo} 
                alt="Logo" 
                className="h-18 w-18 md:h-12 md:w-12 lg:h-18 lg:w-18 object-contain bg-transparent transition-transform duration-500 group-hover:rotate-[15deg]"
              />
            </div>
            <span className="text-2xl md:text-base lg:text-2xl font-black tracking-wider text-c-text bg-gradient-to-r from-c-primary via-c-accent to-c-accent-2 bg-clip-text text-transparent transition-all duration-300 group-hover:opacity-90">
              PORTFOLIO
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={handleNavClick}
                  className={`relative px-4 md:px-2.5 lg:px-4 py-2 rounded-lg text-sm md:text-xs lg:text-sm font-semibold transition-all duration-300 hover:scale-105 hover:text-c-primary ${
                    isActive 
                      ? 'text-c-primary font-bold' 
                      : 'text-c-sec-text hover:bg-c-sec-bg/30'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-c-primary to-c-accent rounded-full shadow-[0_1px_8px_var(--primary-color)]" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right Action Utilities */}
          <div className="hidden md:flex items-center gap-4 md:gap-2.5 lg:gap-4">
            {/* Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="relative p-2.5 md:p-2 lg:p-2.5 rounded-xl border border-white/10 bg-white/5 dark:bg-white/5 hover:bg-c-primary/10 text-c-sec-text hover:text-c-primary transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.25)] hover:scale-110 active:scale-95 group cursor-pointer"
            >
              <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
                <Sun 
                  className={`absolute w-5 h-5 transform transition-all duration-500 ease-out ${
                    theme === 'dark' 
                      ? 'rotate-90 scale-0 opacity-0' 
                      : 'rotate-0 scale-100 opacity-100'
                  }`}
                />
                <Moon 
                  className={`absolute w-5 h-5 transform transition-all duration-500 ease-out ${
                    theme === 'dark' 
                      ? 'rotate-0 scale-100 opacity-100' 
                      : '-rotate-90 scale-0 opacity-0'
                  }`}
                />
              </div>
            </button>

            {/* Hire Me Button */}
            <Link 
              to="/contact"
              className="flex items-center gap-2 md:gap-1 px-5 md:px-3 lg:px-5 py-2.5 md:py-2 lg:py-2.5 rounded-xl font-bold text-sm md:text-xs lg:text-sm text-white bg-gradient-to-r from-c-primary to-c-accent hover:from-c-primary hover:to-c-accent-2 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)] shadow-[0_4px_15px_rgba(168,85,247,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
            >
              <Briefcase className="w-4 h-4 md:hidden lg:block transition-transform duration-300 group-hover:rotate-12" />
              <span>Hire Me</span>
              <ChevronRight className="w-4 h-4 md:hidden lg:block transform transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu & Theme Switcher Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Theme Switcher for Mobile */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl border border-white/10 bg-white/5 dark:bg-white/5 text-c-sec-text hover:text-c-accent transition-all duration-300 hover:scale-110 active:scale-95"
            >
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Hamburger Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-xl border border-white/10 bg-white/5 dark:bg-white/5 text-c-text hover:text-c-primary transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bg-c-bg border-b border-c-border shadow-2xl z-40">
          <div className="px-4 pt-4 pb-6 space-y-2 flex flex-col items-stretch max-h-[calc(100vh-5rem)] overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={handleNavClick}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-bold transition-all duration-200 hover:translate-x-1 ${
                    isActive 
                      ? 'bg-c-sec-bg text-c-primary border-l-4 border-c-primary shadow-[inset_4px_0_0_0_var(--primary-color)]' 
                      : 'text-c-sec-text hover:bg-c-card hover:text-c-text'
                  }`}
                >
                  <span>{item.name}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'translate-x-1 text-c-primary' : 'opacity-30'}`} />
                </Link>
              )
            })}
            <div className="pt-4 mt-2 border-t border-c-border">
              <Link 
                to="/contact"
                onClick={handleNavClick}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-c-primary to-c-accent hover:from-c-primary hover:to-c-accent-2 shadow-[0_4px_15px_rgba(168,85,247,0.3)] hover:scale-[1.02] active:scale-98 transition-all duration-200 cursor-pointer"
              >
                <Briefcase className="w-5 h-5" />
                <span>Hire Me</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
