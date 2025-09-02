import { useForm } from "../context/FormContext"
import { useEffect, useState } from "react"
import axios from "axios"
import Email from "./Email"

const API_URL = import.meta.env.VITE_API_URL

export function MeetingNote() {
    const { formData } = useForm()
    const [ meetingNotes, setMeetingNotes ]  = useState()
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        axios.post(`${API_URL}/generate_ata`, {
            file_id: formData.fileId,
            model: formData.model,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            setMeetingNotes(res.data)
            console.log(res.data)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }, [])

    return (
        <div className="w-250 mt-6 mb-6 flex flex-col items-center gap-3">
            <h3 className="text-2xl text-[#494853] ">Transcript</h3>
            <p className="text-[#6F6C90] text-sm text-center">Here are the meeting trasnscription without the ATA model, 
                <br/>to create de notes, please submit the form
            </p>
            
            {loading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="loading loading-dots loading-xl text-primary"></span>
                    </div>
                ) : (
                    <Email notes={meetingNotes && meetingNotes.response}/>
                )
            }
            
        </div>
    )
}

export default MeetingNote