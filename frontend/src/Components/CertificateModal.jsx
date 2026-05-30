import React, { useState, useEffect, useRef } from "react";
import { useCertificateStore } from "../Store/certificateStore";
import { X, Loader2, Award, FileText, Image as ImageIcon, Upload } from "lucide-react";

const CertificateModal = ({ isOpen, onClose, certificate }) => {
  const { addCertificate, updateCertificate, loading } = useCertificateStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  // Sync state when editing
  useEffect(() => {
    if (certificate) {
      setTitle(certificate.title || "");
      setDescription(certificate.description || "");
      setPreviewUrl(certificate.imageUrl || "");
      setFile(null);
    } else {
      setTitle("");
      setDescription("");
      setPreviewUrl("");
      setFile(null);
    }
  }, [certificate, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (file) {
      formData.append("image", file);
    }

    if (certificate?._id) {
      await updateCertificate(certificate._id, formData, () => {
        onClose();
      });
    } else {
      if (!file) {
        alert("Please select a certificate image file.");
        return;
      }
      await addCertificate(formData, () => {
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
              {certificate ? "Edit Certificate" : "Add Certificate"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
              {certificate ? "Update your credentials and badge details" : "Add a new achievement certification"}
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
          
          {/* Certificate Image Upload & Preview */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-purple-500" />
              Certificate Image *
            </label>
            
            <div className="relative group rounded-2xl border border-dashed border-slate-300 dark:border-white/10 hover:border-purple-500/50 transition-colors p-4 flex flex-col items-center justify-center bg-slate-50 dark:bg-black/10">
              {previewUrl ? (
                <div className="relative w-full h-40 rounded-xl overflow-hidden bg-black/5 dark:bg-black/30 border border-slate-200 dark:border-white/5">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setPreviewUrl("");
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center py-4 cursor-pointer w-full text-center"
                >
                  <div className="p-3 bg-purple-600/10 text-purple-600 dark:text-purple-400 rounded-full mb-2">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-slate-700 dark:text-gray-300">Click to upload image</p>
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

          {/* Certificate Title */}
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-cyan-500" />
              Certificate Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AWS Solutions Architect Associate"
              required
              className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-purple-500" />
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail what knowledge you acquired, validation ID, or scope of authorization..."
              required
              rows="3"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200 resize-none min-h-[90px]"
            ></textarea>
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
                "Save Certificate"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificateModal;
