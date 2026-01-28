import { Check, ChevronRight } from 'lucide-react';

interface AppListItemProps {
  icon?: string;
  name: string;
  selected?: boolean;
  count?: number;
  expandable?: boolean;
  onClick?: () => void;
}

export function AppListItem({
  icon,
  name,
  selected,
  count,
  expandable,
  onClick,
}: AppListItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 py-3 px-1 border-b border-border/50 last:border-0"
    >
      {/* Checkbox */}
      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          selected
            ? 'bg-primary border-primary'
            : 'border-muted-foreground/30'
        }`}
      >
        {selected && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
      </div>

      {/* Icon */}
      {icon && (
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
          {icon}
        </div>
      )}

      {/* Name */}
      <span className="flex-1 text-left font-medium">{name}</span>

      {/* Count or chevron */}
      {count !== undefined && (
        <span className="text-muted-foreground">{count}</span>
      )}
      {expandable && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
    </button>
  );
}

// Category icons mapping
export const categoryIcons: Record<string, string> = {
  'All Apps & Categories': '≡',
  'Social': '💬',
  'Games': '🎮',
  'Entertainment': '🎬',
  'Creativity': '🎨',
  'Education': '🌍',
  'Health & Fitness': '🏃',
  'Information & Reading': '📰',
  'Productivity & Finance': '📈',
  'Shopping & Food': '🛒',
  'Travel': '🌴',
};

// Sample apps for demo
export const sampleApps: Record<string, string[]> = {
  'Social': ['FaceTime', 'Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'TikTok', 'Snapchat'],
  'Games': ['Candy Crush', 'Clash of Clans', 'PUBG', 'Minecraft'],
  'Entertainment': ['Netflix', 'YouTube', 'Spotify', 'Disney+'],
};
