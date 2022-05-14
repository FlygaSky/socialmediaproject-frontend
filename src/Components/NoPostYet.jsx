import React from 'react';
import Desert from '../Supports/Assets/Icons/Weather/desert.png'

function NoPostYet() {
    return (
        <div style={{width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <img style={{width:'150px', filter: 'invert(22%) sepia(14%) saturate(129%) hue-rotate(114deg) brightness(96%) contrast(91%)'}} src={Desert} alt="" />            
                <p style={{marginTop:'20px', fontSize:'24px'}}>No post yet :c</p>
        </div>
    );
}

export default NoPostYet;