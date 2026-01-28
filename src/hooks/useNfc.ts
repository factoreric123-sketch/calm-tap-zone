import { useState, useEffect, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';

// NFC types
interface NfcTag {
  id: number[];
  techTypes?: string[];
}

interface NfcEvent {
  tag?: NfcTag;
}

// We'll dynamically import the NFC plugin only on native
let CapacitorNfc: any = null;

export function useNfc() {
  const [isNfcSupported, setIsNfcSupported] = useState(false);
  const [isNfcEnabled, setIsNfcEnabled] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [lastTagId, setLastTagId] = useState<string | null>(null);

  const isNative = Capacitor.isNativePlatform();

  useEffect(() => {
    const initNfc = async () => {
      if (!isNative) {
        console.log('NFC: Running in web mode, NFC not available');
        return;
      }

      try {
        // Dynamic import for native only
        const nfcModule = await import('@capgo/capacitor-nfc');
        CapacitorNfc = nfcModule.CapacitorNfc;
        
        // Check if NFC is supported and enabled
        const { isEnabled } = await CapacitorNfc.isEnabled();
        setIsNfcSupported(true);
        setIsNfcEnabled(isEnabled);
        
        console.log('NFC initialized, enabled:', isEnabled);
      } catch (error) {
        console.log('NFC not available:', error);
        setIsNfcSupported(false);
      }
    };

    initNfc();
  }, [isNative]);

  const startScan = useCallback(async (): Promise<string | null> => {
    if (!isNative || !CapacitorNfc) {
      console.log('NFC scan requested but not on native platform');
      return null;
    }

    return new Promise(async (resolve) => {
      try {
        setIsScanning(true);

        // Add listener for NFC tag detection
        const listener = await CapacitorNfc.addListener('nfcEvent', (event: NfcEvent) => {
          if (event.tag?.id) {
            const tagId = event.tag.id.join('-');
            console.log('NFC tag detected:', tagId);
            setLastTagId(tagId);
            setIsScanning(false);
            listener.remove();
            resolve(tagId);
          }
        });

        // Start scanning
        await CapacitorNfc.startScanSession();
        
        // Timeout after 30 seconds
        setTimeout(() => {
          if (isScanning) {
            stopScan();
            resolve(null);
          }
        }, 30000);
        
      } catch (error) {
        console.error('NFC scan error:', error);
        setIsScanning(false);
        resolve(null);
      }
    });
  }, [isNative, isScanning]);

  const stopScan = useCallback(async () => {
    if (!isNative || !CapacitorNfc) return;

    try {
      await CapacitorNfc.stopScanSession();
      setIsScanning(false);
    } catch (error) {
      console.error('Error stopping NFC scan:', error);
    }
  }, [isNative]);

  // Write data to NFC tag (for pairing)
  const writeTag = useCallback(async (data: string): Promise<boolean> => {
    if (!isNative || !CapacitorNfc) {
      console.log('NFC write requested but not on native platform');
      return false;
    }

    try {
      // Start write session
      await CapacitorNfc.startScanSession({ mode: 'write' });
      
      // Write NDEF message
      await CapacitorNfc.write({
        message: {
          records: [
            {
              type: 'text',
              payload: data,
            },
          ],
        },
      });

      await CapacitorNfc.stopScanSession();
      return true;
    } catch (error) {
      console.error('NFC write error:', error);
      return false;
    }
  }, [isNative]);

  return {
    isNfcSupported,
    isNfcEnabled,
    isScanning,
    isNative,
    lastTagId,
    startScan,
    stopScan,
    writeTag,
  };
}

// Utility to generate a unique Brick ID
export function generateBrickId(): string {
  return `BRICK-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}
