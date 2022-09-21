import { createContext,useContext,useState } from "react";
import { Api } from "../../services/Api";


export const LoginContext = createContext();

export const LoginProvider = ({children})=>{
    const [user,setUser]= useState({})
    const [token,setToken]=useState("");

    const getUser = async(users,setAuthenticated)=>{
        await Api.post("/login",users)
        .then((response)=>{
            const { acessToken}= response.data;
            localStorage.setItem("@GetSight:token",acessToken);
            localStorage.setItem("@GetSight:userId",response.data.user.id)
            setAuthenticated(true)
            setUser(response.data.user)
            setToken(acessToken);

        })
        .catch((err)=>{
            console.log(err)
        })
    }
    const getUserLogged = (id,token)=>{
        Api.get(`/users/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`,
            },
        }).then((response)=>{
            setUser(response.data)
        })
    }
    return(
        <LoginContext.Provider value ={{user,getUser,getUserLogged,token}}>
            {children}
        </LoginContext.Provider>
    )

}
export const useLogin = () =>useContext(LoginContext)