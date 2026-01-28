import { useState, useEffect } from 'react';
import { useBrick } from '@/contexts/BrickContext';
import { ModalSheet } from './ModalSheet';
import { DaySelector } from './DaySelector';
import type { Schedule } from '@/hooks/useBrickState';

interface EditScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  scheduleId?: string;
}

export function EditScheduleModal({ isOpen, onClose, scheduleId }: EditScheduleModalProps) {
  const { schedules, modes, updateSchedule, addSchedule, deleteSchedule } = useBrick();
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('06:00');
  const [endTime, setEndTime] = useState<string>('onBrickTap');
  const [modeId, setModeId] = useState('');
  const [days, setDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);

  const isNewSchedule = !scheduleId;
  const schedule = schedules.find((s) => s.id === scheduleId);

  useEffect(() => {
    if (schedule) {
      setName(schedule.name);
      setStartTime(schedule.startTime);
      setEndTime(schedule.endTime);
      setModeId(schedule.modeId);
      setDays(schedule.days);
    } else {
      setName('');
      setStartTime('06:00');
      setEndTime('onBrickTap');
      setModeId(modes[0]?.id || '');
      setDays([0, 1, 2, 3, 4, 5, 6]);
    }
  }, [schedule, modes, isOpen]);

  const handleSave = () => {
    const scheduleData = {
      name: name || 'New Schedule',
      startTime,
      endTime,
      modeId: modeId || modes[0]?.id || '',
      days,
      enabled: true,
    };

    if (isNewSchedule) {
      addSchedule(scheduleData);
    } else if (scheduleId) {
      updateSchedule(scheduleId, scheduleData);
    }
    onClose();
  };

  const handleDelete = () => {
    if (scheduleId) {
      deleteSchedule(scheduleId);
      onClose();
    }
  };

  const formatTimeDisplay = (time: string) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const currentMode = modes.find((m) => m.id === modeId);

  return (
    <ModalSheet 
      isOpen={isOpen} 
      onClose={onClose} 
      title={isNewSchedule ? 'Create schedule' : 'Edit schedule'}
    >
      {/* Name input */}
      <div className="card-floating p-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-right bg-transparent outline-none font-medium"
            placeholder="Schedule name"
          />
        </div>
      </div>

      {/* Time settings */}
      <div className="card-floating p-4 mb-4 space-y-3">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <span className="text-muted-foreground">Starts</span>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="bg-transparent outline-none font-medium text-right"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Ends</span>
          <span className="font-medium">On Brick Tap</span>
        </div>
      </div>

      {/* Mode selector */}
      <div className="card-floating p-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Brick Mode</span>
          <select
            value={modeId}
            onChange={(e) => setModeId(e.target.value)}
            className="bg-transparent outline-none font-medium text-right appearance-none cursor-pointer"
          >
            {modes.map((mode) => (
              <option key={mode.id} value={mode.id}>
                {mode.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Day selector */}
      <div className="mb-8">
        <DaySelector selectedDays={days} onChange={setDays} />
      </div>

      {/* Save button */}
      <button onClick={handleSave} className="btn-brick w-full mb-3">
        Save Schedule
      </button>

      {/* Delete button */}
      {!isNewSchedule && (
        <button
          onClick={handleDelete}
          className="w-full text-center text-muted-foreground font-medium py-2"
        >
          Delete Schedule
        </button>
      )}
    </ModalSheet>
  );
}
