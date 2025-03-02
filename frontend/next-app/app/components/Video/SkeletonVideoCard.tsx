import { Skeleton } from "../ui/skeleton";

export default function SkeletonVideoCard() {
  return (
    <div className="flex flex-col border rounded-lg overflow-hidden h-[450px]">
      <div className="relative w-[500px] aspect-[16/9]">
        <Skeleton className="absolute inset-0 rounded-t-lg" />
      </div>
      <div className="p-4 flex gap-2">
        <div className="flex items-start gap-3">
          <Skeleton className="rounded-full w-[50px] h-[50px]" />
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <Skeleton className="w-[200px] h-[20px]" />
          <Skeleton className="w-[150px] h-[16px]" />
          <Skeleton className="w-[220px] h-[16px]" />
        </div>
      </div>
    </div>
  );
}