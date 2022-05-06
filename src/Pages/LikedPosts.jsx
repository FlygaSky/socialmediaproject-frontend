import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Navpane from '../Components/Navpane';

function LikedPosts(props) {
    const {isVerified} = useSelector(state => state.userReducer)
    if(!localStorage.getItem('myTkn')){
        return(
            <Navigate to='/' />
        )
    }else if(isVerified == 0) {
        return(
            <Navigate to='/unconfirmed' />
        )
    }
    return (
        <div className='d-flex'>
            <Navpane />
            <div className='page-container'>
                <div className='home-post-container'>
                    <img className='home-post-picture' src={require(`../Supports/Assets/Posts/Anni-Roenkae/pexels-anni-roenkae-2693212.jpg`)} alt="sunset" />
                    <div className='home-post-detail-container'>
                        <div className='d-flex home-post-detail-left'>
                            <img className='home-post-profile-pic' src={require(`../Supports/Assets/Profile Pics/rafael-cerqueira.jpeg`)} alt="profile-pic" />
                            <div className='d-flex flex-column'>
                                <p className='home-post-name'>incrediblerafa</p>
                                <p className='home-post-date'>28 March 2022</p>
                            </div>
                        </div>
                        <div className='d-flex home-post-detail-right'>
                            <img className='home-post-heart-liked' src={require(`../Supports/Assets/Icons/User Interface/HeartRed.png`)} alt="profile-pic" />
                            <p className='home-post-number-of-likes'>3</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LikedPosts;