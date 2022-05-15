import React from "react";
import {Routes, Route} from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Home from "./Pages/Home"
import Profile from "./Pages/Profile"
import LikedPosts from "./Pages/LikedPosts";
import PostDetail from "./Pages/PostDetail"
import Settings from "./Pages/Settings";
import Unconfirmed from "./Pages/Unconfirmed"
import Confirmation from "./Pages/Confirmation";
import PageNotFound from "./Pages/PageNotFound";
import UploadModal from "./Components/UploadModal"
import { keepLoginAction } from "./redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../src/Supports/Functions/helper";

// CSS
import 'bootstrap/dist/css/bootstrap.css';
import './Supports/Stylesheets/Utils.css'
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";


function App() {
  // const dispatch = useDispatch();
  // const {username, isVerified} = useSelector(state => {
  //   console.log('isi dari global state:', state.userReducer);
  //   return state.userReducer})

  // const keepLogin = async () => {
  //     try {
  //       console.log('keepLogin jalan')
  //         let myTkn = localStorage.getItem("myTkn")
  //         if (myTkn) {
  //             let result = await axios.get(API_URL + '/user/keeplogin', {headers: {
  //                 'authorization': myTkn,
  //                 // 'Accept' : 'application/json',
  //                 // 'Content-Type': 'application/json'
  //             }})
  //             console.log(result.data)
  //             dispatch({type : "LOGIN_SUCCESS", payload: result.data})
  //             console.log('dispatch jalan', dispatch)
  //             console.log(`dari data = username: ${result.data.username}, isVerified:${result.data.isVerified}`)
  //             console.log(`username: ${username}, isVerified:${isVerified}`)
  //             }
  //     } catch(err) {
  //       console.log(err)
  //   }
  // }
  
  // React.useEffect(() => {
  //   keepLogin()
  //   console.log('after keeplogin -> ' + username + isVerified)
  // }, [])
  
  const { openModal } = useSelector(state => state.userReducer)

  return (
    <div>
      {
        openModal && <UploadModal />
      }
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/confirmation/:token" element={<Confirmation />} />
          <Route path="/unconfirmed" element={<Unconfirmed />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/post/:uniqueid" element={<PostDetail />} />
          <Route path="/liked-posts" element={<LikedPosts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/resetpassword/:token" element={<ForgotPasswordPage />} />
          <Route path="/page-not-found" element={<PageNotFound />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </div>
  );
}

export default App;