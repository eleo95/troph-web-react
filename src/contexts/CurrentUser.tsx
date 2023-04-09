import { createContext, FC } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import UserData from "../types/UserData";


interface IUSerContext {
    user: Partial<UserData>;
    setUser:  (value: Partial<UserData> | ((val: Partial<UserData>) => Partial<UserData>)) => void
}

export const UserContext = createContext<IUSerContext>({user:{}, setUser:()=>{}})

interface Props{
    children: React.ReactNode
  }

export const UserContextProvider = ({children}:Props) => {
    const [currentUser, setCurrentUser] = useLocalStorage<Partial<UserData>>("currentUser", {})

    return <UserContext.Provider value={{user:currentUser, setUser:setCurrentUser}}>
        {children}
    </UserContext.Provider>
}
