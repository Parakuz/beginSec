export default function Home() {
  return (
    <div className="p-8 min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Welcome to CPE Shop</h1>
      <p className="text-lg text-gray-700 max-w-xl leading-relaxed">
        นี่คือเว็บสำหรับฝึกโจมตีช่องโหว่ด้าน Cyber Security แบบ hands-on-lab คุณสามารถลองโจมตีช่องโหว่ 
        <strong> XSS, SQL Injection, Cryptographic Failure และ Broken Access Control </strong> ได้ 
        โดยเว็บนี้จะมี flag ซ่อนอยู่ให้คุณค้นหา
      </p>
    </div>
  );
}
