import axios from "axios";
import { API_URL } from "../../Supports/Functions/helper";

export const loginAction = (usernameOrEmail, password) => {
    return (dispatch) => {
            dispatch({ type: "LOADING"})
            axios.post(API_URL + '/user/login', {usernameOrEmail, password})
            .then((res) => {
                localStorage.setItem("myTkn", res.data.myTkn);
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data
                })
                dispatch({
                    type: "DONE", 
                    payload: null
                })
            }).catch((err) => {
                dispatch({
                    type: "DONE",
                    payload: err.response.data.message
                })
            })
    }
}

export const keepLoginAction = (val) => {
    return (dispatch) => {
        // console.log('masuk dispatch, ini payload', val)
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: val
            })
        }
    }

export const logoutAction = () => {
    localStorage.removeItem("myTkn")
    return {
        type: "LOGOUT"
    }
}

export const changeProfilePic = (val) => {
    return (dispatch) => {
        if(val !== null){dispatch({
            type: "UPDATE_PIC",
            payload: val
        })}
    }
}