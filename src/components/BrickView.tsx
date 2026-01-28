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
      // Unbrick flow
      if (isNative && isNfcEnabled) {
        // Wait for NFC tap to unbrick
        const tagId = await startScan();
        if (tagId) {
          unbrick();
        }
      } else {
        // Fallback: button unbrick
        unbrick();
      }
    } else {
      // Brick flow
      if (isNative && isNfcEnabled) {
        // Wait for NFC tap to brick
        const tagId = await startScan();
        if (tagId) {
          brick();
        }
      } else {
        // Fallback: button brick
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
          <Smartphone className="w-24 h-24 text-muted-foreground" />
        </div>
        
        <h2 className="text-xl font-semibold mb-2">Tap your Brick</h2>
        <p className="text-muted-foreground text-center mb-8">
          Hold your phone near your Brick device to {isBricked ? 'unbrick' : 'brick'}
        </p>
        
        <button
          onClick={handleCancelScan}
          className="text-muted-foreground font-medium"
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
          onClick={handleBrickAction}
          className="btn-brick w-full max-w-sm"
        >
          {isNative && isNfcEnabled ? 'Tap Brick to unbrick' : 'Unbrick device'}
        </button>
        
        {/* NFC status indicator */}
        {isNative && !isNfcEnabled && (
          <p className="text-muted-foreground text-sm mt-4">
            Enable NFC for tap-to-unbrick
          </p>
        )}
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
          onClick={handleBrickAction}
          className="btn-brick w-full"
        >
          {isNative && isNfcEnabled ? 'Tap Brick to start' : 'Brick device'}
        </button>
      </div>
      
      {/* NFC status */}
      {isNative && (
        <div className="text-center">
          {isNfcSupported ? (
            isNfcEnabled ? (
              <p className="text-muted-foreground text-sm flex items-center gap-2 justify-center">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                NFC ready
              </p>
            ) : (
              <p className="text-muted-foreground text-sm">
                Enable NFC in settings for tap-to-brick
              </p>
            )
          ) : (
            <p className="text-muted-foreground text-sm">
              NFC not available on this device
            </p>
          )}
        </div>
      )}
    </div>
  );
}
