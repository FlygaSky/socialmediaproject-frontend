import React from 'react';
import UppertureLogo from '../Supports/Assets/Icons/camera-icon.png'

function Loading() {
    return (
        <div id='loading-container'>
            <img src={UppertureLogo} alt=""
             id='upperture-loading-spinner' />
        </div>
    );
}

export default Loading;