"use client"
import { Loader2, Trash } from "lucide-react"
import { Button } from "./ui/button"
import { removeItemFromCart } from "@/actions/cartAvtions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"

const RemoveItem = ({
    productId,
    userId,
}: {
    productId: string
    userId: string
}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        setIsLoading(true)
        try {
            await removeItemFromCart(userId, productId)
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
            setIsLoading(false)
        }
    }

    return (
        <Button
            onClick={handleClick}
            variant="outline"
            className="w-1/3"
            size="sm"
            disabled={isLoading}
        >
            {isLoading ? (
                <Loader2 className="animate-spin" size={16} strokeWidth={3} />
            ) : (
                <Trash />
            )}
            remove
        </Button>
    )
}

export default RemoveItem
