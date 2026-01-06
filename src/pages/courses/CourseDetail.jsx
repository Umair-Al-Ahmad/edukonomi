import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, Clock, BookOpen, Users, PlayCircle, CheckCircle2, Lock, BarChart, Award, Target, TrendingUp, ArrowLeft, Share2, Bookmark, FileText, ChevronRight, MessageSquare, Download, ThumbsUp, Eye, Calendar, User } from "lucide-react";

const mockCourse = {
  id: 1,
  title: "Pengantar Ekonomi Makro",
  description: "Memahami konsep dasar ekonomi makro seperti GDP, inflasi, pengangguran, dan kebijakan fiskal. Materi ini dirancang untuk pemula yang ingin memahami dasar-dasar ekonomi makro dengan cara yang mudah dan aplikatif.",
  category: "makro",
  difficulty: "pemula",
  duration: "4 jam",
  students: 1250,
  rating: 4.8,
  totalRatings: 125,
  lessons: 12,
  instructor: "Prof. Ahmad Fauzi",
  instructorBio: "Lulusan Universitas Indonesia dengan pengalaman 10+ tahun di bidang pendidikan ekonomi. Penulis 5 buku ekonomi bestseller.",
  instructorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad",
  image: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=800&h=450&fit=crop",
  featured: true,
  price: 0,
  createdAt: "2024-01-15",
  lastUpdated: "2024-03-20",
  objectives: [
    "Memahami konsep dasar ekonomi makro",
    "Mengenal indikator ekonomi utama",
    "Menganalisis kebijakan fiskal dan moneter",
    "Memahami siklus bisnis dan inflasi",
    "Menerapkan konsep ekonomi dalam kehidupan sehari-hari",
    "Membaca dan menganalisis data ekonomi",
  ],
  requirements: ["Tidak perlu pengalaman sebelumnya", "Semangat untuk belajar", "Koneksi internet stabil", "Siap berpartisipasi dalam diskusi", "Kemampuan dasar menggunakan komputer"],
  whatYouLearn: ["Konsep GDP dan cara menghitungnya", "Memahami inflasi dan dampaknya", "Analisis pengangguran", "Kebijakan fiskal pemerintah", "Sistem perbankan dan moneter", "Neraca pembayaran internasional"],
  lessons: [
    { id: 1, title: "Pengenalan Ekonomi Makro", duration: "25:00", type: "video", preview: true },
    { id: 2, title: "Konsep GDP dan Pertumbuhan Ekonomi", duration: "30:00", type: "video" },
    { id: 3, title: "Inflasi dan Deflasi", duration: "35:00", type: "video" },
    { id: 4, title: "Pengangguran dan Ketenagakerjaan", duration: "28:00", type: "video" },
    { id: 5, title: "Quiz: Konsep Dasar", duration: "15:00", type: "quiz" },
    { id: 6, title: "Kebijakan Fiskal", duration: "40:00", type: "video" },
    { id: 7, title: "Kebijakan Moneter", duration: "38:00", type: "video" },
    { id: 8, title: "Sistem Keuangan dan Perbankan", duration: "32:00", type: "video" },
    { id: 9, title: "Neraca Pembayaran Internasional", duration: "35:00", type: "video" },
    { id: 10, title: "Quiz: Kebijakan Ekonomi", duration: "20:00", type: "quiz" },
    { id: 11, title: "Studi Kasus: Indonesia", duration: "45:00", type: "case-study" },
    { id: 12, title: "Ujian Akhir", duration: "60:00", type: "exam" },
  ],
  reviews: [
    {
      id: 1,
      user: "Budi Santoso",
      rating: 5,
      date: "2024-02-15",
      comment: "Materi sangat lengkap dan mudah dipahami. Instrukturnya menjelaskan dengan sangat jelas.",
      helpful: 24,
    },
    {
      id: 2,
      user: "Sari Dewi",
      rating: 4,
      date: "2024-02-10",
      comment: "Bagus untuk pemula, namun beberapa bagian agak cepat. Overall sangat membantu.",
      helpful: 18,
    },
  ],
  resources: [
    { name: "Slide Presentasi", type: "pdf", size: "2.4 MB" },
    { name: "Latihan Soal", type: "doc", size: "1.8 MB" },
    { name: "Data Ekonomi Indonesia", type: "excel", size: "3.2 MB" },
    { name: "Referensi Buku", type: "pdf", size: "4.5 MB" },
  ],
};

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Simulasi fetch data dari API
    setIsLoading(true);
    setTimeout(() => {
      setCourse(mockCourse);
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
    navigate(`/learn/${id}`);
  };

  const getLessonIcon = (type) => {
    switch (type) {
      case "video":
        return <PlayCircle className="h-5 w-5 text-blue-600" />;
      case "quiz":
        return <BarChart className="h-5 w-5 text-purple-600" />;
      case "exam":
        return <Award className="h-5 w-5 text-yellow-600" />;
      case "case-study":
        return <FileText className="h-5 w-5 text-green-600" />;
      default:
        return <BookOpen className="h-5 w-5 text-gray-600" />;
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "doc":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "excel":
        return <FileText className="h-5 w-5 text-green-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
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
          <button onClick={() => navigate("/course")} className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors">
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
          <div className="py-4 flex items-center justify-between">
            <button onClick={() => navigate("/course")} className="flex items-center text-gray-600 hover:text-purple-600 font-medium">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Kembali ke Katalog
            </button>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50">
                <Bookmark className="h-5 w-5 text-gray-600" />
              </button>
            </div>
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
                <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                  {course.category === "makro"
                    ? "Ekonomi Makro"
                    : course.category === "mikro"
                    ? "Ekonomi Mikro"
                    : course.category === "internasional"
                    ? "Ekonomi Internasional"
                    : course.category === "perilaku"
                    ? "Ekonomi Perilaku"
                    : course.category === "pembangunan"
                    ? "Ekonomi Pembangunan"
                    : "Ekonomi Moneter"}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${course.difficulty === "pemula" ? "bg-green-500/30 text-white" : course.difficulty === "menengah" ? "bg-yellow-500/30 text-white" : "bg-red-500/30 text-white"}`}>
                  {course.difficulty}
                </span>
                {course.featured && (
                  <span className="px-3 py-1 bg-yellow-500/30 text-white text-sm font-medium rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Unggulan
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
              <p className="text-lg text-purple-100">{course.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-yellow-300">{course.rating.toFixed(1)}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(course.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}`} />
                    ))}
                  </div>
                  <span className="text-purple-200">({course.totalRatings} ulasan)</span>
                </div>
                <span className="text-purple-300">•</span>
                <span className="flex items-center gap-1 text-purple-200">
                  <Users className="h-4 w-4" />
                  {course.students.toLocaleString()} siswa
                </span>
                <span className="text-purple-300">•</span>
                <span className="flex items-center gap-1 text-purple-200">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </span>
                <span className="text-purple-300">•</span>
                <span className="flex items-center gap-1 text-purple-200">
                  <Calendar className="h-4 w-4" />
                  Terakhir update: {course.lastUpdated}
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
                      <PlayCircle className="mr-3 h-6 w-6" />
                      Lanjutkan Belajar
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
                          <PlayCircle className="mr-3 h-6 w-6" />
                          {course.price === 0 ? "Daftar Gratis" : "Daftar Sekarang"}
                        </>
                      )}
                    </button>
                  )}

                  <div className="pt-4 space-y-3">
                    <h4 className="font-medium text-gray-900">Materi ini termasuk:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <PlayCircle className="h-4 w-4 text-purple-600" />
                        {course.lessons.filter((l) => l.type === "video").length} video pembelajaran
                      </li>
                      <li className="flex items-center gap-2">
                        <BarChart className="h-4 w-4 text-purple-600" />
                        {course.lessons.filter((l) => l.type === "quiz").length} quiz interaktif
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-purple-600" />
                        {course.resources.length} materi tambahan
                      </li>
                      <li className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-purple-600" />
                        Sertifikat penyelesaian
                      </li>
                      <li className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-purple-600" />
                        Akses forum diskusi
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-purple-600" />
                        Akses seumur hidup
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
              { id: "overview", label: "Overview", icon: Eye },
              { id: "curriculum", label: "Kurikulum", icon: BookOpen },
              { id: "instructor", label: "Instruktur", icon: User },
              { id: "reviews", label: "Ulasan", icon: Star },
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
                    <p>
                      Materi Pengantar Ekonomi Makro ini dirancang khusus untuk membantu pemula memahami konsep-konsep dasar ekonomi makro yang penting. Anda akan mempelajari bagaimana ekonomi bekerja dalam skala besar, mulai dari
                      pengukuran kinerja ekonomi hingga kebijakan yang mempengaruhinya.
                    </p>
                    <p className="mt-4">Materi ini menggabungkan teori dengan contoh-contoh praktis dari kondisi ekonomi Indonesia, sehingga Anda dapat mengaplikasikan pengetahuan yang diperoleh dalam analisis ekonomi sehari-hari.</p>
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

            {activeTab === "curriculum" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Kurikulum</h2>
                  <div className="text-sm text-gray-600">
                    {course.lessons.length} pelajaran • {course.duration}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {course.lessons.map((lesson, index) => (
                    <div key={lesson.id} className={`p-4 ${index < course.lessons.length - 1 ? "border-b" : ""}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="shrink-0">{getLessonIcon(lesson.type)}</div>
                          <div>
                            <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {lesson.duration}
                              </span>
                              <span className="capitalize">{lesson.type}</span>
                              {lesson.preview && <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">Preview</span>}
                            </div>
                          </div>
                        </div>
                        {!isEnrolled && !lesson.preview && <Lock className="h-5 w-5 text-gray-400" />}
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
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{course.rating}</span>
                          <span className="text-gray-600">Rating Kursus</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span className="font-medium">{course.students.toLocaleString()}</span>
                          <span className="text-gray-600">Siswa</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <PlayCircle className="h-4 w-4 text-gray-600" />
                          <span className="font-medium">5</span>
                          <span className="text-gray-600">Kursus</span>
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

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Ulasan Siswa</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-3xl font-bold">{course.rating}</span>
                      <div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < Math.floor(course.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">Berdasarkan {course.totalRatings} ulasan</p>
                      </div>
                    </div>
                  </div>
                  <button className="px-6 py-2 border border-purple-600 text-purple-600 font-medium rounded-lg hover:bg-purple-50">Tulis Ulasan</button>
                </div>

                <div className="space-y-4">
                  {course.reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{review.user}</h4>
                            <div className="flex items-center gap-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <ThumbsUp className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                      <div className="mt-4 text-sm text-gray-500">{review.helpful} orang merasa ulasan ini membantu</div>
                    </div>
                  ))}
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
                          {getResourceIcon(resource.type)}
                          <div>
                            <h3 className="font-medium text-gray-900">{resource.name}</h3>
                            <p className="text-sm text-gray-600 capitalize">
                              {resource.type} • {resource.size}
                            </p>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 flex items-center gap-2">
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
              {/* Quick Stats */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Statistik</h3>
                <div className="space-y-4">
                  {[
                    { label: "Level", value: course.difficulty, icon: TrendingUp },
                    { label: "Durasi", value: course.duration, icon: Clock },
                    { label: "Pelajaran", value: course.lessons.length, icon: BookOpen },
                    { label: "Siswa", value: course.students.toLocaleString(), icon: Users },
                    { label: "Rating", value: course.rating.toFixed(1), icon: Star },
                  ].map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <stat.icon className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-gray-700">{stat.label}</span>
                      </div>
                      <span className="font-medium text-gray-900">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Courses */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Materi Terkait</h3>
                <div className="space-y-4">
                  {[
                    { title: "Ekonomi Mikro Dasar", category: "mikro", students: "850" },
                    { title: "Kebijakan Moneter", category: "moneter", students: "620" },
                    { title: "Perdagangan Internasional", category: "internasional", students: "750" },
                  ].map((course, index) => (
                    <div key={index} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{course.title}</h4>
                          <p className="text-xs text-gray-600">{course.category}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                        <Users className="h-3 w-3" />
                        <span>{course.students} siswa</span>
                      </div>
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
                    { q: "Apakah ada sertifikat?", a: "Ya, sertifikat diberikan setelah menyelesaikan ujian akhir." },
                    { q: "Berapa lama akses ke materi?", a: "Akses seumur hidup setelah mendaftar." },
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
