import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Navpane from '../Components/Navpane';
import axios from 'axios';
import {API_URL} from '../Supports/Functions/helper'
import Swal from 'sweetalert2';
import ShowPassword from '../Supports/Assets/Icons/User Interface/ShowPassword.png'
import HidePassword from '../Supports/Assets/Icons/User Interface/HidePassword.png'

function Settings(props) {
    const [oldPasswordErrorMsg, setOldPasswordErrorMsg] = React.useState("")
    const [oldPassword, setOldPassword] = React.useState("")
    const [seeOldPassword, setSeeOldPassword] = React.useState(false)
    const [newPasswordErrorMsg, setNewPasswordErrorMsg] = React.useState("")
    const [newPassword, setNewPassword] = React.useState("")
    const [seeNewPassword, setSeeNewPassword] = React.useState(false)
    const [repeatNewPasswordErrorMsg, setRepeatNewPasswordErrorMsg] = React.useState("")
    const [repeatNewPassword, setRepeatNewPassword] = React.useState("")
    const [seeRepeatNewPassword, setSeeRepeatNewPassword] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const {email, id} = useSelector(state => state.userReducer)
    const token = localStorage.getItem('myTkn')

    const oldPasswordChange = (event) => {
        let oldPassword = event.target.value
        setOldPassword(oldPassword)
        axios.post(API_URL + '/user/getpassword', {password: oldPassword, id: id})
        .then(() => {
            setOldPasswordErrorMsg('')
        }).catch(e => {
            setOldPasswordErrorMsg(e.response.data.message)
        })
        if (!oldPassword) {
            setOldPasswordErrorMsg('')
        }
    }

    const newPasswordChange = (event) => {
        let newPassword = event.target.value
        setNewPassword(newPassword)
        if(!newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) {
            setNewPasswordErrorMsg('Your new password is too weak')
        } else if (!newPassword){
            setNewPasswordErrorMsg('')
        } else {
            setNewPasswordErrorMsg('')
        }
    }
    
    const repeatNewPasswordChange = (event) => {
        let repeatPassword = event.target.value
        setRepeatNewPassword(repeatPassword)
        if(!(repeatPassword == newPassword)) {
            setRepeatNewPasswordErrorMsg(`Passwords don't match`)
        } else if (!repeatPassword){
            setRepeatNewPasswordErrorMsg('')
        } else {
            setRepeatNewPasswordErrorMsg('')
        }
    }
    
    const onSubmit = () => {
        setIsSubmitting(true)
        axios.post(API_URL + '/user/changepassword', {id: id, newPassword: newPassword}, 
        {
            headers: {
            authorization: token,
            }
        })
        .then(() => {
            Swal.fire({
                title: 'Success!',
                text: 'Your password has been changed.',
                icon: 'success',
                confirmButtonText: 'Okay!',
                confirmButtonColor: '#369a7c'
              })
              setIsSubmitting(false)
        }).catch(() => {
            Swal.fire({
                title: 'Oops!',
                text: 'Something went wrong :(',
                icon: 'error',
                confirmButtonText: 'Okay...',
                confirmButtonColor: '#f0547b'
              })
              setIsSubmitting(false)
        })
    }

    const {isVerified} = useSelector(state => state.userReducer)
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
        <div className='d-flex upperture-bg-medium-grey' style={{display:'block', overflow:'auto', minHeight:'100vh'}}>
            <Navpane />
            <div className='page-container detail-page-container justify-content-around' style={{padding: '3vw'}}>
                <div id='settings-header-container'>
                    <h1>Settings</h1>
                </div>
                <div id='settings-container'>
                    <p className='m-0 upperture-main-dark'>{`Email: ${email}`}</p>
                    <p className='mt-0 mb-4 upperture-dark-grey upperture-font-size-14'>Email can not be changed</p>
                    <p className='mt-0 mb-4 upperture-main-dark'>Account status: verified</p>
                    <p className='mt-4 mb-0 upperture-main-dark'>Change password</p>
                    <div className="upperture-form" style={{margin:'10px 0px 20px 0px'}}>
                        <input className='upperture-input' type={seeOldPassword ? "text" : "password"} placeholder=' ' id='oldPassword' maxLength={160} onChange={oldPasswordChange} value={oldPassword}/>
                        <label className='upperture-input-label' htmlFor='oldPassword'>Old password</label>
                        {
                            seeOldPassword ? 
                            <img className='upperture-password-icon upperture-pointer' src={HidePassword} alt="hide" onClick={() => setSeeOldPassword(false)}/>  :
                            <img className='upperture-password-icon upperture-pointer' src={ShowPassword} alt="show" onClick={() => setSeeOldPassword(true)}/> 
                        }
                        {
                            (oldPasswordErrorMsg && oldPassword)
                            && <p style={{margin: '0px 20px', color: '#f0547b', textAlign:'center', fontSize:'12px'}}>{oldPasswordErrorMsg}</p>
                        }
                    </div>
                    <div className="upperture-form" style={{margin:'20px 0px'}}>
                        <input className='upperture-input' type={seeNewPassword ? "text" : "password"} placeholder=' ' id='newPassword' maxLength={160} onChange={newPasswordChange} value={newPassword}/>
                        <label className='upperture-input-label' htmlFor='newPassword'>New password</label>
                        {
                            seeNewPassword ? 
                            <img className='upperture-password-icon upperture-pointer' src={HidePassword} alt="hide" onClick={() => setSeeNewPassword(false)}/>  :
                            <img className='upperture-password-icon upperture-pointer' src={ShowPassword} alt="show" onClick={() => setSeeNewPassword(true)}/> 
                        }
                        {
                            (newPasswordErrorMsg && newPassword)
                            && <p style={{margin: '0px 20px', color: '#f0547b', textAlign:'center', fontSize:'12px'}}>{newPasswordErrorMsg}</p>
                        }
                    </div>
                    <div className="upperture-form" style={{margin:'20px 0px'}}>
                        <input className='upperture-input' type={seeRepeatNewPassword ? "text" : "password"} placeholder=' '  id='repeatNewPassword' onChange={repeatNewPasswordChange} maxLength={160} value={repeatNewPassword}/>
                        <label className='upperture-input-label' htmlFor='repeatNewPassword'>Repeat new password</label>
                        {
                            seeRepeatNewPassword ? 
                            <img className='upperture-password-icon upperture-pointer' src={HidePassword} alt="hide" onClick={() => setSeeRepeatNewPassword(false)}/>  :
                            <img className='upperture-password-icon upperture-pointer' src={ShowPassword} alt="show" onClick={() => setSeeRepeatNewPassword(true)}/> 
                        }
                        {
                            (repeatNewPasswordErrorMsg && repeatNewPassword)
                            && <p style={{margin: '0px 20px', color: '#f0547b', textAlign:'center', fontSize:'12px'}}>{repeatNewPasswordErrorMsg}</p>
                        }
                    </div>
                    <p className='upperture-font-size-12 upperture-dark-grey mb-4'>Password should contain at least 8 characters including an uppercase letter, a lowercase letter, a symbol, and a number</p>
                    <button className='upperture-submit-button'
                        onClick={() => {onSubmit()
                                    setOldPassword('')
                                    setNewPassword('')
                                    setRepeatNewPassword('')
                                    }}
                        disabled={oldPasswordErrorMsg || newPasswordErrorMsg || repeatNewPasswordErrorMsg ||
                                  !(oldPassword && newPassword && repeatNewPassword) || isSubmitting}>
                        Save</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;