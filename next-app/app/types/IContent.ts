export interface IVideoInfo {
  success: boolean,
  status_code: number,
  data: {
    video_uuid: string,
    title: string,
    is_deleted: boolean,
    description: string,
    video_url: string,
    thumbnail_url: string,
  },
}