"use client"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { redirect } from "next/navigation"
import { AppUser } from "@/lib/utils"
import Cookie from "js-cookie"
import { Product } from "@prisma/client"

const checkoutFormSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
        .string()
        .email({ message: "Please enter a valid email address" })
        .min(1, { message: "Email is required" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    postalCode: z.string().min(1, { message: "Postal code is required" }),
})
type TCheckoutFormSchema = z.infer<typeof checkoutFormSchema>

const CheckoutForm = ({
    price,
    user,
    cart,
}: {
    price: number
    user: AppUser
    cart: Product[]
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TCheckoutFormSchema>({
        resolver: zodResolver(checkoutFormSchema),
    })

    return (
        <>
            <h1 className="text-2xl font-bold font-dmSans">Checkout</h1>
            <form
                onSubmit={handleSubmit(() => {
                    const transactionId = Math.random().toString(36).slice(2)
                    Cookie.set(
                        "checkout",
                        JSON.stringify({
                            price: price,
                            transactionId: transactionId,
                            cart: cart,
                        })
                    )
                    redirect("/payment?transactionId=" + transactionId)
                })}
                className="md:order-1 w-full py-8 px-2 md:px-0 md:pr-12 flex flex-col gap-2"
            >
                <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        disabled
                        {...register("name", { value: user.name })}
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        value={user.email}
                        disabled
                        {...register("email", { value: user.email })}
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phone"
                        value="123-456-7890"
                        {...register("phone")}
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="address">Address</Label>
                    <Input
                        id="address"
                        value="123 Main St"
                        {...register("address")}
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value="New York" {...register("city")} />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                        id="postalCode"
                        value="521324"
                        {...register("postalCode")}
                    />
                </div>

                <div className="mt-6 w-full">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        Pay ${price}
                    </Button>
                    <span className="text-sm text-center mx-auto w-full text-slate-700">
                        Don't fill this out, just click pay
                    </span>
                </div>
            </form>
        </>
    )
}

export default CheckoutForm
