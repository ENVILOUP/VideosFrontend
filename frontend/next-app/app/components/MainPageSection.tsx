import SearchSection from "./SearchSection";
import AuthButton from "./AuthButton";
import VideosSection from "./Video/VideosSection";
import SidebarSection from "./Sidebar/SidebarSection";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "./ui/sidebar";
import EnviloupLink from "./EnviloupLink";

export default function MainPageSection() {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen">
        <SidebarSection />
        <SidebarInset className="flex-1 w-full">
          <header className="flex items-center justify-between p-2 sm:p-3 border-b sticky top-0 bg-background z-10">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <EnviloupLink />
            </div>

            <div className="mx-2 sm:mx-4 flex gap-2">
              <SearchSection />
            </div>

            <div>
              <AuthButton />
            </div>
          </header>

          <main className="p-2 sm:p-4">
            <VideosSection />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
