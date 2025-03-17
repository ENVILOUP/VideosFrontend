"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import VideoContentSection from "./VideoContentSection";

interface VideoPageProps {
  params: Promise<{id: string}>
}

const queryClient = new QueryClient();

export default function VideoPage({params}: VideoPageProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <VideoContentSection params={params}/>
      </QueryClientProvider>
    </>
  );
}