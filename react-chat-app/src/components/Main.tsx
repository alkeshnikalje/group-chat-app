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
export interface groupsObj {
  id: number;
  name: string;
  createdBy: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}
export default function Main({ id }: { id: number | null }) {
  const [messages, setMessages] = useState<messageObj[]>([]);
  const [groups, setGroups] = useState<groupsObj[]>([]);
  const [isActive, setIsActive] = useState<groupsObj | null>(null);

  const isActiveId = isActive?.id;
  const getGroups = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/group", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      const groups = res.data.userBelongsTo;
      setGroups(groups);
      setIsActive(groups[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);
  const navigate = useNavigate();
  const getChats = async () => {
    try {
      if (!isActive) {
        return; // Do nothing if isActive is null
      }
      const res: AxiosResponse = await axios.get(
        `http://localhost:3000/api/user/chats/group/${isActiveId}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        },
      );
      const chats: messageObj[] = res.data.chats;
      setMessages(chats);
      // Update local storage with the merged chats
      // localStorage.setItem("messages", JSON.stringify(updatedChats));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Load old messages from local storage when the component mounts

    // const storedMessages = localStorage.getItem("messages");
    // if (storedMessages) {
    //   setMessages(JSON.parse(storedMessages));
    // }

    // Fetch new messages at regular intervals
    const intervalId = setInterval(getChats, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isActiveId]);
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100 pt-4">
      {id && (
        <GroupContainer
          groups={groups}
          isActive={isActive}
          setIsActive={setIsActive}
          setGroups={setGroups}
        />
      )}
      {isActive && (
        <ChildMain>
          <ChatHeader isActive={isActive} />
          <ChatSection messages={messages} id={id} />
          <ChatForm setMessages={setMessages} />
        </ChildMain>
      )}
      {!id && <>{navigate("/signin")}</>}
    </div>
  );
}
