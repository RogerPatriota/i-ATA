import { createContext, useContext, useState } from "react";

const FormContext = createContext()

export const FormProvider = ({ children }) => {
    const [formData, setFormData ] = useState('')
}