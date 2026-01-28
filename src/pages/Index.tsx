import { useState } from 'react';
import { BrickProvider } from '@/contexts/BrickContext';
import { TabNavigation } from '@/components/TabNavigation';
import { BrickView } from '@/components/BrickView';
import { ScheduleView } from '@/components/ScheduleView';
import { ActivityView } from '@/components/ActivityView';
import { SettingsView } from '@/components/SettingsView';
import { ModeSelectModal } from '@/components/ModeSelectModal';
import { EditModeModal } from '@/components/EditModeModal';
import { EditScheduleModal } from '@/components/EditScheduleModal';

function AppContent() {
  const [activeTab, setActiveTab] = useState('brick');
  const [showModeSelect, setShowModeSelect] = useState(false);
  const [showEditMode, setShowEditMode] = useState(false);
  const [editingModeId, setEditingModeId] = useState<string | undefined>();
  const [showEditSchedule, setShowEditSchedule] = useState(false);
  const [editingScheduleId, setEditingScheduleId] = useState<string | undefined>();

  const handleEditMode = (modeId: string) => {
    setEditingModeId(modeId);
    setShowModeSelect(false);
    setShowEditMode(true);
  };

  const handleCreateMode = () => {
    setEditingModeId(undefined);
    setShowModeSelect(false);
    setShowEditMode(true);
  };

  const handleBackFromEditMode = () => {
    setShowEditMode(false);
    setShowModeSelect(true);
  };

  const handleEditSchedule = (scheduleId: string) => {
    setEditingScheduleId(scheduleId);
    setShowEditSchedule(true);
  };

  const handleCreateSchedule = () => {
    setEditingScheduleId(undefined);
    setShowEditSchedule(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'brick':
        return <BrickView onModeSelect={() => setShowModeSelect(true)} />;
      case 'schedule':
        return (
          <ScheduleView
            onEditSchedule={handleEditSchedule}
            onCreateSchedule={handleCreateSchedule}
          />
        );
      case 'activity':
        return <ActivityView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <BrickView onModeSelect={() => setShowModeSelect(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-md mx-auto">
        {renderContent()}
      </main>

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Modals */}
      <ModeSelectModal
        isOpen={showModeSelect}
        onClose={() => setShowModeSelect(false)}
        onEditMode={handleEditMode}
        onCreateMode={handleCreateMode}
      />

      <EditModeModal
        isOpen={showEditMode}
        onClose={() => {
          setShowEditMode(false);
          setShowModeSelect(false);
        }}
        modeId={editingModeId}
        onBack={handleBackFromEditMode}
      />

      <EditScheduleModal
        isOpen={showEditSchedule}
        onClose={() => setShowEditSchedule(false)}
        scheduleId={editingScheduleId}
      />
    </div>
  );
}

const Index = () => {
  return (
    <BrickProvider>
      <AppContent />
    </BrickProvider>
  );
};

export default Index;
