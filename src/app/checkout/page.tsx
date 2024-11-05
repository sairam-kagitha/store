import { getUser } from "@/actions/authActions"
import CheckoutForm from "@/components/CheckoutForm"
import Wrapper from "@/components/Wrapper"
import prisma from "@/lib/database"
import { AppUser } from "@/lib/utils"
import Image from "next/image"
import { redirect } from "next/navigation"

const CheckoutPage = async () => {
    const user = (await getUser()) as AppUser

    const cart = await prisma.user
        .findUnique({
            where: {
                userId: user?.userId,
            },
        })
        .cart()

    if (!cart || cart.reduce((a, b) => a + b.price, 0) === 0)
        return redirect("/shop")

    return (
        <>
            <Wrapper className="h-full w-full flex flex-col md:flex-row justify-center md:justify-normal md:items-center">
                <section className="w-full order-2 md:w-1/2 md:py-10 md:px-10 max-w-md">
                    <CheckoutForm
                        price={cart.reduce((a, b) => a + b.price, 0)}
                        user={user}
                        cart={cart}
                    />
                </section>
                <section className="hidden md:flex w-1/2 h-full items-center justify-center">
                    <div className="aspect-[100/75] w-full mx-10 relative">
                        <Image
                            src="./checkout.svg"
                            fill
                            priority
                            alt="checkout image"
                            className="object-cover overflow-hidden"
                        />
                    </div>
                </section>
            </Wrapper>
        </>
    )
}

export default CheckoutPage
