"use client";

import { ThumbsDown, ThumbsUp, Eye, Clock, Share2, UserCheck } from "lucide-react";
import { Button } from "../../ui/button";
import Image from "next/image";
import { Separator } from "../../ui/separator";

interface VideoData {
  title: string;
  description: string;
  video_url: string;
  thumbnail_url?: string;
}

interface VideoInfoProps {
  videoData: VideoData;
}

const renderDescription = (
  description: string,
  onTimecodeClick: (time: number) => void
) => {
  const parts = description.split(/(\b\d{2}:\d{2}\b)/g);
  return parts.map((part, index) => {
    const match = part.match(/\b(\d{2}:\d{2})\b/);
    if (match) {
      const [minutes, seconds] = part.split(":");
      const timeInSeconds = parseInt(minutes) * 60 + parseInt(seconds);
      return (
        <span
          key={index}
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={() => onTimecodeClick(timeInSeconds)}
        >
          {part}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

export const VideoInfo = ({ videoData }: VideoInfoProps) => {
  const handleTimecodeClick = (time: number) => {
    const video = document.querySelector("video");
    if (video) video.currentTime = time;
  };

  return (
    <div className="w-full mt-4">
      <div className="bg-gray-900 rounded-lg shadow-md p-6">
        <h5 className="text-2xl font-bold text-slate-200 mb-2">
          {videoData.title}
        </h5>
        <div className="flex justify-between">
          <p className="text-gray-300 mb-2 flex">
            <Image
              src="/vercel.svg"
              width={50}
              height={50}
              alt="author"
              className="rounded-full bg-gray-900/80 mr-2"
            />
            John Doe
          </p>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 bg-slate-800 px-2.5 py-1.5 rounded-2xl text-gray-400">
              <ThumbsUp className="h-6 w-6 cursor-pointer text-gray-400 hover:text-blue-500 transition-colors duration-300" />
              <Separator orientation="vertical" className="h-6" />
              <ThumbsDown className="h-6 w-6 cursor-pointer text-gray-400 hover:text-red-500 transition-colors duration-300" />
            </div>
            <Button
              size="sm"
              className="bg-red-400 hover:bg-red-500 transition-colors duration-300 text-white cursor-pointer"
            >
              <UserCheck size={18} />
              Подписаться
            </Button>
            <Button
              size="sm"
              className="bg-blue-400 hover:bg-blue-500 transition-colors duration-300 text-white cursor-pointer"
            >
              <Share2 size={18} />
              Поделиться
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-6 text-gray-300">
          <div className="flex items-center space-x-1">
            <Eye size={18} />
            <span>2028 Просмотров</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={18} />
            <span>5 дней назад</span>
          </div>
        </div>
        <p className="text-gray-300 mt-4 leading-relaxed">
          {renderDescription(videoData.description, handleTimecodeClick)}
        </p>
      </div>
    </div>
  );
};