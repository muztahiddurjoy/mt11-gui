import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  RotateCcw,
  Square,
  Play,
  Pause
} from 'lucide-react';

const ControlPanel = () => {
  const [isActive, setIsActive] = useState(false);
  const [speed, setSpeed] = useState(50);

  const handleMovement = (direction: string) => {
    console.log(`Moving ${direction} at speed ${speed}%`);
    // Here you would send the command to your robot backend
  };

  const handleStop = () => {
    console.log('Emergency stop activated');
    // Here you would send stop command to robot
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Robot Control</h2>
        <div className="flex gap-2">
          <Button
            variant={isActive ? "destructive" : "default"}
            size="sm"
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? (
              <>
                <Pause className="size-4" />
                Stop
              </>
            ) : (
              <>
                <Play className="size-4" />
                Start
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Speed Control */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-2 block">
          Speed: {speed}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          disabled={!isActive}
        />
      </div>

      {/* Directional Controls */}
      <div className="grid gap-4">
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="icon-lg"
            onClick={() => handleMovement('forward')}
            disabled={!isActive}
            className="hover:bg-primary/10"
          >
            <ArrowUp className="size-6" />
          </Button>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="icon-lg"
            onClick={() => handleMovement('left')}
            disabled={!isActive}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="size-6" />
          </Button>
          
          <Button
            variant="destructive"
            size="icon-lg"
            onClick={handleStop}
            className="font-bold"
          >
            <Square className="size-6" />
          </Button>
          
          <Button
            variant="outline"
            size="icon-lg"
            onClick={() => handleMovement('right')}
            disabled={!isActive}
            className="hover:bg-primary/10"
          >
            <ArrowRight className="size-6" />
          </Button>
        </div>
        
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="icon-lg"
            onClick={() => handleMovement('backward')}
            disabled={!isActive}
            className="hover:bg-primary/10"
          >
            <ArrowDown className="size-6" />
          </Button>
        </div>

        {/* Rotation Controls */}
        <div className="flex justify-center gap-4 mt-2">
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleMovement('rotate-left')}
            disabled={!isActive}
            className="hover:bg-primary/10"
          >
            <RotateCcw className="size-5" />
            Rotate Left
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleMovement('rotate-right')}
            disabled={!isActive}
            className="hover:bg-primary/10"
          >
            <RotateCw className="size-5" />
            Rotate Right
          </Button>
        </div>
      </div>

      <div className="mt-4 p-3 bg-muted/50 rounded-md">
        <p className="text-xs text-muted-foreground">
          Status: {isActive ? (
            <span className="text-green-500 font-medium">Active - Ready for commands</span>
          ) : (
            <span className="text-yellow-500 font-medium">Standby - Click Start to enable</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ControlPanel;
