import { IVideoInfo } from "../types/IContent";
import { useQueries, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useVideoRecommendations } from "./useRecommendations";
import { contentApi } from "../api/content";
import { IRecommendationVideoParams } from "../types/IRecommendations";

type VideoQueryOptions = Omit<
  UseQueryOptions<IVideoInfo | undefined, Error>,
  "queryKey" | "queryFn"
>;

export const useVideosContent = (
  params: IRecommendationVideoParams,
  options?: VideoQueryOptions
) => {
  const { data: recommendationsData, isSuccess: recommendationsIsSuccess } =
    useVideoRecommendations(params);
  
  const videoQueries = useQueries({
    queries:
      recommendationsIsSuccess && recommendationsData?.data
        ? recommendationsData.data.items.map((video) => ({
            queryKey: ["videoContent", video.video_uuid],
            queryFn: () => contentApi.getVideoInfoById(video.video_uuid),
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

export const useVideoContent = (id: string, options?: VideoQueryOptions) => {
  return useQuery<IVideoInfo | undefined, Error>({
    queryKey: ["videoContent", id],
    queryFn: () => contentApi.getVideoInfoById(id),
    ...options,
  });
};