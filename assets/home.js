/* 0866° — home page: a day at 0866°, 7:30 am to 10 pm, the sky changing as you go */
(function () {
  const O = window.O866 || {};
  const reduce = O.reduce;

  /* a day at 0866° */
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
