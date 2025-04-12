import { IRecommendationVideoParams, IRecommendationVideosInfo } from "../types/IRecommendations";

class RecommendationsApi {
  private readonly baseUrl = "http://recommendations.api.enviloup.localhost/api/v1";

  getIds = async (params: IRecommendationVideoParams): Promise<IRecommendationVideosInfo | undefined> => {
    try {
      const queryParams = new URLSearchParams();

      for (const [key, value] of Object.entries(params)) {
        queryParams.append(key, value);
      }

      const response = await fetch(`${this.baseUrl}/videos/?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch recommendations: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}

export const recommendationsApi = new RecommendationsApi();