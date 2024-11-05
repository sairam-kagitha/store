"use client"
import { clearCart } from "@/actions/cartAvtions"
import Cookies from "js-cookie"
import { Loader2 } from "lucide-react"
import { redirect } from "next/navigation"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

const PaymentForm = ({ price, userId }: { price: number; userId: string }) => {
    const [data, setData] = useState({
        cardNumber: "4242 4242 4242 4242",
        cvv: "123",
        cardHolderName: "John Doe",
        expiryDate: "12/24",
    })
    const correctData = {
        cardNumber: "4242 4242 4242 4242",
        cvv: "123",
        cardHolderName: "John Doe",
        expiryDate: "12/24",
    }
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setIsSubmitting(true)
        if (
            data.cardHolderName == correctData.cardHolderName &&
            data.cardNumber == correctData.cardNumber &&
            data.cvv == correctData.cvv &&
            data.expiryDate == correctData.expiryDate
        ) {
            await clearCart(userId)
            Cookies.set("payment", "success", { expires: 7 })
            Cookies.remove("checkout")
            redirect("/payment/success")
        } else {
            Cookies.set("payment", "failure", { expires: 7 })
            Cookies.remove("checkout")
            redirect("/payment/failure")
        }
    }

    return (
        <form
            className="md:order-1 w-full p-2 flex flex-col gap-2"
            onSubmit={handleSubmit}
        >
            <div className="space-y-1">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                    id="cardNumber"
                    value={data.cardNumber}
                    onChange={(e) =>
                        setData({ ...data, cardNumber: e.target.value })
                    }
                />
            </div>
            <div className="space-y-1">
                <Label htmlFor="cardHolderName">Card Holder Name</Label>
                <Input
                    id="cardHolderName"
                    value={data.cardHolderName}
                    onChange={(e) =>
                        setData({ ...data, cardHolderName: e.target.value })
                    }
                />
            </div>
            <div className="w-full grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                        id="cvv"
                        value={data.cvv}
                        onChange={(e) =>
                            setData({ ...data, cvv: e.target.value })
                        }
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                        id="expiryDate"
                        value={data.expiryDate}
                        onChange={(e) =>
                            setData({ ...data, expiryDate: e.target.value })
                        }
                    />
                </div>
            </div>
            <section className="w-full flex flex-col gap-2">
                <Button className="mt-8" disabled={isSubmitting}>
                    {isSubmitting && (
                        <Loader2
                            className="animate-spin"
                            size={16}
                            strokeWidth={3}
                        />
                    )}
                    Pay ${price}
                </Button>
                <span className="text-slate-800 font-medium text-sm text-center font-dmsans">
                    Change anything to see failure state
                </span>
            </section>
        </form>
    )
}

export default PaymentForm
