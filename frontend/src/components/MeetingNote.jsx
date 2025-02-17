import { Pencil } from "lucide-react"

export function MeetingNote() {
    return (
        <div className="w-250 mt-6 flex flex-col items-center gap-3">
            <h3 className="text-2xl text-[#494853] ">Transcript</h3>
            <p className="text-[#6F6C90] text-sm text-center">Here are the meeting trasnscription without the ATA model, 
                <br/>to create de notes, please submit the form
            </p>
            <div className="w-[75%] h-92 border-1 border-gray-300"></div>
            <div className="flex w-100 mt-5 justify-between items-center">
                <button className="flex justify-start gap-6 items-center w-42 pl-4 py-2 border-2 border-gray-400 hover:border-[#4A3AFF] rounded-2xl text-xl cursor-pointer">
                    <Pencil className="text-[#4A3AFF]"/>
                    <p className="font-bold text-center">Edit</p>
                </button>
                <button className="border-2 w-42 py-2 bg-[#4A3AFF] hover:bg-[#4233e7] text-white font-bold rounded-2xl text-xl cursor-pointer">Save</button>               
            </div>
        </div>
    )
}

export default MeetingNote