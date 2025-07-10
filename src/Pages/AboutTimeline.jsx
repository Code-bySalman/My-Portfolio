import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Header from "./Header";
import useDarkMode from "../hooks/useDarkMode";

const timelineData = [
    {
    title: "School Graduation",
    subtitle: "A journey ful of experiences and learnings came to an end(2022)",
    description: "My school graduation reflects years of academic growth and cherished friendships. I once dreamed of traveling the world, but life’s twists have taught me adaptability. This milestone sets a strong foundation for my future.",
  },
    {
    title: "Started College",
    subtitle: " Navigating Challenges and Coding Dreams in My Third Year",
    description: "As a third-year Computer Science student at a tier-3 college, I’ve faced challenges like limited resources and outdated curricula, yet found thrill in self-learning. Teaching myself advanced coding through projects like a MERN-based chat app has fueled my growth. Despite pausing my travel dreams, the excitement of mastering new technologies drives my journey forward.",
  },
  {
    title: "EchoSphere.",
    subtitle: "A dynamic MERN-based real-time chat app powered by Socket.IO for instant messaging and seamless user interaction.(2025)",
    description: "I developed a real-time chat application using the MERN stack (MongoDB, Express.js, React, Node.js) with Socket.IO for seamless, bidirectional communication. The app enables users to send and receive messages instantly, with MongoDB storing chat history for persistence. It features a responsive React frontend, secure Express.js backend, and real-time updates powered by Socket.IO."
  },
  {
    title: "Skypetel",
    subtitle: "A cutting-edge website for a global healthcare company, delivering intuitive design and seamless functionality to enhance user access to vital health services. (2024)",
    description: "I built a user-friendly website for a global healthcare company, featuring a responsive design and intuitive interface to streamline access to medical services and information. The platform, developed with modern web technologies, ensures secure data handling and seamless navigation for users worldwide.",
  },
  {
    title: "Wanderly",
    subtitle: "An AI-powered full-stack website for effortless trip and vacation planning.(2024)",
    description: "I developed a full-stack website integrated with AI to assist users in planning personalized trips and vacations with ease. The platform leverages a modern tech stack for a responsive interface and secure backend, ensuring seamless user experiences. AI-driven features provide tailored travel recommendations, itineraries, and real-time updates for a stress-free planning process.",
  },
   {
    title: "Working on something exciting!",
    subtitle: "2025",
    description: "Busy building bigger and better Saas.",
  },
];

const AboutTimeline = () => {
  const isDark = useDarkMode();

  return (
    <div className="bg-white dark:bg-[#0c0c0c] min-h-screen transition-colors duration-700">
      <Header />
      <div className="pt-10 px-4">
        <h1 className="text-4xl font-bold text-center text-black dark:text-white mb-10">
          My Journey!
        </h1>

        <VerticalTimeline lineColor="#d1d5db">
          {timelineData.map((item, idx) => (
            <VerticalTimelineElement
              key={idx}
              iconStyle={{
                background: '#22c55e',
                boxShadow: 'none',
                width: '12px',
                height: '12px',
                marginLeft: '-6px',
              }}
              icon={<div />}
              contentStyle={{
                background: isDark ? '#000000' : '#ffffff',
                color: isDark ? '#ffffff' : '#000000',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                borderRadius: '0.5rem',
                padding: '0',
              }}
              contentArrowStyle={{
                borderRight: `7px solid ${isDark ? '#000000' : '#ffffff'}`
              }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <h4 className="text-green-600 font-semibold">{item.subtitle}</h4>
                <p className="pt-2 text-sm">{item.description}</p>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default AboutTimeline;
