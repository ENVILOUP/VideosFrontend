import Image from "next/image";

/* eslint-disable @next/next/no-img-element */

interface VideoCardProps {
  video_uuid: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
}

export default function VideoCard({
  title,
  thumbnail_url,
}: VideoCardProps) {
  return (
    <>
      <div className="flex flex-col border rounded-lg overflow-hidden h-full hover:scale-[1.02] transition-all duration-300 bg-white dark:bg-zinc-900">
        <div className="relative w-full aspect-video">
          {/* <Image
            className="rounded-t-lg object-cover"
            layout="fill"
            objectFit="cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={thumbnail_url}
            alt={title}
            priority={false}
          /> */}
          <img
            className="rounded-t-lg object-cover absolute inset-0 w-full h-full"
            src={thumbnail_url}
            srcSet={`
							${thumbnail_url}?w=640 640w,
							${thumbnail_url}?w=1024 1024w,
							${thumbnail_url}?w=1920 1920w
						`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt={title}
            loading="lazy"
          />
        </div>
        <div className="p-3 flex gap-2 flex-grow">
          <div className="flex-shrink-0">
            <div className="relative w-10 h-10">
              <Image
                src={"/vercel.svg"}
                width={50}
                height={50}
                alt="author"
                className="rounded-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col min-w-0 justify-between">
            <h2 className="text-sm sm:text-base font-semibold line-clamp-2 break-words">
              {title}
            </h2>
            <div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Author
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                video stats info
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
