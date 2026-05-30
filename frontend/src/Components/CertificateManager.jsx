import React, { useState, useEffect } from "react";
import { useCertificateStore } from "../Store/certificateStore";
import CertificateModal from "./CertificateModal";
import ImagePopup from "./ImagePopup";
import { Award, Trash2, Edit3, Plus, Loader2, Eye } from "lucide-react";

const CertificateManager = () => {
  const { certificates, fetchCertificates, deleteCertificate, loading } = useCertificateStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Full Screen Preview States
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleOpenAdd = () => {
    setSelectedCertificate(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cert) => {
    setSelectedCertificate(cert);
    setIsModalOpen(true);
  };

  const handleOpenPreview = (url) => {
    setPreviewUrl(url);
    setIsPreviewOpen(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Upper header action bar */}
      <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-purple-500/20 pb-4">
        <h3 className="text-xl font-black text-slate-800 dark:text-white">
          Earned Credentials
        </h3>
        <button
          onClick={handleOpenAdd}
          className="py-2.5 px-5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Certificate
        </button>
      </div>

      {/* Loading & Listing cards */}
      {loading && certificates.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
        </div>
      ) : certificates.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-gray-400 text-center py-12">
          No certificates loaded yet. Click "+ Add Certificate" to begin.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div 
              key={cert._id}
              className="p-6 bg-slate-50 dark:bg-black/40 rounded-2xl border border-slate-200/60 dark:border-purple-500/20 hover:border-purple-500/45 transition-colors duration-300 flex flex-col justify-between gap-4 group"
            >
              <div className="space-y-4">
                {/* Certificate image with click trigger preview */}
                <div 
                  onClick={() => handleOpenPreview(cert.imageUrl)}
                  className="relative w-full h-44 rounded-xl overflow-hidden bg-black/5 dark:bg-black/20 border border-slate-200 dark:border-white/5 cursor-pointer group/image"
                >
                  <img src={cert.imageUrl} alt={cert.title} loading="lazy" className="w-full h-full object-contain" />
                  
                  {/* Eye hover effect */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
                      <Eye className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-800 dark:text-white truncate flex items-center gap-2">
                    <Award className="w-5 h-5 text-cyan-500 shrink-0" />
                    {cert.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-gray-400 break-words whitespace-pre-wrap line-clamp-3">
                    {cert.description}
                  </p>
                </div>
              </div>

              {/* Edit/Delete control action footer */}
              <div className="flex items-center justify-end gap-2 border-t border-slate-200/50 dark:border-white/5 pt-3 mt-1">
                <button
                  onClick={() => handleOpenEdit(cert)}
                  className="p-2 bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white hover:text-purple-500 dark:hover:text-purple-400 rounded-lg transition-all cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteCertificate(cert._id)}
                  className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certificate Form Modal component */}
      <CertificateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        certificate={selectedCertificate}
      />

      {/* Certificate Image Popup component */}
      <ImagePopup
        isOpen={isPreviewOpen}
        imageUrl={previewUrl}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
};

export default CertificateManager;
