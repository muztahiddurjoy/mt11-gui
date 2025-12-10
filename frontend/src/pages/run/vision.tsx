import WebRTCPlayer from "@/components/vision/webrtc-player-adapter"

const Vision = () => {
  return (
    <div>
      <WebRTCPlayer streamUrl="http://localhost:8889/webcam"/>
    </div>
  )
}

export default Vision