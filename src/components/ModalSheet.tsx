import { ReactNode } from 'react';
import { X, ChevronLeft } from 'lucide-react';

interface ModalSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  showBack?: boolean;
  onBack?: () => void;
}

export function ModalSheet({ 
  isOpen, 
  onClose, 
  title, 
  children,
  showBack,
  onBack 
}: ModalSheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div className="modal-sheet relative w-full max-w-md p-6 pb-8 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {showBack ? (
            <button
              onClick={onBack}
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-8" />
          )}
          
          <h2 className="text-lg font-semibold">{title}</h2>
          
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {children}
      </div>
    </div>
  );
}
