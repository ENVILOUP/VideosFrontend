import UploadForm from "@/app/components/Studio/Upload/UploadForm";

export default function UploadContentSection() {
	return (
		<>
			<div className="container mx-auto">
				<h1 className="text-3xl font-bold mb-4">Загрузить видео</h1>
				<UploadForm />
			</div>
		</>
	);
}