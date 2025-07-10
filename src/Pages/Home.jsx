import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import ProofOfWork from "./ProofOfWork";
import Header from "./Header";
import VariableProximity from "../components/VariableProximity";

const experiences = [
  {
    year: "2024",
    role: "Full Stack Intern",
    company: "SkyPetel",
    description:
      "Built and deployed full website using React, Tailwind and Vercel.",
  },
  {
    year: "2023",
    role: "Open Source Contributor",
    company: "GirlScript",
    description:
      "Contributed to open-source projects and mentored beginners.",
  },
];

const skills = [
  "React",
  "Node.js",
  "MongoDB",
  "Tailwind CSS",
  "JavaScript",
  "Next.js",
  "Socket.io",
  "Prisma",
];

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const containerRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const html = document.documentElement;
    isDarkMode ? html.classList.add("dark") : html.classList.remove("dark");
  }, [isDarkMode]);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_my7fewe",
        "template_knpqzbp",
        e.target,
        "lbvqyfozOjfDLaE9I"
      )
      .then(
        () => alert("Message sent!"),
        () => alert("Failed to send message.")
      );
    e.target.reset();
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black transition-colors duration-700 ease-in-out">
      <Header />

      <section
        ref={containerRef}
        className="pt-36 pb-32 flex flex-col items-center text-center px-4 transition-colors duration-700 bg-white dark:bg-black"
      >
        <img
          src="/icons/profile.jpg"
          alt="Avatar"
          className="w-24 h-24 rounded-full mb-6 transition-all duration-500"
        />

        <h1 className="text-5xl font-extrabold mb-4 text-black dark:text-white transition-colors duration-700">
          <VariableProximity
            label={"Hi, I'm Salman Usmani"}
            containerRef={containerRef}
            fromFontVariationSettings="'wght' 400, 'opsz' 8"
            toFontVariationSettings="'wght' 1000, 'opsz' 48"
            falloff="linear"
            radius={140}
            className="inline-block"
          />
        </h1>

        <p className="max-w-xl text-xl text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-700">
          <VariableProximity
            label={`I'm 22, a 3rd-year CS student who's spent more nights fixing bugs than sleeping. Grinding through dev with stubbornness, Stack Overflow and silent screams. It’s chaotic, frustrating and occasionally awesome. If you’re building something cool and need a co‑builder, let’s connect.`}
            containerRef={containerRef}
            fromFontVariationSettings="'wght' 400, 'opsz' 8"
            toFontVariationSettings="'wght' 900, 'opsz' 36"
            falloff="linear"
            radius={100}
            className="inline-block"
          />
        </p>

        <div className="flex gap-4 mt-6">
          <button className="px-4 py-2 rounded-lg shadow-lg bg-black text-white dark:bg-white dark:text-black hover:scale-105 transition-transform duration-300">
            Book a meet
          </button>
          <button
            onClick={scrollToContact}
            className="px-4 py-2 rounded-lg shadow-lg bg-black text-white dark:bg-white dark:text-black hover:scale-105 transition-transform duration-300"
          >
            Get in touch
          </button>
        </div>
      </section>

      <ProofOfWork />

      <section className="py-20 bg-white dark:bg-black text-center">
        <h2 className="text-3xl font-bold mb-10 text-black dark:text-white">Experience</h2>
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-black p-6 rounded-xl shadow-md text-left border dark:border-gray-800"
            >
              <h3 className="text-xl font-semibold text-black dark:text-white">
                {exp.role} <span className="text-gray-500"> @ {exp.company}</span>
              </h3>
              <p className="text-sm text-gray-500 mb-2">{exp.year}</p>
              <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-black text-center">
        <h2 className="text-3xl font-bold mb-10 text-black dark:text-white">Skills</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-sm text-gray-800 dark:text-white"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section
        ref={contactRef}
        className="py-20 bg-white dark:bg-black text-center px-4"
      >
        <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Get in Touch</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8">Want to collaborate or have a question? Drop a message!</p>

        <form onSubmit={sendEmail} className="max-w-xl mx-auto space-y-4">
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            className="w-full p-3 rounded border dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            className="w-full p-3 rounded border dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white"
          />
          <textarea
            name="message"
            required
            rows="5"
            placeholder="Your Message"
            className="w-full p-3 rounded border dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white"
          />
          <button
            type="submit"
            className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded hover:scale-105 transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;
