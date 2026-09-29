/* 0866° — home page pieces:
   1. the logo, built from ~700 coffee beans that fly in and scatter at your touch
   2. a rotary phone dial: dial 0866 to "reach vijayawada"
   3. a day at 0866°: 7:30 am to 10 pm, the sky changing as you go */
(function () {
  const O = window.O866 || {};
  const reduce = O.reduce;
  const BEAN_COLS = ["#39180F","#39180F","#39180F","#39180F","#39180F","#39180F","#4A2418","#4A2418","#6E1A14","#A8783A"];

  /* ─────────────── 1. bean logo ─────────────── */
  const stage = document.getElementById("stage");
  const src = document.getElementById("heroLogo");
  if (stage && src && !reduce && !stage.classList.contains("has-video")) {
    const cvs = document.createElement("canvas");
    cvs.className = "bean-logo";
    cvs.setAttribute("aria-hidden", "true");
    src.after(cvs);
    const ctx = cvs.getContext("2d");
    let W, H, dpr, P = [], size = 8, awake = 0, pointer = { x: -9999, y: -9999, on: false };

    const img = new Image();
    img.src = src.src;
    img.decode().then(build).catch(() => {});

    function build() {
      const box = src.getBoundingClientRect();
      if (!box.width) return;
      dpr = Math.min(2, devicePixelRatio || 1);
      W = box.width; H = box.height;
      cvs.width = W * dpr; cvs.height = H * dpr;
      cvs.style.width = W + "px"; cvs.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // read the logo's shape
      const off = document.createElement("canvas");
      off.width = Math.round(W); off.height = Math.round(H);
      const o = off.getContext("2d");
      o.drawImage(img, 0, 0, off.width, off.height);
      const data = o.getImageData(0, 0, off.width, off.height).data;
      let filled = 0;
      for (let i = 3; i < data.length; i += 8) if (data[i] > 140) filled++;
      filled *= 2;
      const target = W < 500 ? 560 : 1050;
      size = Math.max(4, Math.sqrt(filled / target));
      const step = size;
      const old = P;
      P = [];
      for (let y = step / 2; y < off.height; y += step) {
        for (let x = step / 2; x < off.width; x += step) {
          const a = data[((y | 0) * off.width + (x | 0)) * 4 + 3];
          if (a > 140) {
            const prev = old[P.length];
            P.push({
              tx: x + (Math.random() - .5) * step * .3, ty: y + (Math.random() - .5) * step * .3,
              x: prev ? prev.x : Math.random() * W, y: prev ? prev.y : -Math.random() * H * 2 - 20,
              vx: 0, vy: 0, r: Math.random() * 6.28, tr: (Math.random() - .5) * 1.2,
              c: BEAN_COLS[(Math.random() * BEAN_COLS.length) | 0], s: size * (.95 + Math.random() * .35)
            });
          }
        }
      }
      stage.classList.add("beans-ready");
      wake(240);
    }

    function wake(frames = 90) { if (awake <= 0) { awake = frames; requestAnimationFrame(tick); } else awake = Math.max(awake, frames); }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      const R = Math.max(60, W * .11), R2 = R * R;
      let moving = 0;
      for (const p of P) {
        p.vx += (p.tx - p.x) * .045; p.vy += (p.ty - p.y) * .045;
        if (pointer.on) {
          const dx = p.x - pointer.x, dy = p.y - pointer.y, d2 = dx * dx + dy * dy;
          if (d2 < R2) { const f = (1 - d2 / R2) * 5.5, d = Math.sqrt(d2) || 1; p.vx += dx / d * f; p.vy += dy / d * f; p.r += .15; }
        }
        p.vx *= .82; p.vy *= .82; p.x += p.vx; p.y += p.vy;
        p.r += (p.tr - p.r) * .04;
        if (Math.abs(p.vx) + Math.abs(p.vy) > .08) moving++;
        drawBean(p);
      }
      if (moving > 2 || pointer.on) awake = Math.max(awake, 20);
      if (--awake > 0) requestAnimationFrame(tick);
    }

    function drawBean(p) {
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.ellipse(0, 0, p.s * .42, p.s * .58, 0, 0, 6.283); ctx.fill();
      if (p.s > 5) {
        ctx.strokeStyle = "rgba(241,234,219,.75)"; ctx.lineWidth = Math.max(.6, p.s * .09);
        ctx.beginPath(); ctx.moveTo(p.s * .06, -p.s * .5); ctx.quadraticCurveTo(-p.s * .2, 0, p.s * .06, p.s * .5); ctx.stroke();
      }
      ctx.restore();
    }

    const toLocal = (cx, cy) => { const b = cvs.getBoundingClientRect(); pointer.x = cx - b.left; pointer.y = cy - b.top; };
    stage.addEventListener("pointermove", (e) => { toLocal(e.clientX, e.clientY); pointer.on = true; wake(); }, { passive: true });
    stage.addEventListener("pointerleave", () => { pointer.on = false; });
    stage.addEventListener("pointerup", (e) => { if (e.pointerType !== "mouse") pointer.on = false; });
    stage.addEventListener("touchend", () => { pointer.on = false; }, { passive: true });
    // tap / click: burst the logo apart, then it rebuilds itself
    stage.addEventListener("click", () => {
      for (const p of P) { const a = Math.random() * 6.283, s = 10 + Math.random() * 26; p.vx += Math.cos(a) * s; p.vy += Math.sin(a) * s - 6; p.r += Math.random() * 6; }
      wake(200);
    });
    let rt;
    addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(build, 200); });
  }

  /* ─────────────── 2. rotary dial ─────────────── */
  const dialBox = document.getElementById("dial");
  if (dialBox) {
    const NS = "http://www.w3.org/2000/svg";
    const C = 160, RH = 112, HOLE = 23, STOP = 348; // degrees, measured counter-clockwise from 3 o'clock
    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const ang = (i) => 32 + i * 30.2; // 1 at ~2 o'clock … 0 at ~5 o'clock
    const pos = (deg, r) => [C + r * Math.cos(deg * Math.PI / 180), C - r * Math.sin(deg * Math.PI / 180)];

    // plate = disc with ten holes cut out (even-odd fill)
    let plate = `M${C - 150} ${C}a150 150 0 1 0 300 0a150 150 0 1 0 -300 0Z M${C - 58} ${C}a58 58 0 1 0 116 0a58 58 0 1 0 -116 0Z`;
    digits.forEach((d, i) => { const [x, y] = pos(ang(i), RH); plate += ` M${x - HOLE} ${y}a${HOLE} ${HOLE} 0 1 0 ${HOLE * 2} 0a${HOLE} ${HOLE} 0 1 0 ${-HOLE * 2} 0Z`; });
    const [sx, sy] = pos(STOP, 150), [sx2, sy2] = pos(STOP, 118);

    dialBox.innerHTML = `
      <svg viewBox="0 0 320 320" class="dial-svg" role="group" aria-label="a rotary phone dial">
        <circle cx="${C}" cy="${C}" r="156" fill="#1f0d08"/>
        <circle cx="${C}" cy="${C}" r="150" fill="#F4EEE2"/>
        ${digits.map((d, i) => { const [x, y] = pos(ang(i), RH); return `<text x="${x}" y="${y + 8}" text-anchor="middle" class="dial-num">${d}</text>`; }).join("")}
        <g class="dial-plate" id="plate">
          <path d="${plate}" fill-rule="evenodd" fill="var(--red)"/>
          <circle cx="${C}" cy="${C}" r="150" fill="none" stroke="#A8783A" stroke-width="3"/>
          <circle cx="${C}" cy="${C}" r="58" fill="none" stroke="#A8783A" stroke-width="2"/>
        </g>
        <circle cx="${C}" cy="${C}" r="54" fill="#F4EEE2"/>
        <text x="${C}" y="${C - 10}" text-anchor="middle" class="dial-label">vijayawada</text>
        <text x="${C}" y="${C + 22}" text-anchor="middle" class="dial-code" id="dialed">_ _ _ _</text>
        <line x1="${sx}" y1="${sy}" x2="${sx2}" y2="${sy2}" stroke="#A8783A" stroke-width="7" stroke-linecap="round"/>
        ${digits.map((d, i) => { const [x, y] = pos(ang(i), RH); return `<circle cx="${x}" cy="${y}" r="${HOLE}" class="dial-hit" data-d="${d}" data-a="${ang(i)}" tabindex="0" role="button" aria-label="dial ${d}"/>`; }).join("")}
      </svg>`;

    const plateEl = document.getElementById("plate"), shown = document.getElementById("dialed"), msg = document.getElementById("dialMsg");
    let num = "", busy = false;
    const say = (t) => { msg.textContent = t; };
    function dial(d, a) {
      if (busy) return;
      busy = true;
      const turn = ((a - STOP) % 360 + 360) % 360; // how far the plate travels clockwise
      const t = reduce ? 0 : 180 + turn * 2.2;
      plateEl.style.transition = `transform ${t}ms cubic-bezier(.3,.1,.4,1)`;
      plateEl.style.transform = `rotate(${turn}deg)`;
      setTimeout(() => {
        num = (num + d).slice(-4);
        shown.textContent = num.padEnd(4, "_").split("").join(" ");
        plateEl.style.transition = `transform ${reduce ? 0 : t * 1.3}ms cubic-bezier(.4,0,.2,1)`;
        plateEl.style.transform = "rotate(0deg)";
        setTimeout(() => { busy = false; check(); }, reduce ? 0 : t * 1.3);
      }, t);
    }
    function check() {
      if (num.length < 4) { say(num.length ? "keep going…" : "dial 0866."); return; }
      if (num === "0866") {
        say("connected. you've reached vijayawada.");
        dialBox.classList.add("connected");
        if (O.rain) O.rain(60);
        setTimeout(() => dialBox.classList.remove("connected"), 2400);
      } else if (num === "0863") say("that's guntur. close, but not quite.");
      else if (num === "0891") say("that's vizag. lovely, but try 0866.");
      else if (num.startsWith("040")) say("hyderabad. we'll get there. try 0866.");
      else say("wrong number. try 0866.");
      num = "";
      setTimeout(() => { if (!num) shown.textContent = "_ _ _ _"; }, 1800);
    }
    dialBox.addEventListener("click", (e) => { const h = e.target.closest(".dial-hit"); if (h) { e.stopPropagation(); dial(h.dataset.d, +h.dataset.a); } });
    dialBox.addEventListener("keydown", (e) => { const h = e.target.closest(".dial-hit"); if (h && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); dial(h.dataset.d, +h.dataset.a); } });
    document.addEventListener("keydown", (e) => {
      if (e.target.closest("input, textarea") || !/^[0-9]$/.test(e.key)) return;
      const r = dialBox.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) { const h = dialBox.querySelector(`.dial-hit[data-d="${e.key}"]`); dial(e.key, +h.dataset.a); }
    });
  }

  /* ─────────────── 3. a day at 0866° ─────────────── */
  const day = document.getElementById("day");
  if (day) {
    const track = day.querySelector(".day-track"), cards = [...day.querySelectorAll(".day-card")];
    const sun = day.querySelector(".day-sun"), clock = day.querySelector(".day-clock");
    const skies = cards.map((c) => c.dataset.sky);
    const times = cards.map((c) => c.dataset.time);
    const mix = (a, b, t) => { const h = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16)); const A = h(a), B = h(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`; };
    const wide = () => matchMedia("(min-width: 900px)").matches && !reduce;

    function paint(p) {
      const f = p * (cards.length - 1), i = Math.min(cards.length - 2, Math.floor(f)), t = f - i;
      day.style.setProperty("--sky", mix(skies[i], skies[i + 1], t));
      day.classList.toggle("night", p > .72);
      if (sun) { const a = Math.PI * (1 - p); sun.style.left = `${50 + Math.cos(a) * 44}%`; sun.style.top = `${78 - Math.sin(a) * 62}%`; }
      if (clock) clock.textContent = times[Math.round(f)];
    }
    function onScroll() {
      if (wide()) {
        const r = day.getBoundingClientRect(), max = day.offsetHeight - innerHeight;
        const p = Math.min(1, Math.max(0, -r.top / max));
        track.style.transform = `translateX(${-p * (track.scrollWidth - innerWidth)}px)`;
        paint(p);
      } else {
        track.style.transform = "";
        const p = track.scrollLeft / Math.max(1, track.scrollWidth - track.clientWidth);
        paint(p);
      }
    }
    function size() { day.style.height = wide() ? `${cards.length * 70}vh` : ""; onScroll(); }
    addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", size);
    size();
  }
})();
