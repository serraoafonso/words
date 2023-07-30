import {createContext, useEffect, useState} from 'react'

export const UserContext = createContext()

export const UserContextProvider = ({children})=>{
  /*console.log(storedUser)
  console.log(storedUser == undefined || storedUser == null)*/
  const storedUser = localStorage.getItem('user');
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

    const verifyUser = (l)=>{
         setUser(l)
    }
    useEffect(() => {
      localStorage.setItem('user', JSON.stringify(user));
    }, [user]);
    


    return (
        <UserContext.Provider value={{user, verifyUser}}>{children}</UserContext.Provider>
    )
}

