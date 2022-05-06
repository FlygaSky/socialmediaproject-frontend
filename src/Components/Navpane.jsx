import React from 'react';
import LogoText from '../Supports/Assets/Icons/Upperture Logo.svg'
import LogoNoText from '../Supports/Assets/Icons/camera-icon.png'
import SearchIcon from '../Supports/Assets/Icons/User Interface/Research.svg'
import HomeIcon from '../Supports/Assets/Icons/User Interface/House.svg'
import ProfileIcon from '../Supports/Assets/Icons/Users/account.svg'
import HeartOutlineIcon from '../Supports/Assets/Icons/User Interface/HeartOutline.png'
import LogoutIcon from '../Supports/Assets/Icons/User Interface/Logout.svg'
import SettingIcon from '../Supports/Assets/Icons/User Interface/Setting.svg'
import UploadIcon from '../Supports/Assets/Icons/User Interface/Upload.svg'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../redux/actions/userActions';


function Navpane(props) {
    const navLinkStyle = {
        textDecoration: 'none',
        width: '100%'
      };
    
    const dispatch = useDispatch()

    return (
        <div id='navpane-container'>
            <img src={LogoText} alt="logo" id='upperture-logo-navpane-text' />
            <img src={LogoNoText} alt="logo"id='upperture-logo-navpane-no-text' />
            <div id='search-bar-container'>
                <img src={SearchIcon} alt="search" id='search-icon' />
                <input type="text" placeholder='Search in Upperture' id="search-input" />
            </div>
            <NavLink to="/home" style={navLinkStyle} className={(navData) => navData.isActive ? "selected-menu" : "" }>
                <div className='menu-container'>
                    <img src={HomeIcon} alt="home" className='menu-icon' />
                    <p className='menu-text'>Home</p>
                </div>
            </NavLink>
            <NavLink to="/profile" style={navLinkStyle} className={(navData) => navData.isActive ? "selected-menu" : "" }>
                <div className='menu-container'>
                    <img src={ProfileIcon} alt="home" className='menu-icon' />
                    <p className='menu-text'>Profile</p>
                </div>
            </NavLink>
            <NavLink to="/liked-posts" style={navLinkStyle} className={(navData) => navData.isActive ? "selected-menu" : "" }>
                <div className='menu-container'>
                    <img src={HeartOutlineIcon} alt="like" className='menu-icon' />
                    <p className='menu-text'>Liked posts</p>
                </div>
            </NavLink>
            <NavLink to="/settings" style={navLinkStyle} className={(navData) => navData.isActive ? "selected-menu" : "" }>
                <div className='menu-container'>
                    <img src={SettingIcon} alt="like" className='menu-icon' />
                    <p className='menu-text'>Settings</p>
                </div>
            </NavLink>
            <NavLink to="/" style={navLinkStyle} className={(navData) => navData.isActive ? "selected-menu" : "" }>
            <div className='menu-container' onClick={() => dispatch(logoutAction())}>
                <img src={LogoutIcon} alt="like" className='menu-icon' />
                <p className='menu-text'>Log out</p>
            </div>
            </NavLink>
            <button id='upload-button'>Upload</button>
            <button id='upload-button-small'><img src={UploadIcon} alt="upload" className='menu-icon' /></button>
            <div className='upperture-footer mt-4'>
                <span className='upperture-dark-grey upperture-font-size-10 mb-0 mx-2'>Terms of Service</span>
                <span className='upperture-dark-grey upperture-font-size-10 mb-0 mx-2'>Privacy Policy</span>
                <span className='upperture-dark-grey upperture-font-size-10 mb-0 mx-2'>Cookie Policy</span>
            </div>
            <div className='upperture-footer'>
                <span className='upperture-dark-grey upperture-font-size-10 mb-0 mx-2'>Cookie Policy</span>
                <span className='upperture-dark-grey upperture-font-size-10 mb-0 mx-2'>Accessibility</span>
                <span className='upperture-dark-grey upperture-font-size-10 mb-0 mx-2'>Ads info</span>
            </div>
            <p className='upperture-footer upperture-dark-grey upperture-font-size-10 my-0'>© 2022 Upperture, Inc.</p>

        </div>
    );
}

export default Navpane;