

export function FileDrop () {
    return (
        <div className="w-180 mt-7 flex flex-col items-center gap-4  font-liter">
            <h3 className="text-2xl text-[#494853] ">Meeting record</h3>
            <p className="text-[#6F6C90] text-sm text-center">Please fill the field below with the meeting record, the notes will be automatic extract</p>
            <form action="" method="post" 
            encType="multipart/form-data" className="flex items-center justify-center">
                <label 
                    htmlFor="meeting-file" 
                    className="w-180 h-90 pl-10 border-dashed border-3 bg-gray-50 hover:bg-gray-100 border-[#4A3AFF] 
                    flex justify-center items-center gap-3 rounded-xl cursor-pointer">
                        <span className="font-semibold text-base font-sans">Drop the file</span>
                        or
                        <span className="bg-[#4A3AFF] px-9 py-2 w-30 rounded-full text-sm text-white font-bold">Upload</span>
                        <input type="file" name="file" id="meeting-file" placeholder="Upload"
                        className="hidden cursor-pointer w-62 h-10 file:mr-4 file:font-semibold file:text-white  file:border-0 file:px-4 file:py-2 file:bg-[#4A3AFF]  file:rounded-3xl"
                        required/>
                </label>
            </form>
        </div>
    )
}

export default FileDrop