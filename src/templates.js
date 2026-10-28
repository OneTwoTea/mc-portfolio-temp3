/**
 * ═══════════════════════════════════════════════════════════
 *  TEMPLATES.JS — Bộ render: config → HTML
 *  Chuyển đổi dữ liệu từ site.config.js thành HTML hoàn chỉnh.
 *  Giao diện "Spotlight": nền tối, điểm nhấn vàng ánh kim, thiết kế cho điện thoại trước.
 * ═══════════════════════════════════════════════════════════
 */

// ─── ICONS (SVG inline, nét mảnh) ───────────────────────
const ICONS = {
  wedding: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  corporate: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/></svg>`,
  event: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  ceremony: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
  award: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  bilingual: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  email: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  zalo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor"><path d="M12.5 6C9.46 6 7 8.46 7 11.5v25C7 39.54 9.46 42 12.5 42h23c3.04 0 5.5-2.46 5.5-5.5v-25C41 8.46 38.54 6 35.5 6h-23zm2.14 11h18.72c.87 0 1.34 1.01.78 1.67L22.97 31.5h8.87c.74 0 1.16.83.71 1.39-.15.18-.37.29-.61.29H13.36c-.87 0-1.34-1.01-.78-1.67L23.75 18.7h-9.1a.82.82 0 0 1-.72-.43.81.81 0 0 1 .71-1.27z"/></svg>`,
  play: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>`,
  star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  arrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  arrowUp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`,
  location: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  send: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  quote: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z"/></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
};

// ─── TIỆN ÍCH ──────────────────────────────────────────

/** Escape HTML để chống XSS */
export function esc(str) {
  if (typeof str !== "string") return String(str ?? "");
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Kiểm tra giá trị có phải placeholder [IN_HOA] không */
export function isPlaceholder(val) {
  if (typeof val !== "string") return false;
  return /\[[A-Z0-9_]+\]/.test(val);
}

/** Trả SVG icon inline (trang trí → aria-hidden) */
export function icon(name, cls = "") {
  const svg = ICONS[name];
  if (!svg) return `<!-- icon "${name}" không tìm thấy -->`;
  const clsAttr = cls ? ` class="${esc(cls)}"` : "";
  return svg.replace("<svg ", `<svg${clsAttr} aria-hidden="true" focusable="false" `);
}

/**
 * Tạo thẻ ảnh. Ảnh MOBILE là nguồn mặc định (src của <img>); ảnh desktop chỉ nạp
 * qua <source media="(min-width: 768px)"> khi có (bố cục khác hẳn, VD hero dọc ↔ ngang).
 * Có width/height, alt, lazy-load (trừ ảnh màn hình đầu → priority).
 * Ảnh lỗi/chưa có sẽ tự ẩn (onerror) để lộ khung thay thế .img-placeholder đặt NGAY TRƯỚC nó.
 */
export function media({ src, alt = "", cls = "", width, height, lazy = true, priority = false, desktopSrc, desktopWidth, desktopHeight, style = "" }) {
  const loadAttr = priority ? ` fetchpriority="high"` : lazy ? ` loading="lazy"` : "";
  const imgCls = cls ? ` class="${esc(cls)}"` : "";
  const styleAttr = style ? ` style="${esc(style)}"` : "";
  const size = (w, h) => `${w ? ` width="${w}"` : ""}${h ? ` height="${h}"` : ""}`;
  const img = `<img src="${esc(src)}" alt="${esc(alt)}"${imgCls}${styleAttr}${size(width, height)}${loadAttr} decoding="async" onload="this.dataset.loaded=1" onerror="this.hidden=true">`;

  if (!desktopSrc || desktopSrc === src) return img;
  return `<picture class="contents">
  <source media="(min-width: 768px)" srcset="${esc(desktopSrc)}"${size(desktopWidth, desktopHeight)}>
  ${img}
</picture>`;
}

/** Khung thay thế cùng kích thước, hiện khi ảnh chưa có (ảnh đặt sau nó sẽ che lên) */
function placeholder(label = "", cls = "absolute inset-0") {
  return `<span class="img-placeholder ${cls}" aria-hidden="true">${label ? `<span>${esc(label)}</span>` : ""}</span>`;
}

/** Thuộc tính href (+ target/rel nếu là link ngoài) */
function linkAttrs(href) {
  const external = /^https?:\/\//.test(href);
  return `href="${esc(href)}"${external ? ` target="_blank" rel="noopener noreferrer"` : ""}`;
}

/** Xuống dòng \n trong config → <br> */
function lines(text) {
  return esc(text || "").replace(/\n/g, "<br>");
}

/** Số mục hiển thị trước khi thu gọn (lấy từ config, mặc định fallback) */
function visibleCount(value, fallback) {
  const n = parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

// ─── HELPERS ────────────────────────────────────────────

/** Tạo các link tel/zalo/mailto/mạng xã hội — nếu còn placeholder thì trỏ về #contact */
export function createHelpers(config) {
  const c = config.contact || {};

  function safeLink(value, prefix = "") {
    if (!value || isPlaceholder(value)) return "#contact";
    if (prefix === "tel:") return `tel:${value.replace(/[^\d+]/g, "")}`;
    if (prefix === "mailto:") return `mailto:${value}`;
    if (prefix === "zalo:") return /^https?:\/\//.test(value) ? value : `https://zalo.me/${value.replace(/[^\d]/g, "")}`;
    return value;
  }

  const hasPhone = c.phone && !isPlaceholder(c.phone);
  const hasEmail = c.email && !isPlaceholder(c.email);

  return {
    phoneLink: safeLink(c.phone, "tel:"),
    phoneDisplay: hasPhone ? c.phone : "Đang cập nhật",
    zaloLink: safeLink(c.zalo, "zalo:"),
    emailLink: safeLink(c.email, "mailto:"),
    emailDisplay: hasEmail ? c.email : "Đang cập nhật",
    emailRaw: hasEmail ? c.email : "",
    facebookLink: safeLink(c.facebook),
    youtubeLink: safeLink(c.youtube),
    ctaLink: safeLink(config.header?.ctaButton?.href || c.zalo, "zalo:"),
    heroCtaLink: safeLink(config.hero?.ctaPrimary?.href || c.zalo, "zalo:"),
    floatingLink: safeLink(config.floatingButton?.href || c.zalo, "zalo:"),
  };
}

// ─── RENDERERS ──────────────────────────────────────────

export function createRenderers(config) {
  const h = createHelpers(config);
  const container = "mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8";

  /** Tiêu đề chung của mỗi section (nhãn vàng + tiêu đề serif + mô tả ngắn) */
  function sectionHead(sec, fallbackLabel, { center = false, id = "" } = {}) {
    const align = center ? "text-center mx-auto" : "";
    return `<div class="reveal mb-8 md:mb-12 max-w-2xl ${align}">
          <p class="eyebrow ${center ? "justify-center" : ""}">${esc(sec.sectionLabel || fallbackLabel)}</p>
          <h2${id ? ` id="${id}"` : ""} class="mt-3 font-heading text-[clamp(1.875rem,7.6vw,3.25rem)] font-semibold leading-[1.12] text-balance break-words">${lines(sec.heading)}</h2>
          ${sec.subheading ? `<p class="mt-3 text-fg-muted leading-relaxed">${esc(sec.subheading)}</p>` : ""}
        </div>`;
  }

  /**
   * Danh sách thu gọn được: mục thứ (visible+1) trở đi mang data-extra, ẩn khi có JS.
   * mode "mobile": từ lg hiện đầy đủ; mode "all": thu gọn ở mọi kích thước.
   * Không có JS → hiện tất cả (nút "Xem thêm" giữ thuộc tính hidden).
   */
  function collapsible({ id, items, visible, gridCls, moreLabel = "Xem thêm", mode = "mobile" }) {
    const extra = Math.max(0, items.length - visible);
    const html = items.map((itemHtml, i) => (i >= visible ? itemHtml.replace(/^<(\w+)/, "<$1 data-extra") : itemHtml)).join("\n          ");
    const btn = extra
      ? `<div class="mt-6 flex justify-center${mode === "mobile" ? " lg:hidden" : ""}">
          <button type="button" class="btn-more" data-more aria-expanded="false" aria-controls="${id}" data-label-more="${esc(moreLabel)} (${extra})" data-label-less="Thu gọn" hidden>
            <span data-more-label>${esc(moreLabel)} (${extra})</span>
            ${icon("chevronDown", "w-5 h-5 transition-transform duration-200")}
          </button>
        </div>`
      : "";
    return `<div id="${id}" class="${gridCls}" data-collapse="${extra ? mode : "none"}">
          ${html}
        </div>
        ${btn}`;
  }

  /** Khối chữ của hero — render 2 lần: bản thật (được soi sáng) và bản viền mờ (ghost) */
  function heroCopy(ghost) {
    const brand = config.brand || {};
    const hero = config.hero || {};
    const hide = ghost ? ` class="invisible"` : "";
    const nameTag = ghost ? "p" : "h1";
    return `<div class="hero-copy absolute inset-x-0 bottom-[calc(10.75rem+env(safe-area-inset-bottom))] md:bottom-[calc(11.5rem+env(safe-area-inset-bottom))] ${container} text-center">
          <p class="eyebrow justify-center${ghost ? " invisible" : ""}">${esc(brand.tagline || "")}</p>
          <${nameTag} class="hero-name mt-3 font-heading font-semibold leading-[0.98] text-[clamp(3rem,15vw,8.5rem)] text-balance break-words${ghost ? " is-ghost" : ""}">${esc(brand.name || "")}</${nameTag}>
          <p${hide ? ` class="invisible mt-4 font-heading italic text-[clamp(1.125rem,4.6vw,1.75rem)] leading-snug text-balance"` : ` class="mt-4 font-heading italic text-[clamp(1.125rem,4.6vw,1.75rem)] leading-snug text-fg/90 text-balance"`}>${lines(hero.heading)}</p>
          ${hero.subheading ? `<p class="${ghost ? "invisible " : ""}hidden md:block mt-3 max-w-xl mx-auto text-fg-muted">${esc(hero.subheading)}</p>` : ""}
        </div>`;
  }

  return {
    // ─── SEO HEAD ─────────────────────────────────────
    seoHead() {
      const seo = config.seo || {};
      const siteUrl = seo.url && !isPlaceholder(seo.url) ? seo.url.replace(/\/?$/, "/") : "";
      // og:image cần URL tuyệt đối — chỉ ghép được khi đã có seo.url
      const ogImage = siteUrl ? siteUrl + (seo.ogImage || "") : seo.ogImage || "";
      return `<title>${esc(seo.title || "MC Portfolio")}</title>
  <meta name="description" content="${esc(seo.description || "")}">
  <meta name="keywords" content="${esc(seo.keywords || "")}">
  ${siteUrl ? `<link rel="canonical" href="${esc(siteUrl)}">\n  <meta property="og:url" content="${esc(siteUrl)}">` : ""}
  <meta property="og:type" content="website">
  <meta property="og:locale" content="${esc(seo.locale || "vi_VN")}">
  <meta property="og:site_name" content="${esc(config.brand?.name || "")}">
  <meta property="og:title" content="${esc(seo.title || "")}">
  <meta property="og:description" content="${esc(seo.description || "")}">
  <meta property="og:image" content="${esc(ogImage)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(seo.ogImageAlt || "")}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(seo.title || "")}">
  <meta name="twitter:description" content="${esc(seo.description || "")}">
  <meta name="twitter:image" content="${esc(ogImage)}">
  <meta name="theme-color" content="${esc(seo.themeColor || "#050F0E")}">
  <meta name="color-scheme" content="dark">
  <link rel="icon" type="image/svg+xml" href="public/icons/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="public/icons/favicon-32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="public/icons/apple-touch-icon.png">`;
    },

    // ─── CTA HEADER (thuộc tính href đã xử lý placeholder) ─
    ctaAttrs() {
      return linkAttrs(h.ctaLink);
    },

    // ─── HEADER NAV (desktop) ─────────────────────────
    headerNav() {
      return (config.header?.menuItems || [])
        .map((item) => `<a href="${esc(item.href)}" class="nav-link">${esc(item.label)}</a>`)
        .join("\n        ");
    },

    // ─── MOBILE NAV ITEMS ─────────────────────────────
    mobileNav() {
      return (config.header?.menuItems || [])
        .map(
          (item, i) =>
            `<a href="${esc(item.href)}" class="mobile-link" style="--i:${i}"><span class="text-fg-dim font-body text-sm tabular-nums w-7">${String(i + 1).padStart(2, "0")}</span>${esc(item.label)}</a>`
        )
        .join("\n        ");
    },

    // ─── HERO: SPOTLIGHT REVEAL ───────────────────────
    heroSection() {
      const hero = config.hero || {};
      const pos = hero.imagePosition || {};
      const hint = hero.revealHint || {};
      return `<section id="hero" class="hero relative min-h-[100svh] overflow-hidden isolate" data-spotlight aria-label="Giới thiệu nhanh">
      <!-- Lớp 0: quầng sáng vàng nằm DƯỚI ảnh → chỉ tạo viền hào quang quanh luồng sáng, không nhuộm màu ảnh -->
      <div class="hero-glow absolute inset-0 pointer-events-none" aria-hidden="true"></div>

      <!-- Lớp 1: bố cục ẩn được luồng sáng soi rọi (ảnh chân dung + tên MC). Không có JS → hiện rõ toàn bộ -->
      <div class="hero-lit absolute inset-0">
        ${placeholder("", "absolute inset-0 stage-pattern")}
        ${media({
          src: hero.backgroundMobile || hero.backgroundDesktop || "",
          desktopSrc: hero.backgroundDesktop || "",
          alt: hero.backgroundAlt || "",
          cls: "hero-img absolute inset-0 w-full h-full object-cover",
          style: `--pos-m:${pos.mobile || "50% 30%"};--pos-d:${pos.desktop || pos.mobile || "50% 30%"}`,
          width: 750,
          height: 1334,
          desktopWidth: 1920,
          desktopHeight: 1080,
          lazy: false,
          priority: true,
        })}
        <div class="hero-scrim absolute inset-0" aria-hidden="true"></div>
        ${heroCopy(false)}
      </div>

      <!-- Lớp 2: tên MC dạng viền mờ — luôn thấy được trong bóng tối -->
      <div class="hero-ghost absolute inset-0 pointer-events-none" aria-hidden="true">
        ${heroCopy(true)}
      </div>

      <!-- Dòng chữ chờ khi trang vừa mở -->
      <p class="hero-teaser absolute inset-x-0 top-[38%] px-5 text-center font-light tracking-[0.32em] uppercase text-fg-muted text-base sm:text-lg" aria-hidden="true">${esc(hero.revealTeaser || "")}</p>

      <!-- CTA (luôn bấm được, nằm trong tầm ngón cái) -->
      <div class="hero-cta absolute inset-x-0 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-10 ${container} flex flex-col items-center gap-2">
        <a ${linkAttrs(h.heroCtaLink)} class="btn-glow w-full max-w-xs">
          ${icon("calendar", "w-5 h-5")} ${esc(hero.ctaPrimary?.label || "Đặt lịch")}
        </a>
        <a href="${esc(hero.ctaSecondary?.href || "#videos")}" class="btn-link">
          ${icon("play", "w-4 h-4")} ${esc(hero.ctaSecondary?.label || "Xem showreel")}
        </a>
        <p class="hero-hint text-sm text-fg-dim" data-hint-touch="${esc(hint.touch || "")}" data-hint-mouse="${esc(hint.mouse || "")}" aria-hidden="true"></p>
      </div>
    </section>`;
    },

    // ─── ABOUT (GIỚI THIỆU) ──────────────────────────
    aboutSection() {
      const about = config.about || {};
      const paragraphs = (about.story || "")
        .split(/\n\s*\n/)
        .map((p) => `<p>${lines(p.trim())}</p>`)
        .join("\n              ");

      const statsHtml = (about.stats || [])
        .map(
          (s) => `<div class="min-w-0 border-l border-gold/40 pl-4">
              <dt class="sr-only">${esc(s.label)}</dt>
              <dd class="${isPlaceholder(s.number) ? "text-base break-all" : "text-[clamp(1.75rem,7vw,2.5rem)]"} font-heading font-semibold text-gold leading-tight">${esc(s.number)}</dd>
              <dd class="mt-1 text-sm text-fg-muted" aria-hidden="true">${esc(s.label)}</dd>
            </div>`
        )
        .join("\n            ");

      const portrait = (src, w, hgt) => `<div class="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink-2 ring-1 ring-line">
                ${placeholder("Ảnh chân dung")}
                ${media({ src, alt: about.portraitAlt || "Ảnh chân dung", cls: "absolute inset-0 w-full h-full object-cover", width: w, height: hgt })}
              </div>`;

      return `<section id="about" class="section band-emerald">
      <div class="${container} grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16 items-center">
        <!-- Ảnh chân dung (desktop) -->
        <div class="hidden lg:block reveal">
          ${portrait(about.portrait || about.portraitMobile || "", 600, 800)}
        </div>

        <div class="min-w-0">
          ${sectionHead(about, "Về Tôi")}
          <p class="reveal text-lg leading-relaxed text-fg">${esc(about.summary || "")}</p>

          <dl class="reveal mt-8 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6">
            ${statsHtml}
          </dl>

          <!-- Câu chuyện đầy đủ: thu gọn bằng <details> gốc -->
          ${about.story ? `<details class="disclosure reveal mt-8">
            <summary>
              <span>${esc(about.storyToggleLabel || "Đọc câu chuyện")}</span>
              ${icon("plus", "disclosure-icon w-5 h-5")}
            </summary>
            <div class="disclosure-body space-y-4 text-fg-muted leading-relaxed">
              <div class="lg:hidden max-w-[15rem]">
                ${portrait(about.portraitMobile || about.portrait || "", 400, 500)}
              </div>
              ${paragraphs}
            </div>
          </details>` : ""}
        </div>
      </div>
    </section>`;
    },

    // ─── SERVICES (DỊCH VỤ) ──────────────────────────
    servicesSection() {
      const svc = config.services || {};
      const cards = (svc.items || []).map(
        (item) => `<article class="glow-card reveal">
            <div class="hidden md:block relative aspect-[3/2] overflow-hidden rounded-t-[inherit] bg-ink-3">
              ${placeholder(item.title)}
              ${media({ src: item.image || "", alt: item.imageAlt || item.title || "", cls: "absolute inset-0 w-full h-full object-cover", width: 600, height: 400 })}
            </div>
            <div class="flex gap-4 p-5 md:flex-col md:gap-3 md:p-6">
              <span class="grid place-items-center w-12 h-12 flex-none rounded-full border border-gold/40 text-gold">
                ${icon(item.icon || "event", "w-6 h-6")}
              </span>
              <div class="min-w-0">
                <h3 class="font-heading text-xl font-semibold leading-snug">${esc(item.title)}</h3>
                <p class="mt-1.5 text-fg-muted leading-relaxed">${esc(item.description)}</p>
              </div>
            </div>
          </article>`
      );

      return `<section id="services" class="section band-petrol">
      <div class="${container}">
        ${sectionHead(svc, "Dịch Vụ")}
        ${collapsible({
          id: "services-list",
          items: cards,
          visible: visibleCount(svc.mobileVisible, 3),
          gridCls: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6",
          moreLabel: "Xem thêm dịch vụ",
        })}
      </div>
    </section>`;
    },

    // ─── VIDEOS (SHOWREEL TRÀN VIỀN + VIDEO NHỎ) ─────
    videosSection() {
      const vid = config.videos || {};
      const featured = vid.featured || {};
      const clip = featured.previewClip && !isPlaceholder(featured.previewClip) ? featured.previewClip : "";

      // Video chưa có link → modal hiện thông báo "đang cập nhật" thay vì trình phát rỗng
      const videoAttr = (url) => (url && !isPlaceholder(url) ? `data-video="${esc(url)}"` : `data-video-missing`);

      const smallVideos = (vid.items || []).map(
        (v) => `<div class="reveal">
            <button type="button" ${videoAttr(v.videoUrl)} class="video-thumb group" aria-label="Phát video: ${esc(v.title)}">
              ${placeholder("")}
              ${media({ src: v.thumbnail || "", alt: "", cls: "absolute inset-0 w-full h-full object-cover", width: 640, height: 360 })}
              <span class="play-dot w-12 h-12">${icon("play", "w-5 h-5 ml-0.5")}</span>
              ${v.duration ? `<span class="absolute bottom-2 right-2 rounded bg-ink/80 px-2 py-0.5 text-sm tabular-nums">${esc(v.duration)}</span>` : ""}
            </button>
            <h3 class="mt-3 font-medium leading-snug">${esc(v.title)}</h3>
          </div>`
      );

      return `<section id="videos" class="section">
      <div class="${container}">
        ${sectionHead(vid, "Video")}
      </div>

      <!-- Showreel tràn viền: clip ngắn tự phát không tiếng khi cuộn tới; bấm để xem bản đầy đủ -->
      <div class="reveal relative w-full aspect-[4/5] sm:aspect-video lg:aspect-[21/9] max-h-[85svh] overflow-hidden bg-ink-2">
        ${placeholder("", "absolute inset-0 stage-pattern")}
        ${media({ src: featured.thumbnail || "", alt: "", cls: "absolute inset-0 w-full h-full object-cover", width: 1280, height: 720 })}
        ${clip ? `<video class="absolute inset-0 w-full h-full object-cover" data-autoplay data-src="${esc(clip)}" muted playsinline loop preload="none" aria-hidden="true" tabindex="-1"></video>` : ""}
        <div class="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.7))]" aria-hidden="true"></div>
        <div class="absolute inset-x-0 bottom-0 ${container} pb-6 md:pb-10 flex items-end justify-between gap-4">
          <div class="min-w-0">
            <p class="eyebrow">Showreel${featured.duration ? ` · <span class="tabular-nums">${esc(featured.duration)}</span>` : ""}</p>
            <h3 class="mt-2 font-heading text-[clamp(1.5rem,6.5vw,2.75rem)] font-semibold leading-tight text-balance">${esc(featured.title || "")}</h3>
          </div>
          <button type="button" ${videoAttr(featured.videoUrl)} class="play-dot play-dot--lg flex-none" aria-label="Xem đầy đủ: ${esc(featured.title || "Showreel")}">
            ${icon("play", "w-7 h-7 ml-1")}
          </button>
        </div>
      </div>

      ${smallVideos.length ? `<div class="${container} mt-8 md:mt-12">
        ${collapsible({
          id: "videos-list",
          items: smallVideos,
          visible: visibleCount(vid.mobileVisible, 2),
          gridCls: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
          moreLabel: "Xem thêm video",
        })}
      </div>` : ""}
    </section>`;
    },

    // ─── GALLERY ──────────────────────────────────────
    gallerySection() {
      const gal = config.gallery || {};
      const items = (gal.items || []).map(
        (item, i) => `<button type="button" class="gallery-item reveal" data-lightbox="${i}" data-src="${esc(item.src || "")}" data-alt="${esc(item.alt || "")}" data-caption="${esc(item.category || "")}" aria-label="Phóng to ảnh: ${esc(item.alt || "")}">
            ${placeholder(item.category || "Ảnh")}
            ${media({ src: item.src || "", alt: item.alt || "", cls: "absolute inset-0 w-full h-full object-cover", width: 600, height: 600 })}
          </button>`
      );

      return `<section id="gallery" class="section">
      <div class="${container}">
        ${sectionHead(gal, "Hình Ảnh")}
        ${collapsible({
          id: "gallery-grid",
          items,
          visible: visibleCount(gal.mobileVisible, 6),
          gridCls: "grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3 lg:gap-4",
          moreLabel: gal.moreLabel || "Xem thêm ảnh",
          mode: "all",
        })}
      </div>
    </section>`;
    },

    // ─── PARTNERS (DẢI LOGO ĐƠN SẮC CHẠY NGANG) ──────
    partnersSection() {
      const par = config.partners || {};
      const logos = (par.items || [])
        .map(
          (p) => `<li class="marquee-item">
              ${placeholder(p.name, "absolute inset-0 marquee-name")}
              ${media({ src: p.logo || "", alt: p.name || "Đối tác", cls: `relative h-10 w-auto max-w-full object-contain${par.monochrome === false ? "" : " logo-mono"}`, width: 200, height: 80 })}
            </li>`
        )
        .join("\n            ");
      const seconds = visibleCount(par.marqueeSeconds, 30);

      return `<section id="partners" class="py-10 md:py-14 border-y border-line" aria-labelledby="partners-title">
      <div class="${container} text-center">
        <p class="eyebrow justify-center">${esc(par.sectionLabel || "Đối Tác")}</p>
        <h2 id="partners-title" class="mt-2 font-heading text-2xl font-semibold">${esc(par.heading || "")}</h2>
      </div>
      <div class="marquee mt-6" style="--marquee-duration:${seconds}s">
        <ul class="marquee-track">
            ${logos}
        </ul>
        <ul class="marquee-track marquee-clone" aria-hidden="true">
            ${logos}
        </ul>
      </div>
    </section>`;
    },

    // ─── TESTIMONIALS (SLIDER VUỐT NGANG) ────────────
    testimonialsSection() {
      const test = config.testimonials || {};
      const items = (test.items || []).slice(0, visibleCount(test.sliderLimit, 3));

      const slides = items
        .map((t, i) => {
          const rating = Math.max(0, Math.min(5, t.rating || 5));
          const stars = Array.from({ length: rating }, () => icon("star", "w-4 h-4")).join("");
          const initial = (t.name || "?").trim().split(/\s+/).pop().charAt(0);
          return `<li class="slide" aria-roledescription="slide" aria-label="${i + 1} / ${items.length}">
              <figure class="h-full flex flex-col rounded-2xl border border-line bg-ink-2/80 p-6 md:p-8">
                ${icon("quote", "w-8 h-8 text-gold/60")}
                <span class="mt-4 flex gap-0.5 text-gold" role="img" aria-label="${rating} trên 5 sao">${stars}</span>
                <blockquote class="mt-3 flex-1 text-lg leading-relaxed text-fg">${esc(t.content || "")}</blockquote>
                <figcaption class="mt-6 flex items-center gap-3">
                  <span class="relative w-12 h-12 flex-none rounded-full overflow-hidden bg-ink-3">
                    ${placeholder(initial, "absolute inset-0 font-heading text-lg text-gold")}
                    ${media({ src: t.avatar || "", alt: "", cls: "absolute inset-0 w-full h-full object-cover", width: 100, height: 100 })}
                  </span>
                  <span class="min-w-0">
                    <span class="block font-semibold">${esc(t.name || "")}</span>
                    <span class="block text-fg-muted">${esc(t.role || "")}</span>
                  </span>
                </figcaption>
              </figure>
            </li>`;
        })
        .join("\n            ");

      const dots = items
        .map(
          (_, i) =>
            `<button type="button" class="slider-dot" data-slide-to="${i}" aria-label="Xem cảm nhận ${i + 1}"${i === 0 ? ` aria-current="true"` : ""}><span></span></button>`
        )
        .join("\n            ");

      return `<section id="testimonials" class="section band-emerald">
      <div class="${container}">
        ${sectionHead(test, "Cảm Nhận")}
        <div class="reveal" data-slider role="region" aria-roledescription="carousel" aria-label="Cảm nhận khách hàng">
          <ul class="slider-track" tabindex="0" aria-label="Danh sách cảm nhận, vuốt ngang để xem">
            ${slides}
          </ul>
          ${items.length > 1 ? `<div class="mt-5 flex items-center justify-center gap-2${items.length <= 3 ? " lg:hidden" : ""}" data-slider-controls hidden>
            <button type="button" class="icon-btn hidden sm:grid" data-slide-prev aria-label="Cảm nhận trước">${icon("arrowLeft", "w-5 h-5")}</button>
            ${dots}
            <button type="button" class="icon-btn hidden sm:grid" data-slide-next aria-label="Cảm nhận sau">${icon("arrowRight", "w-5 h-5")}</button>
          </div>` : ""}
        </div>
      </div>
    </section>`;
    },

    // ─── FAQ (ACCORDION <details>) ───────────────────
    faqSection() {
      const faq = config.faq || {};
      const items = (faq.items || [])
        .map(
          (q) => `<details class="disclosure faq-item">
            <summary>
              <span>${esc(q.question)}</span>
              ${icon("plus", "disclosure-icon w-5 h-5")}
            </summary>
            <div class="disclosure-body text-fg-muted leading-relaxed">
              <p>${lines(q.answer)}</p>
            </div>
          </details>`
        )
        .join("\n          ");

      return `<section id="faq" class="section">
      <div class="mx-auto w-full max-w-3xl px-5 sm:px-6 lg:px-8">
        ${sectionHead(faq, "Hỏi Đáp")}
        <div class="reveal border-t border-line">
          ${items}
        </div>
      </div>
    </section>`;
    },

    // ─── CONTACT (LIÊN HỆ) ───────────────────────────
    contactSection() {
      const c = config.contact || {};
      const form = c.form || {};

      const row = (href, iconName, label, value) => {
        const inner = `<span class="grid place-items-center w-11 h-11 flex-none rounded-full border border-line text-gold">${icon(iconName, "w-5 h-5")}</span>
              <span class="min-w-0">
                <span class="block text-fg-dim">${esc(label)}</span>
                <span class="block font-medium break-words">${esc(value)}</span>
              </span>`;
        return href
          ? `<li><a ${linkAttrs(href)} class="contact-row">${inner}</a></li>`
          : `<li><div class="contact-row">${inner}</div></li>`;
      };

      const eventOptions = (form.eventTypes || []).map((t) => `<option value="${esc(t)}">${esc(t)}</option>`).join("");
      const field = "field";

      return `<section id="contact" class="section band-copper">
      <div class="${container} grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div class="min-w-0">
          ${sectionHead(c, "Liên Hệ")}
          <div class="reveal grid grid-cols-2 gap-3">
            <a ${linkAttrs(h.phoneLink)} class="btn-glow">${icon("phone", "w-5 h-5")} Gọi ngay</a>
            <a ${linkAttrs(h.zaloLink)} class="btn-outline">${icon("zalo", "w-5 h-5")} Chat Zalo</a>
          </div>
          <ul class="reveal mt-8 divide-y divide-line border-y border-line">
            ${row(h.phoneLink, "phone", "Điện thoại", h.phoneDisplay)}
            ${row(h.emailLink, "email", "Email", h.emailDisplay)}
            ${row(h.facebookLink, "facebook", "Facebook", "Theo dõi Fanpage")}
            ${row(h.youtubeLink, "youtube", "YouTube", "Xem kênh")}
            ${c.address && !isPlaceholder(c.address) ? row(null, "location", "Khu vực", c.address) : ""}
            ${c.workingHours ? row(null, "clock", "Giờ làm việc", c.workingHours) : ""}
          </ul>
        </div>

        <!-- Form báo giá (mở ứng dụng email, không cần máy chủ) — thu gọn để mục Liên hệ ngắn -->
        <details class="disclosure disclosure--card reveal self-start lg:mt-[7.5rem]">
          <summary>
            <span>${esc(form.toggleLabel || form.heading || "Gửi yêu cầu báo giá")}</span>
            ${icon("plus", "disclosure-icon w-5 h-5")}
          </summary>
          <form id="contact-form" data-email="${esc(h.emailRaw)}" class="disclosure-body" novalidate>
            <p class="font-heading text-xl font-semibold">${esc(form.heading || "")}</p>
            <p class="mt-1 text-fg-muted">${esc(form.note || "")}</p>
            <div class="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label for="cf-name" class="label">Họ và tên *</label>
                <input id="cf-name" name="name" type="text" autocomplete="name" required class="${field}" placeholder="Nguyễn Văn A">
              </div>
              <div>
                <label for="cf-phone" class="label">Số điện thoại *</label>
                <input id="cf-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required pattern="[0-9+ .]{9,15}" class="${field}" placeholder="0901 234 567">
              </div>
              <div>
                <label for="cf-type" class="label">Loại sự kiện</label>
                <select id="cf-type" name="eventType" class="${field}">${eventOptions}</select>
              </div>
              <div>
                <label for="cf-date" class="label">Ngày dự kiến</label>
                <input id="cf-date" name="date" type="date" class="${field}">
              </div>
              <div class="sm:col-span-2">
                <label for="cf-message" class="label">Nội dung</label>
                <textarea id="cf-message" name="message" rows="4" class="${field}" placeholder="Địa điểm, số lượng khách, mong muốn của bạn..."></textarea>
              </div>
            </div>
            <button type="submit" class="btn-glow mt-5 w-full sm:w-auto">${icon("send", "w-5 h-5")} ${esc(form.submitLabel || "Gửi yêu cầu")}</button>
            <p data-form-status role="status" class="mt-3 min-h-6 text-gold-soft"></p>
          </form>
        </details>
      </div>
    </section>`;
    },

    // ─── FOOTER ───────────────────────────────────────
    footerSection() {
      const f = config.footer || {};
      const brand = config.brand || {};
      return `<footer class="border-t border-line pt-10 pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:pb-10">
    <div class="${container} flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div class="flex items-center gap-3 min-w-0">
        <img src="${esc(brand.logo || "")}" alt="" class="w-9 h-9 flex-none" width="36" height="36" loading="lazy">
        <div class="min-w-0">
          <p class="font-heading text-lg font-semibold truncate">${esc(brand.name || "")}</p>
          <p class="text-fg-dim">${esc(f.madeWith || "")}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <a ${linkAttrs(h.facebookLink)} class="icon-btn" aria-label="Facebook">${icon("facebook", "w-5 h-5")}</a>
        <a ${linkAttrs(h.youtubeLink)} class="icon-btn" aria-label="YouTube">${icon("youtube", "w-5 h-5")}</a>
        ${f.backToTop ? `<a href="#hero" class="icon-btn" aria-label="Lên đầu trang">${icon("arrowUp", "w-5 h-5")}</a>` : ""}
      </div>
    </div>
    <p class="${container} mt-6 text-sm text-fg-dim">${esc(f.copyright || "")}</p>
  </footer>`;
    },

    // ─── NÚT LIÊN HỆ NỔI (PHÁT SÁNG) ─────────────────
    floatingButton() {
      const fb = config.floatingButton || {};
      if (fb.enabled === false) return "";
      return `<div id="floating-contact" class="floating fixed right-4 z-40 flex flex-col gap-3 bottom-[calc(1rem+env(safe-area-inset-bottom))] md:right-6 md:bottom-6">
    ${fb.showPhone ? `<a ${linkAttrs(h.phoneLink)} class="neon-btn" aria-label="${esc(fb.phoneLabel || "Gọi điện")}">${icon("phone", "w-6 h-6")}</a>` : ""}
    <a ${linkAttrs(h.floatingLink)} class="neon-btn" aria-label="${esc(fb.label || "Chat Zalo")}">${icon("zalo", "w-7 h-7")}</a>
  </div>`;
    },

    // ─── HỘP THOẠI: VIDEO + LIGHTBOX (dùng <dialog> gốc) ─
    overlays() {
      return `<dialog id="video-modal" class="modal" aria-label="Trình phát video">
    <div class="modal-inner">
      <button type="button" class="icon-btn modal-close" data-close aria-label="Đóng video">${icon("close", "w-6 h-6")}</button>
      <div data-player class="aspect-video w-full overflow-hidden rounded-xl bg-black"></div>
    </div>
  </dialog>

  <dialog id="lightbox" class="modal" aria-label="Xem ảnh">
    <div class="modal-inner h-full flex flex-col justify-center">
      <button type="button" class="icon-btn modal-close" data-close aria-label="Đóng">${icon("close", "w-6 h-6")}</button>
      <figure class="relative flex-1 min-h-0 flex flex-col items-center justify-center" data-swipe>
        <img alt="" class="max-w-full max-h-[78svh] object-contain rounded-lg" data-lightbox-img>
        <figcaption class="mt-3 text-center text-fg-muted"><span data-lightbox-caption></span> <span class="text-fg-dim tabular-nums" data-lightbox-count></span></figcaption>
      </figure>
      <div class="mt-3 flex justify-center gap-3">
        <button type="button" class="icon-btn" data-prev aria-label="Ảnh trước">${icon("arrowLeft", "w-6 h-6")}</button>
        <button type="button" class="icon-btn" data-next aria-label="Ảnh sau">${icon("arrowRight", "w-6 h-6")}</button>
      </div>
    </div>
  </dialog>`;
    },
  };
}

// ─── RENDER PAGE ────────────────────────────────────────

/**
 * Ghép template + config → HTML hoàn chỉnh
 * @param {string} template — Nội dung index.html (file khung)
 * @param {object} config — SITE_CONFIG
 * @returns {{ html: string, missing: string[] }}
 */
export function renderPage(template, config) {
  const renderers = createRenderers(config);
  const missing = [];

  // Xóa comment hướng dẫn ở đầu file
  let html = template.replace(/<!--\s*ĐÂY LÀ FILE KHUNG[\s\S]*?-->\s*\n?/, "");

  // 1) Thay thế renderer blocks: {{{ @tenRenderer }}}
  html = html.replace(/\{\{\{\s*@(\w+)\s*\}\}\}/g, (match, name) => {
    if (typeof renderers[name] === "function") {
      return renderers[name]();
    }
    missing.push(`@${name}`);
    return "";
  });

  // 2) Thay thế giá trị: {{ duong.dan }}
  html = html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, path) => {
    const val = path.split(".").reduce((obj, key) => (obj == null ? undefined : obj[key]), config);
    if (val === undefined || val === null || typeof val === "object") {
      missing.push(path);
      return "";
    }
    return esc(String(val));
  });

  return { html, missing };
}
