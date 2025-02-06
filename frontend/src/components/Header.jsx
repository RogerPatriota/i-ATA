import { GalleryHorizontalEnd } from "lucide-react"

export function Header() {
    return <div className="w-auto h-20 m-10 p-6 flex flex-row items-center gap-2" >
        <GalleryHorizontalEnd size={38} color="#4A3AFF" strokeWidth={2.25} className="mt-1.5" />
        <div className="flex">
            <h1 className="font-bold italic text-5xl font-liter text-[#4A3AFF]">I</h1>
            <h1 className="font-bold italic text-5xl font-liter">-ATA</h1>
        </div>
    </div>
}

export default Header