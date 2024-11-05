import { Product } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <Link href={`/products/${product.slug}`} className="w-full space-y-2">
            <div className="w-full aspect-[75/100] rounded-lg relative">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    priority
                    className="object-cover rounded-lg"
                />
            </div>
            <div className="px-1 space-y-1">
                <h1 className="font-semibold truncate-2 text-pretty font-dmSans leading-5">
                    {product.name}
                </h1>
                <h3 className="font-bold text-sm text-slate-800 font-dmSans">
                    {product.category}
                </h3>
                <h3 className="font-semibold font-poppins">${product.price}</h3>
            </div>
        </Link>
    )
}

export default ProductCard
