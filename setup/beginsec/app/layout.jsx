import '@/styles/globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'CPE Shop',
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header className="bg-blue-700 text-white shadow-md">
            <nav className="container mx-auto flex justify-between items-center py-4 px-6">
            <Link href="/" className="text-2xl font-bold hover:text-gray-200">
              CPE Shop
            </Link>
            <div className="space-x-6">
              <Link href="/" className="hover:text-gray-200">Home</Link>
              <Link href="/products" className="hover:text-gray-200">Products</Link>
              <Link href="/login" className="hover:text-gray-200">Login</Link>
            </div>
          </nav>
        </header>
        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
