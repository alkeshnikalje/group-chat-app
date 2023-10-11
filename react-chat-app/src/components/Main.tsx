import ChildMain from "./ChildMain";
import ChatHeader from "./Chatheader";
import ChatSection from "./ChatSection";
import ChatForm from "./ChatForm";
import { useState, useEffect } from "react";
import axios from "axios";
import { AxiosResponse } from "axios";

export interface messageObj {
  id: number;
  text: string;
  name: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  userId: number;
}

export default function Main({ user }: { user: string | null }) {
  const [messages, setMessages] = useState<messageObj[]>([]);

  const getChats = async () => {
    try {
      const res: AxiosResponse = await axios.get(
        "http://localhost:3000/api/user/chats",
        {
          headers: { Authorization: localStorage.getItem("token") },
        },
      );
      const chats: messageObj[] = res.data.chats;
      setMessages(chats);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getChats();
  }, []);
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100 pt-4">
      <ChildMain>
        <ChatHeader />
        <ChatSection messages={messages} user={user} />
        <ChatForm setMessages={setMessages} />
      </ChildMain>
    </div>
  );
}
