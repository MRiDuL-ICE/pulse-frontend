import type { Metadata } from "next"
import CyberLogin from "@/components/auth/CyberLogin"
export const metadata: Metadata = { title: "ACCESS_TERMINAL", robots: { index: false, follow: false } }
export default function LoginPage() { return <CyberLogin /> }
