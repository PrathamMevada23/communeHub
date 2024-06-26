import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import ScreenShareIcon from '@mui/icons-material/ScreenShare'
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import * as webRTCHandler from '../../../realTimeCommunication/webRTCHandler'

const constraints = {
    audio: false,
    video: true
}

const ScreenShareButton = ({
    localStream,
    screenSharingStream,
    setScreenSharingStream,
    isScreenSharingActive
}) => {

    const handleScreenShareToggle = async () => {
        if(!isScreenSharingActive) {
            let stream = null
            try {
                stream = await navigator.mediaDevices.getDisplayMedia(constraints)
            } catch (err) {
                console.log('Error occured when trying to get access to screen sharing');
            }

            if (stream) {
                setScreenSharingStream(stream)
                webRTCHandler.switchOutgoingTracks(stream)
            } else {
                webRTCHandler.switchOutgoingTracks(localStream)
                screenSharingStream.getTracks().forEach(t => t.stop());
                setScreenSharingStream(null)
            }
        }
    }


	return (
		<IconButton onClick={handleScreenShareToggle} style={{ color: 'white'}}>
            {isScreenSharingActive ? <StopScreenShareIcon /> : <ScreenShareIcon />}
		
		</IconButton>
		)
	}

export default ScreenShareButton;