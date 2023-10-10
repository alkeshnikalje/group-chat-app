import { ReactNode } from "react";

export default function ChildMain({ children }: { children: ReactNode }) {
  return (
    <div className="h-3/4 w-3/4 max-w-3xl rounded-lg bg-white  shadow-md">
      {children}
    </div>
  );
}
