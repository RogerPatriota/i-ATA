import { Header } from "./components/Header"
import { ProgressContent } from "./components/ProgressContent"


function App() {

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center p-6 w-6xl m-auto">
        <h1 className=" text-4xl text-[#170F49] m-7 font-semibold">Generete your meetings notes</h1>
        <p className="text-base text-center text-[#6F6C90]">Please fill the field below with the meeting record, the notes <br/>will be automatic extract</p>
        <ProgressContent />
      </div>
    </div>
  )

}

export default App
