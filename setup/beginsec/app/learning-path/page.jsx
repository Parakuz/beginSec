import CardSection from "@/components/learning-path/CardSection";

export default function Home() {
  return (
    <div className="min-h-screen text-white p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mt-8">
          <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
            <img
              src="/learning-path/learning.webp"
              alt="Illustration"
              className="w-80 h-auto"
            />
          </div>
          <div className="relative text-center md:text-left md:w-1/2">
            <div className="absolute bg-gradient-to-br from-[#161831] via-[#391A81] to-[#8F6CE1] blur-3xl rounded-full w-96 h-96 -top-20 -right-60 -z-10"></div>

            <h1 className="text-4xl font-bold mb-4">Learning Path</h1>
            <p className="text-lg text-gray-300 font-ibmthai">
              เริ่มต้นจากพื้นฐานสู่ความเข้าใจด้านความปลอดภัยไซเบอร์อย่างลึกซึ้ง
              เราออกแบบเส้นทางการเรียนรู้ให้เหมาะกับมือใหม่
              โดยมีบทเรียนที่เรียงตามลำดับขั้น พร้อมแบบฝึกหัด แล็บจำลอง
              และเกมสนุก ๆ เพื่อให้คุณพัฒนาทักษะได้อย่างมั่นใจและต่อเนื่อง
            </p>
          </div>
        </div>

        {/* Cards Section */}
        <CardSection />
      </div>
    </div>
  );
}
