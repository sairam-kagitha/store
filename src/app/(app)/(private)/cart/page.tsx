import { getUser } from "@/actions/authActions"
import RemoveItem from "@/components/RemoveItem"
import { buttonVariants } from "@/components/ui/button"
import Wrapper from "@/components/Wrapper"
import prisma from "@/lib/database"
import { AppUser } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

const Cart = async () => {
    const user = (await getUser()) as AppUser

    const data = await prisma.user.findUnique({
        where: {
            userId: user?.userId,
        },
        include: {
            cart: true,
        },
    })
    if (!data) return <p>Cart not found</p>

    const cartTotal = data.cart.reduce((a, b) => a + b.price, 0)
    const additionalPrice = 0

    if (data.cart.length === 0) {
        return (
            <main className="h-app w-full flex flex-col gap-4 items-center justify-center">
                <h1 className="text-4xl font-bold font-dmSans">Cart Empty</h1>
                <p className="font-medium font-poppins">No items in cart</p>
                <Link href="/shop" className={buttonVariants()}>
                    Continue Shopping
                </Link>
            </main>
        )
    }

    return (
        <Wrapper className="min-h-app w-full flex flex-col py-4 md:py-12 gap-6">
            <h1 className="text-2xl font-bold font-dmSans">Cart</h1>
            <main className="flex gap-6 w-full flex-col md:flex-row">
                <section className="w-full md:w-1/2 h-full flex flex-col gap-6">
                    {data.cart.map((item) => (
                        <section
                            key={item.productId}
                            className="w-full flex gap-4 border rounded-lg p-4"
                        >
                            <div className="relative aspect-[75/100] w-1/3 select-none">
                                <Image
                                    src={item.images[0]}
                                    alt={item.name}
                                    fill
                                    priority
                                    className="rounded-lg object-cover"
                                />
                            </div>
                            <div className="flex flex-col gap-2 py-2 justify-center">
                                <h1 className="text-lg font-semibold font-dmSans">
                                    {item.name}
                                </h1>
                                <h3 className="text-sm font-medium text-slate-800 font-poppins">
                                    {item.category}
                                </h3>
                                <h3 className="text-lg font-medium font-dmSans">
                                    ${item.price}
                                </h3>
                                <ul className="font-medium text-sm font-poppins">
                                    <li>Color : {item.color}</li>
                                    <li>Size : {item.size}</li>
                                </ul>
                                <RemoveItem
                                    productId={item.productId}
                                    userId={user?.userId}
                                />
                            </div>
                        </section>
                    ))}
                </section>

                <section className="w-full md:w-1/3 border rounded-lg h-fit p-4">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="font-medium font-dmSans">
                                Cart Total
                            </span>
                            <span className="font-poppins text-lg font-medum">
                                ${cartTotal}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-medium font-dmSans">
                                Additional Charges
                            </span>
                            <span className="font-poppins text-lg font-medum">
                                ${additionalPrice}
                            </span>
                        </div>
                        <hr />
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="font-medium font-dmSans">Total</span>
                        <span className="font-poppins text-lg font-semibold">
                            ${cartTotal + additionalPrice}
                        </span>
                    </div>
                    <Link
                        href="/checkout"
                        className={buttonVariants({ className: "w-full pt-2" })}
                    >
                        Checkout
                    </Link>
                </section>
            </main>
        </Wrapper>
    )
}

export default Cart
