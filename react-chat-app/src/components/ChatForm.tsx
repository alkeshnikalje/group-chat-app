import { useState, useEffect } from "react";
import { messageObj } from "../components/Main";
import axios from "axios";
import { AxiosResponse } from "axios";
import { socket } from "./Groupcontainer";
export default function ChatForm({
  setMessages,
  isActiveId,
}: {
  setMessages: React.Dispatch<React.SetStateAction<messageObj[]>>;
  isActiveId: number | undefined;
}) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Listen for the "message" event from the server
    socket.on("message", (data) => {
      // Update the chat messages state with the new message
      setMessages((messages) => [...messages, data]);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("message");
    };
  }, [socket]);

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!isActiveId) {
        return;
      }
      if (!message) {
        return;
      }
      const textObj = {
        text: message,
      };
      const res: AxiosResponse = await axios.post(
        `http://localhost:3000/api/user/chats/${isActiveId}`,
        textObj,
        {
          headers: { Authorization: localStorage.getItem("token") },
        },
      );
      const chat: messageObj = res.data.newChat;
      setMessages((message) => [...message, chat]);
      socket.emit("chatMessage", chat);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = async (e: any) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("file", file);
      console.log(file);
      const res: AxiosResponse = await axios.post(
        `http://localhost:3000/api/user/multiMedia/${isActiveId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        },
      );
      const chat: messageObj = res.data.newChat;
      setMessages((messsages) => [...messsages, chat]);
      socket.emit("chatMessage", chat);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="flex h-[6%]" onSubmit={handleOnSubmit}>
        <input
          type="text"
          className="w-full border-t p-2 focus:border-blue-500 focus:outline-none"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none">
          Send
        </button>
      </form>
      <div className=" flex h-[4%] w-full justify-center">
        <input type="file" id="mediaInput" hidden onChange={handleFileChange} />

        <label
          htmlFor="mediaInput"
          className=" w-full cursor-pointer bg-gray-200 px-4 pt-1 text-center font-semibold text-black hover:bg-gray-300 focus:outline-none"
        >
          Upload a image/video file
        </label>
      </div>
    </>
  );
}
