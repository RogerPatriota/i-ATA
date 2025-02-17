export function Model() {
    return (
        <div className="w-250 flex flex-col justify-center items-center mt-6 gap-2">
            <h3 className="text-2xl text-[#494853]">Select the model</h3>
            <p className="text-[#6F6C90] text-sm text-center">Each meeting has a diferente propouse, as well the public, <br></br>select the way you want to express what happend</p>

            <div className="w-250 mt-7 flex flex-row justify-evenly">
                <div className="w-80 flex flex-col gap-5 items-start">
                    <button className="w-full px-7 py-3 rounded-2xl border-1 border-gray-300 text-left text-[#6F6C90] text-base hover:border-gray-500">Simple</button>
                    <button className="w-full px-7 py-3 rounded-2xl border-1 border-gray-300 text-left text-[#6F6C90] text-base hover:border-gray-500">Medium</button>
                    <button className="w-full px-7 py-3 rounded-2xl border-1 border-gray-300 text-left text-[#6F6C90] text-base hover:border-gray-500">Complex</button>
                </div>
                <div className="w-150 h-100 border-1 border-gray-300"></div>
            </div>
            
        </div>
    )
}

export default Model