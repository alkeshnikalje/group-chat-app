import { gUsers } from "../App";
export default function GroupUsers({ groupUsers }: { groupUsers: gUsers[] }) {
  const group = [
    {
      id: 1,
      name: "hero",
      email: "hero@gmail.com",
      phoneNumber: "1233432",
      isAdmin: false,
    },
    {
      id: 1,
      name: "hero",
      email: "hero@gmail.com",
      phoneNumber: "1233432",
      isAdmin: false,
    },
    {
      id: 1,
      name: "hero",
      email: "hero@gmail.com",
      phoneNumber: "1233432",
      isAdmin: false,
    },
    {
      id: 1,
      name: "hero",
      email: "hero@gmail.com",
      phoneNumber: "1233432",
      isAdmin: false,
    },
    {
      id: 1,
      name: "hero",
      email: "hero@gmail.com",
      phoneNumber: "1233432",
      isAdmin: true,
    },
  ];

  return (
    <>
      <h1 className="mt-2 text-center font-semibold">Group Members</h1>
      <div className="mx-auto mt-2 h-[800px] max-w-[600px]  ">
        <div className="h-[90%] max-h-[calc(100vh-10rem)] overflow-y-auto">
          {group.map((user) => (
            <div
              key={user.id}
              className=" mb-2 flex items-center justify-between rounded bg-gray-300 p-2"
            >
              <span className="font-semibold">{user.name}</span>
              {user.isAdmin ? (
                <button className="rounded bg-blue-500 p-2 text-white">
                  Make admin
                </button>
              ) : (
                <span className="font-semibold">Admin of the group</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
