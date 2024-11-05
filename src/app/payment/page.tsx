import { getUser } from "@/actions/authActions"
import PaymentForm from "@/components/PaymentForm"
import { AppUser } from "@/lib/utils"
import { Product } from "@prisma/client"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type Params = {
    searchParams: Promise<{
        transactionId: string
    }>
}

type transactionType = {
    transactionId: string
    price: number
    cart: Product[]
}

const PaymentPage = async ({ searchParams }: Params) => {
    const { transactionId } = await searchParams
    const cookieStore = await cookies()
    const cookData = cookieStore.get("checkout")?.value
    const userData = (await getUser()) as AppUser

    if (!cookData) return redirect("/cart")
    const transaction = JSON.parse(cookData) as transactionType

    return (
        <main className="relative h-full w-full bg-image md:py-8 flex items-center justify-center">
            <section className="max-w-md bg-slate-50 rounded-lg mx-auto px-4 py-6 shadow-2xl border">
                <h1 className="text-2xl font-bold font-dmSans">Payment</h1>
                <PaymentForm
                    price={transaction.price}
                    userId={userData?.userId}
                />
            </section>
        </main>
    )
}

export default PaymentPage
