// src/Pages/BlogsPage.jsx
import { blogData } from "../data/blogData";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const BlogsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-[#0c0c0c] min-h-screen transition-colors duration-700">
      <Header />
      <div className="pt-28 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-black dark:text-white">My Blogs</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {blogData.map((blog) => (
            <div
              key={blog.id}
              onClick={() => navigate(`/blogs/${blog.id}`)}
              className="cursor-pointer border border-gray-200 dark:border-white/10 rounded-lg p-5 shadow-md hover:shadow-lg transition dark:bg-[#181818] bg-white"
            >
              <h2 className="text-xl font-semibold text-black dark:text-white mb-2">{blog.title}</h2>
              {blog.subtitle && <p className="text-gray-500 dark:text-gray-300">{blog.subtitle}</p>}
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <span>{blog.date}</span> • <span>{blog.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
