'use client'
import { apiClient } from "@/config/axios";
import { notify } from "@/config/toast";
import { Usuario , createLogin} from "@/services/usuarioService";
import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import decode from 'jwt-decode'

type LoginData = {
    email: string
    senha: string 
}


interface TokenClaims{
    iss:number | string
    name: string
    email:string
    permissions: string[]
    exp: number
}

interface AuthContextProps{
    isLogged: boolean;
    login: (loginData: LoginData) => Promise<boolean>
    logout: () => void;
    userData: Usuario
    hasPermission: (permission: string) => boolean
}


const AuthContext = createContext<AuthContextProps>({} as AuthContextProps) 

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: FC<{children: ReactNode}> = ({children}) => {
const [isLogged,setIsLogged] = useState(
    JSON.parse(window.localStorage.getItem('isLogged') ||'false'),
)

const [userData,setUserData] = useState<Usuario>(
    JSON.parse(window.localStorage.getItem('userData') || ' {} '),

)

useEffect(() => {
    window.localStorage.setItem('userData' , JSON.stringify(userData))
}, [userData])

useEffect(() =>{
    window.localStorage.setItem('isLogged' , JSON.stringify(isLogged))
}, [isLogged])

const login = async (loginData: LoginData) => {
    try{
       const {data} = await createLogin<LoginData>(loginData);
       if(data.token !== null){
        apiClient.defaults.headers.common.Authorization = `Bearer ${data.token}`;
        window.localStorage.setItem('access_token',data.token)

        const TokenClaims = decode<TokenClaims>(data.token);

        setUserData({
         id: TokenClaims.iss as string,
         nome: TokenClaims.name,
         email: TokenClaims.email,
         permissions: TokenClaims.permissions,
        })

        setIsLogged(true);
        notify(data.message, 'success')
        return true;
       }

    } catch (e: any) {
        setIsLogged(true)
        setUserData({} as Usuario)
        if(e.response){
            notify(e.response.data.message, 'error')
            return false
        }
        notify('Ocorreu um erro inesperado', 'error')
        return false
    }
    return false
}


const hasPermission = (permission: string) => {
    if(!userData.permissions){
        return false
    }
    return userData.permissions.includes(permission)
}

const logout = () =>{
    setIsLogged(false)
    setUserData({} as Usuario)
    window.localStorage.removeItem('access_token')
}


    return (
       < AuthContext.Provider value={{hasPermission, isLogged, login, logout, userData}}>
        {children}
        </AuthContext.Provider>
    )
}

