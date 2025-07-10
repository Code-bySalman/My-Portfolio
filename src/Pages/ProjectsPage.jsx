import Header from "./Header";
import ProofOfWork from "./ProofOfWork";

const ProjectsPage = () => {
  return (
    <div className="bg-white dark:bg-[#0c0c0c] min-h-screen transition-colors duration-700">
      <Header />
      <div className="pt-8 px-4">
        <ProofOfWork />
      </div>
    </div>
  );
};

export default ProjectsPage;
