import { messageObj } from "../components/Main";

export default function ChatSection({
  messages,
  id,
}: {
  messages: messageObj[];
  id: number | null;
}) {
  return (
    <div className="h-[80%] overflow-y-auto bg-white p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={` ${message.userId === id ? "text-right" : ""}`}
        >
          <div
            className={` rounded-lg p-2 ${
              message.userId === id ? "self-end text-white" : ""
            }`}
          >
            {message.userId === id ? (
              <span className="rounded-md bg-blue-500 pb-2 pl-1 pr-1 pt-2 ">
                {message.text}
              </span>
            ) : (
              <>
                <span className="rounded-md bg-gray-300 pb-2 pl-1 pr-1 pt-2 ">{`${message.name}: ${message.text}`}</span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
