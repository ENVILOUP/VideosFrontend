import { Button } from "../../ui/button";
import { useEffect, useRef, useState } from "react";
import { UploadFormData, uploadSchema } from "@/app/validations/studioSchemas";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { FormInput } from "../../Forms/FormInput";
import { FormFileInput } from "../../Forms/FormFileInput";
import { useForm } from "react-hook-form";
import { FormTextarea } from "../../Forms/FormTextarea";
import { useUpload } from "@/app/hooks/useUpload";
import ProgressBar from "./ProgressBar";
import { useRouter } from "next/navigation";
import { PreviewDialog } from "./PreviewDialog";

export default function UploadForm() {
	const router = useRouter();
	const cancelButtonRef = useRef<HTMLButtonElement>(null);
	const [preview, setPreview] = useState<{
		isOpen: boolean;
		file: File | null;
		type: "video" | "poster" | null;
	}>({ isOpen: false, file: null, type: null });

  const {
    register: registerUpload,
		handleSubmit: handleUploadSubmit,
		watch: watchUpload,
    formState: { errors: uploadErrors },
  } = useForm<UploadFormData>({
    resolver: yupResolver(uploadSchema),
    mode: "onChange",
  });

	const uploadMutation = useUpload();

	const getFile = (input: FileList | File | null | undefined): File | null => {
    if (input instanceof File) return input;
    if (input && "length" in input && input.length > 0) return input[0];
    return null;
  };
	
	const videoFile = getFile(watchUpload("video") as FileList);
	const posterFile = getFile(watchUpload("poster") as FileList);

  const onUploadSubmit = async (data: UploadFormData) => {
    console.log("Upload data:", data);
    // FIXME: Раскомментировать
    // uploadMutation.mutate(data);
	};

	const handlePreview = (type: "video" | "poster") => {
		const file = type === "video" ? videoFile : posterFile;
		if (file instanceof File) {
			setPreview({
				isOpen: true,
				file: file,
				type: type,
			});
		}
	}

	const handleClosePreview = () => {
		setPreview({
			isOpen: false,
			file: null,
			type: null,
		});
	}
	
	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			if (uploadMutation.isPending) {
				event.preventDefault();
				event.returnValue = "Загрузка еще не завершена. Вы уверены, что хотите покинуть страницу?";
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [uploadMutation.isPending])

	const handleCancel = () => {
		if (uploadMutation.isPending) {
			const confirmCancel = window.confirm("Загрузка еще не завершена. Отмена прервет загрузку. Вы уверены?");

			if (!confirmCancel) {
				return;
			}
		}

		router.push("/studio");
	}

  return (
    <>
      <form onSubmit={handleUploadSubmit(onUploadSubmit)} className="space-y-4">
        <div className="grid gap-4">
          <FormInput
            label="Название"
            name="title"
            register={registerUpload}
            errors={uploadErrors}
            placeholder="Введите название"
          />
          <FormTextarea
            label="Описание"
            name="description"
            register={registerUpload}
            errors={uploadErrors}
            placeholder="Введите описание"
          />
          <FormFileInput
            label="Видео"
            name="video"
            accept="video/mp4"
            register={registerUpload}
            errors={uploadErrors}
            checkButton={
							<Button
								type="button"
                disabled={!videoFile}
                size={"sm"}
                onClick={() => handlePreview("video")}
              >
                Просмотреть
              </Button>
            }
          />
          <FormFileInput
            label="Постер"
            name="poster"
            accept="image/jpeg,image/jpg,image/png"
            register={registerUpload}
            errors={uploadErrors}
            checkButton={
							<Button
								type="button"
                disabled={!posterFile}
                size={"sm"}
                onClick={() => handlePreview("poster")}
              >
                Просмотреть
              </Button>
            }
          />

          <div className="space-y-2">
            <ProgressBar progress={uploadMutation.progress} />
          </div>
        </div>

        <div className="flex justify-end gap-2">
					<Button
						type="button"
            onClick={handleCancel}
            ref={cancelButtonRef}
            disabled={uploadMutation.isPending}
          >
            Отменить
          </Button>
          <Button type="submit">Загрузить</Button>
        </div>
			</form>
			
			<PreviewDialog
				isOpen={preview.isOpen}
				onClose={handleClosePreview}
				file={preview.file}
				type={preview.type || "video"}
			/>
    </>
  );
}
