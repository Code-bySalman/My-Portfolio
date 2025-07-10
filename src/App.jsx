import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ProjectsPage from "./Pages/ProjectsPage"; 
import AboutPage from "./Pages/AboutPage";
import BlogsPage from "./Pages/BlogsPage";
import BlogDetailPage from "./Pages/BlogDetailPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
         <Route path="/about"    element={<AboutPage />} />
           <Route path="/blogs" element={<BlogsPage />} />
  <Route path="/blogs/:id" element={<BlogDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
