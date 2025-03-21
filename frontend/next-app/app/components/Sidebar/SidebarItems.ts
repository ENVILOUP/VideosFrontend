import { Clock, Heart, Home, Library, ListVideo, MessageCircleHeart, Settings, History, LucideIcon } from "lucide-react";

interface SidebarItem {
  title: string;
  icon: LucideIcon;
  url: string;
}

interface SidebarGroup {
  items: SidebarItem[];
}

export const sidebarGroups: SidebarGroup[] = [
  {
    items: [
      {
        title: "Главная",
        icon: Home,
        url: "/",
      },
      {
        title: "Подписки",
        icon: Library,
        url: "/subscriptions",
      },
      {
        title: "История",
        icon: History,
        url: "/history",
      },
    ],
  },
  {
    items: [
      {
        title: "Плейлисты",
        icon: ListVideo,
        url: "/playlists",
      },
      {
        title: "Смотреть позже",
        icon: Clock,
        url: "/watch-later",
      },
      {
        title: "Понравившиеся",
        icon: Heart,
        url: "/liked",
      },
    ],
  },
  {
    items: [
      {
        title: "Настройки",
        icon: Settings,
        url: "/settings",
      },
      {
        title: "Оставить отзыв",
        icon: MessageCircleHeart,
        url: "/feedback",
      },
    ],
  },
];
