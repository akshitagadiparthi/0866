/* 0866° — the fun layer: beans everywhere. Loaded by site.js. */
(function () {
  const O = window.O866 || {};
  if (O.reduce) return; // respect "reduce motion"
  const coarse = matchMedia("(pointer: coarse)").matches;

  const COLORS = ["#39180F", "#6E1A14", "#A8783A", "#B8813F", "#4A2418"];
  const beanSVG = (c) => `<svg viewBox="0 0 40 52" width="100%" height="100%"><ellipse cx="20" cy="26" rx="17" ry="23" fill="${c}"/><path d="M24 5c-9 10 5 22-5 42" fill="none" stroke="#F1EADB" stroke-width="3.2" stroke-linecap="round"/></svg>`;

  /* ── physics beans (bursts + rain) ───────────────────── */
  const layer = document.createElement("div");
  layer.className = "bean-layer";
  layer.setAttribute("aria-hidden", "true");
  document.body.append(layer);
  let parts = [], running = false;

  function spawn(x, y, vx, vy, size) {
    if (parts.length > 160) return;
    const el = document.createElement("div");
    el.className = "bean-p";
    el.style.width = size + "px"; el.style.height = size * 1.3 + "px";
    el.innerHTML = beanSVG(COLORS[(Math.random() * COLORS.length) | 0]);
    layer.append(el);
    parts.push({ el, x, y, vx, vy, r: Math.random() * 360, vr: (Math.random() - .5) * 16, life: 0 });
    if (!running) { running = true; requestAnimationFrame(step); }
  }
  function step() {
    const H = innerHeight;
    parts = parts.filter((p) => {
      p.vy += .42; p.vx *= .995; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life++;
      if (p.y > H - 14 && p.vy > 0) { p.y = H - 14; p.vy *= -.38; p.vx *= .7; p.vr *= .6; } // bounce on the floor
      const fade = p.life > 110 ? Math.max(0, 1 - (p.life - 110) / 40) : 1;
      p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.r}deg)`;
      p.el.style.opacity = fade;
      if (fade <= 0) { p.el.remove(); return false; }
      return true;
    });
    if (parts.length) requestAnimationFrame(step); else running = false;
  }
  const burst = (x, y, n = 9) => { for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + (Math.random() - .5) * 2.2, s = 6 + Math.random() * 7; spawn(x, y, Math.cos(a) * s, Math.sin(a) * s, 12 + Math.random() * 10); } };
  const rain = (n = 70) => { for (let i = 0; i < n; i++) setTimeout(() => spawn(Math.random() * innerWidth, -40, (Math.random() - .5) * 2, Math.random() * 3, 14 + Math.random() * 16), i * 35); };
  O.burst = burst; O.rain = rain;

  // click anywhere (not in a form) → a little burst of beans
  document.addEventListener("click", (e) => {
    if (e.target.closest("input, textarea, select, label, .field")) return;
    burst(e.clientX, e.clientY, e.target.closest("a, button, .btn, .stamp, .clickable") ? 12 : 7);
  });

  // secret: type 0866 (or "coffee") anywhere → it rains beans
  let typed = "";
  document.addEventListener("keydown", (e) => {
    if (e.target.closest("input, textarea")) return;
    typed = (typed + e.key.toLowerCase()).slice(-6);
    if (typed.endsWith("0866") || typed.endsWith("coffee")) { rain(); typed = ""; }
  });

  /* ── floating beans in the hero ──────────────────────── */
  const stage = document.getElementById("stage");
  if (stage && !document.getElementById("heroLogo")) {
    const field = document.createElement("div");
    field.className = "float-field"; field.setAttribute("aria-hidden", "true");
    const N = coarse ? 9 : 16;
    for (let i = 0; i < N; i++) {
      const b = document.createElement("span");
      const size = 14 + Math.random() * 30, depth = .3 + Math.random();
      b.className = "float-bean";
      b.dataset.depth = depth;
      b.style.cssText = `left:${Math.random() * 96}%;top:${Math.random() * 90}%;width:${size}px;height:${size * 1.3}px;opacity:${.25 + depth * .45};animation-duration:${7 + Math.random() * 8}s;animation-delay:${-Math.random() * 8}s;--rot:${(Math.random() * 360) | 0}deg`;
      b.innerHTML = beanSVG(COLORS[i % COLORS.length]);
      field.append(b);
    }
    stage.prepend(field);
    if (!coarse) stage.addEventListener("mousemove", (e) => {
      const cx = e.clientX / innerWidth - .5, cy = e.clientY / innerHeight - .5;
      field.querySelectorAll(".float-bean").forEach((b) => { const d = b.dataset.depth * 40; b.style.translate = `${-cx * d}px ${-cy * d}px`; });
    });
    // tap the logo → it wobbles and spills beans
    const logo = document.getElementById("heroLogo");
    if (logo) logo.addEventListener("click", (e) => { logo.classList.remove("wobble"); void logo.offsetWidth; logo.classList.add("wobble"); burst(e.clientX, e.clientY, 22); });
  }

  /* ── scroll cup: fills with coffee as you scroll ─────── */
  const cup = document.createElement("button");
  cup.className = "scroll-cup"; cup.type = "button";
  cup.setAttribute("aria-label", "back to top");
  cup.innerHTML = `<svg viewBox="0 0 60 64"><defs><clipPath id="cupc"><path d="M10 18h34l-4 36a6 6 0 0 1-6 5H20a6 6 0 0 1-6-5z"/></clipPath></defs>
    <g class="steam" fill="none" stroke="#A8783A" stroke-width="2.4" stroke-linecap="round"><path d="M20 12c-3-4 3-6 0-10"/><path d="M28 12c-3-4 3-6 0-10"/><path d="M36 12c-3-4 3-6 0-10"/></g>
    <g clip-path="url(#cupc)"><rect x="0" y="0" width="60" height="64" fill="#F4EEE2"/><rect class="coffee" x="0" y="60" width="60" height="64" fill="#39180F"/><rect class="crema" x="0" y="60" width="60" height="3" fill="#B8813F"/></g>
    <path d="M10 18h34l-4 36a6 6 0 0 1-6 5H20a6 6 0 0 1-6-5z" fill="none" stroke="#39180F" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M44 26h4a6 6 0 0 1 0 12h-5" fill="none" stroke="#39180F" stroke-width="2.6"/></svg>`;
  document.body.append(cup);
  const coffee = cup.querySelector(".coffee"), crema = cup.querySelector(".crema");
  const fill = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, scrollY / max) : 0;
    const y = 60 - p * 42;
    coffee.setAttribute("y", y); crema.setAttribute("y", y);
    cup.classList.toggle("full", p > .97);
    cup.classList.toggle("show", scrollY > 200);
  };
  addEventListener("scroll", fill, { passive: true }); fill();
  cup.addEventListener("click", (e) => { e.stopPropagation(); burst(e.clientX, e.clientY, 16); scrollTo({ top: 0, behavior: "smooth" }); });

  /* ── headlines arrive word by word ───────────────────── */
  const heads = document.querySelectorAll("main h1, main h2, main .say, main .dial");
  const hio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("words-in"); hio.unobserve(e.target); } }), { threshold: .3 });
  heads.forEach((h) => {
    if (h.closest(".board") || h.children.length > 1) return;
    let i = 0;
    const walk = (node) => [...node.childNodes].forEach((c) => {
      if (c.nodeType === 3) {
        const frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach((w) => {
          if (!w.trim()) { frag.append(w); return; }
          const s = document.createElement("span"); s.className = "w"; s.style.setProperty("--i", i++);
          s.innerHTML = `<span>${w}</span>`; frag.append(s);
        });
        c.replaceWith(frag);
      } else if (c.nodeType === 1 && c.tagName !== "BR") walk(c);
    });
    walk(h); h.classList.add("words"); hio.observe(h);
  });

  /* ── magnetic buttons ────────────────────────────────── */
  if (!coarse) document.querySelectorAll(".btn").forEach((b) => {
    b.addEventListener("mousemove", (e) => { const r = b.getBoundingClientRect(); b.style.translate = `${(e.clientX - r.left - r.width / 2) * .25}px ${(e.clientY - r.top - r.height / 2) * .35}px`; });
    b.addEventListener("mouseleave", () => { b.style.translate = ""; });
  });

  /* ── bean dividers: a bean rolls along the line as you scroll ── */
  document.querySelectorAll("hr.rule").forEach((hr) => {
    const wrap = document.createElement("div"); wrap.className = "roll-rule"; wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = `<span class="roll-bean">${beanSVG("#39180F")}</span>`;
    hr.replaceWith(wrap);
    const bean = wrap.firstElementChild;
    addEventListener("scroll", () => {
      const r = wrap.getBoundingClientRect(); const p = 1 - Math.min(1, Math.max(0, r.top / innerHeight));
      const x = p * (wrap.clientWidth - 24);
      bean.style.transform = `translateX(${x}px) rotate(${x * 2.2}deg)`;
    }, { passive: true });
  });

  /* ── footer: a jar that fills with beans you click out ─── */
  let count = 0;
  const base = document.querySelector(".foot-base span");
  if (base) {
    const counter = document.createElement("span"); counter.className = "bean-count";
    base.after(counter);
    document.addEventListener("click", () => { count++; if (count === 1 || count % 5 === 0 || count < 5) counter.textContent = `${count} bean${count > 1 ? "s" : ""} spilled so far`; });
  }
})();
