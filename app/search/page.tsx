"use client";

import SearchSection from "../components/SearchSection";
import SidebarSection from "../components/Sidebar/SidebarSection";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "../components/ui/sidebar";
import EnviloupLink from "../components/EnviloupLink";
import AuthSection from "../components/Auth/AuthSection";

import SearchContentSection from "./SearchContentSection";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function SearchPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider defaultOpen={false}>
        <div className="flex min-h-screen">
          <SidebarSection />
          <SidebarInset className="flex-1 w-full">
            <header className="flex items-center justify-between p-2 sm:p-3 border-b sticky top-0 bg-background z-10 w-full">
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

            <main className="p-2 sm:p-4 pt-0 sm:pt-0">
              <SearchContentSection />
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  );
}