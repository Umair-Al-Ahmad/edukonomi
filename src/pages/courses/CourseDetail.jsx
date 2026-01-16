import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BookOpen, FileText, Download, ArrowLeft, CheckCircle2, Target, User, Award } from "lucide-react";
import { coursesData } from "../../data/courses";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      // Cari course berdasarkan ID
      const foundCourse = coursesData.find((course) => course.id === parseInt(id));
      setCourse(foundCourse);
      setIsLoading(false);

      // Check enrollment status (simulasi)
      const enrolled = localStorage.getItem(`enrolled_${id}`);
      setIsEnrolled(!!enrolled);
    }, 500);
  }, [id]);

  const handleEnroll = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login", { state: { from: `/course/${id}` } });
      return;
    }

    setIsEnrolling(true);
    setTimeout(() => {
      localStorage.setItem(`enrolled_${id}`, "true");
      setIsEnrolled(true);
      setIsEnrolling(false);
      alert("Berhasil mendaftar ke kursus!");
    }, 1000);
  };

  const handleStartLearning = () => {
    // Navigasi ke halaman belajar/artikel
    navigate(`/learn/${id}/content/1`);
  };

  const getCategoryName = (categoryId) => {
    const categories = {
      makro: "Ekonomi Makro",
      mikro: "Ekonomi Mikro",
      internasional: "Ekonomi Internasional",
      perilaku: "Ekonomi Perilaku",
      pembangunan: "Ekonomi Pembangunan",
      moneter: "Ekonomi Moneter",
    };
    return categories[categoryId] || categoryId;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "pemula":
        return "bg-green-500/30 text-white";
      case "menengah":
        return "bg-yellow-500/30 text-white";
      case "lanjutan":
        return "bg-red-500/30 text-white";
      default:
        return "bg-gray-500/30 text-white";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Materi tidak ditemukan</h2>
          <p className="text-gray-600 mb-4">Materi yang Anda cari tidak tersedia.</p>
          <button onClick={() => navigate("/Course")} className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors">
            Lihat Katalog Materi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <button onClick={() => navigate("/Course")} className="flex items-center text-gray-600 hover:text-purple-600 font-medium">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Kembali ke Katalog
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-linear-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">{getCategoryName(course.category)}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(course.difficulty)}`}>{course.difficulty}</span>
                {course.featured && (
                  <span className="px-3 py-1 bg-yellow-500/30 text-white text-sm font-medium rounded-full flex items-center">
                    <Award className="h-3 w-3 mr-1" />
                    Unggulan
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
              <p className="text-lg text-purple-100">{course.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-purple-200">
                  <BookOpen className="h-4 w-4" />
                  {course.content.length} artikel pembelajaran
                </span>
                <span className="text-purple-300">•</span>
                <span className="flex items-center gap-1 text-purple-200">
                  <FileText className="h-4 w-4" />
                  {course.resources.length} materi PDF
                </span>
                <span className="text-purple-300">•</span>
                <span className="flex items-center gap-1 text-purple-200">
                  <User className="h-4 w-4" />
                  Instruktur: {course.instructor}
                </span>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 space-y-4">
                  <div className="text-center">
                    {course.price === 0 ? (
                      <div>
                        <span className="text-4xl font-bold text-green-600">Gratis</span>
                        <div className="text-sm text-gray-500 mt-1">Tanpa biaya pendaftaran</div>
                      </div>
                    ) : (
                      <div>
                        <span className="text-4xl font-bold text-gray-900">Rp {course.price.toLocaleString()}</span>
                        <div className="text-sm text-gray-500">Satu kali pembayaran</div>
                      </div>
                    )}
                  </div>

                  {isEnrolled ? (
                    <button onClick={handleStartLearning} className="w-full flex items-center justify-center py-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-lg">
                      <BookOpen className="mr-3 h-6 w-6" />
                      Mulai Belajar
                    </button>
                  ) : (
                    <button
                      onClick={handleEnroll}
                      disabled={isEnrolling}
                      className="w-full flex items-center justify-center py-4 bg-linear-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg disabled:opacity-50"
                    >
                      {isEnrolling ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Memproses...
                        </>
                      ) : (
                        <>
                          <BookOpen className="mr-3 h-6 w-6" />
                          {course.price === 0 ? "Daftar Gratis" : "Daftar Sekarang"}
                        </>
                      )}
                    </button>
                  )}

                  <div className="pt-4 space-y-3">
                    <h4 className="font-medium text-gray-900">Materi ini termasuk:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-purple-600" />
                        {course.content.length} artikel pembelajaran
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-purple-600" />
                        {course.resources.length} materi PDF
                      </li>
                      <li className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-purple-600" />
                        Sertifikat penyelesaian
                      </li>
                      <li className="flex items-center gap-2">
                        <Download className="h-4 w-4 text-purple-600" />
                        Akses download materi
                      </li>
                    </ul>
                  </div>

                  {course.price === 0 && (
                    <div className="pt-4 border-t">
                      <p className="text-xs text-gray-500 text-center">Tidak ada risiko, batalkan kapan saja</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: BookOpen },
              { id: "content", label: "Konten", icon: FileText },
              { id: "instructor", label: "Instruktur", icon: User },
              { id: "resources", label: "Materi", icon: Download },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id ? "border-purple-600 text-purple-600" : "border-transparent text-gray-600 hover:text-purple-600"}`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Course Overview */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Materi Ini</h2>
                  <div className="prose max-w-none text-gray-600">
                    <p>Materi {course.title} ini dirancang khusus untuk membantu Anda memahami konsep-konsep dasar ekonomi dengan cara yang mudah dan aplikatif.</p>
                    <p className="mt-4">
                      Materi ini menggunakan pendekatan berbasis artikel dan contoh praktis dari kondisi ekonomi Indonesia, sehingga Anda dapat mengaplikasikan pengetahuan yang diperoleh dalam analisis ekonomi sehari-hari.
                    </p>
                  </div>
                </div>

                {/* What You'll Learn */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Apa yang akan Anda pelajari</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {course.whatYouLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Requirements */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Persyaratan</h2>
                  <div className="space-y-2">
                    {course.requirements.map((req, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="h-2 w-2 bg-purple-600 rounded-full mt-2 shrink-0"></div>
                        <span className="text-gray-700">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Objectives */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Tujuan Pembelajaran</h2>
                  <div className="space-y-2">
                    {course.objectives.map((obj, index) => (
                      <div key={index} className="flex items-start gap-3 bg-purple-50 p-4 rounded-lg">
                        <Target className="h-5 w-5 text-purple-600 mt-0.5 shrink-0" />
                        <span className="text-gray-700">{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "content" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Konten Pembelajaran</h2>
                  <div className="text-sm text-gray-600">{course.content.length} artikel pembelajaran</div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {course.content.map((item, index) => (
                    <div key={item.id} className={`p-4 ${index < course.content.length - 1 ? "border-b" : ""}`}>
                      <div className="flex items-start gap-4">
                        <div className="shrink-0">
                          <BookOpen className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">Artikel pembelajaran</p>
                        </div>
                        <div>
                          {isEnrolled ? (
                            <Link to={`/learn/${course.id}/content/${item.id}`} className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                              Baca
                            </Link>
                          ) : (
                            <span className="text-sm text-gray-400">Daftar untuk akses</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "instructor" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Tentang Instruktur</h2>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-start gap-6">
                    <img src={course.instructorImage} alt={course.instructor} className="w-24 h-24 rounded-full border-4 border-purple-100" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{course.instructor}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">{coursesData.filter((c) => c.instructor === course.instructor).length}</span>
                          <span className="text-gray-600">Materi</span>
                        </div>
                      </div>
                      <p className="mt-4 text-gray-600">{course.instructorBio}</p>

                      <div className="mt-6 pt-6 border-t">
                        <h4 className="font-medium text-gray-900 mb-3">Prestasi & Kualifikasi</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {["Ph.D Ekonomi, Universitas Indonesia", "Penulis 5 Buku Bestseller", "Konsultan Pemerintah", "10+ Tahun Pengalaman Mengajar"].map((achievement, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-purple-600" />
                              <span className="text-sm text-gray-700">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "resources" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Materi Tambahan</h2>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {course.resources.map((resource, index) => (
                    <div key={index} className={`p-4 ${index < course.resources.length - 1 ? "border-b" : ""}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-red-500" />
                          <div>
                            <h3 className="font-medium text-gray-900">{resource.name}</h3>
                            <p className="text-sm text-gray-600">
                              {resource.type.toUpperCase()} • {resource.size}
                            </p>
                          </div>
                        </div>
                        <button
                          className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 flex items-center gap-2"
                          onClick={() => {
                            // Simulasi download
                            alert(`Mengunduh ${resource.name}`);
                          }}
                        >
                          <Download className="h-4 w-4" />
                          Unduh
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Course Info */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Informasi Materi</h3>
                <div className="space-y-4">
                  {[
                    { label: "Kategori", value: getCategoryName(course.category), icon: BookOpen },
                    { label: "Level", value: course.difficulty, icon: Target },
                    { label: "Instruktur", value: course.instructor, icon: User },
                    { label: "Artikel", value: `${course.content.length} artikel`, icon: FileText },
                    { label: "Materi PDF", value: `${course.resources.length} file`, icon: Download },
                  ].map((info, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <info.icon className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-gray-700">{info.label}</span>
                      </div>
                      <span className="font-medium text-gray-900">{info.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">FAQ</h3>
                <div className="space-y-4">
                  {[
                    { q: "Apakah materi ini gratis?", a: "Ya, materi ini sepenuhnya gratis tanpa biaya." },
                    { q: "Apakah ada sertifikat?", a: "Ya, sertifikat diberikan setelah menyelesaikan semua artikel." },
                    { q: "Berapa lama akses ke materi?", a: "Akses seumur hidup setelah mendaftar." },
                    { q: "Bisa download materi?", a: "Ya, semua materi PDF bisa didownload." },
                  ].map((faq, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-gray-900 text-sm mb-1">{faq.q}</h4>
                      <p className="text-sm text-gray-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
