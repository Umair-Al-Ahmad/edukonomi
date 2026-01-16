import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Mail, Lock, Eye, EyeOff, User, Check, Shield, Sparkles } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !password || !confirmPassword) {
      return setError("Semua field wajib diisi");
    }

    if (password !== confirmPassword) {
      return setError("Password tidak sama");
    }

    if (!agreement) {
      return setError("Harus menyetujui syarat & ketentuan");
    }

    try {
      setIsLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registrasi gagal");
      }

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 via-white to-indigo-50 px-4 py-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-100 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-100 rounded-full opacity-30 blur-2xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl shadow-purple-100/50 border border-purple-50"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className="flex justify-center items-center mb-4">
            <div className="p-3 bg-linear-to-br from-purple-800 to-indigo-7 00 rounded-2xl shadow-lg">
              <BookOpen className="text-white w-8 h-8" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Edu<span className="text-purple-600">konomi</span>
          </h1>
          <p className="text-gray-500 text-sm">Mari tumbuh dan menjadi bagian dari kami hari ini </p>
        </div>

        {/* Error & Success */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 bg-linear-to-r from-red-50 to-red-100 text-red-800 p-4 rounded-xl border border-red-200 flex items-center shadow-sm"
            >
              <div className="p-2 bg-red-100 rounded-lg mr-3">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <span className="font-medium">{error}</span>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 bg-linear-to-r from-emerald-50 to-green-100 text-emerald-800 p-4 rounded-xl border border-emerald-200 flex items-center shadow-sm"
            >
              <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                <Sparkles className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <span className="font-medium">Registrasi berhasil!</span>
                <p className="text-sm text-emerald-700 opacity-80">Mengarahkan ke halaman login...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center">
              <User className="w-4 h-4 mr-2 text-purple-500" />
              Nama Lengkap
            </label>
            <input
              type="text"
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-300 hover:border-purple-300"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center">
              <Mail className="w-4 h-4 mr-2 text-purple-500" />
              Email
            </label>
            <input
              type="email"
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-300 hover:border-purple-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contoh@email.com"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center">
              <Lock className="w-4 h-4 mr-2 text-purple-500" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-300 hover:border-purple-300 pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors p-1">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Konfirmasi Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-300 hover:border-purple-300 pr-12"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ketik ulang password"
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors p-1">
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Agreement */}
          <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl">
            <div className="relative flex items-center mt-1">
              <input
                type="checkbox"
                id="agreement"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-gray-300 checked:bg-purple-600 checked:border-purple-600 focus:ring-2 focus:ring-purple-200 focus:outline-none cursor-pointer"
              />
              {agreement && <Check className="absolute w-4 h-4 text-white left-0.5 top-0.5 pointer-events-none" />}
            </div>
            <label htmlFor="agreement" className="text-sm text-gray-600 cursor-pointer select-none">
              Saya menyetujui{" "}
              <Link to="/terms" className="text-purple-600 font-semibold hover:text-purple-700 underline underline-offset-2">
                Syarat & Ketentuan
              </Link>{" "}
              dan{" "}
              <Link to="/privacy" className="text-purple-600 font-semibold hover:text-purple-700 underline underline-offset-2">
                Kebijakan Privasi
              </Link>
            </label>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-linear-to-r from-purple-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Mendaftarkan...
              </>
            ) : (
              "Daftar Sekarang"
            )}
          </motion.button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative bg-white px-4 text-sm text-gray-400">atau</div>
          </div>

          {/* Login */}
          <p className="text-center text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-purple-600 font-semibold hover:text-purple-700 hover:underline underline-offset-2 transition-colors">
              Login di sini
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
