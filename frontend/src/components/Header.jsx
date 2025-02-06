import { GalleryHorizontalEnd } from "lucide-react"

export function Header() {
    return <div className="w-auto h-20 m-10 ml-15 p-10 flex flex-row items-center gap-2" >
        <GalleryHorizontalEnd size={38} color="#4A3AFF" strokeWidth={2.25} className="mt-0.5" />
        <div className="flex items-center">
            <h1 className="font-bold italic text-5xl font-mono text-[#4A3AFF]">I</h1>
            <h1 className="font-bold italic text-5xl font-mono">-ATA</h1>
        </div>
    </div>
}

export default Header