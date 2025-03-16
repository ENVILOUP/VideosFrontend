import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarHeader,
} from "@/app/components/ui/sidebar";
import Link from "next/link";
import { items } from "./SidebarItems";
import EnviloupLink from "../EnviloupLink";

export default function SidebarSection() {
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <EnviloupLink />
        </SidebarHeader> 
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      </>
  );
}
