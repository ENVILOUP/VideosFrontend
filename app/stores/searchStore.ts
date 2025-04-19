import { create } from "zustand";
import { ISearchInfo } from "../types/ISearch";

interface SearchStore {
    searchStore: ISearchInfo;
    setSearchStore: (searchStore: ISearchInfo) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
    searchStore: {} as ISearchInfo,
    setSearchStore: (searchStore: ISearchInfo) => set({ searchStore }),
}));