import ButtonPrimary from "./reuseable/ButtonPrimary";
import Topic from "./reuseable/Topic";
import Detail from "./reuseable/Detail";

function About() {
  return (
    <section className="text-white py-16 px-8 md:px-16 lg:px-24 flex flex-col lg:flex-row justify-center items-center gap-x-64 container mx-auto">
      <div className="relative flex-shrink-0">
        <img
          src="/homepage/about.png"
          alt="Security Illustration"
          className="w-full max-w-md relative transform scale-110 -translate-y-10 z-10 w-96 h-24"
        />
        <div className="absolute bg-gradient-to-br from-[#161831] via-[#391A81] to-[#8F6CE1] blur-3xl rounded-full w-96 h-96 -top-40 -left-60"></div>
      </div>
      <div className="max-w-lg mb-8 lg:mb-24">
        <Topic>About Begin Sec</Topic>
        <Detail>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi,
          explicabo ad. Delectus vero recusandae quaerat, beatae harum minima
          omnis non?
        </Detail>
        <ButtonPrimary>Read More</ButtonPrimary>
      </div>
    </section>
  );
}

export default About;
