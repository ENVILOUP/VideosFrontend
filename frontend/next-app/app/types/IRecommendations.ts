export interface IRecommendationVideosInfo {
  success: boolean,
  status_code: number,
  data: {
    page: number,
    page_size: number,
    items: {
      video_uuid: string,
    } []
  },
};

export interface IRecommendationVideoParams {
  page_size: number;
  page: number;
};