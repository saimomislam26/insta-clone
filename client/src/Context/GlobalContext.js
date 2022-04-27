import React, { useReducer, createContext,useEffect } from 'react'
import App from '../App'
import Cookies from 'js-cookie'
import {reducer} from '../reducer/reducer'
export const ProjectContext = createContext()

let initialState = {
    authenticateUser:{
        name:'',
        email:""
    },
    isLoggedIn:false,
    isLoading : false
}

const jwt = Cookies.get("jwtooken")

const GlobalContext = () => {
    // const navigate = useNavigate()
    const [state, dispatch] = useReducer(reducer, initialState);
    // const [cookies, setCookie] = useCookies();
    const getUserData = async()=>{
        const res = await fetch(`${process.env.REACT_APP_URL}/protecteddata`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+ jwt
            }
        })
        const temp = await res.json()
        // console.log(temp);
        if (res.status === 200 && temp) {
            return dispatch({
                type:'CHECK_LOGIN',
                payload:temp
            })
        }
    }
    useEffect(() => {
        if(Cookies.get("jwtooken")){
            getUserData()
        }
        else{
            console.log("No Token");
        }
    }, [])

    const User = (data) =>{
        return dispatch({
            type:"USER",
            payload:data
        })
    }

    const setLoading =()=>{
        return dispatch({
            type:"SETLOAD"
        
        })
    }

    const logoutUser =()=>{
        return dispatch({
            type:"LOGOUT"

        })
    }

  return (
    <ProjectContext.Provider value={{...state, User, getUserData, logoutUser, setLoading}}>
        <App />
    </ProjectContext.Provider>
  )
}

export default GlobalContext