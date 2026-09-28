/* 0866° — shared script. You shouldn't need to edit this file;
   settings live in data/config.js and beans in data/arrivals.js. */
(function () {
  const S = window.SITE || {};
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const page = document.body.dataset.page || "";

  /* ── helpers ─────────────────────────────────────────── */
  const $ = (s, r = document) => r.querySelector(s);
  const phoneNice = (S.phone || "").replace(/(\d{5})(\d{5})/, "$1 $2");
  const wa = (text) => `https://wa.me/${S.whatsapp}${text ? "?text=" + encodeURIComponent(text) : ""}`;
  window.O866 = { wa, phoneNice, reduce };
  const bits = {};

  /* ── shapes (shared by loader + cursor) ──────────────── */
  const SHAPES = {
    bean:     "M50 8 C76 8 88 30 86 54 C84 78 66 92 50 92 C30 92 14 74 14 50 C14 26 26 8 50 8 Z",
    diamond:  "M50 6 C50 6 94 50 94 50 C94 50 50 94 50 94 C50 94 6 50 6 50 C6 50 50 6 50 6 Z",
    crescent: "M22 28 C42 8 80 12 92 46 C76 30 52 30 42 44 C34 56 38 74 56 88 C28 86 8 56 22 28 Z",
    drop:     "M50 6 C50 6 84 46 84 64 C84 82 68 94 50 94 C32 94 16 82 16 64 C16 46 50 6 50 6 Z"
  };
  const SLIT = "M58 16 C40 36 62 62 42 86";

  /* ── header + footer ─────────────────────────────────── */
  const NAV = [
    ["index.html", "home", "home"],
    ["arrivals.html", "arrivals", "arrivals"],
    ["menu.html", "menu", "menu"],
    ["tap-pass.html", "tap pass", "tap-pass"],
    ["the-number.html", "the number", "the-number"],
    ["franchise.html", "franchise", "franchise"],
    ["visit.html", "visit", "visit"]
  ];
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="wrap">
      <a class="brand" href="index.html" aria-label="0866° home"><img src="assets/img/logo.png" alt="0866°" width="673" height="284"></a>
      <div class="header-right">
        <nav class="nav" id="nav" aria-label="main">
          ${NAV.map(([h, l, k]) => `<a href="${h}"${k === page ? ' aria-current="page"' : ""}>${l}</a>`).join("")}
        </nav>
        <span class="open-pill" id="openPill"><i></i><span></span></span>
        <button class="menu-toggle" aria-expanded="false" aria-controls="nav">menu</button>
      </div>
    </div>`;
  document.body.prepend(header);
  const toggle = $(".menu-toggle", header), nav = $(".nav", header);
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.textContent = open ? "close" : "menu";
  });

  const delivery = [S.swiggy && `<li><a href="${S.swiggy}" target="_blank" rel="noopener">swiggy</a></li>`,
                    S.zomato && `<li><a href="${S.zomato}" target="_blank" rel="noopener">zomato</a></li>`].filter(Boolean).join("");
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="wrap">
      <div class="foot-grid">
        <div class="foot-news pass">
          <div class="pass-main">
            <div class="pass-label">boarding pass · newsletter</div>
            <div class="pass-big">gate 0866</div>
            <div class="pass-row">
              <div><div class="pass-label">departs</div>every 15 days</div>
              <div><div class="pass-label">carrying</div>new arrivals, and life</div>
            </div>
            <form class="form" data-form="newsletter" data-thanks="you're on board." novalidate>
              <div class="field"><label for="nl-email">your email</label>
                <input id="nl-email" name="email" type="email" autocomplete="email" required></div>
              <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
              <div><button class="btn" type="submit">board</button></div>
              <p class="form-status" role="status"></p>
            </form>
          </div>
          <div class="pass-stub" aria-hidden="true">
            <div><div class="pass-label">seat</div><div class="pass-big" style="font-size:28px">any</div></div>
            <div class="barcode"></div>
          </div>
        </div>
        <div>
          <h3>find us</h3>
          <p>${(S.address || []).join("<br>")}<br><a href="${S.maps}" target="_blank" rel="noopener" class="textlink">open in maps</a></p>
          <p>${S.hours}</p>
        </div>
        <div>
          <h3>say hi</h3>
          <ul class="foot-list">
            <li><a href="tel:+91${S.phone}">${phoneNice}</a></li>
            <li><a href="${wa()}" target="_blank" rel="noopener">whatsapp</a></li>
            <li><a href="${S.instagram}" target="_blank" rel="noopener">instagram ${S.instagramHandle || ""}</a></li>
            <li><a href="mailto:${S.email}">${S.email}</a></li>
            ${delivery}
          </ul>
        </div>
      </div>
      <div class="foot-base">
        <span>zero eight double six. vijayawada.</span>
        <img src="assets/img/logo-cream.png" alt="" width="673" height="284">
      </div>
    </div>`;
  document.body.append(footer);

  /* open / closed, in vijayawada time */
  const pill = document.getElementById("openPill");
  const setOpen = () => {
    const now = new Date(Date.now() + (5.5 * 60 + new Date().getTimezoneOffset()) * 60000);
    const m = now.getHours() * 60 + now.getMinutes();
    const open = m >= 450 && m < 1320;
    pill.classList.toggle("open", open);
    pill.lastElementChild.textContent = open ? "open now" : "opens 7:30 am";
  };
  setOpen(); setInterval(setOpen, 60000);

  /* reveal on scroll */
  const io = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: .15 }) : null;
  const watch = () => document.querySelectorAll(".reveal:not(.in)").forEach((el) => io ? io.observe(el) : el.classList.add("in"));
  watch();
  window.O866.reveal = watch;

  /* ticker */
  window.O866.ticker = (el, items) => {
    const run = items.map((t) => `<span>${t}<b>◆</b></span>`).join("");
    el.innerHTML = `<div class="ticker-track" aria-hidden="true">${run}${run}${run}${run}</div>`;
    el.setAttribute("aria-label", items.join(", ").toLowerCase());
  };

  /* spinning badge */
  window.O866.badge = (text) => `
    <svg viewBox="0 0 200 200" aria-hidden="true"><defs><path id="bc" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0"/></defs>
    <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" stroke-width="1.2"/>
    <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" stroke-width="1"/>
    <text><textPath href="#bc" textLength="484" lengthAdjust="spacing">${text}</textPath></text></svg>`;

  /* little drawings for bean stamps */
  window.O866.art = {
    MICROLOT: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 40c10-2 14-12 24-12s14 8 24 6"/><path d="M20 30c4-6 10-8 16-6 6 2 8-4 14-4"/><circle cx="44" cy="14" r="5" fill="currentColor"/></svg>',
    FERMENTED: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="32" cy="36" r="20"/><path d="M32 16v40M12 36h40M18 22l28 28M46 22L18 50"/><path d="M32 16c2-6 8-9 14-8-2 6-8 9-14 8z" fill="currentColor"/></svg>',
    BLEND: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5"><ellipse cx="24" cy="32" rx="11" ry="16" transform="rotate(-20 24 32)"/><path d="M28 17c-6 8 2 18-6 30"/><ellipse cx="42" cy="32" rx="11" ry="16" transform="rotate(20 42 32)" fill="currentColor"/></svg>',
    MONSOONED: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 28a14 14 0 0 1 27-5 10 10 0 1 1 5 19H18a9 9 0 0 1-4-14z"/><path d="M22 48l-3 8M32 48l-3 8M42 48l-3 8"/></svg>'
  };

  /* ── loader (once per visit) ─────────────────────────── */
  let seen = false;
  try { seen = sessionStorage.getItem("0866-loaded") === "1"; } catch (e) {}
  if (!seen && !reduce) {
    const L = document.createElement("div");
    L.className = "loader";
    L.setAttribute("aria-hidden", "true");
    L.innerHTML = `<div><svg class="loader-shapes" viewBox="0 0 100 100"><path fill="currentColor" d="${SHAPES.bean}"/></svg><div class="loader-word">now boarding</div></div>`;
    document.body.append(L);
    const p = $("path", L);
    const order = ["diamond", "crescent", "drop", "bean"];
    let i = 0;
    const tick = setInterval(() => { p.setAttribute("d", SHAPES[order[i++ % order.length]]); }, 420);
    const finish = () => {
      clearInterval(tick);
      L.classList.add("done");
      setTimeout(() => L.remove(), 600);
      try { sessionStorage.setItem("0866-loaded", "1"); } catch (e) {}
    };
    window.addEventListener("load", () => setTimeout(finish, 1300));
    setTimeout(finish, 4000); // never block longer than this
  }

  /* ── cursor (mouse only) ─────────────────────────────── */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduce) {
    document.body.classList.add("has-cursor");
    const C = document.createElement("div");
    C.className = "cursor";
    C.setAttribute("aria-hidden", "true");
    C.innerHTML = `<svg viewBox="0 0 100 100"><path fill="currentColor" d="${SHAPES.bean}"/><path d="${SLIT}" fill="none" stroke="var(--paper)" stroke-width="7" stroke-linecap="round"/></svg>`;
    document.body.append(C);
    const [shape, slit] = C.querySelectorAll("path");
    let x = -100, y = -100, cx = x, cy = y;
    addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; });
    (function loop() { cx += (x - cx) * .28; cy += (y - cy) * .28; C.style.transform = `translate(${cx}px, ${cy}px)`; requestAnimationFrame(loop); })();
    document.addEventListener("mouseover", (e) => {
      const hit = e.target.closest("a, button, .clickable, label");
      C.classList.toggle("hover", !!hit);
      shape.setAttribute("d", hit ? SHAPES.diamond : SHAPES.bean);
      slit.style.opacity = hit ? 0 : 1;
    });
    document.addEventListener("mouseleave", () => { x = y = -100; });
  }

  /* ── split-flap board engine ─────────────────────────── */
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const rand = () => CHARS[(Math.random() * CHARS.length) | 0];

  function makeRow(lengths, classes = []) {
    const row = document.createElement("div");
    row.className = "board-row";
    const segs = lengths.map((n, i) => {
      const seg = document.createElement("div");
      seg.className = "seg " + (classes[i] || "");
      const tiles = [];
      for (let k = 0; k < n; k++) { const t = document.createElement("span"); t.className = "tile empty"; t.textContent = " "; seg.append(t); tiles.push(t); }
      row.append(seg);
      return tiles;
    });
    row._segs = segs;
    return row;
  }

  function setTile(t, ch) {
    t.textContent = ch === " " ? "\u00a0" : ch;
    t.classList.toggle("empty", ch === " ");
    t.classList.remove("flip"); void t.offsetWidth; t.classList.add("flip");
  }

  // flips every tile of a row to the target words
  function flipRow(row, words, opts = {}) {
    const spins = opts.spins ?? 6;
    const label = words.join(" ").trim();
    row.setAttribute("aria-label", label.toLowerCase());
    row._segs.forEach((tiles, si) => {
      const w = (words[si] || "").toUpperCase().padEnd(tiles.length, " ").slice(0, tiles.length);
      tiles.forEach((t, i) => {
        const target = w[i];
        if (reduce) { setTile(t, target); return; }
        if (target === " " && t.classList.contains("empty")) return;
        let n = target === " " ? 1 : spins + ((Math.random() * 4) | 0);
        const delay = (si * 3 + i) * 28;
        setTimeout(function step() {
          if (n-- > 0) { setTile(t, rand()); setTimeout(step, 55 + Math.random() * 40); }
          else setTile(t, target);
        }, delay);
      });
    });
  }

  // keeps a board alive: every few seconds one row re-flips to itself
  function keepAlive(board, rows, getWords, every = 4200) {
    if (reduce) return;
    let visible = true;
    if ("IntersectionObserver" in window) new IntersectionObserver((es) => { visible = es[0].isIntersecting; }).observe(board);
    setInterval(() => {
      if (!visible || document.hidden) return;
      const i = (Math.random() * rows.length) | 0;
      flipRow(rows[i], getWords(i), { spins: 3 });
    }, every);
  }

  window.O866.board = { makeRow, flipRow, keepAlive };

  /* ── forms → google sheet (or whatsapp fallback) ─────── */
  async function send(formName, data) {
    if (!S.sheetUrl) return false;
    const body = new URLSearchParams({ form: formName, page, ...data });
    await fetch(S.sheetUrl, { method: "POST", mode: "no-cors", body });
    return true;
  }
  window.O866.send = send;

  document.addEventListener("submit", async (e) => {
    const f = e.target.closest("form[data-form]");
    if (!f) return;
    e.preventDefault();
    const status = $(".form-status", f);
    if (f.website && f.website.value) return; // bot
    if (!f.checkValidity()) { status.textContent = "please fill in the highlighted field."; f.reportValidity(); return; }
    const data = Object.fromEntries(new FormData(f));
    delete data.website;
    const name = f.dataset.form;
    const btn = $("button[type=submit]", f);
    btn.disabled = true; status.textContent = "sending…";
    try {
      const ok = await send(name, data);
      if (ok) {
        status.textContent = f.dataset.thanks || "landed. thank you.";
        f.reset();
        if (f.dataset.whatsapp === "also") window.open(wa(waText(name, data)), "_blank");
      } else {
        status.textContent = "opening whatsapp to send this…";
        window.open(wa(waText(name, data)), "_blank");
      }
    } catch (err) {
      status.textContent = "that didn't go through. try whatsapp instead.";
    }
    btn.disabled = false;
  });

  function waText(name, d) {
    if (name === "newsletter") return `hi 0866, please add me to gate 0866: ${d.email}`;
    if (name === "franchise") return `hi 0866, i'd like to talk about a franchise.\nname: ${d.name}\ncity: ${d.city}\nphone: ${d.phone}\n${d.about || ""}`;
    return `hi 0866 (${d.kind || "note"}): ${d.message || ""}${d.name ? "\n— " + d.name : ""}`;
  }

  /* the fun layer */
  const fun = document.createElement("script");
  fun.src = "assets/fun.js"; fun.defer = true;
  document.body.append(fun);
})();
