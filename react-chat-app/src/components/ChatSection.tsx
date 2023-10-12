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
          className={`mb-2 ${message.userId === id ? "text-right" : ""}`}
        >
          <div
            className={`rounded-lg p-2 ${
              message.userId === id
                ? "self-end bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {message.userId === id ? (
              message.text
            ) : (
              <>
                <span className="font-semibold">{`${message.name}: `}</span>
                <span>{message.text}</span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
