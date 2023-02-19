
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import Loader from '../components/Loader';

const StartStream = () => {
  const [streamType, setStreamType] = useState('form');
  const [streamName, setStreamName] = useState();
  const [streamCost, setStreamCost] = useState(0);
  const [streamKey, setStreamKey] = useState();
  const [streamID, setStreamID] = useState();
  const handleSubmit = async (e) => {
    setStreamType('hogyi stream');
    console.log(streamName, streamCost);

    const yeah = await axios.post(
      'https://livepeer.studio/api/stream',
      {
        "name": streamName,
        "profiles": [
          {
            "name": "720p",
            "bitrate": 2000000,
            "fps": 30,
            "width": 1280,
            "height": 720
          },
          {
            "name": "480p",
            "bitrate": 1000000,
            "fps": 30,
            "width": 854,
            "height": 480
          },
          {
            "name": "360p",
            "bitrate": 500000,
            "fps": 30,
            "width": 640,
            "height": 360
          }
        ]
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          "Authorization": "Bearer ee2c5c83-3c17-4f0d-84e7-373e9b401eab"
        }
      }
    )

    setStreamKey(yeah.data.streamKey);
    setStreamID(yeah.data.id);
    setStreamType('hmmm');
  }

  const deleteStream = async (e) => {
    axios.delete('https://livepeer.studio/api/stream/' + streamID,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          "Authorization": "Bearer ee2c5c83-3c17-4f0d-84e7-373e9b401eab",
        }
      }
    )
    window.location.reload();
  }

  // if((streamType === 'hogyi stream')) {
  //   return <Loader />;
  // }
  if (streamType === 'form') {
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
          border: '0.01px black',
          boxShadow: '0 0 30px 0 rgba(0,0,0,0.25)',
        }}>

          <div className='startStream__title' style={{
            width: '100%',
            height: '10%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
          }}>
            Enter Stream Details
          </div>

          <div className='startStream__form' onSubmit={handleSubmit} style={{
            width: '80%',
            height: '80%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>

            <input className='startStream__form__input' type='text' placeholder='Stream Name' style={{
              width: '30%',
              height: '8%',
              borderRadius: '1rem',
              marginTop: '3rem',
              border: '0.01px black',
              fontSize: '1.5rem',
              paddingLeft: '1rem',
            }}
              onChange={(e) => {
                setStreamName(e.target.value);
              }} />

            <input className='startStream__form__input' type='text' placeholder='Cost' style={{
              width: '30%',
              height: '8%',
              marginTop: '3rem',
              borderRadius: '1rem',
              border: '0.01px black',
              fontSize: '1.5rem',
              paddingLeft: '1rem',
            }}
              onChange={(e) => {
                setStreamCost(e.target.value);
              }} />

            <button className='startStream__form__button' type='submit' style={{
              width: '20%',
              height: '10%',
              borderRadius: '2rem',
              marginTop: '3rem',
              border: '0.01px black',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              backgroundColor: '#FC1503',
              color: 'white',
            }}
              onClick={handleSubmit}>
              Start Stream
            </button>
          </div>

        </div>
      </>
    )
  } else {
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
          border: '0.01px black',
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
              <span style={{ color: 'red', fontWeight: 'bold' }}>Stream Server:</span> rtmp://rtmp.livepeer.com/live
            </div>

            <div className='stream_details__details__cost' style={{
              width: '100%',
              height: '10%',
              marginTop: '3rem',
              borderRadius: '1rem',
              border: '0.01px black',
              fontSize: '1.5rem',
              paddingLeft: '1rem',
            }}>
              <span style={{ color: 'red', fontWeight: 'bold' }}>Cost:</span> {streamCost}
            </div>
            <div className='stream_details__details__key' style={{
              width: '100%',
              height: '10%',
              marginTop: '3rem',
              borderRadius: '1rem',
              border: '0.01px black',
              fontSize: '1.5rem',
              paddingLeft: '1rem',
            }}>
              <span style={{ color: 'red', fontWeight: 'bold' }}>Stream Key:</span> {streamKey}
            </div>
          </div>
          <button className='startStream__form__button' type='submit' style={{
            width: '20%',
            height: '10%',
            borderRadius: '2rem',
            marginTop: '3rem',
            border: '0.01px black',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            backgroundColor: '#FC1503',
            color: 'white',
          }}
            onClick={deleteStream}>
            Delete Stream
          </button>
        </div>
      </>
    )
  }

}

export default StartStream