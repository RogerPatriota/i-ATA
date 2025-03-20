import { createContext, useContext, useState } from "react";

const FormContext = createContext()

export const FormProvider = ({ children }) => {
    const [formData, setFormData ] = useState({
        file: null,
        fileId: false,
        model: ""
    })

    const updateFormData = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    return (
        <FormContext.Provider value={{ formData, updateFormData }}>
            { children }
        </FormContext.Provider>
    )
}

export const useForm = () => useContext(FormContext)