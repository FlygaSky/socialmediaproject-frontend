import React from 'react';
import CloseIcon from '../Supports/Assets/Icons/User Interface/Close.svg';
import AddPicture from '../Supports/Assets/Icons/Multimedia/add photo.svg';

function EditProfile(props) {
    const [username, setUsername] = React.useState("");
    const [fullName, setFullName] = React.useState("");
    const [bio, setBio] = React.useState("");
    
    let usernameChange = (event) => {
        let newUsername = event.target.value
        setUsername(newUsername)
    }

    let fullNameChange = (event) => {
        let newFullName = event.target.value
        setFullName(newFullName)
    }

    let bioChange = (event) => {
        let newBio = event.target.value
        setBio(newBio)
    }
    return (
        <div id='edit-profile-modal-container' onClick={() => props.setModalOpen(false)}>
            <div id='edit-profile-modal' onClick={e => {e.stopPropagation()}}>
                <div id='edit-profile-modal-header'>
                    <img className='upperture-close-icon upperture-pointer' src={CloseIcon} alt="close" onClick={() => props.setModalOpen(false)} />
                    <p id='edit-profile-title'>Edit profile</p>
                </div>
                <div id='edit-profile-pic-container'>
                    <img id='edit-profile-pic' src={require(`../Supports/Assets/Profile Pics/rafael-cerqueira.jpeg`)} alt="profile-pic" />
                    <div id='edit-profile-pic-overlay' className='upperture-pointer'>
                        <img id='add-picture-icon' src={AddPicture} alt="add photo" />
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width:'100%'}}>
                    <span>Username</span>
                    {
                        username.length == 0 ? "" :
                        <span>{username.length}/20</span>
                    }
                </div>
                <input className='upperture-input' type="text" onChange={usernameChange} maxLength={20}/>
                <div className='d-flex justify-content-between mt-3' style={{width:'100%'}}>
                    <span>Full name</span>
                    {
                        fullName.length == 0 ? "" :
                        <span>{fullName.length}/50</span>
                    }
                </div>
                <input className='upperture-input' type="text" onChange={fullNameChange} maxLength={50}/>
                <div className='d-flex justify-content-between mt-3' style={{width:'100%'}}>
                    <span>Bio</span>
                    {
                        bio.length == 0 ? "" :
                        <span>{bio.length}/160</span>
                    }
                </div>
                <textarea id='bio-input' onChange={bioChange} maxLength={160} rows="3" />
                <button className='upperture-submit-button'>Save</button>
            </div>
        </div>
    );
}

export default EditProfile;