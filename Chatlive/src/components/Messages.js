// Messages.js
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      const chatData = doc.data();
      if (chatData && chatData.messages) {
        setMessages(chatData.messages);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Messages;
