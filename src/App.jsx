import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import CourseCatalog from "./pages/courses/CourseCatalog";
import CourseDetail from "./pages/courses/CourseDetail";
import ArticleReader from "./pages/courses/ArticleReader";
import Quiz from "./pages/Quiz";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Auth */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        {/* Main */}
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />

        {/* <Route path="/Course" element={<Course />} /> */}
        <Route path="/Course" element={<CourseCatalog />} />
        <Route path="/Course/:id" element={<CourseDetail />} />
        <Route path="/learn/:courseId/content/:contentId" element={<ArticleReader />} />

        <Route path="/Quiz" element={<Quiz />} />

        {/* Footer */}
        <Route path="/Footer" element={<Footer />} />
      </Routes>
    </>
  );
}
