import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 70, damping: 12 }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center"
    >
      <div
        className={`
          rounded-full w-[850px] max-lg:w-[90%] px-4 py-2
          flex justify-center items-center gap-6
          transition-all duration-500
          ${
            isScrolled
              ? "bg-white/70 dark:bg-[#0c0c0c]/60 border border-gray-300 dark:border-white/20 backdrop-blur-md shadow-md dark:shadow-[0_4px_25px_rgba(255,255,255,0.05)]"
              : "bg-transparent border border-transparent"
          }
        `}
      >
        <div className="flex items-center gap-5 relative">
          {["home", "projects", "blog", "about"].map((icon) => (
            <div key={icon} className="relative group">
              <img
                src={`/icons/${icon}.png`}
                alt={icon}
                className="h-6 w-6 transition-all duration-300 hover:scale-110 cursor-pointer filter dark:invert dark:brightness-200"
                onClick={() => {
                  if (icon === "home") navigate("/");
                  else if (icon === "projects") navigate("/projects");
                  else if (icon === "about") navigate("/about");
                  else if (icon === "blog") navigate("/blogs");
                }}
              />
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap dark:bg-white dark:text-black shadow-md z-10">
                {icon.charAt(0).toUpperCase() + icon.slice(1)}
              </div>
            </div>
          ))}
        </div>

        <span className="text-gray-400 text-xl font-light">|</span>

        <div className="flex items-center gap-4">
          {["github", "linkedin", "twitter"].map((icon) => {
            const urls = {
              github: "https://github.com/Code-bySalman",
              linkedin: "https://www.linkedin.com/in/salmanusmani7/",
              twitter: "https://x.com/home",
            };

            return (
              <div key={icon} className="relative group">
                <img
                  src={`/icons/${icon}.png`}
                  alt={icon}
                  className="h-5 w-5 transition-all duration-300 hover:scale-110 cursor-pointer filter dark:invert dark:brightness-200"
                  onClick={() => window.open(urls[icon], "_blank")}
                />
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap dark:bg-white dark:text-black shadow-md z-10">
                  {icon.charAt(0).toUpperCase() + icon.slice(1)}
                </div>
              </div>
            );
          })}
        </div>

        <span className="text-gray-400 text-xl font-light">|</span>

        <div onClick={handleThemeToggle} className="cursor-pointer hover:scale-110 transition-all duration-300 relative group">
          <img
            src={isDarkMode ? "/icons/moon.png" : "/icons/theme.png"}
            alt="Toggle Theme"
            className="h-6 w-6 filter dark:invert dark:brightness-200"
          />
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap dark:bg-white dark:text-black shadow-md z-10">
            {isDarkMode ? "Dark Mode" : "Light Mode"}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;
