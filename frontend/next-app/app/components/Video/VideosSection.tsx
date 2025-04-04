"use client"

import { useVideosContent } from "@/app/hooks/useContent"
import VideoCard from "./VideoCard"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import type { IVideoInfo } from "@/app/types/IContent"
import SkeletonVideoCard from "./Skeletons/SkeletonVideoCard"
import type { IRecommendationVideoParams } from "@/app/types/IRecommendations"

export default function VideosSection() {
  const [displayedVideos, setDisplayedVideos] = useState<IVideoInfo[]>([])
  const [page, setPage] = useState(1)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const prevVideosRef = useRef<IVideoInfo[]>([])
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const params: IRecommendationVideoParams = {
    page_size: 15,
    page: page,
  }

  const {
    data: newVideos = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useVideosContent(params, {
    retry: 3,
    refetchInterval: false,
  })

  useEffect(() => {
    if (isSuccess && isInitialLoading) {
      setIsInitialLoading(false)
    }
  }, [isSuccess, isInitialLoading])

  useEffect(() => {
    if (isSuccess && newVideos.length > 0) {
      const prevVideos = prevVideosRef.current
      const isDataChanged = JSON.stringify(newVideos) !== JSON.stringify(prevVideos)

      if (isDataChanged) {
        setDisplayedVideos((prev) => {
          const existingIds = new Set(prev.map((video) => video.data.video_uuid))
          const filteredNewVideos = newVideos.filter((video) => !existingIds.has(video.data.video_uuid))
          return [...prev, ...filteredNewVideos]
        })
        prevVideosRef.current = newVideos
      }
    }
  }, [isSuccess, newVideos])

  useEffect(() => {
    if (containerRef.current && isInitialLoading) {
      const minHeight = 9 * 130 
      containerRef.current.style.minHeight = `${minHeight}px`
    }
  }, [isInitialLoading])

  const loadMoreVideos = useCallback(() => {
    if (!isLoading && isSuccess && newVideos.length > 0) {
      setPage((prev) => prev + 1)
    }
  }, [isLoading, isSuccess, newVideos.length])

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreVideos()
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.1,
      },
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [loadMoreVideos])

  if (isError) {
    console.error(error)
    return <div className="p-4 text-center text-red-500">Error loading videos</div>
  }

  return (
    <div className="mx-auto">
      <div
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-6 pt-4 pl-3.5"
      >
        {displayedVideos.length === 0 &&
          Array.from({ length: 9 }).map((_, index) => (
            <div key={`initial-skeleton-${index}`}>
              <SkeletonVideoCard />
            </div>
          ))}

        {displayedVideos.map((video) => (
          <Link
            key={video.data.video_uuid}
            href={`/video/${video.data.video_uuid}`}
            className="transition-opacity duration-300 ease-in-out opacity-0 animate-fade-in"
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
        ))}
      </div>

      {isSuccess && (
        <div ref={loadMoreRef} className="flex justify-center py-8 h-20">
          {isLoading && !isInitialLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full px-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={`bottom-skeleton-${index}`}>
                  <SkeletonVideoCard />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

