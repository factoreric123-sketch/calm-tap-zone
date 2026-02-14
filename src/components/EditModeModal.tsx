import { useState, useEffect } from 'react';
import { useBrick } from '@/contexts/BrickContext';
import { ModalSheet } from './ModalSheet';
import type { BrickMode } from '@/hooks/useBrickState';

interface EditModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  modeId?: string;
  onBack: () => void;
}

export function EditModeModal({ isOpen, onClose, modeId, onBack }: EditModeModalProps) {
  const { modes, updateMode, addMode, deleteMode } = useBrick();
  const [activeTab, setActiveTab] = useState<'block' | 'allow'>('block');
  const [name, setName] = useState('');
  const [blockedApps, setBlockedApps] = useState<string[]>([]);

  const isNewMode = !modeId;
  const mode = modes.find((m) => m.id === modeId);

  useEffect(() => {
    if (mode) {
      setName(mode.name);
      setBlockedApps(mode.blockedApps);
    } else {
      setName('');
      setBlockedApps([]);
    }
  }, [mode, isOpen]);

  const handleSave = () => {
    if (isNewMode) {
      addMode({ name: name || 'New Mode', blockedApps, blockedWebsites: [] });
    } else if (modeId) {
      updateMode(modeId, { name, blockedApps });
    }
    onBack();
  };

  const handleDelete = () => {
    if (modeId && modes.length > 1) {
      deleteMode(modeId);
      onBack();
    }
  };

  const displayApps = blockedApps.length > 0 ? blockedApps : ['Instagram'];

  return (
    <ModalSheet isOpen={isOpen} onClose={onClose} title={isNewMode ? 'Create Mode' : 'Edit Mode'} showBack onBack={onBack}>
      <div className="bg-secondary rounded-full p-1 flex mb-6">
        <button
          onClick={() => setActiveTab('block')}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all ${
            activeTab === 'block' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'
          }`}
        >
          Block apps
        </button>
        <button
          onClick={() => setActiveTab('allow')}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all ${
            activeTab === 'allow' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'
          }`}
        >
          Allow apps
        </button>
      </div>

      <div className="card-floating p-5 mb-6 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <span className="text-caption">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-right bg-transparent outline-none font-bold text-sm"
            placeholder="Mode name"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-caption">Blocking</span>
            <span className="text-accent font-semibold text-sm">{displayApps.length}/50</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {displayApps.slice(0, 5).map((app, idx) => (
              <div key={idx} className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <span className="text-xs">📷</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={handleSave} className="btn-brick w-full mb-3">Save</button>

      {!isNewMode && modes.length > 1 && (
        <button onClick={handleDelete} className="w-full text-center text-destructive font-semibold py-2 text-sm">
          Delete Mode
        </button>
      )}
    </ModalSheet>
  );
}
