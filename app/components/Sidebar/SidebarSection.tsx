"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/app/components/ui/sidebar";
import Link from "next/link";
import { sidebarGroups } from "./SidebarItems";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SidebarSection() {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();
  const pathname = usePathname();

  useEffect(() => {
    if (isMobile && openMobile) {
      setOpenMobile(false);
    }
  }, [pathname, isMobile, openMobile, setOpenMobile]);

  const renderSidebarContent = () => (
    <SidebarContent className="mt-2">
      {sidebarGroups.map((group, index) => (
        <SidebarGroup key={index} className="p-0 px-2">
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                      className="transition-colors duration-200 hover:bg-sidebar-accent/80"
                    >
                      <Link
                        href={item.url}
                        className="flex items-center w-full"
                      >
                        <item.icon className="size-4 flex-shrink-0" />
                        <span className="ml-2 truncate">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
            {index < sidebarGroups.length - 1 && (
              <div className="border-t-0 bg-gray-300 dark:bg-gray-700 h-0.5 mt-2 opacity-70" />
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      {renderSidebarContent()}
    </Sidebar>
  );
}
