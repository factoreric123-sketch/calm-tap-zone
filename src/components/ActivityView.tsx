import { ChevronDown } from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer, ReferenceLine } from 'recharts';

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
      <button className="flex items-center gap-2 mx-auto mb-2">
        <span className="text-heading">Weekly Activity</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>
      <p className="text-center text-caption uppercase tracking-widest mb-6">This Week</p>

      <div className="card-floating p-5 mb-6">
        <p className="text-caption mb-1">Avg Brick Time</p>
        <h1 className="text-display">10h 19m</h1>
        <p className="text-caption flex items-center gap-1 mt-1">
          <span>↘</span> 19% from last week
        </p>
      </div>

      <div className="card-floating p-4 mb-6">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 600 }}
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
                  fontWeight: 700,
                  dx: 30,
                }}
              />
              <Bar
                dataKey="hours"
                fill="hsl(var(--foreground))"
                radius={[6, 6, 0, 0]}
                maxBarSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-between px-4 -mt-1">
            {weeklyData.map((d) => (
              <span key={d.day} className="text-xs text-muted-foreground w-8 text-center font-medium">
                {d.date}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="card-floating p-5 mb-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-brick-success" />
          <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Today</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0h 0m</span>
            <p className="text-caption">1 session</p>
          </div>
          <div className="flex-1 mx-4">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-foreground/30 w-1/3 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="card-floating p-5 opacity-50">
        <span className="text-caption">TUE, JAN 27</span>
      </div>
    </div>
  );
}
