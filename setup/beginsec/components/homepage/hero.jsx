function Hero(){
    return (<section className="bg-gray-900 text-white py-16 px-8 md:px-16 lg:px-24 flex flex-col lg:flex-row justify-between">
        <div className="max-w-lg mb-8 lg:mb-24 ml-40">
          <h1 className="text-4xl font-bold mb-4">Strong Security Starts with Smart Users</h1>
          <p className="text-gray-400 mb-6">
            Lorem ipsum dolor sit amet consectetur. Imperdiet sem iaculis ut orci. Volutpat iaculis libero habitasse cursus eros id.
          </p>
          <div className="flex space-x-4">
            <button className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700">Get Started</button>
            <button className="border border-white px-6 py-3 rounded hover:bg-gray-700">Learn More</button>
          </div>
        </div>
        <div className="relative flex-shrink-0 mr-40">
        <div className="absolute bg-gradient-to-br from-[#161831] via-[#391A81] to-[#8F6CE1] blur-3xl rounded-full w-96 h-96 -top-10 -right-10"></div>
          <img src="/hero-image.png" alt="Security Illustration" className="w-full max-w-md" />
        </div>
      </section>);
}
export default Hero