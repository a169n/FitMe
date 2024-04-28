import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./MessagePage.css";
import { useAccess } from "../../hooks/useAccess";
import {
  useGetMessagesQuery,
  useCreateMessageMutation,
} from "../../redux/services/messagesApi";
import { useUser } from "../../hooks/useUser";
import PropagateLoader from "react-spinners/PropagateLoader";

function MessagePage() {
  useAccess();
  const user = useUser();
  const messagesEndRef = useRef(null);
  const [messageContent, setMessageContent] = useState("");

  const adminId = "65de6d4e86d7dc69cabfed32";

  const {
    data: messages = [],
    isLoading,
    isError,
  } = useGetMessagesQuery(user?.token);
  const [createMessage] = useCreateMessageMutation();

  const handleSubmit = () => {
    createMessage({
      body: {
        author: user?.username || "Undefined User",
        sender: user?._id,
        content: messageContent,
        recipient: adminId,
      },
      token: user?.token,
    })
      .unwrap()
      .then(() => {
        setMessageContent("");
        refetchMessages();
      })
      .catch((error) => console.error("Error sending message:", error.message));
  };

  const refetchMessages = () => {
    getMessagesQuery.refetch();
  };

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      "force new connection": true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
    });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (isLoading)
    return (
      <div>
        <PropagateLoader
          cssOverride={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "50px 0",
          }}
          size={20}
        />
      </div>
    );
  if (isError) return <div>Error fetching messages</div>;

  return (
    <div className="container">
      <h1>Messenger</h1>
      <div className="messages-container">
        {messages.map((message) => {
          const date = new Date(message.timestamp);
          const options = {
            day: "numeric",
            month: "long",
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          };
          const formattedDate = date.toLocaleString("en-EN", options);
          const isSentByUser = message.author === user?.username;
          const messageClass = isSentByUser ? "sent" : "received";

          return (
            <div key={message._id} className={`message ${messageClass}`}>
              <div className="message-content">
                <strong>{message.author}: </strong>
                {message.content} <i>{formattedDate}</i>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>
      <div>
        New Message:{" "}
        <input
          type="text"
          name="content"
          value={messageContent}
          placeholder="Your Message"
          onChange={(event) => setMessageContent(event.target.value)}
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
}

export default MessagePage;
