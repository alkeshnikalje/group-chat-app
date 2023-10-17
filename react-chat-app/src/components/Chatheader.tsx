import { groupsObj } from "./Main";
export default function ChatHeader({
  isActive,
  numberOfUsersInTheGroup,
  setIsMembersActive,
}: {
  isActive: groupsObj | null;
  numberOfUsersInTheGroup: number;
  setIsMembersActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <header className=" flex h-[10%] items-center justify-between border-b bg-gray-200 p-2 ">
      <p className="text-sm text-gray-600">
        {numberOfUsersInTheGroup} members in this group
      </p>
      <h1 className="text-2xl font-semibold">{isActive?.name}</h1>
      <button
        className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => setIsMembersActive(true)}
      >
        Members
      </button>
    </header>
  );
}
