"use client"
import Cookies from "js-cookie"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { deleteUser } from "@/actions/authActions"
import { toast } from "sonner"

const LogoutButton = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

   const handleClick = async () => {
        setIsLoading(true)
        const result = await deleteUser()
        if (result.ok) {
            Cookies.remove("jwt")
            router.refresh()
        } else {
            toast.error(result.error || "Something went wrong")
            setIsLoading(false)
        }
    }

    return (
        <Button
            variant="destructive"
            onClick={handleClick}
            disabled={isLoading}
        >
            {isLoading && (
                <Loader2 className="animate-spin" size={16} strokeWidth={3} />
            )}
            Delete Account
        </Button>
    )
}

export default LogoutButton
