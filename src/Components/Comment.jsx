import React from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultPicture from '../Supports/Assets/Icons/Users/DefaultPicture.jpg'

function Comment({comment}) {
    const navigate = useNavigate()
    return (
        <div className='d-flex mb-3'>
            <img className='comment-profile-pic upperture-pointer' src={comment.profilePic ? comment.profilePic : DefaultPicture} alt=""
                onClick={() => navigate(`/profile/${comment.username}`, { replace: true })} />
            <div className='comment-container'>
                <p className='comment-text'>
                    <b className='upperture-pointer mr-2' onClick={() => navigate(`/profile/${comment.username}`, { replace: true })}>{comment.username}</b> {comment.comment}</p>
                <p className='comment-date'>{
                        (comment.created_at.substr(8,1) == 0 ? comment.created_at.substr(9,1) : comment.created_at.substr(8,2))
                        + ' ' +
                        (comment.created_at.substr(5,2) == '01' ? 'January' :
                        comment.created_at.substr(5,2) == '02' ? 'February' :
                        comment.created_at.substr(5,2) == '03' ? 'March' :
                        comment.created_at.substr(5,2) == '04' ? 'April' :
                        comment.created_at.substr(5,2) == '05' ? 'May' :
                        comment.created_at.substr(5,2) == '06' ? 'June' :
                        comment.created_at.substr(5,2) == '07' ? 'July' :
                        comment.created_at.substr(5,2) == '08' ? 'August' :       
                        comment.created_at.substr(5,2) == '09' ? 'September' :
                        comment.created_at.substr(5,2) == '10' ? 'October' :
                        comment.created_at.substr(5,2) == '11' ? 'November' :
                        'December')
                        + ' ' + comment.created_at.substr(0,4)
                    }</p>
            </div>
        </div>
    );
}

export default Comment;