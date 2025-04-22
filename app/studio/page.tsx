"use client";

import AuthSection from "../components/Auth/AuthSection";
import EnviloupLink from "../components/EnviloupLink";
import SearchSection from "../components/SearchSection";
import SidebarSection from "../components/Sidebar/SidebarSection";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import StudioContentSection from "./StudioContentSection";

export default function StudioPage() {
	return (
    <>
      <SidebarProvider defaultOpen={false}>
        <div className="flex min-h-screen w-full overflow-hidden">
          <SidebarSection />
          <SidebarInset className="flex-1 w-full flex flex-col">
            <header className="flex items-center justify-between p-2 sm:p-3 border-b sticky top-0 bg-background z-10">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <EnviloupLink />
              </div>

              <div className="mx-2 sm:mx-4 flex gap-2">
                <SearchSection />
              </div>

              <div>
                <AuthSection />
              </div>
            </header>

            <main className="p-2 sm:p-4">
              <StudioContentSection />
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
}