import { Users, Target, Award, BookOpen, Globe, Heart, Star, Shield, GraduationCap, Lightbulb, Linkedin, Instagram } from "lucide-react";
import umair from "../assets/umair.jpg";

const About = () => {
  const teamMembers = [
    {
      name: "Umair Al Ahmad",
      role: "Founder & CEO",
      expertise: "Ilmu Ekonomi",
      bio: "Lulusan Universitas Islam Negeri Sultan Maulana Hasanuddin Banten.",
      avatar: umair,
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Misi Kami",
      description: "Membuat pembelajaran ekonomi dapat diakses oleh semua kalangan dengan cara yang menyenangkan dan efektif.",
    },
    {
      icon: Heart,
      title: "Passion untuk Edukasi",
      description: "Kami percaya pendidikan adalah kunci untuk masa depan yang lebih baik dan ekonomi yang lebih kuat.",
    },
    {
      icon: Globe,
      title: "Akses Global",
      description: "Platform kami dapat diakses dari mana saja, kapan saja, oleh siapa saja yang ingin belajar ekonomi.",
    },
    {
      icon: Shield,
      title: "Kualitas Terjamin",
      description: "Konten kami dikurasi oleh ahli ekonomi dengan standar akademik yang tinggi.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Pengguna Terdaftar", icon: Users },
    { number: "500+", label: "Artikel Ekonomi", icon: BookOpen },
    { number: "200+", label: "Quiz Interaktif", icon: Award },
    { number: "98%", label: "Kepuasan Pengguna", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tentang <span className="text-purple-600">Edukonomi</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">Platform edukasi ekonomi terdepan di Indonesia yang mengubah cara belajar ekonomi menjadi pengalaman yang menyenangkan dan efektif.</p>

            {/* Team Section - DIUBAH: Pusatkan ke tengah */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white to-purple-50">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Dibentuk Oleh</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">Dari pembelajar, untuk pembelajar.</p>
                </div>

                {/* DIUBAH: Menggunakan flex untuk menempatkan di tengah */}
                <div className="flex justify-center">
                  <div className="max-w-md w-full">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="p-8 text-center">
                          {/* Avatar di tengah */}
                          <div className="flex justify-center mb-6">
                            <img src={member.avatar} alt={member.name} className="w-50 h-50 rounded-full border-4 border-purple-100 object-cover" />
                          </div>

                          {/* Nama dan Role */}
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                          <p className="text-lg text-purple-600 font-medium mb-4">{member.role}</p>

                          {/* Expertise */}
                          <div className="mb-6">
                            <span className="inline-block px-4 py-2 text-sm font-medium bg-purple-100 text-purple-800 rounded-full">{member.expertise}</span>
                          </div>

                          {/* Bio */}
                          <p className="text-gray-600">{member.bio}</p>

                          {/* Social Icons (Optional) */}
                          <div className="flex justify-center space-x-4 mt-6 pt-6 border-t border-gray-100">
                            <a href="https://www.linkedin.com/in/umair-al-ahmad/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-colors">
                              <span className="sr-only">LinkedIn</span>
                              <Linkedin size={20} />
                            </a>

                            <a href="https://www.instagram.com/umair_alahmad/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-colors">
                              <span className="sr-only">Instagram</span>
                              <Instagram size={20} />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visi & Misi Kami</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Kami berkomitmen untuk menciptakan generasi yang melek ekonomi melalui pembelajaran yang inovatif.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Vision */}
            <div className="bg-linear-to-br from-purple-50 to-blue-50 p-8 rounded-2xl border border-purple-100">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-linear-to-br from-purple-600 to-blue-600 text-white mr-4">
                  <Lightbulb size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Visi</h3>
              </div>
              <p className="text-gray-700 mb-6">Menjadi platform edukasi ekonomi nomor satu di Indonesia yang mampu memberdayakan jutaan pelajar, mahasiswa, dan profesional untuk memahami konsep ekonomi dengan mudah dan praktis.</p>
              <ul className="space-y-3">
                {["Menciptakan komunitas pembelajar ekonomi terbesar di Indonesia", "Mengembangkan metode pembelajaran yang adaptif dan personal", "Memberikan akses pendidikan ekonomi berkualitas untuk semua"].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mission */}
            <div className="bg-linear-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-linear-to-br from-blue-600 to-purple-600 text-white mr-4">
                  <Target size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Misi</h3>
              </div>
              <p className="text-gray-700 mb-6">Menyediakan konten ekonomi yang komprehensif, mudah dipahami, dan relevan dengan perkembangan zaman melalui berbagai format pembelajaran yang interaktif.</p>
              <ul className="space-y-3">
                {[
                  "Mengembangkan 1000+ modul ekonomi dalam 3 tahun ke depan",
                  "Menyelenggarakan webinar dan workshop ekonomi bulanan",
                  "Bekerja sama dengan institusi pendidikan dan profesional",
                  "Terus berinovasi dalam metode pengajaran dan assessment",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nilai-Nilai Kami</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Prinsip-prinsip yang membimbing setiap langkah kami dalam menghadirkan pendidikan ekonomi terbaik.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="p-3 rounded-xl bg-linear-to-br from-purple-100 to-blue-100 text-purple-600 w-fit mb-4">
                  <value.icon size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-linear-to-br from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm mr-4">
                <GraduationCap size={32} />
              </div>
              <h2 className="text-3xl font-bold">Mari Bergabung dengan Kami</h2>
            </div>
            <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">Mulai perjalanan belajar ekonomi Anda hari ini dan dapatkan akses ke konten premium, quiz interaktif, dan sertifikasi yang diakui.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register" className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-colors duration-200 shadow-lg">
                Daftar Gratis
              </a>
              <a href="/course" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors duration-200">
                Lihat Materi
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
