import { useCallback, useState } from "react";

export function useModelState(defaulVal = false){
    const [isopen,setIsOpen] = useState(defaulVal?true:false);
    const open = useCallback(()=>setIsOpen(true),[]);
    const close = useCallback(()=>setIsOpen(false),[]);
    return {isopen,open,close};
}