import { useVideoContent } from "@/app/hooks/useContent";
import Hls from "hls.js";
import { use, useCallback, useRef, useState } from "react";
import { VideoPlayer } from "../../components/Video/Player/VideoPlayer";
import { VideoControls } from "../../components/Video/Player/VideoControls";
import { VideoInfo } from "../../components/Video/Player/VideoInfo";
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
    return <div className="p-4 text-red-400">Error loading video</div>;
  }

  return (
    <div className="max-w-[2000px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-2/3 xl:w-3/4">
          {isLoading ? (
            <div>
              <div className="relative aspect-video">
                <Skeleton className="absolute inset-0 rounded-lg" />
              </div>
              <Skeleton className="h-12 w-full mt-4 rounded-lg" />
              <Skeleton className="h-24 w-full mt-4 rounded-lg" />
            </div>
          ) : isSuccess && data?.data ? (
            <div>
              <VideoPlayer
                videoUrl={data.data.video_url}
                thumbnailUrl={data.data.thumbnail_url}
                onHlsReady={handleHlsReady}
                videoRef={videoRef}
              />
              <VideoControls video={videoRef.current} hls={hls} id={videoId} />
              <VideoInfo videoData={data.data} />
            </div>
          ) : null}
        </div>
        
        <div className="w-full lg:w-1/3 xl:w-1/4">
          <RelatedVideoSection />
        </div>
      </div>
    </div>
  );
}