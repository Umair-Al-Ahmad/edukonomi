import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, X, BookOpen, Clock, Users, Star, ChevronRight, TrendingUp, Target, Award } from "lucide-react";

const categories = [
  { id: "semua", name: "Semua Kategori" },
  { id: "makro", name: "Ekonomi Makro" },
  { id: "mikro", name: "Ekonomi Mikro" },
  { id: "internasional", name: "Ekonomi Internasional" },
  { id: "perilaku", name: "Ekonomi Perilaku" },
  { id: "pembangunan", name: "Ekonomi Pembangunan" },
  { id: "moneter", name: "Ekonomi Moneter" },
];

const difficultyLevels = [
  { id: "semua", name: "Semua Level" },
  { id: "pemula", name: "Pemula", color: "bg-green-100 text-green-800" },
  { id: "menengah", name: "Menengah", color: "bg-yellow-100 text-yellow-800" },
  { id: "lanjutan", name: "Lanjutan", color: "bg-red-100 text-red-800" },
];

const sortOptions = [
  { id: "popular", name: "Paling Populer" },
  { id: "rating", name: "Rating Tertinggi" },
  { id: "terbaru", name: "Terbaru" },
  { id: "durasi-pendek", name: "Durasi Terpendek" },
  { id: "durasi-panjang", name: "Durasi Terpanjang" },
];

// Mock data - nanti diganti dengan API
const mockCourses = [
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
    image: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=400&h=250&fit=crop",
    featured: true,
    price: 0,
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
    price: 0,
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
    price: 199000,
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
    price: 0,
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
    price: 299000,
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
    price: 249000,
  },
];

const CourseCatalog = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [filteredCourses, setFilteredCourses] = useState(mockCourses);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [selectedLevel, setSelectedLevel] = useState("semua");
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    // Simulasi fetch data dari API
    setIsLoading(true);
    setTimeout(() => {
      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let result = [...courses];

    // Filter pencarian
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((course) => course.title.toLowerCase().includes(query) || course.description.toLowerCase().includes(query) || course.instructor.toLowerCase().includes(query));
    }

    // Filter kategori
    if (selectedCategory !== "semua") {
      result = result.filter((course) => course.category === selectedCategory);
    }

    // Filter level kesulitan
    if (selectedLevel !== "semua") {
      result = result.filter((course) => course.difficulty === selectedLevel);
    }

    // Sorting
    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.students - a.students);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "terbaru":
        result.sort((a, b) => b.id - a.id);
        break;
      case "durasi-pendek":
        result.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      case "durasi-panjang":
        result.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
        break;
    }

    setFilteredCourses(result);
  }, [courses, searchQuery, selectedCategory, selectedLevel, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("semua");
    setSelectedLevel("semua");
    setSortBy("popular");
  };

  const hasActiveFilters = searchQuery || selectedCategory !== "semua" || selectedLevel !== "semua";

  const getCategoryName = (id) => {
    return categories.find((cat) => cat.id === id)?.name || id;
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-purple-50">
      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Katalog Materi Ekonomi</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-10">Temukan berbagai modul ekonomi terlengkap untuk meningkatkan pemahaman Anda tentang dunia ekonomi.</p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari materi, instruktur, atau topik..."
                  className="block w-full pl-10 pr-4 py-3 rounded-full border-0 focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b">
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
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filters Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Filter Materi</h2>
              <p className="text-gray-600 text-sm mt-1">Temukan materi yang sesuai dengan kebutuhan belajar Anda</p>
            </div>

            {hasActiveFilters && (
              <button onClick={clearFilters} className="flex items-center text-sm text-purple-600 hover:text-purple-800 font-medium">
                <X className="h-4 w-4 mr-1" />
                Hapus Semua Filter
              </button>
            )}
          </div>

          {/* Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori Materi</label>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tingkat Kesulitan</label>
              <div className="flex flex-wrap gap-2">
                {difficultyLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedLevel === level.id ? level.color : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  >
                    {level.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Urutkan Berdasarkan</label>
              <div className="relative">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {selectedCategory !== "semua" ? getCategoryName(selectedCategory) : "Semua Materi"}
                <span className="text-gray-600 text-base font-normal ml-2">
                  ({filteredCourses.length} dari {courses.length} materi)
                </span>
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Filter Aktif:</span>
              {selectedCategory !== "semua" && <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">{getCategoryName(selectedCategory)}</span>}
              {selectedLevel !== "semua" && <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{difficultyLevels.find((l) => l.id === selectedLevel)?.name}</span>}
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Materi tidak ditemukan</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">Coba gunakan kata kunci lain atau sesuaikan filter pencarian Anda</p>
              <button onClick={clearFilters} className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors">
                Hapus Semua Filter
              </button>
            </div>
          ) : (
            <>
              {/* Featured Courses */}
              {selectedCategory === "semua" && selectedLevel === "semua" && (
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                      <Target className="h-5 w-5 text-purple-600 mr-2" />
                      Materi Unggulan
                    </h3>
                    <span className="text-sm text-purple-600 font-medium">Rekomendasi</span>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses
                      .filter((course) => course.featured)
                      .slice(0, 3)
                      .map((course) => (
                        <CourseCard key={course.id} course={course} featured={true} />
                      ))}
                  </div>
                </div>
              )}

              {/* All Courses */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Semua Materi</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-linear-to-r from-purple-50 to-blue-50 rounded-2xl p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tidak Menemukan yang Anda Cari?</h3>
              <p className="text-gray-600 mb-6">Bergabunglah dengan komunitas kami dan dapatkan akses ke lebih banyak materi premium</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors">
                  Daftar Gratis
                </Link>
                <button className="px-6 py-3 border border-purple-600 text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-colors">Request Materi</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Course Card Component
const CourseCard = ({ course, featured = false }) => {
  const difficultyColors = {
    pemula: "bg-green-100 text-green-800",
    menengah: "bg-yellow-100 text-yellow-800",
    lanjutan: "bg-red-100 text-red-800",
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border ${featured ? "border-purple-200" : "border-gray-100"} hover:shadow-lg transition-shadow duration-300 overflow-hidden`}>
      <div className="relative">
        <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
        {featured && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">Unggulan</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[course.difficulty]}`}>{course.difficulty}</span>
        </div>
        {course.price === 0 && (
          <div className="absolute bottom-3 left-3">
            <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">Gratis</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-purple-600 font-medium">{categories.find((cat) => cat.id === course.category)?.name}</span>
          <div className="flex items-center text-yellow-500">
            <Star size={14} className="fill-current" />
            <span className="ml-1 text-sm font-medium">{course.rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={14} className="mr-2" />
            <span>
              {course.duration} • {course.lessons} pelajaran
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users size={14} className="mr-2" />
            <span>{course.students.toLocaleString()} siswa</span>
          </div>
          <div className="text-sm text-gray-700 font-medium">Instruktur: {course.instructor}</div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>{course.price === 0 ? <span className="text-lg font-bold text-green-600">Gratis</span> : <span className="text-lg font-bold text-gray-900">Rp {course.price.toLocaleString()}</span>}</div>
          <Link to={`/course/${course.id}`} className="flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm">
            Lihat Detail
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCatalog;
