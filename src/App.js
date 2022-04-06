import React from "react";
import {Routes, Route} from "react-router-dom";
import Navpane from "./Components/Navpane";
import LandingPage from "./Pages/LandingPage";
import Home from "./Pages/Home"
import Profile from "./Pages/Profile"
import PostDetail from "./Pages/PostDetail"
import { keepLoginAction } from "./redux/actions/userActions";
import { useDispatch } from "react-redux";

// CSS
import 'bootstrap/dist/css/bootstrap.css';
import './Supports/Stylesheets/Utils.css'


function App() {
  // const dispatch = useDispatch();

  // const keepLogin = () => {
  //   dispatch(keepLoginAction());
  // }
  
  // React.useEffect(() => {
  //   keepLogin()
  // }, [])

  return (
    <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/detail" element={<PostDetail />} />
        </Routes>
    </div>
  );
}

export default App;