import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../api/search";
import { ISearchSuccessResponse, ISearchRequest } from "../types/ISearch";


export const useSearch = (params: ISearchRequest) => {
  return useQuery<ISearchSuccessResponse | undefined, Error>({
    queryKey: ["search", params],
    queryFn: () => {
      return searchApi.getVideoIds(params);
    },
  });
};