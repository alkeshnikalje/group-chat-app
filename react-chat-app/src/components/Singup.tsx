import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phNumber, setPhNumber] = useState("");
  const navigate = useNavigate();
  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userObj = {
      name,
      email,
      password,
      phoneNumber: phNumber,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/signup",
        userObj,
      );
      if (res.data.success) {
        navigate("/signin");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="relative flex h-screen items-center justify-center">
      <form className="w-96 rounded-lg border p-4" onSubmit={handleOnSubmit}>
        <label className="mb-2 block text-gray-700">Name</label>
        <input
          type="text"
          className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="mb-2 mt-4 block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="mb-2 mt-4 block text-gray-700">Phone</label>
        <input
          type="text"
          className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
          value={phNumber}
          onChange={(e) => setPhNumber(e.target.value)}
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
          Sign up
        </button>
      </form>

      <div className="absolute left-0 top-32 w-full p-4 text-center">
        <p className="text-lg text-gray-700">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Click here to login
          </Link>
        </p>
      </div>
    </div>
  );
}
