const INITIAL_STATE={
    id:null,
    username:"",
    email:"",
    role:"",
    status:"",
    cart:[]
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("STATE REDUCER ->", state);
            console.log("DATA DARI ACTION ->", action.payload);
            return { ...state, ...action.payload };
        case "UPDATE_CART":
            return { ...state, cart: action.payload };
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state;
        }
}