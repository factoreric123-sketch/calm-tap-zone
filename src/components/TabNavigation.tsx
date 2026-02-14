import { Box, Calendar, BarChart3, Settings } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'brick', label: 'Home', icon: Box },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'activity', label: 'Activity', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border pb-safe">
      <div className="max-w-md mx-auto flex justify-around py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`tab-item ${isActive ? 'active' : ''}`}
            >
              {isActive ? (
                <span className="bg-primary text-primary-foreground rounded-full px-4 py-1.5 flex items-center gap-1.5 text-xs font-bold">
                  <tab.icon className="w-4 h-4" strokeWidth={2} />
                  {tab.label}
                </span>
              ) : (
                <tab.icon className="w-5 h-5" strokeWidth={1.5} />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
