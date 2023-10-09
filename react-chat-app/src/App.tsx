import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Singup";
import SignIn from "./components/Signin";
import AppBar from "./components/AppBar";
import Main from "./components/Main";
function App() {
  return (
    <Router>
      <AppBar />
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
