const userReducer = (state="",action)=>{
    switch (action.type) {
        case "signinUser":
            return action.payload;
        case "signoutUser":
            return "";
        default:
            return state;
    }
}

export default userReducer;