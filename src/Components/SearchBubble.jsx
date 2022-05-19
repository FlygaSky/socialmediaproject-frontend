import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultPicture from '../Supports/Assets/Icons/Users/DefaultPicture.jpg'
import { useNavigate } from 'react-router-dom';
import { closeSearchBubble } from '../redux/actions/postActions';

function SearchBubble(props) {
    const {usersFromSearch} = useSelector(state => state.userReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div style={{position:'fixed', top:'0px', left:'0px', width:'100vw', height:'100vh', zIndex:'100'}} onClick={() => dispatch(closeSearchBubble())}>
            <div style={{position:'relative', width:'100vw', height:'100vh'}}>
                <div className="bubble" onClick={e => e.stopPropagation}>
                    {
                        usersFromSearch.length
                        ?
                        <div id='search-result-container'>
                            {
                                usersFromSearch.map((user) => {
                                    return <div className='d-flex mb-1'>
                                            <img src={user.image ? user.image : DefaultPicture} alt="" style={{borderRadius:'50%', width:'30px', height:'30px', zIndex:'3', cursor:'pointer'}}
                                                onClick={() => navigate(`/profile/${user.username}`)}/>
                                            <p style={{fontSize:'18px', marginLeft:'20px', marginTop:'1px', cursor:'pointer'}}
                                                onClick={() => navigate(`/profile/${user.username}`)}>
                                                {user.username}
                                            </p>
                                    </div>
                                })
                            }
                        </div>
                        :
                        <div style={{height:'100%', width:'100%', display:'flex',
                        justifyContent:'center', alignItems:'center',
                        fontSize:'18px', color: 'grey'}}>
                            No results found.
                        </div>
                    }
                </div>
                <div className="left-triangle"></div>
                <div className="bubble-blurred"></div>
                <div className="left-triangle-blurred"></div>
            </div>
        </div>
    );
}

export default SearchBubble;