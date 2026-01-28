import { createContext, useContext, ReactNode } from 'react';
import { useBrickState } from '@/hooks/useBrickState';

type BrickContextType = ReturnType<typeof useBrickState>;

const BrickContext = createContext<BrickContextType | null>(null);

export function BrickProvider({ children }: { children: ReactNode }) {
  const brickState = useBrickState();
  
  return (
    <BrickContext.Provider value={brickState}>
      <div className={brickState.isBricked ? 'bricked' : ''}>
        {children}
      </div>
    </BrickContext.Provider>
  );
}

export function useBrick() {
  const context = useContext(BrickContext);
  if (!context) {
    throw new Error('useBrick must be used within a BrickProvider');
  }
  return context;
}
