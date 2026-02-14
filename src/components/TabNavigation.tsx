import { Box, Calendar, BarChart3, Settings } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'brick', label: 'Brick', icon: Box },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'activity', label: 'Activity', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-lg border-t border-border/30 pb-safe">
      <div className="max-w-md mx-auto flex justify-around py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
          >
            <tab.icon className="w-6 h-6" strokeWidth={activeTab === tab.id ? 2.5 : 1.8} />
            <span className="text-xs font-bold">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
