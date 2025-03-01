import SearchSection from "./SearchSection";
import VideoCategorySection from "./VideoCategory/VideoCategorySection";
import AuthButton from "./AuthButton";
import VideosSection from "./Video/VideosSection";

export default function MainPageSection() {
  return (
    <>
      <header className="flex items-center justify-between mt-3">
        <div className="flex gap-2 pl-6">
          <SearchSection />
        </div>
        <div className="flex mr-2 pr-6">
          <AuthButton />
        </div>
      </header>

      <div className="flex mt-5 gap-2 pl-6">
        <VideoCategorySection />
      </div>

      <div className="flex mt-2 gap-2">
        <VideosSection />
      </div>
    </>
  );
}
