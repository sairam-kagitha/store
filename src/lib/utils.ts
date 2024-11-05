import { User } from "@prisma/client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export type AppUser = Omit<User, "hashedPassword">

export const AVAILABLE_SIZES = ["S", "M", "L"] as const
export const AVAILABLE_COLORS = [
    "white",
    "beige",
    "green",
    "purple",
    "blue",
] as const
export const AVAILABLE_SORT = ["none", "price-asc", "price-desc"] as const

export const ProductFilterValidator = z.object({
    size: z.array(z.enum(AVAILABLE_SIZES)),
    color: z.array(z.enum(AVAILABLE_COLORS)),
    sort: z.enum(AVAILABLE_SORT),
    price: z.tuple([z.number(), z.number()]),
})

export type ProductState = Omit<
    z.infer<typeof ProductFilterValidator>,
    "price"
> & {
    price: { isCustom: boolean; range: [number, number] }
}
