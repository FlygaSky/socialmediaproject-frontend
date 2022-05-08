import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams, Navigate, NavLink } from 'react-router-dom'
// SweetAlert
import Swal from 'sweetalert2';
import { API_URL } from '../Supports/Functions/helper';
import { useDispatch } from 'react-redux';
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
})

const Confirmation = () => {

    const [isRedirect, setIsRedirect] = useState(false)
    const dispatch = useDispatch()
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
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: res.data
            })
            setTimeout(() => setIsRedirect(true), 5000)
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
        <div style={{width: "100vw", height: "100vh", backgroundColor: "#effffa"}}>
            <div className="row justify-content-center align-items-center" style={{height: '100vh'}}>
                <div className="col-4 text-center border border-dark px-5 py-5 rounded">
                        {
                            message ? 
                            <div>
                                <h1>{message}</h1>
                                <br/>
                                <NavLink to={localStorage.getItem('myTkn') ? "/home" : "/"} style={{textDecoration: "none"}}>
                                    <h4 style={{color: "#2ef3b8"}}>Go back to home</h4>
                                </NavLink>
                            </div>
                             : 
                            <div>
                                <h1>Welcome to Upperture!</h1>
                                <p style={{fontSize: '20px'}}>
                                    You will be redirected to Upperture's home page. Enjoy your stay :D
                                </p>
                            </div>
                        }
                </div>
            </div>
        </div>
    )
}

export default Confirmation