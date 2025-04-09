"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainPageSection from "./components/MainPageSection";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainPageSection />
    </QueryClientProvider>
  );
}
