import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Signup from "./components/Singup";
import SignIn from "./components/Signin";
import AppBar from "./components/AppBar";
import Main from "./components/Main";
import Users from "./components/Users";

export interface UsersObj {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}
export interface gUsers {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
}
function App() {
  const [user, setUser] = useState<null | string>(null);
  const [id, setId] = useState<number | null>(null);
  const [users, setUsers] = useState<UsersObj[]>([]);
  const [groupUsers, setGroupUsers] = useState<gUsers[]>([]);

  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/me", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setUser(res.data.user.name);
      setId(res.data.user.id);
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      const fetchedUsers: UsersObj[] = res.data.users;
      setUsers(fetchedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getUsers();
  }, []);

  return (
    <Router>
      <AppBar user={user} />
      <Routes>
        <Route
          path="/main"
          element={
            <Main
              id={id}
              setGroupUsers={setGroupUsers}
              groupUsers={groupUsers}
            />
          }
        />
        <Route path="/" element={<Signup user={user} />} />
        <Route path="/signin" element={<SignIn user={user} />} />
        <Route path="/users/:gId" element={<Users users={users} id={id} />} />
      </Routes>
    </Router>
  );
}

export default App;
