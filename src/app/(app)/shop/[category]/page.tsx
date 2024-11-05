import Loader from "@/components/Loader"
import ShopList from "@/components/ShopList"
import Wrapper from "@/components/Wrapper"
import { Category } from "@prisma/client"
import { redirect } from "next/navigation"
import { Suspense } from "react"

const availableCategories = ["t-shirts", "hoodies", "sweatshirts"]

export const revalidate = 60

const categoryPage = async ({
    params,
}: {
    params: Promise<{ category: string }>
}) => {
    const { category } = await params
    if (!availableCategories.includes(category) || !category)
        return redirect("/shop")

    let cat =
        category === "t-shirts"
            ? Category.TShirts
            : category === "sweatshirts"
            ? Category.Sweatshirts
            : Category.Hoodies

    return (
        <Wrapper className="min-h-app w-full flex flex-col py-4 gap-6">
            <h1 className="text-2xl font-bold font-dmSans capitalize">
                {category}
            </h1>
            <Suspense fallback={<Loader />}>
                <ShopList category={cat} />
            </Suspense>
        </Wrapper>
    )
}

export default categoryPage
