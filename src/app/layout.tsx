import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { WhatsNewProvider } from "@/features/whats-new/components/whats-new-provider";
import { QueryClientProvider } from "@/lib/tanstack-query/query-client.provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pigawe",
  description: "Task management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        roboto.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <QueryClientProvider>
          <TooltipProvider>
            <WhatsNewProvider />
            <SidebarProvider>
              <AppSidebar />
              <main className="flex-1 w-full">
                <SidebarTrigger />
                {children}
              </main>
            </SidebarProvider>
            <ReactQueryDevtools />
          </TooltipProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
