import { useBrick } from '@/contexts/BrickContext';
import { formatTime } from '@/hooks/useBrickState';
import { ChevronDown } from 'lucide-react';
import brickLightImg from '@/assets/brick-light.png';
import brickDarkImg from '@/assets/brick-dark.png';

interface BrickViewProps {
  onModeSelect: () => void;
}

export function BrickView({ onModeSelect }: BrickViewProps) {
  const { 
    isBricked, 
    brick, 
    unbrick, 
    elapsedTime, 
    getCurrentMode,
    modes 
  } = useBrick();

  const currentMode = getCurrentMode();
  const totalBlocked = (currentMode?.blockedApps.length || 0) + (currentMode?.blockedWebsites.length || 0);

  if (isBricked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 pt-8">
        {/* Timer label */}
        <p className="text-muted-foreground text-sm mb-2">You've been Bricked for</p>
        
        {/* Timer display */}
        <h1 className="text-display mb-12">{formatTime(elapsedTime)}</h1>
        
        {/* Brick device image */}
        <div className="mb-8">
          <img 
            src={brickDarkImg} 
            alt="Brick Device" 
            className="w-48 h-48 object-contain"
          />
        </div>
        
        {/* Mode info */}
        <p className="font-semibold text-lg mb-1">Mode: {currentMode?.name}</p>
        <p className="text-muted-foreground mb-16">
          Blocking {currentMode?.blockedApps.length || 0} app{(currentMode?.blockedApps.length || 0) !== 1 ? 's' : ''}, {currentMode?.blockedWebsites.length || 0} website{(currentMode?.blockedWebsites.length || 0) !== 1 ? 's' : ''}
        </p>
        
        {/* Unbrick button */}
        <button
          onClick={unbrick}
          className="btn-brick w-full max-w-sm"
        >
          Unbrick device
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-120px)] px-6 pt-8">
      {/* Time badge */}
      <div className="time-badge mb-12">
        <span className="font-semibold">0h 0m</span>
        <span className="text-muted-foreground">today</span>
      </div>
      
      {/* Brick device image */}
      <div className="mb-8 flex-1 flex items-center">
        <img 
          src={brickLightImg} 
          alt="Brick Device" 
          className="w-52 h-52 object-contain"
        />
      </div>
      
      {/* Mode selector */}
      <button
        onClick={onModeSelect}
        className="flex items-center gap-2 mb-2"
      >
        <span className="font-semibold text-lg">Mode: {currentMode?.name}</span>
        <ChevronDown className="w-5 h-5" />
      </button>
      <p className="text-muted-foreground mb-8">
        Blocking {totalBlocked} app{totalBlocked !== 1 ? 's' : ''}, {currentMode?.blockedWebsites.length || 0} website{(currentMode?.blockedWebsites.length || 0) !== 1 ? 's' : ''}
      </p>
      
      {/* Brick button */}
      <div className="w-full max-w-sm mb-8">
        <button
          onClick={brick}
          className="btn-brick w-full"
        >
          Brick device
        </button>
      </div>
    </div>
  );
}
