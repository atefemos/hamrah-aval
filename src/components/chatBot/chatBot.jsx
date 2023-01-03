import React from "react";
import { CHAT_BOT } from "api/urls";

const ChatBot = () => {
  // local states
  const [chatMsg, setChatMsg] = React.useState("");
  const [resData, setResData] = React.useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    resData.push(chatMsg);
    await fetch(`${CHAT_BOT}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: [chatMsg],
    }).then((res) => {
      res.json().then((data) => {
        setResData([...resData, data.data.text]);
        setChatMsg("");
      });
    });
  };

  const handleChat = (e) => {
    setChatMsg(e.target.value);
  };

  return (
    <div
      className="flex flex-col justify-between items-center h-full"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="w-max [&>*:nth-child(odd)]:bg-slate-600 [&>*:nth-child(odd)]:text-white [&>*:nth-child(odd)]:translate-y-[2px] [&>*:nth-child(odd)]:translate-x-[70px]">
        {resData.length > 0 &&
          resData.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50 w-[90px] m-2 rounded-sm px-2 h-max -translate-x-[70px] break-words"
            >
              {item}
            </div>
          ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center border-t-[1px] py-2 border-orange-700"
      >
        <button type="submit" className="bg-green-300 px-3 mr-2 rounded-sm">
          ارسال
        </button>
        <input
          value={chatMsg}
          type="text"
          className="rounded-sm text-right"
          onChange={handleChat}
        ></input>
      </form>
    </div>
  );
};

export default ChatBot;
