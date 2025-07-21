import { useState } from "react";
import { useRouter } from "next/router";

const USER = {
  username: "admin",
  password: "admin123",
};

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.username === USER.username && form.password === USER.password) {
      const token = `token-${Date.now()}`;
      const loginTime = new Date().toISOString();
      sessionStorage.setItem("authToken", token);
      sessionStorage.setItem("username", form.username);
      sessionStorage.setItem("loginTime", loginTime);
      router.push("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow max-w-sm w-full space-y-4"
      >
        <h1 className="text-xl font-semibold">Diagnostic Report</h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div>
          <label className="block text-sm">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </main>
  );
}
