import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ISearchParams } from "../types/ISearch";
import { searchApi } from "../api/search";

type SearchQueryOptions = Omit<
  UseQueryOptions<ISearchParams | undefined, Error>,
  "queryKey" | "queryFn"
>;

export const useSearch = (params: ISearchParams) => {
  return useQuery<ISearchParams | undefined, Error>({
    queryKey: ["search", params],
    queryFn: () => {
      return searchApi.getVideoIds(params);
    },
  });
};
