"use client";

import RelatedSkeletonVideoCard from "@/app/components/Video/Skeletons/RelatedSkeletonVideoCard";
import RelatedVideoCard from "@/app/components/Video/RelatedVideoCard";
import { useVideosContent } from "@/app/hooks/useContent";
import type { IVideoInfoSuccessResponse } from "@/app/types/IContent";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { IRecommendationVideoParams } from "@/app/types/IRecommendations";

export default function RelatedVideoSection() {
  const [displayedVideos, setDisplayedVideos] = useState<IVideoInfoSuccessResponse[]>([]);
  const [page, setPage] = useState(1);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const videosPerPage = 5;
  const prevVideosRef = useRef<IVideoInfoSuccessResponse[]>([]);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const params: IRecommendationVideoParams = {
    page_size: videosPerPage,
    page: page,
  };

  const {
    data: newVideos = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useVideosContent(params, {
    retry: 3,
    refetchInterval: false,
  });

  useEffect(() => {
    if (isSuccess && isInitialLoading) {
      setIsInitialLoading(false);
    }
  }, [isSuccess, isInitialLoading]);

  useEffect(() => {
    if (isSuccess && newVideos.length > 0) {
      const prevVideos = prevVideosRef.current;
      const isDataChanged =
        JSON.stringify(newVideos) !== JSON.stringify(prevVideos);

      if (isDataChanged) {
        setDisplayedVideos((prev) => {
          const existingIds = new Set(
            prev.map((video) => video.data.video_uuid)
          );
          const filteredNewVideos = newVideos.filter(
            (video) => !existingIds.has(video.data.video_uuid)
          );
          return [...prev, ...filteredNewVideos];
        });
        prevVideosRef.current = newVideos;
      }
    }
  }, [isSuccess, newVideos]);

  const loadMoreVideos = useCallback(() => {
    if (!isLoading && isSuccess && newVideos.length === videosPerPage) {
      setPage((prev) => prev + 1);
    }
  }, [isLoading, isSuccess, newVideos.length]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreVideos();
        }
      },
      { threshold: 0.5 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loadMoreVideos]);

  useEffect(() => {
    if (containerRef.current && isInitialLoading) {
      const minHeight = videosPerPage * 100;
      containerRef.current.style.minHeight = `${minHeight}px`;
    }
  }, [isInitialLoading]);

  if (isError) {
    console.error(error);
    return <div className="p-4 text-red-400">Error loading videos</div>;
  }

  const renderContent = () => {
    if (isInitialLoading) {
      return Array.from({ length: videosPerPage }).map((_, index) => (
        <div key={`loading-${index}`} className="w-full transition-opacity duration-300 ease-in-out opacity-0 animate-fade-in">
          <RelatedSkeletonVideoCard />
        </div>
      ));
    }

    return (
      <>
        {displayedVideos.map((video, index) => (
          <div
            key={video.data.video_uuid || `video-${index}`}
            className="w-full transition-opacity duration-300 ease-in-out opacity-0 animate-fade-in"
          >
            <Link href={`/video/${video.data.video_uuid}`}>
              <RelatedVideoCard
                video_uuid={video.data.video_uuid}
                title={video.data.title}
                description={video.data.description}
                video_url={video.data.video_url}
                thumbnail_url={video.data.thumbnail_url}
              />
            </Link>
          </div>
        ))}

        {isLoading && !isInitialLoading && (
          <div className="w-full transition-opacity duration-300 ease-in-out opacity-0 animate-fade-in">
            <RelatedSkeletonVideoCard />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="space-y-3 h-full">
      <h3 className="font-medium text-sm mb-2">Рекомендуемые видео</h3>
      <div ref={containerRef} className="flex flex-col gap-3">
        {renderContent()}

        {isSuccess && newVideos.length === videosPerPage && (
          <div
            ref={loadMoreRef}
            className="h-10 flex justify-center items-center"
          >
          </div>
        )}
      </div>
    </div>
  );
}

