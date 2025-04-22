export async function calculateFileHash(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

interface ISplitFileIntoChunks {
	file: {
		chunk: Blob,
		hash: string,
		range: {
			start: number,
			end: number,
			total: number,
		},
	},
}

export function splitFileIntoChunks(file: File, hash: string): ISplitFileIntoChunks[] {
	const CHUNK_SIZE = 5 * 1024 * 1024; // 5 MB
	const requests: ISplitFileIntoChunks[] = [];

	const chunkCount = Math.ceil(file.size / CHUNK_SIZE);

	for (let i = 0; i < chunkCount; i++) {
		const start = i * CHUNK_SIZE;
		const end = Math.min(start + CHUNK_SIZE, file.size);
		const chunk = file.slice(start, end);

		requests.push({
			file: {
				chunk,
				hash,
				range: {
					start,
					end,
					total: file.size,
				},
			},
		});
	}

	return requests;
}