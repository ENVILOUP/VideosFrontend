import { IUploadProgress } from "@/app/types/IUpload";
import { Progress } from "../../ui/progress";

interface ProgressBarProps {
	progress: IUploadProgress;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <>
      <label>Прогресс загрузки</label>
      <Progress value={progress.progress} className="w-full" />
      <p className="text-sm text-muted-foreground">
        {Math.round(progress.progress * 100)}% (
        {(progress.uploadedBytes / 1024 / 1024).toFixed(2)} MB /{" "}
        {(progress.totalBytes / 1024 / 1024).toFixed(2)} MB )
      </p>
    </>
  );
}
