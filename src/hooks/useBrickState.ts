import { useState, useEffect, useCallback } from 'react';

export interface BrickMode {
  id: string;
  name: string;
  blockedApps: string[];
  blockedWebsites: string[];
}

export interface Schedule {
  id: string;
  name: string;
  startTime: string;
  endTime: string | 'onBrickTap';
  modeId: string;
  days: number[];
  enabled: boolean;
}

export interface BrickSession {
  startTime: Date;
  modeId: string;
}

interface BrickState {
  isBricked: boolean;
  currentSession: BrickSession | null;
  modes: BrickMode[];
  schedules: Schedule[];
  selectedModeId: string;
  elapsedTime: number;
}

const defaultModes: BrickMode[] = [
  {
    id: 'mindful',
    name: 'Mindful Mode',
    blockedApps: ['Instagram', 'Twitter'],
    blockedWebsites: ['reddit.com'],
  },
];

const defaultSchedules: Schedule[] = [
  {
    id: 'morning',
    name: 'Morning',
    startTime: '06:00',
    endTime: 'onBrickTap',
    modeId: 'mindful',
    days: [0, 1, 2, 3, 4, 5, 6],
    enabled: false,
  },
];

export function useBrickState() {
  const [state, setState] = useState<BrickState>(() => {
    const saved = localStorage.getItem('brickState');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        currentSession: parsed.currentSession ? {
          ...parsed.currentSession,
          startTime: new Date(parsed.currentSession.startTime),
        } : null,
      };
    }
    return {
      isBricked: false,
      currentSession: null,
      modes: defaultModes,
      schedules: defaultSchedules,
      selectedModeId: 'mindful',
      elapsedTime: 0,
    };
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('brickState', JSON.stringify(state));
  }, [state]);

  // Update elapsed time
  useEffect(() => {
    if (!state.isBricked || !state.currentSession) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor(
        (Date.now() - new Date(state.currentSession!.startTime).getTime()) / 1000
      );
      setState((prev) => ({ ...prev, elapsedTime: elapsed }));
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isBricked, state.currentSession]);

  const brick = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isBricked: true,
      currentSession: {
        startTime: new Date(),
        modeId: prev.selectedModeId,
      },
      elapsedTime: 0,
    }));
  }, []);

  const unbrick = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isBricked: false,
      currentSession: null,
      elapsedTime: 0,
    }));
  }, []);

  const setSelectedMode = useCallback((modeId: string) => {
    setState((prev) => ({ ...prev, selectedModeId: modeId }));
  }, []);

  const addMode = useCallback((mode: Omit<BrickMode, 'id'>) => {
    const id = `mode-${Date.now()}`;
    setState((prev) => ({
      ...prev,
      modes: [...prev.modes, { ...mode, id }],
    }));
    return id;
  }, []);

  const updateMode = useCallback((id: string, updates: Partial<BrickMode>) => {
    setState((prev) => ({
      ...prev,
      modes: prev.modes.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    }));
  }, []);

  const deleteMode = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      modes: prev.modes.filter((m) => m.id !== id),
      selectedModeId: prev.selectedModeId === id ? prev.modes[0]?.id || '' : prev.selectedModeId,
    }));
  }, []);

  const addSchedule = useCallback((schedule: Omit<Schedule, 'id'>) => {
    const id = `schedule-${Date.now()}`;
    setState((prev) => ({
      ...prev,
      schedules: [...prev.schedules, { ...schedule, id }],
    }));
    return id;
  }, []);

  const updateSchedule = useCallback((id: string, updates: Partial<Schedule>) => {
    setState((prev) => ({
      ...prev,
      schedules: prev.schedules.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    }));
  }, []);

  const deleteSchedule = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      schedules: prev.schedules.filter((s) => s.id !== id),
    }));
  }, []);

  const toggleSchedule = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      schedules: prev.schedules.map((s) =>
        s.id === id ? { ...s, enabled: !s.enabled } : s
      ),
    }));
  }, []);

  const getCurrentMode = useCallback(() => {
    const modeId = state.currentSession?.modeId || state.selectedModeId;
    return state.modes.find((m) => m.id === modeId) || state.modes[0];
  }, [state.modes, state.currentSession, state.selectedModeId]);

  return {
    ...state,
    brick,
    unbrick,
    setSelectedMode,
    addMode,
    updateMode,
    deleteMode,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    toggleSchedule,
    getCurrentMode,
  };
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}h ${minutes}m ${secs}s`;
}

export function formatTimeShort(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}
