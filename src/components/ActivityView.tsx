import { ChevronDown } from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer, ReferenceLine } from 'recharts';

// Sample weekly data
const weeklyData = [
  { day: 'SUN', date: 25, hours: 14 },
  { day: 'MON', date: 26, hours: 12 },
  { day: 'TUE', date: 27, hours: 8 },
  { day: 'WED', date: 28, hours: 0 },
  { day: 'THU', date: 29, hours: 0 },
  { day: 'FRI', date: 30, hours: 0 },
  { day: 'SAT', date: 31, hours: 0 },
];

const avgHours = 10;

export function ActivityView() {
  return (
    <div className="min-h-[calc(100vh-120px)] px-6 pt-6 pb-32">
      {/* Header */}
      <button className="flex items-center gap-2 mx-auto mb-2">
        <span className="text-lg font-extrabold">📊 Weekly Activity</span>
        <ChevronDown className="w-5 h-5 text-primary" />
      </button>
      <p className="text-center text-muted-foreground text-sm uppercase tracking-wider font-bold mb-6">
        This Week
      </p>

      {/* Stats */}
      <div className="card-floating p-5 mb-6">
        <p className="text-muted-foreground text-sm font-bold">Avg Brick Time</p>
        <h1 className="text-display text-primary">10h 19m</h1>
        <p className="text-muted-foreground flex items-center gap-1 font-semibold">
          <span className="text-lg">↘</span> 19% from last week
        </p>
      </div>

      {/* Chart */}
      <div className="card-floating p-4 mb-6">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 700 }}
              />
              <ReferenceLine 
                y={avgHours} 
                stroke="hsl(var(--muted-foreground))" 
                strokeDasharray="4 4"
                label={{ 
                  value: 'AVG', 
                  position: 'right',
                  fill: 'hsl(var(--foreground))',
                  fontSize: 11,
                  fontWeight: 800,
                  dx: 30
                }}
              />
              <Bar 
                dataKey="hours" 
                fill="hsl(var(--primary))" 
                radius={[8, 8, 0, 0]}
                maxBarSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
          
          {/* Date labels */}
          <div className="flex justify-between px-4 -mt-1">
            {weeklyData.map((d) => (
              <span key={d.day} className="text-xs text-muted-foreground w-8 text-center font-bold">
                {d.date}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Today card */}
      <div className="card-floating p-5 mb-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2.5 h-2.5 rounded-full bg-brick-success" />
          <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Today</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-black">0h 0m</span>
            <p className="text-sm text-muted-foreground font-semibold">1 session</p>
          </div>
          <div className="flex-1 mx-4">
            <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary/50 w-1/3 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Previous day */}
      <div className="card-floating p-5 opacity-60">
        <span className="text-sm text-muted-foreground font-bold">TUE, JAN 27</span>
      </div>
    </div>
  );
}
