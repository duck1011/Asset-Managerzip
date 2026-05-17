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
      dashboard: "My Dashboard",
      booking: "Book a Service",
      consultation: "Free Consultation",
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

    // Booking page
    booking: {
      pageTitle: "Book a Service",
      pageDesc: "Choose a service and schedule your session in three simple steps.",
      step1Title: "Select a Service",
      step1Desc: "Click the service you'd like to book.",
      step2Title: "Schedule & Your Details",
      step2Desc: "Pick a date, time, and tell us about yourself.",
      step3Title: "Review & Confirm",
      step3Desc: "Review your booking before confirming.",
      labelDate: "Preferred Date",
      labelTime: "Preferred Time",
      labelName: "Full Name",
      labelEmail: "Email Address",
      labelPhone: "Phone Number",
      placeholderName: "Jane Smith",
      placeholderEmail: "jane@example.com",
      placeholderPhone: "+1 (555) 000-0000",
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening",
      back: "Back",
      next: "Next",
      confirmPay: "Confirm & Pay",
      processing: "Processing...",
      summaryService: "Service",
      summaryDate: "Date",
      summaryTime: "Time",
      summaryName: "Name",
      summaryEmail: "Email",
      summaryPhone: "Phone",
      summaryPrice: "Total",
      toastSuccess: "Booking confirmed! Check your dashboard.",
      step: "Step",
      of: "of",
    },

    // Consultation page
    consultation: {
      pageTitle: "Free Consultation",
      pageDesc:
        "Not sure where to start? Book a free 30-minute strategy session with our team.",
      labelName: "Full Name",
      labelEmail: "Email Address",
      labelNeed: "What do you need help with?",
      labelDate: "Preferred Date",
      placeholderName: "Jane Smith",
      placeholderEmail: "jane@example.com",
      placeholderNeed: "Tell us about your business goals and challenges...",
      submit: "Schedule Consultation",
      submitting: "Scheduling...",
      toastSuccess: "Consultation scheduled! We'll be in touch shortly.",
      whyTitle: "Why book a consultation?",
      why1: "100% free, no commitment",
      why2: "30-minute focused strategy session",
      why3: "Expert advice tailored to your business",
      why4: "Response within 24 hours",
    },

    // Dashboard page
    dashboard: {
      pageTitle: "My Dashboard",
      pageDesc: "View and manage your bookings and receipts.",
      noBookings: "No bookings yet",
      noBookingsDesc: "You haven't made any bookings. Explore our services to get started.",
      browseServices: "Browse Services",
      receiptId: "Booking ID",
      receiptService: "Service",
      receiptDate: "Date",
      receiptTime: "Time",
      receiptPrice: "Amount Paid",
      receiptStatus: "Status",
      statusPaid: "Paid",
      printReceipt: "Print Receipt",
      totalBookings: "Total Bookings",
      totalSpend: "Total Spend",
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
      dashboard: "Dasbor Saya",
      booking: "Pesan Layanan",
      consultation: "Konsultasi Gratis",
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

    // Booking page
    booking: {
      pageTitle: "Pesan Layanan",
      pageDesc: "Pilih layanan dan jadwalkan sesi Anda dalam tiga langkah mudah.",
      step1Title: "Pilih Layanan",
      step1Desc: "Klik layanan yang ingin Anda pesan.",
      step2Title: "Jadwal & Detail Anda",
      step2Desc: "Pilih tanggal, waktu, dan ceritakan tentang diri Anda.",
      step3Title: "Tinjau & Konfirmasi",
      step3Desc: "Tinjau pemesanan Anda sebelum dikonfirmasi.",
      labelDate: "Tanggal Pilihan",
      labelTime: "Waktu Pilihan",
      labelName: "Nama Lengkap",
      labelEmail: "Alamat Email",
      labelPhone: "Nomor Telepon",
      placeholderName: "Budi Santoso",
      placeholderEmail: "budi@contoh.com",
      placeholderPhone: "+62 812-0000-0000",
      morning: "Pagi",
      afternoon: "Siang",
      evening: "Malam",
      back: "Kembali",
      next: "Lanjut",
      confirmPay: "Konfirmasi & Bayar",
      processing: "Memproses...",
      summaryService: "Layanan",
      summaryDate: "Tanggal",
      summaryTime: "Waktu",
      summaryName: "Nama",
      summaryEmail: "Email",
      summaryPhone: "Telepon",
      summaryPrice: "Total",
      toastSuccess: "Pemesanan dikonfirmasi! Cek dasbor Anda.",
      step: "Langkah",
      of: "dari",
    },

    // Consultation page
    consultation: {
      pageTitle: "Konsultasi Gratis",
      pageDesc:
        "Tidak tahu harus mulai dari mana? Pesan sesi strategi gratis 30 menit dengan tim kami.",
      labelName: "Nama Lengkap",
      labelEmail: "Alamat Email",
      labelNeed: "Apa yang perlu Anda bantu?",
      labelDate: "Tanggal Pilihan",
      placeholderName: "Budi Santoso",
      placeholderEmail: "budi@contoh.com",
      placeholderNeed: "Ceritakan tujuan dan tantangan bisnis Anda...",
      submit: "Jadwalkan Konsultasi",
      submitting: "Menjadwalkan...",
      toastSuccess: "Konsultasi dijadwalkan! Kami akan segera menghubungi Anda.",
      whyTitle: "Mengapa memesan konsultasi?",
      why1: "100% gratis, tanpa komitmen",
      why2: "Sesi strategi terfokus 30 menit",
      why3: "Saran ahli yang disesuaikan dengan bisnis Anda",
      why4: "Respons dalam 24 jam",
    },

    // Dashboard page
    dashboard: {
      pageTitle: "Dasbor Saya",
      pageDesc: "Lihat dan kelola pemesanan dan tanda terima Anda.",
      noBookings: "Belum ada pemesanan",
      noBookingsDesc: "Anda belum melakukan pemesanan. Jelajahi layanan kami untuk memulai.",
      browseServices: "Jelajahi Layanan",
      receiptId: "ID Pemesanan",
      receiptService: "Layanan",
      receiptDate: "Tanggal",
      receiptTime: "Waktu",
      receiptPrice: "Jumlah Dibayar",
      receiptStatus: "Status",
      statusPaid: "Lunas",
      printReceipt: "Cetak Tanda Terima",
      totalBookings: "Total Pemesanan",
      totalSpend: "Total Pengeluaran",
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
