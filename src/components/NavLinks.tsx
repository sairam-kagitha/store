"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const LINKS = [
    { name: "Shop", href: "/shop" },
    { name: "T-Shirts", href: "/shop/t-shirts" },
    { name: "Hoodies", href: "/shop/hoodies" },
    { name: "Sweatshirts", href: "/shop/sweatshirts" },
] as const

const NavLinks = () => {
    const pathName = usePathname()

    return (
        <nav className="hidden md:flex h-full items-center gap-2">
            {LINKS.map((link) => (
                <Link
                    href={link.href}
                    key={link.href}
                    className={cn(
                        "px-4 py-2 hover:bg-gray-200/60 text-sm rounded-md font-medium font-dmSans",
                        {
                            "bg-gray-200/60": pathName === link.href,
                        }
                    )}
                >
                    {link.name}
                </Link>
            ))}
        </nav>
    )
}

export default NavLinks
