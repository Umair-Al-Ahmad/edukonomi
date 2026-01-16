import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">Belajar Ekonomi Jadi Lebih Mudah</h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">Tingkatkan pemahaman ekonomi Anda dengan artikel berkualitas dan quiz interaktif. Belajar kapan saja, di mana saja.</p>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200"></div>
        </div>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center">
                <h3 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">10K+</h3>
                <p className="text-lg text-gray-600 font-medium">Belajar Aktif</p>
              </div>

              <div className="text-center">
                <h3 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">500+</h3>
                <p className="text-lg text-gray-600 font-medium">Artikel</p>
              </div>

              <div className="text-center">
                <h3 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">200+</h3>
                <p className="text-lg text-gray-600 font-medium">Quiz Interaktif</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Button */}
        <div className="py-8 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-7xl mx-auto">
            <a
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Mulai Belajar
              <span className="ml-2">→</span>
              <span className="ml-2 text-blue-100 bg-white/20 px-3 py-1 rounded-full text-sm">Registrasi Sekarang</span>
            </a>
          </div>
        </div>

        {/* Content Sections */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Dasar-dasar Ekonomi Makro Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Dasar-dasar Ekonomi Makro</h2>
                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">2 materi</span>
                      <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Pemula</span>
                    </div>
                  </div>
                  <div className="text-blue-600">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">Pelajari konsep dasar ekonomi makro seperti GDP, inflasi, dan kebijakan moneter.</p>
                <a href="/materi/ekonomi-makro" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold">
                  Mulai Belajar
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>

              {/* Quiz Card */}
              <div className="bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Quiz: Inflasi & Deflasi</h2>
                    <span className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm font-medium">⚡ 15 pertanyaan</span>
                  </div>
                  <div>
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="mb-6 opacity-90">Uji pengetahuan Anda tentang konsep inflasi dan deflasi dengan quiz interaktif.</p>
                <a href="/quiz/inflasi-deflasi" className="inline-flex items-center bg-white text-purple-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-full transition-colors duration-300">
                  Mulai Quiz
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Additional Content Grid */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Artikel Harian</h3>
                <p className="text-gray-600 text-sm">Update pengetahuan ekonomi Anda setiap hari</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sertifikat</h3>
                <p className="text-gray-600 text-sm">Dapatkan sertifikat setelah menyelesaikan materi</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Komunitas</h3>
                <p className="text-gray-600 text-sm">Diskusikan dengan peserta belajar lainnya</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
