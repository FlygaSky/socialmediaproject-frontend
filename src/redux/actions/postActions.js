import axios from "axios";
import { API_URL } from "../../Supports/Functions/helper";

export const openModal = () => {
    return {
        type: "OPEN_MODAL"
    }
}

export const closeModal = () => {
    return {
        type: "CLOSE_MODAL"
    }
}

export const openSearchBubble = (entry) => {
    return (dispatch) => {
        const token = localStorage.getItem('myTkn')
        axios.post(API_URL + '/user/searchuser', {entry}, {
            headers: {
            authorization: token
            }
        })
        .then((res) => {
            dispatch({
                type: "OPEN_SEARCH_BUBBLE",
                payload: res.data.users
            })
        }).catch((err) => {
            console.log('Error di search:', err)
        })
    }
}

export const closeSearchBubble = () => {
    return {
        type: "CLOSE_SEARCH_BUBBLE",
    }
}