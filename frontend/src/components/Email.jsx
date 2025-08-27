import Input from "./Input"
import { Inbox, Mail } from "lucide-react"

function Email({ notes }) {
    return (
        <div className="flex flex-row mt-3 w-full border-t-1 gap-8 border-zinc-200 pt-7 px-6">
            <div className="flex flex-col gap-7">
                <div className="">
                    <label className='input validator w-90'>
                        <Mail strokeWidth={1}/>
                        <input type="email" name="" id="" placeholder='Destinataries...' className='grow'/>
                    </label>
                    <div className='validator-hint hidden'>Enter a valid e-mail</div>            
                </div>
                <div className="">
                    <label className='input validator w-90'>
                        <Inbox strokeWidth={1}/>
                        <input type="text" name="" id="" placeholder='Subject...' className='grow'/>
                    </label>
                    <div className='validator-hint hidden'>Enter a valid e-mail</div>            
                </div>
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="w-full h-92 border-1 border-gray-300 overflow-auto rounded p-2">
                <p className="break-words w-full text-base"> {notes} </p>
            </div>
        </div>
    )

}

export default Email