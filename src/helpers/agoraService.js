import AgoraRTC from 'agora-rtc-sdk-ng';

const APP_ID = import.meta.env.VITE_BASE_AGORA_APP_ID; // App ID from the environment variable

// Initialize Agora Client
const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

let microphoneTrack;

// Check Microphone Permissions, Availability, and Track Audio Level
export const checkMicrophone = async (inCall, updateAudioLevel) => {
  try {
    const devices = await AgoraRTC.getDevices();
    const microphone = devices.find((device) => device.kind === 'audioinput');

    if (!microphone) {
      console.error('No microphone detected.');
      return false;
    }

    microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack();

    if (inCall) {
      return true;
    } else {
      // Monitor the microphone audio level while in the channel
      const monitorAudioLevel = setInterval(() => {
        const audioLevel = microphoneTrack.getVolumeLevel();
        updateAudioLevel(Math.round(audioLevel * 100));
      }, 100);

      // Stop monitoring when leaving the channel
      client.on('leave-channel', () => {
        clearInterval(monitorAudioLevel);
      });

      console.log('Microphone is working.');
      return true;
    }
  } catch (error) {
    console.error('Failed to check microphone:', error);
    return false;
  }
};

export const toggleMute = async (isMuted) => {
  if (isMuted) {
    microphoneTrack.setMuted(true);
  } else {
    microphoneTrack.setMuted(false);
  }
  return !isMuted;
};

export const userAudioLevelMonitors = {};

// Monitor audio levels for a specific user
const monitorUserAudioLevel = (userId, audioTrack) => {
  if (userAudioLevelMonitors[userId]) {
    clearInterval(userAudioLevelMonitors[userId]);
  }
  userAudioLevelMonitors[userId] = setInterval(() => {
    const audioLevel = audioTrack.getVolumeLevel();
    updateUserAudioLevel(userId, Math.round(audioLevel * 100));
  }, 1000);
};
// Update UI with audio levels
const updateUserAudioLevel = (userId, audioLevel) => {
  const userElement = document.getElementById(`remote-user-${userId}-audio`);
  if (userElement) {
    const audioLevelElement = userElement.querySelector('.audio-level');
    if (audioLevelElement) {
      // add transform scale to the audio level element
      const normalizedAudioLevel = Math.min(Math.max(audioLevel / 500, 0), 1); // Normalize between 0 and 1
      const scale = 1 + normalizedAudioLevel; // Scale based on audio level
      audioLevelElement.style.transform = `scale(${scale})`;
    }
  }
};
// Pre-Call Checks and Join Channel
export const joinChannel = async (
  channelName,
  token = null,
  uid = null,
  netWorkUpdated,
  enableScreenSharing = false
) => {
  try {
    // Perform pre-call checks
    const isMicrophoneAvailable = await checkMicrophone(true);

    if (!isMicrophoneAvailable) {
      console.error('Pre-call checks failed. Cannot join the channel.');
      throw new Error('Pre-call checks failed.');
    }

    // Join the channel
    console.log('Joining channel...');
    await client.join(APP_ID, channelName, token, uid);

    microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack();
    await client.publish(microphoneTrack);

    // Monitor the call quality
    client.on('network-quality', (quality) => {
      netWorkUpdated(quality);
    });

    // Monitor the microphone audio level while in the channel
    monitorUserAudioLevel(uid, microphoneTrack);

    if (enableScreenSharing) {
      const screenTrack = await AgoraRTC.createScreenVideoTrack({
        encoderConfig: '720p_1',
        optimizationMode: 'detail',
      });
      await client.publish(screenTrack);
    }

    console.log('Successfully joined the channel');
    return { microphoneTrack };
  } catch (error) {
    console.error('Failed to join channel:', error);
    throw new Error('Failed to join channel');
  }
};

// Start Screen Sharing
export const startScreenSharing = async () => {
  try {
    // Create a screen video track
    const screenTrack = await AgoraRTC.createScreenVideoTrack({
      encoderConfig: '720p_1',
      optimizationMode: 'detail',
    });

    // Publish the screen-sharing track
    await client.publish([screenTrack]);
    screenTrack.isScreenSharing = true;

    console.log('Screen sharing started!');

    // Optional: Display the screen sharing locally
    const videoElement = document.getElementById('screen-video');
    if (videoElement) {
      screenTrack.play(videoElement);
    }

    // Listen for the screen sharing stop event
    screenTrack.on('track-ended', async () => {
      console.log('Screen sharing stopped by the user.');
      await client.unpublish(screenTrack); // Unpublish the track
      screenTrack.close();
      screenTrack.isScreenSharing = false;
    });

    return screenTrack;
  } catch (error) {
    console.error('Failed to start screen sharing:', error);
    throw new Error('Failed to start screen sharing');
  }
};
// Stop Screen Sharing
export const stopScreenSharing = async (screenTrack) => {
  try {
    await client.unpublish(screenTrack); // Unpublish the track
    screenTrack.isScreenSharing = false;
    screenTrack?.close(); // Close the screen track
    console.log('Screen sharing stopped.');
  } catch (error) {
    console.error('Failed to stop screen sharing:', error);
  }
};

client.on('track-ended', async (screenTrack) => {
  console.log('stopScreenSharing');
  await client.unpublish(screenTrack); // Unpublish the track
  screenTrack.isScreenSharing = false;
});

// Leave Channel
export const leaveChannel = async () => {
  try {
    await client.leave();
    console.log('Successfully left the channel');
    window.location.reload();
  } catch (error) {
    console.error('Failed to leave channel:', error);
    throw new Error('Failed to leave channel');
  }
};

// Subscribe to user-published event
client.on('user-published', async (user, mediaType) => {
  try {
    await client.subscribe(user, mediaType);
    // Display the screen-sharing video in the screen-video element
    if (user.videoTrack) {
      const screenVideoElement = document.getElementById('screen-video');
      const reserver = document.getElementById('reserver');
      user.videoTrack.play(screenVideoElement);
      screenVideoElement.style.display = 'block';
      reserver.classList.add('isScreenSharing', 'top-2', 'start-2');
    }

    if (mediaType === 'audio') {
      user.audioTrack.play();
      monitorUserAudioLevel(user.uid, user.audioTrack);

      user.audioTrack.on('track-ended', () => {
        if (userAudioLevelMonitors[user.uid]) {
          clearInterval(userAudioLevelMonitors[user.uid]);
          delete userAudioLevelMonitors[user.uid];
          console.log(
            `User ${user.uid} track ended. Stopping audio level monitoring.`
          );
        }
      });
    }
  } catch (error) {
    console.error('Failed to subscribe to user:', error);
  }
});

// Subscribe to user-unpublished event
client.on('user-unpublished', async (user) => {
  const remoteVideoContainer = document.getElementById(
    `remote-user-${user.uid}`
  );
  if (remoteVideoContainer) {
    remoteVideoContainer.remove();
  }

  if (userAudioLevelMonitors[user.uid]) {
    clearInterval(userAudioLevelMonitors[user.uid]);
    delete userAudioLevelMonitors[user.uid];
    console.log(`Stopped monitoring audio level for user ${user.uid}`);
  }
});
