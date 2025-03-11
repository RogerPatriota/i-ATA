import { useForm } from "../context/FormContext"
import axios from 'axios'

export function Button(props) {
    const { formData } = useForm()
    
    function handleSubmit() {
        props.onChangeTab()

        const formPayload = new FormData()

        switch (props.currentTab) {
            case 1:
                formPayload.append('file', formData.file)

                axios.post('http://127.0.0.1:8000/model', formPayload, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                })
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err))

                break;
            case 2:
                console.log('teste 2')
                break;
            default:
                break;
        }
    }

    return (
        <button 
            type="button"
            onClick={handleSubmit}
            className="bg-[#4A3AFF] hover:bg-[#4233e7] px-2 py-2 w-38 rounded-full text-xl mt-2 text-white font-bold cursor-pointer"
            >
        Next
        </button>
    )
}

export default Button