import { useState } from "react";
import { Search, Filter, BookOpen, Clock, Users, Star, ChevronRight, PlayCircle, FileText, BarChart, Target, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Course = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("semua");

  const categories = [
    { id: "semua", name: "Semua Kategori" },
    { id: "makro", name: "Ekonomi Makro" },
    { id: "mikro", name: "Ekonomi Mikro" },
    { id: "Akuntansi", name: "Perusahaan Jasa" },
    { id: "Akuntansi", name: "Perusahaan Dagang" },
    { id: "moneter", name: "Ekonomi Moneter" },
  ];

  const difficultyLevels = [
    { level: "pemula", label: "Pemula", color: "bg-green-100 text-green-800" },
    { level: "menengah", label: "Menengah", color: "bg-yellow-100 text-yellow-800" },
    { level: "lanjutan", label: "Lanjutan", color: "bg-red-100 text-red-800" },
  ];

  const courses = [
    {
      id: 1,
      title: "Pengantar Ekonomi Makro",
      description: "Memahami konsep dasar ekonomi makro seperti GDP, inflasi, pengangguran, dan kebijakan fiskal.",
      category: "makro",
      difficulty: "pemula",
      duration: "4 jam",
      students: 1250,
      rating: 4.8,
      lessons: 12,
      instructor: "Prof. Ahmad Fauzi",
      image: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=400&h-250&fit=crop",
      featured: true,
    },
    {
      id: 2,
      title: "Analisis Pasar & Permintaan",
      description: "Pelajari bagaimana pasar bekerja, kurva permintaan-penawaran, dan elastisitas.",
      category: "mikro",
      difficulty: "pemula",
      duration: "3 jam",
      students: 890,
      rating: 4.7,
      lessons: 10,
      instructor: "Dr. Sarah Wijaya",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      featured: true,
    },
    {
      id: 3,
      title: "Perdagangan Internasional",
      description: "Memahami teori perdagangan internasional, tarif, kuota, dan organisasi perdagangan dunia.",
      category: "internasional",
      difficulty: "menengah",
      duration: "5 jam",
      students: 750,
      rating: 4.9,
      lessons: 15,
      instructor: "Budi Santoso, M.Ec",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
      featured: false,
    },
    {
      id: 4,
      title: "Kebijakan Moneter & Bank Sentral",
      description: "Pelajari peran bank sentral, instrumen kebijakan moneter, dan pengendalian inflasi.",
      category: "moneter",
      difficulty: "menengah",
      duration: "6 jam",
      students: 620,
      rating: 4.6,
      lessons: 18,
      instructor: "Dr. Maya Dewi",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
      featured: true,
    },
    {
      id: 5,
      title: "Ekonomi Perilaku: Psikologi dalam Ekonomi",
      description: "Eksplorasi bagaimana psikologi mempengaruhi keputusan ekonomi individu dan pasar.",
      category: "perilaku",
      difficulty: "lanjutan",
      duration: "7 jam",
      students: 480,
      rating: 4.9,
      lessons: 20,
      instructor: "Prof. Rina Kartika",
      image: "https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?w=400&h=250&fit=crop",
      featured: false,
    },
    {
      id: 6,
      title: "Ekonomi Pembangunan Berkelanjutan",
      description: "Konsep pembangunan berkelanjutan, indikator pembangunan, dan strategi pengentasan kemiskinan.",
      category: "pembangunan",
      difficulty: "lanjutan",
      duration: "8 jam",
      students: 350,
      rating: 4.7,
      lessons: 22,
      instructor: "Dr. Agus Setiawan",
      image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=400&h=250&fit=crop",
      featured: false,
    },
    {
      id: 7,
      title: "Analisis Data Ekonomi dengan Excel",
      description: "Teknik analisis data ekonomi menggunakan Microsoft Excel untuk pengambilan keputusan.",
      category: "makro",
      difficulty: "menengah",
      duration: "5 jam",
      students: 1100,
      rating: 4.8,
      lessons: 14,
      instructor: "Fajar Pratama, M.Sc",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=250&fit=crop",
      featured: true,
    },
    {
      id: 8,
      title: "Kripto & Ekonomi Digital",
      description: "Memahami ekonomi digital, cryptocurrency, blockchain, dan implikasinya pada sistem keuangan.",
      category: "moneter",
      difficulty: "lanjutan",
      duration: "6 jam",
      students: 920,
      rating: 4.9,
      lessons: 16,
      instructor: "Dian Sastro, Ph.D",
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=250&fit=crop",
      featured: true,
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "semua" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredCourses = courses.filter((course) => course.featured);

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Materi Pembelajaran Ekonomi</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-10">Temukan berbagai modul ekonomi terlengkap untuk meningkatkan pemahaman Anda tentang dunia ekonomi.</p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari materi ekonomi..."
                  className="block w-full pl-10 pr-4 py-3 rounded-full border-0 focus:ring-2 focus:ring-purple-500 text-gray-900"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "50+", label: "Modul Ekonomi", icon: BookOpen },
              { number: "200+", label: "Jam Pembelajaran", icon: Clock },
              { number: "10,000+", label: "Pembelajar", icon: Users },
              { number: "4.8", label: "Rating Rata-rata", icon: Star },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                    <stat.icon size={20} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Categories Filter */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Kategori Materi</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.id ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tingkat Kesulitan</h3>
            <div className="flex flex-wrap gap-3">
              {difficultyLevels.map((level) => (
                <button key={level.level} className={`px-4 py-2 rounded-full text-sm font-medium ${level.color}`}>
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Courses */}
          {featuredCourses.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Materi Unggulan</h2>
                <div className="flex items-center text-purple-600">
                  <Target size={20} className="mr-2" />
                  <span className="font-medium">Rekomendasi</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
                    <div className="relative">
                      <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            course.difficulty === "pemula" ? "bg-green-100 text-green-800" : course.difficulty === "menengah" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {course.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-purple-600 font-medium">{course.category}</span>
                        <div className="flex items-center text-yellow-500">
                          <Star size={16} className="fill-current" />
                          <span className="ml-1 text-sm font-medium">{course.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{course.description}</p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <Users size={14} className="mr-1" />
                          {course.students.toLocaleString()} siswa
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 font-medium">{course.instructor}</span>
                        <Link to={`/course/${course.id}`} className="flex items-center text-purple-600 hover:text-purple-700 font-medium">
                          Pelajari
                          <ChevronRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Courses */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Semua Materi {selectedCategory !== "semua" && `(${categories.find((c) => c.id === selectedCategory)?.name})`}</h2>
              <div className="text-sm text-gray-600">
                Menampilkan {filteredCourses.length} dari {courses.length} materi
              </div>
            </div>

            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Materi tidak ditemukan</h3>
                <p className="text-gray-600">Coba gunakan kata kunci lain atau pilih kategori berbeda.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="p-2 rounded-lg bg-purple-100 text-purple-600 mr-3">
                            <BookOpen size={20} />
                          </div>
                          <span className="text-sm font-medium text-purple-600">{course.category}</span>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${course.difficulty === "pemula" ? "bg-green-100 text-green-800" : course.difficulty === "menengah" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                        >
                          {course.difficulty}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-3">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock size={14} className="mr-2" />
                          <span>
                            {course.duration} • {course.lessons} pelajaran
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users size={14} className="mr-2" />
                          <span>{course.students.toLocaleString()} siswa terdaftar</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Star size={14} className="mr-2 text-yellow-500 fill-current" />
                          <span>{course.rating} rating</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm font-medium text-gray-700">{course.instructor}</span>
                        <Link to={`/course/${course.id}`} className="px-4 py-2 bg-linear-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
                          Mulai Belajar
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-linear-to-r from-purple-50 to-blue-50 rounded-2xl p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Siap Menguasai Ekonomi?</h3>
              <p className="text-gray-600 mb-6">Bergabunglah dengan ribuan pembelajar lainnya dan dapatkan sertifikat setelah menyelesaikan materi.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors">
                  Daftar Sekarang
                </Link>
                <button className="px-6 py-3 border border-purple-600 text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-colors">Lihat Demo</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Course;
