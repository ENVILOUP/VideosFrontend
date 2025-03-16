import SearchSection from "./SearchSection";
import AuthButton from "./AuthButton";
import VideosSection from "./Video/VideosSection";
import SidebarSection from "./Sidebar/SidebarSection";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar"

export default function MainPageSection() {
  return (
    <>
      <div className="flex">
        <div>
          <SidebarProvider>
            <SidebarSection />
            <SidebarTrigger />
          </SidebarProvider>
        </div>
        <div>
          <div className="flex justify-between mt-3">
            <div className="flex justify-center w-full gap-2">
              <SearchSection />
            </div>
            <div className="flex mr-2 pr-6">
              <AuthButton />
            </div>
          </div>
          <div className="flex mt-2 gap-2">
            <VideosSection />
          </div>
        </div>
      </div>
    </>
  );
}
