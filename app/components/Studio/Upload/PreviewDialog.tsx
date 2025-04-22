import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";

interface PreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  file: File | null;
  type: "video" | "poster";
}

export function PreviewDialog({ isOpen, onClose, file, type }: PreviewDialogProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
        setPreviewUrl(null);
      };
    }
  }, [file]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            Предпросмотр {type === "video" ? "видео" : "постера"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center p-4">
          {previewUrl && type === "video" && (
            <video
              src={previewUrl}
              controls
              className="max-w-full max-h-[500px] rounded-lg"
            />
          )}
          {previewUrl && type === "poster" && (
            <Image
              src={previewUrl}
              alt="Постер"
              width={800}
              height={500}
              className="max-w-full max-h-[500px] rounded-lg object-contain"
            />
          )}
          {!previewUrl && (
            <p className="text-gray-500">Файл не выбран</p>
          )}
        </div>
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button variant="outline">Закрыть</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}