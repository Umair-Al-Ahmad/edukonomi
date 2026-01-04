import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Article from "./pages/Article";
import Quiz from "./pages/Quiz";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Article" element={<Article />} />
        <Route path="/Quiz" element={<Quiz />} />
      </Routes>
    </>
  );
}
