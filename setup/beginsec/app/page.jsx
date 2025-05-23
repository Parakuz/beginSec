import Hero from "@/components/homepage/Hero";
import About from "@/components/homepage/About";
import HightLight from "@/components/homepage/Hightlight";
import Content from "@/components/homepage/Content";
import SocialToggle from "@/components/homepage/SocialToggle";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <HightLight />
      <Content />
      <SocialToggle />
    </>
  );
}
