"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
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
import { Folder, FolderIcon, FrownIcon, Plus } from "lucide-react";
import { SetStateAction, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../collapsible";
import { Input } from "../input";
import { Button } from "../button";
import {
  useCreateProject,
  useFetchProjects,
} from "@/modules/project/project.hook";
import { createProjectSchema } from "@/modules/project/project.schema";
import { Skeleton } from "../skeleton";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia } from "../empty";

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

const filterMenuItem: { title: string; path: string; badge?: string }[] = [
  {
    title: "All",
    path: ROUTES.task.all.path,
  },
  {
    title: "Inbox",
    path: ROUTES.task.inbox.path,
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

function SidebarCreateProjectForm({
  setIsCreatingProject,
}: {
  setIsCreatingProject: React.Dispatch<SetStateAction<boolean>>;
}) {
  const createProject = useCreateProject();

  return (
    <form
      className="flex flex-col gap-2 border rounded-xl"
      onSubmit={(e) => {
        e.preventDefault();
        setIsCreatingProject(false);

        const formElement = e.target;
        const formData = new FormData(formElement);
        const dataObj = Object.fromEntries(formData.entries());
        const dataProject = createProjectSchema.parse(dataObj);

        createProject.mutate({ data: dataProject });
      }}
    >
      <Input name="title" placeholder="Project Name" className="" />
      <div className="self-end flex gap-2">
        <Button
          variant={"secondary"}
          size={"sm"}
          type="reset"
          onClick={() => setIsCreatingProject(false)}
        >
          Cancel
        </Button>
        <Button size={"sm"} type="submit">
          Create
        </Button>
      </div>
    </form>
  );
}

export function SidebarProjectsSkeleton() {
  return (
    <div className="w-full flex flex-col gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-6 w-full rounded-sm" />
      ))}
    </div>
  );
}

export function SidebarProjectsEmpty() {
  return (
    <Empty className="text-muted-foreground">
      <EmptyHeader>
        <EmptyMedia>
          <FolderIcon />
        </EmptyMedia>
        <EmptyDescription>No project found</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

export function SidebarProjectsError() {
  return (
    <Empty className="text-muted-foreground">
      <EmptyHeader>
        <EmptyMedia>
          <FrownIcon />
        </EmptyMedia>
        <EmptyDescription>Failed to fetch project</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

function SidebarProjectsGroup() {
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const fetchProjects = useFetchProjects();
  const pathname = usePathname();

  function getIsActivePath(path: string) {
    return pathname.startsWith(path);
  }

  if (fetchProjects.isLoading) return <p>loading...</p>;

  // next handle error properly
  if (fetchProjects.isError) return <p>error...</p>;

  const isProjectEmpty = !fetchProjects.data || !fetchProjects.data.length;

  const projectEmpty = (
    <div className="py-8 px-4">
      <span className="text-gray-400 text-sm text-center ">
        No project found. Create your project
      </span>
    </div>
  );

  return (
    <Collapsible open={isCreatingProject} onOpenChange={setIsCreatingProject}>
      <SidebarGroup>
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
        <CollapsibleTrigger asChild>
          <SidebarGroupAction>
            <Plus /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
        </CollapsibleTrigger>

        {/* form di sini? */}
        <SidebarGroupContent>
          <CollapsibleContent>
            <SidebarCreateProjectForm
              setIsCreatingProject={setIsCreatingProject}
            />
          </CollapsibleContent>

          <SidebarMenu>
            {fetchProjects.isLoading ? (
              <SidebarProjectsSkeleton />
            ) : fetchProjects.isError ? (
              <SidebarProjectsError />
            ) : isProjectEmpty ? (
              <SidebarProjectsEmpty />
            ) : (
              fetchProjects.data
                .filter((p) => p.isDefault === false)
                .map((p) => (
                  <SidebarMenuItem key={p.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={getIsActivePath(
                        ROUTES.task.byProject.buildPath(p.id),
                      )}
                    >
                      <Link href={ROUTES.task.byProject.buildPath(p.id)}>
                        <span>{p.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </Collapsible>
  );
}

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

      <SidebarProjectsGroup />
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
