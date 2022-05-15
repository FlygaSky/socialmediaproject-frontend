import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import WhatsappLogo from '../Supports/Assets/Icons/Brands/whatsapp.svg'
import TwitterLogo from '../Supports/Assets/Icons/Brands/twitter.svg'
import FacebookLogo from '../Supports/Assets/Icons/Brands/facebook.svg'
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {API_URL} from '../Supports/Functions/helper'
import { FacebookShareButton, WhatsappShareButton, TwitterShareButton } from 'react-share'
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
})

function PostOptions({post, setPostOptionsOpen}) {    
    const {id} = useSelector(state => state.userReducer)
    const [openDelete, setOpenDelete] = useState(false)
    const [openShare, setOpenShare] = useState(false)
   
    const token = localStorage.getItem('myTkn')
    const navigate = useNavigate()

    const deletePost = (unique_id) => {
        axios.post(API_URL + '/posts/deletepost',{
            unique_id: unique_id
        }, 
        {
            headers: {
            authorization: token,
            }
        })
        .then((res) => {
            navigate('/home')
            Toast.fire({
                icon: 'success',
                title: 'Your post has been deleted!'
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    const copy = () => {
        const el = document.createElement('input');
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        Toast.fire({
            icon: 'success',
            title: 'Link copied!'
        })
        setPostOptionsOpen(false)
    }

    return (
        <div id='register-modal-container' onClick={() => setPostOptionsOpen(false)}>
            <div id='register-modal' style={id == post.users_id ? {height:'250px', width:'350px'} : {height:'180px', width:'350px'}} onClick={e => {e.stopPropagation()}}>
                {
                    openDelete
                    ? <>
                        <p style={{fontSize:'22px', textAlign:'center'}}>Are you sure you want to delete this post?</p>
                        <div className='d-flex justify-content-center'>
                            <button style={{
                                 backgroundColor: '#dddddd',
                                 border: 'none',
                                 fontFamily: `"Poppins", sans-serif`,
                                 padding: '0.5rem 1rem',
                                 margin: '1rem 0rem',
                                 borderRadius: '5px',
                                 fontSize: '16px',
                                 fontWeight: '600',
                                 color: '#3b3f3e',
                                 marginRight: '20px'
                            }} onClick={() => setPostOptionsOpen(false)}>Cancel</button>
                            <button style={{
                                 backgroundColor: '#f0547b',
                                 border: 'none',
                                 fontFamily: `"Poppins", sans-serif`,
                                 padding: '0.5rem 1rem',
                                 margin: '1rem 0rem',
                                 borderRadius: '5px',
                                 fontSize: '16px',
                                 fontWeight: '600',
                                 color: '#3b3f3e'
                            }}
                            onClick={() => deletePost(post.unique_id)}>Delete</button>
                        </div>
                    </>
                    : openShare 
                    ? <>
                        <p style={{marginTop:'-20px', fontSize:'22px', fontWeight:'500', textAlign:'center'}}>Share to:</p>
                        <div className='d-flex justify-content-center'>
                            <WhatsappShareButton url={window.location.href} title={'Check out this awesome post from Upperture!'}>
                                <img style={{cursor:'pointer', width:'50px', filter:'invert(22%) sepia(14%) saturate(129%) hue-rotate(114deg) brightness(96%) contrast(91%)'}}
                                src={WhatsappLogo} alt="" />
                            </WhatsappShareButton>
                            <TwitterShareButton url={window.location.href} title={'Check out this awesome post from Upperture!'}>
                                <img style={{cursor:'pointer', margin: '0px 30px', width:'50px', filter:'invert(22%) sepia(14%) saturate(129%) hue-rotate(114deg) brightness(96%) contrast(91%)'}}
                                src={TwitterLogo} alt="" />
                            </TwitterShareButton>
                            <FacebookShareButton url={'www.example.com'} quote={'Check out this awesome post from Upperture!'}>
                                <img style={{cursor:'pointer', width:'50px', filter:'invert(22%) sepia(14%) saturate(129%) hue-rotate(114deg) brightness(96%) contrast(91%)'}}
                                src={FacebookLogo} alt="" />
                            </FacebookShareButton>
                        </div>
                    </>
                    : <>
                        {
                            id == post.users_id && <p style={{fontSize:'24px', color:'#f0547b', cursor: 'pointer'}} onClick={() => setOpenDelete(true)}>Delete post</p>
                        }
                        <p style={{fontSize:'24px', cursor:'pointer'}}  onClick={() => setOpenShare(true)}>Share to...</p>
                        <p style={{fontSize:'24px', cursor: 'pointer'}} onClick={copy}>Copy link</p>
                    </>
                }
            </div>
        </div>
    );
}

export default PostOptions;