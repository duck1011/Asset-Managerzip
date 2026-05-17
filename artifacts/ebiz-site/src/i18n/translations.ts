export type Lang = "en" | "id";

const translations = {
  en: {
    // Navbar
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      media: "Media Studio",
      contact: "Contact Us",
    },

    // Footer
    footer: {
      company: "Company",
      contact: "Contact",
      rights: "All rights reserved.",
    },

    // Home page
    home: {
      heroCta: "Our Services",
      heroSecondary: "Learn About Us",
      capabilitiesTitle: "Core Capabilities",
      capabilitiesDesc:
        "Enterprise-grade digital strategy and execution tailored for growing businesses.",
      viewAllServices: "View All Services",
      recentWorkTitle: "Recent Work",
      recentWorkDesc:
        "A selection of our latest projects driving measurable growth for clients.",
      exploreMedia: "Explore Media Studio",
    },

    // Profile page
    profile: {
      pageTitle: "About Us",
      missionLabel: "Our Mission",
      storyTitle: "Our Story",
      clientsServed: "Clients Served",
      specialists: "Digital Specialists",
      yearFounded: "Year Founded",
      tagline: "Grow Smarter. Reach Further.",
      mission:
        "We help small businesses compete with enterprise-grade digital strategy, design, and marketing — without the enterprise price tag.",
      aboutText:
        "Founded in 2018, BrightEdge Digital is a boutique digital agency specializing in brand identity, web design, SEO, and paid advertising. Our team of 12 specialists has helped over 200 clients across retail, healthcare, real estate, and professional services achieve measurable growth. We believe every business deserves a world-class digital presence.",
    },

    // Services page
    services: {
      pageTitle: "Our Services",
      pageDesc:
        "Comprehensive digital solutions designed to elevate your brand and drive measurable growth.",
      ctaTitle: "Not sure where to start?",
      ctaDesc:
        "Schedule a free consultation with our strategy team to discuss your business goals and find the right mix of services.",
      ctaButton: "Book a Consultation",
    },

    // ServiceCard
    serviceCard: {
      select: "Select Service",
      selected: "Selected",
    },

    // Media page
    media: {
      pageTitle: "Media Studio",
      pageDesc: "Explore our portfolio of recent work and creative assets.",
      addTitle: "Add to Gallery",
      addDesc: "Upload a new image to the portfolio.",
      labelUrl: "Image URL",
      placeholderUrl: "https://example.com/image.jpg",
      labelCategory: "Category",
      placeholderCategory: "e.g. Branding, Web Design",
      labelAlt: "Alt Text (Optional)",
      placeholderAlt: "Describe the image content",
      addButton: "Add to Gallery",
    },

    // Mock data — services
    serviceData: [
      {
        title: "Brand Identity",
        description:
          "Logo design, visual language, and brand guidelines that make you instantly recognizable.",
      },
      {
        title: "Web Design & Dev",
        description:
          "Fast, beautiful, mobile-first websites built to convert visitors into customers.",
      },
      {
        title: "SEO Strategy",
        description:
          "Rank higher, drive organic traffic, and outperform competitors in search results.",
      },
      {
        title: "Paid Advertising",
        description:
          "Google and Meta ad campaigns that maximize ROI and scale with your budget.",
      },
      {
        title: "Content Marketing",
        description:
          "Blogs, copy, and social content that builds authority and keeps audiences engaged.",
      },
      {
        title: "Analytics & Reporting",
        description:
          "Real-time dashboards and monthly reports so you always know what's working.",
      },
    ],
  },

  id: {
    // Navbar
    nav: {
      home: "Beranda",
      about: "Tentang Kami",
      services: "Layanan",
      media: "Studio Media",
      contact: "Hubungi Kami",
    },

    // Footer
    footer: {
      company: "Perusahaan",
      contact: "Kontak",
      rights: "Hak cipta dilindungi.",
    },

    // Home page
    home: {
      heroCta: "Layanan Kami",
      heroSecondary: "Pelajari Tentang Kami",
      capabilitiesTitle: "Kemampuan Utama",
      capabilitiesDesc:
        "Strategi dan eksekusi digital tingkat enterprise yang disesuaikan untuk bisnis yang berkembang.",
      viewAllServices: "Lihat Semua Layanan",
      recentWorkTitle: "Karya Terbaru",
      recentWorkDesc:
        "Pilihan proyek terbaru kami yang mendorong pertumbuhan terukur bagi klien.",
      exploreMedia: "Jelajahi Studio Media",
    },

    // Profile page
    profile: {
      pageTitle: "Tentang Kami",
      missionLabel: "Misi Kami",
      storyTitle: "Kisah Kami",
      clientsServed: "Klien Dilayani",
      specialists: "Spesialis Digital",
      yearFounded: "Tahun Berdiri",
      tagline: "Tumbuh Lebih Cerdas. Jangkau Lebih Jauh.",
      mission:
        "Kami membantu bisnis kecil bersaing dengan strategi digital, desain, dan pemasaran berkelas enterprise — tanpa harga enterprise.",
      aboutText:
        "Didirikan pada 2018, BrightEdge Digital adalah agensi digital boutique yang mengkhususkan diri dalam identitas merek, desain web, SEO, dan iklan berbayar. Tim 12 spesialis kami telah membantu lebih dari 200 klien di bidang ritel, kesehatan, properti, dan layanan profesional mencapai pertumbuhan yang terukur. Kami percaya setiap bisnis berhak mendapatkan kehadiran digital berkelas dunia.",
    },

    // Services page
    services: {
      pageTitle: "Layanan Kami",
      pageDesc:
        "Solusi digital komprehensif yang dirancang untuk meningkatkan merek Anda dan mendorong pertumbuhan terukur.",
      ctaTitle: "Tidak tahu harus mulai dari mana?",
      ctaDesc:
        "Jadwalkan konsultasi gratis dengan tim strategi kami untuk mendiskusikan tujuan bisnis Anda dan menemukan perpaduan layanan yang tepat.",
      ctaButton: "Pesan Konsultasi",
    },

    // ServiceCard
    serviceCard: {
      select: "Pilih Layanan",
      selected: "Dipilih",
    },

    // Media page
    media: {
      pageTitle: "Studio Media",
      pageDesc: "Jelajahi portofolio karya terbaru dan aset kreatif kami.",
      addTitle: "Tambah ke Galeri",
      addDesc: "Unggah gambar baru ke portofolio.",
      labelUrl: "URL Gambar",
      placeholderUrl: "https://contoh.com/gambar.jpg",
      labelCategory: "Kategori",
      placeholderCategory: "mis. Branding, Desain Web",
      labelAlt: "Teks Alt (Opsional)",
      placeholderAlt: "Deskripsikan konten gambar",
      addButton: "Tambah ke Galeri",
    },

    // Mock data — services
    serviceData: [
      {
        title: "Identitas Merek",
        description:
          "Desain logo, bahasa visual, dan panduan merek yang membuat Anda langsung dikenal.",
      },
      {
        title: "Desain & Pengembangan Web",
        description:
          "Website mobile-first yang cepat dan indah, dibangun untuk mengubah pengunjung menjadi pelanggan.",
      },
      {
        title: "Strategi SEO",
        description:
          "Raih peringkat lebih tinggi, tingkatkan traffic organik, dan kalahkan kompetitor di hasil pencarian.",
      },
      {
        title: "Iklan Berbayar",
        description:
          "Kampanye iklan Google dan Meta yang memaksimalkan ROI dan berkembang sesuai anggaran Anda.",
      },
      {
        title: "Pemasaran Konten",
        description:
          "Blog, copywriting, dan konten media sosial yang membangun otoritas dan menjaga keterlibatan audiens.",
      },
      {
        title: "Analitik & Pelaporan",
        description:
          "Dashboard real-time dan laporan bulanan agar Anda selalu tahu apa yang berhasil.",
      },
    ],
  },
};

export default translations;
