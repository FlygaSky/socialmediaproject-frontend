import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { useDispatch, useSelector } from 'react-redux';
import getCroppedImg from './utils/cropImage';
import { closeModal } from '../../redux/actions/postActions';
import LeftArrow from '../../Supports/Assets/Icons/Arrows/left arrow.svg'
import Swal from 'sweetalert2';
import axios from 'axios';
import { API_URL } from '../../Supports/Functions/helper';
import { changeProfilePic } from '../../redux/actions/userActions';

const CropEasy = ({ photoURL, setModalOpen, setPhotoURL, setFile }) => {
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
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels
      );
      setPhotoURL(url);
      var newFile = new File([file], "image", { type: "image/jpeg"})
      console.log(newFile)
      setFile(newFile);
      const formData = new FormData();
      formData.append("photo", newFile)
      formData.append("users_id", id)
        axios.post(`${API_URL}/user/editprofilepic`, 
        formData,
        {
          headers: {
          authorization: token,
          }
        }
        ).then((res) => {
          setLoading(false);
          setModalOpen(false)
          console.log(res.data)
          dispatch(changeProfilePic(res.data.image))
          Swal.fire({
            title: 'Success!',
            text: 'Your profile picture is updated.',
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
      alignItems: 'center'}} onClick={() => setModalOpen(false)}>
      <div style={{
        width: '600px',
        height: '560px',
        padding: '0px 4vw',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }} onClick={e => {e.stopPropagation()}}>
      <img className='upperture-close-icon upperture-pointer' src={LeftArrow} alt="close"  onClick={() => setModalOpen(false)}/>
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
            <input type="range" className="form-range" min="1" max="3" step="0.1" style={{width:'100%'}} value={zoom} onChange={(event) => setZoom(event.target.value)} />
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
              name='photo'
              onClick={cropImage}
              disabled={loading}
            >
              Crop and save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropEasy;