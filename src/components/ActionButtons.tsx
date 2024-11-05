"use client"
import { getUser } from "@/actions/authActions"
import { addItemToCart } from "@/actions/cartAvtions"
import {} from "@/components/ui/sheet"
import { Product } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { redirect, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"

const ActionButtons = ({ product, url }: { product: Product; url: string }) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState({
        addToCart: false,
        buyNow: false,
    })

    const handleAddToCart = async () => {
        setIsLoading((prev) => ({ ...prev, addToCart: true }))
        try {
            const user = await getUser()
            if (!user) return router.push(`/login?redirect=${url}`)
            await addItemToCart(user.userId, product.productId)
            toast.success("Added to cart")
            router.push("/cart")
        } catch (error) {
            toast.error("Something went wrong")
        }
        setIsLoading((prev) => ({ ...prev, addToCart: false }))
    }

    return (
        <div className="w-full grid grid-cols-2 gap-2 md:gap-6 pt-6">
            <Button onClick={handleAddToCart} disabled={isLoading.addToCart}>
                {isLoading.addToCart && (
                    <Loader2
                        className="animate-spin"
                        size={16}
                        strokeWidth={3}
                    />
                )}
                Add to cart
            </Button>
        </div>
    )
}

export default ActionButtons
