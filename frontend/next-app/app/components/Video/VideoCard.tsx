import Image from "next/image";

interface VideoCardProps {
  video_uuid: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
}

export default function VideoCard({
  video_uuid,
  title,
  description,
  video_url,
  thumbnail_url,
}: VideoCardProps) {
  return (
    <>
      <div className="flex flex-col border rounded-lg overflow-hidden h-full hover:scale-105 transition-all duration-300">
        <div className="relative w-full aspect-[16/9]">
          <Image
            className="rounded-t-lg"
            layout="fill"
            objectFit="cover"
            src={thumbnail_url}
            alt={title}
          />
        </div>
        <div className="p-4 flex gap-2">
          <div className="flex items-start gap-3">
            <Image
              src={"vercel.svg"}
              width={50}
              height={50}
              alt="author"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col flex-1">
            <h2 className="text-lg font-semibold max-h-14 overflow-hidden line-clamp-2">
              {title}
            </h2>
            <p className="text-slate-600">Author</p>
            <p className="text-slate-600">video stats info</p>
          </div>
        </div>
      </div>
    </>
  );
}
