export interface ISearchInfo  {
  page: number,
  total_pages: number,
  results: {
    video_uuid: string,
  } []
 } 

export interface ISearchSuccessResponse {
  success: boolean,
  status_code: number,
  data: {
    page: number,
    total_pages: number,
    results: {
      video_uuid: string,
    } []
  },
};

export interface ISearchRequest {
    page?: number,
    page_size?: number,
    query: string,
  }