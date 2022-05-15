import React, { useEffect } from 'react';
import '../Supports/Stylesheets/Utils.css'
import Logo from '../Supports/Assets/Icons/Upperture Logo.svg'
import GoogleLogo from '../Supports/Assets/Icons/Brands/GoogleLogo.png'
import RegisterModal from '../Components/RegisterModal'
import ForgotPassword from '../Components/ForgotPassword';
import ShowPassword from '../Supports/Assets/Icons/User Interface/ShowPassword.png'
import HidePassword from '../Supports/Assets/Icons/User Interface/HidePassword.png'
import {
    Formik,
    Form,
    Field,
    ErrorMessage
  } from 'formik'
  import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../redux/actions/userActions';
import { Navigate } from 'react-router-dom';

function LandingPage(props) {
    const [openRegister, setOpenRegister] = React.useState(false)
    const [openForgotPassword, setOpenForgotPassword] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [redirect, setRedirect] = React.useState(false)

    const dispatch = useDispatch()
    const {loading, username, isVerified, error} = useSelector(state => state.userReducer)
    
    const initialValues = {
        usernameOrEmail: '',
        password: '',
      }
      
      const onSubmit = (values, submitProps) => {
        // submitProps.setSubmitting(true)
        let usernameOrEmail = values.usernameOrEmail
        let password = values.password
        dispatch(loginAction(usernameOrEmail, password))
        // submitProps.setSubmitting(false)
        submitProps.resetForm()
      }
    
    useEffect(() => {
        if(localStorage.getItem("myTkn")) {
            setRedirect(true)
        }
    }, [username])
    
    if(redirect){
        if(isVerified == 0) {
            return <Navigate to='/unconfirmed' />
        } else if(isVerified == 1) {
            return <Navigate to='/home' />
        }
    }

      const validationSchema = Yup.object({
        usernameOrEmail: Yup
            .string()
            .required('This field is required'),
        password: Yup
            .string()
            .required('This field is required')
      })

    return (
        <div className='d-flex'>
            {
                openRegister && <RegisterModal modalOpen={openRegister} setModalOpen={setOpenRegister} />
            }
            {
                openForgotPassword && <ForgotPassword modalOpen={openForgotPassword} setModalOpen={setOpenForgotPassword} />
            }
            <div id='jumbotron' className='d-flex justify-content-center align-items-center'>
                <div id='jumbotron-text-wrapper' className='d-flex justify-content-center align-items-center'>
                <p id='jumbotron-text'>Upload and share your memorable moments.</p>
                </div>
            </div>
            <div id='login-pane'>
                <div id='login-contents'>
                    <img src={Logo} alt="logo" style={{marginTop:'50px'}} />
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
                        <Field className='upperture-input' type="text" id='usernameOrEmail' name='usernameOrEmail' placeholder=' ' maxLength='320'/>
                            <label className='upperture-input-label' htmlFor='usernameOrEmail'>Username or email</label>
                            <ErrorMessage name='usernameOrEmail'>
                                {error => <div className='upperture-error-message' style={{fontSize:'12px'}}>{error}</div>}
                            </ErrorMessage>
                            {error == 'Account not found' ? <div className='upperture-error-message' style={{fontSize:'12px'}}>{error}</div> : ''}
                        </div>
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
                            {error == 'Incorrect password' ? <div className='upperture-error-message' style={{fontSize:'12px'}}>{error}</div> : ''}
                        </div>
                        <button className='upperture-submit-button'
                        type='submit'
                        disabled={!formik.isValid || formik.isSubmitting || loading}>
                        Log in</button>
                        <p id='upperture-forgot-password' className='upperture-pointer' onClick={() => setOpenForgotPassword(true)}>
                            Forgot password?</p>
                    </Form>
                    )}}
                </Formik>
                    <div className='d-flex'>
                        <p className='upperture-main-dark upperture-font-size-18 upperture-font-weight-600'>Don't have an account?</p>
                        <p className='upperture-main-highlight upperture-font-size-18 ms-2 upperture-font-weight-600 upperture-pointer' onClick={() => setOpenRegister(true)}>Sign up</p>
                    </div>
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
        </div>
    );
}

export default LandingPage;