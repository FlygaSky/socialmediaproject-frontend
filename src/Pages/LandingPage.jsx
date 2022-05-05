import React, { useEffect } from 'react';
import '../Supports/Stylesheets/Utils.css'
import Logo from '../Supports/Assets/Icons/Upperture Logo.svg'
import GoogleLogo from '../Supports/Assets/Icons/Brands/GoogleLogo.png'
import RegisterModal from '../Components/RegisterModal'
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
    const [showPassword, setShowPassword] = React.useState(false)
    const [redirect, setRedirect] = React.useState(false)

    const dispatch = useDispatch()
    const {username, email} = useSelector(state => state.userReducer)
    console.log(username, email)

    const initialValues = {
        usernameOrEmail: '',
        password: '',
      }
      
      const onSubmit = (values, submitProps) => {
        // console.log(submitProps.setSubmitting)
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
        return(  
            <Navigate to='/home' />
        )
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
            <div id='jumbotron' className='d-flex justify-content-center align-items-center'>
                <div id='jumbotron-text-wrapper' className='d-flex justify-content-center align-items-center'>
                <p id='jumbotron-text'>Upload and share your memorable moments.</p>
                </div>
            </div>
            <div id='login-pane'>
                <img src={Logo} alt="logo" />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    enableReinitialize
                    validateOnMount
                    >
                 {formik => {
                     console.log(formik.isValid + 'ini issubmitting ->' + formik.isSubmitting)
                    return (
                <Form id='login-box'>
                    <div className="upperture-form">
                    <Field className='upperture-input' type="text" id='usernameOrEmail' name='usernameOrEmail' placeholder=' ' maxLength='320'/>
                        <label className='upperture-input-label' htmlFor='usernameOrEmail'>Username or email</label>
                        <ErrorMessage name='usernameOrEmail'>
                            {error => <div className='upperture-error-message' style={{fontSize:'12px'}}>{error}</div>}
                        </ErrorMessage>
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
                    </div>
                    <button className='upperture-submit-button'
                    type='submit'
                    disabled={!formik.isValid || formik.isSubmitting}
                    onClick={() => onSubmit()}>
                    Log in</button>
                    <div className='d-flex justify-content-center align-items-center'>
                        <img src={GoogleLogo} alt="Google" id='google-logo' className='upperture-pointer'/>
                        <p className='main-dark upperture-pointer' id='login-with-google'>Log in with Google</p>
                    </div>
                    <p id='upperture-forgot-password' className='upperture-pointer'>Forgot password?</p>
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
    );
}

export default LandingPage;