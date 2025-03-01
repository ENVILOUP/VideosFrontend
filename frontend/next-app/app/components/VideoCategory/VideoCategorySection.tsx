import { categoryData } from "./categoryData";
import VideoCategory from "./VideoCategory";

export default function VideoCategorySection() {
  return (
    <>
      {categoryData.map((category) => (
        <VideoCategory key={category.id} name={category.name} />
      ))}
    </>
  );
}
