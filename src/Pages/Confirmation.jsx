import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams, Navigate } from 'react-router-dom'

// SweetAlert
import Swal from 'sweetalert2';
import { API_URL } from '../Supports/Functions/helper';
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    // didOpen: (toast) => {
    //   toast.addEventListener('mouseenter', Swal.stopTimer)
    //   toast.addEventListener('mouseleave', Swal.resumeTimer)
    // }
})

const Confirmation = () => {

    const [isRedirect, setIsRedirect] = useState(false)

    let params = useParams();

    const [message, setMessage] = useState('')

    useEffect(() => {
        onConfirmation()
    }, [])

    const onConfirmation = () => {
        Axios.patch(API_URL + '/user/confirmation', {}, {headers: {
            'Authorization': params.token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }})
        .then((res) => {
            Toast.fire({
                icon: 'success',
                title: res.data.message
            })
            setIsRedirect(true)
            localStorage.setItem('myTkn', params.token)
        })
        .catch((err) => {
            setMessage(err.response.data.message)
            Toast.fire({
                icon: 'error',
                title: err.response.data.message
            })
        })
    }

    if(isRedirect){
        return(  
            <Navigate to='/home' />
        )
    }

    return(
        <div className="container">
            <div className="row justify-content-center align-items-center" style={{height: '100vh'}}>
                <div className="col-5 text-center border border-primary px-5 py-5 rounded">
                        {
                            message ? 
                            <h1>{message}</h1> : 
                            <div>
                                <h1>Welcome to Upperture!</h1>
                                <p style={{fontSize: '20px'}}>
                                    Enjoy your stay                                </p>
                            </div>
                        }
                </div>
            </div>
        </div>
    )
}

export default Confirmation