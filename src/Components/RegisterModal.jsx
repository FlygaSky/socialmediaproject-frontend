import React from 'react';
import LogoNoText from '../Supports/Assets/Icons/camera-icon.png'
import CloseIcon from '../Supports/Assets/Icons/User Interface/Close.svg'

function RegisterModal(props) {
    return (
        <div id='register-modal-container' onClick={() => props.setModalOpen(false)}>
            <div id='register-modal' onClick={e => {e.stopPropagation()}}>
                <img className='upperture-close-icon upperture-pointer' src={CloseIcon} alt="close"  onClick={() => props.setModalOpen(false)}/>
                <img id='upperture-logo-register-no-text' src={LogoNoText} alt="logo" />
                <p id='create-your-account'>Create your account</p>
                <input className='upperture-input' type="text" placeholder='Username'/>
                <input className='upperture-input' type="text" placeholder='Email'/>
                <input className='upperture-input' type="password" placeholder='Password'/>
                <input className='upperture-input' type="password" placeholder='Repeat password'/>
                <p className='upperture-font-size-10 upperture-dark-grey'>Password should contain at least 8 characters including an uppercase letter, a symbol, and a number</p>
                <button className='upperture-submit-button'>Sign up</button>
            </div>
        </div>
    );
}

export default RegisterModal;