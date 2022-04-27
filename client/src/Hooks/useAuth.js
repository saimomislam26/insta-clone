import  { useContext, useState } from "react";
import { ProjectContext } from "../Context/GlobalContext";
export default function useAuth (){
    const [hasLoading] = useState(useContext(ProjectContext))
    // const {isLoggedIn} = useContext(ProjectContext)
    // setHasLoadi
    console.log(hasLoading);

    return hasLoading
}
