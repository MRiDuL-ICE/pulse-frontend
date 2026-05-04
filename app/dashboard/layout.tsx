import CyberDashboardShell from "@/components/dashboard/CyberDashboardShell";
import { SiteProvider } from "@/context/SiteContext";

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
