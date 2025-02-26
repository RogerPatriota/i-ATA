import { createContext, useContext, useState } from "react";

const FormContext = createContext()

export const FormProvider = ({ children }) => {
    const [formData, setFormData ] = useState({
        file: null,
        fileUploaded: false,
        model: ""
    })

    const updateForm = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    return (
        <FormContext.Provider value={{formData, updateForm}}>
            { children }
        </FormContext.Provider>
    )
}

export const useForm = () => useContext(FormContext)