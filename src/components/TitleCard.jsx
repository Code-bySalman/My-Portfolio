import { motion } from "framer-motion";
import TiltedCard from "./TiltedCard";

const projects = [
  {
    id: 1,
    title: "Eco‑Sphere",
    description:
      "Ecosphere is a real‑time chat platform enabling seamless 1‑on‑1 and group messaging with typing indicators, read receipts, and instant updates.",
    image: "/icons/ecosphere.png",
    website: "https://echo-sphere-fe-66ln.vercel.app/",
    github: "https://github.com/Code-bySalman/EcoSphere2-BE",
    stack: ["MERN", "Socket.io", "Tailwind CSS", "WebRTC"],
  },
  {
    id: 2,
    title: "SkyPetel",
    description:
      "Professional web platform for SkyPetel healthcare product, showcasing scientific proof and user testimonials to build credibility and conversions.",
    image: "/icons/skypetel.png",
    website: "https://sky-petel-d5l8.vercel.app/",
    github: "https://github.com/Code-bySalman/Sky-Petel",
    stack: ["Next.js", "TypeScript", "Prisma"],
  },
  {
    id: 3,
    title: "Wanderly",
    description:
      "Wanderly is an AI‑powered travel planner that crafts personalized itineraries, destination insights, and stress‑free trip management.",
    image: "/icons/Wanderly.png",
    website: "https://wanderly1.vercel.app/",
    github: "https://github.com/Code-bySalman/Wanderly1",
    stack: ["React", "Google Gemini", "MongoDB"],
  },
  {
    id: 4,
    title: "Learning and working on better and bigger projects",
    description:
      "I know I need good projects under my belt and I am working on it, till then do check out my mentioned projects here.",
    image: "/icons/Wanderly.png",
  },
];

const hoverAnimation = {
  initial: { y: 0, scale: 1, rotate: 0, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
  hover: {
    y: -8,
    scale: 1.03,
    rotate: 0.5,
    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.15)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 12,
      duration: 0.05,
    },
  },
};

const TitleCard = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto mt-10 px-4">
    {projects.map((p) => (
      <motion.div
        key={p.id}
        variants={hoverAnimation}
        initial="initial"
        whileHover="hover"
        className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6 flex flex-col space-y-4 transition-all duration-300"
      >
        <div className="w-[70px] h-[70px]">
          <TiltedCard
            imageSrc={p.image}
            altText=""
            containerWidth="100%"
            containerHeight="100%"
            imageWidth="100%"
            imageHeight="100%"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={false}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {p.title}
          </h3>
          <p className="text-md text-gray-700 dark:text-gray-300">
            {p.description}
          </p>
        </div>

        {Array.isArray(p.stack) && p.stack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {p.stack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {(p.website || p.github) && (
          <div className="flex gap-3 pt-2">
            {p.website && (
              <a
                href={p.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-4 py-1.5 text-sm rounded-md bg-black text-white dark:bg-white dark:text-black hover:scale-105 transition"
              >
                <img
                  src="/icons/website.png"
                  alt="web"
                  className="h-4 w-4 filter invert dark:invert-0"
                />
                Website
              </a>
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-4 py-1.5 text-sm rounded-md bg-black text-white dark:bg-white dark:text-black hover:scale-105 transition"
              >
                <img
                  src="/icons/github.png"
                  alt="git"
                  className="h-4 w-4 filter invert dark:invert-0"
                />
                GitHub
              </a>
            )}
          </div>
        )}
      </motion.div>
    ))}
  </div>
);

export default TitleCard;
