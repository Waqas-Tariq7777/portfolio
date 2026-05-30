import React, { useState, useEffect } from "react";
import { useExperienceStore } from "../Store/experienceStore";
import { X, Loader2, Calendar, Briefcase, FileText, Code2 } from "lucide-react";

const ExperienceModal = ({ isOpen, onClose, experience }) => {
  const { addExperience, updateExperience, loading } = useExperienceStore();

  // Form States
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");

  // Sync state if editing
  useEffect(() => {
    if (experience) {
      setStartDate(experience.startDate || "");
      setEndDate(experience.endDate || "");
      setTitle(experience.title || "");
      setCompanyName(experience.companyName || "");
      setDescription(experience.description || "");
      setTechnologies(experience.technologies ? experience.technologies.join(", ") : "");
    } else {
      setStartDate("");
      setEndDate("");
      setTitle("");
      setCompanyName("");
      setDescription("");
      setTechnologies("");
    }
  }, [experience, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      startDate,
      endDate,
      title,
      companyName,
      description,
      technologies
    };

    if (experience?._id) {
      await updateExperience(experience._id, data, () => {
        onClose();
      });
    } else {
      await addExperience(data, () => {
        onClose();
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="w-full max-w-lg bg-white/95 dark:bg-c-card/95 backdrop-blur-xl border border-slate-200 dark:border-purple-500/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] transition-all duration-300 transform scale-100 hover:border-purple-500/35">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 px-6 py-4.5 bg-slate-50/50 dark:bg-black/20">
          <div>
            <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">
              {experience ? "Edit Experience" : "Add Experience"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
              {experience ? "Update details of your work history" : "Add a new milestone to your career"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin scrollbar-thumb-purple-500/20">
          
          {/* Start & End Date grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-500" />
                Start Date *
              </label>
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="e.g. Aug 2024"
                required
                className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                End Date *
              </label>
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="e.g. Sep 2024 or Present"
                required
                className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Job Title */}
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-purple-500" />
              Job Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Lead React Developer"
              required
              className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-cyan-500" />
              Company Name *
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Tech Solutions Inc."
              required
              className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200"
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-purple-500" />
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a summary of accomplishments, roles, and initiatives..."
              required
              rows="3"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200 resize-none min-h-[90px]"
            ></textarea>
          </div>

          {/* Technologies */}
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-cyan-500" />
              Technologies (comma separated)
            </label>
            <input
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="e.g. React, Node.js, Redux, Tailwind"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-end gap-3 bg-slate-50/10">
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-6 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-white rounded-2xl font-bold text-sm transition-all duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 py-3.5 px-8 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Milestone"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceModal;
