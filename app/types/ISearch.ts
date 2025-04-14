export interface ISearchInfo {
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

export interface ISearchParams {
    page?: number,
    page_size?: number,
    query: string,
  }