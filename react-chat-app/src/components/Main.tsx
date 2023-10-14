import ChildMain from "./ChildMain";
import ChatHeader from "./Chatheader";
import ChatSection from "./ChatSection";
import ChatForm from "./ChatForm";
import { useState, useEffect } from "react";
import axios from "axios";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import GroupContainer from "./Groupcontainer";

export interface messageObj {
  id: number;
  text: string;
  name: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  userId: number;
}

export default function Main({ id }: { id: number | null }) {
  const [messages, setMessages] = useState<messageObj[]>([]);
  const navigate = useNavigate();
  const getChats = async () => {
    try {
      const lastMessageId =
        messages.length > 0 ? messages[messages.length - 1].id : 0;
      const res: AxiosResponse = await axios.get(
        `http://localhost:3000/api/user/chats/${lastMessageId}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        },
      );
      const chats: messageObj[] = res.data.chats;
      const updatedChats =
        chats.length > 0 ? [...messages, ...chats] : messages;
      setMessages(updatedChats);
      // Update local storage with the merged chats
      localStorage.setItem("messages", JSON.stringify(updatedChats));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Load old messages from local storage when the component mounts
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }

    // Fetch new messages at regular intervals
    const intervalId = setInterval(getChats, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100 pt-4">
      <GroupContainer />
      <ChildMain>
        {id ? (
          <>
            <ChatHeader />
            <ChatSection messages={messages} id={id} />
            <ChatForm setMessages={setMessages} />
          </>
        ) : (
          <>{navigate("/signin")}</>
        )}
      </ChildMain>
    </div>
  );
}
