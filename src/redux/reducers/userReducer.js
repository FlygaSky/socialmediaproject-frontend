const INITIAL_STATE={
    loading: false,
    id:null,
    username:"",
    email:"",
    isVerified:0
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOADING":
            return {...state, loading: true}
        case "DONE":
            return {...state, loading: false}          
        case "LOGIN_SUCCESS":
            return { ...state, ...action.payload };
        case "LOGOUT":
            return INITIAL_STATE;
        default:
            return state;
        }
}