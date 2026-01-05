import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-3 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo dengan animasi */}
          <NavLink className="flex items-center text-xl font-bold text-gray-900 hover:text-purple-700 transition-colors" to="/">
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }} className="flex items-center justify-center w-9 h-9 rounded-md bg-gradient-to-br from-violet-600 to-purple-600 text-white font-bold mr-2">
              📘
            </motion.div>
            <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              Edukonomi
            </motion.span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" className={({ isActive }) => `px-4 py-2 rounded-lg font-medium transition-colors relative ${isActive ? "text-purple-700" : "text-gray-700 hover:text-purple-700"}`}>
              {({ isActive }) => (
                <>
                  Beranda
                  {isActive && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />}
                </>
              )}
            </NavLink>
            <NavLink to="/Course" className={({ isActive }) => `px-4 py-2 rounded-lg font-medium transition-colors relative ${isActive ? "text-purple-700" : "text-gray-700 hover:text-purple-700"}`}>
              {({ isActive }) => (
                <>
                  Materi Pembelajaran
                  {isActive && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />}
                </>
              )}
            </NavLink>
            <NavLink to="/Quiz" className={({ isActive }) => `px-4 py-2 rounded-lg font-medium transition-colors relative ${isActive ? "text-purple-700" : "text-gray-700 hover:text-purple-700"}`}>
              {({ isActive }) => (
                <>
                  Quiz
                  {isActive && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />}
                </>
              )}
            </NavLink>
            <NavLink to="/About" className={({ isActive }) => `px-4 py-2 rounded-lg font-medium transition-colors relative ${isActive ? "text-purple-700" : "text-gray-700 hover:text-purple-700"}`}>
              {({ isActive }) => (
                <>
                  Tentang
                  {isActive && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />}
                </>
              )}
            </NavLink>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <NavLink to="/login" className="px-6 py-2 border border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Masuk
              </NavLink>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <NavLink to="/register" className="px-6 py-2 bg-gradient-to-br from-violet-600 to-purple-600 text-white font-medium rounded-full hover:from-violet-700 hover:to-purple-700 transition-all shadow-sm hover:shadow">
                Daftar Gratis
              </NavLink>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button whileTap={{ scale: 0.95 }} className="md:hidden p-2 rounded-md text-gray-700 hover:text-purple-700 hover:bg-gray-100 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu dengan AnimatePresence */}
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="md:hidden overflow-hidden">
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex flex-col space-y-2">
                  <NavLink to="/" className={({ isActive }) => `px-4 py-3 rounded-lg font-medium ${isActive ? "text-purple-700 bg-purple-50" : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"}`} onClick={() => setIsOpen(false)}>
                    Beranda
                  </NavLink>
                  <NavLink
                    to="/Course"
                    className={({ isActive }) => `px-4 py-3 rounded-lg font-medium ${isActive ? "text-purple-700 bg-purple-50" : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Materi Pembelajaran
                  </NavLink>
                  <NavLink to="/Quiz" className={({ isActive }) => `px-4 py-3 rounded-lg font-medium ${isActive ? "text-purple-700 bg-purple-50" : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"}`} onClick={() => setIsOpen(false)}>
                    Quiz
                  </NavLink>
                  <NavLink
                    to="/About"
                    className={({ isActive }) => `px-4 py-3 rounded-lg font-medium ${isActive ? "text-purple-700 bg-purple-50" : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Tentang
                  </NavLink>

                  <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200 mt-2">
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <NavLink to="/login" className="px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 text-center block" onClick={() => setIsOpen(false)}>
                        Masuk
                      </NavLink>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }}>
                      <NavLink
                        to="/register"
                        className="px-4 py-3 bg-gradient-to-br from-violet-600 to-purple-600 text-white font-medium rounded-lg hover:from-violet-700 hover:to-purple-700 text-center block"
                        onClick={() => setIsOpen(false)}
                      >
                        Daftar Gratis
                      </NavLink>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
