import { useVideoContent } from "@/app/hooks/useContent";
import Hls from "hls.js";
import { use, useCallback, useRef, useState } from "react";
import { VideoPlayer } from "../../components/Video/Player/VideoPlayer";
import { VideoControls } from "../../components/Video/Player/VideoControls";
import { VideoInfo } from "../../components/Video/Player/VideoInfo";
import SearchSection from "@/app/components/SearchSection";
import RelatedVideoSection from "./RelatedVideoSection";
import { Skeleton } from "@/app/components/ui/skeleton";

interface VideoContentProps {
  params: Promise<{ id: string }>;
}
export default function VideoContentSection({ params }: VideoContentProps) {
  const resolvedParams = use(params);
  const videoId = resolvedParams.id;

  const { data, isLoading, isSuccess, isError, error } = useVideoContent(
    videoId,
    {
      retry: 3,
      refetchInterval: false,
    }
  );

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hls, setHls] = useState<Hls | null>(null);

  const handleHlsReady = useCallback((hlsInstance: Hls) => {
    setHls(hlsInstance);
  }, []);

  if (isError) {
    console.error(error);
    return <div>Error loading video</div>;
  }

  return (
    <div className="relative w-full rounded-lg overflow-hidden">
      <div className="flex justify-center mt-2.5 mb-6 gap-2">
        <SearchSection />
      </div>
      <div className="flex ml-2">
        {isLoading && (
          <div className="h-[450px] w-full mr-3">
            <div className="relative aspect-[16/9]">
              <Skeleton className="absolute inset-0 rounded-t-lg" />
            </div>
          </div>
        )}
        {isSuccess && data?.data && (
          <div className="w-full mr-3">
            <VideoPlayer
              videoUrl={data.data.video_url}
              thumbnailUrl={data.data.thumbnail_url}
              onHlsReady={handleHlsReady}
              videoRef={videoRef}
            />
            <VideoControls video={videoRef.current} hls={hls} id={videoId} />
            <VideoInfo videoData={data.data} />
          </div>
        )}
        <div className="mr-2">
          <RelatedVideoSection />
        </div>
      </div>
    </div>
  );
}
