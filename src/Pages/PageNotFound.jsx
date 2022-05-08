import React from 'react';
import { NavLink } from 'react-router-dom';

function PageNotFound(props) {
    return (
        <div style={{width: "100vw", height: "100vh", backgroundColor: "#effffa"}}>
        <div className="row justify-content-center align-items-center" style={{height: '100vh'}}>
            <div className="text-center border border-dark px-5 py-5 rounded" style={{minWidth: '300px', maxWidth: '500px'}}>
                <h1>404 page not found</h1>
                <br/>
                <NavLink to="/home" style={{textDecoration: "none"}}>
                    <h5 style={{color: "#2ef3b8"}}>Go back to home</h5>
                </NavLink>
            </div>
        </div>
    </div>
    );
}

export default PageNotFound;