import React from 'react';
import Navpane from '../Components/Navpane';

function Settings(props) {
    const [username, setUsername] = React.useState("");

    let usernameChange = (event) => {
        let newUsername = event.target.value
        setUsername(newUsername)
    }
    return (
        <div className='d-flex'>
            <Navpane />
            <div className='page-container detail-page-container upperture-bg-medium-grey justify-content-around' style={{padding: '3vw'}}>
                <div id='settings-header-container'>
                    <h1>Settings</h1>
                </div>
                <div id='settings-container'>
                    <p className='m-0 upperture-main-dark'>Email: johndoe@example.com</p>
                    <p className='mt-0 mb-4 upperture-dark-grey upperture-font-size-14'>Email can not be changed</p>
                    <p className='mt-0 mb-4 upperture-main-dark'>Account status: verified</p>
                    <div className='d-flex justify-content-between' style={{width:'100%'}}>
                        <span>Change username</span>
                        {
                            username.length == 0 ? "" :
                            <span>{username.length}/20</span>
                        }
                    </div>
                    <input className='upperture-input' type="text" value='incrediblerafa' onChange={usernameChange} maxLength={20}/>
                    <p className='mt-4 mb-0 upperture-main-dark'>Change password</p>
                    <input className='upperture-input' type="password" placeholder='Old password'/>
                    <input className='upperture-input' type="password" placeholder='New password'/>
                    <input className='upperture-input' type="password" placeholder='Repeat new password'/>
                    <p className='upperture-font-size-10 upperture-dark-grey mb-4'>Password should contain at least 8 characters including an uppercase letter, a symbol, and a number</p>
                    <p className='mt-0 mb-4 upperture-main-dark'>Forgot password?</p>
                    <button className='upperture-submit-button'>Save</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;