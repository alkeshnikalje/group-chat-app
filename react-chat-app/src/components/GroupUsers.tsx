import { gUsers } from "../App";
import { groupsObj } from "./Main";

export default function GroupUsers({
  groupUsers,
  setIsMembersActive,
  isActive,
}: {
  groupUsers: gUsers[];
  setIsMembersActive: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: groupsObj | null;
}) {
  return (
    <>
      <h1 className="mt-2 text-center font-semibold">Group Members</h1>
      <div className="mx-auto mt-2 h-[800px] max-w-[600px]  ">
        <div className="h-[90%] max-h-[calc(100vh-10rem)] overflow-y-auto">
          {groupUsers.map((user) => (
            <div
              key={user.id}
              className="mb-2 flex items-center justify-between rounded bg-gray-300 p-2"
            >
              <span className="font-semibold">{user.name}</span>
              <div className="flex items-center space-x-2">
                {user.isAdmin ? (
                  <span className="text-sm font-semibold">Admin</span>
                ) : isActive?.isAdmin ? (
                  <>
                    <button className="rounded bg-blue-500 p-2 text-sm text-white">
                      Make admin
                    </button>
                    <button className="rounded bg-blue-500 p-2 text-sm text-white">
                      Remove
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button
            className="rounded bg-blue-500 p-2 font-semibold text-white"
            onClick={() => setIsMembersActive(false)}
          >
            Go back to chatting
          </button>
        </div>
      </div>
    </>
  );
}
