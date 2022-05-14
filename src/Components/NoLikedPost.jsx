import React from 'react';
import SadHeart from '../Supports/Assets/Icons/User Interface/sadheart.webp'

function NoLikedPost() {
    return (
        <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div>
                <img style={{width:'220px', filter: 'invert(22%) sepia(14%) saturate(129%) hue-rotate(114deg) brightness(96%) contrast(91%)'}} src={SadHeart} alt="" />            
                <p style={{marginTop:'20px', fontSize:'24px'}}>No liked post yet  :c</p>
            </div>
        </div>
    );
}

export default NoLikedPost;