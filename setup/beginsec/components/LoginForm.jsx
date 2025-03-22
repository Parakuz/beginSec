"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      setError(errorData.error || "Login failed");
      return;
    }

    const data = await res.json();
    if (data.success) {
      router.push(username === "admin" ? "/admin" : "/user");
    } else {
      setError(data.error || "Login failed");
    }
  };

  return (
<form onSubmit={handleSubmit} className="space-y-6">
  {error && <p className="text-red-500 text-sm text-center">{error}</p>}

  <div>
    <label className="form-label">Username</label>
    <input
      type="text"
      placeholder="Enter your username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="form-input mb-4"
    />
  </div>

  <div>
    <label className="form-label">Password</label>
    <input
      type="password"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="form-input mb-6"
    />
  </div>

  <button type="submit" className="text-center btn btn-primary w-full mt-6">Login</button>
</form>

  );
}
