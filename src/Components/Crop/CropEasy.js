import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { useDispatch, useSelector } from 'react-redux';
import getCroppedImg from './utils/cropImage';
import { closeModal } from '../../redux/actions/postActions';
import CloseIcon from '../../Supports/Assets/Icons/User Interface/Close.svg'
import Swal from 'sweetalert2';
import axios from 'axios';
import { API_URL } from '../../Supports/Functions/helper';

const CropEasy = ({ photoURL, setOpenModal, setPhotoURL, setFile }) => {
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [caption, setCaption] = useState('')
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const {id} = useSelector(state => state.userReducer)
  const token = localStorage.getItem('myTkn')
  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    setLoading(true);
    try {
      if(caption == '') {
        setLoading(false)
        return Swal.fire({
          title: 'Oops!',
          text: 'Caption can not be empty.',
          icon: 'error',
          confirmButtonText: 'Okay!',
          confirmButtonColor: '#f0547b'
        })
      }
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels
      );
      setPhotoURL(url);
      setFile(file);
      const formData = new FormData();
      formData.append("file", file)
      formData.append("upload_preset", "m7iklks3")
      axios.post(
        `https://api.cloudinary.com/v1_1/dfyxkbcgc/image/upload`,
        formData
      ).then((response) => {
        const fileName = response.data.public_id;

        axios.post(`${API_URL}/posts/upload`, 
        {
          caption: caption,
          image: fileName,
          users_id: id
        },
        {
          headers: {
          authorization: token,
          }
        }
        ).then(() => {
          setLoading(false);
          dispatch(closeModal())
          Swal.fire({
            title: 'Success!',
            text: 'You can view your post at home or your profile.',
            icon: 'success',
            confirmButtonText: 'Okay!',
            confirmButtonColor: '#369a7c'
          })
        }).catch ((error) => {
          setLoading(false);
          dispatch(closeModal())
          Swal.fire({
            title: 'Something went wrong',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Okay!',
            confirmButtonColor: '#f0547b'
          })
        })
      })
    } catch (error) {
      setLoading(false);
      dispatch(closeModal())
      Swal.fire({
        title: 'Something went wrong',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Okay!',
        confirmButtonColor: '#f0547b'
      })
      console.log(error);
    }
  }

  const zoomPercent = (value) => {
    return Math.round(value * 100)
  }

  return (
    <div style={{ position: 'fixed',
      top: '0px',
      left: '0px',
      width: '100vw',
      height: '100vh',
      zIndex: '100',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'}} onClick={() => dispatch(closeModal())}>
      <div style={{
         width: '80%',
         maxWidth: '900px',
         minWidth: '400px',
         height: '560px',
         padding: '0px 4vw',
         backgroundColor: 'white',
         borderRadius: '20px',
         display: 'flex',
         position: 'relative'
      }} onClick={e => {e.stopPropagation()}}>
      <img className='upperture-close-icon upperture-pointer' src={CloseIcon} alt="close"  onClick={() => dispatch(closeModal())}/>
        <div style={{
          width:'66.66%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'}}>
        <div style={{height:'380px', width:'100%', position:'relative'}}>
          <Cropper
            image={photoURL}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={cropComplete}
            height='200px'
          />
        </div>
        <div>
          <div style={{width:'350px', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <p style={{margin:'10px 0px 0px'}}>Zoom: {`${zoomPercent(zoom)}%`}</p>
            <input type="range" class="form-range" min="1" max="3" step="0.1" style={{width:'100%'}} value={zoom} onChange={(event) => setZoom(event.target.value)} />
          </div>
          <div
            style={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <button
              className='upperture-submit-button'
              onClick={cropImage}
              disabled={loading}
            >
              Crop and submit
            </button>
          </div>
        </div>
        </div>
        <div style={{
          width:'33.33%',
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'center',
          alignItems: 'center'}}>
            <p style={{marginLeft: '4rem', marginTop: '23px', width:'100%', textAlign:'center', padding:'10px', fontWeight:'bold', border:'2px solid black'}}>
              Add your caption
            </p>
            <textarea style={{
              width: '100%',
              height: '435px',
              backgroundColor: '#f3f3f3',
              border: 'none',
              fontFamily: `"Poppins", sans-serif`,
              fontSize: '14px',
              padding: '0.5rem',
              marginLeft: '4rem',
              resize: 'none'
            }}
            placeholder='Enter your caption here (max 300 characters)'
            maxLength={300}
            onChange={(event) => setCaption(event.target.value)}/>
        </div>
      </div>
    </div>
  );
};

export default CropEasy;