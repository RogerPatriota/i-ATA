import { GalleryHorizontalEnd } from "lucide-react"

export function Header() {
    return <div className="w-auto h-20 mt-10 ml-25 p-10 flex flex-row items-center gap-2" >
        <GalleryHorizontalEnd size={45} color="#4A3AFF" strokeWidth={2.25} className="pb-0.5"/>
        <div className="flex items-center">
            <h1 className="font-bold italic text-5xl text-[#4A3AFF]">I</h1>
            <h1 className="font-bold italic text-5xl">-ATA</h1>
        </div>
    </div>
}

export default Header