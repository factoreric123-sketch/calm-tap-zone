import { ActivityView } from '@/components/ActivityView';

const fonts = [
  { name: 'Current (SF Pro Rounded)', style: { fontFamily: "'SF Pro Rounded', -apple-system, BlinkMacSystemFont, 'Nunito', sans-serif" } },
  { name: 'Quicksand', style: { fontFamily: "'Quicksand', sans-serif" } },
  { name: 'Baloo 2', style: { fontFamily: "'Baloo 2', cursive" } },
  { name: 'Fredoka One', style: { fontFamily: "'Fredoka', cursive" } },
  { name: 'Hank (Nunito Rounded)', style: { fontFamily: "'Nunito', sans-serif" } },
];

export default function FontCompare() {
  return (
    <div className="min-h-screen bg-background p-4">
      <h1 className="text-2xl font-bold text-center mb-2 text-foreground">Font Comparison</h1>
      <p className="text-center text-muted-foreground text-sm mb-6">Swipe horizontally to compare</p>
      <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory">
        {fonts.map((font) => (
          <div key={font.name} className="snap-center shrink-0 w-[390px]">
            <div className="bg-primary text-primary-foreground text-center py-2 rounded-t-2xl font-bold text-sm">
              {font.name}
            </div>
            <div
              className="border-2 border-primary/30 rounded-b-2xl overflow-hidden bg-background"
              style={font.style}
            >
              <ActivityView />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
