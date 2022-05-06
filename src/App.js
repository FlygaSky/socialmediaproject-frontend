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
import { keepLoginAction } from "./redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../src/Supports/Functions/helper";

// CSS
import 'bootstrap/dist/css/bootstrap.css';
import './Supports/Stylesheets/Utils.css'


function App() {
  const dispatch = useDispatch();
  const {username, isVerified} = useSelector(state => state.userReducer)

  const keepLogin = async () => {
      try {
          let myTkn = localStorage.getItem("myTkn")
          if (myTkn) {
              let result = await axios.get(API_URL + '/user/keeplogin', {headers: {
                  'authorization': myTkn,
                  // 'Accept' : 'application/json',
                  // 'Content-Type': 'application/json'
              }})
              console.log(result)
              dispatch({
                      type: "LOGIN_SUCCESS",
                      payload: result.data
                  })
              }
      } catch(err) {
        console.log(err)
    }
  }
  
  React.useEffect(() => {
    keepLogin()
    console.log('after keeplogin -> ' + username + isVerified)
  }, [])

  return (
    <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/confirmation/:token" element={<Confirmation />} />
          <Route path="/unconfirmed" element={<Unconfirmed />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/detail" element={<PostDetail />} />
          <Route path="/liked-posts" element={<LikedPosts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </div>
  );
}

export default App;