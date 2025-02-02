import Navbar from "@/components/homepage/navbar";
import Hero from "@/components/homepage/hero";

export default function Home() {
 
  return (
    <>
      <Navbar />
      <Hero />
      {/* About Section */}
      <section className="bg-gray-900 text-white py-16 px-8 md:px-16 lg:px-24 flex flex-col lg:flex-row justify-between">
        <div className="relative flex-shrink-0 ml-40">
        <div className="absolute bg-gradient-to-br from-[#161831] via-[#391A81] to-[#8F6CE1] blur-3xl rounded-full w-96 h-96 -top-10 -left-10"></div>
          <img src="/hero-image.png" alt="Security Illustration" className="w-full max-w-md" />
        </div>
        <div className="max-w-lg mb-8 lg:mb-24 mr-40">
          <h2 className="text-3xl font-bold mb-4">About Begin Sec</h2>
          <p className="text-gray-400 mb-6">
            Lorem ipsum dolor sit amet consectetur. Imperdiet sem iaculis ut orci. Volutpat iaculis libero habitasse cursus eros id.
          </p>
          <div className="flex space-x-4">
            <button className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700">Get Started</button>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="bg-gray-900 text-white py-16 px-8 md:px-16 lg:px-24 flex flex-col lg:flex-row items-center justify-center">
        <div className=" mb-12 lg:mb-0 lg:mr-16">
          <h2 className="text-3xl font-bold mb-4">Highlights</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-6">
            Lorem ipsum dolor sit amet consectetur. Vulputate nunc purus platea molestie luctus sit aliquet augue varius.
          </p>
          <div className="flex space-x-4">
            <button className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700">Get Started</button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded text-center -translate-y-4">
            <div className="text-5xl">กขค</div>
            <p className="mt-4">Thai language</p>
          </div>
          <div className="bg-gray-800 p-6 rounded text-center">
            <div className="text-5xl">📘</div>
            <p className="mt-4">Free to learn</p>
          </div>
          <div className="bg-gray-800 p-6 rounded text-center -translate-y-4">
            <div className="text-5xl">👩‍🎓</div>
            <p className="mt-4">User friendly</p>
          </div>
          <div className="bg-gray-800 p-6 rounded text-center">
            <div className="text-5xl">🔒</div>
            <p className="mt-4">Basic of cyber</p>
          </div>
        </div>
      </section>

      {/* Contents Section */}
      <section className="bg-gray-900 text-white py-16 px-8 md:px-16 lg:px-24 relative ">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Contents</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-700 p-6 rounded">
            <img src="/cybersecurity-job.png" alt="Cybersecurity Job" className="w-full h-40 object-cover rounded mb-4" />
            <p className="text-center">Cybersecurity Job</p>
          </div>
          <div className="bg-gray-700 p-6 rounded">
            <img src="/cyber-blue-team.png" alt="Cyber Blue Team" className="w-full h-40 object-cover rounded mb-4" />
            <p className="text-center">Cyber Blue Team</p>
          </div>
          <div className="bg-gray-700 p-6 rounded">
            <img src="/cyber-red-team.png" alt="Cyber Red Team" className="w-full h-40 object-cover rounded mb-4" />
            <p className="text-center">Cyber Red Team</p>
          </div>
          <div className="bg-gray-700 p-6 rounded z-10">
            <img src="/basic-command-cyber.png" alt="Basic Command Cyber" className="w-full h-40 object-cover rounded mb-4" />
            <p className="text-center">Basic Command Cyber</p>
          </div>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 bg-gradient-to-br from-purple-600 via-purple-800 to-purple-900 blur-2xl h-64 -z-10"
        ></div>
      </section>

      {/* Footer Section */}
      <footer className="relative bg-gray-900 md:px-16 text-white overflow-x-clip h-64">
        <div className="border-t border-gray-700 mb-12 z-10"></div>
      <div className="absolute bg-gradient-to-br from-[#161831] via-[#391A81] to-[#8F6CE1] blur-3xl rounded-full w-96 h-96 -top-60 -right-20"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ml-40">
          <div>
            <h3 className="font-bold text-lg mb-4">begin sec</h3>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur. Amet vel a sit ac a lectus auctor. Bibendum dolor.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Home</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Learning Path</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Profile</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Term & Conditions</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy & Policy</a></li>
            </ul>
          </div>
          <div className="z-10">
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Help</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
            </ul>
          </div>
        </div>
        {/* <div
          className="absolute inset-x-0 bottom-0 bg-gradient-to-br from-purple-600 via-purple-800 to-purple-900 blur-2xl h-64 -z-10"
        ></div> */}
      </footer>
    </>
  );
}
