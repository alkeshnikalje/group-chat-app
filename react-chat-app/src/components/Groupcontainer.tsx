import { useState } from "react";
import { groupsObj } from "./Main";
import axios from "axios";
interface PropTypes {
  groups: groupsObj[];
  isActive: groupsObj | null;
  setIsActive: React.Dispatch<React.SetStateAction<groupsObj | null>>;
  setGroups: React.Dispatch<React.SetStateAction<groupsObj[]>>;
}
export default function GroupContainer(props: PropTypes) {
  const [groupName, setGroupName] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);

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
      <div className=" text-center text-lg font-semibold">Your Groups</div>
      <div className="h-[calc(100%-6rem)] cursor-pointer overflow-y-auto ">
        {props.groups.map((group) => (
          <div
            key={group.id}
            className={`mb-2 flex rounded-md p-2 hover:bg-gray-100 ${
              group.id === props.isActive?.id ? "bg-gray-100" : ""
            }`}
            onClick={() => {
              console.log("Clicked on group:", group);
              props.setIsActive(group);
            }}
          >
            {group.name}
            {<button></button>}
            <button></button>
          </div>
        ))}
      </div>
    </div>
  );
}
