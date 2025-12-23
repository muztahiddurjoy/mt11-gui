import Navigation from '@/components/common/Navigation'
import WebRTCPlayer from "@/components/vision/webrtc-player-adapter"

const Vision = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-foreground mb-4">Vision System</h1>
        <div className="bg-card rounded-lg p-6 border border-border">
          <WebRTCPlayer streamUrl="http://localhost:8889/webcam"/>
        </div>
      </div>
    </div>
  )
}

export default Vision