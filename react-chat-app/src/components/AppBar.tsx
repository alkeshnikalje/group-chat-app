import React, { useState } from "react";

export default function AppBar() {
  const [user, setUser] = useState(null);

  const userNameAndLogoutButton = user && (
    <div className="flex items-center space-x-4">
      <span className="text-lg font-bold text-gray-700">{user}</span>
      <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none">
        Logout
      </button>
    </div>
  );

  return (
    <div className="flex h-20 items-center justify-between border-b px-5">
      {" "}
      {/* Apply border-b class for a bottom border */}
      <h1 className="text-2xl font-bold">Group Chat App</h1>
      {userNameAndLogoutButton}
    </div>
  );
}
