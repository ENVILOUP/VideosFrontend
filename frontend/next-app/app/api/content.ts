import { IVideoInfo } from "../types/IContent";

export const getVideoInfoById = async (id: string) : Promise<IVideoInfo | undefined> => {
  try {
    const response = await fetch(
      "http://content.api.enviloup.localhost/api/v1/videos/" + id
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};