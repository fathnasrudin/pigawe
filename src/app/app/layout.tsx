import { AppSidebar } from "@/components/ui/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { requireUserInPage } from "@/modules/auth/auth.service";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // require user
  await requireUserInPage();

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full max-w-2xl mx-auto flex flex-col">
        <SidebarTrigger />
        <Separator />
        {children}
      </div>
    </SidebarProvider>
  );
}
