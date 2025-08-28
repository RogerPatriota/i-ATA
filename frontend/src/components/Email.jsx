import { useState } from "react"
import { CirclePlus, Inbox, Mail, Plus } from "lucide-react"

const emailInput = (
    <div className="">
        <label className='input validator rounded-2xl w-90'>
            <Mail strokeWidth={1}/>
            <input type="email" name="" id="" placeholder='Destinataries...' className='grow'/>
        </label>
        <div className='validator-hint hidden'>Enter a valid e-mail</div>            
    </div>
)

function Email({ notes }) {
    const [emails, setEmails ] = useState([])

    function hc() {
        if (emails.length >= 2) {
            return
        }
        setEmails([...emails, emailInput])
        console.log('teste')
    }

    return (
        <div className="flex flex-row mt-3 w-full border-t-1 gap-10 border-zinc-200 pt-7 px-6">
            <div className="flex flex-col gap-5">
                <div className="">
                    <label className='input validator w-90 rounded-2xl'>
                        <Inbox strokeWidth={1}/>
                        <input type="text" name="" id="" placeholder='Subject...' className='grow'/>
                    </label>
                    <div className='validator-hint hidden'>Enter a valid e-mail</div>            
                </div>
                <div className="flex flex-row items-center gap-2 mt-3">
                    <div className="">
                        <label className='input validator rounded-2xl w-80'>
                            <Mail strokeWidth={1}/>
                            <input type="email" name="" id="" placeholder='Destinataries...' className='grow'/>
                        </label>
                        <div className='validator-hint hidden'>Enter a valid e-mail</div>            
                    </div>
                    <CirclePlus color="white" size={28} onClick={hc} className="bg-[#4A3AFF] rounded-2xl cursor-pointer"/>
                </div>
                {emails.map((div) => (
                    <div className="w-full">
                        {div}
                    </div>
                ))}
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="w-full h-92 border-1 border-gray-300 overflow-auto rounded p-2">
                {notes}
            </div>
        </div>
    )

}

export default Email