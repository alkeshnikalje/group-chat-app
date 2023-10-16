import { useState } from "react";
import { UsersObj } from "../App";
import { gUsers } from "../App";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AxiosError } from "axios";
export default function Users({
  users,
  groupUsers,
  setGroupUsers,
}: {
  users: UsersObj[];
  groupUsers: gUsers[];
  setGroupUsers: React.Dispatch<React.SetStateAction<gUsers[]>>;
}) {
  const params = useParams();
  const [query, setQuery] = useState("");

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(query),
  );

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleOnclick = async (uId: number, gId: number) => {
    try {
      if (!gId) {
        return;
      }

      const res = await axios.post(
        `http://localhost:3000/api/user/${uId}/group/${gId}`,
        null, // Send null as the request data
        {
          headers: { Authorization: localStorage.getItem("token") },
        },
      );

      alert(`${res.data.msg}`);
    } catch (err: any) {
      console.log(err);
      alert(`${err.response.data.msg}`);
    }
  };
  return (
    <>
      <h1 className="mt-2 text-center font-semibold">
        Add your friends to your the group
      </h1>
      <div className="mx-auto mt-2 h-[800px] max-w-[600px]  ">
        <form className="mb-4 flex h-[5%] " onSubmit={handleOnSubmit}>
          <input
            type="text"
            className="w-2/3 rounded-l border  border-gray-400 px-2 py-1"
            placeholder="Search users"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="w-1/3 rounded-r bg-blue-500 py-1 text-white">
            Search
          </button>
        </form>
        <div className="h-[90%] max-h-[calc(100vh-10rem)] overflow-y-auto">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className=" mb-2 flex items-center justify-between rounded bg-gray-300 p-2"
            >
              <span className="font-semibold">{user.name}</span>
              <button
                className="rounded bg-blue-500 p-2 text-white"
                onClick={() => handleOnclick(user.id, Number(params.gId))}
              >
                Add User
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
