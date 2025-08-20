import { useState } from "react"
import Header from "./components/Header"
import ProgressContent  from "./components/ProgressContent"
import FileDrop  from "./components/FileDrop"
import Button from "./components/Button"
import Model from "./components/Model"
import MeetingNote from "./components/MeetingNote"
import { FormProvider } from "./context/FormContext"


export function App() {
  const [currentStep, setCurrentStep ] = useState(1)
  const steps  = [
    {
        number: 1,
        label: 'File',
        component: <FileDrop />
    },
    {
        number: 2,
        label: 'Model',
        component: <Model />
    },
    {
        number: 3,
        label: 'Ata',
        component: <MeetingNote />
    }
  ]

  function changeTab() {
    if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1 )  
    } else {

    }
  }

  return (
    <div className="">
      <Header />
      <div className="flex flex-col items-center justify-center p-5 w-6xl m-auto">
        <h1 className=" text-4xl text-[#170F49] m-5 mt-3 font-semibold">Generete your meetings notes</h1>
        {/* <p className="text-base text-center text-[#6F6C90]">Please fill the field below with the meeting record, the notes <br/>will be automatic extract</p> */}
        <FormProvider >
          <ProgressContent steps={steps} currentStep={currentStep} onChangeTab={changeTab}/>
          <Button onChangeTab={changeTab} currentTab={currentStep}/>         
        </FormProvider>

      </div>
    </div>
    )

}

export default App
