import FileDrop from "./FileDrop"
import ProgressBar from "./ProgressBar"
import { useState } from "react"

export function ProgressContent() {
    const [currentStep, setCurrentStep ] = useState(1)
    const steps  = [
        {
            number: 1,
            label: <FileDrop />
        },
        {
            number: 2,
            label: 'model'
        },
        {
            number: 3,
            label: 'transcript'
        },
        {
            number: 4,
            label: 'ata'
        }
    ]

    function changeTab() {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1 )  
        } else {

        }
    }

    return (
        <div className="m-4 border-1 border-[#EFF0F6] shadow-2xl rounded-2xl w-[100%] h-160 flex flex-col">
            <ProgressBar steps={steps} currentStep={currentStep}/>
            { steps[currentStep - 1].label}
            
            <button onClick={changeTab} className="w-28 h-12 bg-[#4A3AFF]">Next</button>
        </div>
    )
}

export default ProgressContent