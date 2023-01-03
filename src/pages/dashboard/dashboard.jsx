import React from "react";
// local components
import VoiceRecorder from "components/voiceRecorder/voiceRecorder";
import MainCard from "components/mainCard/mainCrad";
import VoiceToText from "components/voiceToText/voiceToText";
import ChatBot from "components/chatBot/chatBot";

const Dashboard = () => {
  const [animation, setAnimation] = React.useState({
    first: false,
    second: false,
    third: false,
  });

  const handleAnimation = (item) => {
    if (item === "first")
      setAnimation({ first: !animation.first, second: false, third: false });
    if (item === "second")
      setAnimation({ first: false, second: !animation.second, third: false });
    if (item === "third")
      setAnimation({ first: false, second: false, third: !animation.third });
  };

  return (
    <div className="max-w-[1000px] m-auto h-fit">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-hamrah-orange/70 md:h-[200vh]">
        <div
          className={`p-2 ${
            animation.first
              ? "transform transition md:duration-500 md:translate-x-[100%] md:translate-y-[100vh] md:scale-x-[2] md:scale-y-[2] z-50"
              : "transform transition duration-500 translate-x-0 translate-y-0"
          }`}
          onClick={() => handleAnimation("first")}
        >
          <MainCard title={"تشخیص احساس از روی صدا"}>
            <VoiceRecorder />
          </MainCard>
        </div>
        <div
          className={`p-2 ${
            animation.second
              ? "transform transition md:duration-500 md:translate-y-[100vh] md:scale-x-[2] md:scale-y-[2] z-50"
              : "transform transition duration-500 translate-y-0"
          }`}
          onClick={() => handleAnimation("second")}
        >
          <MainCard title={"تبدیل صوت به متن"}>
            <VoiceToText />
          </MainCard>
        </div>
        <div
          className={`p-2 ${
            animation.third
              ? "transform transition md:duration-500 md:-translate-x-[100%] md:translate-y-[100vh] md:scale-x-[2] md:scale-y-[2] z-50"
              : "transform transition duration-500 translate-x-0 translate-y-0"
          } `}
          onClick={() => handleAnimation("third")}
        >
          <MainCard title={"چت بات"}>
            <ChatBot />
          </MainCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
