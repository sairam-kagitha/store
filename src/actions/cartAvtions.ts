"use server"
import prisma from "@/lib/database"

export const addItemToCart = async (userId: string, productId: string) => {
    await prisma.user.update({
        where: {
            userId,
        },
        data: {
            cart: {
                connect: {
                    productId,
                },
            },
        },
    })
}

export const removeItemFromCart = async (userId: string, productId: string) => {
    await prisma.user.update({
        where: {
            userId,
        },
        data: {
            cart: {
                disconnect: {
                    productId,
                },
            },
        },
    })
}

export const clearCart = async (userId: string) => {
    await prisma.user.update({
        where: {
            userId,
        },
        data: {
            cart: {
                set: [],
            },
        },
    })
}
