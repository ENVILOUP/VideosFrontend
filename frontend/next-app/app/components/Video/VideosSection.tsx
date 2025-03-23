import { useVideosContent } from "@/app/hooks/useContent";
import VideoCard from "./VideoCard";
import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { IVideoInfo } from "@/app/types/IContent";
import SkeletonVideoCard from "./Skeletons/SkeletonVideoCard";

export default function VideosSection() {
  const [displayedVideos, setDisplayedVideos] = useState<IVideoInfo[]>([]);

  const {
    data: newVideos = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useVideosContent({
    retry: 3,
    refetchInterval: false,
  });

  useEffect(() => {
    if (isSuccess && newVideos.length > 0 && displayedVideos.length === 0) {
      setDisplayedVideos(newVideos);
    }
  }, [isSuccess, newVideos, displayedVideos.length]);

  const handleLoadMore = () => {
    console.log("Loading more videos...");
  };

  if (isError) {
    console.error(error);
    return <div className="p-4 text-center text-red-500">Error loading videos</div>;
  }

  return (
    <>
      <div className="mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr p-6 pt-4 pl-3.5">
          {displayedVideos.length === 0 &&
            Array.from({ length: 9 }).map((_, index) => (
              <SkeletonVideoCard key={index} />
            ))}
          {displayedVideos.map((video) => {
            return (
              <Link
                key={video.data.video_uuid}
                href={`/video/${video.data.video_uuid}`}
              >
                <VideoCard
                  key={video.data.video_uuid}
                  video_uuid={video.data.video_uuid}
                  title={video.data.title}
                  description={video.data.description}
                  video_url={video.data.video_url}
                  thumbnail_url={video.data.thumbnail_url}
                />
              </Link>
            );
          })}
        </div>

        {isSuccess && (
          <div className="flex justify-center mb-8">
            <Button className="cursor-pointer" onClick={handleLoadMore} disabled={isLoading}>
              {isLoading ? "Загрузка..." : "Загрузить еще"}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}