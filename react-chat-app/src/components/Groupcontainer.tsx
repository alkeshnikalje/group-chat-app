import { useState } from "react";
import { groupsObj } from "./Main";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface PropTypes {
  groups: groupsObj[];
  isActive: groupsObj | null;
  setIsActive: React.Dispatch<React.SetStateAction<groupsObj | null>>;
  setGroups: React.Dispatch<React.SetStateAction<groupsObj[]>>;
  id: number | null;
}
export default function GroupContainer(props: PropTypes) {
  const [groupName, setGroupName] = useState<string>("");
  const navigate = useNavigate();
  const handleOnSubmi = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const groupObj = {
        name: groupName,
      };
      const res = await axios.post(
        "http://localhost:3000/api/user/group",
        groupObj,
        {
          headers: { Authorization: localStorage.getItem("token") },
        },
      );
      const newGroup = res.data.group;
      props.setGroups((prevGroups) => [...prevGroups, newGroup]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (groupId: number) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this group?",
      );
      if (!isConfirmed) {
        return;
      }
      const res = await axios.delete(
        `http://localhost:3000/api/user/group/${groupId}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        },
      );
      if (res.data.success) {
        const filteredGroups = props.groups.filter(
          (group) => group.id !== groupId,
        );
        props.setGroups(filteredGroups);
        if (filteredGroups.length > 0) {
          props.setIsActive(filteredGroups[filteredGroups.length - 1]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sortGroups = (group: groupsObj) => {
    props.setIsActive(group);
    const notSelectedGroups = props.groups.filter((grp) => grp !== group);
    props.setGroups([group, ...notSelectedGroups]);
  };

  return (
    <div className=" h-5/6 w-1/4  bg-white p-4">
      <form className="mb-4 border" onSubmit={handleOnSubmi}>
        <input
          type="text"
          className="w-2/3 rounded-l  px-2 py-1"
          placeholder="Create a group"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button className="w-1/3 rounded-r bg-blue-500 py-1 text-white">
          Create
        </button>
      </form>
      <div className=" text-center text-lg font-semibold">
        {props.groups.length > 0
          ? "Your Groups"
          : "you don't have any groups start creating them"}
      </div>
      <div className="h-[calc(100%-6rem)] cursor-pointer overflow-y-auto ">
        {props.groups.map((group) => (
          <div
            key={group.id}
            className={`mb-2 flex items-center justify-between rounded-md p-2 ${
              group.id !== props.isActive?.id ? "hover:bg-gray-300" : ""
            }  ${
              group.id === props.isActive?.id ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => sortGroups(group)}
          >
            <span>{group.name}</span>
            {group.isAdmin ? (
              <div className="ml-2 flex space-x-2">
                <button
                  className="rounded-md bg-blue-500 p-2 text-white"
                  onClick={() => navigate(`/users/${group.id}`)}
                >
                  Add User
                </button>
                {group.createdBy === props.id ? (
                  <button
                    className="rounded-md bg-red-500 p-2 text-white"
                    onClick={() => {
                      handleDelete(group.id);
                    }}
                  >
                    Delete
                  </button>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
