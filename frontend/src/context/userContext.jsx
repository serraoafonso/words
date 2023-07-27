import {createContext, useState} from 'react'

export const userContext = createContext()

export const userContextProvider = ({children})=>{
    const [user, setUser] = useState('german')

    const verifyUser = (l)=>{
         
    }
    return (
        <userContext.Provider value={{user, verifyUser}}>{children}</userContext.Provider>
    )
}

