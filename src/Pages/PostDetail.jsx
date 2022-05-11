import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import Navpane from '../Components/Navpane';
import PaperPlane from '../Supports/Assets/Icons/User Interface/Paper Plane.svg'
import axios from 'axios';
import {API_URL} from '../Supports/Functions/helper'
import DefaultPicture from '../Supports/Assets/Icons/Users/DefaultPicture.jpg'

function PostDetail(props) {
    const [notFound, setNotFound] = useState(false)
    const [post, setPost] = useState({image: '',
                                      caption: '',
                                      created_at: '',
                                      users_id: '',
                                      username: '',
                                      profilePic: ''})
    const [likeNumber, setLikeNumber] = useState(0)
    const [isLiked, setIsLiked] = useState(0)
    const {isVerified} = useSelector(state => state.userReducer)
    const {profilePic} = useSelector(state => state.userReducer)
    const {username} = useSelector(state => state.userReducer)
    const {id} = useSelector(state => state.userReducer)
    const token = localStorage.getItem('myTkn')
    let params = useParams();
    let navigate = useNavigate()
    const uniqueId = params.uniqueid
    const dispatch = useDispatch()
    
    useEffect(() => {
        axios.post(API_URL + '/posts/getpost', {uniqueId: uniqueId, ownId: id}, {headers: {
            authorization: token,
            }})
        .then((res) => {
            setPost(res.data)
            setLikeNumber(res.data.likes)
            setIsLiked(res.data.isLiked)
            res.length == 0 && setNotFound(true)
        }).catch((err) => {
            console.log(err)
        })
        
        
        // axios.post(API_URL + '/user/getuserdetail', {username: profileUsername}, {
        //     headers: {
        //     authorization: token,
        //     }
        //   })
        // .then((res) => {
        //     if(res.data.fullname) {setFullname(res.data.fullname)}
        //     if(res.data.bio) {setBio(res.data.bio)}
        //     if(res.data.profilePic){
        //         if(username == profileUsername) {dispatch(changeProfilePic(res.data.profilePic))
        //         } else setNotMyProfilePic(res.data.profilePic)
        //     } 
        // }).catch((err) => {
        //     console.log(err)
        // })
        }, [])
    
    const addLike = (users_id, posts_id) => {
        console.log(posts_id)
        axios.post(API_URL + '/posts/addlike',{
            users_id: users_id,
            posts_id: posts_id
        }, 
        {
            headers: {
            authorization: token,
            }
        })
        .then((res) => {
            setLikeNumber(likeNumber + 1)
            setIsLiked(true)
        }).catch((err) => {
            console.log(err)
        })
    }

    const deleteLike = (users_id, posts_id) => {
        console.log(posts_id)
        axios.post(API_URL + '/posts/deletelike',{
            users_id: users_id,
            posts_id: posts_id
        }, 
        {
            headers: {
            authorization: token,
            }
        })
        .then((res) => {
            setLikeNumber(likeNumber - 1)
            setIsLiked(false)
        }).catch((err) => {
            console.log(err)
        })
    }
    
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
    return (
        <div className='d-flex'>
            <Navpane />
            <div className='page-container detail-page-container upperture-bg-medium-grey justify-content-around' style={{padding: '5vw'}}>
                <div id='detail-container'>
                    <div id='detail-container-left'>
                        <div id='detail-image-container'>
                            <img id='detail-image' src={post.image} alt="post" />
                        </div>
                    </div>
                    <div id='detail-container-right'>
                        <div className='detail-header-and-caption'>
                            <div className='detail-header-container'>
                                <div className='d-flex post-detail-left'>
                                    <img className='post-profile-pic upperture-pointer' 
                                        src={post.profilePic ? post.profilePic : DefaultPicture} alt=""
                                        onClick={() => navigate(`/profile/${post.username}`, { replace: true })} />
                                    <div className='d-flex flex-column'>
                                        <p className='post-name upperture-pointer' onClick={() => navigate(`/profile/${post.username}`, { replace: true })}>{post.username}</p>
                                        <p className='post-date'>{
                                            (post.created_at.substr(8,1) == 0 ? post.created_at.substr(9,1) : post.created_at.substr(8,2))
                                            + ' ' +
                                            (post.created_at.substr(5,2) == '01' ? 'January' :
                                            post.created_at.substr(5,2) == '02' ? 'February' :
                                            post.created_at.substr(5,2) == '03' ? 'March' :
                                            post.created_at.substr(5,2) == '04' ? 'April' :
                                            post.created_at.substr(5,2) == '05' ? 'May' :
                                            post.created_at.substr(5,2) == '06' ? 'June' :
                                            post.created_at.substr(5,2) == '07' ? 'July' :
                                            post.created_at.substr(5,2) == '08' ? 'August' :       
                                            post.created_at.substr(5,2) == '09' ? 'September' :
                                            post.created_at.substr(5,2) == '10' ? 'October' :
                                            post.created_at.substr(5,2) == '11' ? 'November' :
                                            'December')
                                            + ' ' + post.created_at.substr(0,4)
                                        }</p>
                                    </div>
                                </div>
                                <div className='d-flex post-detail-right'>
                                    {
                                        isLiked
                                        ? <img className='post-heart-liked upperture-pointer' src={require(`../Supports/Assets/Icons/User Interface/HeartRed.png`)} alt=""
                                            onClick={() => deleteLike(id, post.id)} />
                                        : <img className='post-heart upperture-pointer' src={require(`../Supports/Assets/Icons/User Interface/HeartOutline.png`)} alt=""
                                            onClick={() => addLike(id, post.id)} />
                                    }
                                    <p className='post-number-of-likes'>{likeNumber}</p>
                                </div>
                            </div>
                        </div>
                        <div id='comments-container'>
                            <div className='d-flex mb-3'>
                                <img className='comment-profile-pic upperture-pointer' src={post.profilePic} alt=""
                                    onClick={() => navigate(`/profile/${post.username}`, { replace: true })} />
                                <div className='comment-container'>
                                    <p className='comment-text'>
                                        <b className='upperture-pointer' onClick={() => navigate(`/profile/${post.username}`, { replace: true })}>{post.username}</b> {post.caption}</p>
                                    <p className='comment-date'>{
                                            (post.created_at.substr(8,1) == 0 ? post.created_at.substr(9,1) : post.created_at.substr(8,2))
                                            + ' ' +
                                            (post.created_at.substr(5,2) == '01' ? 'January' :
                                            post.created_at.substr(5,2) == '02' ? 'February' :
                                            post.created_at.substr(5,2) == '03' ? 'March' :
                                            post.created_at.substr(5,2) == '04' ? 'April' :
                                            post.created_at.substr(5,2) == '05' ? 'May' :
                                            post.created_at.substr(5,2) == '06' ? 'June' :
                                            post.created_at.substr(5,2) == '07' ? 'July' :
                                            post.created_at.substr(5,2) == '08' ? 'August' :       
                                            post.created_at.substr(5,2) == '09' ? 'September' :
                                            post.created_at.substr(5,2) == '10' ? 'October' :
                                            post.created_at.substr(5,2) == '11' ? 'November' :
                                            'December')
                                            + ' ' + post.created_at.substr(0,4)
                                        }</p>
                                </div>
                            </div>
                            <div className='d-flex mb-3'>
                                <img className='comment-profile-pic' src={require(`../Supports/Assets/Profile Pics/dids-186.jpeg`)} alt="profile-pic" />
                                <div className='comment-container'>
                                    <p className='comment-text'>
                                        <b>dids</b> this is a comment.
                                    </p>
                                    <p className='comment-date'>2 April 2022</p>
                                </div>
                            </div>
                            <div className='d-flex mb-3'>
                                <img className='comment-profile-pic' src={require(`../Supports/Assets/Profile Pics/dids-186.jpeg`)} alt="profile-pic" />
                                <div className='comment-container'>
                                    <p className='comment-text'>
                                        <b>dids</b> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Sociis natoque penatibus et maer.
                                    </p>
                                    <p className='comment-date'>2 April 2022</p>
                                </div>
                            </div>
                            <div className='d-flex mb-3'>
                                <img className='comment-profile-pic' src={require(`../Supports/Assets/Profile Pics/dids-186.jpeg`)} alt="profile-pic" />
                                <div className='comment-container'>
                                    <p className='comment-text'>
                                        <b>dids</b> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                                    </p>
                                    <p className='comment-date'>2 April 2022</p>
                                </div>
                            </div>
                            <div className='d-flex mb-3'>
                                <img className='comment-profile-pic' src={require(`../Supports/Assets/Profile Pics/dids-186.jpeg`)} alt="profile-pic" />
                                <div className='comment-container'>
                                    <p className='comment-text'>
                                        <b>dids</b> this is a comment.
                                    </p>
                                    <p className='comment-date'>2 April 2022</p>
                                </div>
                            </div>
                            <div className='d-flex mb-3'>
                                <img className='comment-profile-pic' src={require(`../Supports/Assets/Profile Pics/dids-186.jpeg`)} alt="profile-pic" />
                                <div className='comment-container'>
                                    <p className='comment-text'>
                                        <b>dids</b> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Sociis natoque penatibus et maer.
                                    </p>
                                    <p className='comment-date'>2 April 2022</p>
                                </div>
                            </div>
                        </div>
                        <div className='write-comment-container'>
                        <textarea className='comment-input' maxLength={300} placeholder='Write your comment... (max 300 characters)' />
                        <div className='comment-submit-area'>
                            <img className='comment-submit-button' src={PaperPlane} alt="submit" />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;