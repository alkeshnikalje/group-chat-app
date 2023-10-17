import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn({ user }: { user: string | null }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/main");
    }
  }, [loggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        alert("Fill in all the input fields!");
        return;
      }
      const userObj = {
        email,
        password,
      };
      const res = await axios.post(
        "http://localhost:3000/api/user/login",
        userObj,
      );
      localStorage.setItem("token", res.data.token);
      setLoggedIn(true);
    } catch (err: any) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div className="relative flex h-screen items-center justify-center">
      {!user ? (
        <>
          <form className="w-96 rounded-lg border p-4" onSubmit={handleSubmit}>
            <label className="mb-2 mt-4 block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="mb-2 mt-4 block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600 focus:outline-none"
            >
              Sign in
            </button>
          </form>
          <div className="absolute left-0 top-48 w-full p-4 text-center">
            <p className="text-xl font-semibold text-gray-700">
              New here?{" "}
              <Link to="/" className="text-xl text-blue-500 hover:underline">
                Click here to sign up
              </Link>
            </p>
          </div>
          <div className="absolute left-0 top-64 w-full p-4 text-center">
            <p className="text-lg text-red-500">{error}</p>
          </div>
        </>
      ) : (
        <>
          <Link to="/main" className="text-xl text-blue-500 hover:underline">
            start creating groups and chatting with your friends
          </Link>
        </>
      )}
    </div>
  );
}
