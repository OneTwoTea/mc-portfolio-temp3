# MC Portfolio — Website MC sự kiện (giao diện Spotlight)

Website một trang cho MC sự kiện: HTML + Tailwind CSS v4 + JavaScript thuần, không framework, không bundler.
Toàn bộ nội dung nằm trong **một file duy nhất: `site.config.js`**.

Giao diện "Spotlight": nền "nhung sân khấu" đen ánh lục bảo, phối 3 quầng màu loang (lục bảo · xanh dầu · đồng hổ phách), điểm nhấn vàng champagne, **thiết kế cho điện thoại trước** (390px).
Màn hình đầu tối mờ với dòng chữ "Sẵn sàng tỏa sáng...", sau đó luồng sáng bám theo ngón tay / con trỏ chuột soi rõ ảnh chân dung, tên MC và nút "Đặt lịch".

## Cài đặt

Yêu cầu **Node.js >= 20**.

```bash
npm install
```

## Các lệnh

| Lệnh | Tác dụng |
|---|---|
| `npm run dev` | Build (không minify), mở server tại http://localhost:5173 và tự build lại khi sửa `index.html`, `site.config.js`, `src/`, `public/` |
| `npm run build` | Build bản chính thức (CSS minify) vào `dist/` |
| `npm run preview` | Chỉ phục vụ `dist/` đang có, không build |
| `node scripts/build.mjs --html-only` | Chỉ ghép HTML, bỏ qua CSS (nhanh) |

> Trên Windows PowerShell nếu gặp lỗi "running scripts is disabled", dùng `npm.cmd run dev`.

- **Xem thử trên điện thoại thật:** khi chạy `npm run dev`, terminal in thêm dòng `Mạng LAN (điện thoại): http://192.168.x.x:5173/`. Mở địa chỉ đó trên điện thoại dùng **cùng Wi-Fi** với máy tính (nếu không vào được, cho phép Node.js qua Windows Firewall).
- Đổi cổng: `PORT=3000 npm run dev` (PowerShell: `$env:PORT=3000; npm run dev`).
- Giả lập GitHub Pages dạng project: `npm run dev -- --base=/mc-portfolio/` rồi mở http://localhost:5173/mc-portfolio/.

Sau mỗi lần build, terminal sẽ báo:
- **Cảnh báo vàng**: file ảnh/video được khai báo nhưng chưa có trong `public/`, và các placeholder `[IN_HOA]` chưa thay.
- **Lỗi đỏ**: template dùng key không có trong config (lệnh build trả mã lỗi 1).

## Sửa nội dung

1. Mở `site.config.js` và sửa chữ, link, danh sách dịch vụ/video/ảnh… Mỗi mục có comment hướng dẫn và kích thước ảnh (mobile ghi trước, desktop sau).
2. Thêm/bớt dịch vụ, video, ảnh gallery, đối tác, cảm nhận, câu hỏi bằng cách thêm/xóa object trong mảng `items`.
3. Đường dẫn ảnh viết dạng `public/images/...` (không có dấu `/` ở đầu).
4. Không sửa tay thư mục `dist/`, vì nó bị xóa và tạo lại mỗi lần build.

Link còn là placeholder (`[ZALO_LINK]`, `[SO_DIEN_THOAI]`…) sẽ tự trỏ về mục Liên hệ, nên không bao giờ thành link hỏng.
Ảnh chưa có sẽ tự hiện khung nền họa tiết cùng tỉ lệ, bố cục không bị vỡ. Khi đã có ảnh, khung này tự ẩn và ảnh hiển thị đúng màu gốc. Chỉ có 2 lớp làm tối trung tính (không pha màu) để đọc chữ: mép trên/dưới ảnh hero và đáy video showreel.

### Chỉnh số mục hiển thị trên điện thoại

Trên điện thoại, mỗi danh sách chỉ hiện vài mục đầu, phần còn lại nằm sau nút **"Xem thêm (N)"** (bấm lần nữa là **"Thu gọn"** và trang cuộn về đầu mục).
Nội dung bị thu gọn vẫn nằm sẵn trong HTML (tốt cho SEO). Nếu trình duyệt tắt JavaScript, trang hiện đầy đủ.

| Key trong `site.config.js` | Mặc định | Ghi chú |
|---|---|---|
| `services.mobileVisible` | `3` | Từ màn hình ≥ 1024px hiện đủ tất cả |
| `videos.mobileVisible` | `2` | Video nhỏ dưới showreel; ≥ 1024px hiện đủ |
| `gallery.mobileVisible` | `6` | Gallery thu gọn ở **mọi** kích thước (lưới 6 ảnh + "Xem thêm ảnh") |
| `testimonials.sliderLimit` | `3` | Slider chỉ lấy N cảm nhận đầu (nên 2–3) |

Câu chuyện ở mục Giới thiệu, câu hỏi FAQ và form báo giá dùng thẻ `<details>` gốc của HTML (mở/đóng không cần JavaScript).

### Các key mới của giao diện Spotlight

| Key | Ý nghĩa |
|---|---|
| `hero.revealTeaser` | Dòng chữ mỏng giữa màn hình lúc mới mở trang ("Sẵn sàng tỏa sáng...") |
| `hero.revealHint.touch` / `.mouse` | Gợi ý nhỏ ở đáy hero cho điện thoại / máy tính |
| `hero.imagePosition.mobile` / `.desktop` | Điểm lấy nét ảnh hero (CSS `object-position`), VD `"48% 25%"`: đặt vào khuôn mặt |
| `about.summary` | Tóm tắt 2–3 câu, luôn hiển thị |
| `about.storyToggleLabel` | Chữ trên nút mở câu chuyện đầy đủ (`about.story`) |
| `services.mobileVisible`, `videos.mobileVisible`, `gallery.mobileVisible` | Số mục hiện sẵn trên điện thoại (xem bảng trên) |
| `gallery.moreLabel` | Chữ trên nút xem thêm ảnh |
| `videos.featured.previewClip` | Clip ngắn tự phát không tiếng ở showreel (để `""` nếu chưa có) |
| `partners.marqueeSeconds` | Tốc độ dải logo chạy ngang (giây/vòng, lớn hơn = chậm hơn) |
| `partners.monochrome` | `true` = logo chuyển về trắng đơn sắc cho đồng bộ; `false` = giữ màu gốc của logo |
| `testimonials.sliderLimit` | Số cảm nhận trong slider |
| `faq` | Mục Câu hỏi thường gặp: `sectionLabel`, `heading`, `items: [{ question, answer }]` |
| `contact.form.toggleLabel` | Chữ trên khối thu gọn chứa form báo giá |
| `floatingButton.showPhone`, `.phoneLabel` | Thêm nút gọi điện phát sáng cạnh nút Zalo nổi |

Màu sắc và font khai báo **một lần** trong `@theme` ở đầu `src/input.css` (`--color-ink`, `--color-emerald`, `--color-petrol`, `--color-copper`, `--color-gold`, `--font-heading`…). Lớp nền loang nằm ở `body::before`; dải màu từng section là các class `band-emerald`, `band-petrol`, `band-copper`.

## Placeholder cần thay (trong `site.config.js`)

| Placeholder | Ý nghĩa / ví dụ |
|---|---|
| `[TEN_MC]` | Tên MC / thương hiệu (hiện cỡ lớn ở hero) |
| `[SO_NAM_KINH_NGHIEM]`, `[SO_SU_KIEN]` | Số liệu, VD `8`, `500` |
| `[THANH_PHO]` | Thành phố hoạt động chính (trong FAQ), VD `TP.HCM` |
| `[SO_DIEN_THOAI]` | `0901 234 567` (tự tạo link `tel:`) |
| `[ZALO_LINK]` | `https://zalo.me/0901234567` |
| `[EMAIL]` | Email nhận yêu cầu báo giá từ form |
| `[FACEBOOK_LINK]`, `[YOUTUBE_LINK]` | Link trang cá nhân |
| `[YOUTUBE_SHOWREEL_URL]`, `[YOUTUBE_VIDEO_01..04]` | Link YouTube hoặc `public/videos/xxx.mp4` |
| `[WEBSITE_URL]` | URL website sau khi deploy (cần cho ảnh chia sẻ Facebook/Zalo) |
| `[DIA_CHI]` | Khu vực hoạt động (để placeholder thì dòng này không hiện) |

## Ảnh / video cần chuẩn bị

Ưu tiên `.webp`, tên kebab-case có số thứ tự. Kích thước ghi **mobile trước, desktop sau**:

| File | Mobile | Desktop |
|---|---|---|
| `public/images/hero/hero-m.webp` | 750×1334 (dọc 9:16) — **đã có** | — |
| `public/images/hero/hero-d.webp` | — | 1920×1080 (ngang) — **đã có** |
| `public/images/about/portrait-mobile.webp` | 400×500 (4:5) | — |
| `public/images/about/portrait.webp` | — | 600×800 (3:4) |
| `public/images/services/service-01..06.webp` | không hiển thị (thẻ chỉ có icon) | 600×400 (3:2) |
| `public/images/videos/showreel-thumb.webp` | dùng chung | 1280×720 |
| `public/videos/showreel-preview.mp4` | 720×900 (4:5) hoặc dùng chung | 1280×720, 5–15 giây, không tiếng, ≤ 3MB |
| `public/images/videos/video-01..04.webp` | dùng chung | 640×360 |
| `public/images/gallery/gallery-01..08.webp` | dùng chung (lưới cắt vuông) | 1200×900 (4:3) |
| `public/images/partners/partner-01..06.webp` | dùng chung | 200×80, nền trong suốt (trắng đơn sắc nếu `partners.monochrome: true`) |
| `public/images/testimonials/avatar-01..04.webp` | dùng chung | 100×100 |
| `public/images/og/og-cover.jpg` | — | 1200×630 (ảnh khi chia sẻ link) |

Ảnh gốc `hero.jpg`, `hero_minh.jpg` vẫn được giữ trong `public/images/hero/`; hai bản `.webp` nhẹ hơn khoảng 9 lần.

Icon (`public/icons/`) đã có sẵn: `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png`.

## Deploy lên GitHub Pages

1. Tạo repo (VD `mc-portfolio`) và push code lên nhánh `main`.
2. Trên GitHub: **Settings → Pages → Source: GitHub Actions**.
3. Mỗi lần push lên `main`, workflow `.github/workflows/deploy.yml` sẽ tự build và deploy (hoặc chạy tay trong tab **Actions**).

Trang dùng đường dẫn tương đối nên chạy được cả ở `https://ten.github.io/` lẫn `https://ten.github.io/mc-portfolio/`.
Có thể đưa thư mục `dist/` lên bất kỳ hosting tĩnh nào (Netlify, Vercel, Cloudflare Pages…).

## Cấu trúc thư mục

```
├── site.config.js        # NỘI DUNG website (sửa ở đây)
├── index.html            # Khung HTML (template)
├── src/
│   ├── templates.js      # Bộ render: config → HTML
│   ├── input.css         # CSS nguồn Tailwind v4 (màu, font trong @theme)
│   └── js/main.js        # JS phía trình duyệt (spotlight, menu, thu gọn, lightbox, slider, video, form)
├── public/               # icons/, images/<khu-vuc>/, videos/
├── scripts/
│   ├── build.mjs         # Build → dist/
│   └── dev.mjs           # Server phát triển (in cả địa chỉ IP mạng LAN)
└── .github/workflows/deploy.yml
```
