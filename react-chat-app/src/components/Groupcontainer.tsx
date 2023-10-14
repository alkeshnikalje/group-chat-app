export default function GroupContainer() {
  const dummyGroups = [
    { id: 1, name: "Group 1" },
    { id: 2, name: "Group 2" },
    { id: 3, name: "Group 3" },
  ];

  return (
    <div className=" h-5/6 w-1/4  bg-white p-4">
      <form className="mb-4 border">
        <input
          type="text"
          className="w-2/3 rounded-l  px-2 py-1"
          placeholder="Create a group"
        />
        <button className="w-1/3 rounded-r bg-blue-500 py-1 text-white">
          Create
        </button>
      </form>
      <div className=" text-center text-lg font-semibold">Groups</div>
      <div className="h-[calc(100%-6rem)] overflow-y-auto ">
        {dummyGroups.map((group) => (
          <div key={group.id} className="mb-2 rounded-md p-2 hover:bg-gray-100">
            {group.name}
          </div>
        ))}
      </div>
    </div>
  );
}
