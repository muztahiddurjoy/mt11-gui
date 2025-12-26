import { Video, VideoOff } from 'lucide-react';
import { useState } from 'react';

const CameraFeed = () => {
  const [isConnected] = useState(true);

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Camera Feed</h2>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <span className="relative flex size-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full size-3 bg-green-500"></span>
              </span>
              <span className="text-sm text-green-500 font-medium">Live</span>
            </>
          ) : (
            <>
              <span className="size-3 rounded-full bg-red-500"></span>
              <span className="text-sm text-red-500 font-medium">Offline</span>
            </>
          )}
        </div>
      </div>
      
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        {isConnected ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Video className="size-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Camera feed will appear here</p>
              <p className="text-muted-foreground text-xs mt-1">
                Configure stream URL in settings
              </p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <VideoOff className="size-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Camera offline</p>
            </div>
          </div>
        )}
        
        {/* Overlay with camera info */}
        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded text-xs text-white">
          Main Camera • 1920x1080
        </div>
        
        {/* Recording indicator */}
        {isConnected && (
          <div className="absolute top-2 right-2 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded">
            <span className="size-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs text-white">REC</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraFeed;
