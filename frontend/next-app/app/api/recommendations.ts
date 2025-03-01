import { IRecommendationVideosInfo } from "../types/IRecommendations";

class RecommendationsApi {
  private readonly baseUrl = "http://recommendations.api.enviloup.localhost/api/v1";

  getIds = async (): Promise<IRecommendationVideosInfo | undefined> => {
    try {
      const response = await fetch(`${this.baseUrl}/videos/?user=default`);
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