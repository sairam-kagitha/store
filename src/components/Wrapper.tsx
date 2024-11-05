import { cn } from "@/lib/utils"

const Wrapper = ({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) => {
    return (
        <section className={cn("w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16", className)}>
            {children}
        </section>
    )
}

export default Wrapper
