import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Register - Store",
    description: "Generated by create next app",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <>{children}</>
}