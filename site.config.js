/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  SITE.CONFIG.JS — CẤU HÌNH NỘI DUNG WEBSITE               ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  Toàn bộ nội dung hiển thị trên website được quản lý       ║
 * ║  tại file này. Muốn đổi nội dung, chỉ cần sửa file này    ║
 * ║  rồi chạy `npm.cmd run build`.                                 ║
 * ║                                                             ║
 * ║  HƯỚNG DẪN:                                                 ║
 * ║  - Thay các giá trị [IN_HOA] bằng thông tin thật            ║
 * ║  - Đường dẫn ảnh viết dạng "public/images/..."             ║
 * ║  - Ảnh ưu tiên .webp, tên kebab-case: service-01.webp      ║
 * ║  - Kích thước ảnh khuyến nghị ghi ở comment từng mục       ║
 * ║  - Ảnh chưa có → trang tự hiện khung nền thay thế           ║
 * ║  - Link còn placeholder → nút tự trỏ về mục #contact        ║
 * ║  - mobileVisible = số mục hiện sẵn trên điện thoại, phần    ║
 * ║    còn lại ẩn sau nút "Xem thêm (N)"                         ║
 * ║  - Kích thước ảnh ghi theo thứ tự: MOBILE trước, DESKTOP sau ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

export const SITE_CONFIG = {

  // ─── 1. SEO & META ─────────────────────────────────────────
  seo: {
    title: "MC [TEN_MC] — MC Sự Kiện Chuyên Nghiệp",
    description: "MC dẫn chương trình sự kiện chuyên nghiệp tại TP.HCM và toàn quốc. Hơn [SO_NAM_KINH_NGHIEM] năm kinh nghiệm, [SO_SU_KIEN]+ sự kiện thành công.",
    keywords: "MC sự kiện, MC đám cưới, MC doanh nghiệp, dẫn chương trình, [TEN_MC]",
    ogImage: "public/images/og/og-cover.jpg",        // 1200×630px, JPG (Facebook/Zalo chưa đọc tốt WebP)
    ogImageAlt: "MC [TEN_MC] — Dẫn chương trình sự kiện",
    url: "[WEBSITE_URL]",                            // VD: https://ten-ban.github.io/mc-portfolio/
    locale: "vi_VN",
    themeColor: "#050F0E",                           // Màu thanh trình duyệt trên điện thoại (trùng màu nền tối)
  },

  // ─── 2. THÔNG TIN CÁ NHÂN / THƯƠNG HIỆU ──────────────────
  brand: {
    name: "[TEN_MC]",
    tagline: "MC Sự Kiện Chuyên Nghiệp",
    logo: "public/icons/favicon.svg",                // SVG logo, 40×40px hiển thị
    logoAlt: "Logo [TEN_MC]",
  },

  // ─── 3. HEADER ─────────────────────────────────────────────
  // Logo bên trái, menu giữa, nút CTA bên phải
  header: {
    menuItems: [
      { label: "Trang chủ", href: "#hero" },
      { label: "Giới thiệu", href: "#about" },
      { label: "Dịch vụ", href: "#services" },
      { label: "Video", href: "#videos" },
      { label: "Gallery", href: "#gallery" },
      { label: "Cảm nhận", href: "#testimonials" },
      { label: "Hỏi đáp", href: "#faq" },
      { label: "Liên hệ", href: "#contact" },
    ],
    ctaButton: {
      label: "Đặt Lịch Ngay",
      href: "[ZALO_LINK]",                           // Link Zalo hoặc #contact
    },
  },

  // ─── 4. HERO (SPOTLIGHT REVEAL) ───────────────────────────
  // Ảnh chân dung: Mobile 750×1334px (dọc 9:16), Desktop 1920×1080px (ngang 16:9)
  // Màn hình mới mở tối hẳn; luồng sáng bám theo ngón tay / con trỏ soi rõ ảnh, tên MC và nút đặt lịch.
  // Tên MC lớn lấy từ brand.name, dòng nhỏ phía trên lấy từ brand.tagline.
  hero: {
    // 4a. Dòng chữ mỏng giữa màn hình khi trang vừa mở (tắt dần khi luồng sáng xuất hiện)
    revealTeaser: "Sẵn sàng tỏa sáng...",
    // 4b. Gợi ý nhỏ ở đáy hero (điện thoại / máy tính)
    revealHint: {
      touch: "Chạm và kéo để soi sáng sân khấu",
      mouse: "Di chuột để soi sáng sân khấu",
    },
    // 4c. Điểm lấy nét của ảnh (CSS object-position "ngang dọc") — đặt vào khuôn mặt để không bị cắt
    imagePosition: {
      mobile: "48% 25%",
      desktop: "50% 35%",
    },
    heading: "Khoảnh Khắc Đáng Nhớ\nBắt Đầu Từ Sân Khấu",
    subheading: "MC dẫn chương trình chuyên nghiệp cho đám cưới, sự kiện doanh nghiệp và các chương trình nghệ thuật trên toàn quốc.",
    backgroundDesktop: "public/images/hero/hero-d.webp", // Desktop 1920×1080px (ngang) — cắt từ hero.jpg
    backgroundMobile: "public/images/hero/hero-m.webp",  // Mobile 750×1334px (dọc 9:16) — cắt từ hero_minh.jpg
    backgroundAlt: "MC [TEN_MC] dẫn chương trình trên sân khấu",
    ctaPrimary: {
      label: "Đặt Lịch Qua Zalo",
      href: "[ZALO_LINK]",
    },
    ctaSecondary: {
      label: "Xem Showreel",
      href: "#videos",
    },
    scrollIndicator: true,
  },

  // ─── 5. GIỚI THIỆU ────────────────────────────────────────
  // Ảnh chân dung: Mobile 400×500px (4:5), Desktop 600×800px (3:4)
  about: {
    sectionLabel: "Về Tôi",
    heading: "Đồng Hành Cùng\nKhoảnh Khắc Của Bạn",
    portrait: "public/images/about/portrait.webp",        // 600×800px
    portraitMobile: "public/images/about/portrait-mobile.webp", // 400×500px
    portraitAlt: "MC [TEN_MC] trên sân khấu",
    // 5a. Tóm tắt 2–3 câu, luôn hiển thị. "story" bên dưới nằm trong khối "Đọc câu chuyện" thu gọn
    summary: "Hơn [SO_NAM_KINH_NGHIEM] năm cầm micro, hơn [SO_SU_KIEN] sự kiện — từ tiệc cưới ấm cúng đến gala hàng nghìn khách. Tôi dẫn dắt bằng sự chuẩn bị kỹ lưỡng, giọng nói vững vàng và khả năng giữ nhịp cảm xúc cho cả khán phòng.",
    storyToggleLabel: "Đọc câu chuyện của tôi",
    story: "Với hơn [SO_NAM_KINH_NGHIEM] năm kinh nghiệm trong lĩnh vực dẫn chương trình, tôi đã có vinh dự đồng hành cùng hàng trăm sự kiện — từ những đám cưới ấm cúng đến những gala doanh nghiệp quy mô lớn.\n\nTriết lý của tôi: mỗi sự kiện là duy nhất, và người MC phải là cầu nối cảm xúc giữa chương trình và khán giả. Tôi luôn chuẩn bị kỹ lưỡng, lắng nghe mong muốn của khách hàng, và mang đến năng lượng tích cực cho từng khoảnh khắc trên sân khấu.",
    stats: [
      { number: "[SO_NAM_KINH_NGHIEM]+", label: "Năm Kinh Nghiệm" },
      { number: "[SO_SU_KIEN]+", label: "Sự Kiện Thành Công" },
      { number: "50+", label: "Đối Tác Doanh Nghiệp" },
      { number: "100%", label: "Khách Hàng Hài Lòng" },
    ],
  },

  // ─── 6. DỊCH VỤ ───────────────────────────────────────────
  // Ảnh dịch vụ: 600×400px (3:2) — dùng chung desktop & mobile (thẻ co theo màn hình)
  services: {
    sectionLabel: "Dịch Vụ",
    heading: "Dịch Vụ Của Tôi",
    subheading: "Mỗi loại hình sự kiện đều được chuẩn bị kịch bản riêng, phù hợp với phong cách và mong muốn của bạn.",
    mobileVisible: 3,                                // Số thẻ hiện sẵn trên điện thoại (máy tính hiện đủ)
    // Ảnh dịch vụ chỉ hiển thị từ tablet trở lên; trên điện thoại thẻ chỉ có icon + chữ cho gọn
    items: [
      {
        icon: "wedding",
        title: "MC Đám Cưới",
        description: "Dẫn dắt tiệc cưới ấm cúng, lãng mạn với kịch bản cá nhân hóa cho từng cặp đôi.",
        image: "public/images/services/service-01.webp",  // 600×400px
      },
      {
        icon: "corporate",
        title: "MC Doanh Nghiệp",
        description: "Gala dinner, hội nghị khách hàng, lễ kỷ niệm — chuyên nghiệp và đẳng cấp.",
        image: "public/images/services/service-02.webp",
      },
      {
        icon: "event",
        title: "MC Sự Kiện",
        description: "Festival, concert, gameshow — tạo không khí sôi động và kết nối khán giả.",
        image: "public/images/services/service-03.webp",
      },
      {
        icon: "ceremony",
        title: "MC Lễ Khai Trương",
        description: "Lễ khai trương, động thổ, khánh thành — trang trọng và chuyên nghiệp.",
        image: "public/images/services/service-04.webp",
      },
      {
        icon: "award",
        title: "MC Lễ Trao Giải",
        description: "Vinh danh, trao giải thưởng — tạo cảm xúc và khoảnh khắc đáng nhớ.",
        image: "public/images/services/service-05.webp",
      },
      {
        icon: "bilingual",
        title: "MC Song Ngữ",
        description: "Dẫn chương trình Việt — Anh cho sự kiện quốc tế và đa văn hóa.",
        image: "public/images/services/service-06.webp",
      },
    ],
  },

  // ─── 7. VIDEO ──────────────────────────────────────────────
  // Thumbnail (poster): showreel 1280×720px, video nhỏ 640×360px (16:9) — dùng chung desktop & mobile
  // videoUrl: link YouTube (https://youtu.be/... hoặc https://www.youtube.com/watch?v=...)
  //           hoặc file tự host "public/videos/ten-video.mp4". Video chỉ tải khi người xem bấm.
  videos: {
    sectionLabel: "Video",
    heading: "Khoảnh Khắc Trên Sân Khấu",
    subheading: "Xem những highlight từ các sự kiện tôi đã dẫn chương trình.",
    mobileVisible: 2,                                // Số video nhỏ hiện sẵn trên điện thoại
    featured: {
      title: "Showreel 2025",
      thumbnail: "public/images/videos/showreel-thumb.webp",  // 1280×720px
      // Đoạn clip ngắn (5–15 giây, không tiếng, ≤ 3MB, MP4 H.264) tự phát lặp lại khi cuộn tới.
      // Mobile 720×900px (4:5) hoặc dùng chung bản 1280×720px — khung tự cắt cho vừa. Để "" nếu chưa có.
      previewClip: "public/videos/showreel-preview.mp4",
      videoUrl: "[YOUTUBE_SHOWREEL_URL]",
      duration: "3:45",
    },
    items: [
      {
        title: "Highlight Đám Cưới",
        thumbnail: "public/images/videos/video-01.webp",       // 640×360px
        videoUrl: "[YOUTUBE_VIDEO_01]",
        duration: "2:30",
      },
      {
        title: "Gala Doanh Nghiệp ABC",
        thumbnail: "public/images/videos/video-02.webp",
        videoUrl: "[YOUTUBE_VIDEO_02]",
        duration: "4:15",
      },
      {
        title: "Festival Âm Nhạc 2025",
        thumbnail: "public/images/videos/video-03.webp",
        videoUrl: "[YOUTUBE_VIDEO_03]",
        duration: "3:00",
      },
      {
        title: "Lễ Kỷ Niệm 20 Năm Cty XYZ",
        thumbnail: "public/images/videos/video-04.webp",
        videoUrl: "[YOUTUBE_VIDEO_04]",
        duration: "5:20",
      },
    ],
  },

  // ─── 8. GALLERY ────────────────────────────────────────────
  // Ảnh gallery: Mobile dùng chung, Desktop 1200×900px (4:3) — lưới mobile cắt vuông, lightbox hiện ảnh đầy đủ
  // Lưới: 2 cột trên điện thoại, 3 cột từ desktop. "category" hiện làm chú thích ảnh trong lightbox
  gallery: {
    sectionLabel: "Hình Ảnh",
    heading: "Khoảnh Khắc Đáng Nhớ",
    subheading: "Những khoảnh khắc thực tế từ các sự kiện tôi đã đồng hành.",
    categories: ["Tất cả", "Đám cưới", "Doanh nghiệp", "Sự kiện", "Hậu trường"],
    mobileVisible: 6,                                // Số ảnh hiện sẵn (lưới 2 cột trên điện thoại)
    moreLabel: "Xem thêm ảnh",
    items: [
      {
        src: "public/images/gallery/gallery-01.webp",    // 1200×900px
        alt: "MC dẫn chương trình trên sân khấu tiệc phủ hoa trắng",
        category: "Đám cưới",
      },
      {
        src: "public/images/gallery/gallery-02.webp",
        alt: "MC công bố giải đặc biệt cùng khách mời",
        category: "Doanh nghiệp",
      },
      {
        src: "public/images/gallery/gallery-03.webp",
        alt: "MC giao lưu, khuấy động khách mời tại year-end party",
        category: "Sự kiện",
      },
      {
        src: "public/images/gallery/gallery-04.webp",
        alt: "MC dẫn phần giao lưu giữa buổi tiệc",
        category: "Đám cưới",
      },
      {
        src: "public/images/gallery/gallery-05.webp",
        alt: "MC cùng khách mời trên sân khấu Year End Party",
        category: "Doanh nghiệp",
      },
      {
        src: "public/images/gallery/gallery-06.webp",
        alt: "MC dẫn hội thi văn nghệ trước màn hình LED lớn",
        category: "Hậu trường",
      },
      {
        src: "public/images/gallery/gallery-07.webp",
        alt: "Tiết mục biểu diễn dưới ánh đèn sân khấu",
        category: "Sự kiện",
      },
      {
        src: "public/images/gallery/gallery-08.webp",
        alt: "MC cùng nhóm khách mời trên sân khấu tất niên",
        category: "Đám cưới",
      },
    ],
  },

  // ─── 9. KHÁCH HÀNG / ĐỐI TÁC ─────────────────────────────
  // Logo đối tác: 200×80px, nền trong suốt (WebP/PNG/SVG) — dùng chung desktop & mobile
  // Chưa có logo → hiển thị tên công ty trong khung
  partners: {
    sectionLabel: "Đối Tác",
    heading: "Tin Tưởng Bởi",
    marqueeSeconds: 30,                              // Thời gian chạy hết 1 vòng dải logo (lớn hơn = chậm hơn)
    monochrome: true,                                // true = logo chuyển về trắng đơn sắc cho đồng bộ; false = giữ màu gốc của logo
    items: [
      { name: "Vietcombank", logo: "public/images/partners/partner-01.webp" },
      { name: "MB Bank", logo: "public/images/partners/partner-02.webp" },
      { name: "ACB", logo: "public/images/partners/partner-03.webp" },
      { name: "VPBank", logo: "public/images/partners/partner-04.webp" },
      { name: "VIB", logo: "public/images/partners/partner-05.webp" },
      { name: "HSBC", logo: "public/images/partners/partner-06.webp" },
    ],
  },

  // ─── 10. CẢM NHẬN KHÁCH HÀNG ──────────────────────────────
  // Avatar: 100×100px vuông (hiển thị tròn) — chưa có ảnh → hiện chữ cái đầu của tên
  testimonials: {
    sectionLabel: "Cảm Nhận",
    heading: "Khách Hàng Nói Gì",
    subheading: "Niềm tin của khách hàng là động lực lớn nhất để tôi không ngừng hoàn thiện.",
    sliderLimit: 3,                                  // Slider chỉ lấy N cảm nhận đầu tiên (nên 2–3)
    items: [
      {
        name: "Anh Trần Văn Hùng",
        role: "Giám đốc, Công ty ABC",
        avatar: "public/images/testimonials/avatar-01.webp",  // 100×100px
        content: "Anh [TEN_MC] dẫn gala cuối năm cho công ty tôi rất chuyên nghiệp. Chương trình được dẫn dắt mạch lạc, không khí sôi động. Chắc chắn sẽ tiếp tục hợp tác!",
        rating: 5,
      },
      {
        name: "Chị Nguyễn Thị Mai",
        role: "Cô dâu",
        avatar: "public/images/testimonials/avatar-02.webp",
        content: "Cảm ơn anh [TEN_MC] đã làm đám cưới của vợ chồng em thêm trọn vẹn. Anh rất tâm lý, chuẩn bị kỹ lưỡng và tạo được nhiều khoảnh khắc xúc động.",
        rating: 5,
      },
      {
        name: "Anh Lê Minh Đức",
        role: "Trưởng phòng Marketing, Tập đoàn XYZ",
        avatar: "public/images/testimonials/avatar-03.webp",
        content: "Đã làm việc với nhiều MC nhưng anh [TEN_MC] luôn là lựa chọn hàng đầu cho các sự kiện quan trọng. Phong cách chuyên nghiệp, linh hoạt và rất có duyên.",
        rating: 5,
      },
      {
        name: "Chị Phạm Hồng Nhung",
        role: "Wedding Planner",
        avatar: "public/images/testimonials/avatar-04.webp",
        content: "Tôi thường xuyên giới thiệu anh [TEN_MC] cho các cặp đôi. Anh luôn mang đến sự chuyên nghiệp và cảm xúc đúng mực cho mỗi lễ cưới.",
        rating: 5,
      },
    ],
  },

  // ─── 10b. CÂU HỎI THƯỜNG GẶP ─────────────────────────────
  // Dạng mở/đóng (accordion). Thêm/bớt câu hỏi bằng cách thêm/xóa object trong items
  faq: {
    sectionLabel: "Hỏi Đáp",
    heading: "Câu Hỏi Thường Gặp",
    items: [
      {
        question: "Tôi nên đặt lịch trước bao lâu?",
        answer: "Với đám cưới và gala cuối năm, bạn nên đặt trước 1–3 tháng. Sự kiện nhỏ có thể đặt trước 1–2 tuần nếu lịch còn trống.",
      },
      {
        question: "Chi phí dẫn chương trình được tính thế nào?",
        answer: "Chi phí phụ thuộc loại sự kiện, thời lượng, địa điểm và yêu cầu song ngữ. Liên hệ qua Zalo để nhận báo giá chi tiết trong 24 giờ.",
      },
      {
        question: "MC có hỗ trợ viết kịch bản không?",
        answer: "Có. Tôi cùng bạn xây dựng kịch bản chi tiết, thống nhất tiến trình với ban tổ chức và tham gia tổng duyệt khi cần.",
      },
      {
        question: "MC có nhận sự kiện ngoài [THANH_PHO] không?",
        answer: "Có, tôi nhận sự kiện trên toàn quốc. Chi phí di chuyển và lưu trú (nếu có) sẽ được báo rõ trong báo giá.",
      },
    ],
  },

  // ─── 11. LIÊN HỆ ──────────────────────────────────────────
  contact: {
    sectionLabel: "Liên Hệ",
    heading: "Hãy Kết Nối Với Tôi",
    subheading: "Bạn đang lên kế hoạch cho sự kiện? Liên hệ ngay để được tư vấn miễn phí!",
    phone: "[SO_DIEN_THOAI]",                        // VD: "0901 234 567" — tự tạo link tel:
    zalo: "[ZALO_LINK]",                             // https://zalo.me/<số điện thoại>
    email: "[EMAIL]",
    facebook: "[FACEBOOK_LINK]",
    youtube: "[YOUTUBE_LINK]",
    address: "[DIA_CHI]",
    workingHours: "Thứ 2 — Chủ nhật: 8:00 — 21:00",
    // Form báo giá: bấm gửi sẽ mở ứng dụng email với nội dung đã điền (không cần máy chủ)
    // Trên trang, form nằm trong khối thu gọn để mục Liên hệ ngắn gọn trên điện thoại
    form: {
      toggleLabel: "Hoặc gửi yêu cầu báo giá qua email",
      heading: "Gửi Yêu Cầu Báo Giá",
      note: "Để lại thông tin, tôi sẽ liên hệ lại trong vòng 24 giờ.",
      submitLabel: "Gửi Yêu Cầu",
      eventTypes: ["Đám cưới", "Sự kiện doanh nghiệp", "Khai trương / Khánh thành", "Lễ trao giải", "Sự kiện song ngữ", "Khác"],
    },
  },

  // ─── 12. FLOATING BUTTON ──────────────────────────────────
  // Cụm nút phát sáng góc phải dưới (mọi màn hình), hiện ra khi đã cuộn qua hero
  floatingButton: {
    enabled: true,
    type: "zalo",
    label: "Chat Zalo",
    href: "[ZALO_LINK]",                             // VD: https://zalo.me/0901234567
    showPhone: true,                                 // Thêm nút gọi điện (lấy số ở contact.phone)
    phoneLabel: "Gọi điện",
  },

  // ─── 13. FOOTER ────────────────────────────────────────────
  footer: {
    copyright: "© 2026 [TEN_MC]. All rights reserved.",
    madeWith: "MC sự kiện tại TP.HCM & toàn quốc",
    backToTop: true,
  },
};
