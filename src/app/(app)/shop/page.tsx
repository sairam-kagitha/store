import Loader from "@/components/Loader"
import ShopList from "@/components/ShopList"
import Wrapper from "@/components/Wrapper"
import { Suspense } from "react"

const ShopPage = async () => {
    return (
        <Wrapper className="min-h-app w-full flex flex-col py-4 gap-6">
            <h1 className="text-2xl font-bold font-dmSans">Products</h1>
            <Suspense fallback={<Loader />}>
                <ShopList />
            </Suspense>
        </Wrapper>
    )
}

export default ShopPage
