import FileDrop from "./FileDrop"
import ProgressBar from "./ProgressBar"
import { useState } from "react"

export function ProgressContent(props) {

    return (
        <div className="m-4 border-1 border-[#EFF0F6] shadow-2xl rounded-2xl w-[100%] h-170 flex flex-col items-center">
            <ProgressBar steps={props.steps} currentStep={props.currentStep}/>
            { props.steps[props.currentStep - 1].component}
            
        </div>
    )
}

export default ProgressContent