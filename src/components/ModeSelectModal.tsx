import { useBrick } from '@/contexts/BrickContext';
import { ModalSheet } from './ModalSheet';
import { Plus } from 'lucide-react';

interface ModeSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditMode: (modeId: string) => void;
  onCreateMode: () => void;
}

export function ModeSelectModal({ 
  isOpen, 
  onClose, 
  onEditMode,
  onCreateMode 
}: ModeSelectModalProps) {
  const { modes, selectedModeId, setSelectedMode } = useBrick();

  const handleSelectMode = (modeId: string) => {
    setSelectedMode(modeId);
  };

  const handleDone = () => {
    onClose();
  };

  return (
    <ModalSheet isOpen={isOpen} onClose={onClose} title="Select mode">
      <div className="space-y-3 mb-6">
        {modes.map((mode) => (
          <div
            key={mode.id}
            onClick={() => handleSelectMode(mode.id)}
            className={`card-floating p-4 flex items-center justify-between cursor-pointer transition-all ${
              selectedModeId === mode.id ? 'ring-2 ring-primary' : ''
            }`}
          >
            <span className="font-semibold">{mode.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditMode(mode.id);
              }}
              className="text-foreground font-medium"
            >
              Edit
            </button>
          </div>
        ))}
        
        {/* Create new mode */}
        <button
          onClick={onCreateMode}
          className="card-floating p-4 flex items-center justify-between w-full"
        >
          <span className="text-muted-foreground">Create mode</span>
          <Plus className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <button onClick={handleDone} className="btn-brick w-full">
        Done
      </button>
    </ModalSheet>
  );
}
