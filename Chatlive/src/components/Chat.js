
import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <UserInfo user={data.user} />
      <Messages />
      <Input />
    </div>
  );
};

const UserInfo = ({ user }) => (
  <div className="chatInfo">
    <span>{user?.displayName}</span>
  </div>
);

export default Chat;
