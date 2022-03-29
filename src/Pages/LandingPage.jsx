import React from 'react';
import '../Supports/Stylesheets/Utils.css'
import Logo from '../Supports/Assets/Icons/Upperture Logo.svg'
import GoogleLogo from '../Supports/Assets/Icons/Brands/GoogleLogo.png'
import RegisterModal from '../Components/RegisterModal'

function LandingPage(props) {
    return (
        <div className='d-flex'>
            <RegisterModal />
            <div id='jumbotron' className='d-flex justify-content-center align-items-center'>
                <div id='jumbotron-text-wrapper' className='d-flex justify-content-center align-items-center'>
                <p id='jumbotron-text'>Upload and share your best moments.</p>
                </div>
            </div>
            <div id='login-pane'>
                <img src={Logo} alt="logo" />
                <div id='login-box'>
                    <input className='upperture-input' type="text" placeholder='Username or email'/>
                    <input className='upperture-input' type="text" placeholder='Password'/>
                    <button className='upperture-submit-button'>Log in</button>
                    <div className='d-flex justify-content-center align-items-center'>
                        <img src={GoogleLogo} alt="Google" id='google-logo'/>
                        <p className='main-dark' id='login-with-google'>Log in with Google</p>
                    </div>
                    <p className='upperture-error-message'></p>
                    <p id='upperture-forgot-password'>Forgot password?</p>
                </div>
                <div className='d-flex'>
                    <p className='upperture-main-dark upperture-font-size-18 upperture-font-weight-600'>Don't have an account?</p>
                    <p className='upperture-main-highlight upperture-font-size-18 ms-2 upperture-font-weight-600'>Sign up</p>
                </div>
                <div className='d-flex justify-content-center mt-4'>
                    <span className='upperture-dark-grey upperture-font-size-12 mb-0 mx-2'>Terms of Service</span>
                    <span className='upperture-dark-grey upperture-font-size-12 mb-0 mx-2'>Privacy Policy</span>
                    <span className='upperture-dark-grey upperture-font-size-12 mb-0 mx-2'>Cookie Policy</span>
                </div>
                <div className='d-flex justify-content-center'>
                    <span className='upperture-dark-grey upperture-font-size-12 mb-0 mx-2'>Cookie Policy</span>
                    <span className='upperture-dark-grey upperture-font-size-12 mb-0 mx-2'>Accessibility</span>
                    <span className='upperture-dark-grey upperture-font-size-12 mb-0 mx-2'>Ads info</span>
                </div>
                <p className='upperture-dark-grey upperture-font-size-12 my-0'>© 2022 Upperture, Inc.</p>


            </div>
        </div>
    );
}

export default LandingPage;