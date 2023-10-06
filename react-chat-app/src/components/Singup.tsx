export default function Signup() {
  return (
    <div className="flex h-screen items-center justify-center">
      <form className="w-96 rounded-lg border p-4">
        <label className="mb-2 block text-gray-700">Name</label>
        <input
          type="text"
          className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
        />

        <label className="mb-2 mt-4 block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
        />

        <label className="mb-2 mt-4 block text-gray-700">Phone</label>
        <input
          type="text"
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
          Sign up
        </button>
      </form>
    </div>
  );
}
