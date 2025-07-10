import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { blogData } from "../data/blogData";

const Blog = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen px-6 py-24 bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        {blogData.map((blog) => (
          <div
            key={blog.id}
            className="mb-14 cursor-pointer group"
            onClick={() => navigate(`/blog/${blog.id}`)}
          >
            <h2 className="text-2xl font-bold group-hover:underline">{blog.title}</h2>
            {blog.subtitle && (
              <h3 className="mt-2 text-gray-600 dark:text-gray-400 font-semibold">
                {blog.subtitle}
              </h3>
            )}
            <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">{blog.content}</p>
            <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              {blog.date} · {blog.readTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
