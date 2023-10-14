import { ReactNode } from "react";

export default function ChildMain({ children }: { children: ReactNode }) {
  return (
    <div className="h-5/6 w-3/4 max-w-4xl rounded-lg bg-white  shadow-md">
      {children}
    </div>
  );
}
