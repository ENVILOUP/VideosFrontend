"use client";
import VideoContentSection from "./VideoContentSection";
import PageSection from "@/app/components/PageSection";

interface VideoPageProps {
  params: Promise<{id: string}>
}


export default function VideoPage({ params }: VideoPageProps) {
  return (
    <>
      <PageSection>
        <VideoContentSection params={params} />
      </PageSection>
    </>
  );
}