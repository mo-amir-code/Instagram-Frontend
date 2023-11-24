import React from "react";
import { Microphone, MicrophoneSlash } from "@phosphor-icons/react";
import { useRef } from "react";

const AudioRecord = ({
  recording,
  setRecording,
  audioChunks,
  setAudioChunks,
  setAudioURL,
}) => {
  const audioStreamRef = useRef(null);
  let mediaRecorderRef = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        audioStreamRef.current = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setAudioChunks((prev) => [...prev, event.data]);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          const audioURL = URL.createObjectURL(audioBlob);
          setAudioURL(audioURL);
        };

        mediaRecorderRef.current.start();
        setRecording(true);
      })
      .catch((err) => {
        console.error("Error, accessing microphone", err.message);
      });
  };

  const stopRecording = () => {
    if (recording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      setRecording(false);
      setAudioChunks([]);
    }
  };

  return (
    <button className="cursor-pointer">
      {recording ? (
        <MicrophoneSlash onClick={() => stopRecording()} size={26} />
      ) : (
        <Microphone onClick={() => startRecording()} size={26} />
      )}
    </button>
  );
};

export default AudioRecord;
