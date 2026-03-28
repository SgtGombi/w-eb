import { SidebarProvider } from "@/admin/context/SidebarContext";
import { ThemeProvider } from "@/admin/context/ThemeContext";
import React from "react";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}
