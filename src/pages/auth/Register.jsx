import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Mail, Lock, Eye, EyeOff, User, Check, GraduationCap, Sparkles, Shield, Zap, Award } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validasi
    if (!name || !email || !password || !confirmPassword) {
      setError("Harap isi semua field");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Format email tidak valid");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      return;
    }

    if (!agreement) {
      setError("Anda harus menyetujui syarat dan ketentuan");
      return;
    }

    setIsLoading(true);

    // Simulasi proses registrasi dengan animasi
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }, 1500);
  };

  // Animasi variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
      },
    },
    tap: { scale: 0.98 },
  };

  const successVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.1, scale: 1 }} transition={{ duration: 1, delay: 0.5 }} className="absolute top-10 left-10 w-64 h-64 bg-purple-300 rounded-full blur-3xl" />
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.1, scale: 1 }} transition={{ duration: 1, delay: 0.7 }} className="absolute bottom-10 right-10 w-80 h-80 bg-blue-300 rounded-full blur-3xl" />

      <div className="max-w-md w-full relative z-10">
        {/* Logo with animation */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center mb-8">
          <motion.div variants={itemVariants} className="flex items-center justify-center mb-4">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="p-2 rounded-lg bg-linear-to-br from-purple-600 to-pink-600 shadow-lg mr-3">
              <BookOpen className="text-white" size={24} />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900">
              Edu<span className="text-purple-600">konomi</span>
            </motion.h2>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-3xl font-bold text-gray-900 mb-2">
            Daftar sebagai Murid
          </motion.h1>

          <motion.p variants={itemVariants} className="text-gray-600">
            Mulai perjalanan belajar ekonomi Anda
          </motion.p>
        </motion.div>

        {/* Form Card */}
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, type: "spring" }} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex justify-between items-center"
              >
                <span className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  {error}
                </span>
                <button type="button" className="text-red-500 hover:text-red-700" onClick={() => setError("")}>
                  ✕
                </button>
              </motion.div>
            )}

            {success && (
              <motion.div key="success" variants={successVariants} initial="initial" animate="animate" className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
                <span className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Registrasi berhasil! Mengalihkan ke halaman login...
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Keuntungan sebagai Murid */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="mb-6 p-4 bg-linear-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
            <motion.h3 whileHover={{ x: 5 }} className="font-semibold text-blue-800 mb-2 flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              Keuntungan sebagai Murid
            </motion.h3>
            <motion.ul variants={containerVariants} initial="hidden" animate="visible" className="space-y-2 text-sm text-blue-700">
              {["Akses ke semua materi pembelajaran", "Quiz interaktif dengan skor", "Sertifikat penyelesaian kursus", "Progress belajar yang terpantau"].map((item, index) => (
                <motion.li key={index} variants={itemVariants} className="flex items-center">
                  <motion.div whileHover={{ scale: 1.2 }} className="w-2 h-2 rounded-full bg-blue-500 mr-3" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama Input */}
            <motion.div variants={itemVariants} initial="hidden" animate="visible">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-400" />
                Nama Lengkap
              </label>
              <motion.div whileFocus={{ scale: 1.01 }}>
                <input
                  type="text"
                  id="name"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Masukkan nama lengkap Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </motion.div>
            </motion.div>

            {/* Email Input */}
            <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                Alamat Email
              </label>
              <motion.div whileFocus={{ scale: 1.01 }}>
                <input
                  type="email"
                  id="email"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </motion.div>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-2 text-sm text-gray-500">
                Gunakan email yang aktif untuk verifikasi
              </motion.p>
            </motion.div>

            {/* Password Input */}
            <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
              <label htmlFor="password" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Lock className="h-4 w-4 mr-2 text-gray-400" />
                Password
              </label>
              <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="block w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Buat password yang kuat"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </motion.button>
              </motion.div>
              <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "100%" }} transition={{ delay: 0.6 }} className="mt-2 flex items-center text-sm text-gray-500">
                <div className={`w-1/3 h-1 rounded-full mx-1 ${password.length >= 6 ? "bg-green-500" : "bg-gray-300"}`}></div>
                <div className={`w-1/3 h-1 rounded-full mx-1 ${password.length >= 8 ? "bg-yellow-500" : "bg-gray-300"}`}></div>
                <div className={`w-1/3 h-1 rounded-full mx-1 ${password.length >= 10 ? "bg-red-500" : "bg-gray-300"}`}></div>
                <span className="ml-2">Minimal 6 karakter</span>
              </motion.div>
            </motion.div>

            {/* Confirm Password Input */}
            <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-2">
                Konfirmasi Password
              </label>
              <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="block w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Ketik ulang password Anda"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </motion.button>
              </motion.div>
              <AnimatePresence>
                {password && confirmPassword && password === confirmPassword && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-2 text-sm text-green-600 flex items-center">
                    <Check className="h-4 w-4 mr-1" /> Password cocok
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Agreement Checkbox */}
            <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className="flex items-start bg-gray-50 p-4 rounded-lg">
              <motion.div whileTap={{ scale: 0.9 }} className="flex items-center h-5">
                <input id="agreement" type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded cursor-pointer" checked={agreement} onChange={(e) => setAgreement(e.target.checked)} required />
              </motion.div>
              <div className="ml-3">
                <label htmlFor="agreement" className="text-sm text-gray-700 cursor-pointer">
                  Saya menyetujui{" "}
                  <Link to="/terms" className="text-purple-600 hover:text-purple-800 font-medium">
                    Syarat & Ketentuan
                  </Link>{" "}
                  dan{" "}
                  <Link to="/privacy" className="text-purple-600 hover:text-purple-800 font-medium">
                    Kebijakan Privasi
                  </Link>{" "}
                  Edukonomi. Data saya akan digunakan hanya untuk keperluan pembelajaran.
                </label>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              type="submit"
              className="w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-lg text-white bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="flex items-center">
                  <svg className="mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Membuat Akun...
                </motion.div>
              ) : (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Daftar sebagai Murid
                </>
              )}
            </motion.button>

            {/* Login Link */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-center pt-4 border-t border-gray-100">
              <p className="text-gray-600">
                Sudah punya akun?{" "}
                <Link to="/login" className="font-medium text-purple-600 hover:text-purple-800 transition-colors">
                  Masuk di sini
                </Link>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Register;
