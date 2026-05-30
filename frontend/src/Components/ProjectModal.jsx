import React, { useState, useEffect, useRef } from "react";
import { useProjectStore } from "../Store/projectStore";
import { X, Loader2, Calendar, FolderKanban, FileText, Code2, Link as LinkIcon, DollarSign, Clock, HelpCircle, CheckCircle, Image as ImageIcon, Upload } from "lucide-react";

const compressImage = (file, maxWidth = 1000, maxHeight = 1000, quality = 0.7) => {
  return new Promise((resolve) => {
    if (!file || !file.type.startsWith("image/")) {
      return resolve(file);
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
};

const ProjectModal = ({ isOpen, onClose, project }) => {
  const { addProject, updateProject, loading } = useProjectStore();

  // Form States
  const [compressing, setCompressing] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [category, setCategory] = useState("");
  const [mainDescription, setMainDescription] = useState("");
  const [projectOverview, setProjectOverview] = useState("");
  const [projectChallenges, setProjectChallenges] = useState("");
  const [results, setResults] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [date, setDate] = useState("");
  const [keyFeatures, setKeyFeatures] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [liveSiteLink, setLiveSiteLink] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  // Multiple Additional Project Images States
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [additionalPreviewUrls, setAdditionalPreviewUrls] = useState([]);
  const [existingAdditionalImages, setExistingAdditionalImages] = useState([]);
  const [deletedAdditionalImages, setDeletedAdditionalImages] = useState([]);
  const additionalFileInputRef = useRef(null);

  // Sync state if editing
  useEffect(() => {
    if (project) {
      setProjectName(project.projectName || "");
      setCategory(project.category || "");
      setMainDescription(project.mainDescription || "");
      setProjectOverview(project.projectOverview || "");
      setProjectChallenges(project.projectChallenges || "");
      setResults(project.results || "");
      setBudget(project.budget || "");
      setTimeline(project.timeline || "");
      setDate(project.date || "");
      setKeyFeatures(project.keyFeatures ? project.keyFeatures.join(", ") : "");
      setTechnologies(project.technologies ? project.technologies.join(", ") : "");
      setLiveSiteLink(project.liveSiteLink || "");
      setPreviewUrl(project.imageUrl || "");
      setFile(null);

      setExistingAdditionalImages(project.additionalImages || []);
      setDeletedAdditionalImages([]);
      setAdditionalFiles([]);
      setAdditionalPreviewUrls([]);
    } else {
      setProjectName("");
      setCategory("");
      setMainDescription("");
      setProjectOverview("");
      setProjectChallenges("");
      setResults("");
      setBudget("");
      setTimeline("");
      setDate("");
      setKeyFeatures("");
      setTechnologies("");
      setLiveSiteLink("");
      setPreviewUrl("");
      setFile(null);

      setExistingAdditionalImages([]);
      setDeletedAdditionalImages([]);
      setAdditionalFiles([]);
      setAdditionalPreviewUrls([]);
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleAdditionalFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      setAdditionalFiles((prev) => [...prev, ...selectedFiles]);
      const newUrls = selectedFiles.map((f) => URL.createObjectURL(f));
      setAdditionalPreviewUrls((prev) => [...prev, ...newUrls]);
    }
  };

  const removeNewAdditionalFile = (idx) => {
    setAdditionalFiles((prev) => prev.filter((_, i) => i !== idx));
    setAdditionalPreviewUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  const removeExistingAdditionalImage = (img) => {
    setDeletedAdditionalImages((prev) => [...prev, img.publicId]);
    setExistingAdditionalImages((prev) => prev.filter((item) => item.publicId !== img.publicId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCompressing(true);

    try {
      const formData = new FormData();
      formData.append("projectName", projectName);
      formData.append("category", category);
      formData.append("mainDescription", mainDescription);
      formData.append("projectOverview", projectOverview);
      formData.append("projectChallenges", projectChallenges);
      formData.append("results", results);
      formData.append("budget", budget);
      formData.append("timeline", timeline);
      formData.append("date", date);
      formData.append("keyFeatures", keyFeatures);
      formData.append("technologies", technologies);
      formData.append("liveSiteLink", liveSiteLink);
      
      // 1. Compress cover image if it exists
      if (file) {
        const compressedFile = await compressImage(file);
        formData.append("image", compressedFile);
      }

      // 2. Compress and append new additional images in parallel
      if (additionalFiles.length > 0) {
        const compressionPromises = additionalFiles.map((f) => compressImage(f));
        const compressedFiles = await Promise.all(compressionPromises);
        compressedFiles.forEach((f) => {
          formData.append("additionalImages", f);
        });
      }

      // 3. Append deleted images public IDs to backend
      if (deletedAdditionalImages.length > 0) {
        deletedAdditionalImages.forEach((pubId) => {
          formData.append("deleteAdditionalImages", pubId);
        });
      }

      // 4. Save/Update project on the backend
      if (project?._id) {
        await updateProject(project._id, formData, () => {
          onClose();
        });
      } else {
        await addProject(formData, () => {
          onClose();
        });
      }
    } catch (err) {
      console.error("Failed to compress or save project images:", err);
    } finally {
      setCompressing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="w-full max-w-2xl bg-white/95 dark:bg-c-card/95 backdrop-blur-xl border border-slate-200 dark:border-purple-500/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] transition-all duration-300 transform scale-100 hover:border-purple-500/35">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 px-6 py-4.5 bg-slate-50/50 dark:bg-black/20">
          <div>
            <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">
              {project ? "Edit Project" : "Add Project"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
              {project ? "Update the details and stats of this project" : "Create a new project showcase for your portfolio"}
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
          
          {/* Project Image Upload & Preview */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-purple-500" />
              Project Cover Image
            </label>
            
            <div className="relative group rounded-2xl border border-dashed border-slate-300 dark:border-white/10 hover:border-purple-500/50 transition-colors p-4 flex flex-col items-center justify-center bg-slate-50 dark:bg-black/10">
              {previewUrl ? (
                <div className="relative w-full h-44 rounded-xl overflow-hidden bg-black/5 dark:bg-black/30 border border-slate-200 dark:border-white/5">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setPreviewUrl("");
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-lg transition-colors cursor-pointer animate-pulse"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center py-5 cursor-pointer w-full text-center"
                >
                  <div className="p-3 bg-purple-600/10 text-purple-600 dark:text-purple-400 rounded-full mb-2">
                    <Upload className="w-6 h-6 animate-bounce" />
                  </div>
                  <p className="text-sm font-bold text-slate-700 dark:text-gray-300">Click to upload project cover image</p>
                  <p className="text-xs text-slate-400 dark:text-gray-500 mt-1">PNG, JPG, or JPEG (Max 5MB)</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Multiple Additional Project Images Section */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-cyan-500" />
              Additional Project Images
            </label>

            {/* Thumbnail Previews Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Render Existing Additional Images */}
              {existingAdditionalImages.map((img) => (
                <div key={img.publicId} className="relative group w-full h-24 rounded-xl overflow-hidden bg-black/5 dark:bg-black/20 border border-slate-200 dark:border-white/5">
                  <img src={img.imageUrl} alt="Existing" loading="lazy" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingAdditionalImage(img)}
                    className="absolute top-1.5 right-1.5 p-1 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <span className="absolute bottom-1 left-1.5 text-[8px] bg-black/60 px-1 py-0.5 rounded text-white font-bold select-none uppercase">Saved</span>
                </div>
              ))}

              {/* Render New Uploaded Preview Images */}
              {additionalPreviewUrls.map((url, idx) => (
                <div key={idx} className="relative w-full h-24 rounded-xl overflow-hidden bg-black/5 dark:bg-black/20 border border-slate-200 dark:border-white/5">
                  <img src={url} alt="New Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeNewAdditionalFile(idx)}
                    className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-black/80 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <span className="absolute bottom-1 left-1.5 text-[8px] bg-purple-600/80 px-1 py-0.5 rounded text-white font-bold select-none uppercase">New</span>
                </div>
              ))}

              {/* Upload Trigger Button Card */}
              <div 
                onClick={() => additionalFileInputRef.current?.click()}
                className="w-full h-24 rounded-xl border border-dashed border-slate-300 dark:border-white/10 hover:border-purple-500/50 transition-colors bg-slate-50 dark:bg-black/10 flex flex-col items-center justify-center cursor-pointer text-center group"
              >
                <Upload className="w-5 h-5 text-slate-400 group-hover:text-purple-500 transition-colors animate-pulse" />
                <span className="text-[10px] font-bold text-slate-500 dark:text-gray-400 mt-1">Upload More</span>
              </div>
            </div>

            <input
              ref={additionalFileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleAdditionalFilesChange}
              className="hidden"
            />
          </div>

          {/* Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <FolderKanban className="w-3.5 h-3.5 text-purple-500" />
                Project Name *
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. E-Commerce Platform"
                required
                className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-500" />
                Category *
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. MERN Stack, Next.js, WordPress"
                required
                className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Main Description */}
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-purple-500" />
              Main Description *
            </label>
            <textarea
              value={mainDescription}
              onChange={(e) => setMainDescription(e.target.value)}
              placeholder="Provide a summary introduction for the project..."
              required
              rows="2"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200 resize-none min-h-[70px]"
            ></textarea>
          </div>

          {/* Project Overview */}
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-500" />
              Project Overview
            </label>
            <textarea
              value={projectOverview}
              onChange={(e) => setProjectOverview(e.target.value)}
              placeholder="Describe the scope, objectives, and general context..."
              rows="2"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200 resize-none min-h-[70px]"
            ></textarea>
          </div>

          {/* Project Challenges & Results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-purple-500" />
                Project Challenges
              </label>
              <textarea
                value={projectChallenges}
                onChange={(e) => setProjectChallenges(e.target.value)}
                placeholder="What challenges did you face and overcome?"
                rows="2"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200 resize-none min-h-[70px]"
              ></textarea>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-500" />
                Results
              </label>
              <textarea
                value={results}
                onChange={(e) => setResults(e.target.value)}
                placeholder="What were the outcomes and metrics of success?"
                rows="2"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200 resize-none min-h-[70px]"
              ></textarea>
            </div>
          </div>

          {/* Budget, Timeline & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-purple-500" />
                Budget
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. $5,000"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-500" />
                Timeline
              </label>
              <input
                type="text"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                placeholder="e.g. 3 Months"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-500" />
                Date
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. May 2026"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Key Features */}
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-cyan-500" />
              Key Features (comma separated)
            </label>
            <input
              type="text"
              value={keyFeatures}
              onChange={(e) => setKeyFeatures(e.target.value)}
              placeholder="e.g. Real-time Payment, Secure JWT Auth, Fully Responsive Dashboard"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200"
            />
          </div>

          {/* Tools & Technologies */}
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-purple-500" />
              Tools / Technologies (comma separated)
            </label>
            <input
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="e.g. React, Node.js, MongoDB, TailwindCSS, Mongoose"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200"
            />
          </div>

          {/* Live Site Link */}
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-purple-500" />
              Live Site Link
            </label>
            <input
              type="text"
              value={liveSiteLink}
              onChange={(e) => setLiveSiteLink(e.target.value)}
              placeholder="e.g. https://myproject.com"
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
              disabled={loading || compressing}
              className="flex items-center justify-center gap-2 py-3.5 px-8 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              {compressing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Compressing...
                </>
              ) : loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
