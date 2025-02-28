import { useEffect, useState } from "react"
import { useForm } from "../context/FormContext"

export function Model() {
    const [ models, setModels ] = useState([])
    const [ displayModel, setDisplayModel ] = useState([])

    useEffect(() => {
        fetch('./models.json', { // por ser na public, o ./ ja encaminha para a root
            headers: {
                Accept: "application/json"
            }
        })
        .then((res) => res.json())
        .then((res) => setModels(res))
    }, [])

    function handleClick(event) {
        const modelSelected = models.find(model => model.model == event.target.value)
        setDisplayModel(modelSelected.example)
    }

    return (
        <div className="w-250 flex flex-col justify-center items-center mt-6 gap-2">
            <h3 className="text-2xl text-[#494853]">Select the model</h3>
            <p className="text-[#6F6C90] text-sm text-center">Each meeting has a diferente propouse, as well the public, <br/>select the way you want to express what happend</p>

            <div className="w-250 mt-7 flex flex-row justify-evenly">
                <div className="w-80 flex flex-col mt-8 gap-5 items-start">
                    <button value="simple" onClick={handleClick} className="w-full px-7 py-3 rounded-2xl border-1 border-gray-300 text-left text-[#6F6C90] text-base hover:border-gray-500">Simple</button>
                    <button value="medium" onClick={handleClick} className="w-full px-7 py-3 rounded-2xl border-1 border-gray-300 text-left text-[#6F6C90] text-base hover:border-gray-500">Medium</button>
                    <button value="complex" onClick={handleClick} className="w-full px-7 py-3 rounded-2xl border-1 border-gray-300 text-left text-[#6F6C90] text-base hover:border-gray-500">Complex</button>
                </div>
                <div className="w-150 h-100 border-1 border-gray-300">
                    {Object.entries(displayModel).map(([key, value]) => (
                        <div key={displayModel.model}>
                            <h3>{ key }</h3>
                            <p>{ value }</p>
                        </div>
                    ))

                    }
                </div>
            </div>
        </div>
    )
}

export default Model