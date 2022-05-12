import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import Navpane from '../Components/Navpane';
import PaperPlane from '../Supports/Assets/Icons/User Interface/Paper Plane.svg'
import axios from 'axios';
import {API_URL} from '../Supports/Functions/helper'
import DefaultPicture from '../Supports/Assets/Icons/Users/DefaultPicture.jpg'
import MenuIcon from '../Supports/Assets/Icons/User Interface/Menu.svg'
import Comment from '../Components/Comment'
import PostOptions from '../Components/PostOptions'
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
})

function PostDetail(props) {
    const [notFound, setNotFound] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [postOptionsOpen, setPostOptionsOpen] = useState(false)
    const [post, setPost] = useState({image: '',
                                      caption: '',
                                      created_at: '',
                                      users_id: '',
                                      username: '',
                                      profilePic: ''})
    const [comments, setComments] = useState([])
    const [totalComments, setTotalComments] = useState(0)
    const [myComment, setMyComment] = useState('')
    const [likeNumber, setLikeNumber] = useState(0)
    const [isLiked, setIsLiked] = useState(0)
    const [editCaption, setEditCaption] = useState(false)
    const [caption, setCaption] = useState('')
    const [newCaption, setNewCaption] = useState('')
    const {isVerified} = useSelector(state => state.userReducer)
    const {id} = useSelector(state => state.userReducer)
    const token = localStorage.getItem('myTkn')
    let params = useParams();
    let navigate = useNavigate()
    const uniqueId = params.uniqueid
    const commentsEndRef = useRef(null)
    
    useEffect(async() => {
        await axios.post(API_URL + '/posts/getpost', {uniqueId: uniqueId, ownId: id}, {headers: {
            authorization: token,
            }})
        .then((res) => {
            setPost(res.data)
            setLikeNumber(res.data.likes)
            setIsLiked(res.data.isLiked)
            setComments(res.data.comments)
            setTotalComments(res.data.totalComments)
            setCaption(res.data.caption)
            setNewCaption(res.data.caption)
            console.log(res.data)
            res.length == 0 && setNotFound(true)
        }).catch((err) => {
            console.log(err)
        })     
        }, [])

        useEffect(() => {
            if(post.id){
                axios.post(`${API_URL}/posts/getcomments?page=${pageNumber}&limit=5`, {post_id: post.id}, {
                    headers: {
                    authorization: token,
                    }
                })
                .then((res) => {
                    comments.length
                    ? setComments([...comments, ...res.data])
                    : setComments(...res.data)
                }).catch((err) => {
                    console.log(err)
                })
            }
        }, [pageNumber])
    
    const addLike = (users_id, posts_id) => {
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

    const postComment = (com, uid, pid) => {
        axios.post(API_URL + '/posts/postcomment',{
            comment: com,
            user_id: uid,
            post_id: pid
        }, 
        {
            headers: {
            authorization: token,
            }
        })
        .then((res) => {
            console.log('res.data postComment', res.data)
            Toast.fire({
                icon: 'success',
                title: 'Comment successfully posted!'
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    const editCaptionFunc = (cap, pid) => {
        axios.post(API_URL + '/posts/editcaption',{
            caption: cap,
            post_id: pid
        }, 
        {
            headers: {
            authorization: token,
            }
        })
        .then((res) => {
            setCaption(newCaption)
            Toast.fire({
                icon: 'success',
                title: 'Caption updated!'
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        comments.length == totalComments && commentsEndRef.current?.scrollIntoView()
    }, [comments])
    
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
                {
                    postOptionsOpen && <PostOptions post={post} setPostOptionsOpen={setPostOptionsOpen} />
                }
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
                                    <img style={{width:'30px',
                                                 filter: 'invert(22%) sepia(14%) saturate(129%) hue-rotate(114deg) brightness(96%) contrast(91%)',
                                                 marginLeft: '10px',
                                                 cursor: 'pointer'
                                                }}
                                        src={MenuIcon} alt=""
                                        onClick={() => setPostOptionsOpen(true)} />
                                </div>
                            </div>
                        </div>
                        <div id='comments-container'>
                            <div className='d-flex mb-3'>
                                <img className='comment-profile-pic upperture-pointer' src={post.profilePic ? post.profilePic : DefaultPicture} alt=""
                                    onClick={() => navigate(`/profile/${post.username}`, { replace: true })} />
                                <div className='comment-container' style={{width:'100%'}}>
                                    <p className='comment-text'>
                                        <b className='upperture-pointer' onClick={() => navigate(`/profile/${post.username}`, { replace: true })}>{post.username}</b> {!editCaption && caption}</p>
                                    {
                                        editCaption &&
                                        <textarea  className='comment-input' maxLength={300} defaultValue={caption} placeholder='Write your caption... (max 300 characters)'
                                        onChange={(e) => setNewCaption(e.target.value)}/>
                                    }
                                    <div className='d-flex'>
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
                                        {
                                            id == post.users_id &&
                                            <>{
                                                editCaption 
                                                ? <p style={{fontSize:'10px', color:'#909090', cursor: 'pointer', margin: '0px 0px 0px 10px'}}
                                                   onClick={() => {
                                                       editCaptionFunc(newCaption, post.id)
                                                       setEditCaption(false)
                                                   }}>
                                                Save caption</p>
                                                : <p style={{fontSize:'10px', color:'#909090', cursor: 'pointer', margin: '0px 0px 0px 10px'}} onClick={() => setEditCaption(true)}>
                                                Edit caption</p>
                                            }</>
                                        }
                                    </div>
                                </div>
                            </div>
                            {
                                comments.map((comment, index) => {
                                    if (comments.length === index + 1) {
                                        return <div key={comment.id}>
                                            <Comment comment={comment} pageNumber={pageNumber} />
                                        </div>
                                    } else {
                                        return <div key={comment.id}>
                                            <Comment comment={comment} pageNumber={pageNumber} />
                                        </div>
                                    }
                                })
                            }
                            {
                                comments.length < totalComments && 
                                <p style={{fontSize:'14px', color:'#909090', cursor:'pointer'}}
                                onClick={() => setPageNumber(pageNumber + 1)}>Show more comments...</p> 
                            }
                            <div ref={commentsEndRef} />
                        </div>
                        <div className='write-comment-container'>
                        <textarea className='comment-input' maxLength={300} placeholder='Write your comment... (max 300 characters)'
                            onChange={(e) => setMyComment(e.target.value)}
                            value={myComment} />
                        <div className='comment-submit-area'>
                            <img className='comment-submit-button' src={PaperPlane} alt="submit"
                                onClick={async() => {
                                    myComment && await postComment(myComment, post.users_id, post.id)
                                    setTotalComments(totalComments + 1)
                                    setMyComment('')
                                }} />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;