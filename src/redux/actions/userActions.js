import axios from "axios";
import { API_URL } from "../../Supports/Functions/helper";

export const loginAction = (usernameOrEmail, password) => {
    return (dispatch) => {
            axios.post(API_URL + '/user/login', {usernameOrEmail, password})
            .then((res) => {
                localStorage.setItem("myTkn", res.data.myTkn);

                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data
                })
            }).catch((err) => {
                console.log(err)
            })
    }
}

export const keepLoginAction = () => {
    return async(dispatch) => {
        try{
            let myTkn = localStorage.getItem("myTkn")
            if (myTkn) {
                let res = await axios.post(API_URL + '/user/login')
                localStorage.setItem("myTkn", res.data.myTkn);

                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data
                })
            }
        }catch (error) {
            console.log(error)
        }
    }
}
export const logoutAction = () => {
    localStorage.removeItem("myTkn");
    return {
        type: "LOGOUT"
    }
}