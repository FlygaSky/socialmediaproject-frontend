import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../redux/actions/postActions';
import CloseIcon from '../Supports/Assets/Icons/User Interface/Close.svg'
import imageIcon from '../Supports/Assets/Icons/Multimedia/image.svg'
import CropperModal from '../Components/Crop/CropEasy'

function UploadModal(props) {
    const [openCropper, setOpenCropper] = useState(false)
    const [imageURL, setImageURL] = useState('')
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('')
    const dispatch = useDispatch()

    const onImagesValidation = (e) => {
        try {
            let file = [...e.target.files]
            setFile(file[0])
            if(file.length > 1) throw { message: 'You can only upload 1 image' }
            if(file[0].size > 5000000) throw { message: 'Your file size is too big (>5mb)' }
            if(!file[0].type.includes('image'))  throw { message: 'This file type is not supported'}
            const reader = new FileReader();
            reader.onload = () =>{
              if(reader.readyState === 2){
                setImageURL(reader.result)
                }
            }
            reader.readAsDataURL(file[0])
            setErrorMessage('')
            setOpenCropper(true)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <div id='register-modal-container' onClick={() => dispatch(closeModal())}>
            {
                openCropper && <CropperModal  modalOpen={openCropper} setModalOpen={setOpenCropper} photoURL={imageURL} setPhotoURL={setImageURL} setFile={setFile}/>
            }
            <div id='register-modal' style={{height:'330px', width:'400px'}} onClick={e => {e.stopPropagation()}}>
                <img className='upperture-close-icon upperture-pointer' src={CloseIcon} alt="close"  onClick={() => dispatch(closeModal())}/>
                <p style={{fontWeight:'bold', fontSize:'28px'}}>Create new post</p>
                <img src={imageIcon} alt="" style={{height:'75px', marginBottom:'20px', filter: 'invert(22%) sepia(14%) saturate(129%) hue-rotate(114deg) brightness(96%) contrast(91%)'}} />
                <form method="POST" action="/upload" encType='multipart/form-data'>
                    <input type="file" name='photo' accept="image/*" id="image-input" style={{display: 'none'}} onChange={(e) => onImagesValidation(e)} />
                </form>
                <label htmlFor='image-input' style={{padding:'15px 30px', fontSize:'16px', backgroundColor:'#2ef3b8', borderRadius:'10px', cursor:'pointer', fontFamily: `"Poppins", sans-serif`}}>Choose your image</label>
                {
                    errorMessage && <p style={{margin: '10px', color: '#f0547b', fontSize:'14px'}}>{errorMessage}</p>

                }
            </div>
        </div>
    );
}

export default UploadModal;