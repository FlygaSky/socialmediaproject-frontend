import React, { useState } from 'react';
import CloseIcon from '../Supports/Assets/Icons/User Interface/Close.svg'

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
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
})

 
function ForgotPassword(props) {
    const [loading, setLoading] = useState(false)
    const initialValues = {
        email: '',
      }
      
    const onSubmit = async(values, submitProps) => {
        submitProps.setSubmitting(true)
        setLoading(true)
        let email = values.email
        console.log(email)

        await axios.post(API_URL + '/user/getemail', { email })
        .then((res) => {
            submitProps.setSubmitting(false)
            setLoading(false)
            return Toast.fire({
                icon: 'error',
                title: 'Email not registered yet'
            })
        })
        .catch((err) => {
            sendMail()
        })

        function sendMail() {
            axios.post(API_URL + '/user/sendresetpasswordmail', { email })
            .then((res) => {
                props.setModalOpen(false)
                Swal.fire({
                    title: 'Email sent!',
                    text: 'Check your email for the link to reset your password.',
                    icon: 'success',
                    confirmButtonText: 'Okay!',
                    confirmButtonColor: '#369a7c'
                })
                submitProps.setSubmitting(false)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                Swal.fire({
                    title: 'Something went wrong :(',
                    text: err.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Okay!',
                    confirmButtonColor: '#f0547b'
                })
                submitProps.setSubmitting(false)
                setLoading(false)
            })
        }
    }

      const validationSchema = Yup.object({
        email: Yup
            .string()
            .email('Invalid email format')
            .required('This field is required')
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
            <Form id='register-modal' onClick={e => {e.stopPropagation()}} style={{height:'400px'}}>
                <img className='upperture-close-icon upperture-pointer' src={CloseIcon} alt="close"  onClick={() => props.setModalOpen(false)}/>
                <p id='create-your-account'>Forgot password?</p>
                <p id='upperture-forgot-password' style={{marginBottom:'15px'}}>
                            Enter your registered email below so we can send you a link to reset your password:</p>
                <div class="upperture-form">
                    <Field className='upperture-input' type="text" id='email' name='email' placeholder=' ' maxLength='320'/>
                    <label className='upperture-input-label' htmlFor='email'>Email</label>
                    <ErrorMessage name='email'>
                        {error => <div className='upperture-error-message'>{error}</div>}
                    </ErrorMessage>
                </div>
                <button className='upperture-submit-button'
                    type='submit'
                    disabled={!formik.isValid || formik.isSubmitting || loading}
                    style={{margin:'30px 0px'}}> 
                    Submit email</button>
            </Form>
                    )}}
        </Formik>
        </div>
    );
}


export default ForgotPassword;