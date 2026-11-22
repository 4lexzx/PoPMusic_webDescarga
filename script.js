/* PoPMusic — web de descarga */
(() => {
  "use strict";

  /* ---------- menú móvil ---------- */
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#navigation");

  menuButton?.addEventListener("click", () => {
    const open = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- topbar al hacer scroll + barra de progreso ---------- */
  const topbar = document.querySelector(".topbar");
  const progress = document.querySelector(".scroll-progress i");

  const onScroll = () => {
    const y = window.scrollY;
    topbar?.classList.toggle("scrolled", y > 24);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- aparición al hacer scroll ---------- */
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = Number(entry.target.dataset.delay || 0);
          setTimeout(() => entry.target.classList.add("is-visible"), delay);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealItems.forEach((el) => io.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- parallax del hero ---------- */
  const heroArt = document.querySelector(".hero-art");
  const parallaxItems = document.querySelectorAll(".parallax");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (heroArt && parallaxItems.length && !reduced) {
    let raf = 0;
    heroArt.addEventListener("mousemove", (e) => {
      const rect = heroArt.getBoundingClientRect();
      const dx = (e.clientX - rect.left) / rect.width - 0.5;
      const dy = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        parallaxItems.forEach((el) => {
          const depth = Number(el.dataset.depth || 12);
          el.style.setProperty("--px", `${(dx * depth).toFixed(2)}px`);
          el.style.setProperty("--py", `${(dy * depth * 0.6).toFixed(2)}px`);
          el.style.translate = `var(--px) var(--py)`;
        });
      });
    });
    heroArt.addEventListener("mouseleave", () => {
      parallaxItems.forEach((el) => (el.style.translate = "0 0"));
    });
  }

  /* ---------- galería de capturas ---------- */
  const gallery = document.querySelector(".gallery");
  const viewport = gallery?.querySelector(".gallery-viewport");
  const track = gallery?.querySelector(".gallery-track");
  const prevBtn = gallery?.querySelector(".gallery-prev");
  const nextBtn = gallery?.querySelector(".gallery-next");
  const dotsWrap = document.querySelector(".gallery-dots");

  if (viewport && track) {
    const shots = Array.from(track.children);

    // puntos indicadores
    shots.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Ir a la captura ${i + 1}`);
      dot.addEventListener("click", () => scrollToShot(i));
      dotsWrap?.appendChild(dot);
    });
    const dots = Array.from(dotsWrap?.children || []);

    const step = () => {
      const first = shots[0];
      if (!first) return 260;
      const gap = parseFloat(getComputedStyle(track).gap) || 26;
      return first.getBoundingClientRect().width + gap;
    };

    const currentIndex = () => {
      const center = viewport.scrollLeft + viewport.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      shots.forEach((shot, i) => {
        const c = shot.offsetLeft + shot.offsetWidth / 2;
        const dist = Math.abs(c - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      return best;
    };

    const sync = () => {
      const i = currentIndex();
      dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
      if (prevBtn) prevBtn.disabled = viewport.scrollLeft <= 4;
      if (nextBtn)
        nextBtn.disabled =
          viewport.scrollLeft >= viewport.scrollWidth - viewport.clientWidth - 4;
    };

    const scrollToShot = (i) => {
      const shot = shots[i];
      if (!shot) return;
      viewport.scrollTo({
        left: shot.offsetLeft - (viewport.clientWidth - shot.offsetWidth) / 2,
        behavior: "smooth",
      });
    };

    prevBtn?.addEventListener("click", () => scrollToShot(currentIndex() - 1));
    nextBtn?.addEventListener("click", () => scrollToShot(currentIndex() + 1));
    viewport.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    // arrastrar con el ratón
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let moved = 0;

    viewport.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "touch") return;
      isDown = true;
      moved = 0;
      startX = e.clientX;
      startScroll = viewport.scrollLeft;
      viewport.classList.add("dragging");
      viewport.setPointerCapture(e.pointerId);
    });
    viewport.addEventListener("pointermove", (e) => {
      if (!isDown) return;
      const delta = e.clientX - startX;
      moved = Math.max(moved, Math.abs(delta));
      viewport.scrollLeft = startScroll - delta;
    });
    const endDrag = () => {
      isDown = false;
      viewport.classList.remove("dragging");
    };
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
    // evita el clic fantasma tras arrastrar
    track.addEventListener(
      "click",
      (e) => {
        if (moved > 6) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      true
    );

    sync();
  }

  /* ---------- características desplegables ---------- */
  document.querySelectorAll(".feature-head").forEach((head) => {
    head.addEventListener("click", () => {
      const item = head.closest(".feature-item");
      if (!item) return;
      const open = item.classList.toggle("open");
      head.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- contadores de cifras ---------- */
  const counters = document.querySelectorAll(".stat-number");
  const animateCounter = (el) => {
    const target = Number(el.dataset.count || 0);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    if (target === 0) {
      el.textContent = `${prefix}0${suffix}`;
      return;
    }
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window && counters.length) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach(animateCounter);
  }

  /* ---------- toast de descarga ---------- */
  const toast = document.querySelector(".download-toast");
  let toastTimer = 0;
  document.querySelectorAll('a[download]').forEach((link) => {
    link.addEventListener("click", () => {
      if (!toast) return;
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("show"), 4200);
    });
  });
})();
