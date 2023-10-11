import { useState } from "react";
import { messageObj } from "../components/Main";
import axios from "axios";
import { AxiosResponse } from "axios";

export default function ChatForm({
  setMessages,
}: {
  setMessages: React.Dispatch<React.SetStateAction<messageObj[]>>;
}) {
  const [message, setMessage] = useState("");

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const textObj = {
        text: message,
      };
      const res: AxiosResponse = await axios.post(
        "http://localhost:3000/api/user/chats",
        textObj,
        {
          headers: { Authorization: localStorage.getItem("token") },
        },
      );
      const chat: messageObj = res.data.newChat;
      setMessages((message) => [...message, chat]);
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form className="flex h-[10%]" onSubmit={handleOnSubmit}>
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
  );
}
