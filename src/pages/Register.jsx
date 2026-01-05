import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Mail, Lock, Eye, EyeOff, User, ArrowRight, GraduationCap, Users, Check } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState("murid"); // "murid" atau "instruktur"
  const [agreement, setAgreement] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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

    // Simulasi proses registrasi
    setTimeout(() => {
      setIsLoading(false);
      alert(`Registrasi berhasil sebagai ${userType === "murid" ? "Murid" : "Instruktur"}!`);
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 shadow mr-3">
              <BookOpen className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Edu<span className="text-purple-600">konomi</span>
            </h2>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buat Akun Baru</h1>
          <p className="text-gray-600">Bergabunglah dengan platform belajar ekonomi terbaik</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
              <span>{error}</span>
              <button type="button" className="text-red-500 hover:text-red-700" onClick={() => setError("")}>
                ✕
              </button>
            </div>
          )}

          {/* Pilihan Tipe Pengguna */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Daftar sebagai:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserType("murid")}
                className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${userType === "murid" ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-purple-300"}`}
              >
                <div className="text-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-2 ${userType === "murid" ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-500"}`}>
                    <GraduationCap size={24} />
                  </div>
                  <span className={`font-medium ${userType === "murid" ? "text-purple-700" : "text-gray-700"}`}>Murid</span>
                  <p className="text-xs text-gray-500 mt-1">Belajar ekonomi</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setUserType("instruktur")}
                className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${userType === "instruktur" ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-purple-300"}`}
              >
                <div className="text-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-2 ${userType === "instruktur" ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-500"}`}>
                    <Users size={24} />
                  </div>
                  <span className={`font-medium ${userType === "instruktur" ? "text-purple-700" : "text-gray-700"}`}>Instruktur</span>
                  <p className="text-xs text-gray-500 mt-1">Mengajar ekonomi</p>
                </div>
              </button>
            </div>
          </div>

          {/* Deskripsi Tipe Pengguna */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              {userType === "murid"
                ? "Sebagai Murid, Anda dapat mengakses semua materi pembelajaran, mengikuti quiz, dan mendapatkan sertifikat."
                : "Sebagai Instruktur, Anda dapat membuat konten pembelajaran, mengelola kursus, dan membimbing murid."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {userType === "murid" ? "Nama Lengkap" : "Nama Instruktur"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder={userType === "murid" ? "Nama lengkap Anda" : "Nama lengkap instruktur"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Alamat Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">{userType === "murid" ? "Contoh: siswa@email.com" : "Contoh: instruktur@email.com"}</p>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Buat password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">Minimal 6 karakter</p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Ulangi password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="agreement" type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" checked={agreement} onChange={(e) => setAgreement(e.target.checked)} required />
              </div>
              <div className="ml-3">
                <label htmlFor="agreement" className="text-sm text-gray-700">
                  Saya menyetujui{" "}
                  <Link to="/terms" className="text-purple-600 hover:text-purple-800 font-medium">
                    Syarat & Ketentuan
                  </Link>{" "}
                  dan{" "}
                  <Link to="/privacy" className="text-purple-600 hover:text-purple-800 font-medium">
                    Kebijakan Privasi
                  </Link>{" "}
                  Edukonomi
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 font-medium transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Daftar sebagai {userType === "murid" ? "Murid" : "Instruktur"}
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Sudah punya akun?{" "}
                <Link to="/login" className="font-medium text-purple-600 hover:text-purple-800 transition-colors">
                  Masuk di sini
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Info Tambahan */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Dengan mendaftar, Anda mendapatkan akses ke:</p>
          <div className="flex flex-wrap justify-center gap-4 mt-3">
            <span className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">📚 Materi Gratis</span>
            <span className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">🧠 Quiz Interaktif</span>
            <span className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">🏆 Sertifikat</span>
            {userType === "instruktur" && <span className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">💰 Penghasilan</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
