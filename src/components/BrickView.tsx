import { useBrick } from '@/contexts/BrickContext';
import { useNfc } from '@/hooks/useNfc';
import { formatTime } from '@/hooks/useBrickState';
import { ChevronDown, Smartphone } from 'lucide-react';
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
  } = useBrick();

  const { 
    isNfcSupported, 
    isNfcEnabled, 
    isScanning, 
    isNative,
    startScan,
    stopScan 
  } = useNfc();

  const currentMode = getCurrentMode();
  const totalBlocked = (currentMode?.blockedApps.length || 0) + (currentMode?.blockedWebsites.length || 0);

  const handleBrickAction = async () => {
    if (isBricked) {
      if (isNative && isNfcEnabled) {
        const tagId = await startScan();
        if (tagId) unbrick();
      } else {
        unbrick();
      }
    } else {
      if (isNative && isNfcEnabled) {
        const tagId = await startScan();
        if (tagId) brick();
      } else {
        brick();
      }
    }
  };

  const handleCancelScan = () => {
    stopScan();
  };

  if (isScanning) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 pt-8">
        <div className="animate-pulse-soft mb-8">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
            <Smartphone className="w-12 h-12 text-foreground" />
          </div>
        </div>
        <h2 className="text-title mb-2">Tap your Brick</h2>
        <p className="text-muted-foreground text-center mb-8 font-medium">
          Hold your phone near your Brick device to {isBricked ? 'unbrick' : 'brick'}
        </p>
        <button onClick={handleCancelScan} className="text-muted-foreground font-semibold">
          Cancel
        </button>
      </div>
    );
  }

  if (isBricked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 pt-8">
        <p className="text-caption mb-2">You've been Bricked for</p>
        <h1 className="text-display mb-10">{formatTime(elapsedTime)}</h1>
        
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-muted rounded-full blur-2xl scale-125" />
          <img src={brickDarkImg} alt="Brick Device" className="w-48 h-48 object-contain relative z-10" />
        </div>
        
        <div className="card-floating px-6 py-3 mb-12">
          <p className="font-bold text-sm mb-0.5">{currentMode?.name}</p>
          <p className="text-muted-foreground text-xs font-medium">
            Blocking {currentMode?.blockedApps.length || 0} apps, {currentMode?.blockedWebsites.length || 0} websites
          </p>
        </div>
        
        <button onClick={handleBrickAction} className="btn-brick w-full max-w-sm">
          {isNative && isNfcEnabled ? 'Tap to unbrick' : 'Unbrick'}
        </button>
        
        {isNative && !isNfcEnabled && (
          <p className="text-caption mt-4">Enable NFC for tap-to-unbrick</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-120px)] px-6 pt-8">
      <div className="time-badge mb-10">
        <span className="font-bold">0h 0m</span>
        <span className="text-muted-foreground">today</span>
      </div>
      
      <div className="mb-8 flex-1 flex items-center relative">
        <img src={brickLightImg} alt="Brick Device" className="w-52 h-52 object-contain relative z-10" />
      </div>
      
      <button onClick={onModeSelect} className="card-floating flex items-center gap-2 mb-2 px-5 py-3">
        <span className="font-bold text-sm">Mode: {currentMode?.name}</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>
      <p className="text-caption mb-8">
        Blocking {totalBlocked} apps, {currentMode?.blockedWebsites.length || 0} websites
      </p>
      
      <div className="w-full max-w-sm mb-8">
        <button onClick={handleBrickAction} className="btn-brick w-full">
          {isNative && isNfcEnabled ? 'Tap to start' : 'Start'}
        </button>
      </div>
      
      {isNative && (
        <div className="text-center">
          {isNfcSupported ? (
            isNfcEnabled ? (
              <p className="text-caption flex items-center gap-2 justify-center">
                <span className="w-2 h-2 rounded-full bg-brick-success" />
                NFC ready
              </p>
            ) : (
              <p className="text-caption">Enable NFC in settings for tap-to-brick</p>
            )
          ) : (
            <p className="text-caption">NFC not available on this device</p>
          )}
        </div>
      )}
    </div>
  );
}
