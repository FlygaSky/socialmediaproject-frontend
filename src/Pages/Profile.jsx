import React from 'react';
import { Link } from 'react-router-dom';
import EditProfile from '../Components/EditProfile';
import Navpane from '../Components/Navpane';
import CommentsWhite from '../Supports/Assets/Icons/Chat/chat.png'

function Profile(props) {
    const [openEditProfile, setOpenEditProfile] = React.useState(false)
    
    const linkStyle = {
        textDecoration: 'none',
        display: 'inline'
      };

    return (
        <div className='d-flex'>
           <Navpane />
           {
               openEditProfile && <EditProfile modalOpen={openEditProfile} setModalOpen={setOpenEditProfile} />
           }
           <div className='page-container'>
                <div id='profile-header-container'>
                    <div className='d-flex'>
                        <img id='profile-pic' src={require(`../Supports/Assets/Profile Pics/rafael-cerqueira.jpeg`)} alt="rafael-cerqueira" />
                        <div id='profile-name-container' className='d-flex flex-column justify-content-center'>
                            <p id='profile-username'>incrediblerafa</p>
                            <p id='profile-name'>Rafael Cerqueira</p>
                        </div>
                    </div>
                    <div id='profile-bio-container'>
                        <p className='profile-bio'>Go extreme. There's no turning back!</p>
                        <p className='profile-bio'>Architect • Photographer • DOP • Journalist</p>
                        <button className='edit-profile-button'
                        onClick={() => setOpenEditProfile(true)}>Edit profile</button>
                    </div>
                </div>
                <div className='home-post-container'>
                    <div style={{position: "relative", width: "100%"}}>
                        <img className='home-post-picture' src={require(`../Supports/Assets/Posts/Rafael-Cerqueira/pexels-rafael-cerqueira-4737454.jpg`)} alt="sunset" />
                        <div className='post-overlay'>
                            <div className='d-flex justify-content-center align-items-center'>
                                <img className='heart-white' src={require(`../Supports/Assets/Icons/User Interface/HeartWhite.png`)} alt="heart" />
                                <p className='number-of-likes-comments-white'>3</p>
                                <img className='comment-white' src={CommentsWhite} alt="comments" />
                                <p className='number-of-likes-comments-white'>0</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-post-container'>
                    <div style={{position: "relative", width: "100%"}}>
                        <img className='home-post-picture' src={require(`../Supports/Assets/Posts/Rafael-Cerqueira/pexels-rafael-cerqueira-4737455.jpg`)} alt="sunset" />
                        <div className='post-overlay'>
                            <div className='d-flex justify-content-center align-items-center'>
                                <img className='heart-white' src={require(`../Supports/Assets/Icons/User Interface/HeartWhite.png`)} alt="heart" />
                                <p className='number-of-likes-comments-white'>3</p>
                                <img className='comment-white' src={CommentsWhite} alt="comments" />
                                <p className='number-of-likes-comments-white'>0</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-post-container'>
                    <div style={{position: "relative", width: "100%"}}>
                        <img className='home-post-picture' src={require(`../Supports/Assets/Posts/Rafael-Cerqueira/pexels-rafael-cerqueira-4737487.jpg`)} alt="sunset" />
                        <div className='post-overlay'>
                            <div className='d-flex justify-content-center align-items-center'>
                                <img className='heart-white' src={require(`../Supports/Assets/Icons/User Interface/HeartWhite.png`)} alt="heart" />
                                <p className='number-of-likes-comments-white'>3</p>
                                <img className='comment-white' src={CommentsWhite} alt="comments" />
                                <p className='number-of-likes-comments-white'>0</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-post-container'>
                    <div style={{position: "relative", width: "100%"}}>
                        <img className='home-post-picture' src={require(`../Supports/Assets/Posts/Rafael-Cerqueira/pexels-rafael-cerqueira-4737482.jpg`)} alt="sunset" />
                        <div className='post-overlay'>
                            <div className='d-flex justify-content-center align-items-center'>
                                <img className='heart-white' src={require(`../Supports/Assets/Icons/User Interface/HeartWhite.png`)} alt="heart" />
                                <p className='number-of-likes-comments-white'>3</p>
                                <img className='comment-white' src={CommentsWhite} alt="comments" />
                                <p className='number-of-likes-comments-white'>0</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-post-container'>
                    <div style={{position: "relative", width: "100%"}}>
                        <img className='home-post-picture' src={require(`../Supports/Assets/Posts/Rafael-Cerqueira/pexels-rafael-cerqueira-4737484.jpg`)} alt="sunset" />
                        <div className='post-overlay'>
                            <div className='d-flex justify-content-center align-items-center'>
                                <img className='heart-white' src={require(`../Supports/Assets/Icons/User Interface/HeartWhite.png`)} alt="heart" />
                                <p className='number-of-likes-comments-white'>3</p>
                                <img className='comment-white' src={CommentsWhite} alt="comments" />
                                <p className='number-of-likes-comments-white'>0</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='home-post-container'>
                    <div style={{position: "relative", width: "100%"}}>
                        <Link to='/detail' style={linkStyle}>
                            <img className='home-post-picture' src={require(`../Supports/Assets/Posts/Rafael-Cerqueira/pexels-rafael-cerqueira-4737459.jpg`)} alt="sunset" />
                            <div className='post-overlay'>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <img className='heart-white' src={require(`../Supports/Assets/Icons/User Interface/HeartWhite.png`)} alt="heart" />
                                    <p className='number-of-likes-comments-white'>3</p>
                                    <img className='comment-white' src={CommentsWhite} alt="comments" />
                                    <p className='number-of-likes-comments-white'>0</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

           </div>
        </div>
    );
}

export default Profile;