import ActionButtons from "@/components/ActionButtons"
import SimularProducts from "@/components/SimularProducts"
import Wrapper from "@/components/Wrapper"
import prisma from "@/lib/database"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import Loader from "@/components/Loader"

export const revalidate = 60

const ProductDetailsPage = async ({
    params,
}: {
    params: Promise<{ productId: string }>
}) => {
    const { productId } = await params

    const product = await prisma.product.findUnique({
        where: {
            slug: productId,
        },
    })

    if (!product) {
        return (
            <main className="w-full min-h-app flex flex-col gap-4 items-center justify-center">
                <Image
                    src="../not-found.svg"
                    height={300}
                    width={300}
                    alt="No products found"
                    className="object-cover select-none"
                />
                <h1 className="text-3xl font-bold font-dmSans">
                    Product not found
                </h1>
                <p className="font-medium font-poppins">
                    The product you are looking for does not exist
                </p>
            </main>
        )
    }

    const categorySlug =
        product.category === "TShirts"
            ? "t-shirts"
            : product.category === "Sweatshirts"
            ? "sweatshirts"
            : "hoodies"

    return (
        <Wrapper className="w-full h-full py-10 md:px-28 lg:px-40 space-y-12 md:space-y-20">
            <main className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 w-full">
                <section className="w-full aspect-[75/100] justify-end rounded-lg relative">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        priority
                        className="object-cover rounded-lg select-none"
                    />
                </section>
                <section className="md:py-4 space-y-2">
                    <h1 className="text-2xl font-bold font-dmSans">
                        {product.name}
                    </h1>
                    <Link
                        href={`/${categorySlug}`}
                        className="font-medium text-sm text-slate-800 font-poppins"
                    >
                        {product.category}
                    </Link>
                    <p className="font-medium text-xl font-dmSans">
                        ${product.price}
                    </p>
                    <ul className="font-medium text-sm font-poppins">
                        <li>Color : {product.color}</li>
                        <li>Size : {product.size}</li>
                    </ul>
                    <p className="font-medium text-sm text-slate-800 font-poppins">
                        {product.description}
                    </p>
                    <ActionButtons
                        product={product}
                        url={`/products/${product.slug}`}
                    />
                </section>
            </main>
            <main>
                <Suspense fallback={<Loader />}>
                    <SimularProducts
                        category={product.category}
                        currentProduct={product.slug}
                    />
                </Suspense>
            </main>
        </Wrapper>
    )
}

export default ProductDetailsPage
