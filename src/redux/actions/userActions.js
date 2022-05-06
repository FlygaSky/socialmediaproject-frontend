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

export const keepLoginAction = () => {
    return (dispatch) => {
        let myTkn = localStorage.getItem("myTkn")
        if (myTkn) {
            axios.post(API_URL + '/user/keeplogin', {}, {headers: {
                'Authorization': myTkn,
                // 'Accept' : 'application/json',
                // 'Content-Type': 'application/json'
            }})
            .then((res) => {
                console.log(res.data)
                localStorage.setItem("myTkn", res.data.myTkn);
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}

export const logoutAction = () => {
    localStorage.removeItem("myTkn");
    return {
        type: "LOGOUT"
    }
}