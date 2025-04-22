"use client";

import AuthSection from "@/app/components/Auth/AuthSection";
import EnviloupLink from "@/app/components/EnviloupLink";
import SearchSection from "@/app/components/SearchSection";
import SidebarSection from "@/app/components/Sidebar/SidebarSection";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/app/components/ui/sidebar";
import UploadContentSection from "./UploadContentSection";

export default function UploadPage() {
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
							<UploadContentSection />
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
}
