// Message.js
import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const messageRef = useRef();

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isOwner = message.senderId === currentUser.uid;

  return (
    <div
      ref={messageRef}
      className={`message ${isOwner ? "owner" : ""}`}
    >
      <div className="messageInfo">
        <img
          src={isOwner ? currentUser.photoURL : data.user.photoURL}
          alt=""
          className="messageImage"
        />
        <span className="messageTime">right now</span>
      </div>
      <div className="messageContent">
        <p className="messageText">{message.text}</p>
        {message.img && <img src={message.img} alt="" className="messageImage" />}
      </div>
    </div>
  );
};

export default Message;
