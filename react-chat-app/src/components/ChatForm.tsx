export default function ChatForm() {
  return (
    <form className="flex h-[10%]">
      <input
        type="text"
        className="w-full border-t p-2 focus:border-blue-500 focus:outline-none"
        placeholder="Type your message..."
      />
      <button className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none">
        Send
      </button>
    </form>
  );
}
