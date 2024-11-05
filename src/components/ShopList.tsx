import prisma from "@/lib/database"
import ProductCard from "./ProductCard"
import Image from "next/image"
import { Category } from "@prisma/client"

const ShopList = async ({
    category,
    limit,
}: {
    category?: Category
    limit?: number
}) => {
    const products = await prisma.product.findMany({
        where: {
            category: category,
        },
        take: limit,
    })

    if (products.length === 0) {
        return (
            <section className="w-full h-full flex flex-col items-center justify-start py-16">
                <Image
                    src="https://i.postimg.cc/j2R7W5N0/not-found.png"
                    height={300}
                    width={300}
                    alt="No products found"
                    className="object-cover select-none"
                />
                <h1 className="text-2xl font-bold font-dmSans">
                    No products found
                </h1>
            </section>
        )
    }

    return (
        <section className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.productId} product={product} />
            ))}
        </section>
    )
}

export default ShopList
