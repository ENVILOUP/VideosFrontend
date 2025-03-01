import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { IRecommendationVideosInfo } from "../types/IRecommendations";
import { recommendationsApi } from "../api/recommendations";

type VideoQueryOptions = Omit<
  UseQueryOptions<IRecommendationVideosInfo | undefined, Error>,
  "queryKey" | "queryFn"
>;

export const useVideoRecommendations = (options?: VideoQueryOptions) => {
  return useQuery<IRecommendationVideosInfo | undefined, Error>({
    queryKey: ["videoRecommendations"],
    queryFn: recommendationsApi.getIds,
    ...options,
  });
};
