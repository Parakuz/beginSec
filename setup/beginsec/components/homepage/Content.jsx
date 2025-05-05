import Topic from "./reuseable/Topic";
import ContentCard from "./reuseable/Content-card";

function Content() {
  return (
    <section className="text-white py-16 px-8 md:px-16 lg:px-24 relative ">
      <div className="text-center mb-12">
        <Topic>Contents</Topic>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ContentCard
          src="/homepage/cybersecurity-job.png"
          alt="Cybersecurity Job"
          description="Cybersecurity Job"
        />
        <ContentCard
          src="/homepage/cyber-blue-team.png"
          alt="Cyber Blue Team"
          description="Cyber Blue Team"
        />
        <ContentCard
          src="/homepage/cyber-red-team.png"
          alt="Cyber Red Team"
          description="Cyber Red Team"
        />
        <ContentCard
          src="/homepage/basic-command-cyber.png"
          alt="Basic Command Cyber"
          description="Basic Command Cyber"
          ontop
        />
      </div>
    </section>
  );
}
export default Content;
