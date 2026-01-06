import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Menu, X, PlayCircle, CheckCircle2, Clock, BookOpen, FileText, BarChart, Award, Star, Users, Home, Share2, Download, Maximize2, Volume2, Settings, Flag } from "lucide-react";

// Mock data untuk course
const mockCourse = {
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
  lessons: [
    {
      id: 1,
      title: "Pengenalan Ekonomi Makro",
      duration: "25:00",
      type: "video",
      videoUrl: "https://example.com/video1.mp4",
      description: "Memahami dasar-dasar ekonomi makro dan ruang lingkupnya",
      completed: true,
    },
    {
      id: 2,
      title: "Konsep GDP dan Pertumbuhan Ekonomi",
      duration: "30:00",
      type: "video",
      videoUrl: "https://example.com/video2.mp4",
      description: "Menghitung GDP dan memahami indikator pertumbuhan ekonomi",
      completed: true,
    },
    {
      id: 3,
      title: "Inflasi dan Deflasi",
      duration: "35:00",
      type: "video",
      videoUrl: "https://example.com/video3.mp4",
      description: "Menganalisis inflasi, deflasi, dan dampaknya terhadap ekonomi",
      completed: false,
    },
    {
      id: 4,
      title: "Pengangguran dan Ketenagakerjaan",
      duration: "28:00",
      type: "video",
      videoUrl: "https://example.com/video4.mp4",
      description: "Memahami jenis pengangguran dan kebijakan ketenagakerjaan",
      completed: false,
    },
    {
      id: 5,
      title: "Quiz: Konsep Dasar",
      duration: "15:00",
      type: "quiz",
      description: "Uji pemahaman Anda tentang konsep dasar ekonomi makro",
    },
    {
      id: 6,
      title: "Kebijakan Fiskal",
      duration: "40:00",
      type: "video",
      videoUrl: "https://example.com/video5.mp4",
      description: "Menganalisis kebijakan fiskal pemerintah",
      completed: false,
    },
    {
      id: 7,
      title: "Kebijakan Moneter",
      duration: "38:00",
      type: "video",
      videoUrl: "https://example.com/video6.mp4",
      description: "Memahami peran bank sentral dan instrumen kebijakan moneter",
      completed: false,
    },
    {
      id: 8,
      title: "Sistem Keuangan dan Perbankan",
      duration: "32:00",
      type: "video",
      videoUrl: "https://example.com/video7.mp4",
      description: "Mempelajari sistem keuangan dan fungsi perbankan",
      completed: false,
    },
    {
      id: 9,
      title: "Neraca Pembayaran Internasional",
      duration: "35:00",
      type: "video",
      videoUrl: "https://example.com/video8.mp4",
      description: "Memahami transaksi ekonomi antar negara",
      completed: false,
    },
    {
      id: 10,
      title: "Quiz: Kebijakan Ekonomi",
      duration: "20:00",
      type: "quiz",
      description: "Uji pemahaman tentang kebijakan fiskal dan moneter",
    },
    {
      id: 11,
      title: "Studi Kasus: Indonesia",
      duration: "45:00",
      type: "case-study",
      description: "Analisis kondisi ekonomi Indonesia terkini",
    },
    {
      id: 12,
      title: "Ujian Akhir",
      duration: "60:00",
      type: "exam",
      description: "Ujian akhir untuk mendapatkan sertifikat",
    },
  ],
};

const LearningPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25); // Simulasi progress
  const [volume, setVolume] = useState(80);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showSettings, setShowSettings] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([1, 2]); // Simulasi lesson yang sudah selesai

  useEffect(() => {
    // Simulasi fetch data dari API
    setIsLoading(true);
    setTimeout(() => {
      const courseData = mockCourse;
      setCourse(courseData);
      setCurrentLesson(courseData.lessons[0]);
      setIsLoading(false);

      // Cek local storage untuk progress
      const savedProgress = localStorage.getItem(`progress_${id}`);
      if (savedProgress) {
        setProgress(parseInt(savedProgress));
      }

      const savedCompleted = localStorage.getItem(`completed_${id}`);
      if (savedCompleted) {
        setCompletedLessons(JSON.parse(savedCompleted));
      }
    }, 500);
  }, [id]);

  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson);
    setIsPlaying(true);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleMarkComplete = () => {
    if (!currentLesson) return;

    if (!completedLessons.includes(currentLesson.id)) {
      const newCompleted = [...completedLessons, currentLesson.id];
      setCompletedLessons(newCompleted);
      localStorage.setItem(`completed_${id}`, JSON.stringify(newCompleted));

      // Update progress
      const newProgress = Math.round((newCompleted.length / course.lessons.length) * 100);
      setProgress(newProgress);
      localStorage.setItem(`progress_${id}`, newProgress.toString());
    }
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

  const currentIndex = course?.lessons.findIndex((l) => l.id === currentLesson?.id) ?? 0;
  const hasNext = course && currentIndex < course.lessons.length - 1;
  const hasPrev = currentIndex > 0;

  const goToNext = () => {
    if (course && hasNext) {
      const nextLesson = course.lessons[currentIndex + 1];
      setCurrentLesson(nextLesson);
      setIsPlaying(true);
    }
  };

  const goToPrev = () => {
    if (course && hasPrev) {
      const prevLesson = course.lessons[currentIndex - 1];
      setCurrentLesson(prevLesson);
      setIsPlaying(true);
    }
  };

  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    setShowSettings(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Materi tidak ditemukan</h2>
          <p className="text-gray-600 mb-4">Silakan pilih materi lain untuk dipelajari.</p>
          <button onClick={() => navigate("/course")} className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors">
            Kembali ke Katalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Top Navigation */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(`/course/${id}`)} className="flex items-center text-gray-300 hover:text-white transition-colors">
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Kembali ke Materi</span>
          </button>

          <div className="hidden lg:block">
            <h1 className="font-medium text-sm text-gray-300 truncate max-w-md">{course.title}</h1>
            <p className="text-xs text-gray-400 truncate max-w-md">{currentLesson.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-32 bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="text-sm text-gray-300">{progress}% selesai</span>
          </div>

          <button onClick={() => navigate("/")} className="p-2 rounded-lg hover:bg-gray-700" title="Beranda">
            <Home className="h-5 w-5" />
          </button>

          <button className="p-2 rounded-lg hover:bg-gray-700" title="Share">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Video Player Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Container */}
          <div className="flex-1 bg-black relative">
            {/* Video Player Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                {isPlaying ? (
                  <div className="relative">
                    <div className="w-80 h-48 bg-linear-to-r from-purple-900 to-blue-900 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-4">🎬</div>
                        <p className="text-lg font-medium">Video Sedang Diputar</p>
                        <p className="text-sm text-gray-400 mt-2">
                          {currentLesson.duration} • {currentLesson.type}
                        </p>
                      </div>
                    </div>

                    {/* Video Controls Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 hover:bg-white/20 rounded-full">
                            {isPlaying ? "⏸️" : "▶️"}
                          </button>
                          <div className="flex items-center gap-2">
                            <Volume2 className="h-5 w-5" />
                            <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} className="w-24" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-white/20 rounded" onClick={() => setShowSettings(!showSettings)}>
                            <Settings className="h-5 w-5" />
                          </button>
                          <button className="p-2 hover:bg-white/20 rounded">
                            <Maximize2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-32 h-32 bg-linear-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setIsPlaying(true)}>
                      <PlayCircle className="h-16 w-16" />
                    </div>
                    <p className="text-xl font-medium mb-2">Klik untuk memulai pembelajaran</p>
                    <p className="text-gray-400">{currentLesson.title}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Settings Dropdown */}
            {showSettings && (
              <div className="absolute top-16 right-4 bg-gray-800 rounded-lg shadow-xl p-4 w-48 z-50">
                <h3 className="font-medium mb-3">Pengaturan Video</h3>
                <div className="space-y-2">
                  <button onClick={() => handleSpeedChange(0.5)} className={`w-full text-left px-3 py-2 rounded ${playbackSpeed === 0.5 ? "bg-purple-600" : "hover:bg-gray-700"}`}>
                    0.5x
                  </button>
                  <button onClick={() => handleSpeedChange(1.0)} className={`w-full text-left px-3 py-2 rounded ${playbackSpeed === 1.0 ? "bg-purple-600" : "hover:bg-gray-700"}`}>
                    1.0x (Normal)
                  </button>
                  <button onClick={() => handleSpeedChange(1.5)} className={`w-full text-left px-3 py-2 rounded ${playbackSpeed === 1.5 ? "bg-purple-600" : "hover:bg-gray-700"}`}>
                    1.5x
                  </button>
                  <button onClick={() => handleSpeedChange(2.0)} className={`w-full text-left px-3 py-2 rounded ${playbackSpeed === 2.0 ? "bg-purple-600" : "hover:bg-gray-700"}`}>
                    2.0x
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Lesson Content */}
          <div className="bg-gray-800 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold mb-2">{currentLesson.title}</h2>
                  <p className="text-gray-300">{currentLesson.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleMarkComplete}
                    disabled={isLessonCompleted(currentLesson.id)}
                    className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${isLessonCompleted(currentLesson.id) ? "bg-green-600 text-white cursor-default" : "bg-purple-600 hover:bg-purple-700 text-white"}`}
                  >
                    {isLessonCompleted(currentLesson.id) ? (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        Selesai
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        Tandai Selesai
                      </>
                    )}
                  </button>

                  <button className="p-2 hover:bg-gray-700 rounded">
                    <Flag className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
                <button onClick={goToPrev} disabled={!hasPrev} className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${hasPrev ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-800 text-gray-500 cursor-not-allowed"}`}>
                  <ChevronLeft className="h-5 w-5" />
                  Sebelumnya
                </button>

                <div className="text-center">
                  <span className="text-sm text-gray-400">Pelajaran</span>
                  <p className="font-medium">
                    {currentIndex + 1} dari {course.lessons.length}
                  </p>
                </div>

                <button onClick={goToNext} disabled={!hasNext} className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${hasNext ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-800 text-gray-500 cursor-not-allowed"}`}>
                  Selanjutnya
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Daftar Pelajaran */}
        <div
          className={`lg:w-80 bg-gray-800 border-l border-gray-700 flex flex-col transition-all duration-300 ${sidebarOpen ? "translate-x-0" : "translate-x-full"} ${
            sidebarOpen ? "fixed lg:relative inset-y-0 right-0 z-40" : "hidden lg:flex"
          }`}
        >
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <div>
              <h2 className="font-bold">Daftar Pelajaran</h2>
              <p className="text-sm text-gray-400">
                {completedLessons.length} dari {course.lessons.length} selesai
              </p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-gray-700 rounded">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-1">
              {course.lessons.map((lesson, index) => {
                const isCompleted = isLessonCompleted(lesson.id);
                const isActive = currentLesson?.id === lesson.id;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonSelect(lesson)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-start gap-3 ${isActive ? "bg-purple-600 text-white" : "hover:bg-gray-700"} ${isCompleted ? "border-l-4 border-green-500" : ""}`}
                  >
                    <div className="shrink-0 pt-0.5">{isCompleted ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : getLessonIcon(lesson.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className={`font-medium ${isActive ? "text-white" : "text-gray-200"}`}>
                            {index + 1}. {lesson.title}
                          </p>
                          {lesson.description && <p className="text-sm text-gray-400 mt-1 line-clamp-1">{lesson.description}</p>}
                        </div>
                        {lesson.duration && <span className="text-sm text-gray-400 whitespace-nowrap ml-2">{lesson.duration}</span>}
                      </div>
                      {lesson.type !== "video" && <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-700 rounded">{lesson.type === "quiz" ? "Quiz" : lesson.type === "exam" ? "Ujian" : "Studi Kasus"}</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Download Section */}
          <div className="p-4 border-t border-gray-700">
            <h3 className="font-medium mb-3">Materi Tambahan</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 bg-gray-700 hover:bg-gray-600 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <span>Slide Presentasi</span>
                </div>
                <Download className="h-4 w-4" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-gray-700 hover:bg-gray-600 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-green-400" />
                  <span>Latihan Soal</span>
                </div>
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Toggle Button */}
        {!sidebarOpen && (
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden fixed top-1/2 right-0 -translate-y-1/2 bg-purple-600 text-white p-3 rounded-l-lg">
            <Menu className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LearningPlayer;
