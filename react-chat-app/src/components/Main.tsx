import ChildMain from "./ChildMain";
import ChatHeader from "./Chatheader";
import ChatSection from "./ChatSection";
import ChatForm from "./ChatForm";
import { useState, useEffect } from "react";
import axios from "axios";
import { AxiosResponse } from "axios";
import { useNavigate, Link } from "react-router-dom";
import GroupContainer from "./Groupcontainer";
import GroupUsers from "./GroupUsers";
import { gUsers } from "../App";

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
  isAdmin: boolean;
}
export default function Main({
  id,
  setGroupUsers,
  groupUsers,
}: {
  id: number | null;
  setGroupUsers: React.Dispatch<React.SetStateAction<gUsers[]>>;
  groupUsers: gUsers[];
}) {
  const [messages, setMessages] = useState<messageObj[]>([]);
  const [groups, setGroups] = useState<groupsObj[]>([]);
  const [isActive, setIsActive] = useState<groupsObj | null>(null);
  const [isMembersActive, setIsMembersActive] = useState(false);
  const isActiveId = isActive?.id;
  const numberOfUsersInTheGroup = groupUsers.length;
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
        `http://localhost:3000/api/user/chats/group/${isActive.id}`,
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

  const getGroupUsers = async () => {
    try {
      if (!isActive) {
        return;
      }
      const res: AxiosResponse = await axios.get(
        `http://localhost:3000/api/user/${isActive.id}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        },
      );
      const fetchedGroupUsers: gUsers[] = res.data.groupBelongsTo;
      setGroupUsers(fetchedGroupUsers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Load old messages from local storage when the component mounts
    getGroupUsers();
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

  const mainElements = (
    <div className="flex h-screen w-full  justify-center space-x-2 bg-gray-100 pt-4">
      {id && (
        <GroupContainer
          groups={groups}
          isActive={isActive}
          setIsActive={setIsActive}
          setGroups={setGroups}
          id={id}
        />
      )}
      {isActive && (
        <ChildMain>
          <ChatHeader
            isActive={isActive}
            numberOfUsersInTheGroup={numberOfUsersInTheGroup}
            setIsMembersActive={setIsMembersActive}
          />
          <ChatSection messages={messages} id={id} />
          <ChatForm setMessages={setMessages} />
        </ChildMain>
      )}
      {!id && (
        <>
          <Link to="/signin" className="text-xl text-blue-500 hover:underline">
            login first
          </Link>
        </>
      )}
    </div>
  );

  return (
    <>
      {isMembersActive ? (
        <GroupUsers
          groupUsers={groupUsers}
          setIsMembersActive={setIsMembersActive}
          isActive={isActive}
          setGroupUsers={setGroupUsers}
        />
      ) : (
        mainElements
      )}
    </>
  );
}
