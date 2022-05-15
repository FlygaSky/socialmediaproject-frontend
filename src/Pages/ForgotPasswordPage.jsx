import React, { useEffect } from 'react';
import '../Supports/Stylesheets/Utils.css'
import Logo from '../Supports/Assets/Icons/Upperture Logo.svg'
import ShowPassword from '../Supports/Assets/Icons/User Interface/ShowPassword.png'
import HidePassword from '../Supports/Assets/Icons/User Interface/HidePassword.png'
import {
    Formik,
    Form,
    Field,
    ErrorMessage
  } from 'formik'
  import * as Yup from 'yup'
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {API_URL} from '../Supports/Functions/helper'
import Swal from 'sweetalert2';
import Loading from '../Components/Loading';

function ForgotPasswordPage(props) {
    const [showPassword, setShowPassword] = React.useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = React.useState(false)
    const [tokenIsValid, setTokenIsValid] = React.useState(true)
    const [message, setMessage] = React.useState('')
    const [loading, setLoading] = React.useState(true)
    const [username, setUsername] = React.useState('')
    const [redirect, setRedirect] = React.useState(false)
    let params = useParams();

    useEffect(() => {
        setLoading(true)
        axios.post(API_URL + '/user/getuserdata', {}, {headers: {
            'Authorization': params.token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }})
        .then((res) => {
            console.log(res.data)
            setUsername(res.data.username)
            setTokenIsValid(res.data.tokenIsValid)
            setMessage(res.data.message)
            console.log(res.data.message)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
    
    const initialValues = {
        password: '',
        repeatPassword: ''
      }
      
      const onSubmit = (values, submitProps) => {
        submitProps.setSubmitting(true)
        let password = values.password
        axios.post(API_URL + '/user/resetpassword', {password}, {headers: {
            'Authorization': params.token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }})
            .then((res) => {
                submitProps.setSubmitting(false)
                submitProps.resetForm()
                Swal.fire({
                    title: 'Success!',
                    text: 'Your password has been reset. You can log in with your new password.',
                    icon: 'success',
                    confirmButtonText: 'Okay!',
                    confirmButtonColor: '#369a7c'
                })
                setRedirect(true)
            })
            .catch((err) => {
                submitProps.setSubmitting(false)
                Swal.fire({
                    title: 'Something went wrong :(',
                    text: err.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Okay!',
                    confirmButtonColor: '#f0547b'
                })
                console.log(err)
            })
        submitProps.setSubmitting(false)
        submitProps.resetForm()
      }

      if(redirect){
        return(  
            <Navigate to='/' />
        )
    }
      const validationSchema = Yup.object({
        password: Yup
            .string()
            .required('This field is required')
            .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Weak password"
            ),
        repeatPassword: Yup
            .string()
            .required('This field is required')
            .oneOf([Yup.ref("password"), null], "Passwords don't match")
      })

    return (
        <div>
            {
                loading
                ? <div style={{display:'flex', justifyContent:'center', alignItems:'center', width: "100vw", height: "100vh", backgroundColor: "#effffa"}}>
                    < Loading />
                </div>
                : <>
                    {
                        tokenIsValid
                        ? <div id='login-pane' style={{width:'100vw'}}>
                        <div id='login-contents'>
                            <img src={Logo} alt="logo" />
                            <p className='upperture-font-size-24 upperture-dark' style={{fontWeight:'500', marginTop:'20px', marginBottom:'0px'}}>{`Hi, ${username}!`}</p>
                            <p className='upperture-font-size-24 upperture-dark' style={{fontWeight:'500', marginBottom:'0px'}}>Enter your new password below:</p>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                                enableReinitialize
                                validateOnMount
                                >
                            {formik => {
                                return (
                            <Form id='login-box'>
                                <div className="upperture-form">
                                    <Field className='upperture-input upperture-password' type={showPassword ? "text" : "password"} id='password' name='password' placeholder=' ' maxLength='320'/>
                                    <label className='upperture-input-label' htmlFor='password'>Password</label>
                                    {
                                        showPassword ? 
                                        <img className='upperture-password-icon upperture-pointer' src={HidePassword} alt="hide" onClick={() => setShowPassword(false)}/>  :
                                        <img className='upperture-password-icon upperture-pointer' src={ShowPassword} alt="show" onClick={() => setShowPassword(true)}/> 
                                    }
                                    <ErrorMessage name='password'>
                                        {error => <div className='upperture-error-message' style={{fontSize:'12px'}}>{error}</div>}
                                    </ErrorMessage>
                                </div>
                                <div className="upperture-form">
                                    <Field className='upperture-input upperture-password' type={showRepeatPassword ? "text" : "password"} id='repeatPassword' name='repeatPassword' placeholder=' ' maxLength='320'/>
                                    <label className='upperture-input-label' htmlFor='password'>Repeat password</label>
                                    {
                                        showRepeatPassword ? 
                                        <img className='upperture-password-icon upperture-pointer' src={HidePassword} alt="hide" onClick={() => setShowRepeatPassword(false)}/>  :
                                        <img className='upperture-password-icon upperture-pointer' src={ShowPassword} alt="show" onClick={() => setShowRepeatPassword(true)}/> 
                                    }
                                    <ErrorMessage name='repeatPassword'>
                                        {error => <div className='upperture-error-message' style={{fontSize:'12px'}}>{error}</div>}
                                    </ErrorMessage>
                                </div>
                                <p className='upperture-font-size-10 upperture-dark-grey'>Password should contain at least 8 characters including an uppercase letter, a lowercase letter, a symbol, and a number</p>
                                <button className='upperture-submit-button'
                                type='submit'
                                disabled={!formik.isValid || formik.isSubmitting}>
                                Reset Password</button>
                            </Form>
                            )}}
                        </Formik>
                            <div className='d-flex justify-content-center mt-4'>
                                <span className='upperture-dark-grey upperture-font-size-12 mb-0 mx-2 upperture-pointer'>Terms of Service</span>
                                <span className='upperture-dark-grey upperture-font-size-12 mb-0 mx-2 upperture-pointer'>Privacy Policy</span>
                                <span className='upperture-dark-grey upperture-font-size-12 mb-0 mx-2 upperture-pointer'>Cookie Policy</span>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <span className='upperture-dark-grey upperture-font-size-12 mb-0 mx-2 upperture-pointer'>Cookie Policy</span>
                                <span className='upperture-dark-grey upperture-font-size-12 mb-0 mx-2 upperture-pointer'>Accessibility</span>
                                <span className='upperture-dark-grey upperture-font-size-12 mb-0 mx-2 upperture-pointer'>Ads info</span>
                            </div>
                            <p className='upperture-dark-grey upperture-font-size-12 my-0'>© 2022 Upperture, Inc.</p>
                        </div>
                    </div>
                    : <div style={{width: "100vw", height: "100vh", backgroundColor: "#effffa"}}>
                    <div className="row justify-content-center align-items-center" style={{height: '100vh'}}>
                        <div className="col-4 text-center border border-dark px-5 py-5 rounded">
                            <div>
                                <h1>{message}</h1>
                                <br/>
                                <Link to={localStorage.getItem('myTkn') ? "/home" : "/"} style={{textDecoration: "none"}}>
                                    <h4 style={{color: "#2ef3b8"}}>Go back to home</h4>
                                </Link>
                            </div>             
                        </div>
                    </div>
                </div>
                    }
                </>
            }
        </div>
    );
}

export default ForgotPasswordPage;