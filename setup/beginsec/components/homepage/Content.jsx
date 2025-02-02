import Topic from "./reuseable/Topic";
import ContentCard from "./reuseable/content-card";

function Content() {
  return (
    <section className="bg-gray-900 text-white py-16 px-8 md:px-16 lg:px-24 relative ">
      <div className="text-center mb-12">
        <Topic>Contents</Topic>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ContentCard
          src="/cybersecurity-job.png"
          alt="Cybersecurity Job"
          description="Cybersecurity Job"
        />
        <ContentCard
          src="/cyber-blue-team.png"
          alt="Cyber Blue Team"
          description="Cyber Blue Team"
        />
        <ContentCard
          src="/cyber-red-team.png"
          alt="Cyber Red Team"
          description="Cyber Red Team"
        />
        <ContentCard
          src="/basic-command-cyber.png"
          alt="Basic Command Cyber"
          description="Basic Command Cyber"
          ontop
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-br from-purple-600 via-purple-800 to-purple-900 blur-2xl h-64 -z-10"></div>
    </section>
  );
}
export default Content;
