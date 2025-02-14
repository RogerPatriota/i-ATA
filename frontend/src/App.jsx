import { Header } from "./components/Header"
import { ProgressContent } from "./components/ProgressContent"
import { FileDrop } from "./components/FileDrop"
import { useState } from "react"
import { Button } from "./components/Button"


export function App() {
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
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center p-6 w-6xl m-auto">
        <h1 className=" text-4xl text-[#170F49] m-5 mt-0 font-semibold">Generete your meetings notes</h1>
        <p className="text-base text-center text-[#6F6C90]">Please fill the field below with the meeting record, the notes <br/>will be automatic extract</p>
        <ProgressContent steps={steps} currentStep={currentStep} onChangeTab={changeTab}/>

        <Button onChangeTab={changeTab}/>
      </div>
    </div>
    )

}

export default App
