import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { IRecommendationVideosInfo } from "../types/IRecommendations";
import { getIds } from "../api/recommendations";

type VideoQueryOptions = Omit<
  UseQueryOptions<IRecommendationVideosInfo | undefined, Error>,
  "queryKey" | "queryFn"
>;

export const useVideoRecommendations = (options?: VideoQueryOptions) => {
  return useQuery<IRecommendationVideosInfo | undefined, Error>({
    queryKey: ["videoRecommendations"],
    queryFn: getIds,
    ...options,
  });
};
