import { useBrick } from '@/contexts/BrickContext';
import { Plus } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface ScheduleViewProps {
  onEditSchedule: (scheduleId: string) => void;
  onCreateSchedule: () => void;
}

export function ScheduleView({ onEditSchedule, onCreateSchedule }: ScheduleViewProps) {
  const { schedules, toggleSchedule, modes } = useBrick();

  const getDaysLabel = (days: number[]) => {
    if (days.length === 7) return 'Everyday';
    if (days.length === 5 && !days.includes(0) && !days.includes(6)) return 'Weekdays';
    if (days.length === 2 && days.includes(0) && days.includes(6)) return 'Weekends';
    return `${days.length} days`;
  };

  const getModeName = (modeId: string) => {
    return modes.find((m) => m.id === modeId)?.name || 'Unknown';
  };

  return (
    <div className="min-h-[calc(100vh-120px)] px-6 pt-8 pb-32">
      <h1 className="text-title mb-6">Schedules</h1>

      {/* Schedule list */}
      <div className="space-y-4 mb-8">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="card-floating p-4 flex items-center justify-between"
          >
            <button
              onClick={() => onEditSchedule(schedule.id)}
              className="text-left flex-1"
            >
              <h3 className="font-semibold text-lg">{schedule.name}</h3>
              <p className="text-muted-foreground text-sm">
                {schedule.startTime} • {getDaysLabel(schedule.days)}
              </p>
              <p className="text-muted-foreground text-sm">
                Mode: {getModeName(schedule.modeId)}
              </p>
            </button>
            <Switch
              checked={schedule.enabled}
              onCheckedChange={() => toggleSchedule(schedule.id)}
            />
          </div>
        ))}
      </div>

      {/* Create new schedule */}
      <div className="flex flex-col items-center gap-4">
        <span className="text-muted-foreground">Create new schedule</span>
        <button
          onClick={onCreateSchedule}
          className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center shadow-neumorphic"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
