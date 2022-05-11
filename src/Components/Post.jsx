import React, { useEffect, useState } from 'react';
import DefaultPicture from '../Supports/Assets/Icons/Users/DefaultPicture.jpg'
import { useNavigate } from 'react-router-dom';
import HeartOutline from '../Supports/Assets/Icons/User Interface/HeartOutline.png';
import HeartRed from '../Supports/Assets/Icons/User Interface/HeartRed.png';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {API_URL} from '../Supports/Functions/helper';
function Post({post, pageNumber}) {
    const [likeNumber, setLikeNumber] = useState(post.likes)
    const [liked, setLiked] = useState(false)
    const navigate = useNavigate()
    const {id} = useSelector(state => state.userReducer)
    const token = localStorage.getItem('myTkn')

    useEffect(() => {
        post.isLiked && setLiked(true)
    }, [post, pageNumber])

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
            setLiked(true)
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
            setLiked(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className='home-post-container'>
            <img className='home-post-picture upperture-pointer' src={`${post.image}`} onClick={() => navigate(`/post/${post.unique_id}`, { replace: true })} alt="" />
            <div className='home-post-detail-container'>
                <div className='d-flex home-post-detail-left'>
                    <img className='home-post-profile-pic upperture-pointer' onClick={() => navigate(`/profile/${post.username}`, { replace: true })} src={
                        post.profilePic
                        ? `${post.profilePic}`
                        : DefaultPicture} alt="" />
                    <div className='d-flex flex-column' style={{marginLeft:'10px'}}>
                        <p className='home-post-name' onClick={() => navigate(`/profile/${post.username}`, { replace: true })}>{post.username}</p>
                        <p className='home-post-date'>{
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
                <div className='d-flex home-post-detail-right'>
                    {
                        liked ?
                        <img className='home-post-heart-liked' src={HeartRed} onClick={() => deleteLike(id, post.id)} alt="" />
                        : <img className='home-post-heart' src={HeartOutline} onClick={() => addLike(id, post.id)} alt="" />
                    }
                    <p className='home-post-number-of-likes'>{likeNumber}</p>
                </div>
            </div>
        </div>
    );
}

export default Post;