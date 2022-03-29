import axios from "axios";
import { API_URL } from "../../Supports/Functions/helper";

export const loginAction = (email, password) => {
    return (dispatch) => {
        axios.get(API_URL + `/users?email=${email}&password=${password}`)
            .then((res) => {
                // menyimpan data ke localstorage browser
                console.log(res.data)
                localStorage.setItem("tokenId", res.data[0].id);

                // Menyimpan data kereducer
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data[0]
                })
            }).catch((err) => {
                console.log(err)
            })
    }
}

export const keepLoginAction = () => {
    return async(dispatch) => {
        try{
            let tokenId = localStorage.getItem("tokenId")
            if (tokenId) {
                let res = await axios.get(API_URL + `/users?id=${tokenId}`)
                localStorage.setItem("tokenId", res.data[0].id);

                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data[0]
                })
            }
        }catch (error) {
            console.log(error)
        }
    }
}
export const logoutAction = () => {
    localStorage.removeItem("tokenId");
    return {
        type: "LOGOUT"
    }
}

export const updateCart = (dataCart) => {
    return {
        type: "UPDATE_CART",
        payload: dataCart
    }
}