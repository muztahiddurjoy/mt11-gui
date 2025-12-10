import { useEffect, useRef, useState } from 'react';

interface WebRTCPlayerProps {
  streamUrl: string;
}

const WebRTCPlayer = ({ streamUrl }: WebRTCPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const [status, setStatus] = useState('Initializing...');
  const retryTimeoutRef = useRef<number | null>(null);
  const isUnmountedRef = useRef(false);

  useEffect(() => {
    isUnmountedRef.current = false;

    const startStream = async () => {
      if (isUnmountedRef.current) return;

      const pc = new RTCPeerConnection({
        iceServers: [] 
      });
      pcRef.current = pc;

      pc.addTransceiver('video', { direction: 'recvonly' });
      pc.addTransceiver('audio', { direction: 'recvonly' });

      // Monitor connection state for reconnection
      pc.onconnectionstatechange = () => {
        console.log('Connection state:', pc.connectionState);
        let retryInterval;
        if (pc.connectionState === 'failed' || pc.connectionState === 'disconnected') {
          setStatus('Connection lost, retrying...');
          pc.close();
          // Retry after 2 seconds
          if (!isUnmountedRef.current) {

            retryInterval = window.setInterval(() => {
              startStream();
            }, 500);
            retryTimeoutRef.current = retryInterval;
          }
        } else if (pc.connectionState === 'connected') {
          setStatus('Live');
            if (retryTimeoutRef.current) {
                clearInterval(retryTimeoutRef.current);
                retryTimeoutRef.current = null;
            }

        }
      };

      pc.ontrack = (event) => {
        if (videoRef.current) {
          videoRef.current.srcObject = event.streams[0];
          setStatus('Live');
          
          // Monitor video element for stream interruption
          const stream = event.streams[0];
          const videoTrack = stream.getVideoTracks()[0];
          
          if (videoTrack) {
            videoTrack.onended = () => {
              console.log('Video track ended');
              setStatus('Connection lost, retrying...');
              pc.close();
              if (!isUnmountedRef.current) {
                const retryInterval = window.setInterval(() => {
                  startStream();
                }, 500);
                retryTimeoutRef.current = retryInterval;
              }
            };
          }
        }
      };

      try {
        // 4. Create Offer
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        // 5. Send Offer to MediaMTX via WHEP
        // Append /whep to your base stream URL
        const whepEndpoint = `${streamUrl}/whep`; 
        
        const response = await fetch(whepEndpoint, {
          method: 'POST',
          body: offer.sdp,
          headers: { 'Content-Type': 'application/sdp' }
        });

        if (!response.ok) throw new Error(`Server Error: ${response.status}`);

        // 6. Receive Answer and set Remote Description
        const answer = await response.text();
        await pc.setRemoteDescription({
          type: 'answer',
          sdp: answer
        });

      } catch (err) {
        console.error("WHEP Error:", err);
        setStatus(`Error: ${err instanceof Error ? err.message : String(err)}`);
      }
    };

    startStream();

    // Cleanup: Close connection when component unmounts
    return () => {
      isUnmountedRef.current = true;
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      if (pcRef.current) pcRef.current.close();
    };
  }, [streamUrl]);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Status: {status}</div>
      <video
        ref={videoRef}
        autoPlay
        muted         // Muted is REQUIRED for most browsers to allow autoplay
        playsInline   // Required for iOS
        controls={false}
        style={{ width: '100%', maxWidth: '800px', backgroundColor: '#000', borderRadius: '8px' }}
      />
    </div>
  );
};

export default WebRTCPlayer;