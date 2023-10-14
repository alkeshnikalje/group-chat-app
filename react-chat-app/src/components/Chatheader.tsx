import { groupsObj } from "./Main";
export default function ChatHeader({
  isActive,
}: {
  isActive: groupsObj | null;
}) {
  return (
    <header className=" h-[10%] border-b p-2 text-center text-xl font-bold">
      {isActive?.name}
    </header>
  );
}
