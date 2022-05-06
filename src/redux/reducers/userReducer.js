const INITIAL_STATE={
    loading:false,
    error:null,
    id:null,
    username:"",
    email:"",
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
            return { ...state, ...action.payload };
        case "LOGOUT":
            return INITIAL_STATE;
        default:
            return state;
        }
}