"use client"

import { Button } from "@/app/components/ui/button"
import RelatedSkeletonVideoCard from "@/app/components/Video/Skeletons/RelatedSkeletonVideoCard"
import RelatedVideoCard from "@/app/components/Video/RelatedVideoCard"
import { useVideosContent } from "@/app/hooks/useContent"
import type { IVideoInfo } from "@/app/types/IContent"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function RelatedVideoSection() {
  const [displayedVideos, setDisplayedVideos] = useState<IVideoInfo[]>([])
  const videosPerPage = 5 // Increased from 3 to 5 since cards are smaller now

  const {
    data: newVideos = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useVideosContent({
    retry: 3,
    refetchInterval: false,
  })

  useEffect(() => {
    if (isSuccess && newVideos.length > 0 && displayedVideos.length === 0) {
      setDisplayedVideos(newVideos.slice(0, videosPerPage))
    }
  }, [isSuccess, newVideos, displayedVideos.length])

  const handleLoadMore = () => {
    setDisplayedVideos(newVideos.slice(0, displayedVideos.length + videosPerPage))
  }

  if (isError) {
    console.error(error)
    return <div className="p-4 text-red-400">Error loading videos</div>
  }

  return (
    <div className="space-y-3 h-full">
      {" "}
      <h3 className="font-medium text-sm mb-2">Рекомендуемые видео</h3>
      <div className="flex flex-col gap-3">
        {" "}
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <div key={`loading-${index}`} className="w-full">
              <RelatedSkeletonVideoCard />
            </div>
          ))}
        {displayedVideos.length === 0 &&
          !isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <div key={`empty-${index}`} className="w-full">
              <RelatedSkeletonVideoCard />
            </div>
          ))}
        {displayedVideos.map((video, index) => (
          <Link
            key={video.data.video_uuid || `video-${index}`}
            href={`/video/${video.data.video_uuid}`}
            className="block w-full"
          >
            <RelatedVideoCard
              video_uuid={video.data.video_uuid}
              title={video.data.title}
              description={video.data.description}
              video_url={video.data.video_url}
              thumbnail_url={video.data.thumbnail_url}
            />
          </Link>
        ))}
      </div>
      {displayedVideos.length < (newVideos?.length || 0) && (
        <div className="flex justify-center lg:justify-end mt-2">
          {" "}
          <Button onClick={handleLoadMore} variant="outline" size="sm" className="text-xs cursor-pointer">
            Загрузить еще
          </Button>
        </div>
      )}
    </div>
  )
}

