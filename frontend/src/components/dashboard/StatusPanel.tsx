import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

interface StatusItem {
  id: string;
  label: string;
  status: 'ok' | 'warning' | 'error' | 'info';
  message: string;
}

const StatusPanel = () => {
  const statusItems: StatusItem[] = [
    { id: '1', label: 'Motors', status: 'ok', message: 'All motors operational' },
    { id: '2', label: 'Camera', status: 'ok', message: 'Video feed active' },
    { id: '3', label: 'Sensors', status: 'ok', message: 'All sensors responding' },
    { id: '4', label: 'Network', status: 'ok', message: 'Connection stable (92%)' },
    { id: '5', label: 'Battery', status: 'warning', message: 'Battery at 85%' },
    { id: '6', label: 'GPS', status: 'info', message: 'Acquiring satellites...' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok':
        return <CheckCircle className="size-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="size-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="size-5 text-red-500" />;
      case 'info':
        return <Info className="size-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'ok':
        return 'bg-green-500/10 border-green-500/20';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/20';
      case 'error':
        return 'bg-red-500/10 border-red-500/20';
      case 'info':
        return 'bg-blue-500/10 border-blue-500/20';
      default:
        return 'bg-muted/50';
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h2 className="text-xl font-semibold text-foreground mb-4">System Status</h2>
      
      <div className="space-y-3">
        {statusItems.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded-lg border ${getStatusBg(item.status)} transition-all`}
          >
            <div className="flex items-center gap-3">
              {getStatusIcon(item.status)}
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusPanel;
