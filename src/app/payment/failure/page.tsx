"use client"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import Cookies from "js-cookie"

const FailurePage = () => {
    useEffect(() => {
        const payment = Cookies.get("payment")
        if (!payment) redirect("/cart")
        setTimeout(() => {
            Cookies.remove("payment")
            redirect("/cart")
        }, 1500)
    }, [])

    return (
        <main className="w-full h-full flex flex-col gap-4 items-center justify-center">
            <h1 className="text-4xl font-bold font-dmSans">Payment Failed</h1>
            <span className="font-poppins">Redirecting to cart page...</span>
        </main>
    )
}

export default FailurePage
