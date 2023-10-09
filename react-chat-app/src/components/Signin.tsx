import { Link } from "react-router-dom";
export default function SignIn() {
  return (
    <div className=" relative flex h-screen items-center justify-center">
      <form className="w-96 rounded-lg border p-4">
        <label className="mb-2 mt-4 block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
        />

        <label className="mb-2 mt-4 block text-gray-700">Password</label>
        <input
          type="password"
          className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
        />

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600 focus:outline-none"
        >
          Sign in
        </button>
      </form>
      <div className="absolute left-0 top-48 w-full p-4 text-center">
        <p className="text-lg text-gray-700">
          New here?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Click here to sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
