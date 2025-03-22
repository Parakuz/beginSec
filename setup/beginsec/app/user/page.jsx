"use client";
import { useEffect, useState } from "react";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const [flag, setFlag] = useState('');

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFlag(data.flag);
      })
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-6 shadow-lg rounded-lg max-w-lg w-full">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">User Information</h1>
        {user ? (
          <div className="text-gray-700">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Password (MD5 Hash):</strong> {user.password}</p>
            <p className="mt-4 text-green-600 font-semibold">
              The flag for SQL Injection is: <span className="bg-yellow-200 px-2 py-1 rounded">{flag}</span>
            </p>
          </div>
        ) : (
          <p className="text-red-500">Loading...</p>
        )}
      </div>
    </div>
  );
}
