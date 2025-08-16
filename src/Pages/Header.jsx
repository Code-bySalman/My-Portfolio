import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Moon, Sun, FileDown } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const navItems = [
    { key: "home", path: "/" },
    { key: "projects", path: "/projects" },
    { key: "blog", path: "/blogs" },
    { key: "about", path: "/about" },
  ];

  const getActiveKeyFromPath = (pathname) => {
    if (pathname === "/") return "home";
    if (pathname.startsWith("/projects")) return "projects";
    if (pathname.startsWith("/blogs")) return "blog";
    if (pathname.startsWith("/about")) return "about";
    return null;
  };

  const activeKey = getActiveKeyFromPath(location.pathname);

  const socialUrls = {
    github: "https://github.com/Code-bySalman",
    linkedin: "https://www.linkedin.com/in/salmanusmani7/",
    twitter: "https://x.com/home",
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
          ${isScrolled
            ? "bg-white/70 dark:bg-[#0c0c0c]/60 border border-gray-300 dark:border-white/20 backdrop-blur-md shadow-md dark:shadow-[0_4px_25px_rgba(255,255,255,0.05)]"
            : "bg-transparent border border-transparent"}
        `}
      >
        {/* Navigation Icons */}
        <div className="flex items-center gap-5 relative">
          {navItems.map((item) => {
            const isActive = activeKey === item.key;
            return (
              <button
                key={item.key}
                onClick={() => navigate(item.path)}
                aria-current={isActive ? "page" : undefined}
                className={`relative group rounded-full p-1 transition-all duration-200 focus:outline-none ${
                  isActive ? "scale-110 ring-2 ring-blue-500 bg-white/80 dark:bg-white/10" : "hover:scale-105"
                }`}
                title={item.key.charAt(0).toUpperCase() + item.key.slice(1)}
              >
                <img
                  src={`/icons/${item.key}.png`}
                  alt={item.key}
                  className="h-6 w-6 filter dark:invert dark:brightness-200"
                />
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap dark:bg-white dark:text-black shadow-md z-10">
                  {item.key.charAt(0).toUpperCase() + item.key.slice(1)}
                </div>
              </button>
            );
          })}
        </div>

        <span className="text-gray-400 text-xl font-light">|</span>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {["github", "linkedin", "twitter"].map((icon) => (
            <div key={icon} className="relative group">
              <button
                onClick={() => window.open(socialUrls[icon], "_blank")}
                className="rounded-full p-1 transition-all duration-200 hover:scale-110 focus:outline-none"
                title={icon}
              >
                <img src={`/icons/${icon}.png`} alt={icon} className="h-5 w-5 filter dark:invert dark:brightness-200" />
              </button>
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap dark:bg-white dark:text-black shadow-md z-10">
                {icon.charAt(0).toUpperCase() + icon.slice(1)}
              </div>
            </div>
          ))}
        </div>

        <span className="text-gray-400 text-xl font-light">|</span>

        {/* Theme + Resume Icons */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <div
            onClick={handleThemeToggle}
            className="cursor-pointer hover:scale-110 transition-all duration-300 relative group"
            role="button"
            aria-pressed={isDarkMode}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleThemeToggle();
            }}
          >
            {isDarkMode ? (
              <Moon className="h-6 w-6 text-black dark:text-white" />
            ) : (
              <Sun className="h-6 w-6 text-black dark:text-white" />
            )}
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap dark:bg-white dark:text-black shadow-md z-10">
              {isDarkMode ? "Dark Mode" : "Light Mode"}
            </div>
          </div>

          {/* Resume Download */}
          <a
            href="/Salman-Usmani-Resume.pdf"
            download
            className="cursor-pointer hover:scale-110 transition-all duration-300 relative group"
            title="Download Resume"
          >
            <FileDown className="h-6 w-6 text-black dark:text-white" />
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap dark:bg-white dark:text-black shadow-md z-10">
              Resume
            </div>
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;
