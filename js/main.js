/* =====================================================================
   DRISHYAM — Behaviour (renders content.js, animations, interactions)
   ===================================================================== */
(function () {
  "use strict";
  const C = window.DRISHYAM;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const get = (path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), C);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const isBengali = (s) => /[ঀ-৿]/.test(s);
  const GLYPHS = ["দৃ", "নৃ", "ছ", "রং", "তাল", "ভাব"];

  /* ---------- Media loader with graceful placeholder ---------- */
  function setMedia(el, src, target, i = 0) {
    target = target || el;
    el.dataset.glyph = el.dataset.glyph || GLYPHS[i % GLYPHS.length];
    const empty = () => {
      el.classList.add("is-empty");
      if (C.showImageHints) el.classList.add("show-hint");
    };
    if (!src) return empty();
    const img = new Image();
    img.onload = () => {
      target.style.backgroundImage = `url("${src}")`;
      el.classList.add("has-img");
      el.dataset.full = src;
    };
    img.onerror = empty;
    img.src = src;
  }

  /* ---------- Bind simple text ---------- */
  $$("[data-text]").forEach((el) => (el.textContent = get(el.dataset.text) || ""));
  $$("[data-html]").forEach((el) => (el.innerHTML = get(el.dataset.html) || ""));
  $$("[data-paras]").forEach((el) => (el.innerHTML = (get(el.dataset.paras) || []).map((p) => `<p>${esc(p)}</p>`).join("")));
  $$("[data-list]").forEach((el) => (el.innerHTML = (get(el.dataset.list) || []).map((p) => `<li>${esc(p)}</li>`).join("")));
  $$("[data-link]").forEach((el) => (el.href = C.brand[el.dataset.link]));
  $("#year").textContent = new Date().getFullYear();

  // Hero letters
  const letters = $("[data-split]");
  letters.innerHTML = [...C.hero.title].map((ch, i) => `<span class="ch" style="--i:${i}" aria-hidden="true">${esc(ch)}</span>`).join("");

  /* ---------- Founders ---------- */
  $("#foundersGrid").innerHTML = C.founders.people.map((f, i) => `
    <article class="founder">
      <div class="founder__frame">
        <figure class="founder__portrait media reveal-img" data-i="${i}" data-label="${esc(f.image || "Portrait 4:5")}">
          <figcaption class="director__cap">${esc(f.role)}</figcaption>
        </figure>
      </div>
      <div class="founder__text reveal" style="--d:${i * 0.12}s">
        <span class="founder__no">0${i + 1}</span>
        <h3 class="founder__name">${esc(f.name)}</h3>
        <p class="founder__role">${esc(f.role)}</p>
        <p class="founder__bio">${esc(f.bio)}</p>
        ${f.instagram ? `<a class="founder__ig" href="${esc(f.instagram)}" target="_blank" rel="noopener">@${esc(f.instagram.replace(/\/$/, "").split("/").pop())} ↗</a>` : ""}
        ${f.quote ? `<blockquote class="director__quote">${esc(f.quote)}</blockquote>` : ""}
      </div>
    </article>`).join("");
  $$(".founder__portrait").forEach((el) => setMedia(el, C.founders.people[+el.dataset.i].image, el, 3 + +el.dataset.i));
  if (C.founders.bioPending) $(".director__pending").hidden = false;

  /* ---------- Classes ---------- */
  $("#classesList").innerHTML = C.classes.items.map((c, i) => {
    const confirmed = !C.classes.allProposed && c.confirmed;
    return `<li class="class reveal" style="--d:${i * 0.06}s">
      <span class="class__no">${esc(c.no)}</span>
      <h3 class="class__title">${esc(c.title)}<span class="class__bn">${esc(c.bn || "")}</span></h3>
      <p class="class__text">${esc(c.text)}</p>
      <div class="class__side">
        <span class="tag ${confirmed ? "tag--confirmed" : "tag--proposed"}">${confirmed ? "Now Enrolling" : "Proposed"}</span>
        <a href="#contact" class="link-arrow" data-enquiry="Class Enquiry" data-class="${esc(c.title)}">Enquire <span>→</span></a>
      </div>
    </li>`;
  }).join("");

  /* ---------- Performances ---------- */
  const playIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
  const arrowIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 17L17 7M9 7h8v8"/></svg>`;
  $("#perfGrid").innerHTML = C.performances.map((p, i) => {
    const video = !!p.youtubeId;
    const href = video ? `https://www.youtube.com/watch?v=${encodeURIComponent(p.youtubeId)}` : (p.link || C.brand.youtube);
    return `<a class="perf reveal" style="--d:${(i % 2) * 0.12}s" href="${esc(href)}" target="_blank" rel="noopener" ${video ? `data-yt="${esc(p.youtubeId)}"` : ""} aria-label="${esc(p.title)}: ${video ? "play video" : "watch on YouTube"}">
      <div class="perf__media media" data-i="${i}" data-label="${esc(p.image || "")}"><div class="zoom"></div>
        <span class="perf__play" aria-hidden="true">${video ? playIcon : arrowIcon}</span>
      </div>
      <div class="perf__body">
        <span class="perf__type">${esc(p.type)}</span>
        <h3 class="perf__title ${isBengali(p.title) ? "is-bn" : ""}">${esc(p.title)}</h3>
        <span class="perf__latin ${isBengali(p.latin) ? "bn" : ""}">${esc(p.latin || "")}</span>
        <p class="perf__text">${esc(p.text)}</p>
      </div>
    </a>`;
  }).join("");
  $$(".perf__media").forEach((el) => {
    const p = C.performances[+el.dataset.i];
    const thumb = p.image || (p.youtubeId ? `https://i.ytimg.com/vi/${encodeURIComponent(p.youtubeId)}/maxresdefault.jpg` : "");
    setMedia(el, thumb, $(".zoom", el), +el.dataset.i + 1);
  });

  /* ---------- Gallery ---------- */
  $("#galleryGrid").innerHTML = C.gallery.map((g, i) => `
    <button type="button" class="g-item media reveal ${esc(g.size || "")}" style="--d:${(i % 4) * 0.08}s" data-i="${i}" data-label="${esc(g.src)}" aria-label="View ${esc(g.caption || "photo")}">
      <div class="zoom"></div><span class="g-item__cap">${esc(g.caption || "")}</span>
    </button>`).join("");
  $$(".g-item").forEach((el) => setMedia(el, C.gallery[+el.dataset.i].src, $(".zoom", el), +el.dataset.i));

  /* ---------- Section images ---------- */
  $$("[data-img]").forEach((el, i) => setMedia(el, C.images[el.dataset.img], el, i));

  /* ---------- Contact channels ---------- */
  const b = C.brand;
  const channels = [
    b.whatsapp && { k: "WhatsApp", v: b.phone || `+${b.whatsapp}`, href: `https://wa.me/${b.whatsapp}` },
    { k: "Instagram", v: b.handle, href: b.instagram },
    { k: "YouTube", v: "Drishyam Dance Troupe", href: b.youtube },
    b.email && { k: "Email", v: b.email, href: `mailto:${b.email}` },
    b.phone && { k: "Phone", v: b.phone, href: `tel:${b.phone.replace(/\s/g, "")}` },
    b.location && { k: "Address", v: b.location, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.location)}` }
  ].filter(Boolean);
  $("#channels").innerHTML = channels.map((c) => c.href
    ? `<li><a href="${esc(c.href)}" ${c.href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}><span><small>${esc(c.k)}</small><strong>${esc(c.v)}</strong></span><span>↗</span></a></li>`
    : `<li><div class="ch-static"><span><small>${esc(c.k)}</small><strong>${esc(c.v)}</strong></span></div></li>`).join("");

  /* ---------- Preloader / entrance ---------- */
  let loadedOnce = false;
  const markLoaded = () => { if (!loadedOnce) { loadedOnce = true; document.body.classList.add("loaded"); } };
  window.addEventListener("load", () => setTimeout(markLoaded, 900));
  setTimeout(markLoaded, 2600); // safety net if fonts/images are slow

  /* ---------- Nav ---------- */
  const nav = $("#nav");
  const toggle = $(".nav__toggle");
  const menu = $("#menu");
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 40);
    nav.classList.toggle("hidden", y > lastY && y > 600 && !menu.classList.contains("open"));
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const setMenu = (open) => {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("locked", open);
    if (open) nav.classList.remove("hidden");
  };
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  window.addEventListener("resize", () => { if (window.innerWidth > 960) setMenu(false); });

  // Active link
  const links = $$(".nav__links a");
  const sectionIds = ["home", "about", "classes", "performances", "gallery", "contact"];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      let id = e.target.id === "director" ? "about" : e.target.id === "join" ? "gallery" : e.target.id;
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  [...sectionIds, "director", "join"].forEach((id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

  /* ---------- Scroll reveal ---------- */
  // Clip-path-hidden images can't be observed directly (they never "intersect"),
  // so .reveal-img elements are triggered via their parent.
  const proxies = new Map();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      (proxies.get(e.target) || [e.target]).forEach((el) => el.classList.add("in"));
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  $$(".reveal").forEach((el) => io.observe(el));
  $$(".reveal-img").forEach((el) => {
    const parent = el.parentElement;
    if (!proxies.has(parent)) { proxies.set(parent, []); io.observe(parent); }
    proxies.get(parent).push(el);
  });

  /* ---------- Parallax ---------- */
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const joinMedia = $(".join__media");
  const joinSec = $("#join");
  const heroInner = $(".hero__inner");
  if (!reduce) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        const y = window.scrollY;
        if (y < vh) {
          heroInner.style.transform = `translateY(${y * 0.18}px)`;
          heroInner.style.opacity = String(Math.max(0, 1 - y / (vh * 0.85)));
        }
        const r = joinSec.getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh) {
          const p = (r.top + r.height / 2 - vh / 2) / vh;
          joinMedia.style.transform = `translateY(${p * -60}px)`;
        }
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- In-page links (also works inside iframes/srcdoc, e.g. Streamlit) ---------- */
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = document.getElementById(a.getAttribute("href").slice(1));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  });

  /* ---------- Enquiry presets ---------- */
  const form = $("#enquiryForm");
  const topic = $("#topicSelect");
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-enquiry]");
    if (!t) return;
    topic.value = t.dataset.enquiry;
    if (t.dataset.class) form.message.value = `Hello Drishyam, I'd like to register interest in "${t.dataset.class}" classes when they're announced.`;
  });

  /* ---------- Enquiry form ---------- */
  const status = $(".form__status");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let ok = true;
    ["name", "reply", "message"].forEach((n) => {
      const f = form[n];
      const bad = !f.value.trim();
      f.closest(".field").classList.toggle("invalid", bad);
      if (bad) ok = false;
    });
    if (!ok) { status.textContent = "Please complete the highlighted fields."; return; }

    const body = `Enquiry: ${topic.value}\nName: ${form.name.value.trim()}\nReply to: ${form.reply.value.trim()}\n\n${form.message.value.trim()}`;
    if (b.whatsapp) {
      const url = `https://wa.me/${b.whatsapp}?text=${encodeURIComponent("Hello Drishyam!\n\n" + body)}`;
      const win = window.open(url, "_blank"); // "noopener" would make this always return null
      if (win) win.opener = null;
      status.innerHTML = win ? "Opening WhatsApp…" : `<a href="${esc(url)}" target="_blank" rel="noopener">Tap here to send on WhatsApp ↗</a>`;
      return;
    }
    if (b.email) {
      window.location.href = `mailto:${b.email}?subject=${encodeURIComponent("Drishyam enquiry: " + topic.value)}&body=${encodeURIComponent(body)}`;
      status.textContent = "Opening your email app…";
      return;
    }
    // No verified email yet → copy message and point to Instagram DMs
    let copied = false;
    try { await navigator.clipboard.writeText(body); copied = true; } catch (_) { /* clipboard unavailable */ }
    const dm = `https://ig.me/m/${b.handle.replace("@", "")}`;
    status.innerHTML = `${copied ? "Your message is copied. " : ""}<a href="${dm}" target="_blank" rel="noopener">Open Instagram and send it to ${esc(b.handle)} ↗</a>`;
  });
  $$("input, textarea", form).forEach((f) => f.addEventListener("input", () => f.closest(".field").classList.remove("invalid")));

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox");
  const stage = $(".lightbox__stage");
  let lastFocus = null;
  const openLB = (html) => {
    lastFocus = document.activeElement;
    stage.innerHTML = html;
    lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("locked");
    $(".lightbox__close").focus();
  };
  const closeLB = () => {
    lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked");
    setTimeout(() => (stage.innerHTML = ""), 400);
    if (lastFocus) lastFocus.focus();
  };
  $(".lightbox__close").addEventListener("click", closeLB);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLB(); });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (lb.classList.contains("open")) closeLB();
    else if (menu.classList.contains("open")) setMenu(false);
  });
  $("#galleryGrid").addEventListener("click", (e) => {
    const g = e.target.closest(".g-item");
    if (!g || !g.dataset.full) return;
    openLB(`<img src="${esc(g.dataset.full)}" alt="${esc(C.gallery[+g.dataset.i].caption || "Drishyam gallery photo")}">`);
  });
  $("#perfGrid").addEventListener("click", (e) => {
    const p = e.target.closest("[data-yt]");
    if (!p) return;
    e.preventDefault();
    openLB(`<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(p.dataset.yt)}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="Performance video"></iframe>`);
  });
})();
