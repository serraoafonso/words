import {createContext, useContext, useState} from 'react'
import { UserContext } from './userContext'

export const LanguageContext = createContext()

export const LanguageContextProvider = ({children})=>{
    const {user, verifyUser} = useContext(UserContext)
    const [language, setLanguage] = useState(user.learningLanguage)

    const [mainLanguage, setMainLanguage] = useState(user.mainLanguage)

    const modify = async(l)=>{
    setMainLanguage(l)
    try{
      const res = await fetch (`http://localhost:4000/api/user/change/${id}`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({mainLanguage: l})
      })    
      console.log(res)    
      verifyUser({...user, mainLanguage: l})
    }catch(err){
      console.log(err)
    } 
    } 

    const change = async(l, id)=>{
      setLanguage(l)   
      console.log(l, id)
      try{
        const res = await fetch (`http://localhost:4000/api/user/change/${id}`, {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({learningLanguage: l})
        })    
        console.log(res)    
        verifyUser({...user, learningLanguage: l})
      }catch(err){
        console.log(err)
      } 
    }
    return (
        <LanguageContext.Provider value={{language, change, mainLanguage, modify}}>{children}</LanguageContext.Provider>
    )
}

