import { useBrick } from '@/contexts/BrickContext';
import { useNfc } from '@/hooks/useNfc';
import { formatTime } from '@/hooks/useBrickState';
import { ChevronDown, Smartphone, Sparkles } from 'lucide-react';
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
        if (tagId) {
          unbrick();
        }
      } else {
        unbrick();
      }
    } else {
      if (isNative && isNfcEnabled) {
        const tagId = await startScan();
        if (tagId) {
          brick();
        }
      } else {
        brick();
      }
    }
  };

  const handleCancelScan = () => {
    stopScan();
  };

  // Scanning overlay
  if (isScanning) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 pt-8">
        <div className="animate-pulse-soft mb-8">
          <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
            <Smartphone className="w-14 h-14 text-primary" />
          </div>
        </div>
        
        <h2 className="text-xl font-extrabold mb-2">Tap your Brick</h2>
        <p className="text-muted-foreground text-center mb-8 font-semibold">
          Hold your phone near your Brick device to {isBricked ? 'unbrick' : 'brick'}
        </p>
        
        <button
          onClick={handleCancelScan}
          className="text-muted-foreground font-bold"
        >
          Cancel
        </button>
      </div>
    );
  }

  if (isBricked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 pt-8">
        {/* Timer label */}
        <p className="text-muted-foreground text-sm font-bold mb-2">You've been Bricked for</p>
        
        {/* Timer display */}
        <h1 className="text-display mb-10 text-primary">{formatTime(elapsedTime)}</h1>
        
        {/* Brick device image */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-125" />
          <img 
            src={brickDarkImg} 
            alt="Brick Device" 
            className="w-48 h-48 object-contain relative z-10"
          />
        </div>
        
        {/* Mode info */}
        <div className="card-floating px-6 py-3 mb-12">
          <p className="font-extrabold text-base mb-0.5">🎯 {currentMode?.name}</p>
          <p className="text-muted-foreground text-sm font-semibold">
            Blocking {currentMode?.blockedApps.length || 0} app{(currentMode?.blockedApps.length || 0) !== 1 ? 's' : ''}, {currentMode?.blockedWebsites.length || 0} website{(currentMode?.blockedWebsites.length || 0) !== 1 ? 's' : ''}
          </p>
        </div>
        
        {/* Unbrick button */}
        <button
          onClick={handleBrickAction}
          className="btn-brick w-full max-w-sm"
        >
          {isNative && isNfcEnabled ? '✋ Tap Brick to unbrick' : '🔓 Unbrick device'}
        </button>
        
        {/* NFC status indicator */}
        {isNative && !isNfcEnabled && (
          <p className="text-muted-foreground text-sm font-semibold mt-4">
            Enable NFC for tap-to-unbrick
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-120px)] px-6 pt-8">
      {/* Time badge */}
      <div className="time-badge mb-10">
        <Sparkles className="w-4 h-4 text-accent" />
        <span className="font-extrabold">0h 0m</span>
        <span className="text-muted-foreground font-semibold">today</span>
      </div>
      
      {/* Brick device image */}
      <div className="mb-8 flex-1 flex items-center relative">
        <div className="absolute inset-0 bg-primary/8 rounded-full blur-3xl scale-110" />
        <img 
          src={brickLightImg} 
          alt="Brick Device" 
          className="w-52 h-52 object-contain relative z-10"
        />
      </div>
      
      {/* Mode selector */}
      <button
        onClick={onModeSelect}
        className="card-floating flex items-center gap-2 mb-2 px-5 py-3"
      >
        <span className="font-extrabold text-base">🎯 Mode: {currentMode?.name}</span>
        <ChevronDown className="w-5 h-5 text-primary" />
      </button>
      <p className="text-muted-foreground mb-8 font-semibold text-sm">
        Blocking {totalBlocked} app{totalBlocked !== 1 ? 's' : ''}, {currentMode?.blockedWebsites.length || 0} website{(currentMode?.blockedWebsites.length || 0) !== 1 ? 's' : ''}
      </p>
      
      {/* Brick button */}
      <div className="w-full max-w-sm mb-8">
        <button
          onClick={handleBrickAction}
          className="btn-brick w-full"
        >
          {isNative && isNfcEnabled ? '✋ Tap Brick to start' : '🧱 Brick device'}
        </button>
      </div>
      
      {/* NFC status */}
      {isNative && (
        <div className="text-center">
          {isNfcSupported ? (
            isNfcEnabled ? (
              <p className="text-muted-foreground text-sm font-semibold flex items-center gap-2 justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-brick-success" />
                NFC ready
              </p>
            ) : (
              <p className="text-muted-foreground text-sm font-semibold">
                Enable NFC in settings for tap-to-brick
              </p>
            )
          ) : (
            <p className="text-muted-foreground text-sm font-semibold">
              NFC not available on this device
            </p>
          )}
        </div>
      )}
    </div>
  );
}
