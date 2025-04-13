import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  IRecommendationVideoParams,
  IRecommendationVideosInfo,
} from "../types/IRecommendations";
import { recommendationsApi } from "../api/recommendations";

type VideoQueryOptions = Omit<
  UseQueryOptions<IRecommendationVideosInfo | undefined, Error>,
  "queryKey" | "queryFn"
>;

export const useVideoRecommendations = (
  params: IRecommendationVideoParams,
  options?: VideoQueryOptions,
) => {
  return useQuery<IRecommendationVideosInfo | undefined, Error>({
    queryKey: ["videoRecommendations", params],
    queryFn: () => recommendationsApi.getIds(params),
    ...options,
  });
};
