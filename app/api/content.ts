import { ICreateContentRequest, ICreateContentSuccessResponse, IVideoInfoSuccessResponse } from "../types/IContent";

class ContentApi {
	private readonly baseUrl = "http://content.api.enviloup.localhost/api/v1";

	getVideoInfoById = async (id: string): Promise<IVideoInfoSuccessResponse | undefined> => {
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
	
	createVideo = async (data: ICreateContentRequest): Promise<ICreateContentSuccessResponse> => {
    const response = await fetch(`${this.baseUrl}/videos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to create video: ${response.status}`);
    }
    return await response.json();
  }
}

export const contentApi = new ContentApi();