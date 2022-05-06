import React from 'react'
import Axios from 'axios'
import { NavLink } from 'react-router-dom'
import { API_URL } from '../Supports/Functions/helper';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../redux/actions/userActions';

const Confirmation = () => {
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch()

    const resendEmail = () => {    
        setLoading(true)
        let token = localStorage.getItem('myTkn')
            Axios.post(API_URL + '/user/resend', {}, {headers: {
                'Authorization': token,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }})
            .then((res) => {
                setLoading(false)
                Swal.fire({
                    title: 'New verification email Sent!',
                    text: `Check your email to verify your account.`,
                    icon: 'success',
                    confirmButtonText: 'Okay!',
                    confirmButtonColor: '#369a7c'
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return(
        <div style={{width: "100vw", height: "100vh", backgroundColor: "#effffa"}}>
            <div className="row justify-content-center align-items-center" style={{height: '100vh'}}>
                <div className="text-center border border-dark px-5 py-5 rounded" style={{minWidth: '300px', maxWidth: '500px'}}>
                    <h1>Oops!</h1>
                    <p style={{fontSize: '20px'}}>
                        Looks like you haven't verified your account yet. Check your email and verify your account to continue.
                    </p>
                    <br/>
                    <NavLink to="/" style={{textDecoration: "none"}}>
                        <h5 style={{color: "#2ef3b8"}} onClick={() => dispatch(logoutAction())}>Log in or sign up with another account</h5>
                    </NavLink>
                    <button className='upperture-submit-button' disabled={loading ? true : false} onClick={resendEmail}>Resend verification email</button>
                </div>
            </div>
        </div>
    )
}

export default Confirmation