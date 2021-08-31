export const signinUser = (userData) =>{
    return (dispatch) => {
        dispatch({
            type: "signinUser",
            payload: userData
        })
    }
}

export const signoutUser = ()=>{
    return (dispatch) => {
        dispatch({
            type: "signoutUser",
            payload: ""
        })
    }
}