"use server"
import prisma from "@/lib/database"
import { AppUser } from "@/lib/utils"
import { LoginSchemaType, RegisterSchemaType } from "@/lib/validators"
import bcrypt from "bcryptjs"
import { decodeJwt, SignJWT } from "jose"
import { cookies } from "next/headers"

export const registerUser = async (
    data: RegisterSchemaType
): Promise<{ ok: true } | { ok: false; error: string }> => {
    try {
        const existedUser = await prisma.user.findUnique({
            where: { email: data.email },
        })
        if (existedUser) return { ok: false, error: "Email already exists" }

        const hashedPassword = await bcrypt.hash(data.password, 10)
        const { hashedPassword: password, ...user } = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                hashedPassword,
            },
        })

        const jwtToken = await new SignJWT(user)
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setExpirationTime("7d")
            .sign(new TextEncoder().encode(process.env.JWT_SECRET))

        const cookieStore = await cookies()
        cookieStore.set("jwt", jwtToken, {
            httpOnly: process.env.NODE_ENV === "production",
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })

        return { ok: true }
    } catch (error) {
        return { ok: false, error: "Something went wrong" }
    }
}

export const loginUser = async (
    data: LoginSchemaType
): Promise<{ ok: true } | { ok: false; error: string }> => {
    try {
        const result = await prisma.user.findUnique({
            where: { email: data.email },
        })
        if (!result) return { ok: false, error: "Email does not exist" }

        const { hashedPassword: password, ...user } = result

        const isCorrectPassword = await bcrypt.compare(data.password, password)
        if (!isCorrectPassword)
            return { ok: false, error: "Incorrect password" }

        const jwtToken = await new SignJWT(user)
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setExpirationTime("7d")
            .sign(new TextEncoder().encode(process.env.JWT_SECRET))

        const cookieStore = await cookies()
        cookieStore.set("jwt", jwtToken, {
            httpOnly: process.env.NODE_ENV === "production",
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })

        return { ok: true }
    } catch (error) {
        return { ok: false, error: "Something went wrong" }
    }
}

export const getUser = async (): Promise<AppUser | null> => {
    const cookieStore = await cookies()
    const jwt = cookieStore.get("jwt")?.value
    if (!jwt) return null
    return (await decodeJwt(jwt)) as AppUser
}

export const deleteUser = async () => {
    const user = await getUser()
    if (!user) return { ok: false, error: "User not found" }
    try {
        await prisma.user.delete({
            where: {
                userId: user.userId,
            },
        })
        const cookieStore = await cookies()
        cookieStore.delete("jwt")
        return { ok: true }
    } catch (error) {
        return { ok: false, error: "Something went wrong" }
    }
}
