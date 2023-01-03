import React from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { VOICE_TO_TEXT } from "../../api/urls";
import "./style.css";

const VoiceToText = () => {
  // local states
  const [voiceRecorded, setVoiceRecorded] = React.useState("");
  const [resData, setResData] = React.useState([]);

  const recorderControls = useAudioRecorder();

  const addAudioElement = async (blob) => {
    const url = URL.createObjectURL(blob);
    setVoiceRecorded(url);
    await fetch(`${VOICE_TO_TEXT}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: url,
    }).then((res) => {
      res.json().then((data) => {
        setResData(data?.data);
      });
    });

    // beacuse of CORS ORIGIN I must use proxy and fetch
    // axios.post(`/api/v1/${VOICE_EMOTION}`, url);
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-full recorder"
      onClick={(event) => event.stopPropagation()}
    >
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />

      <br />
      <div className="flex">
        <button
          className="m-2 bg-stone-300 p-2 rounded-md"
          onClick={recorderControls.stopRecording}
        >
          پایان ضبط
        </button>
        {voiceRecorded && (
          <button
            className="m-2 bg-red-800 text-white p-2 rounded-md"
            onClick={() => setVoiceRecorded(null)}
          >
            حذف صوت
          </button>
        )}
      </div>
      <br />
      {voiceRecorded && (
        <audio src={voiceRecorded} controls={true} className="mb-6 w-full" />
      )}
      <div className="flex flex-col w-full">
        {resData && voiceRecorded && (
          <div className=" w-full text-right bg-slate-100 rounded-md">
            <p className="m-5">{resData?.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceToText;
