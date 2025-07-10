import Header from "./Header";
import AboutTimeline from "./AboutTimeline"; 
const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-[#0c0c0c] min-h-screen transition-colors duration-700">
      <Header />
      <div className="pt-20 px-4">
        <AboutTimeline />
      </div>
    </div>
  );
};

export default AboutPage;
