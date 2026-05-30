import React from "react";
import { X } from "lucide-react";

const ImagePopup = ({ isOpen, imageUrl, onClose }) => {
  if (!isOpen || !imageUrl) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl bg-[#0A0A0F]/60 border border-white/10 shadow-2xl p-2 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-xl transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <img 
          src={imageUrl} 
          alt="Certificate Full View" 
          className="max-w-full max-h-[80vh] object-contain rounded-2xl"
        />
      </div>
    </div>
  );
};

export default ImagePopup;
