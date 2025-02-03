import ButtonPrimary from "./reuseable/ButtonPrimary";
import Topic from "./reuseable/Topic";
import Detail from "./reuseable/Detail";

function About() {
  return (
    <section className="bg-gray-900 text-white py-16 px-8 md:px-16 lg:px-24 flex flex-col lg:flex-row justify-between">
      <div className="relative flex-shrink-0 ml-40">
        <div className="absolute bg-gradient-to-br from-[#161831] via-[#391A81] to-[#8F6CE1] blur-3xl rounded-full w-96 h-96 -top-10 -left-10"></div>
        <img
          src="/hero-image.png"
          alt="Security Illustration"
          className="w-full max-w-md"
        />
      </div>
      <div className="max-w-lg mb-8 lg:mb-24 mr-40">
        <Topic>About Begin Sec</Topic>
        <Detail>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi,
          explicabo ad. Delectus vero recusandae quaerat, beatae harum minima
          omnis non?
        </Detail>
        <ButtonPrimary>Get Startede</ButtonPrimary>
      </div>
    </section>
  );
}

export default About;
