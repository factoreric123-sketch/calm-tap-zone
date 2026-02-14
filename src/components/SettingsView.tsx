import { ChevronRight } from 'lucide-react';

export function SettingsView() {
  const settingsItems = [
    { label: 'Notification Settings', value: '' },
    { label: 'Emergency Unbricks', value: '3 remaining' },
    { label: 'Pair New Brick', value: '' },
    { label: 'App Permissions', value: '' },
    { label: 'Account', value: '' },
    { label: 'Help & Support', value: '' },
    { label: 'About Brick', value: 'v2.1.0' },
  ];

  return (
    <div className="min-h-[calc(100vh-120px)] px-6 pt-8 pb-32">
      <h1 className="text-title mb-6">Settings</h1>

      <div className="card-floating overflow-hidden">
        {settingsItems.map((item, index) => (
          <button
            key={item.label}
            className={`w-full p-4 flex items-center justify-between text-left ${
              index < settingsItems.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <span className="font-medium">{item.label}</span>
            <div className="flex items-center gap-2">
              {item.value && (
                <span className="text-muted-foreground text-sm">{item.value}</span>
              )}
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground text-sm">
          Brick helps you reclaim your focus
        </p>
        <p className="text-muted-foreground text-xs mt-1">
          © 2024 Brick Technologies
        </p>
      </div>
    </div>
  );
}
