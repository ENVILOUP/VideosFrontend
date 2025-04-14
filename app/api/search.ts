import { ISearchInfo, ISearchParams } from "../types/ISearch";

class SearchApi {
  private readonly apiUrl = "http://search.api.enviloup.localhost/api/v1";

  getVideoIds = async (
    params: ISearchParams,
  ): Promise<ISearchInfo | undefined> => {
    try {
      const queryParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        queryParams.append(key, value);
      }
      const response = await fetch(
        `${this.apiUrl}/search/videos/?${queryParams.toString()}`,
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch search results: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };
}

export const searchApi = new SearchApi();