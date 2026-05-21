"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { ProfileDropdown } from "./profile-dropdown";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { usePathname } from "next/navigation";
import { APP_VERSION } from "@/lib/version";
import { Separator } from "../separator";

export function AppSidebarHeader() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <ProfileDropdown />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

const filterMenuItem = [
  {
    title: "Inbox",
    path: "#",
    badge: "coming soon",
  },
  {
    title: "Today",
    path: ROUTES.task.today.path,
  },
  {
    title: "Overdue",
    path: ROUTES.task.overdue.path,
  },
  {
    title: "Upcoming",
    path: ROUTES.task.upcoming.path,
  },
];

export function AppSidebarContent() {
  const pathname = usePathname();

  function getIsActivePath(path: string) {
    return pathname.startsWith(path);
  }

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {filterMenuItem.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  asChild
                  isActive={getIsActivePath(item.path)}
                >
                  <Link href={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                {item.badge && (
                  <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}

export function AppSidebar() {
  return (
    <Sidebar>
      <AppSidebarHeader />
      <AppSidebarContent />
      <SidebarFooter>
        <Separator />
        <div className="text-sm font-bold text-center">{`v${APP_VERSION}`}</div>
      </SidebarFooter>
    </Sidebar>
  );
}
