import { messageObj } from "../components/Main";

export default function ChatSection({
  messages,
  user,
}: {
  messages: messageObj[];
  user: string | null;
}) {
  return (
    <div className="h-[80%] overflow-y-auto bg-white p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-2 ${message.name === user ? "text-right" : ""}`}
        >
          <div
            className={`rounded-lg p-2 ${
              message.name === user
                ? "self-end bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {message.name === user ? (
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
