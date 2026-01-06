import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlayCircle, BookOpen, Clock, Award, TrendingUp, Calendar, Target, CheckCircle2, Star, Users, Home, Search, Filter, ChevronRight } from "lucide-react";

// Mock data untuk enrolled courses
const mockEnrolledCourses = [
  {
    id: 1,
    title: "Pengantar Ekonomi Makro",
    description: "Memahami konsep dasar ekonomi makro seperti GDP, inflasi, pengangguran, dan kebijakan fiskal.",
    category: "makro",
    difficulty: "pemula",
    duration: "4 jam",
    lessons: 12,
    instructor: "Prof. Ahmad Fauzi",
    image: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=400&h=250&fit=crop",
    progress: 65,
    lastAccessed: "2 hari yang lalu",
    enrolledDate: "15 Jan 2024",
  },
  {
    id: 2,
    title: "Analisis Pasar & Permintaan",
    description: "Pelajari bagaimana pasar bekerja, kurva permintaan-penawaran, dan elastisitas.",
    category: "mikro",
    difficulty: "pemula",
    duration: "3 jam",
    lessons: 10,
    instructor: "Dr. Sarah Wijaya",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    progress: 30,
    lastAccessed: "5 hari yang lalu",
    enrolledDate: "10 Feb 2024",
  },
  {
    id: 3,
    title: "Kebijakan Moneter & Bank Sentral",
    description: "Pelajari peran bank sentral, instrumen kebijakan moneter, dan pengendalian inflasi.",
    category: "moneter",
    difficulty: "menengah",
    duration: "6 jam",
    lessons: 18,
    instructor: "Dr. Maya Dewi",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
    progress: 100,
    lastAccessed: "Hari ini",
    enrolledDate: "5 Jan 2024",
  },
  {
    id: 4,
    title: "Analisis Data Ekonomi dengan Excel",
    description: "Teknik analisis data ekonomi menggunakan Microsoft Excel untuk pengambilan keputusan.",
    category: "makro",
    difficulty: "menengah",
    duration: "5 jam",
    lessons: 14,
    instructor: "Fajar Pratama, M.Sc",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=250&fit=crop",
    progress: 0,
    lastAccessed: "Belum dimulai",
    enrolledDate: "1 Mar 2024",
  },
];

// Mock statistics
const mockStats = {
  totalCourses: 4,
  totalHours: 18,
  completedCourses: 1,
  learningStreak: 7,
};

const MyCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, in-progress, completed, not-started
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulasi fetch data dari API
    setIsLoading(true);
    setTimeout(() => {
      setCourses(mockEnrolledCourses);
      setStats(mockStats);
      setIsLoading(false);

      // Check if user is logged in
      const user = localStorage.getItem("user");
      if (!user) {
        navigate("/login", { state: { from: "/my-courses" } });
      }
    }, 500);
  }, [navigate]);

  const filteredCourses = courses.filter((course) => {
    // Filter berdasarkan status
    let statusMatch = true;
    if (filter === "in-progress") {
      statusMatch = course.progress > 0 && course.progress < 100;
    } else if (filter === "completed") {
      statusMatch = course.progress === 100;
    } else if (filter === "not-started") {
      statusMatch = course.progress === 0;
    }

    // Filter berdasarkan pencarian
    const searchMatch = searchQuery === "" || course.title.toLowerCase().includes(searchQuery.toLowerCase()) || course.category.toLowerCase().includes(searchQuery.toLowerCase());

    return statusMatch && searchMatch;
  });

  const getProgressColor = (progress) => {
    if (progress === 0) return "bg-gray-200";
    if (progress === 100) return "bg-green-500";
    return "bg-purple-500";
  };

  const getProgressText = (progress) => {
    if (progress === 0) return "Belum Dimulai";
    if (progress === 100) return "Selesai";
    return `${progress}% Selesai`;
  };

  const getProgressButtonText = (progress) => {
    if (progress === 0) return "Mulai Belajar";
    if (progress === 100) return "Tinjau Ulang";
    return "Lanjutkan Belajar";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard Pembelajaran</h1>
              <p className="text-purple-100">Lacak kemajuan belajar dan kelola kursus Anda</p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/course" className="px-6 py-3 bg-white text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-colors">
                + Materi Baru
              </Link>
              <button className="p-3 rounded-full bg-white/20 hover:bg-white/30">
                <Home className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Total Materi",
              value: stats.totalCourses,
              icon: BookOpen,
              color: "bg-blue-500",
              change: "+2 bulan lalu",
            },
            {
              label: "Jam Belajar",
              value: `${stats.totalHours} jam`,
              icon: Clock,
              color: "bg-green-500",
              change: "18 jam total",
            },
            {
              label: "Selesai",
              value: stats.completedCourses,
              icon: Award,
              color: "bg-purple-500",
              change: "25% dari total",
            },
            {
              label: "Streak Belajar",
              value: `${stats.learningStreak} hari`,
              icon: TrendingUp,
              color: "bg-yellow-500",
              change: "+3 hari",
            },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <span className="text-sm text-gray-500">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Materi Saya</h2>
              <p className="text-gray-600">
                Menampilkan {filteredCourses.length} dari {courses.length} materi
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari materi..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter */}
              <div className="relative">
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full">
                  <option value="all">Semua Materi</option>
                  <option value="in-progress">Sedang Dipelajari</option>
                  <option value="completed">Selesai</option>
                  <option value="not-started">Belum Dimulai</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            {filter !== "all" && (
              <button onClick={() => setFilter("all")} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full flex items-center gap-1 hover:bg-purple-200">
                {filter === "in-progress" && "Sedang Dipelajari"}
                {filter === "completed" && "Selesai"}
                {filter === "not-started" && "Belum Dimulai"}
                <span className="ml-1">×</span>
              </button>
            )}
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center gap-1 hover:bg-blue-200">
                Pencarian: "{searchQuery}"<span className="ml-1">×</span>
              </button>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{searchQuery ? "Materi tidak ditemukan" : "Belum ada materi"}</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">{searchQuery ? "Coba gunakan kata kunci lain atau lihat semua materi" : "Mulai perjalanan belajar Anda dengan mendaftar materi pertama"}</p>
            <Link to="/course" className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors inline-block">
              Lihat Katalog Materi
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col lg:flex-row">
                  {/* Course Image */}
                  <div className="lg:w-64 h-48 lg:h-auto relative">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    {course.progress === 100 && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          Selesai
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Course Content */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{course.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                {course.category}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {course.duration}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {course.lessons} pelajaran
                              </span>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              course.difficulty === "pemula" ? "bg-green-100 text-green-800" : course.difficulty === "menengah" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {course.difficulty}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Bergabung: {course.enrolledDate}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Target className="h-4 w-4" />
                              Terakhir: {course.lastAccessed}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-gray-700">Instruktur: {course.instructor}</div>
                        </div>
                      </div>

                      {/* Progress Section */}
                      <div className="pt-6 mt-6 border-t border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-gray-600">Progress Pembelajaran</span>
                              <span className="font-medium text-gray-900">{getProgressText(course.progress)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(course.progress)}`} style={{ width: `${course.progress}%` }}></div>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button
                              onClick={() => navigate(`/learn/${course.id}`)}
                              className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${course.progress === 100 ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"} text-white transition-colors`}
                            >
                              <PlayCircle className="h-5 w-5" />
                              {getProgressButtonText(course.progress)}
                            </button>
                            <button onClick={() => navigate(`/course/${course.id}`)} className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                              Detail
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations Section */}
        {filteredCourses.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Rekomendasi untuk Anda</h3>
              <Link to="/course" className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1">
                Lihat semua <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Ekonomi Perilaku",
                  category: "perilaku",
                  description: "Eksplorasi psikologi dalam keputusan ekonomi",
                  students: "480 siswa",
                  level: "lanjutan",
                },
                {
                  title: "Perdagangan Internasional",
                  category: "internasional",
                  description: "Memahami teori dan praktik perdagangan global",
                  students: "750 siswa",
                  level: "menengah",
                },
                {
                  title: "Ekonomi Pembangunan",
                  category: "pembangunan",
                  description: "Strategi pembangunan ekonomi berkelanjutan",
                  students: "350 siswa",
                  level: "lanjutan",
                },
              ].map((course, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <BookOpen className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{course.title}</h4>
                      <p className="text-sm text-gray-600">{course.category}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">{course.students}</span>
                      <span className={`px-2 py-1 rounded text-xs ${course.level === "pemula" ? "bg-green-100 text-green-800" : course.level === "menengah" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                        {course.level}
                      </span>
                    </div>
                    <button className="text-purple-600 hover:text-purple-700 font-medium">Lihat →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 bg-linear-to-r from-purple-50 to-blue-50 rounded-2xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Tingkatkan Skill Ekonomi Anda</h3>
            <p className="text-gray-600 mb-6">Dapatkan sertifikat dan tingkatkan karir dengan menyelesaikan lebih banyak materi</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/course" className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors">
                Temukan Materi Baru
              </Link>
              <button className="px-6 py-3 border border-purple-600 text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-colors">Lihat Pencapaian</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
