import { create } from "zustand";
import { IVideoInfo } from "../types/IContent";

interface VideosInfoStore {
        videosInfoStore: IVideoInfo;
        setVideosInfoStore: (videosInfoStore: IVideoInfo) => void;
    }

export const useVideosInfoStore = create<VideosInfoStore>((set) => ({
        videosInfoStore: {} as IVideoInfo,
        setVideosInfoStore: (videosInfoStore: IVideoInfo) => set({ videosInfoStore }),
}))