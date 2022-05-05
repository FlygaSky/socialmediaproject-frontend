const INITIAL_STATE={
    id:null,
    username:"",
    email:"",
    isVerified:"false"
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return { ...state, ...action.payload };
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state;
        }
}