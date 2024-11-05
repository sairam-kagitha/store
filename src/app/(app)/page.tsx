import ShopList from "@/components/ShopList"
import Wrapper from "@/components/Wrapper"
import { Category } from "@prisma/client"
import { Suspense } from "react"
import Loader from "@/components/Loader"

export default function Home() {
    return (
        <Wrapper className="w-full min-h-app py-8 space-y-16">
            {[Category.TShirts, Category.Sweatshirts, Category.Hoodies].map(
                (category) => (
                    <section className="w-full space-y-4" key={category}>
                        <h1 className="text-2xl font-bold font-dmSans">
                            Latest {category}
                        </h1>
                        <Suspense fallback={<Loader />}>
                            <ShopList category={category} limit={4} />
                        </Suspense>
                    </section>
                )
            )}
        </Wrapper>
    )
}
