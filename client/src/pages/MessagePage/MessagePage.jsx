import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useUser } from "../../hooks/useUser";
import { useGetAllAdminsQuery } from "../../redux/services/usersApi";
import "./MessagePage.css";

const MessagePage = () => {
  const user = useUser();
  const socket = io("http://localhost:3000", {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
  });

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ author: "", content: "" });
  const { data: admins = [] } = useGetAllAdminsQuery();

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  const handleSubmit = () => {
    socket.emit("message", {
      ...newMessage,
      author: user?.username || "Undefined User",
    });
    setNewMessage({ author: "", content: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMessage((prevMessage) => ({ ...prevMessage, [name]: value }));
  };

  return (
    <div className="global-padding">
      <h1 className="title">Messenger</h1>
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <strong>{message.author}: </strong>
            {message.content} <i>{message.timestamp}</i>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          name="content"
          value={newMessage.content}
          placeholder="Your Message"
          onChange={handleChange}
          className="input-field"
        />
        <button onClick={handleSubmit} className="send-button">
          Send
        </button>
      </div>
      <div className="admins-container">
        <h2 className="admins-title">List of Admins</h2>
        <ul className="admins-list">
          {admins.map((admin) => (
            <li key={admin.id} className="admin">
              {admin.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessagePage;
