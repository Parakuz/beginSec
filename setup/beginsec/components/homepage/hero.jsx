import ButtonPrimary from "./reuseable/Button_primary";
import ButtonSecondary from "./reuseable/Button_secondary";
import Topic from "./reuseable/Topic";
import Detail from "./reuseable/Detail";

function Hero() {
  return (
    <section className="bg-gray-900 text-white py-16 px-8 md:px-16 lg:px-24 flex flex-col lg:flex-row justify-between">
      <div className="max-w-lg mb-8 lg:mb-24 ml-40">
        <Topic>Strong Security Starts with Smart Users</Topic>
        <Detail>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
          quisquam.
        </Detail>
        <div className="flex space-x-4">
          <ButtonPrimary>Get Started</ButtonPrimary>
          <ButtonSecondary>Learn More</ButtonSecondary>
        </div>
      </div>
      <div className="relative flex-shrink-0 mr-40">
        <div className="absolute bg-gradient-to-br from-[#161831] via-[#391A81] to-[#8F6CE1] blur-3xl rounded-full w-96 h-96 -top-10 -right-10"></div>
        <img
          src="/hero-image.png"
          alt="Security Illustration"
          className="w-full max-w-md"
        />
      </div>
    </section>
  );
}
export default Hero;
