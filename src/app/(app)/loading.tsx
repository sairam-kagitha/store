import { Loader2 } from "lucide-react"

export default function Loading() {
    return (
        <main className="flex items-center justify-center h-app w-full">
            <Loader2 className="animate-spin" size={48} strokeWidth={2.4} />
        </main>
    )
}
