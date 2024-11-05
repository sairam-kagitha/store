"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema, RegisterSchemaType } from "@/lib/validators"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { registerUser } from "@/actions/authActions"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"

const RegisterPage = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterSchemaType>({
        resolver: zodResolver(RegisterSchema),
    })

    const redirectTo = searchParams.get("redirect") || "/"

    const onSubmit = async (data: RegisterSchemaType) => {
        const result = await registerUser(data)
        if (result.ok) {
            toast.success("User created successfully")
            router.push(redirectTo)
        } else {
            toast.error(result.error)
        }
    }

    return (
        <main className="h-full w-full flex flex-col items-center justify-center gap-8">
            <div className="flex flex-col gap-2 items-center">
                <h1 className="text-2xl font-bold font-dmSans">Register</h1>
                <Link
                    href={`/login?redirect=${redirectTo || ""}`}
                    className="font-medium font-poppins text-sm underline text-blue-600"
                >
                    Already have an account? Login
                </Link>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-80 flex flex-col gap-4"
            >
                <div className="space-y-px">
                    <Label htmlFor="name" className="font-medium ml-1">
                        Name
                    </Label>
                    <Input
                        id="name"
                        placeholder="John Doe"
                        {...register("name")}
                    />
                    {errors.name && (
                        <p className="text-xs ml-1 pt-1 font-poppins text-red-600">
                            {errors.name.message}
                        </p>
                    )}
                </div>
                <div className="space-y-px">
                    <Label htmlFor="email" className="font-medium ml-1">
                        Email
                    </Label>
                    <Input
                        type="email"
                        placeholder="you@example.com"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-xs ml-1 pt-1 font-poppins text-red-600">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="space-y-px">
                    <Label htmlFor="password" className="font-medium ml-1">
                        Password
                    </Label>
                    <Input
                        type="password"
                        placeholder="must be 8 characters long"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-xs ml-1 pt-1 font-poppins text-red-600">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="w-full mt-4">
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full font-poppins"
                    >
                        {isSubmitting && (
                            <Loader2
                                className="animate-spin"
                                size={16}
                                strokeWidth={3}
                            />
                        )}
                        Register
                    </Button>
                    {errors.root && (
                        <p className="text-xs ml-1 pt-1 font-poppins text-red-600">
                            {errors.root.message}
                        </p>
                    )}
                </div>
            </form>
        </main>
    )
}

export default RegisterPage
