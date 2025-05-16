import Topic from "./reuseable/Topic";
import ContentCard from "./reuseable/Content-card";

function Content() {
  return (
    <section className="text-white py-16 px-8 md:px-16 lg:px-24 relative ">
      <div className="text-center mb-12">
        <Topic>Contents</Topic>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ContentCard
          href="/learning-path/1"
          src="/learning-path/fundamental.png"
          alt="Fundamental For Web Security"
          description={<span className="font-medium">Fundamental For Web Security</span>}
        />
        <ContentCard
          href="/learning-path/2"
          src="/learning-path/web-exploit.png"
          alt="Web Exploit Basic"
          description={<span className="font-medium">Web Exploit Basic</span>}
        />
        <ContentCard
          href="/learning-path/3"
          src="/learning-path/cyber-therat.png"
          alt="ภัยคุกคามและกฏหมายทางด้านไซเบอร์"
          description={<span className="font-ibmthai font-medium">ภัยคุกคามและกฏหมายทางด้านไซเบอร์</span>}
          ontop
        />
      </div>
    </section>
  );
}
export default Content;
