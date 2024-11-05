import { getUser } from "@/actions/authActions"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import NavLinks from "./NavLinks"
import { buttonVariants } from "./ui/button"
import Wrapper from "./Wrapper"
import LogoutButton from "./LogoutButton"

const Navbar = async () => {
    const user = await getUser()

    return (
        <header className="h-16 w-full sticky z-50 inset-x-0 top-0 bg-white">
            <Wrapper className="flex items-center justify-between border-b h-full">
                <Link href="/" className="font-bold text-xl font-dmSans">
                    Store
                </Link>

                <NavLinks />

                <section className="flex items-center gap-6 h-full">
                    {user ? (
                        <LogoutButton />
                    ) : (
                        <div className="flex items-center gap-4 h-full font-medium font-dmSans">
                            <Link
                                href="/login"
                                className={buttonVariants({ variant: "ghost" })}
                            >
                                Login
                            </Link>
                            <Link href="/register" className={buttonVariants()}>
                                Register
                            </Link>
                        </div>
                    )}

                    <Link href="/cart">
                        <ShoppingBag />
                    </Link>
                </section>
            </Wrapper>
        </header>
    )
}

export default Navbar
