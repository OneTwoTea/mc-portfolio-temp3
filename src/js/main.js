/**
 * ═══════════════════════════════════════════════════════════
 *  MAIN.JS — JavaScript phía trình duyệt (thuần, không thư viện)
 *  Spotlight hero · header · menu mobile · thu gọn "Xem thêm" ·
 *  viền sáng thẻ dịch vụ · video (tự phát clip ngắn + hộp thoại) ·
 *  lightbox có vuốt · slider cảm nhận · nút nổi · form báo giá
 * ═══════════════════════════════════════════════════════════
 */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hasIO = "IntersectionObserver" in window;

  // ─── 1. SPOTLIGHT HERO ────────────────────────────────
  // Luồng sáng bám theo ngón tay / chuột. Chỉ cập nhật 3 biến CSS trong requestAnimationFrame,
  // vòng lặp tự dừng khi đã tới đích hoặc hero ra khỏi màn hình → không tốn pin, không giật.
  function initSpotlight() {
    const hero = $("[data-spotlight]");
    if (!hero) return;

    const hint = $(".hero-hint", hero);
    if (hint) hint.textContent = (finePointer ? hint.dataset.hintMouse : hint.dataset.hintTouch) || "";

    let w = hero.clientWidth;
    let h = hero.clientHeight;
    const radius = () => Math.max(160, Math.min(360, Math.min(w, h) * 0.62));
    const rest = () => ({ x: w * 0.5, y: h * 0.58 });

    const cur = { x: w * 0.18, y: h * 0.78, r: 0 };
    const target = { ...cur };
    let ease = 0.06; // chậm, điện ảnh khi tự chạy; nhanh hơn khi người dùng điều khiển
    let raf = 0;
    let inView = true;
    let interacted = false;
    const timers = [];

    function apply() {
      hero.style.setProperty("--x", `${cur.x.toFixed(1)}px`);
      hero.style.setProperty("--y", `${cur.y.toFixed(1)}px`);
      hero.style.setProperty("--r", `${cur.r.toFixed(1)}px`);
    }

    function tick() {
      raf = 0;
      cur.x += (target.x - cur.x) * ease;
      cur.y += (target.y - cur.y) * ease;
      cur.r += (target.r - cur.r) * ease;
      apply();
      const moving = Math.abs(target.x - cur.x) > 0.4 || Math.abs(target.y - cur.y) > 0.4 || Math.abs(target.r - cur.r) > 0.4;
      if (moving && inView) raf = requestAnimationFrame(tick);
    }

    function kick() {
      if (reduceMotion) {
        Object.assign(cur, target);
        apply();
        return;
      }
      if (!raf && inView) raf = requestAnimationFrame(tick);
    }

    function light() {
      hero.classList.add("is-lit");
      target.r = radius();
    }

    function moveTo(clientX, clientY) {
      const rect = hero.getBoundingClientRect();
      if (!interacted) {
        interacted = true;
        timers.forEach(clearTimeout);
        ease = 0.18;
        light();
      }
      target.x = clientX - rect.left;
      target.y = clientY - rect.top;
      kick();
    }

    // Chuột (PC)
    hero.addEventListener("pointermove", (e) => {
      if (e.pointerType === "mouse") moveTo(e.clientX, e.clientY);
    });
    // Ngón tay (mobile) — passive để không chặn cuộn trang
    const onTouch = (e) => {
      const t = e.touches[0];
      if (t) moveTo(t.clientX, t.clientY);
    };
    hero.addEventListener("touchstart", onTouch, { passive: true });
    hero.addEventListener("touchmove", onTouch, { passive: true });

    addEventListener(
      "resize",
      () => {
        w = hero.clientWidth;
        h = hero.clientHeight;
        if (hero.classList.contains("is-lit")) target.r = radius();
        if (!interacted) Object.assign(target, rest());
        kick();
      },
      { passive: true }
    );

    if (hasIO) {
      new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        if (inView) kick();
      }).observe(hero);
    }

    // Màn mở đầu: tối → luồng sáng quét lên khuôn mặt → dừng giữa ảnh và tên MC
    if (reduceMotion) {
      Object.assign(target, rest());
      light();
      kick();
    } else {
      apply();
      timers.push(
        setTimeout(() => {
          light();
          Object.assign(target, { x: w * 0.5, y: h * 0.32 });
          kick();
        }, 900),
        setTimeout(() => {
          Object.assign(target, rest());
          kick();
        }, 2600)
      );
    }
  }

  // ─── 2. HEADER (trong suốt → nền tối khi cuộn) ─────────
  function initHeader() {
    const header = $("#site-header");
    if (!header) return;
    let ticking = false;
    const update = () => {
      header.classList.toggle("is-scrolled", scrollY > 24);
      ticking = false;
    };
    addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  }

  // ─── 3. MENU MOBILE ──────────────────────────────────
  function initMenu() {
    const toggle = $("#menu-toggle");
    const menu = $("#mobile-menu");
    if (!toggle || !menu) return;
    const root = document.documentElement;
    let isOpen = false;
    let hideTimer = 0;

    function open() {
      isOpen = true;
      clearTimeout(hideTimer);
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add("is-open"));
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Đóng menu");
      root.classList.add("menu-open");
      root.style.overflow = "hidden"; // khóa cuộn trang
      const first = $("a", menu);
      if (first) first.focus({ preventScroll: true });
    }

    function close(returnFocus = true) {
      if (!isOpen) return;
      isOpen = false;
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Mở menu");
      root.classList.remove("menu-open");
      root.style.overflow = "";
      hideTimer = setTimeout(() => (menu.hidden = true), reduceMotion ? 0 : 260);
      if (returnFocus) toggle.focus({ preventScroll: true });
    }

    toggle.addEventListener("click", () => (isOpen ? close() : open()));
    // Bấm ra ngoài (nền mờ) hoặc chọn một mục → đóng
    menu.addEventListener("click", (e) => {
      if (e.target.closest("[data-menu-close]")) close();
      else if (e.target.closest("a")) close(false);
    });
    document.addEventListener("keydown", (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") close();
      // Giữ focus trong menu (nút đóng + các link)
      if (e.key === "Tab") {
        const items = [toggle, ...$$("a", menu)];
        const i = items.indexOf(document.activeElement);
        const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i + 1) % items.length;
        e.preventDefault();
        items[next].focus();
      }
    });
    matchMedia("(min-width: 1280px)").addEventListener("change", (e) => e.matches && close(false));
  }

  // ─── 4. HIỆN DẦN KHI CUỘN ─────────────────────────────
  function initReveal() {
    const els = $$(".reveal");
    if (!hasIO || reduceMotion) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
  }

  // ─── 5. THU GỌN / "XEM THÊM (N)" ─────────────────────
  function initCollapse() {
    $$("[data-more]").forEach((btn) => {
      const list = document.getElementById(btn.getAttribute("aria-controls"));
      if (!list) return;
      const label = $("[data-more-label]", btn);
      btn.hidden = false;
      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") !== "true";
        list.classList.toggle("is-open", open);
        btn.setAttribute("aria-expanded", String(open));
        label.textContent = open ? btn.dataset.labelLess : btn.dataset.labelMore;
        if (open) {
          $$("[data-extra]", list).forEach((el) => {
            el.classList.add("is-visible");
            $$(".reveal", el).forEach((r) => r.classList.add("is-visible"));
          });
        } else {
          // Thu lại → cuộn về đầu section
          const section = list.closest("section") || list;
          section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        }
      });
    });
  }

  // ─── 6. VIỀN SÁNG THẺ DỊCH VỤ ─────────────────────────
  function initGlowCards() {
    const cards = $$(".glow-card");
    if (!cards.length) return;
    if (finePointer) {
      // PC: vệt sáng ở viền chạy theo con trỏ
      cards.forEach((card) =>
        card.addEventListener("pointermove", (e) => {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
        })
      );
    } else if (hasIO) {
      // Điện thoại: thẻ đang nằm giữa màn hình khi lướt qua sẽ sáng viền
      const io = new IntersectionObserver(
        (entries) => entries.forEach((en) => en.target.classList.toggle("is-lit", en.isIntersecting)),
        { rootMargin: "-42% 0px -42% 0px" }
      );
      cards.forEach((c) => io.observe(c));
    }
  }

  // ─── 7. VIDEO ─────────────────────────────────────────
  function initVideos() {
    // 7a. Clip showreel ngắn: chỉ tải khi cuộn tới, tự phát không tiếng, dừng khi cuộn qua
    const saveData = navigator.connection && navigator.connection.saveData;
    $$("video[data-autoplay]").forEach((video) => {
      if (reduceMotion || saveData || !hasIO) return;
      video.addEventListener("error", () => video.remove(), { once: true });
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (!video.src) video.src = video.dataset.src;
            video.play().catch(() => {});
          } else if (video.src) {
            video.pause();
          }
        },
        { threshold: 0.35 }
      ).observe(video);
    });

    // 7b. Hộp thoại phát video đầy đủ (chỉ tạo trình phát khi bấm)
    const modal = $("#video-modal");
    if (!modal || typeof modal.showModal !== "function") return;
    const player = $("[data-player]", modal);

    function build(url) {
      const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
      let el;
      if (yt) {
        el = document.createElement("iframe");
        el.src = `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0&playsinline=1`;
        el.title = "Trình phát video";
        el.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
        el.allowFullscreen = true;
      } else {
        el = document.createElement("video");
        el.src = url;
        el.controls = true;
        el.autoplay = true;
        el.playsInline = true;
      }
      el.style.cssText = "width:100%;height:100%;border:0";
      return el;
    }

    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-video], [data-video-missing]");
      if (!btn) return;
      player.replaceChildren();
      if (btn.hasAttribute("data-video")) {
        player.append(build(btn.dataset.video));
      } else {
        const msg = document.createElement("p");
        msg.className = "h-full grid place-items-center p-6 text-center text-fg-muted";
        msg.textContent = "Video đang được cập nhật — bạn quay lại sau nhé!";
        player.append(msg);
      }
      modal.showModal();
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.closest("[data-close]")) modal.close();
    });
    modal.addEventListener("close", () => player.replaceChildren());
  }

  // ─── 8. LIGHTBOX GALLERY (vuốt trái/phải) ────────────
  function initLightbox() {
    const box = $("#lightbox");
    const items = $$("[data-lightbox]");
    if (!box || !items.length || typeof box.showModal !== "function") return;
    const img = $("[data-lightbox-img]", box);
    const caption = $("[data-lightbox-caption]", box);
    const count = $("[data-lightbox-count]", box);
    let index = 0;

    function show(i) {
      index = (i + items.length) % items.length;
      const it = items[index];
      img.hidden = false;
      img.src = it.dataset.src;
      img.alt = it.dataset.alt || "";
      caption.textContent = it.dataset.caption || it.dataset.alt || "";
      count.textContent = `${index + 1} / ${items.length}`;
    }
    img.addEventListener("error", () => (img.hidden = true));

    items.forEach((it, i) =>
      it.addEventListener("click", () => {
        show(i);
        box.showModal();
      })
    );
    box.addEventListener("click", (e) => {
      if (e.target === box || e.target.closest("[data-close]")) box.close();
      else if (e.target.closest("[data-prev]")) show(index - 1);
      else if (e.target.closest("[data-next]")) show(index + 1);
    });
    box.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });

    let startX = 0;
    let startY = 0;
    const area = $("[data-swipe]", box);
    area.addEventListener("touchstart", (e) => ({ clientX: startX, clientY: startY } = e.touches[0]), { passive: true });
    area.addEventListener(
      "touchend",
      (e) => {
        const t = e.changedTouches[0];
        const dx = t.clientX - startX;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(t.clientY - startY)) show(index + (dx < 0 ? 1 : -1));
      },
      { passive: true }
    );
  }

  // ─── 9. SLIDER CẢM NHẬN (vuốt bằng scroll-snap gốc) ───
  function initSlider() {
    $$("[data-slider]").forEach((slider) => {
      const track = $(".slider-track", slider);
      const slides = $$(".slide", slider);
      const controls = $("[data-slider-controls]", slider);
      const dots = $$("[data-slide-to]", slider);
      if (!track || slides.length < 2 || !controls) return;
      controls.hidden = false;

      const step = () => slides[1].offsetLeft - slides[0].offsetLeft;
      const current = () => Math.round(track.scrollLeft / step());
      const go = (i) => {
        const idx = Math.max(0, Math.min(slides.length - 1, i));
        track.scrollTo({ left: slides[idx].offsetLeft - slides[0].offsetLeft, behavior: reduceMotion ? "auto" : "smooth" });
      };

      let ticking = false;
      track.addEventListener(
        "scroll",
        () => {
          if (ticking) return;
          ticking = true;
          requestAnimationFrame(() => {
            const i = Math.min(slides.length - 1, current());
            dots.forEach((d, n) => (n === i ? d.setAttribute("aria-current", "true") : d.removeAttribute("aria-current")));
            ticking = false;
          });
        },
        { passive: true }
      );
      dots.forEach((d) => d.addEventListener("click", () => go(+d.dataset.slideTo)));
      $("[data-slide-prev]", slider)?.addEventListener("click", () => go(current() - 1));
      $("[data-slide-next]", slider)?.addEventListener("click", () => go(current() + 1));
    });
  }

  // ─── 10. NÚT LIÊN HỆ NỔI: ẩn khi đang ở hero (hero đã có CTA) ─
  function initFloating() {
    const fab = $("#floating-contact");
    const hero = $("#hero");
    if (!fab || !hero || !hasIO) return;
    new IntersectionObserver(
      ([entry]) => {
        const hide = entry.intersectionRatio > 0.35;
        fab.classList.toggle("is-hidden", hide);
        fab.inert = hide;
      },
      { threshold: [0, 0.35, 0.6] }
    ).observe(hero);
  }

  // ─── 11. FORM BÁO GIÁ → MỞ ỨNG DỤNG EMAIL ─────────────
  function initForm() {
    const form = $("#contact-form");
    if (!form) return;
    const status = $("[data-form-status]", form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const invalid = $$("input, select, textarea", form).find((f) => !f.checkValidity());
      if (invalid) {
        status.textContent = "Vui lòng nhập đúng họ tên và số điện thoại.";
        invalid.focus();
        return;
      }
      const email = form.dataset.email;
      if (!email) {
        status.textContent = "Email chưa được cấu hình — vui lòng liên hệ qua Zalo hoặc điện thoại.";
        return;
      }
      const d = Object.fromEntries(new FormData(form));
      const body = [
        `Họ tên: ${d.name}`,
        `Điện thoại: ${d.phone}`,
        `Loại sự kiện: ${d.eventType || ""}`,
        `Ngày dự kiến: ${d.date || ""}`,
        "",
        d.message || "",
      ].join("\n");
      location.href = `mailto:${email}?subject=${encodeURIComponent(`Yêu cầu báo giá — ${d.eventType || "Sự kiện"}`)}&body=${encodeURIComponent(body)}`;
      status.textContent = "Đang mở ứng dụng email của bạn...";
    });
  }

  initSpotlight();
  initHeader();
  initMenu();
  initReveal();
  initCollapse();
  initGlowCards();
  initVideos();
  initLightbox();
  initSlider();
  initFloating();
  initForm();
})();
