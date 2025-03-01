import { IVideoInfo } from "../types/IContent";
import { getVideoInfoById } from "../api/content";
import { useQueries, UseQueryOptions } from "@tanstack/react-query";
import { useVideoRecommendations } from "./useRecommendations";

type VideoQueryOptions = Omit<
  UseQueryOptions<IVideoInfo | undefined, Error>,
  "queryKey" | "queryFn"
>;

export const useVideoContent = (
  options?: VideoQueryOptions
) => {
  const { data: recommendationsData, isSuccess: recommendationsIsSuccess } = useVideoRecommendations();
  
  const videoQueries = useQueries({
    queries:
      recommendationsIsSuccess && recommendationsData?.data
        ? recommendationsData.data.map((video) => ({
            queryKey: ["videoContent", video.video_uuid],
            queryFn: () => getVideoInfoById(video.video_uuid),
            enabled: !!video.video_uuid,
            ...options,
          }))
        : [],
  });

  const isLoading = videoQueries.some((query) => query.isLoading);
  const isSuccess = videoQueries.every((query) => query.isSuccess);
  const isError = videoQueries.some((query) => query.isError);
  const data = videoQueries.map((query) => query.data).filter(Boolean) as IVideoInfo[];
  const error = videoQueries.find((query) => query.isError)?.error || null;

  return {
    isLoading,
    isSuccess,
    isError,
    data,
    error,
  };
};
