import { useParams } from "react-router-dom";
import { blogData } from "../data/blogData";
import Header from "./Header";

const BlogDetailPage = () => {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="text-center pt-40 text-black dark:text-white">
        <Header />
        <h1 className="text-3xl font-bold">Blog not found 😢</h1>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0c0c0c] min-h-screen transition-colors duration-700">
      <Header />
      <div className="pt-28 px-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-black dark:text-white">
          {blog.title}
        </h1>
        {blog.subtitle && (
          <p className="text-lg text-gray-500 dark:text-gray-300 mb-4">
            {blog.subtitle}
          </p>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          {blog.date} • {blog.readTime}
        </p>

        {/* ✅ Render HTML content properly */}
        <div
          className="text-lg text-black dark:text-white leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
};

export default BlogDetailPage;
