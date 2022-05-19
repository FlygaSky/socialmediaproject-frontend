import React, { useRef } from 'react';
import CloseIcon from '../Supports/Assets/Icons/User Interface/Close.svg';
import AddPicture from '../Supports/Assets/Icons/Multimedia/add photo.svg';
import ProfilePicCropper from '../Components/Crop/ProfilePicCropper'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import {API_URL} from '../Supports/Functions/helper'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditProfile(props) {
    const [username, setUsername] = React.useState(useSelector(state => state.userReducer.username));
    const [fullName, setFullname] = React.useState("");
    const [bio, setBio] = React.useState("");
    const [openCropper, setOpenCropper] = React.useState(false)
    const [imageURL, setImageURL] = React.useState('')
    const [file, setFile] = React.useState(null);
    const [picErrorMsg, setPicErrorMsg] = React.useState('')
    const [usernameErrorMsg, setUsernameErrorMsg] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const {profilePic} = useSelector(state => state.userReducer)
    const {id} = useSelector(state => state.userReducer)
    const token = localStorage.getItem('myTkn')
    
    let params = useParams()
    const profileUsername = params.username
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const photo = useRef(null)
    useEffect(() => {
        axios.post(API_URL + '/user/getuserdetail', {username: profileUsername}, {
            headers: {
            authorization: token,
            }
          })
        .then((res) => {
            if(res.data.fullname) {setFullname(res.data.fullname)}
            if(res.data.bio) {setBio(res.data.bio)}
        }).catch((err) => {
            console.log(err)
        })
        }, [])

    const onImagesValidation = (e) => {
        try {
            let file = [...e.target.files]
            setFile(file[0])
            if(file.length > 1) throw { message: 'You can only upload 1 image' }
            if(file[0].size > 5000000) throw { message: 'Your file size is too big (>5mb)' }
            if(!file[0].type.includes('image'))  throw { message: 'This file type is not supported'}
            const reader = new FileReader();
            reader.onload = () =>{
              if(reader.readyState === 2){
                setImageURL(reader.result)
                }
            }
            reader.readAsDataURL(file[0])
            setPicErrorMsg('')
            setOpenCropper(true)
        } catch (error) {
            setPicErrorMsg(error.message)
        }
    }

    let usernameChange = (event) => {
        let newUsername = event.target.value
        setUsername(newUsername)
        if(!newUsername.match(/^(?=.{3,20}$)[a-zA-Z0-9_]+$/)) {
            setUsernameErrorMsg('Username must be between 3-20 characters containing only letters, numbers, and underscores')
        } else {
            setUsernameErrorMsg('')
            if(!(newUsername == profileUsername)){
                axios.post(API_URL + '/user/getusername', {username: newUsername})
                .then(() => {
                    setUsernameErrorMsg('')
                }).catch(e => {
                    setUsernameErrorMsg(e.response.data.message)
                })
            }
        }
    }

    let fullNameChange = (event) => {
        setFullname(event.target.value)
    }

    let bioChange = (event) => {
        setBio(event.target.value)
    }

    const onSubmit = () => {
        setLoading(true)
        if(usernameErrorMsg) return(null)
        axios.post(API_URL + '/user/edituserdetail',
        {
            username: username,
            fullname: fullName,
            bio: bio,
            users_id: id
        }, 
        {
            headers: {
            authorization: token,
            }
        })
        .then((res) => {
            setUsername(res.data.username)
            if(res.data.fullname) {setFullname(res.data.fullname)}
            else {setFullname('')}
            if(res.data.bio) {setBio(res.data.bio)}
            else {setBio('')}
            setLoading(false)
            props.setModalOpen(false)
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data
            })
            Swal.fire({
                title: 'Success!',
                text: 'Your profile detail is updated.',
                icon: 'success',
                confirmButtonText: 'Okay!',
                confirmButtonColor: '#369a7c'
              })
            navigate(`/profile/${username}`, { replace: true })
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

    return (
        <div id='edit-profile-modal-container' onClick={() => props.setModalOpen(false)}>
            {
                openCropper && <ProfilePicCropper  modalOpen={openCropper} setModalOpen={setOpenCropper} photoURL={imageURL} setPhotoURL={setImageURL} setFile={setFile}/>
            }
            <div id='edit-profile-modal' onClick={e => {e.stopPropagation()}}>
                <div id='edit-profile-modal-header'>
                    <img className='upperture-close-icon upperture-pointer' src={CloseIcon} alt="close" onClick={() => props.setModalOpen(false)} />
                    <p id='edit-profile-title'>Edit profile</p>
                </div>
                <div id='edit-profile-pic-container'>
                    {
                        profilePic 
                        ? <img id='edit-profile-pic' src={`${profilePic}`} alt="" />
                        : <img id='edit-profile-pic' src={require(`../Supports/Assets/Icons/Users/DefaultPicture.jpg`)} alt="" />
                    }
                    <div id='edit-profile-pic-overlay' className='upperture-pointer' onClick={() => photo.current.click()}>
                        <img id='add-picture-icon' src={AddPicture} alt="add photo" />
                        <input type="file" ref={photo} name='photo' accept="image/*" id="image-input" style={{display: 'none'}} onChange={(e) => onImagesValidation(e)} />
                    </div>
                </div>
                {
                    picErrorMsg && <p style={{margin: '0px', color: '#f0547b', fontSize:'14px'}}>{picErrorMsg}</p>
                }
                <div className='d-flex justify-content-between' style={{width:'100%'}}>
                    <span>Username</span>
                    {
                        username.length == 0 ? "" :
                        <span>{username.length}/20</span>
                    }
                </div>
                <input className='upperture-input' type="text" onChange={usernameChange} maxLength={20} defaultValue={username}/>
                {
                    usernameErrorMsg && <p style={{margin: '0px 20px', color: '#f0547b', textAlign:'center', fontSize:'12px'}}>{usernameErrorMsg}</p>
                }
                <div className='d-flex justify-content-between mt-3' style={{width:'100%'}}>
                    <span>Full name</span>
                    {
                        fullName.length == 0 ? "" :
                        <span>{fullName.length}/50</span>
                    }
                </div>
                <input className='upperture-input' type="text" onChange={fullNameChange} maxLength={50} defaultValue={fullName}/>
                <div className='d-flex justify-content-between mt-3' style={{width:'100%'}}>
                    <span>Bio</span>
                    {
                        bio.length == 0 ? "" :
                        <span>{bio.length}/160</span>
                    }
                </div>
                <textarea id='bio-input' onChange={bioChange} maxLength={160} rows="3" defaultValue={bio}/>
                <button disabled={loading ? true : false} className='upperture-submit-button' onClick={() => onSubmit()}>Save</button>
            </div>
        </div>
    );
}

export default EditProfile;