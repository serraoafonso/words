import {createContext, useState} from 'react'

export const LanguageContext = createContext()

export const LanguageContextProvider = ({children})=>{
    const [language, setLanguage] = useState('german')

    const change = (l)=>{
      setLanguage(l)    
    }
    return (
        <LanguageContext.Provider value={{language, change}}>{children}</LanguageContext.Provider>
    )
}

