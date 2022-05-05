import React from 'react';
import LogoNoText from '../Supports/Assets/Icons/camera-icon.png'
import CloseIcon from '../Supports/Assets/Icons/User Interface/Close.svg'
import ShowPassword from '../Supports/Assets/Icons/User Interface/ShowPassword.png'
import HidePassword from '../Supports/Assets/Icons/User Interface/HidePassword.png'
import {
    Formik,
    Form,
    Field,
    ErrorMessage
  } from 'formik'
  import * as Yup from 'yup'
  import axios from 'axios';
  import { API_URL } from '../Supports/Functions/helper';
import Swal from 'sweetalert2';
 
function RegisterModal(props) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);

    const initialValues = {
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
      }
      
    const onSubmit = (values, submitProps) => {
        submitProps.setSubmitting(true)
        let username = values.username
        let email = values.email
        let password = values.password 
            axios.post(API_URL + '/user/register', {username, email, password})
            .then((res) => {
                props.setModalOpen(false)
                submitProps.setSubmitting(false)
                submitProps.resetForm()
                Swal.fire({
                    title: 'Registration success!',
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'Okay!',
                    confirmButtonColor: '#369a7c'
                })
            })
            .catch((err) => {
                submitProps.setSubmitting(false)
                console.log(err)
            })
    }

      const validationSchema = Yup.object({
        username: Yup
            .string()
            .min(3, "Mininum 3 characters")
            .max(20, "Maximum 20 characters")
            .matches(
                /^[A-Za-z0-9_]+$/, "Username can only contain letters, numbers, or underscores"
                )
            .required('This field is required')
            .test('checkDuplUsername', 'Username already taken', function getUsername(username) {
                return new Promise((resolve, reject) => {
                    axios.post(API_URL + '/user/getusername', {username})
                    .then(() => {
                        resolve(true)
                    }).catch(() => {
                        resolve(false)
                    })
                })
            }),
        email: Yup
            .string()
            .email('Invalid email format')
            .required('This field is required')
            .test('checkDuplEmail', 'Email already registered', function getEmail(email) {
                return new Promise((resolve, reject) => {
                    axios.post(API_URL + '/user/getemail', {email})
                    .then(() => {
                        resolve(true)
                    }).catch(() => {
                        resolve(false)
                    })
                })
            }),
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
        <div id='register-modal-container' onClick={() => props.setModalOpen(false)}>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
            validateOnMount
            >
                 {formik => {
                    return (
            <Form id='register-modal' onClick={e => {e.stopPropagation()}}>
                <img className='upperture-close-icon upperture-pointer' src={CloseIcon} alt="close"  onClick={() => props.setModalOpen(false)}/>
                <img id='upperture-logo-register-no-text' src={LogoNoText} alt="logo" />
                <p id='create-your-account'>Create your account</p>
                <div class="upperture-form">
                    <Field className='upperture-input' type="text" id='username' name='username' placeholder=' ' maxLength='20'/>
                    <label className='upperture-input-label' htmlFor='username'>Username</label>
                    <ErrorMessage name='username'>
                        {error => <div className='upperture-error-message'>{error}</div>}
                    </ErrorMessage>
                </div>
                <div class="upperture-form">
                    <Field className='upperture-input' type="text" id='email' name='email' placeholder=' ' maxLength='320'/>
                    <label className='upperture-input-label' htmlFor='email'>Email</label>
                    <ErrorMessage name='email'>
                        {error => <div className='upperture-error-message'>{error}</div>}
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
                        {error => <div className='upperture-error-message'>{error}</div>}
                    </ErrorMessage>
                </div>
                <div className="upperture-form">
                    <Field className='upperture-input upperture-password' type={showRepeatPassword ? "text" : "password"} id='repeatPassword' name='repeatPassword' placeholder=' '/>
                    <label className='upperture-input-label' htmlFor='repeatPassword'>Repeat password</label>
                    {
                        showRepeatPassword ? 
                        <img className='upperture-password-icon upperture-pointer' src={HidePassword} alt="hide" onClick={() => setShowRepeatPassword(false)}/>  :
                        <img className='upperture-password-icon upperture-pointer' src={ShowPassword} alt="show" onClick={() => setShowRepeatPassword(true)}/> 
                    }
                    <ErrorMessage name='repeatPassword'>
                        {error => <div className='upperture-error-message'>{error}</div>}
                    </ErrorMessage>
                </div>
                <p className='upperture-font-size-10 upperture-dark-grey'>Password should contain at least 8 characters including an uppercase letter, a lowercase letter, a symbol, and a number</p>
                <button className='upperture-submit-button'
                    type='submit'
                    disabled={!formik.isValid || formik.isSubmitting}>
                    Sign up</button>
            </Form>
                    )}}
        </Formik>
        </div>
    );
}


export default RegisterModal;