interface DaySelectorProps {
  selectedDays: number[];
  onChange: (days: number[]) => void;
}

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function DaySelector({ selectedDays, onChange }: DaySelectorProps) {
  const toggleDay = (index: number) => {
    if (selectedDays.includes(index)) {
      onChange(selectedDays.filter((d) => d !== index));
    } else {
      onChange([...selectedDays, index].sort());
    }
  };

  const allSelected = selectedDays.length === 7;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-caption">Repeat</span>
        <span className="text-caption">
          {allSelected ? 'Everyday' : `${selectedDays.length} days`}
        </span>
      </div>
      <div className="flex gap-2">
        {DAYS.map((day, index) => (
          <button
            key={index}
            onClick={() => toggleDay(index)}
            className={`day-button ${selectedDays.includes(index) ? 'selected' : ''}`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}
