import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, BookOpen, FileText, Download, Bookmark, Type, Moon, Sun, Home, Share2, CheckCircle2, Clock, User, Printer } from "lucide-react";
import { coursesData } from "../../data/courses";

const ArticleReader = () => {
  const { courseId, articleId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [fontSize, setFontSize] = useState("medium"); // small, medium, large
  const [theme, setTheme] = useState("light"); // light, dark
  const [bookmarked, setBookmarked] = useState(false);
  const [completedArticles, setCompletedArticles] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    // Cari course berdasarkan ID
    const foundCourse = coursesData.find((c) => c.id === parseInt(courseId));

    if (foundCourse && foundCourse.content) {
      setCourse(foundCourse);

      // Cari artikel berdasarkan ID
      const articleIndex = foundCourse.content.findIndex((a) => a.id === parseInt(articleId));

      if (articleIndex !== -1) {
        setCurrentArticle(foundCourse.content[articleIndex]);
        setCurrentIndex(articleIndex);
      }

      // Load completed articles dari localStorage
      const savedCompleted = localStorage.getItem(`completed_articles_${courseId}`);
      if (savedCompleted) {
        setCompletedArticles(JSON.parse(savedCompleted));
      }
    }

    setIsLoading(false);
  }, [courseId, articleId]);

  // Navigasi ke artikel selanjutnya
  const goToNextArticle = () => {
    if (course && currentIndex < course.content.length - 1) {
      const nextArticle = course.content[currentIndex + 1];
      navigate(`/learn/${courseId}/article/${nextArticle.id}`);
    }
  };

  // Navigasi ke artikel sebelumnya
  const goToPrevArticle = () => {
    if (currentIndex > 0) {
      const prevArticle = course.content[currentIndex - 1];
      navigate(`/learn/${courseId}/article/${prevArticle.id}`);
    }
  };

  // Tandai artikel sebagai selesai
  const markAsComplete = () => {
    if (!currentArticle || completedArticles.includes(currentArticle.id)) return;

    const newCompleted = [...completedArticles, currentArticle.id];
    setCompletedArticles(newCompleted);
    localStorage.setItem(`completed_articles_${courseId}`, JSON.stringify(newCompleted));
  };

  // Hitung progress
  const calculateProgress = () => {
    if (!course || !course.content) return 0;
    return Math.round((completedArticles.length / course.content.length) * 100);
  };

  // Get font size class
  const getFontSizeClass = () => {
    switch (fontSize) {
      case "small":
        return "text-base";
      case "medium":
        return "text-lg";
      case "large":
        return "text-xl";
      default:
        return "text-lg";
    }
  };

  // Get theme class
  const getThemeClass = () => {
    return theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!course || !currentArticle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Artikel tidak ditemukan</h2>
          <p className="text-gray-600 mb-4">Silakan pilih artikel lain untuk dibaca.</p>
          <button onClick={() => navigate(`/course/${courseId}`)} className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors">
            Kembali ke Materi
          </button>
        </div>
      </div>
    );
  }

  const progress = calculateProgress();
  const hasNext = currentIndex < course.content.length - 1;
  const hasPrev = currentIndex > 0;
  const isCompleted = completedArticles.includes(currentArticle.id);

  return (
    <div className={`min-h-screen ${getThemeClass()} transition-colors duration-200`}>
      {/* Top Navigation */}
      <div className={`sticky top-0 z-50 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-b px-4 py-3`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(`/course/${courseId}`)} className={`flex items-center ${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-purple-600"} transition-colors`}>
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">Kembali ke Materi</span>
            </button>

            <div className="hidden md:block">
              <h1 className={`font-medium text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"} truncate max-w-md`}>{course.title}</h1>
              <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"} truncate max-w-md`}>{currentArticle.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Progress Bar */}
            <div className="hidden sm:flex items-center gap-2">
              <div className={`w-24 ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"} rounded-full h-2`}>
                <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
              <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{progress}% selesai</span>
            </div>

            {/* Reading Tools */}
            <div className="flex items-center gap-2">
              {/* Font Size Controls */}
              <div className="relative group">
                <button className={`p-2 rounded-lg ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                  <Type className="h-5 w-5" />
                </button>
                <div
                  className={`absolute right-0 top-full mt-2 hidden group-hover:block ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-2 w-40 z-50 border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
                >
                  <div className="space-y-2">
                    <button onClick={() => setFontSize("small")} className={`w-full text-left px-3 py-2 rounded ${fontSize === "small" ? "bg-purple-600 text-white" : theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                      Font Kecil
                    </button>
                    <button onClick={() => setFontSize("medium")} className={`w-full text-left px-3 py-2 rounded ${fontSize === "medium" ? "bg-purple-600 text-white" : theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                      Font Sedang
                    </button>
                    <button onClick={() => setFontSize("large")} className={`w-full text-left px-3 py-2 rounded ${fontSize === "large" ? "bg-purple-600 text-white" : theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                      Font Besar
                    </button>
                  </div>
                </div>
              </div>

              {/* Theme Toggle */}
              <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className={`p-2 rounded-lg ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>

              {/* Bookmark */}
              <button onClick={() => setBookmarked(!bookmarked)} className={`p-2 rounded-lg ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                <Bookmark className={`h-5 w-5 ${bookmarked ? "fill-current text-yellow-500" : ""}`} />
              </button>

              {/* Print */}
              <button onClick={() => window.print()} className={`p-2 rounded-lg ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                <Printer className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${theme === "dark" ? "bg-purple-900/30 text-purple-300" : "bg-purple-100 text-purple-800"}`}>
              Artikel {currentIndex + 1} dari {course.content.length}
            </span>
            {currentArticle.estimatedReadTime && (
              <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
                <Clock className="h-4 w-4" />
                {currentArticle.estimatedReadTime}
              </span>
            )}
          </div>

          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{currentArticle.title}</h1>

          {currentArticle.author && (
            <div className={`flex items-center gap-2 mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              <User className="h-5 w-5" />
              <span>Oleh: {currentArticle.author}</span>
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className={`prose prose-lg max-w-none mb-12 ${theme === "dark" ? "prose-invert" : ""} ${getFontSizeClass()}`}>
          {currentArticle.content ? (
            // Jika content adalah HTML string
            <div dangerouslySetInnerHTML={{ __html: currentArticle.content }} />
          ) : (
            // Fallback content
            <>
              <p className="lead">Ini adalah contoh konten artikel. Dalam implementasi nyata, konten akan berasal dari database atau file markdown.</p>

              <h2>Pengertian Dasar</h2>
              <p>Ekonomi makro adalah cabang ilmu ekonomi yang mempelajari fenomena ekonomi secara keseluruhan, seperti pertumbuhan ekonomi, inflasi, pengangguran, dan berbagai kebijakan yang mempengaruhi perekonomian suatu negara.</p>

              <h3>Ruang Lingkup Ekonomi Makro</h3>
              <p>Ruang lingkup ekonomi makro mencakup beberapa aspek penting seperti:</p>
              <ul>
                <li>Pendapatan nasional dan produk domestik bruto (PDB)</li>
                <li>Tingkat pengangguran dan ketenagakerjaan</li>
                <li>Inflasi dan deflasi</li>
                <li>Kebijakan fiskal dan moneter</li>
                <li>Neraca pembayaran internasional</li>
              </ul>

              <blockquote>
                <p>"Ekonomi makro membantu kita memahami bagaimana perekonomian bekerja secara keseluruhan, bukan hanya bagian-bagiannya secara terpisah."</p>
              </blockquote>

              <p>Dengan mempelajari ekonomi makro, kita dapat memahami berbagai fenomena ekonomi yang terjadi di sekitar kita dan bagaimana kebijakan pemerintah dapat mempengaruhi kondisi perekonomian secara keseluruhan.</p>
            </>
          )}
        </div>

        {/* Article Actions */}
        <div className={`py-6 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"} mb-8`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={markAsComplete}
              disabled={isCompleted}
              className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                isCompleted ? "bg-green-600 text-white cursor-default" : theme === "dark" ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Artikel Selesai Dibaca
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Tandai Selesai Dibaca
                </>
              )}
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={goToPrevArticle}
                disabled={!hasPrev}
                className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                  !hasPrev
                    ? `cursor-not-allowed ${theme === "dark" ? "bg-gray-800 text-gray-500" : "bg-gray-100 text-gray-400"}`
                    : theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
                Artikel Sebelumnya
              </button>

              <button
                onClick={goToNextArticle}
                disabled={!hasNext}
                className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                  !hasNext
                    ? `cursor-not-allowed ${theme === "dark" ? "bg-gray-800 text-gray-500" : "bg-gray-100 text-gray-400"}`
                    : theme === "dark"
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                Artikel Selanjutnya
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Related Materials */}
        <div className={`rounded-xl p-6 ${theme === "dark" ? "bg-gray-800" : "bg-purple-50"}`}>
          <h3 className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Materi Terkait</h3>

          <div className="space-y-3">
            {course.resources &&
              course.resources.map((resource, index) => (
                <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-purple-100"} transition-colors`}>
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-red-500" />
                    <div>
                      <h4 className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{resource.name}</h4>
                      <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        {resource.type.toUpperCase()} • {resource.size}
                      </p>
                    </div>
                  </div>
                  <button className={`p-2 rounded-lg ${theme === "dark" ? "hover:bg-gray-500" : "hover:bg-gray-200"}`} onClick={() => alert(`Mengunduh ${resource.name}`)}>
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className={`sticky bottom-0 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-t px-4 py-3`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className={`h-5 w-5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
            <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              {completedArticles.length} dari {course.content.length} artikel selesai
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Artikel: {currentIndex + 1}/{course.content.length}
            </span>
            <div className="flex items-center gap-2">
              <button onClick={goToPrevArticle} disabled={!hasPrev} className={`p-2 rounded ${!hasPrev ? "opacity-50 cursor-not-allowed" : theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={goToNextArticle} disabled={!hasNext} className={`p-2 rounded ${!hasNext ? "opacity-50 cursor-not-allowed" : theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleReader;
