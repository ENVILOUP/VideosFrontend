import Hls from "hls.js";
import { useCallback, useEffect } from "react";

export const VideoPlayer = ({
  videoUrl,
  thumbnailUrl,
  onHlsReady,
  videoRef,
}: {
  videoUrl: string;
  thumbnailUrl?: string;
  onHlsReady: (hls: Hls, video: HTMLVideoElement) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) => {
  const memorizedOnHlsReady = useCallback(
    (hls: Hls, video: HTMLVideoElement) => {
      onHlsReady(hls, video);
    },
    [onHlsReady]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoUrl;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      memorizedOnHlsReady(hls, video);

      return () => {
        hls.destroy();
      };
    }
  }, [videoUrl, memorizedOnHlsReady, videoRef]);

  return (
    <div className="relative w-full aspect-video">
      <video
        ref={videoRef}
        className="w-full h-full object-contain rounded-t-lg bg-zinc-900/60"
        poster={thumbnailUrl}
        playsInline
      />
    </div>
  );
};