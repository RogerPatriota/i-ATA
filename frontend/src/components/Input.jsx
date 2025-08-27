import { Mail } from 'lucide-react'

function Input({ placeholder}) {
    return (
        <div>
            <label className='input validator'>
                <Mail />
                <input type="email" name="" id="" placeholder={placeholder} className='grow'/>
            </label>
            <div className='validator-hint hidden'>Enter a valid e-mail</div>            
        </div>
    )
}

export default Input