import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Signup from "./components/Singup";
import SignIn from "./components/Signin";
import AppBar from "./components/AppBar";
import Main from "./components/Main";
import Users from "./components/Users";
function App() {
  const [user, setUser] = useState<null | string>(null);
  const [id, setId] = useState<number | null>(null);

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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Router>
      <AppBar user={user} />
      <Routes>
        <Route path="/main" element={<Main id={id} />} />
        <Route path="/" element={<Signup user={user} />} />
        <Route path="/signin" element={<SignIn user={user} />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
