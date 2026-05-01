import type { Metadata } from "next"
import CyberDashboardShell from "@/components/dashboard/CyberDashboardShell"
export const metadata: Metadata = { title: "COMMAND_CENTER", robots: { index: false, follow: false } }
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <CyberDashboardShell>{children}</CyberDashboardShell>
}
