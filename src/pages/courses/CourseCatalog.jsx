import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, X, BookOpen, Target, Award } from "lucide-react";
import { coursesData } from "../../data/courses";

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

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [selectedLevel, setSelectedLevel] = useState("semua");

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setCourses(coursesData);
      setFilteredCourses(coursesData);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let result = [...courses];

    // Filter pencarian
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((course) => course.title.toLowerCase().includes(query) || course.description.toLowerCase().includes(query));
    }

    // Filter kategori
    if (selectedCategory !== "semua") {
      result = result.filter((course) => course.category === selectedCategory);
    }

    // Filter level kesulitan
    if (selectedLevel !== "semua") {
      result = result.filter((course) => course.difficulty === selectedLevel);
    }

    setFilteredCourses(result);
  }, [courses, searchQuery, selectedCategory, selectedLevel]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("semua");
    setSelectedLevel("semua");
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
                  placeholder="Cari materi atau topik..."
                  className="block w-full pl-10 pr-4 py-3 rounded-full border-0 focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
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

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
              {[...Array(3)].map((_, i) => (
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Login dulu ya, supaya bisa akses materi belajarnya 😊</h3>
              <p className="text-gray-600 mb-6">Masuk ke akun Anda untuk melanjutkan pembelajaran dan mengakses materi lengkap kami.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors">
                  Daftar Gratis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Course Card Component - Disederhanakan
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
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

        <div className="space-y-2 mb-4">
          <div className="text-sm text-gray-700">
            <span className="font-medium">Instruktur:</span> {course.instructor}
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-medium">Jumlah Artikel:</span> {course.content.length}
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-medium">Materi PDF:</span> {course.resources.length} file
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>{course.price === 0 ? <span className="text-lg font-bold text-green-600">Gratis</span> : <span className="text-lg font-bold text-gray-900">Rp {course.price.toLocaleString()}</span>}</div>
          <Link to={`/Course/${course.id}`} className="flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm">
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCatalog;
