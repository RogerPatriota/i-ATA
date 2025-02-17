import { useState } from "react"
import { FileDown } from "lucide-react"


export function FileDrop () {
    const [filename, setFilename] = useState()

    return (
        <div className="w-180 mt-7 flex flex-col items-center gap-4  font-liter">
            <h3 className="text-2xl text-[#494853] ">Meeting record</h3>
            <p className="text-[#6F6C90] text-sm text-center">Please fill the field below with the meeting record, the notes will be automatic extract</p>

            <form action="" method="post" 
            encType="multipart/form-data" className="flex items-center justify-center">

                <div className="relative overflow-hidden h-90 pl-5 border-dashed border-3 bg-gray-50 hover:bg-gray-100 border-[#4A3AFF] 
                    flex flex-col justify-center items-center gap-3 rounded-xl cursor-pointer">
                    {filename && (
                        <div className="absolute top-24 w-120 py-3 flex items-center gap-3 text-lg border-1 border-[#EFF0F6] rounded-md shadow-2xl">
                            <FileDown size={50} className="ml-4 pr-3 border-r-1 border-gray-500"/>
                            <p className="truncate max-w-[75%] ">{filename}</p>
                        </div>
                    )}   
                    <label 
                        htmlFor="meeting-file" 
                        className={`w-180 h-90 flex justify-center items-center gap-3 cursor-pointer
                        ${filename ? 'pt-20' : ''}`}>
                            <span className="font-semibold text-lg font-sans">Drop the file</span>
                            or
                            <span className="bg-[#4A3AFF] py-2 px-8 w-32 rounded-full text-base text-white font-bold text-center">Upload</span>
                            <input type="file" name="file" id="meeting-file" placeholder="Upload"
                            onChange={(envent) => {setFilename(envent.target.files[0].name)}}
                            className="hidden"
                            required/>
                    </label>

                </div>

            </form>
        </div>
    )
}

export default FileDrop