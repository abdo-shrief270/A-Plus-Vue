// composables/useAudioConverter.js
import lamejs from '@breezystack/lamejs';
import { ref } from 'vue';

// Utility to write string to DataView
const writeString = (view, offset, string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};

// Convert AudioBuffer to WAV Blob
const bufferToWav = async (buffer, numChannels, sampleRate) => {
  const length = buffer.length * numChannels * 2;
  const wav = new ArrayBuffer(44 + length);
  const view = new DataView(wav);

  // WAV Header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + length, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * 2, true);
  view.setUint16(32, numChannels * 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, length, true);

  // WAV Data
  const offset = 44;
  for (let i = 0; i < buffer.length; i++) {
    for (let channel = 0; channel < numChannels; channel++) {
      const sample = Math.max(
        -1,
        Math.min(1, buffer.getChannelData(channel)[i])
      );
      view.setInt16(
        offset + (i * numChannels + channel) * 2,
        sample * 0x7fff,
        true
      );
    }
  }

  return new Blob([wav], { type: 'audio/wav' });
};

const decodeAudioData = async (audioBlob) => {
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioData = await audioContext.decodeAudioData(arrayBuffer);
    return audioData;
  } catch (error) {
    console.error('Audio decoding failed:', error); // Log decoding error
    throw error; // Rethrow to be caught by convertToMp3
  }
};

// Convert audio Blob to WAV
const convertToWav = async (audioBlob) => {
  const audioBuffer = await decodeAudioData(audioBlob);
  return bufferToWav(
    audioBuffer,
    audioBuffer.numberOfChannels,
    audioBuffer.sampleRate
  );
};

// Encode audio samples to MP3
const encodeToMP3 = (channels, sampleRate, samples, bitrate = 128) => {
  const outputBuffer = [];
  const encoder = new lamejs.Mp3Encoder(channels, sampleRate, bitrate);
  const maxSamplesPerFrame = 1152;

  for (let offset = 0; offset < samples.length; offset += maxSamplesPerFrame) {
    const sliceEnd = Math.min(offset + maxSamplesPerFrame, samples.length);
    const sampleSlice = samples.subarray(offset, sliceEnd);
    const mp3Buffer = encoder.encodeBuffer(sampleSlice);

    if (mp3Buffer.length > 0) {
      outputBuffer.push(new Int8Array(mp3Buffer));
    }
  }

  const remainingData = encoder.flush();
  if (remainingData.length > 0) {
    outputBuffer.push(new Int8Array(remainingData));
  }

  return new Blob(outputBuffer, { type: 'audio/mp3' });
};

const convertToMp3 = async (audioBlob, bitrate = 128) => {
  try {
    const audioBuffer = await decodeAudioData(audioBlob);
    const samples = new Int16Array(
      audioBuffer.length * audioBuffer.numberOfChannels
    );
    let offset = 0;
    for (let i = 0; i < audioBuffer.length; i++) {
      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const sample = Math.max(
          -1,
          Math.min(1, audioBuffer.getChannelData(channel)[i])
        );
        samples[offset] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
        offset += 1;
      }
    }
    return encodeToMP3(
      audioBuffer.numberOfChannels,
      audioBuffer.sampleRate,
      samples,
      bitrate
    );
  } catch (error) {
    console.error('MP3 conversion failed:', error); // Log the specific error
    throw new Error(`Conversion to MP3 failed: ${error.message}`);
  }
};

// Main composable function
export const useAudioConverter = () => {
  // Reactive state for conversion status
  const isConverting = ref(false);
  const error = ref(null);

  // Convert audio to specified format
  const convertAudio = async (inputBlob, outputFormat, bitrate = 128) => {
    isConverting.value = true;
    error.value = null;

    try {
      let audio;
      if (outputFormat === 'audio/wav') {
        audio = await convertToWav(inputBlob);
      } else if (outputFormat === 'audio/mp3') {
        audio = await convertToMp3(inputBlob, bitrate);
      } else {
        throw new Error('Unsupported output format');
      }
      return audio;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      isConverting.value = false;
    }
  };

  return {
    convertAudio,
    isConverting,
    error,
    convertToMp3
  };
};
