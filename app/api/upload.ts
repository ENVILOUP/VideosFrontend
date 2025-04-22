import { ILastChunkRequest, ILastChunkSuccessResponse, IUploadContentRequest, IUploadContentSuccessResponse } from "../types/IUpload";

class UploadApi {
	private readonly baseUrl = "http://upload.api.enviloup.localhost/api/v1";

	lastChunk = async (request: ILastChunkRequest): Promise<ILastChunkSuccessResponse> => {
		const response = await fetch(`${this.baseUrl}/last-chunk`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request),
		});
		if (!response.ok) {
			throw new Error(`Failed to get last chunk: ${response.status}`);
		}
		return response.json();
	}

	uploadChunk = async(request: IUploadContentRequest): Promise<IUploadContentSuccessResponse> => {
		const formData = new FormData();

		formData.append("chunk", request.chunk, `chunk-${request.range.start}`);
		formData.append("hash", request.hash);
		formData.append("range[start]", request.range.start.toString());
		formData.append("range[end]", request.range.end.toString());
		formData.append("range[total]", request.range.total.toString());

		const response = await fetch(`${this.baseUrl}/upload`, {
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data",
			},
			body: formData,
		});
		if (!response.ok) {
			throw new Error(`Failed to upload chunk: ${response.status}`);
		}
		return response.json();
	}
}

export const uploadApi = new UploadApi();