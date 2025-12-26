import { useEffect, useState } from 'react';
import { Battery, Thermometer, Gauge, Activity, Wifi, Clock } from 'lucide-react';

interface TelemetryData {
  battery: number;
  temperature: number;
  speed: number;
  uptime: string;
  signalStrength: number;
  cpuUsage: number;
}

const TelemetryDisplay = () => {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    battery: 85,
    temperature: 42,
    speed: 0,
    uptime: '00:15:32',
    signalStrength: 92,
    cpuUsage: 35
  });

  useEffect(() => {
    // Simulate telemetry updates
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        battery: Math.max(0, prev.battery - Math.random() * 0.1),
        temperature: 40 + Math.random() * 5,
        cpuUsage: 30 + Math.random() * 20,
        signalStrength: 85 + Math.random() * 15
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getBatteryColor = (level: number) => {
    if (level > 60) return 'text-green-500';
    if (level > 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < 50) return 'text-green-500';
    if (temp < 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h2 className="text-xl font-semibold text-foreground mb-4">System Telemetry</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Battery */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Battery className={`size-5 ${getBatteryColor(telemetry.battery)}`} />
            <span className="text-sm font-medium text-muted-foreground">Battery</span>
          </div>
          <p className={`text-2xl font-bold ${getBatteryColor(telemetry.battery)}`}>
            {telemetry.battery.toFixed(1)}%
          </p>
        </div>

        {/* Temperature */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className={`size-5 ${getTemperatureColor(telemetry.temperature)}`} />
            <span className="text-sm font-medium text-muted-foreground">Temperature</span>
          </div>
          <p className={`text-2xl font-bold ${getTemperatureColor(telemetry.temperature)}`}>
            {telemetry.temperature.toFixed(1)}°C
          </p>
        </div>

        {/* Speed */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="size-5 text-blue-500" />
            <span className="text-sm font-medium text-muted-foreground">Speed</span>
          </div>
          <p className="text-2xl font-bold text-blue-500">
            {telemetry.speed.toFixed(1)} m/s
          </p>
        </div>

        {/* CPU Usage */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="size-5 text-purple-500" />
            <span className="text-sm font-medium text-muted-foreground">CPU Usage</span>
          </div>
          <p className="text-2xl font-bold text-purple-500">
            {telemetry.cpuUsage.toFixed(1)}%
          </p>
        </div>

        {/* Signal Strength */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Wifi className="size-5 text-cyan-500" />
            <span className="text-sm font-medium text-muted-foreground">Signal</span>
          </div>
          <p className="text-2xl font-bold text-cyan-500">
            {telemetry.signalStrength.toFixed(0)}%
          </p>
        </div>

        {/* Uptime */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="size-5 text-orange-500" />
            <span className="text-sm font-medium text-muted-foreground">Uptime</span>
          </div>
          <p className="text-2xl font-bold text-orange-500">
            {telemetry.uptime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TelemetryDisplay;
