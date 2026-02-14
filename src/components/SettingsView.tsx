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
      <h1 className="text-title mb-1">Settings</h1>
      <p className="text-caption mb-6">Customize your Brick experience</p>

      <div className="card-floating divide-y divide-border">
        {settingsItems.map((item) => (
          <button key={item.label} className="w-full p-4 flex items-center justify-between text-left">
            <span className="font-medium text-sm">{item.label}</span>
            <div className="flex items-center gap-2">
              {item.value && <span className="text-caption text-xs">{item.value}</span>}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-caption text-xs">Brick helps you reclaim your focus</p>
        <p className="text-muted-foreground text-xs mt-1">© 2024 Brick Technologies</p>
      </div>
    </div>
  );
}
