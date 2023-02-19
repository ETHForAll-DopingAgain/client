import React from 'react'
import { useState } from 'react'

const StartStream = () => {
  const [streamName, setStreamName] = useState('form')
  const handleSubmit = (e) => {
    setStreamName(e);
  }
  if(streamName === 'form') {
  return (
    <>
      <div className='startStream' style={{
        width: '100%',
        height: '90%',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: '2rem',
        border : '0.01px black',
        boxShadow: '0 0 30px 0 rgba(0,0,0,0.25)',
      }}>

        <div className='startStream__title' style={{
          width: '100%',
          height: '10%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '3rem',
          fontWeight: 'bold',
        }}>
          Enter Stream Details
        </div>

        <form className='startStream__form' onSubmit={handleSubmit} style={{
          width: '100%',
          height: '80%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>

          <input className='startStream__form__input' type='text' placeholder='Stream Name' style={{
            width: '30%',
            height: '10%',
            borderRadius: '1rem',
            marginTop: '3rem',
            border: '0.01px black',
            fontSize: '1.5rem',
            paddingLeft: '1rem',
          }} />

          <input className='startStream__form__input' type='text' placeholder='Cost' style={{
            width: '30%',
            height: '10%',
            marginTop: '3rem',
            borderRadius: '1rem',
            border: '0.01px black',
            fontSize: '1.5rem',
            paddingLeft: '1rem',
          }} />

          <button className='startStream__form__button' type='submit' style={{
            width: '30%',
            height: '10%',
            borderRadius: '2rem',
            marginTop: '3rem',
            border: '0.01px black',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            backgroundColor: '#FC1503',
            color: 'white',
          }}>
            Start Stream
          </button>
        </form>

      </div>
    </>
  )
  } else{
    return (
    <>
      <div className='startStream' style={{
        width: '100%',
        height: '90%',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: '2rem',
        border : '0.01px black',
        boxShadow: '0 0 30px 0 rgba(0,0,0,0.25)',
      }}>        

        <div className='stream_details' style={{
          width: '100%',
          height: '10%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '3rem',
          fontWeight: 'bold',
        }}>
          Stream Details
        </div>

        <div className='stream_details__details' style={{
          width: '40%',
          height: '80%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div className='stream_details__details__name' style={{
            width: '100%',
            height: '10%',
            borderRadius: '1rem',
            marginTop: '3rem',
            border: '0.01px black',
            fontSize: '1.5rem',
            paddingLeft: '1rem',
          }}>
            <span style={{color: 'red', fontWeight: 'bold'}}>Stream Server:</span> rtmp://rtmp.livepeer.com/live
          </div>

          <div className='stream_details__details__cost' style={{
            width: '30%',
            height: '10%',
            marginTop: '3rem',
            borderRadius: '1rem',
            border: '0.01px black',
            fontSize: '1.5rem',
            paddingLeft: '1rem',
          }}>
            <span style={{color: 'red', fontWeight: 'bold'}}>Cost:</span> 69.69
          </div>
        </div>

      </div>
    </>
  )
  }

}

export default StartStream