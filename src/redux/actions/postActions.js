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