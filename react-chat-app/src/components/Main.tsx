export default function Main() {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1 overflow-y-auto border-b p-4">
        {/* Messages will go here */}
        <div className="mb-2 text-left">
          <span className="font-bold">User 1:</span> Hello!
        </div>
        <div className="mb-2 text-right">
          <span className="font-bold">You:</span> Hi there!
        </div>
        {/* Add more messages as needed */}
      </div>
      <div className="p-4">
        {/* Chat input form */}
        <form className="flex">
          <input
            type="text"
            className="flex-1 rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
