import { useBrick } from '@/contexts/BrickContext';
import { ModalSheet } from './ModalSheet';
import { Plus } from 'lucide-react';

interface ModeSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditMode: (modeId: string) => void;
  onCreateMode: () => void;
}

export function ModeSelectModal({ isOpen, onClose, onEditMode, onCreateMode }: ModeSelectModalProps) {
  const { modes, selectedModeId, setSelectedMode } = useBrick();

  return (
    <ModalSheet isOpen={isOpen} onClose={onClose} title="Select Mode">
      <div className="space-y-3 mb-6">
        {modes.map((mode) => (
          <div
            key={mode.id}
            onClick={() => setSelectedMode(mode.id)}
            className={`card-floating p-4 flex items-center justify-between cursor-pointer transition-all ${
              selectedModeId === mode.id ? 'ring-2 ring-accent' : ''
            }`}
          >
            <span className="font-bold text-sm">{mode.name}</span>
            <button
              onClick={(e) => { e.stopPropagation(); onEditMode(mode.id); }}
              className="text-accent font-semibold text-xs"
            >
              Edit
            </button>
          </div>
        ))}
        <button
          onClick={onCreateMode}
          className="card-floating p-4 flex items-center justify-between w-full border-2 border-dashed border-border"
        >
          <span className="text-muted-foreground font-medium text-sm">Create mode</span>
          <Plus className="w-4 h-4 text-accent" />
        </button>
      </div>
      <button onClick={onClose} className="btn-brick w-full">Done</button>
    </ModalSheet>
  );
}
