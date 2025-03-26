import { formatTime } from "@/app/functions/hls/formatTime";
import Hls from "hls.js";
import { useEffect, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  Settings,
  SkipBack,
  SkipForward,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Slider } from "@/app/components/ui/slider";
import { Button } from "../../ui/button";

export const VideoControls = ({
  video,
  hls,
  id,
}: {
  video: HTMLVideoElement | null;
  hls: Hls | null;
  id: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00 / 00:00");
  const [seekValue, setSeekValue] = useState(0);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [qualityLevels, setQualityLevels] = useState<
    { height: number; index: number }[]
  >([]);
  const [quality, setQuality] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!hls) return;

    const handleManifestParsed = () => {
      const levels = hls.levels.map((level, index) => ({
        height: level.height,
        index,
      }));
      setQualityLevels(levels);

      const savedQuality = sessionStorage.getItem(`videoQuality_${id}`);
      if (
        savedQuality &&
        levels.some((l) => l.index === parseInt(savedQuality))
      ) {
        hls.currentLevel = parseInt(savedQuality);
        setQuality(savedQuality);
      } else if (levels.length > 0) {
        const defaultQuality = levels[0].index.toString();
        hls.currentLevel = parseInt(defaultQuality);
        setQuality(defaultQuality);
      }
    };

    hls.on(Hls.Events.MANIFEST_PARSED, handleManifestParsed);
    return () => hls.off(Hls.Events.MANIFEST_PARSED, handleManifestParsed);
  }, [hls, id]);

  useEffect(() => {
    if (!video) return;

    const handleTimeUpdate = () => {
      const current = formatTime(video.currentTime);
      const duration = formatTime(video.duration || 0);
      setCurrentTime(`${current} / ${duration}`);
      setSeekValue((video.currentTime / video.duration) * 100 || 0);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [video]);

  useEffect(() => {
    if (!video) return;

    const handleEnded = () => {
      setIsPlaying(false);
      video.currentTime = 0;
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [video]);

  useEffect(() => {
    if (!video || !hls) return;

    const savedTime = sessionStorage.getItem(`videoCurrentTime_${id}`);
    const savedSpeed = sessionStorage.getItem(`videoSpeed_${id}`);
    const savedVolume = sessionStorage.getItem(`videoVolume_${id}`);

    if (savedTime) video.currentTime = parseFloat(savedTime);
    if (savedSpeed) {
      video.playbackRate = parseFloat(savedSpeed);
      setSpeed(parseFloat(savedSpeed));
    }
    if (savedVolume) {
      video.volume = parseFloat(savedVolume);
      setVolume(parseFloat(savedVolume));
    }
  }, [video, hls, id]);

  useEffect(() => {
    if (!video || !hls) return;

    const saveSettings = () => {
      sessionStorage.setItem(`videoCurrentTime_${id}`, video.currentTime.toString());
      sessionStorage.setItem(`videoQuality_${id}`, hls.currentLevel.toString());
      sessionStorage.setItem(`videoSpeed_${id}`, video.playbackRate.toString());
      sessionStorage.setItem(`videoVolume_${id}`, video.volume.toString());
    };

    window.addEventListener("beforeunload", saveSettings);
    return () => window.removeEventListener("beforeunload", saveSettings);
  }, [video, hls, id]);

  const handlePlayPause = () => {
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleSeek = (value: number[]) => {
    if (video) {
      const newTime = (value[0] / 100) * video.duration;
      video.currentTime = newTime;
      setSeekValue(value[0]);
    }
  };

  const handleVolume = (value: number[]) => {
    if (video) {
      video.volume = value[0];
      setVolume(value[0]);
    }
  };

  const handleSpeed = (value: string) => {
    if (video) {
      video.playbackRate = parseFloat(value);
      setSpeed(parseFloat(value));
    }
  };

  const handleQuality = (value: string) => {
    if (hls) {
      hls.currentLevel = parseInt(value);
      setQuality(value);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-900 text-white rounded-b-lg">
      <div className="flex items-center space-x-4">
        <Button
          onClick={handlePlayPause}
          className="p-2 text-white bg-gray-600/15 hover:bg-gray-700 rounded transition-colors duration-300"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </Button>
        <Button className="p-2 text-white bg-gray-600/15 hover:bg-gray-700 rounded transition-colors duration-300">
          <SkipBack size={24} />
        </Button>
        <Button className="p-2 text-white bg-gray-600/15 hover:bg-gray-700 rounded transition-colors duration-300">
          <SkipForward size={24} />
        </Button>
      </div>

      <div className="ml-4">{currentTime}</div>

      <div className="flex-1 mx-4">
        <Slider
          value={[seekValue]}
          onValueChange={handleSeek}
          max={100}
          step={1}
          className="w-full"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Volume2 size={20} />
          <Slider
            value={[volume]}
            onValueChange={handleVolume}
            max={1}
            step={0.1}
            className="w-24"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="p-2 text-white bg-gray-600/15 hover:bg-gray-700 rounded transition-colors duration-300">
              <Settings size={24} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Скорость</label>
              <Select onValueChange={handleSpeed} value={speed.toString()}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите скорость" />
                </SelectTrigger>
                <SelectContent>
                  {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((s) => (
                    <SelectItem key={s} value={s.toString()}>
                      {s}x
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Качество</label>
              <Select onValueChange={handleQuality} value={quality}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите качество" />
                </SelectTrigger>
                <SelectContent>
                  {qualityLevels.map((level) => (
                    <SelectItem
                      key={level.index}
                      value={level.index.toString()}
                    >
                      {level.height}p
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
