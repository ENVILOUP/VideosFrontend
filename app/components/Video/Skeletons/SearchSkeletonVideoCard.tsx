import { Skeleton } from "@/app/components/ui/skeleton"

export default function SearchSkeletonVideoCard() {
  return (
    <div className="flex border rounded-lg overflow-hidden bg-white dark:bg-zinc-900 h-24">
      <div className="relative w-46 flex-shrink-0">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="p-2 flex flex-col justify-between flex-1">
        <div>
          <Skeleton className="h-3 w-full mb-1" />
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-2 w-1/2 mt-2" />
        </div>
      </div>
    </div>
  )
}