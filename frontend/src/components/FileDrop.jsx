function FileDrop () {
    return (
        <div className="w-2xl mt-10 flex flex-col items-center gap-2">
            <h3>Meeting record</h3>
            <p>Please fill the field below with the meeting record, the notes will be automatic extract</p>
            <form action="" method="post" 
            encType="multipart/form-data" 
            className="w-210 h-100 border-2 border-[#4A3AFF] flex justify-center items-center flex-row rounded-xl">
                <label htmlFor="" className="cursor-pointer">
                    <span>Drop de meeting record here</span>
                    or
                    <input type="file" name="file" id="meeting-file" required/>
                </label>
            </form>
        </div>
    )
}

export default FileDrop