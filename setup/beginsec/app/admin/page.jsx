
'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [flag, setFlag] = useState('');

  useEffect(() => {
    fetch('/api/admin')
      .then(res => res.json())
      .then(data => setFlag(data.flag));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Admin Dashboard</h1>
        <p className="text-lg text-gray-700">Welcome, admin!</p>
        <p className="mt-4 text-lg font-semibold text-green-600">
          The flag for Broken Access Control is: 
          <span className="bg-yellow-200 px-2 py-1 rounded ml-1">{flag}</span>
        </p>
      </div>
    </div>
  );
}
