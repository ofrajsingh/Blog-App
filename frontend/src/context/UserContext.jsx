import { createContext, useState, useEffect } from "react";
import { URL } from './../url';
import axios from 'axios';

export const UserContext= createContext({});

export function UserContextProvider ({children}){
    const [user,setUser]= useState(null);

    useEffect(()=>{
        getUser();
    },[]);

    const getUser= async ()=>{
        const token = localStorage.getItem("token");
        try{
            const res= await axios.get(URL+'/api/auth/refetch',{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            // console.log(res.data);
            setUser(res.data);
        }
        catch(err){
            console.log(err);
        }
    }

    return (<UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>)
}