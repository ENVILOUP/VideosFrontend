"use client";

import { FileVideo } from "lucide-react";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";

export default function StudioContentSection() {
	const router = useRouter();

	const handleUpload = () => {
		router.push("/studio/upload");
	}

	return (
    <>
      <div className="container flex flex-col gap-2">
        <div>Список загруженных видео</div>
        <div>
          <Button onClick={handleUpload}>
            Загрузить видео <FileVideo className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  );
}