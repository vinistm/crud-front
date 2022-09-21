import { createContext,useContext,useState,UseState } from "react";
import { Api } from "../../services/Api";


export const RegisterContext = createContext();
export const RegisterProvider = ({children})=>{
    const [registerUser,setRegister] = useState([]);
    const postUser = (user)=>{
        Api.post("/user",user)
        .then((response)=>{
            setRegister(response.data);
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return(
        <RegisterContext.Provider value={{postUser,registerUser}}>
            {children}
        </RegisterContext.Provider>
    )

}
export const useRegister = () => useContext(RegisterContext);