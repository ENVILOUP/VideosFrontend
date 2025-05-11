import Image from "next/image";

interface RelatedVideoCardProps {
  video_uuid: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
}

export default function RelatedVideoCard({
  video_uuid,
  title,
  description,
  video_url,
  thumbnail_url,
}: RelatedVideoCardProps) {
  return (
    <div className="flex border rounded-lg overflow-hidden hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all duration-300 bg-white dark:bg-zinc-900 h-24">
      <div className="relative w-46 flex-shrink-0">
        <Image
          className="object-cover"
          layout="fill"
          sizes="(max-width: 640px) 128px, 128px"
          src={thumbnail_url || "/placeholder.svg"}
          alt={title}
          priority={false}
        />
      </div>

      <div className="p-2 flex flex-col justify-between min-w-0 flex-1">
        <div className="flex flex-col justify-between h-full">
          <h3 className="text-xs font-medium line-clamp-3 break-words">
            {title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Author
          </p>
        </div>
      </div>
    </div>
  );
}
