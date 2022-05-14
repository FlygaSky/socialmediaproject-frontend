import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, Navigate } from 'react-router-dom';
import EditProfile from '../Components/EditProfile';
import Navpane from '../Components/Navpane';
import { changeProfilePic } from '../redux/actions/userActions';
import CommentsWhite from '../Supports/Assets/Icons/Chat/chat.png'
import {API_URL} from '../Supports/Functions/helper'
import useOwnPostsSearch from './useOwnPostsSearch'
import Loading from '../Components/Loading'
import NoPostYet from '../Components/NoPostYet';

function Profile(props) {
    const [notFound, setNotFound] = useState(false)
    const [openEditProfile, setOpenEditProfile] = useState(false)
    const [fullname, setFullname] = useState('')
    const [bio, setBio] = useState('')
    const [notMyProfilePic, setNotMyProfilePic] = useState('')
    const [pageNumber, setPageNumber] = useState(1)

    const {profilePic} = useSelector(state => state.userReducer)
    const {username} = useSelector(state => state.userReducer)
    const {isVerified} = useSelector(state => state.userReducer)

    let params = useParams();
    const profileUsername = params.username
    const dispatch = useDispatch()

    const {
        posts,
        hasMore,
        loading,
        setLoading,
        error,
        errorMsg
      } = useOwnPostsSearch(pageNumber, profileUsername)

    const observer = useRef()
    const lastPostRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
            setPageNumber(prevPageNumber => prevPageNumber + 1)
        }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])


    useEffect(() => {
        setLoading(true)
        axios.post(API_URL + '/user/getusername', {username: profileUsername})
        .then((res) => {
            setNotFound(true)
            setLoading(false)
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
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
        }, [profileUsername])
    
    if(notFound) {
        return <Navigate to='/page-not-found' />
    }
    
    if(!localStorage.getItem('myTkn')){
        return(
            <Navigate to='/' />
            )
        }else if(isVerified == 0) {
            return(
                <Navigate to='/unconfirmed' />
                )
            }
            
    const linkStyle = {
        textDecoration: 'none',
        display: 'inline'
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
                {
                    loading
                    ? < Loading />
                    : <><div id='profile-header-container'>
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
                    <div style={{minHeight:'450px', width:'100%', display: 'flex', flexWrap: 'wrap'}}>
                    {
                        posts.map((post, index) => {
                            if (posts.length === index + 1) {
                                return <div className='home-post-container' ref={lastPostRef} key={post.id}>
                                    <div style={{position: "relative", width: "100%"}}>
                                        <Link to={`/post/${post.unique_id}`} style={linkStyle}>
                                            <img className='home-post-picture' src={post.image} alt="" />
                                            <div className='post-overlay'>
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <img className='heart-white' src={require(`../Supports/Assets/Icons/User Interface/HeartWhite.png`)} alt="heart" />
                                                    <p className='number-of-likes-comments-white'>{post.likes}</p>
                                                    <img className='comment-white' src={CommentsWhite} alt="comments" />
                                                    <p className='number-of-likes-comments-white'>{post.comments}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            } else {
                                return <div className='home-post-container' key={post.id}>
                                    <div style={{position: "relative", width: "100%"}}>
                                        <Link to={`/post/${post.unique_id}`} style={linkStyle}>
                                            <img className='home-post-picture' src={post.image} alt="" />
                                            <div className='post-overlay'>
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <img className='heart-white' src={require(`../Supports/Assets/Icons/User Interface/HeartWhite.png`)} alt="heart" />
                                                    <p className='number-of-likes-comments-white'>{post.likes}</p>
                                                    <img className='comment-white' src={CommentsWhite} alt="comments" />
                                                    <p className='number-of-likes-comments-white'>{post.comments}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            }
                        })
                    }
                    {
                        posts.length == 0 && < NoPostYet />
                    }
                    </div>
                    </>
                }
           </div>
        </div>
    );
}

export default Profile;