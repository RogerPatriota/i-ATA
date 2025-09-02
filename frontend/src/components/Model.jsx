import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "../context/FormContext"
import { Circle } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL

export function Model() {
    const [ models, setModels ] = useState([])
    const [ displayModel, setDisplayModel ] = useState([])
    const [ divs, setDivs ] = useState([])
    const { formData, updateFormData } = useForm()

    useEffect(() => {
        axios.get(`${API_URL}/models`, {
            headers: {
                Accept: "application/json"
            }
        })
        .then((res) => res.data)
        .then((res) => setModels(res))
    }, [])

    function handleClick(event) {
        
        const modelSelected = models.find(model => model.model == event.target.value)
        setDisplayModel(modelSelected.example)

        if (modelSelected.summary != formData) {
            updateFormData('model', modelSelected.example) 
        }

        const x = Math.floor(Math.random() * 3) + 1
        setDivs(genereateDiv(x))
    
    }

    const RandonPlaceholder = () => {
        return (
            <div className="flex flex-row gap-2 mb-3 animate-pulse">
                <Circle size={14} strokeWidth={4} color="#b5b5b8"/>
                <div className="w-[75%] bg-[#b5b5b8] rounded-xl"></div>
            </div>
        )
    }

    const genereateDiv = (x) => {
        const divs = []
        for (let i = 1; i <= x; i++) {
            divs.push(<RandonPlaceholder key={i} />)
        }
        return divs
    }

    return (
        <div className="w-250 flex flex-col justify-center items-center my-6 gap-3">
            <h3 className="text-2xl text-[#494853]">Select the model</h3>
            <p className="text-[#6F6C90] text-sm text-center">Each meeting has a diferente propouse, as well the public, <br/>select the way you want to express what happend</p>

            <div className="w-250 mt-5 flex flex-row justify-evenly">
                <div className="w-80 flex flex-col mt-8 gap-5 items-start">
                    <button value="simple" onClick={handleClick} className="w-full px-7 py-3 rounded-2xl border-1 border-gray-300 text-left text-[#6F6C90] text-base hover:border-gray-400 focus:outline-2 focus:outline-gray-400">Simple</button>
                    <button value="medium" onClick={handleClick} className="w-full px-7 py-3 rounded-2xl border-1 border-gray-300 text-left text-[#6F6C90] text-base hover:border-gray-400 focus:outline-2 focus:outline-gray-400">Medium</button>
                    <button value="complex" onClick={handleClick} className="w-full px-7 py-3 rounded-2xl border-1 border-gray-300 text-left text-[#6F6C90] text-base hover:border-gray-400 focus:outline-2 focus:outline-gray-400">Complex</button>
                </div>
                <div className="w-150 max-h-full overflow-auto h-100 border-1 border-gray-300 p-4">
                    {Object.entries(displayModel).map(([key, value]) => (
                        <div key={key}>
                            <h2 className="font-semibold text-lg text-gray-600">{ key }</h2>
                            <p className="mb-2 text-sm font-light">({ value })</p>
                            { divs }
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Model