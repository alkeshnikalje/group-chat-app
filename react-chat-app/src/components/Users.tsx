export default function Users() {
  const users = [
    { id: 1, name: "alkesh", email: "alkesh@gmail.com", phoneNumber: 12121212 },
    { id: 2, name: "john", email: "john@gmail.com", phoneNumber: 12345678 },
    { id: 3, name: "mary", email: "mary@gmail.com", phoneNumber: 98765432 },
    { id: 4, name: "susan", email: "susan@gmail.com", phoneNumber: 55555555 },
    { id: 4, name: "susan", email: "susan@gmail.com", phoneNumber: 55555555 },
    { id: 4, name: "susan", email: "susan@gmail.com", phoneNumber: 55555555 },
    { id: 4, name: "susan", email: "susan@gmail.com", phoneNumber: 55555555 },
    { id: 4, name: "susan", email: "susan@gmail.com", phoneNumber: 55555555 },
    { id: 4, name: "susan", email: "susan@gmail.com", phoneNumber: 55555555 },
    { id: 4, name: "susan", email: "susan@gmail.com", phoneNumber: 55555555 },
    { id: 4, name: "susan", email: "susan@gmail.com", phoneNumber: 55555555 },
    { id: 4, name: "susan", email: "susan@gmail.com", phoneNumber: 55555555 },
    { id: 4, name: "susan", email: "susan@gmail.com", phoneNumber: 55555555 },
    { id: 4, name: "susan", email: "susan@gmail.com", phoneNumber: 55555555 },
    { id: 4, name: "susan", email: "susan@gmail.com", phoneNumber: 55555555 },
    // Add more users here as needed
  ];

  return (
    <>
      <h1 className="mt-2 text-center font-semibold">
        Add your friends to your groups
      </h1>
      <div className="mx-auto mt-2 h-[800px] max-w-[600px]  ">
        <form className="mb-4 flex h-[5%] ">
          <input
            type="text"
            className="w-2/3 rounded-l border border-gray-400 px-2 py-1"
            placeholder="Search users"
          />
          <button className="w-1/3 rounded-r bg-blue-500 py-1 text-white">
            Search
          </button>
        </form>
        <div className="h-[90%] max-h-[calc(100vh-10rem)] overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              className=" mb-2 flex items-center justify-between rounded bg-gray-300 p-2"
            >
              <span className="font-semibold">{user.name}</span>
              <button className="rounded bg-blue-500 p-2 text-white">
                Add User
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
