import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../api/search";
import { ISearchInfo, ISearchParams } from "../types/ISearch";


export const useSearch = (params: ISearchParams) => {
  return useQuery<ISearchInfo | undefined, Error>({
    queryKey: ["search", params],
    queryFn: () => {
      return searchApi.getVideoIds(params);
    },
  });
};