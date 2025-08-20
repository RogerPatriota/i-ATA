import { Pencil } from "lucide-react"
import { useForm } from "../context/FormContext"
import { useEffect, useState } from "react"
import axios from "axios"

export function MeetingNote() {
    const { formData } = useForm()
    const [ meetingNotes, setMeetingNotes ]  = useState()
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        axios.post('http://localhost:8000/home_azure', {
            file_id: formData.fileId,
            model: formData.model,
        },{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            setMeetingNotes(res.data)
            setLoading(false)
        })
        .then((res) => {console.log(res.data)})
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }, [])

    return (
        <div className="w-250 mt-6 flex flex-col items-center gap-3">
            <h3 className="text-2xl text-[#494853] ">Transcript</h3>
            <p className="text-[#6F6C90] text-sm text-center">Here are the meeting trasnscription without the ATA model, 
                <br/>to create de notes, please submit the form
            </p>
            <div className="w-[75%] h-92 border-1 border-gray-300 overflow-auto rounded p-8">
                {loading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="loading loading-dots loading-xl text-primary"></span>
                    </div>
                ) : (
                    <p className="break-words w-full text-base">
                        {meetingNotes && meetingNotes.response}
                    </p>
                )}
            </div>
            <div className="flex w-100 justify-evenly items-center">
                <button className="flex justify-start gap-3 items-center w-30 pl-6 py-2 border-2 border-gray-400 hover:border-[#4A3AFF] rounded-2xl text-xl cursor-pointer">
                    <Pencil size={20} className="text-[#4A3AFF]"/>
                    <p className="font-bold text-center text-lg">Edit</p>
                </button>
            </div>
        </div>
    )
}

export default MeetingNote