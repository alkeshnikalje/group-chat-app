import ChildMain from "./ChildMain";
import ChatHeader from "./Chatheader";
import ChatSection from "./ChatSection";
import ChatForm from "./ChatForm";
export default function Main() {
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100 pt-4">
      <ChildMain>
        <ChatHeader />
        <ChatSection />
        <ChatForm />
      </ChildMain>
    </div>
  );
}
