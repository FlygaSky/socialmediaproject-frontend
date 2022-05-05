import React from "react";
import {Routes, Route} from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Home from "./Pages/Home"
import Profile from "./Pages/Profile"
import LikedPosts from "./Pages/LikedPosts";
import PostDetail from "./Pages/PostDetail"
import Settings from "./Pages/Settings";
import Unconfirmed from "./Pages/Unconfirmed"
import { keepLoginAction } from "./redux/actions/userActions";
import { useDispatch } from "react-redux";

// CSS
import 'bootstrap/dist/css/bootstrap.css';
import './Supports/Stylesheets/Utils.css'
import Confirmation from "./Pages/Confirmation";
import PageNotFound from "./Pages/PageNotFound";


function App() {
  const dispatch = useDispatch();

  const keepLogin = () => {
    dispatch(keepLoginAction());
  }
  
  React.useEffect(() => {
    keepLogin()
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