import FileDrop from "./FileDrop"
import ProgressBar from "./ProgressBar"
import { useState } from "react"

export function ProgressContent() {
    const [currentStep, setCurrentStep ] = useState(3)
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

    return (
        <div className="m-4 border-1 border-[#EFF0F6] shadow-2xl rounded-2xl w-[100%]  h-160">
            <ProgressBar steps={steps} currentStep={currentStep}/>
        </div>
    )
}

export default ProgressContent