import Navigation from '@/components/common/Navigation';
import ControlPanel from '@/components/dashboard/ControlPanel';
import TelemetryDisplay from '@/components/dashboard/TelemetryDisplay';
import StatusPanel from '@/components/dashboard/StatusPanel';
import CameraFeed from '@/components/dashboard/CameraFeed';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Robot Control Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor and control your MT11 robot in real-time
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Control & Telemetry */}
          <div className="lg:col-span-1 space-y-6">
            <ControlPanel />
            <StatusPanel />
          </div>

          {/* Middle Column - Camera Feed */}
          <div className="lg:col-span-1">
            <CameraFeed />
          </div>

          {/* Right Column - Telemetry */}
          <div className="lg:col-span-1">
            <TelemetryDisplay />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-center">
              <div className="text-2xl mb-1">🎯</div>
              <p className="text-sm font-medium">Auto Navigate</p>
            </button>
            <button className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-center">
              <div className="text-2xl mb-1">📊</div>
              <p className="text-sm font-medium">Data Logs</p>
            </button>
            <button className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-center">
              <div className="text-2xl mb-1">🔧</div>
              <p className="text-sm font-medium">Diagnostics</p>
            </button>
            <button className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-center">
              <div className="text-2xl mb-1">💾</div>
              <p className="text-sm font-medium">Save Config</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
