import type { Metadata } from "next";
import CyberRegister from "@/components/auth/CyberRegister";
export const metadata: Metadata = {
  title: "INITIALIZE_SYSTEM",
  robots: { index: false, follow: false },
};
export default function RegisterPage() {
  return <CyberRegister />;
}
