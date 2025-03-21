"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import VideoContentSection from "./VideoContentSection";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/app/components/ui/sidebar";
import SidebarSection from "@/app/components/Sidebar/SidebarSection";
import SearchSection from "@/app/components/SearchSection";
import AuthButton from "@/app/components/AuthButton";
import EnviloupLink from "@/app/components/EnviloupLink";

interface VideoPageProps {
  params: Promise<{id: string}>
}

const queryClient = new QueryClient();

export default function VideoPage({params}: VideoPageProps) {
  return (
    <QueryClientProvider client={queryClient}>
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
              <VideoContentSection params={params} />
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  );
}