import React, { useState, useEffect } from "react";
import { useAuthStore } from "../Store/authStore";
import { useExperienceStore } from "../Store/experienceStore";
import ExperienceModal from "../Components/ExperienceModal";
import CertificateManager from "../Components/CertificateManager";
import { 
  LogOut, 
  Shield, 
  User, 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  Briefcase, 
  Award, 
  FolderKanban,
  CheckCircle2,
  Clock,
  Trash2,
  Edit3,
  Plus,
  Loader2,
  Search,
  DollarSign,
  Link as LinkIcon,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Mail,
  Laptop
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectStore } from "../Store/projectStore";
import ProjectModal from "../Components/ProjectModal";
import { useServicesStore } from "../Store/servicesStore";
import ServiceModal from "../Components/ServiceModal";
import { useMessageStore } from "../Store/messageStore";

const Dashboard = () => {
  const { user, logoutUser } = useAuthStore();
  const { experiences, fetchExperiences, deleteExperience, loading } = useExperienceStore();
  const { projects, fetchProjects, deleteProject, loading: projLoading } = useProjectStore();
  const { services, fetchServices, deleteService, loading: servLoading } = useServicesStore();
  const { 
    messages, 
    unreadCount, 
    fetchMessages, 
    fetchUnreadCount, 
    markAsRead, 
    deleteMessage, 
    loading: msgLoading 
  } = useMessageStore();
  
  const [activeTab, setActiveTab] = useState("overview");

  // Modal Control States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  // Project Management States
  const [isProjModalOpen, setIsProjModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projSearch, setProjSearch] = useState("");
  const [projCategoryFilter, setProjCategoryFilter] = useState("");
  const [expandedProjects, setExpandedProjects] = useState({});

  // Message Management States
  const [expandedMessages, setExpandedMessages] = useState({});
  const [msgSearch, setMsgSearch] = useState("");

  // Service Management States
  const [isServModalOpen, setIsServModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const toggleExpandProject = (id) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleExpandMessage = (id, wasRead) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    if (!wasRead) {
      markAsRead(id);
    }
  };

  // Fetch data on load
  useEffect(() => {
    fetchExperiences();
    fetchProjects();
    fetchServices();
    fetchMessages();
    fetchUnreadCount();
  }, []);

  // Reactive search and filter for projects
  useEffect(() => {
    if (activeTab === "projects") {
      fetchProjects(projSearch, projCategoryFilter);
    }
  }, [projSearch, projCategoryFilter, activeTab]);

  const sidebarItems = [
    { id: "overview", name: "Dashboard Overview", icon: LayoutDashboard },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "certificates", name: "Certificates", icon: Award },
    { id: "projects", name: "Projects", icon: FolderKanban },
    { id: "services", name: "Services", icon: Laptop },
    { id: "messages", name: "Inbox / Messages", icon: MessageSquare },
  ];

  // Open modal for Adding
  const handleOpenAdd = () => {
    setSelectedExperience(null);
    setIsModalOpen(true);
  };

  // Open modal for Editing
  const handleOpenEdit = (exp) => {
    setSelectedExperience(exp);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 max-w-7xl mx-auto relative mt-16">
      {/* Dynamic Background Glows */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>

      {/* Main Grid: Sidebar + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Elegant Sidebar Panel */}
        <div className="lg:col-span-1 bg-white/80 dark:bg-c-card/65 backdrop-blur-xl border border-slate-200/80 dark:border-purple-500/20 rounded-3xl p-6 shadow-xl dark:shadow-[0_8px_32px_rgba(168,85,247,0.06)] flex flex-col justify-between h-fit space-y-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200/60 dark:border-purple-500/20 pb-4">
              <div className="p-2.5 bg-purple-600/15 text-purple-600 dark:text-purple-400 rounded-xl border border-purple-500/30">
                <Shield className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h2 className="font-extrabold text-slate-800 dark:text-white tracking-tight">Admin Console</h2>
                <p className="text-xs text-slate-500 dark:text-gray-400">Controls & configurations</p>
              </div>
            </div>

            {/* Sidebar Navigation Items */}
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 group cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white shadow-lg shadow-purple-500/25"
                        : "text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-purple-500/10 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-slate-200 dark:hover:border-purple-500/10"
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-transform duration-300 ${!isActive && "group-hover:scale-110"}`} />
                    <span>{item.name}</span>
                    {item.id === "messages" && unreadCount > 0 && (
                      <span className="ml-auto flex h-5 min-w-5 px-1.5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white animate-pulse shadow-md shadow-rose-500/20">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User Profile Info & Logout */}
          <div className="border-t border-slate-200/60 dark:border-purple-500/20 pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 dark:bg-purple-500/10 border border-slate-200 dark:border-purple-500/20 rounded-xl flex items-center justify-center text-slate-700 dark:text-cyan-400">
                <User className="w-5 h-5" />
              </div>
              <div className="truncate">
                <p className="text-xs text-slate-400 dark:text-gray-500 uppercase tracking-wider font-semibold">User</p>
                <p className="text-xs font-bold text-slate-800 dark:text-white truncate max-w-[140px]">
                  {user?.email || "admin@example.com"}
                </p>
              </div>
            </div>

            <button
              onClick={logoutUser}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-500 dark:text-red-400 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>

        {/* Dynamic Content Panel */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Header section inside content panel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white/80 dark:bg-c-card/65 backdrop-blur-xl border border-slate-200/80 dark:border-purple-500/20 rounded-3xl p-8 shadow-xl dark:shadow-[0_8px_32px_rgba(168,85,247,0.06)]">
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                {sidebarItems.find(item => item.id === activeTab)?.name}
              </h1>
              <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
                Manage your portfolio's {activeTab === "overview" ? "general analytics" : activeTab} parameters and records
              </p>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-green-500/10 rounded-full border border-green-500/25 text-green-600 dark:text-green-400 w-fit font-semibold text-xs tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>SYNC ACTIVE</span>
            </div>
          </div>

          {/* Dynamic Content Render Area based on selected Tab */}
          <div className="bg-white/80 dark:bg-c-card/65 backdrop-blur-xl border border-slate-200/80 dark:border-purple-500/20 rounded-3xl p-8 shadow-xl dark:shadow-[0_8px_32px_rgba(168,85,247,0.06)] min-h-[40vh]">
            
            {/* Overview / Dashboard Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h3 className="text-xl font-black text-slate-800 dark:text-white border-b border-slate-200/60 dark:border-purple-500/20 pb-4">
                  Quick Overview Stats
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 dark:bg-black/40 rounded-2xl border border-slate-200/60 dark:border-purple-500/25 shadow-sm hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-slate-500 dark:text-gray-400">Total Visits</span>
                      <span className="text-xs py-1 px-2.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 font-bold">
                        +12.4%
                      </span>
                    </div>
                    <span className="text-3xl font-black text-slate-800 dark:text-white">4,892</span>
                  </div>

                  <div className="p-6 bg-slate-50 dark:bg-black/40 rounded-2xl border border-slate-200/60 dark:border-purple-500/25 shadow-sm hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between cursor-pointer" onClick={() => setActiveTab("messages")}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-slate-500 dark:text-gray-400">Unread Messages</span>
                      <span className="text-xs py-1 px-2.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-bold">
                        Inbox
                      </span>
                    </div>
                    <span className="text-3xl font-black text-slate-800 dark:text-white">{unreadCount}</span>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-black/40 rounded-2xl border border-slate-200/60 dark:border-purple-500/20 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-white">Operational Status</p>
                      <p className="text-xs text-slate-500 dark:text-gray-400">All backend cloud connectors are up and active.</p>
                    </div>
                  </div>
                  <Settings className="w-5 h-5 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors duration-200 cursor-pointer" />
                </div>
              </div>
            )}

            {/* Experience Management Tab */}
            {activeTab === "experience" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-purple-500/20 pb-4">
                  <h3 className="text-xl font-black text-slate-800 dark:text-white">
                    Work History & Roles
                  </h3>
                  <button
                    onClick={handleOpenAdd}
                    className="py-2.5 px-5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Experience
                  </button>
                </div>

                {loading && experiences.length === 0 ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                  </div>
                ) : experiences.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-gray-400 text-center py-12">
                    No work experiences added yet. Click "+ Add Experience" to begin.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {experiences.map((exp) => (
                      <div
                        key={exp._id}
                        className="p-6 bg-slate-50 dark:bg-black/40 rounded-2xl border border-slate-200/60 dark:border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-purple-500/45 transition-colors duration-300"
                      >
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className="p-3 bg-purple-600/10 text-purple-600 dark:text-purple-400 rounded-xl border border-purple-500/10 shrink-0">
                            <Briefcase className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-extrabold text-slate-800 dark:text-white truncate">
                              {exp.title}
                            </h4>
                            <p className="text-sm text-slate-500 dark:text-gray-400 truncate">
                              {exp.companyName}
                            </p>
                            <p className="text-xs text-slate-400 dark:text-gray-500 mt-1 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 shrink-0" />
                              <span>
                                {exp.startDate} – {exp.endDate}
                              </span>
                            </p>
                            <p className="text-xs text-slate-500 dark:text-gray-400 mt-2 break-words whitespace-pre-wrap">
                              {exp.description}
                            </p>
                            {exp.technologies && exp.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-3">
                                {exp.technologies.map((tech, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/10"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:self-start">
                          <button
                            onClick={() => handleOpenEdit(exp)}
                            className="p-2 bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white hover:text-purple-500 dark:hover:text-purple-400 rounded-lg transition-all cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteExperience(exp._id)}
                            className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-all cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Certificates Management Tab */}
            {activeTab === "certificates" && (
              <CertificateManager />
            )}

            {/* Projects Management Section */}
            {activeTab === "projects" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 dark:border-purple-500/20 pb-5">
                  <div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-white">
                      Showcased Projects
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
                      Add, update, or remove portfolio items
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      setIsProjModalOpen(true);
                    }}
                    className="py-2.5 px-5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 self-start md:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Add Project
                  </button>
                </div>

                {/* Search & Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-4 bg-slate-50/50 dark:bg-black/25 p-4 rounded-2xl border border-slate-200/50 dark:border-purple-500/10">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={projSearch}
                      onChange={(e) => setProjSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-c-card border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                    />
                  </div>
                  <div className="relative w-full sm:w-48">
                    <input
                      type="text"
                      placeholder="Filter by category..."
                      value={projCategoryFilter}
                      onChange={(e) => setProjCategoryFilter(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white dark:bg-c-card border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                    />
                  </div>
                </div>

                {projLoading && projects.length === 0 ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                  </div>
                ) : projects.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-gray-400 text-center py-12">
                    No projects found. Click "+ Add Project" to create one.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {projects.map((proj) => (
                      <div
                        key={proj._id}
                        className="bg-white/90 dark:bg-c-card/75 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-purple-500/20 p-8 shadow-lg dark:shadow-[0_12px_40px_rgba(168,85,247,0.04)] space-y-6 transition-all duration-300 hover:border-purple-500/35 hover:shadow-xl"
                      >
                        {/* 1. Header Row (Name, Category, and Actions) */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200/50 dark:border-white/5 pb-5">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <h4 className="text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                                {proj.projectName}
                              </h4>
                              <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/15 tracking-wider">
                                {proj.category}
                              </span>
                            </div>
                            
                            {/* Meta Metrics Bar */}
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-500 dark:text-gray-400">
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-purple-500" />
                                <span>Timeline: <strong className="text-slate-700 dark:text-slate-300">{proj.timeline || "N/A"}</strong></span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <DollarSign className="w-3.5 h-3.5 text-cyan-500" />
                                <span>Budget: <strong className="text-slate-700 dark:text-slate-300">{proj.budget || "N/A"}</strong></span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-pink-500" />
                                <span>Date: <strong className="text-slate-700 dark:text-slate-300">{proj.date || "N/A"}</strong></span>
                              </div>
                              {proj.liveSiteLink && (
                                <a
                                  href={proj.liveSiteLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-cyan-500 hover:text-cyan-400 hover:underline transition-all"
                                >
                                  <LinkIcon className="w-3.5 h-3.5" />
                                  <span>Live Demo</span>
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Quick Edit/Delete Actions */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => {
                                setSelectedProject(proj);
                                setIsProjModalOpen(true);
                              }}
                              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-white rounded-xl text-xs font-bold transition-all duration-200 border border-slate-200/50 dark:border-white/5 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              Edit
                            </button>
                            <button
                              onClick={() => deleteProject(proj._id)}
                              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-xs font-bold transition-all duration-200 border border-red-500/15 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>
                        </div>

                        {/* 2. Cover Image & Brief Overview section (Visible by default) */}
                        <div className="flex flex-col sm:flex-row gap-6 items-start">
                          {proj.imageUrl && (
                            <div className="relative group w-full sm:w-48 h-32 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-white/10 shrink-0 bg-black/5 dark:bg-black/30 shadow-md">
                              <img src={proj.imageUrl} alt={proj.projectName} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                              <span className="absolute bottom-2 left-2 text-[9px] bg-purple-600/90 dark:bg-purple-600/80 px-2 py-0.5 rounded text-white font-extrabold tracking-wider uppercase select-none">Cover Image</span>
                            </div>
                          )}
                          <div className="space-y-2 flex-1 min-w-0">
                            <h5 className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-gray-500">Brief Overview</h5>
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed tracking-wide break-words whitespace-pre-wrap">
                              {proj.mainDescription}
                            </p>
                          </div>
                        </div>

                        {/* Collapsible Remaining Content (Smoothly via framer-motion) */}
                        <AnimatePresence initial={false}>
                          {expandedProjects[proj._id] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden space-y-6 pt-6 border-t border-slate-200/50 dark:border-white/5"
                            >
                              {/* A. Additional Images Gallery */}
                              {proj.additionalImages && proj.additionalImages.length > 0 && (
                                <div className="space-y-3">
                                  <h5 className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-gray-500">Additional Project Images</h5>
                                  <div className="flex flex-wrap gap-4">
                                    {proj.additionalImages.map((img, i) => (
                                      <a
                                        key={i}
                                        href={img.imageUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative group w-24 sm:w-28 h-20 rounded-xl overflow-hidden border border-slate-200/60 dark:border-white/10 hover:border-purple-500/50 transition-all shrink-0 bg-black/5 dark:bg-black/35 shadow-md"
                                      >
                                        <img src={img.imageUrl} alt={`Additional ${i}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        <span className="absolute bottom-1.5 left-1.5 text-[8px] bg-black/60 px-1 py-0.5 rounded text-white font-bold select-none uppercase">Shot {i+1}</span>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* B. Deep Project Logs (Overview, Challenges, Results) */}
                              {(proj.projectOverview || proj.projectChallenges || proj.results) && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                                  {proj.projectOverview && (
                                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/25 border border-slate-200/60 dark:border-white/5 space-y-2.5 shadow-sm hover:border-purple-500/20 transition-all duration-300">
                                      <h6 className="text-xs uppercase font-extrabold tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                                        <FileText className="w-4 h-4" />
                                        Project Details
                                      </h6>
                                      <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed font-semibold break-words whitespace-pre-wrap">{proj.projectOverview}</p>
                                    </div>
                                  )}
                                  {proj.projectChallenges && (
                                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/25 border border-slate-200/60 dark:border-white/5 space-y-2.5 shadow-sm hover:border-pink-500/20 transition-all duration-300">
                                      <h6 className="text-xs uppercase font-extrabold tracking-wider text-pink-600 dark:text-pink-400 flex items-center gap-1.5">
                                        <HelpCircle className="w-4 h-4" />
                                        Challenges faced
                                      </h6>
                                      <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed font-semibold break-words whitespace-pre-wrap">{proj.projectChallenges}</p>
                                    </div>
                                  )}
                                  {proj.results && (
                                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/25 border border-slate-200/60 dark:border-white/5 space-y-2.5 shadow-sm hover:border-cyan-500/20 transition-all duration-300">
                                      <h6 className="text-xs uppercase font-extrabold tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Success Results
                                      </h6>
                                      <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed font-semibold break-words whitespace-pre-wrap">{proj.results}</p>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* C. Features & Tech Badges */}
                              {((proj.keyFeatures && proj.keyFeatures.length > 0) || (proj.technologies && proj.technologies.length > 0)) && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-200/50 dark:border-white/5">
                                  {proj.keyFeatures && proj.keyFeatures.length > 0 && (
                                    <div className="space-y-2.5">
                                      <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-gray-500 font-extrabold block">Key Features list</span>
                                      <div className="flex flex-wrap gap-2">
                                        {proj.keyFeatures.map((feat, i) => (
                                          <span
                                            key={i}
                                            className="px-3 py-1 rounded-lg text-[10px] font-extrabold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/15"
                                          >
                                            {feat}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  {proj.technologies && proj.technologies.length > 0 && (
                                    <div className="space-y-2.5">
                                      <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-gray-500 font-extrabold block">Technologies & Tools</span>
                                      <div className="flex flex-wrap gap-2">
                                        {proj.technologies.map((tech, i) => (
                                          <span
                                            key={i}
                                            className="px-3 py-1 rounded-lg text-[10px] font-extrabold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/15"
                                          >
                                            {tech}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* View More / View Less Toggle Button */}
                        <div className="flex justify-center border-t border-slate-200/40 dark:border-white/5 pt-4">
                          <button
                            onClick={() => toggleExpandProject(proj._id)}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider text-purple-600 hover:text-white dark:text-purple-400 bg-purple-500/10 hover:bg-purple-600 border border-purple-500/25 hover:border-transparent transition-all duration-300 cursor-pointer shadow-sm active:scale-95 group"
                          >
                            <span>{expandedProjects[proj._id] ? "View Less" : "View More"}</span>
                            {expandedProjects[proj._id] ? (
                              <ChevronUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                            ) : (
                              <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Services Management Section */}
            {activeTab === "services" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 dark:border-purple-500/20 pb-5">
                  <div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-white">
                      Service Offerings
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
                      Add, update, or remove services
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      setIsServModalOpen(true);
                    }}
                    className="py-2.5 px-5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 self-start md:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Add Service
                  </button>
                </div>

                {servLoading && services.length === 0 ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                  </div>
                ) : services.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-gray-400 text-center py-12">
                    No services found. Click "+ Add Service" to create one.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {services.map((srv) => (
                      <div
                        key={srv._id}
                        className="bg-white/90 dark:bg-c-card/75 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-purple-500/20 p-8 shadow-lg dark:shadow-[0_12px_40px_rgba(168,85,247,0.04)] space-y-6 transition-all duration-300 hover:border-purple-500/35 hover:shadow-xl"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200/50 dark:border-white/5 pb-5">
                          <h4 className="text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                            {srv.name}
                          </h4>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => {
                                setSelectedService(srv);
                                setIsServModalOpen(true);
                              }}
                              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-white rounded-xl text-xs font-bold transition-all duration-200 border border-slate-200/50 dark:border-white/5 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              Edit
                            </button>
                            <button
                              onClick={() => deleteService(srv._id)}
                              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-xs font-bold transition-all duration-200 border border-red-500/15 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 items-start">
                          {srv.imageUrl && (
                            <div className="relative group w-full sm:w-48 h-32 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-white/10 shrink-0 bg-black/5 dark:bg-black/30 shadow-md">
                              <img src={srv.imageUrl} alt={srv.name} loading="lazy" className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="space-y-4 flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed tracking-wide break-words whitespace-pre-wrap">
                              {srv.description}
                            </p>
                            {srv.keyFeatures && srv.keyFeatures.length > 0 && (
                              <div className="space-y-2">
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-gray-500 font-extrabold block">Key Features</span>
                                <ul className="space-y-1.5">
                                  {srv.keyFeatures.map((feat, i) => (
                                    <li
                                      key={i}
                                      className="text-xs font-bold text-slate-700 dark:text-gray-300 flex items-center gap-2"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span>
                                      {feat}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Messages / Inbox Management Tab */}
            {activeTab === "messages" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 dark:border-purple-500/20 pb-5">
                  <div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-white">
                      Inbox / Client Messages
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
                      Read, track, and manage contact form submissions
                    </p>
                  </div>
                </div>

                {/* Message Search Control */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by sender, email, subject, or message keyword..."
                    value={msgSearch}
                    onChange={(e) => setMsgSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-c-card border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                  />
                </div>

                {msgLoading && messages.length === 0 ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                  </div>
                ) : messages.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-gray-400 text-center py-12">
                    Your inbox is empty. No messages submitted yet.
                  </p>
                ) : (() => {
                  const filtered = messages.filter(msg => 
                    msg.name.toLowerCase().includes(msgSearch.toLowerCase()) ||
                    msg.email.toLowerCase().includes(msgSearch.toLowerCase()) ||
                    msg.subject.toLowerCase().includes(msgSearch.toLowerCase()) ||
                    msg.message.toLowerCase().includes(msgSearch.toLowerCase())
                  );

                  if (filtered.length === 0) {
                    return (
                      <p className="text-sm text-slate-500 dark:text-gray-400 text-center py-12">
                        No messages match your search criteria.
                      </p>
                    );
                  }

                  return (
                    <div className="space-y-4">
                      {filtered.map((msg) => {
                        const isExpanded = expandedMessages[msg._id];
                        return (
                          <div
                            key={msg._id}
                            className={`p-6 rounded-3xl border transition-all duration-300 ${
                              msg.isRead 
                                ? "bg-slate-50/50 dark:bg-black/10 border-slate-200/50 dark:border-white/5" 
                                : "bg-gradient-to-r from-purple-500/[0.03] to-cyan-500/[0.03] dark:from-purple-500/[0.015] dark:to-cyan-500/[0.015] border-purple-500/30 dark:border-purple-500/30 shadow-md shadow-purple-500/5"
                            } hover:border-purple-500/40`}
                          >
                            {/* Header row */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                              <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl border shrink-0 ${
                                  msg.isRead 
                                    ? "bg-slate-100 border-slate-200 dark:bg-white/5 dark:border-white/5 text-slate-400" 
                                    : "bg-purple-500/10 border-purple-500/20 text-purple-500 animate-pulse"
                                }`}>
                                  <Mail className="w-5 h-5" />
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="font-extrabold text-slate-800 dark:text-white">
                                      {msg.name}
                                    </h4>
                                    {!msg.isRead && (
                                      <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-rose-500 text-white tracking-widest animate-pulse">
                                        New
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-500 dark:text-gray-400">
                                    {msg.email}
                                  </p>
                                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mt-1">
                                    Subject: <span className="text-slate-800 dark:text-white font-extrabold">{msg.subject}</span>
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 self-end sm:self-start">
                                <span className="text-[10px] text-slate-400 dark:text-gray-500 font-bold shrink-0">
                                  {new Date(msg.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                  })}
                                </span>
                                <button
                                  onClick={() => deleteMessage(msg._id)}
                                  className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-all cursor-pointer border border-red-500/10"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Collapsible content (Message body) */}
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="overflow-hidden pt-4 mt-4 border-t border-slate-200/50 dark:border-white/5"
                                >
                                  <h5 className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-gray-500 mb-2">Message Body</h5>
                                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200/60 dark:border-white/5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed break-words whitespace-pre-wrap">
                                    {msg.message}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* View body toggle */}
                            <div className="flex justify-center border-t border-slate-200/40 dark:border-white/5 pt-3 mt-4">
                              <button
                                onClick={() => toggleExpandMessage(msg._id, msg.isRead)}
                                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider text-purple-600 hover:text-white dark:text-purple-400 bg-purple-500/10 hover:bg-purple-600 border border-purple-500/25 hover:border-transparent transition-all duration-300 cursor-pointer shadow-sm active:scale-95 group"
                              >
                                <span>{isExpanded ? "Collapse" : "Read Message"}</span>
                                {isExpanded ? (
                                  <ChevronUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                                ) : (
                                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Experience Form Component */}
      <ExperienceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        experience={selectedExperience}
      />

      {/* Project Form Component */}
      <ProjectModal
        isOpen={isProjModalOpen}
        onClose={() => setIsProjModalOpen(false)}
        project={selectedProject}
      />

      {/* Service Form Component */}
      <ServiceModal
        isOpen={isServModalOpen}
        onClose={() => setIsServModalOpen(false)}
        service={selectedService}
      />
    </div>
  );
};

export default Dashboard;
