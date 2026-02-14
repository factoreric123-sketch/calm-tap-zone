import { ChevronRight } from 'lucide-react';

export function SettingsView() {
  const settingsItems = [
    { label: 'Notification Settings', value: '', emoji: '🔔' },
    { label: 'Emergency Unbricks', value: '3 remaining', emoji: '🚨' },
    { label: 'Pair New Brick', value: '', emoji: '📱' },
    { label: 'App Permissions', value: '', emoji: '🔐' },
    { label: 'Account', value: '', emoji: '👤' },
    { label: 'Help & Support', value: '', emoji: '💬' },
    { label: 'About Brick', value: 'v2.1.0', emoji: '📦' },
  ];

  return (
    <div className="min-h-[calc(100vh-120px)] px-6 pt-8 pb-32">
      <h1 className="text-title mb-2">⚙️ Settings</h1>
      <p className="text-muted-foreground font-semibold text-sm mb-6">Customize your Brick experience</p>

      <div className="space-y-3">
        {settingsItems.map((item) => (
          <button
            key={item.label}
            className="card-floating w-full p-4 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{item.emoji}</span>
              <span className="font-bold">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.value && (
                <span className="text-muted-foreground text-sm font-semibold">{item.value}</span>
              )}
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-muted-foreground text-sm font-bold">
          Brick helps you reclaim your focus ✨
        </p>
        <p className="text-muted-foreground text-xs font-semibold mt-1">
          © 2024 Brick Technologies
        </p>
      </div>
    </div>
  );
}
