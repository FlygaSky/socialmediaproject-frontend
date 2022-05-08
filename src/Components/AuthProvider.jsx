import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../Supports/Functions/helper";
import { keepLoginAction } from "../redux/actions/userActions";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const {username, email, isVerified} = useSelector(state => state.userReducer)
  const keeplogin = async () => {
    try {
      let token = localStorage.getItem('myTkn')
      if (token) {
        let result = await axios.get(`${API_URL}/user/keeplogin`, {
          headers: {
            authorization: token,
          },
        });
        const val = result.data
        console.log('ini result dari get keeplogin', val)
        if(val) dispatch(keepLoginAction(val))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(async () => {
    await keeplogin()
    console.log('returned after keepLogin', username, email, isVerified)
  }, [])

  return children
};

export default AuthProvider