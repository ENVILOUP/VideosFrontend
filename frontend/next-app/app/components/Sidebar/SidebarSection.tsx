import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarHeader,
} from "@/app/components/ui/sidebar";
import Link from "next/link";
import { sidebarGroups } from "./SidebarItems";
import EnviloupLink from "../EnviloupLink";

export default function SidebarSection() {
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <EnviloupLink />
        </SidebarHeader>
        <SidebarContent>
          {sidebarGroups.map((group, index) => (
            <SidebarGroup key={index} className="p-0 ml-2">
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
                {index < sidebarGroups.length - 1 && (
                  <div className="border-t-0 bg-gray-300 h-0.5 mt-2" />
                )}
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
