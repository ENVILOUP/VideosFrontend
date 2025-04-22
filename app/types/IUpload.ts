export interface IUploadContentRequest {
	chunk: Blob;
  hash: string;
  range: {
    start: number;
    end: number;
    total: number;
  };
}

export interface IUploadContentSuccessResponse {
	success: boolean,
	status_code: number,
	data: {
		// // FIXME: будет изменено получение uuid
		// video_uuid?: string,
		// poster_uuid?: string,
		// video_size?: number,
		// poster_size?: number,

		video_uuid: string,
		size: number,
	},
}

export interface IUploadContentErrorResponse {
	success: boolean,
	status_code: number,
}

export interface IUploadProgress {
	progress: number,
	uploadedBytes: number,
	totalBytes: number,
}

export interface ILastChunkRequest {
	video_hash_sum: string,
	poster_hash_sum: string,
}

export interface ILastChunkSuccessResponse {
	success: boolean,
	status_code: number,
	data: {
		video_size?: number,
		poster_size?: number,
	},
}