import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Course from "./pages/Article";
import Quiz from "./pages/Quiz";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Course" element={<Course />} />
        <Route path="/Quiz" element={<Quiz />} />
        <Route path="/Footer" element={<Footer />} />
      </Routes>
    </>
  );
}
