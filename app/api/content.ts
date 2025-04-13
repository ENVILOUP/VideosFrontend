import { IVideoInfo } from "../types/IContent";

class ContentApi {
  private readonly baseUrl = "http://content.api.enviloup.localhost/api/v1";

  getVideoInfoById = async (id: string): Promise<IVideoInfo | undefined> => {
    try {
      const response = await fetch(`${this.baseUrl}/videos/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch video with id ${id}: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching video info:", error);
      return undefined;
    }
  }
}

export const contentApi = new ContentApi();