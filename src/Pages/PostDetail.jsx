import React from 'react';
import Navpane from '../Components/Navpane';
import PaperPlane from '../Supports/Assets/Icons/User Interface/Paper Plane.svg'

function PostDetail(props) {
    return (
        <div className='d-flex'>
            <Navpane />
            <div className='page-container detail-page-container upperture-bg-medium-grey justify-content-around' style={{padding: '5vw'}}>
                <div id='detail-container'>
                    <div id='detail-container-left'>
                        <div id='detail-image-container'>
                            <img id='detail-image' src={require(`../Supports/Assets/Posts/Rafael-Cerqueira/pexels-rafael-cerqueira-4737459.jpg`)} alt="post" />
                        </div>
                    </div>
                    <div id='detail-container-right'>
                        <div className='detail-header-and-caption'>
                            <div className='detail-header-container'>
                                <div className='d-flex post-detail-left'>
                                    <img className='post-profile-pic' src={require(`../Supports/Assets/Profile Pics/rafael-cerqueira.jpeg`)} alt="profile-pic" />
                                    <div className='d-flex flex-column'>
                                        <p className='post-name'>incrediblerafa</p>
                                        <p className='post-date'>28 March 2022</p>
                                    </div>
                                </div>
                                <div className='d-flex post-detail-right'>
                                    <img className='post-heart' src={require(`../Supports/Assets/Icons/User Interface/HeartOutline.png`)} alt="profile-pic" />
                                    <p className='post-number-of-likes'>3</p>
                                </div>
                            </div>
                        </div>
                        <div id='comments-container'>
                            <div className='d-flex mb-3'>
                                <img className='comment-profile-pic' src={require(`../Supports/Assets/Profile Pics/rafael-cerqueira.jpeg`)} alt="profile-pic" />
                                <div className='comment-container'>
                                    <p className='comment-text'>
                                        <b>incrediblerafa</b> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Sociis natoque penatibus et maer.
                                    </p>
                                    <p className='comment-date'>2 April 2022</p>
                                </div>
                            </div>
                            <div className='d-flex mb-3'>
                                <img className='comment-profile-pic' src={require(`../Supports/Assets/Profile Pics/dids-186.jpeg`)} alt="profile-pic" />
                                <div className='comment-container'>
                                    <p className='comment-text'>
                                        <b>dids</b> this is a comment.
                                    </p>
                                    <p className='comment-date'>2 April 2022</p>
                                </div>
                            </div>
                            <div className='d-flex mb-3'>
                                <img className='comment-profile-pic' src={require(`../Supports/Assets/Profile Pics/dids-186.jpeg`)} alt="profile-pic" />
                                <div className='comment-container'>
                                    <p className='comment-text'>
                                        <b>dids</b> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Sociis natoque penatibus et maer.
                                    </p>
                                    <p className='comment-date'>2 April 2022</p>
                                </div>
                            </div>
                            <div className='d-flex mb-3'>
                                <img className='comment-profile-pic' src={require(`../Supports/Assets/Profile Pics/dids-186.jpeg`)} alt="profile-pic" />
                                <div className='comment-container'>
                                    <p className='comment-text'>
                                        <b>dids</b> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                                    </p>
                                    <p className='comment-date'>2 April 2022</p>
                                </div>
                            </div>
                            <div className='d-flex mb-3'>
                                <img className='comment-profile-pic' src={require(`../Supports/Assets/Profile Pics/dids-186.jpeg`)} alt="profile-pic" />
                                <div className='comment-container'>
                                    <p className='comment-text'>
                                        <b>dids</b> this is a comment.
                                    </p>
                                    <p className='comment-date'>2 April 2022</p>
                                </div>
                            </div>
                            <div className='d-flex mb-3'>
                                <img className='comment-profile-pic' src={require(`../Supports/Assets/Profile Pics/dids-186.jpeg`)} alt="profile-pic" />
                                <div className='comment-container'>
                                    <p className='comment-text'>
                                        <b>dids</b> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Sociis natoque penatibus et maer.
                                    </p>
                                    <p className='comment-date'>2 April 2022</p>
                                </div>
                            </div>
                        </div>
                        <div className='write-comment-container'>
                        <textarea className='comment-input' maxLength={300} placeholder='Write your comment... (max 300 characters)' />
                        <div className='comment-submit-area'>
                            <img className='comment-submit-button' src={PaperPlane} alt="submit" />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;