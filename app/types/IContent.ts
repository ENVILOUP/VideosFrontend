export interface IVideoInfoSuccessResponse {
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

export interface ICreateContentRequest {
	title: string,
	description: string,
	video_uuid: string,
	// FIXME: передавать какие-то данные для видео и постера
}

export type ICreateContentSuccessResponse = IVideoInfoSuccessResponse;

export interface ICreateContentErrorResponse {
	success: boolean,
	status_code: number,
}