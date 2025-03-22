
'use client';
import LoginForm from '../../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
