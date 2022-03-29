import React from 'react';
import Navpane from '../Components/Navpane';
import CommentsWhite from '../Supports/Assets/Icons/Chat/chat.png'

function Profile(props) {
    return (
        <div className='d-flex'>
           <Navpane />
           <div className='page-container'>
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
                        <img className='home-post-picture' src={require(`../Supports/Assets/Posts/Rafael-Cerqueira/pexels-rafael-cerqueira-4737459.jpg`)} alt="sunset" />
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
           </div>
        </div>
    );
}

export default Profile;