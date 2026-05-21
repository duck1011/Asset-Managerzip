export type Lang = "en" | "id";

const translations = {
  en: {
    // Navbar
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      ourWork: "Our Work",
      media: "Media Studio",
      contact: "Contact",
      dashboard: "My Dashboard",
      booking: "Book a Service",
      consultation: "Book Consultation",
      login: "Login",
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

    landing: {
      socialProof: {
        label: "Trusted by",
      },
      hero: {
        title: "Scale Your Business With Digital Solutions That Convert",
        titleLines: [
          "Scale Your Business",
          "With Digital Solutions That Convert",
        ],
        subtitle:
          "Website Development, Branding, Performance Marketing, and Analytics — managed in one place.",
        ctaPrimary: "Book Free Consultation",
        ctaSecondary: "View Our Work",
        trustStars: "⭐⭐⭐⭐⭐ Trusted by 120+ businesses",
        trustText: "Join companies that grow with measurable digital strategy.",
        trustTags: "Website • Branding • Ads • Analytics",
      },
      whyChoose: {
        title: "Why NorthSouth",
        items: [
          { title: "Fast Delivery", description: "We move quickly without sacrificing quality." },
          { title: "Data Driven", description: "Every decision backed by analytics." },
          { title: "Modern Design", description: "Designed for usability and conversions." },
          { title: "Dedicated Support", description: "Support through every step." },
        ],
      },
      services: {
        title: "Our Services",
        subtitle: "End-to-end digital capabilities built to scale your brand and revenue.",
        learnMore: "Learn More",
        items: [
          {
            title: "Website Development",
            description: "Fast, conversion-focused websites engineered for growth.",
          },
          {
            title: "UI/UX Design",
            description: "Interfaces that feel premium and guide users to action.",
          },
          {
            title: "Digital Marketing",
            description: "Campaigns that reach the right audience at the right time.",
          },
          {
            title: "SEO Optimization",
            description: "Organic visibility that compounds month over month.",
          },
          {
            title: "Brand Strategy",
            description: "Positioning and identity that stand out in crowded markets.",
          },
          {
            title: "Data Analytics",
            description: "Clear insights so every marketing dollar works harder.",
          },
        ],
      },
      metrics: {
        title: "Results That Matter",
        subtitle: "Measurable impact across every engagement.",
        items: [
          { value: 120, suffix: "+", label: "Projects Delivered", decimals: 0 },
          { value: 95, suffix: "%", label: "Client Satisfaction", decimals: 0 },
          { value: 300, suffix: "%", label: "Average Growth", decimals: 0 },
          { value: 24, suffix: "/7", label: "Support", decimals: 0 },
        ],
      },
      portfolio: {
        title: "Projects That Deliver Results",
        subtitle: "Real outcomes from brands we've helped scale.",
        viewAll: "View Full Portfolio",
        viewProject: "View Project",
        items: [
          {
            name: "Harlow Bakery",
            category: "E-commerce",
            result: "+120% traffic growth",
            description: "Full-funnel redesign and SEO that doubled organic reach in one quarter.",
            tags: ["Web Design", "SEO", "Analytics"],
          },
          {
            name: "Peak Outfitters",
            category: "Retail",
            result: "+45% conversion increase",
            description: "Premium storefront experience with performance marketing integration.",
            tags: ["Branding", "Web Design", "Ads"],
          },
          {
            name: "Luna Spa",
            category: "Hospitality",
            result: "+300% engagement",
            description: "Brand refresh and content system that elevated social presence.",
            tags: ["Branding", "Content", "Analytics"],
          },
        ],
      },
      process: {
        title: "How We Work",
        steps: [
          { title: "Discovery", description: "Understand goals, audience, and constraints." },
          { title: "Strategy", description: "Define roadmap, KPIs, and success metrics." },
          { title: "Design", description: "Craft visuals and flows that convert." },
          { title: "Development", description: "Build, test, and optimize for performance." },
          { title: "Launch", description: "Ship, measure, and iterate for growth." },
        ],
      },
      testimonials: {
        title: "What Clients Say",
        items: [
          {
            name: "Sarah Chen",
            company: "Harlow Bakery",
            companyInitial: "H",
            avatar: "https://i.pravatar.cc/96?img=5",
            review:
              "NorthSouth transformed our online presence. Traffic doubled in three months and our booking flow finally converts.",
          },
          {
            name: "Marcus Webb",
            company: "Peak Outfitters",
            companyInitial: "P",
            avatar: "https://i.pravatar.cc/96?img=12",
            review:
              "Professional, fast, and data-driven. The new site paid for itself within the first quarter.",
          },
          {
            name: "Elena Rodriguez",
            company: "Luna Spa",
            companyInitial: "L",
            avatar: "https://i.pravatar.cc/96?img=25",
            review:
              "Their team understood our brand instantly. Creative work that actually drives bookings.",
          },
          {
            name: "James Okonkwo",
            company: "ClearView Law",
            companyInitial: "C",
            avatar: "https://i.pravatar.cc/96?img=33",
            review:
              "Clear communication and exceptional results on our ad campaigns. Highly recommend.",
          },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            question: "How long does website development take?",
            answer:
              "Most projects take 4–8 weeks depending on scope. We provide a detailed timeline after discovery.",
          },
          {
            question: "Can I request only marketing services?",
            answer:
              "Yes. You can engage us for SEO, paid ads, or content without a full website build.",
          },
          {
            question: "How many revisions are included?",
            answer:
              "Each package includes two revision rounds per phase. Additional rounds can be added if needed.",
          },
          {
            question: "Do you provide support after launch?",
            answer:
              "Yes. We offer ongoing maintenance, analytics reporting, and optimization retainers.",
          },
        ],
      },
      cta: {
        title: "Ready to Grow Your Business?",
        subtitle: "Let's create something that delivers real results.",
        bookConsultation: "Book Consultation",
        contactUs: "Contact Us",
      },
      footer: {
        tagline: "Premium digital solutions for brands that want to grow smarter.",
        quickLinks: "Quick Links",
        quickLinksItems: [
          { label: "Services", href: "/services" },
          { label: "Dashboard", href: "/dashboard" },
          { label: "About", href: "/profile" },
          { label: "Contact", href: "/#contact" },
        ],
        servicesTitle: "Services",
        servicesItems: [
          "Website Development",
          "UI/UX Design",
          "Digital Marketing",
          "SEO Optimization",
        ],
        socialTitle: "Social Media",
        copyright: "© 2026 NorthSouth. All rights reserved.",
      },
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
        "Founded in 2018, NorthSouth is a boutique digital agency specializing in brand identity, web design, SEO, and paid advertising. Our team of 12 specialists has helped over 200 clients across retail, healthcare, real estate, and professional services achieve measurable growth. We believe every business deserves a world-class digital presence.",
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
      payNow: "Pay Now",
      payLater: "Pay Later",
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
      toastPayLater: "Booking saved! Pay when you're ready.",
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
      receiptId: "ID",
      receiptService: "Service",
      receiptDate: "Date",
      receiptTime: "Time",
      receiptPrice: "Amount",
      receiptStatus: "Status",
      statusPaid: "Paid",
      statusPayLater: "Pay Later",
      badgeConsultation: "Consultation",
      payNow: "Pay Now",
      cancelBooking: "Cancel",
      cancelToast: "Booking cancelled. Fully refunded.",
      printReceipt: "Print Receipt",
      totalBookings: "Total Bookings",
      totalSpend: "Latest Price",
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
      about: "Tentang",
      services: "Layanan",
      ourWork: "Karya Kami",
      media: "Studio Media",
      contact: "Kontak",
      dashboard: "Dasbor Saya",
      booking: "Pesan Layanan",
      consultation: "Pesan Konsultasi",
      login: "Masuk",
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

    landing: {
      socialProof: {
        label: "Dipercaya oleh",
      },
      hero: {
        title: "Skalakan Bisnis Anda dengan Solusi Digital yang Mengonversi",
        titleLines: [
          "Skalakan Bisnis Anda",
          "Dengan Solusi Digital yang Mengonversi",
        ],
        subtitle:
          "Pengembangan Website, Branding, Pemasaran Performa, dan Analitik — dikelola dalam satu tempat.",
        ctaPrimary: "Pesan Konsultasi Gratis",
        ctaSecondary: "Lihat Karya Kami",
        trustStars: "⭐⭐⭐⭐⭐ Dipercaya 120+ bisnis",
        trustText: "Bergabung dengan perusahaan yang tumbuh dengan strategi digital terukur.",
        trustTags: "Website • Branding • Iklan • Analitik",
      },
      whyChoose: {
        title: "Mengapa NorthSouth",
        items: [
          { title: "Pengiriman Cepat", description: "Kami bergerak cepat tanpa mengorbankan kualitas." },
          { title: "Berbasis Data", description: "Setiap keputusan didukung analitik." },
          { title: "Desain Modern", description: "Dirancang untuk kegunaan dan konversi." },
          { title: "Dukungan Dedikasi", description: "Pendampingan di setiap langkah." },
        ],
      },
      services: {
        title: "Layanan Kami",
        subtitle: "Kemampuan digital menyeluruh untuk mengembangkan merek dan pendapatan Anda.",
        learnMore: "Pelajari Lebih",
        items: [
          {
            title: "Pengembangan Website",
            description: "Website cepat dan fokus konversi yang dirancang untuk pertumbuhan.",
          },
          {
            title: "Desain UI/UX",
            description: "Antarmuka premium yang memandu pengguna bertindak.",
          },
          {
            title: "Pemasaran Digital",
            description: "Kampanye yang menjangkau audiens tepat pada waktu tepat.",
          },
          {
            title: "Optimasi SEO",
            description: "Visibilitas organik yang bertambah setiap bulan.",
          },
          {
            title: "Strategi Merek",
            description: "Positioning dan identitas yang menonjol di pasar ramai.",
          },
          {
            title: "Analitik Data",
            description: "Wawasan jelas agar setiap anggaran pemasaran bekerja lebih keras.",
          },
        ],
      },
      metrics: {
        title: "Hasil yang Berarti",
        subtitle: "Dampak terukur di setiap proyek.",
        items: [
          { value: 120, suffix: "+", label: "Proyek Diselesaikan", decimals: 0 },
          { value: 95, suffix: "%", label: "Kepuasan Klien", decimals: 0 },
          { value: 300, suffix: "%", label: "Pertumbuhan Rata-rata", decimals: 0 },
          { value: 24, suffix: "/7", label: "Dukungan", decimals: 0 },
        ],
      },
      portfolio: {
        title: "Proyek yang Memberikan Hasil",
        subtitle: "Hasil nyata dari merek yang telah kami bantu skalakan.",
        viewAll: "Lihat Portofolio Lengkap",
        viewProject: "Lihat Proyek",
        items: [
          {
            name: "Harlow Bakery",
            category: "E-commerce",
            result: "+120% pertumbuhan traffic",
            description: "Redesain funnel penuh dan SEO yang menggandakan jangkauan organik.",
            tags: ["Desain Web", "SEO", "Analitik"],
          },
          {
            name: "Peak Outfitters",
            category: "Ritel",
            result: "+45% peningkatan konversi",
            description: "Pengalaman toko premium dengan integrasi pemasaran performa.",
            tags: ["Branding", "Desain Web", "Iklan"],
          },
          {
            name: "Luna Spa",
            category: "Perhotelan",
            result: "+300% engagement",
            description: "Refresh merek dan sistem konten yang meningkatkan sosial media.",
            tags: ["Branding", "Konten", "Analitik"],
          },
        ],
      },
      process: {
        title: "Cara Kami Bekerja",
        steps: [
          { title: "Discovery", description: "Memahami tujuan, audiens, dan batasan." },
          { title: "Strategi", description: "Menetapkan roadmap, KPI, dan metrik sukses." },
          { title: "Desain", description: "Membuat visual dan alur yang mengonversi." },
          { title: "Pengembangan", description: "Membangun, menguji, dan mengoptimalkan performa." },
          { title: "Peluncuran", description: "Meluncurkan, mengukur, dan mengiterasi pertumbuhan." },
        ],
      },
      testimonials: {
        title: "Apa Kata Klien",
        items: [
          {
            name: "Sarah Chen",
            company: "Harlow Bakery",
            companyInitial: "H",
            avatar: "https://i.pravatar.cc/96?img=5",
            review:
              "NorthSouth mengubah kehadiran online kami. Traffic berlipat dalam tiga bulan dan alur pemesanan akhirnya mengonversi.",
          },
          {
            name: "Marcus Webb",
            company: "Peak Outfitters",
            companyInitial: "P",
            avatar: "https://i.pravatar.cc/96?img=12",
            review:
              "Profesional, cepat, dan berbasis data. Website baru terbayar dalam kuartal pertama.",
          },
          {
            name: "Elena Rodriguez",
            company: "Luna Spa",
            companyInitial: "L",
            avatar: "https://i.pravatar.cc/96?img=25",
            review:
              "Tim mereka langsung memahami merek kami. Karya kreatif yang benar-benar mendorong pemesanan.",
          },
          {
            name: "James Okonkwo",
            company: "ClearView Law",
            companyInitial: "C",
            avatar: "https://i.pravatar.cc/96?img=33",
            review:
              "Komunikasi jelas dan hasil luar biasa pada kampanye iklan kami. Sangat direkomendasikan.",
          },
        ],
      },
      faq: {
        title: "Pertanyaan Umum",
        items: [
          {
            question: "Berapa lama pengembangan website?",
            answer:
              "Sebagian besar proyek memakan 4–8 minggu tergantung ruang lingkup. Kami memberikan timeline detail setelah discovery.",
          },
          {
            question: "Bisakah saya hanya meminta layanan pemasaran?",
            answer:
              "Ya. Anda dapat menggunakan kami untuk SEO, iklan berbayar, atau konten tanpa membangun website lengkap.",
          },
          {
            question: "Berapa banyak revisi yang disertakan?",
            answer:
              "Setiap paket mencakup dua putaran revisi per fase. Putaran tambahan dapat ditambahkan jika diperlukan.",
          },
          {
            question: "Apakah Anda menyediakan dukungan setelah peluncuran?",
            answer:
              "Ya. Kami menawarkan pemeliharaan berkelanjutan, pelaporan analitik, dan retainer optimasi.",
          },
        ],
      },
      cta: {
        title: "Siap Mengembangkan Bisnis Anda?",
        subtitle: "Mari ciptakan sesuatu yang memberikan hasil nyata.",
        bookConsultation: "Pesan Konsultasi",
        contactUs: "Hubungi Kami",
      },
      footer: {
        tagline: "Solusi digital premium untuk merek yang ingin tumbuh lebih cerdas.",
        quickLinks: "Tautan Cepat",
        quickLinksItems: [
          { label: "Layanan", href: "/services" },
          { label: "Dasbor", href: "/dashboard" },
          { label: "Tentang", href: "/profile" },
          { label: "Kontak", href: "/#contact" },
        ],
        servicesTitle: "Layanan",
        servicesItems: [
          "Pengembangan Website",
          "Desain UI/UX",
          "Pemasaran Digital",
          "Optimasi SEO",
        ],
        socialTitle: "Media Sosial",
        copyright: "© 2026 NorthSouth. Hak cipta dilindungi.",
      },
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
        "Didirikan pada 2018, NorthSouth adalah agensi digital boutique yang mengkhususkan diri dalam identitas merek, desain web, SEO, dan iklan berbayar. Tim 12 spesialis kami telah membantu lebih dari 200 klien di bidang ritel, kesehatan, properti, dan layanan profesional mencapai pertumbuhan yang terukur. Kami percaya setiap bisnis berhak mendapatkan kehadiran digital berkelas dunia.",
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
      payNow: "Bayar Sekarang",
      payLater: "Bayar Nanti",
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
      toastPayLater: "Pemesanan disimpan! Bayar saat siap.",
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
      receiptId: "ID",
      receiptService: "Layanan",
      receiptDate: "Tanggal",
      receiptTime: "Waktu",
      receiptPrice: "Jumlah",
      receiptStatus: "Status",
      statusPaid: "Lunas",
      statusPayLater: "Bayar Nanti",
      badgeConsultation: "Konsultasi",
      payNow: "Bayar Sekarang",
      cancelBooking: "Batalkan",
      cancelToast: "Pemesanan dibatalkan. Dana dikembalikan sepenuhnya.",
      printReceipt: "Cetak Tanda Terima",
      totalBookings: "Total Pemesanan",
      totalSpend: "Harga Terbaru",
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
