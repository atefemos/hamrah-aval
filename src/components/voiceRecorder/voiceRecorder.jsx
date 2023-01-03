import React from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { VOICE_EMOTION } from "../../api/urls";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./style.css";

const VoiceRecorder = () => {
  // local states
  const [voiceRecorded, setVoiceRecorded] = React.useState("");
  const [resData, setResData] = React.useState([]);

  const recorderControls = useAudioRecorder();

  const addAudioElement = async (blob) => {
    const url = URL.createObjectURL(blob);
    setVoiceRecorded(url);
    await fetch(`${VOICE_EMOTION}`, {
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

    // beacuse CORS ORIGIN I must use proxy and fetch
    // axios.post(`/api/v1/${VOICE_EMOTION}`, url);
  };

  const handleVoice = () => setVoiceRecorded(null);

  return (
    <div
      className="flex flex-col justify-center items-center recorder"
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
            onClick={handleVoice}
          >
            حذف صوت
          </button>
        )}
      </div>
      <br />
      {voiceRecorded && (
        <audio src={voiceRecorded} controls={true} className="mb-6" />
      )}
      <div className="flex flex-col w-full">
        {resData.length > 0 &&
          voiceRecorded &&
          resData?.map((item, index) => (
            <div key={index} className="flex w-full justify-between">
              <p className="m-5">{item.Label}</p>
              <CircularProgressbar
                value={item?.Score.replace(/%/g, "")}
                text={item?.Score}
                className="w-[50px]"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default VoiceRecorder;
