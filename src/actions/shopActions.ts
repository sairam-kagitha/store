"use server"
import prisma from "@/lib/database"

type searchParams = {
    category: string
    size: string
    color: string
}
export const getProducts = async ({ category, color, size }: searchParams) => {
    const categoryList = category.split(",") || []
    const colorList = color.split(",") || []
    const sizeList = size.split(",") || []

    const products = await prisma.product.findMany({
        where: {
            // category: {
            //     in: categoryList,
            // },
            color: {
                // @ts-ignore
                every: {
                    name: {
                        in: colorList,
                    },
                },
            },
            size: {
                // @ts-ignore
                every: {
                    name: {
                        in: sizeList,
                    },
                },
            },
        },
    })

    return products
}
