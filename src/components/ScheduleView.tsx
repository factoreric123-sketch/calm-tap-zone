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
      <h1 className="text-title mb-1">Schedules</h1>
      <p className="text-caption mb-6">Automate your focus sessions</p>

      <div className="space-y-3 mb-8">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="card-floating p-5 flex items-center justify-between">
            <button onClick={() => onEditSchedule(schedule.id)} className="text-left flex-1">
              <h3 className="font-bold text-sm">{schedule.name}</h3>
              <p className="text-caption text-xs">
                {schedule.startTime} · {getDaysLabel(schedule.days)}
              </p>
              <p className="text-accent text-xs font-semibold mt-0.5">
                {getModeName(schedule.modeId)}
              </p>
            </button>
            <Switch checked={schedule.enabled} onCheckedChange={() => toggleSchedule(schedule.id)} />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3">
        <span className="text-caption">Create new schedule</span>
        <button
          onClick={onCreateSchedule}
          className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center"
        >
          <Plus className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
