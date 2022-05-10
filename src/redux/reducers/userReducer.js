const INITIAL_STATE={
    loading:false,
    error:null,
    openModal:false,
    id:null,
    username:"",
    email:"",
    profilePic:"",
    isVerified:0
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOADING":
            return {...state, loading:true, error:null}
        case "DONE":
            return {...state, loading:false, error:action.payload}
        case "CLEAR_ERROR":
            return {...state, error:null}
        case "LOGIN_SUCCESS":
            return { ...state, ...action.payload }
        case "LOGOUT":
            return INITIAL_STATE;
        case "UPDATE_PIC":
            return {...state, profilePic:action.payload}
        case "OPEN_MODAL":
            return {...state, openModal:true}
        case "CLOSE_MODAL":
            return {...state, openModal:false}
        default:
            console.log('returned from default', state)
            return state
        }
}