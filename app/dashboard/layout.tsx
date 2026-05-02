import type { Metadata } from "next";
import CyberDashboardShell from "@/components/dashboard/CyberDashboardShell";
import { SiteProvider } from "@/context/SiteContext";
export const metadata: Metadata = {
  title: "COMMAND_CENTER",
  robots: { index: false, follow: false },
};
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteProvider>
        <CyberDashboardShell>{children}</CyberDashboardShell>
      </SiteProvider>
    </>
  );
}
