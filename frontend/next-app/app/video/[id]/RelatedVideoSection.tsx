import { Button } from "@/app/components/ui/button";
import SkeletonVideoCard from "@/app/components/Video/SkeletonVideoCard";
import VideoCard from "@/app/components/Video/VideoCard";
import { useVideosContent } from "@/app/hooks/useContent";
import { IVideoInfo } from "@/app/types/IContent";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RelatedVideoSection() {
  const [displayedVideos, setDisplayedVideos] = useState<IVideoInfo[]>([]);
  const videosPerPage = 3;

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
      setDisplayedVideos(newVideos.slice(0, videosPerPage));
    }
  }, [isSuccess, newVideos, displayedVideos.length]);

  const handleLoadMore = () => {
    console.log("Loading more videos...");
    setDisplayedVideos(
      newVideos.slice(0, displayedVideos.length + videosPerPage)
    );
  };

  if (isError) {
    console.error(error);
    return <div>Error loading videos</div>;
  }

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col border rounded-lg overflow-hidden mb-3 w-[450px]"
          >
            <SkeletonVideoCard />
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {displayedVideos.length === 0 &&
        Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col border rounded-lg overflow-hidden mb-3 w-[450px]"
          >
            <SkeletonVideoCard />
          </div>
        ))}
      {displayedVideos.map((video, index) => (
        <div
          key={index}
          className="mx-auto flex flex-col border rounded-lg overflow-hidden mb-3 w-[450px]"
        >
          <Link href={`/video/${video.data.video_uuid}`}>
            <VideoCard
              video_uuid={video.data.video_uuid}
              title={video.data.title}
              description={video.data.description}
              video_url={video.data.video_url}
              thumbnail_url={video.data.thumbnail_url}
            />
          </Link>
        </div>
      ))}

      {displayedVideos.length < newVideos.length && (
        <div className="flex justify-end">
          <Button
            onClick={handleLoadMore}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 transition-colors duration-300 cursor-pointer"
          >
            Load more
          </Button>
        </div>
      )}
    </>
  );
}
