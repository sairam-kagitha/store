import prisma from "@/lib/database"
import { Product } from "@prisma/client"
import ProductCard from "./ProductCard"

const SimularProducts = async ({
    category,
    currentProduct,
}: {
    category: Product["category"]
    currentProduct: string
}) => {
    const products = await prisma.product.findMany({
        where: {
            category: category,
            AND: {
                slug: { not: currentProduct },
            },
        },
        take: 4,
        orderBy: {
            createdAt: "desc",
        },
    })

    if (products.length === 0) return null

    return (
        <section className="space-y-6">
            <h1 className="text-2xl font-bold font-dmSans">Simular Products</h1>
            <section className="w-full md:px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </section>
        </section>
    )
}

export default SimularProducts
