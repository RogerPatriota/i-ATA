import { useForm } from "../context/FormContext"
import axios from 'axios'

export function Button(props) {
    const { formData, updateFormData } = useForm()

    const isFormWithoutFile = formData.file === null
    
    function handleSubmit() {
        props.onChangeTab()

        const formPayload = new FormData()

        switch (props.currentTab) {
            case 1:
                formPayload.append('file', formData.file)

                axios.post('http://127.0.0.1:8000/video_transcription', formPayload, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                })
                .then((res) => updateFormData('fileId', res.data.file_id))
                .then(() => updateFormData('fileUploaded', true))
                .catch((err) => console.log(err))
                break;l
            case 2:
                axios.post('http://localhost:8000/generate_ata', {
                    file_id: formData.fileId,
                    model: formData.model
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => console.log(res))
                break;
            default:
                break;
        }
    }

    return (
        <button 
            type="button"
            disabled={isFormWithoutFile}
            onClick={handleSubmit}
            className={`px-2 py-2 w-38 rounded-full text-xl mt-2 font-bold cursor-pointer 
                ${isFormWithoutFile ? 'bg-[#4a3aff8e] text-white' : 'bg-[#4A3AFF] hover:bg-[#4233e7] text-white'}`}
            >
        Next
        </button>
    )
}

export default Button