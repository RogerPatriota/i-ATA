import { useForm } from "../context/FormContext"

export function Button(props) {
    const { formData } = useForm()
    
    function handleSubmit() {
        props.onChangeTab()

        switch (props.currentTab) {
            case 1:
                console.log('vai chamar a api de transcript')
                break;
            case 2:
                console.log('vai chamar a api de ATA')
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