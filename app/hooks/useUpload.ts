import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
	IUploadContentErrorResponse,
  IUploadContentSuccessResponse,
  IUploadProgress,
} from "../types/IUpload";
import { UploadFormData } from "../validations/studioSchemas";
import { useState } from "react";
import { calculateFileHash, splitFileIntoChunks } from "../functions/upload";
import { uploadApi } from "../api/upload";
import { useCreateVideoContent } from "./useContent";

export const useUpload = (): UseMutationResult<
	IUploadContentSuccessResponse,
	IUploadContentErrorResponse,
  UploadFormData,
  undefined
> & { progress: IUploadProgress } => {
  const [progress, setProgress] = useState<IUploadProgress>({
    progress: 0,
    uploadedBytes: 0,
    totalBytes: 0,
  });
  const { mutateAsync: createVideoContent } = useCreateVideoContent();

	const mutation = useMutation<
    IUploadContentSuccessResponse,
    IUploadContentErrorResponse,
    UploadFormData,
    undefined
  >({
		mutationFn: async (data: UploadFormData) => {
			const video = data.video as File;
			const poster = data.poster as File;

      const videoHash = await calculateFileHash(video);
      const posterHash = await calculateFileHash(poster);

      const hashResponse = await uploadApi.lastChunk({
        video_hash_sum: videoHash,
        poster_hash_sum: posterHash,
      });

      const videoStart = hashResponse.data?.video_size || 0;
			const posterStart = hashResponse.data?.poster_size || 0;
			
			const posterChunks = splitFileIntoChunks(poster, posterHash);
			const videoChunks = splitFileIntoChunks(video, videoHash);

			const remainingPosterChunks = posterChunks.filter(
				(chunk) => chunk.file.range.start >= posterStart
			);

			const remainingVideoChunks = videoChunks.filter(
				(chunk) => chunk.file.range.start >= videoStart
			);

      const totalPosterBytes = poster.size - posterStart;
      const totalVideoBytes = video.size - videoStart;
      const totalBytes = totalVideoBytes + totalPosterBytes;

      setProgress({
        progress: 0,
        uploadedBytes: 0,
        totalBytes,
      });

      let lastResponse: IUploadContentSuccessResponse | null = null;
      for (const chunk of remainingPosterChunks) {
				const response = await uploadApi.uploadChunk({
					chunk: chunk.file.chunk,
					hash: chunk.file.hash,
					range: chunk.file.range
				});
				lastResponse = response;
				
				const posterChunkSize = chunk.file.range.end - chunk.file.range.start;
        setProgress((prevProgress) => {
          const newUploaded =
            prevProgress.uploadedBytes + posterChunkSize;
          const newProgress =
            totalBytes > 0 ? (newUploaded / totalBytes) * 100 : 0;

          return {
            progress: newProgress,
            uploadedBytes: newUploaded,
            totalBytes,
          };
        });
			}
			
			for (const chunk of remainingVideoChunks) {
				const response = await uploadApi.uploadChunk({
					chunk: chunk.file.chunk,
					hash: chunk.file.hash,
					range: chunk.file.range
				});
				lastResponse = response;
				
				const videoChunkSize = chunk.file.range.end - chunk.file.range.start;
				setProgress((prevProgress) => {
					const newUploaded =
						prevProgress.uploadedBytes + videoChunkSize;
					const newProgress =
						totalBytes > 0 ? (newUploaded / totalBytes) * 100 : 0;

					return {
						progress: newProgress,
						uploadedBytes: newUploaded,
						totalBytes,
					};
				});
			}

      if (!lastResponse) {
        throw new Error("Failed to upload chunk");
			}

      await createVideoContent(
				{
          title: data.title,
					description: data.description,
					video_uuid: lastResponse.data.video_uuid,
        },
        {
          onSuccess: () => {
            console.log("Video created");
          },
          onError: (error) => {
            console.error(error);
          },
        }
      );

      return lastResponse;
    },
    onSuccess: async () => {
      setProgress((prevProgress) => ({ ...prevProgress, progress: 100 }));
    },
    onError: (error) => {
      console.error(error);
    },
    mutationKey: ["uploadContent"],
  });

  return { ...mutation, progress };
};
