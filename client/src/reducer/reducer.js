import Cookies from 'js-cookie'
export const reducer =(state,action) => {
    switch(action.type){
        case 'CHECK_LOGIN':
            state.isLoggedIn = true
            state.authenticateUser.name = action.payload.name
            state.authenticateUser.email = action.payload.email
            // state.isLoading  = true
            // console.log("Checking bug :",state.isLoggedIn);
            return{...state}
        case 'SETLOAD':
            state.isLoading = false
            return {...state}
        case 'LOGOUT':
            Cookies.remove('jwtooken')
            localStorage.removeItem('userData')
            state.isLoggedIn = false
            state.authenticateUser.name = ''
            state.authenticateUser.email = ''
            return {...state}
        // case 'SET_URL':
        //     state.setPicUrl = action.payload
        //     console.log("Context URl",state.setPicUrl);
        //     return {...state}
        default:
            return {...state}
    }
}