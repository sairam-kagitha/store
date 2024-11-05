export default function Loader() {
    return (
        <section className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                    className="w-full aspect-[75/100] rounded-lg bg-slate-200 animate-pulse"
                    key={index}
                ></div>
            ))}
        </section>
    )
}
