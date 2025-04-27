"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { useSearchParams } from "next/navigation";
import { useVideoContentByIds } from "../hooks/useContent";
import { IVideoInfo } from "../types/IContent";
import SearchSkeletonVideoCard from "../components/Video/Skeletons/SkeletonVideoCard";
import Link from "next/link";
import SearchVideoCard from "./SearchVideoCard";

let prevQuery = "";

export default function SearchContentSection() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [page, setPage] = useState(Number(searchParams.get("page")));
  const pageSize = searchParams.get("page_size");

  const [displayedVideos, setDisplayedVideos] = useState<IVideoInfo[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const prevVideosRef = useRef<IVideoInfo[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const searchResponse = useSearch({
    query: String(query),
    page: Number(page),
    page_size: Number(pageSize),
  });

  const data = searchResponse.data?.data;
  const ids = data?.results.map((item) => item) || [];
  console.log(ids);

  const isDataEmpty = ids.length === 0;

  const {
    data: newVideos = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useVideoContentByIds(ids, {
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
            prev.map((video) => video.data.video_uuid),
          );
          const filteredNewVideos = newVideos.filter(
            (video) => !existingIds.has(video.data.video_uuid),
          );
          return [...prev, ...filteredNewVideos];
        });
        prevVideosRef.current = newVideos;
      }
      if (query && query !== prevQuery) {
        setDisplayedVideos(newVideos);
        prevQuery = query;
      }
    }
  }, [isSuccess, newVideos, query]);

  useEffect(() => {
    if (containerRef.current && isInitialLoading) {
      const minHeight = 9 * 130;
      containerRef.current.style.minHeight = `${minHeight}px`;
    }
  }, [isInitialLoading]);

  const loadMoreVideos = useCallback(() => {
    if (!isLoading && isSuccess && newVideos.length > 0 && newVideos.length > Number(pageSize)) {
      setPage(prev => prev + 1);
    }
  }, [isLoading, isSuccess, newVideos.length, pageSize]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreVideos();
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.1,
      },
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loadMoreVideos]);

  if (isError) {
    console.error(error);
    return (
      <div className="justify-center text-red-500">Error loading videos</div>
    );
  }

  if (isDataEmpty) {
    return (
      <div className="flex justify-center text-gray-500 p-6 pt-4 pl-3.5">No results found</div>
    );
  }

  return (
    <div className="flex justify-center">
      <div
        ref={containerRef}
        className="grid grid-rows-1 gap-4 sm:gap-6 p-6 pt-4 pl-3.5 container lg:w-[65%] w-full"
      >
        {displayedVideos.length === 0 &&
          Array.from({ length: 9 }).map((_, index) => (
            <div key={`initial-skeleton-${index}`}>
              <SearchSkeletonVideoCard />
            </div>
          ))}

        {displayedVideos.map((video) => (
          <Link
            key={video.data.video_uuid}
            href={`/video/${video.data.video_uuid}`}
            className="transition-opacity duration-300 ease-in-out opacity-0 animate-fade-in h-fit w-full"
          >
            <SearchVideoCard
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

      {isSuccess && !isDataEmpty && (
        <div ref={loadMoreRef} className="flex justify-center py-8 h-20">
          {isLoading && !isInitialLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={`bottom-skeleton-${index}`}>
                  <SearchSkeletonVideoCard />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
