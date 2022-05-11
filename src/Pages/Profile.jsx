import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, Navigate } from 'react-router-dom';
import EditProfile from '../Components/EditProfile';
import Navpane from '../Components/Navpane';
import { changeProfilePic } from '../redux/actions/userActions';
import CommentsWhite from '../Supports/Assets/Icons/Chat/chat.png'
import {API_URL} from '../Supports/Functions/helper'


function Profile(props) {
    const [notFound, setNotFound] = useState(false)
    const [openEditProfile, setOpenEditProfile] = useState(false)
    const [fullname, setFullname] = useState('')
    const [bio, setBio] = useState('')
    const [notMyProfilePic, setNotMyProfilePic] = useState('')
    const {profilePic} = useSelector(state => state.userReducer)
    const {username} = useSelector(state => state.userReducer)
    const {isVerified} = useSelector(state => state.userReducer)
    let params = useParams();
    const profileUsername = params.username
    const dispatch = useDispatch()
    useEffect(() => {
        axios.post(API_URL + '/user/getusername', {username: profileUsername})
        .then((res) => {
            setNotFound(true)
        }).catch(() => {
            console.log('username exists')
        })
        
        const token = localStorage.getItem('myTkn')
        
        axios.post(API_URL + '/user/getuserdetail', {username: profileUsername}, {
            headers: {
            authorization: token,
            }
          })
        .then((res) => {
            if(res.data.fullname) {setFullname(res.data.fullname)}
            if(res.data.bio) {setBio(res.data.bio)}
            if(res.data.profilePic){
                if(username == profileUsername) {dispatch(changeProfilePic(res.data.profilePic))
                } else setNotMyProfilePic(res.data.profilePic)
            } 
        }).catch((err) => {
            console.log(err)
        })
        }, [profileUsername])
    
    if(notFound) {
        return <Navigate to='/page-not-found' />
    }
    
    const linkStyle = {
        textDecoration: 'none',
        display: 'inline'
      };

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
           {
               openEditProfile && <EditProfile 
               modalOpen={openEditProfile} 
               setModalOpen={setOpenEditProfile}
               username={username}
               profilePic={profilePic}
               fullname={fullname}
               setFullname={setFullname}
               bio={bio}
               setBio={setBio} />
           }
           <div className='page-container'>
                <div id='profile-header-container'>
                    <div className='d-flex'>
                        {
                            notMyProfilePic ?
                            <img id='profile-pic' 
                            src={`${notMyProfilePic}`}
                            alt="" />
                            : username == profileUsername && profilePic
                            ? <img id='profile-pic' 
                            src={`${profilePic}`}
                            alt="" />
                            : <img id='profile-pic' 
                            src={require(`../Supports/Assets/Icons/Users/DefaultPicture.jpg`)}
                            alt="" />
                        }
                        <div id='profile-name-container' className='d-flex flex-column justify-content-center'>
                            <p id='profile-username' style={fullname ? {fontSize:'24px'} : {fontSize:'32px'}}>{profileUsername}</p>
                            {
                                fullname && <p id='profile-name'>{fullname}</p>
                            }
                        </div>
                    </div>
                    <div id='profile-bio-container'>
                        {
                            bio && <p className='profile-bio'>{bio}</p>
                        }
                        {
                            username == profileUsername && <button className='edit-profile-button'
                        onClick={() => setOpenEditProfile(true)}>Edit profile</button>
                        }
                    </div>
                </div>
                <div className='home-post-container'>
                    <div style={{position: "relative", width: "100%"}}>
                        <img className='home-post-picture' src={require(`../Supports/Assets/Posts/Rafael-Cerqueira/pexels-rafael-cerqueira-4737454.jpg`)} alt="sunset" />
                        <div className='post-overlay'>
                            <div className='d-flex justify-content-center align-items-center'>
                                <img className='heart-white' src={require(`../Supports/Assets/Icons/User Interface/HeartWhite.png`)} alt="heart" />
                                <p className='number-of-likes-comments-white'>3</p>
                                <img className='comment-white' src={CommentsWhite} alt="comments" />
                                <p className='number-of-likes-comments-white'>0</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-post-container'>
                    <div style={{position: "relative", width: "100%"}}>
                        <img className='home-post-picture' src={require(`../Supports/Assets/Posts/Rafael-Cerqueira/pexels-rafael-cerqueira-4737455.jpg`)} alt="sunset" />
                        <div className='post-overlay'>
                            <div className='d-flex justify-content-center align-items-center'>
                                <img className='heart-white' src={require(`../Supports/Assets/Icons/User Interface/HeartWhite.png`)} alt="heart" />
                                <p className='number-of-likes-comments-white'>3</p>
                                <img className='comment-white' src={CommentsWhite} alt="comments" />
                                <p className='number-of-likes-comments-white'>0</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-post-container'>
                    <div style={{position: "relative", width: "100%"}}>
                        <img className='home-post-picture' src={require(`../Supports/Assets/Posts/Rafael-Cerqueira/pexels-rafael-cerqueira-4737487.jpg`)} alt="sunset" />
                        <div className='post-overlay'>
                            <div className='d-flex justify-content-center align-items-center'>
                                <img className='heart-white' src={require(`../Supports/Assets/Icons/User Interface/HeartWhite.png`)} alt="heart" />
                                <p className='number-of-likes-comments-white'>3</p>
                                <img className='comment-white' src={CommentsWhite} alt="comments" />
                                <p className='number-of-likes-comments-white'>0</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-post-container'>
                    <div style={{position: "relative", width: "100%"}}>
                        <img className='home-post-picture' src={require(`../Supports/Assets/Posts/Rafael-Cerqueira/pexels-rafael-cerqueira-4737482.jpg`)} alt="sunset" />
                        <div className='post-overlay'>
                            <div className='d-flex justify-content-center align-items-center'>
                                <img className='heart-white' src={require(`../Supports/Assets/Icons/User Interface/HeartWhite.png`)} alt="heart" />
                                <p className='number-of-likes-comments-white'>3</p>
                                <img className='comment-white' src={CommentsWhite} alt="comments" />
                                <p className='number-of-likes-comments-white'>0</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-post-container'>
                    <div style={{position: "relative", width: "100%"}}>
                        <img className='home-post-picture' src={require(`../Supports/Assets/Posts/Rafael-Cerqueira/pexels-rafael-cerqueira-4737484.jpg`)} alt="sunset" />
                        <div className='post-overlay'>
                            <div className='d-flex justify-content-center align-items-center'>
                                <img className='heart-white' src={require(`../Supports/Assets/Icons/User Interface/HeartWhite.png`)} alt="heart" />
                                <p className='number-of-likes-comments-white'>3</p>
                                <img className='comment-white' src={CommentsWhite} alt="comments" />
                                <p className='number-of-likes-comments-white'>0</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='home-post-container'>
                    <div style={{position: "relative", width: "100%"}}>
                        <Link to='/detail' style={linkStyle}>
                            <img className='home-post-picture' src={require(`../Supports/Assets/Posts/Rafael-Cerqueira/pexels-rafael-cerqueira-4737459.jpg`)} alt="sunset" />
                            <div className='post-overlay'>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <img className='heart-white' src={require(`../Supports/Assets/Icons/User Interface/HeartWhite.png`)} alt="heart" />
                                    <p className='number-of-likes-comments-white'>3</p>
                                    <img className='comment-white' src={CommentsWhite} alt="comments" />
                                    <p className='number-of-likes-comments-white'>0</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

           </div>
        </div>
    );
}

export default Profile;