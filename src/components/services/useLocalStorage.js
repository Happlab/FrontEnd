import { useState } from 'react'

export function useLocalStorage(key, InitialValue){
    const [storedValue, setStoredValue] = useState(()=>{
        try{
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item):InitialValue
        }catch(error){
            return InitialValue
        }
    });
    
    const setValue = value =>{
        try{
            setStoredValue(value)
            window.localStorage.setItem(key,JSON.stringify)
        }catch(error){
            console.error(error)
        }
    };
}