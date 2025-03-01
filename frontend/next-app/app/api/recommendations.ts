import { IRecommendationVideosInfo } from "../types/IRecommendations";

export const getIds = async (): Promise<IRecommendationVideosInfo | undefined> => {
  try {
    const response = await fetch(
      "http://recommendations.api.enviloup.localhost/api/v1/videos/?user=default",
      {
        next: { revalidate: 60 },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
