export function Button(props) {
    return (
        <button 
            type=""
            onClick={props.onChangeTab}
            className="bg-[#4A3AFF] hover:bg-[#4233e7] px-2 py-2 w-38 rounded-full text-xl mt-2 text-white font-bold cursor-pointer"
            >
        Next
        </button>
    )
}

export default Button