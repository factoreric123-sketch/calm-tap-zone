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
      addMode({
        name: name || 'New Mode',
        blockedApps,
        blockedWebsites: [],
      });
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

  // Sample blocked apps for display
  const displayApps = blockedApps.length > 0 ? blockedApps : ['Instagram'];

  return (
    <ModalSheet 
      isOpen={isOpen} 
      onClose={onClose} 
      title={isNewMode ? 'Create mode' : 'Edit mode'}
      showBack
      onBack={onBack}
    >
      {/* Block/Allow tabs */}
      <div className="card-floating p-1 flex mb-6">
        <button
          onClick={() => setActiveTab('block')}
          className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-colors ${
            activeTab === 'block'
              ? 'bg-card shadow-sm'
              : 'text-muted-foreground'
          }`}
        >
          Block apps
        </button>
        <button
          onClick={() => setActiveTab('allow')}
          className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-colors ${
            activeTab === 'allow'
              ? 'bg-card shadow-sm'
              : 'text-muted-foreground'
          }`}
        >
          Allow apps
        </button>
      </div>

      <div className="card-floating p-4 mb-6 space-y-4">
        {/* Mode name */}
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <span className="text-muted-foreground">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-right bg-transparent outline-none font-medium"
            placeholder="Mode name"
          />
        </div>

        {/* Blocking info */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Blocking</span>
            <span className="text-muted-foreground">{displayApps.length}/50</span>
          </div>
          
          {/* App icons */}
          <div className="flex gap-2 flex-wrap">
            {displayApps.slice(0, 5).map((app, idx) => (
              <div
                key={idx}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center"
              >
                <span className="text-white text-xs font-bold">📷</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save button */}
      <button onClick={handleSave} className="btn-brick w-full mb-3">
        Save mode settings
      </button>

      {/* Delete button */}
      {!isNewMode && modes.length > 1 && (
        <button
          onClick={handleDelete}
          className="w-full text-center text-muted-foreground font-medium py-2"
        >
          Delete Mode
        </button>
      )}
    </ModalSheet>
  );
}
