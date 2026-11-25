// Aana Pappan main entry. Bundled via Vite.
// React is imported explicitly here, then used as `React.useState` etc.
// throughout the rest of the file - matching the CDN style we had before.
import React from 'react'
import { createRoot } from 'react-dom/client'

// Side-effect import: pull in our global styles + Tailwind directives.
// Vite + PostCSS will tree-shake Tailwind down to only used classes.
import './index.css'

/* ============================================================
       ⚙️  SITE_CONFIG — edit these values to update the site copy
       ============================================================
       This is the only block you need to touch for routine updates.
       The rest of the file is the design and behaviour of the site.

       To edit:
       1. Open this file in any text editor (Notepad works)
       2. Change the values below
       3. Save the file
       4. Refresh your browser

       Don't change the variable NAMES (left of `:`), only the VALUES
       (the bits in quotes or after the colon).
       ============================================================ */
    const SITE_CONFIG = {
      // The number shown next to "Taking N new projects this month" in the hero.
      // Should match how many slots are still "open" in `monthlySlots` below.
      // If you raise/lower this, also adjust `monthlySlots` so they tell the same story.
      slotsOpen: 2,

      // The 3 monthly project slots shown in the Process section panel.
      // Each slot has:
      //   taken: true  → greyed out, struck through (already booked)
      //   taken: false → highlighted in green (available to book)
      // Edit the `label` text to reflect the actual project name once booked.
      // Order matters - slot 1 is shown first.
      // ⚠️  If you ever change the TOTAL number of slots (e.g. from 3 to 5),
      // also update the headline "Three projects a month, no more." in the
      // Process section JSX (search for it). The headline doesn't auto-update.
      monthlySlots: [
        { n: 1, label: "booked",              taken: true  },
        { n: 2, label: "booked",              taken: true  },
        { n: 3, label: "open - could be you",                   taken: false },
      ],
    };
    /* ============================================================ */

    /* =======================================================
       Decorative SVGs - Kerala motifs
       ======================================================= */
    const PalmTree = ({ className = "" }) => (
      <svg viewBox="0 0 80 100" className={className} fill="none">
        <path d="M40 100 C 38 80, 38 60, 40 42" stroke="#5A4634" strokeWidth="3" strokeLinecap="round"/>
        <path d="M40 100 C 42 80, 42 60, 40 42" stroke="#5A4634" strokeWidth="3" strokeLinecap="round"/>
        {/* fronds */}
        <path d="M40 42 C 20 38, 8 30, 4 18 C 14 24, 28 30, 40 36" fill="#1F4D2A"/>
        <path d="M40 42 C 60 38, 72 30, 76 18 C 66 24, 52 30, 40 36" fill="#2E6B3A"/>
        <path d="M40 42 C 26 32, 18 16, 22 4 C 30 14, 38 26, 42 38" fill="#1F4D2A"/>
        <path d="M40 42 C 54 32, 62 16, 58 4 C 50 14, 42 26, 38 38" fill="#2E6B3A"/>
        <path d="M40 42 C 32 36, 28 22, 32 10 C 36 22, 40 30, 40 38" fill="#7AA17A"/>
        {/* coconuts */}
        <circle cx="36" cy="44" r="3" fill="#5A4634"/>
        <circle cx="44" cy="45" r="2.5" fill="#5A4634"/>
      </svg>
    );

    const Vallam = ({ className = "" }) => (
      // Kerala kettuvallam (boat) outline
      <svg viewBox="0 0 200 60" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 36 C 20 50, 60 54, 100 54 C 140 54, 180 50, 192 36 Z" fill="rgba(192,83,59,0.12)"/>
        {/* arched roof */}
        <path d="M50 36 C 70 18, 130 18, 150 36"/>
        <path d="M50 36 L 50 30"/>
        <path d="M150 36 L 150 30"/>
        {/* ribs */}
        <path d="M70 36 L 70 22" opacity="0.5"/>
        <path d="M100 36 L 100 18" opacity="0.5"/>
        <path d="M130 36 L 130 22" opacity="0.5"/>
        {/* prow */}
        <path d="M8 36 L 4 30 L 12 30"/>
        <path d="M192 36 L 196 30 L 188 30"/>
      </svg>
    );

    // Brand mark - the official logo elephant. See /aana-pappan-logo for full pack.
    const Elephant = ({ className = "" }) => (
      <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Aana Pappan elephant mark">
        <path d="M 22 62 C 22 48, 30 38, 44 36 C 50 35, 57 36, 62 39 L 64 30 C 64 27, 67 25, 70 26 C 73 27, 74 30, 73 33 L 71 42 C 76 47, 78 54, 78 60 L 78 72 C 78 75, 76 77, 73 77 L 70 77 C 67 77, 65 75, 65 72 L 65 67 L 56 67 L 56 72 C 56 75, 54 77, 51 77 L 48 77 C 45 77, 43 75, 43 72 L 43 65 C 36 64, 30 60, 26 55 L 24 60 C 23 64, 20 65, 18 63 C 16 61, 17 58, 19 56 Z"
          fill="#2F6E48" stroke="#1F4D31" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M 44 36 C 38 34, 33 36, 30 41 C 28 45, 29 50, 33 52 C 38 54, 43 51, 45 46 Z"
          fill="#E8B23A" stroke="#1F4D31" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M 71 42 C 76 44, 80 48, 82 53 C 84 58, 83 63, 79 65 C 75 67, 72 64, 73 60 C 74 57, 76 56, 78 57"
          fill="none" stroke="#1F4D31" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="68" cy="36" r="1.4" fill="#1F4D31"/>
        <path d="M 49 76 L 49 78 M 53 76 L 53 78 M 67 76 L 67 78 M 71 76 L 71 78"
          stroke="#1F4D31" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    );

    // Cream version for use on dark/leaf backgrounds (footer)
    const ElephantCream = ({ className = "" }) => (
      <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Aana Pappan elephant mark, inverted">
        <path d="M 22 62 C 22 48, 30 38, 44 36 C 50 35, 57 36, 62 39 L 64 30 C 64 27, 67 25, 70 26 C 73 27, 74 30, 73 33 L 71 42 C 76 47, 78 54, 78 60 L 78 72 C 78 75, 76 77, 73 77 L 70 77 C 67 77, 65 75, 65 72 L 65 67 L 56 67 L 56 72 C 56 75, 54 77, 51 77 L 48 77 C 45 77, 43 75, 43 72 L 43 65 C 36 64, 30 60, 26 55 L 24 60 C 23 64, 20 65, 18 63 C 16 61, 17 58, 19 56 Z"
          fill="#FBF4E2" stroke="#FBF4E2" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M 44 36 C 38 34, 33 36, 30 41 C 28 45, 29 50, 33 52 C 38 54, 43 51, 45 46 Z"
          fill="#E8B23A" stroke="#FBF4E2" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M 71 42 C 76 44, 80 48, 82 53 C 84 58, 83 63, 79 65 C 75 67, 72 64, 73 60 C 74 57, 76 56, 78 57"
          fill="none" stroke="#FBF4E2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="68" cy="36" r="1.4" fill="#2F6E48"/>
      </svg>
    );

    const KasavuBorder = ({ className = "" }) => (
      // gold stripe with hand-drawn pattern, like the border on a kasavu mundu
      <svg viewBox="0 0 800 24" className={`kasavu-twinkle ${className}`} preserveAspectRatio="none">
        <rect x="0" y="6" width="800" height="12" fill="#E8B23A"/>
        <rect x="0" y="2" width="800" height="2" fill="#A03A26"/>
        <rect x="0" y="20" width="800" height="2" fill="#A03A26"/>
        <g fill="#FBF4E2" opacity="0.85">
          {Array.from({ length: 40 }).map((_, i) => (
            <rect key={i} className="dot" x={i * 20 + 8} y="10" width="4" height="4"
              style={{ animationDelay: `${(i % 8) * 0.3}s` }}
            />
          ))}
        </g>
      </svg>
    );

    /* =======================================================
       Reveal - scroll-triggered animation wrapper
       ======================================================= */
    const Reveal = ({ children, delay = 0, className = "", as: Tag = "div", variant = "" }) => {
      const ref = React.useRef(null);
      const [shown, setShown] = React.useState(false);
      React.useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let revealed = false;
        const reveal = () => {
          if (revealed) return;
          revealed = true;
          setShown(true);
        };
        // Fallback: if the IntersectionObserver never fires (some embedded
        // preview contexts), still reveal after a short timeout.
        const fallback = setTimeout(reveal, 1200 + delay);

        let io;
        try {
          io = new IntersectionObserver(
            (entries) => {
              entries.forEach((e) => {
                if (e.isIntersecting) {
                  setTimeout(reveal, delay);
                  io.unobserve(e.target);
                }
              });
            },
            { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
          );
          io.observe(el);
        } catch (e) {
          // No IO support - fallback timer will handle it.
        }

        // Also catch the case where the element starts already in view:
        // a manual rect check after mount.
        const rectCheck = () => {
          const r = el.getBoundingClientRect();
          const vh = window.innerHeight || document.documentElement.clientHeight;
          if (r.top < vh - 60 && r.bottom > 0) {
            setTimeout(reveal, delay);
          }
        };
        rectCheck();
        window.addEventListener("scroll", rectCheck, { passive: true });
        window.addEventListener("resize", rectCheck);

        return () => {
          clearTimeout(fallback);
          if (io) io.disconnect();
          window.removeEventListener("scroll", rectCheck);
          window.removeEventListener("resize", rectCheck);
        };
      }, [delay]);
      const cls = `${variant === "tilt" ? "reveal-tilt" : "reveal"} ${shown ? "is-in" : ""} ${className}`;
      return <Tag ref={ref} className={cls}>{children}</Tag>;
    };

    /* =======================================================
       Squiggle - inline SVG underline that draws on view
       (replaces the static .squiggle background-image)
       ======================================================= */
    const Squiggle = ({ children, className = "" }) => {
      const ref = React.useRef(null);
      const [shown, setShown] = React.useState(false);
      React.useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const trigger = () => setShown(true);
        const fallback = setTimeout(trigger, 1400);
        let io;
        try {
          io = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { trigger(); io.unobserve(e.target); } });
          }, { threshold: 0.6 });
          io.observe(el);
        } catch (e) {}
        return () => { clearTimeout(fallback); if (io) io.disconnect(); };
      }, []);
      return (
        <span ref={ref} className={`squiggle-svg ${shown ? "is-in" : ""} ${className}`}>
          {children}
          <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
            <path d="M2 8 Q 20 2, 40 7 T 80 7 T 120 7 T 160 7 T 198 7" />
          </svg>
        </span>
      );
    };

    /* =======================================================
       Marquee - infinite slow strip
       ======================================================= */
    const Marquee = ({ items }) => {
      // duplicate items so the -50% loop is seamless
      const list = [...items, ...items];
      return (
        <div className="overflow-hidden border-y-2 border-ink/10 bg-cream2/60 py-4 select-none">
          <div className="marquee-track">
            {list.map((it, i) => (
              <span key={i} className="inline-flex items-center gap-6 px-6 font-display font-bold text-2xl md:text-3xl text-ink">
                {it}
                <span className="text-turmeric text-3xl" aria-hidden>✦</span>
              </span>
            ))}
          </div>
        </div>
      );
    };

    /* =======================================================
       ChaayaCup - little illustration with steam wisps
       ======================================================= */
    const ChaayaCup = ({ className = "" }) => (
      <svg viewBox="0 0 80 90" className={className} fill="none" aria-hidden="true">
        {/* steam */}
        <g stroke="#FBF4E2" strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
          <path className="steam"   d="M30 28 C 26 22, 34 18, 30 10" />
          <path className="steam s-2" d="M40 28 C 36 22, 44 18, 40 10" />
          <path className="steam s-3" d="M50 28 C 46 22, 54 18, 50 10" />
        </g>
        {/* saucer */}
        <ellipse cx="40" cy="78" rx="34" ry="6" fill="#A03A26" />
        <ellipse cx="40" cy="76" rx="32" ry="5" fill="#C0533B" />
        {/* cup */}
        <path d="M16 38 L 20 70 C 21 76, 28 78, 40 78 C 52 78, 59 76, 60 70 L 64 38 Z" fill="#FBF4E2" stroke="#2A1F14" strokeWidth="2.5" strokeLinejoin="round"/>
        {/* tea surface */}
        <ellipse cx="40" cy="38" rx="24" ry="5" fill="#A03A26" />
        <ellipse cx="40" cy="37" rx="22" ry="4" fill="#C0533B" />
        {/* handle */}
        <path d="M64 44 C 74 46, 74 60, 62 62" stroke="#2A1F14" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </svg>
    );

    /* =======================================================
       useMouseTilt - 3D parallax on desktop hover
       ======================================================= */
    /* =======================================================
       useScrollParallax - moves an element with scrollY
       ======================================================= */
    const useScrollParallax = (factor = 0.15) => {
      const ref = React.useRef(null);
      React.useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let ticking = false;
        const update = () => {
          // Move at a fraction of how far the user has scrolled.
          // At scrollY=0 (page load) the offset is 0 and the element sits where it's
          // anchored. As you scroll down, the element drifts upward at `factor` rate.
          const offset = window.scrollY * factor;
          el.style.transform = `translate3d(0, ${(-offset).toFixed(1)}px, 0)`;
          ticking = false;
        };
        const onScroll = () => {
          if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
          }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        update();
        return () => window.removeEventListener("scroll", onScroll);
      }, [factor]);
      return ref;
    };

    const useMouseTilt = (max = 8) => {
      const ref = React.useRef(null);
      React.useEffect(() => {
        const el = ref.current;
        if (!el) return;
        // Skip on touch devices and reduced motion
        if (window.matchMedia("(hover: none)").matches) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        // Capture the original transform so we can restore it on leave.
        const base = el.style.transform || "";
        const onMove = (e) => {
          const rect = el.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          const rx = (-y * max).toFixed(2);
          const ry = (x * max).toFixed(2);
          el.style.transform = `${base} perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        };
        const onLeave = () => { el.style.transform = base; };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        return () => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        };
      }, [max]);
      return ref;
    };

    /* =======================================================
       CountUp - animates a number 0 → target when in view
       ======================================================= */
    const CountUp = ({ to = 0, duration = 1100, className = "" }) => {
      const ref = React.useRef(null);
      const [val, setVal] = React.useState(0);
      React.useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let raf;
        const start = (t0) => {
          const tick = (t) => {
            const p = Math.min(1, (t - t0) / duration);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        };
        const io = new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              start(performance.now());
              io.unobserve(e.target);
            }
          });
        }, { threshold: 0.5 });
        io.observe(el);
        return () => { if (raf) cancelAnimationFrame(raf); io.disconnect(); };
      }, [to, duration]);
      return <span ref={ref} className={className}>{val}</span>;
    };

    /* =======================================================
       Nav
       ======================================================= */
    const Nav = () => {
      const [open, setOpen] = React.useState(false);
      const links = [
        ["What we do", "#services"],
        ["About us", "#about"],
        ["How we work", "#process"],
        ["FAQ", "#faq"],
      ];
      return (
        <header className="sticky top-0 z-40 backdrop-blur bg-cream/80 border-b border-ink/5">
          <div className="w-full px-5 md:px-10 py-3.5 flex items-center gap-6">
            <a href="#top" className="flex items-center gap-2.5 group wiggle-on-hover">
              <span className="elephant-enter inline-block">
                <Elephant className="w-10 h-10 transition-transform" />
              </span>
              <span className="brand-shimmer font-display font-extrabold text-xl text-ink tracking-tight">
                Aana Pappan
              </span>
            </a>
            <nav className="hidden md:flex items-center gap-7 ml-auto">
              {links.map(([label, href]) => (
                <a key={href} href={href} className="font-semibold text-ink2 hover:text-brick transition-colors">
                  {label}
                </a>
              ))}
              <a href="#contact" className="press bg-leaf hover:bg-leaf2 text-cream font-bold px-5 py-2.5 rounded-full shadow-soft">
                Contact us
              </a>
            </nav>
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="md:hidden ml-auto bg-leaf text-cream font-bold px-4 py-2 rounded-full"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
          {open && (
            <div className="md:hidden border-t border-ink/5 bg-cream">
              <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col gap-3">
                {links.map(([label, href]) => (
                  <a key={href} href={href} onClick={() => setOpen(false)} className="font-semibold text-ink2 py-2">
                    {label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 self-start bg-leaf hover:bg-leaf2 text-cream font-bold px-5 py-2.5 rounded-full shadow-soft"
                >
                  Contact us
                </a>
              </div>
            </div>
          )}
        </header>
      );
    };

    /* =======================================================
       Hero
       ======================================================= */
    const Hero = ({ introMode = false }) => {
      const palmLeftRef = useScrollParallax(0.18);
      const palmRightRef = useScrollParallax(0.28);

      // When introMode is on, hold the cascade until the loader fires its
      // slide-up event. This way the hero animates in as the loader is leaving,
      // instead of guessing how long the loader took (it has random timing).
      const [flowReady, setFlowReady] = React.useState(!introMode);
      React.useEffect(() => {
        if (!introMode) return;
        const onSlide = () => setFlowReady(true);
        window.addEventListener("intro-slide-up", onSlide);
        // Fallback: if the event never fires (loader skipped, browser issue),
        // start the cascade after 4s anyway so the hero never sits empty.
        const fallback = setTimeout(() => setFlowReady(true), 4000);
        return () => {
          window.removeEventListener("intro-slide-up", onSlide);
          clearTimeout(fallback);
        };
      }, [introMode]);

      // Render children plain inside .hero-flow once flowReady is true,
      // or wrapped in <Reveal> on return visits.
      const useFlow = introMode && flowReady;
      const Step = ({ delay, children }) =>
        introMode ? <>{children}</> : <Reveal delay={delay}>{children}</Reveal>;

      const eyebrow = (
        <p className="font-hand text-2xl md:text-3xl text-brick mb-3">
          namaskaaram, friend &#10026;
        </p>
      );
      const headline = (
        <h1 className="font-display font-extrabold text-ink leading-[1.02] tracking-tight text-5xl md:text-7xl lg:text-[5.5rem]">
          Websites that feel <br className="hidden sm:block" />
          like <Squiggle className="italic">home</Squiggle>.
        </h1>
      );
      const lede = (
        <p className="mt-7 max-w-xl text-base md:text-xl text-ink2 leading-relaxed">
          Hi, we're <span className="font-bold text-leaf">Aana Pappan</span> - a tiny
          two-person studio (just <span className="font-bold">Adarsh</span> &amp; <span className="font-bold">Paramesh</span>)
          building cosy, fast websites for shops, freelancers, and friends-of-friends.
          No jargon, no fluff, no "synergy". Just good work, on time.
        </p>
      );
      const buttons = (
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#contact" className="press group inline-flex items-center gap-2 bg-brick hover:bg-brick2 text-cream font-bold text-lg px-7 py-4 rounded-full shadow-warm">
            Start a project
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
          </a>
          <a href="#process" className="press inline-flex items-center gap-2 text-ink2 hover:text-leaf font-bold text-lg px-4 py-4">
            See how we work
          </a>
        </div>
      );
      const status = (
        <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-semibold text-ink2">
          <span className="inline-flex items-center gap-2">
            <span className="relative w-2.5 h-2.5 rounded-full bg-leaf2 ping-soft text-leaf2"></span>
            Taking <span className="font-extrabold text-leaf tabular-nums"><CountUp to={SITE_CONFIG.slotsOpen} duration={900} /></span> new project{SITE_CONFIG.slotsOpen === 1 ? "" : "s"} this month
          </span>
          <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-turmeric"></span> Based in Kochi &middot; works worldwide</span>
          <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-brick"></span> Fresh studio, ready to build</span>
        </div>
      );

      const scrollHint = (
        <div className="mt-10 scroll-hint">
          <span className="scan-line"></span>
          scroll to explore
        </div>
      );

      return (
      <section id="top" className="relative overflow-hidden paper">
        <div ref={palmLeftRef} className="palm-parallax hidden md:block absolute top-20 md:top-24 left-4 md:left-12">
          <PalmTree className="w-28 md:w-40 opacity-90 float-sway-slow" style={{ "--r": "-8deg" }} />
        </div>
        <div ref={palmRightRef} className="palm-parallax hidden md:block absolute top-56 md:top-72 right-4 md:right-12">
          <PalmTree className="w-24 md:w-36 opacity-80 float-sway-mid" style={{ "--r": "10deg" }} />
        </div>

        {/* Phone-only palm + sparkles: palm anchors the top-right corner,
            sparkles fill the awkward horizontal gap between the headline
            and the palm. */}
        <div className="md:hidden absolute top-4 right-2 z-0">
          <PalmTree className="w-16 opacity-70 float-sway-slow" style={{ "--r": "14deg" }} />
        </div>
        <SparkDeco className="md:hidden absolute top-12 right-24 w-5 h-5 text-turmeric opacity-65 float-mid z-0" />
        <SparkDeco className="md:hidden absolute top-28 right-16 w-3 h-3 text-brick opacity-50 float-slow z-0" />

        <div className={`relative max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-20 md:pb-28 ${useFlow ? "hero-flow" : ""}`}>
          <Step delay={0}>{eyebrow}</Step>
          <Step delay={120}>{headline}</Step>
          <Step delay={240}>{lede}</Step>
          <Step delay={360}>{buttons}</Step>
          <Step delay={480}>{status}</Step>
          <Step delay={600}>{scrollHint}</Step>
        </div>

        <KasavuBorder className="w-full h-6" />
      </section>
      );
    };

    /* =======================================================
       Services
       ======================================================= */
    const ServiceCard = ({ icon, title, tagline, points, accent, delay }) => (
      <Reveal delay={delay}>
        <article className={`svc-card group relative bg-white rounded-blob p-7 md:p-8 shadow-soft border-2 ${accent} h-full`}>
          <div className="svc-icon text-5xl mb-5 inline-block">{icon}</div>
          <h3 className="font-display font-bold text-3xl text-ink mb-2 tracking-tight">{title}</h3>
          <p className="font-hand text-2xl text-brick mb-5">{tagline}</p>
          <ul className="space-y-2.5">
            {points.map(p => (
              <li key={p} className="flex items-start gap-3 text-ink2">
                <span className="mt-2 inline-block w-2 h-2 rounded-full bg-turmeric flex-shrink-0"></span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <span className="svc-arrow absolute top-7 right-7 text-2xl text-brick" aria-hidden>&rarr;</span>
        </article>
      </Reveal>
    );

    const PencilIcon = () => (
      <svg viewBox="0 0 64 64" className="w-14 h-14"><path d="M14 50 L 18 38 L 44 12 L 52 20 L 26 46 L 14 50 Z" fill="#E8B23A" stroke="#2A1F14" strokeWidth="2.5" strokeLinejoin="round"/><path d="M40 16 L 48 24" stroke="#2A1F14" strokeWidth="2.5"/><path d="M14 50 L 22 47" stroke="#2A1F14" strokeWidth="2.5" strokeLinecap="round"/></svg>
    );
    const CodeIcon = () => (
      <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none"><rect x="6" y="12" width="52" height="40" rx="6" fill="#1F4D2A" stroke="#2A1F14" strokeWidth="2.5"/><path d="M22 28 L 14 36 L 22 44" stroke="#FBF4E2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M42 28 L 50 36 L 42 44" stroke="#FBF4E2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M36 24 L 28 48" stroke="#E8B23A" strokeWidth="3" strokeLinecap="round"/></svg>
    );
    const SparkIcon = () => (
      <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none"><path d="M32 6 L 36 26 L 56 30 L 36 34 L 32 54 L 28 34 L 8 30 L 28 26 Z" fill="#C0533B" stroke="#2A1F14" strokeWidth="2.5" strokeLinejoin="round"/></svg>
    );
    // Decorative spark — used for background flourishes. className controls
    // size and color; defaults to small + turmeric so it reads as a sparkle, not an icon.
    const SparkDeco = ({ className = "w-6 h-6 text-turmeric" }) => (
      <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-hidden="true">
        <path d="M32 6 L 36 26 L 56 30 L 36 34 L 32 54 L 28 34 L 8 30 L 28 26 Z" />
      </svg>
    );

    const Services = () => {
      const titleRef = useInViewClass("is-in");
      return (
      <section id="services" className="relative py-20 md:py-28 overflow-hidden">
        {/* decorative motifs - subtle, far edges only */}
        <PalmTree className="absolute top-12 right-0 w-20 md:w-28 opacity-20 float-sway-slow" style={{ "--r": "12deg" }} />
        <SparkDeco className="hidden md:block absolute top-1/3 left-4 w-5 h-5 text-turmeric opacity-40 float-slow" />
        <SparkDeco className="hidden md:block absolute bottom-12 right-1/4 w-4 h-4 text-brick opacity-30 float-mid" />
        <SparkDeco className="hidden md:block absolute top-24 left-1/3 w-3 h-3 text-leaf opacity-30 float-slow" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
              <div>
                <p className="font-hand text-2xl text-brick mb-1">what we do, simply put</p>
                <h2 ref={titleRef} className="section-title-grow font-display font-extrabold text-4xl md:text-5xl text-ink tracking-tight">
                  Two things, done <Squiggle>properly</Squiggle>.
                </h2>
              </div>
              <p className="max-w-md text-ink2 leading-relaxed">
                No bloated packages, no upsells. Pick what you need - or call us first
                and we'll figure it out together over a cup of chaaya.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <ServiceCard
              delay={0}
              icon={<CodeIcon />}
              title="Web Development"
              tagline="the engine room"
              accent="border-leaf/15"
              points={[
                "Custom sites in React, Next.js, or simple HTML - whatever fits",
                "Fast loads, clean code, comments your future dev will thank us for",
                "WhatsApp / Instagram integration, payments, contact forms",
                "We'll teach your team how to update it. No ransom situations.",
              ]}
            />
            <ServiceCard
              delay={150}
              icon={<PencilIcon />}
              title="Web Design"
              tagline="the look & feel"
              accent="border-turmeric/30"
              points={[
                "Layouts that work even on a 5-year-old phone over hostel WiFi",
                "Colour, type, and small touches that match your story",
                "Logo cleanup, social banners, menu cards if you ask nicely",
                "Two rounds of revisions baked in. We'll get there.",
              ]}
            />
          </div>

          <Reveal delay={250}>
            <div className="mt-10 bg-leaf text-cream rounded-blob px-7 md:px-9 py-7 flex flex-wrap items-center gap-5 justify-between shadow-soft">
              <div className="flex items-center gap-4">
                <SparkIcon />
                <div>
                  <p className="font-display font-bold text-xl">Need both? Even better.</p>
                  <p className="text-cream/80">Design + dev as one calm conversation, one invoice.</p>
                </div>
              </div>
              <a href="#contact" className="press bg-turmeric hover:bg-turmeric2 text-ink font-bold px-6 py-3 rounded-full whitespace-nowrap">
                Tell us about it
              </a>
            </div>
          </Reveal>
        </div>
      </section>
      );
    };

    /* =======================================================
       TechChip - hand-drawn themed icons for each stack item
       ======================================================= */
    const techIcons = {
      "React": (
        // banana-leaf riff (oval with central vein + ribs)
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
          <ellipse cx="12" cy="12" rx="9" ry="5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 12 H 21" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7 9 L 9 12 M 11 8 L 13 12 M 15 9 L 17 12" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
          <circle cx="12" cy="12" r="1.4" fill="currentColor"/>
        </svg>
      ),
      "Next.js": (
        // paper boat
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
          <path d="M3 14 L 21 14 L 17 19 L 7 19 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15"/>
          <path d="M12 14 L 12 5 L 20 13" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.25"/>
          <path d="M5 17 Q 7 16, 9 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        </svg>
      ),
      "Tailwind": (
        // single mango leaf
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
          <path d="M5 17 C 5 9, 12 4, 20 5 C 19 13, 13 18, 5 17 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M5 17 C 9 14, 14 10, 19 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      ),
      "WordPress (when needed)": (
        // clay pot (chembu)
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
          <path d="M6 9 L 18 9 L 17 19 C 17 20, 16 21, 14 21 L 10 21 C 8 21, 7 20, 7 19 Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M5 9 L 19 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M9 6 Q 12 3, 15 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
          <path d="M9 13 H 15" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
          <path d="M8.5 16 H 15.5" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        </svg>
      ),
      "Framer": (
        // hand-drawn picture frame with corner mark
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="7" y="7" width="10" height="10" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
          <circle cx="9" cy="9" r="0.9" fill="currentColor"/>
          <path d="M7 16 L 11 12 L 13 14 L 17 9" stroke="currentColor" strokeWidth="1" opacity="0.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      "Plain HTML & love": (
        // little heart with sparkle
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
          <path d="M12 19 C 6 14, 3 11, 4 8 C 5 5, 9 5, 12 8 C 15 5, 19 5, 20 8 C 21 11, 18 14, 12 19 Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M18 4 L 18.6 5.4 L 20 6 L 18.6 6.6 L 18 8 L 17.4 6.6 L 16 6 L 17.4 5.4 Z" fill="currentColor"/>
        </svg>
      ),
    };

    const TechChip = ({ label }) => (
      <span className="chip-pop inline-flex items-center gap-2 bg-white border-2 border-leaf/15 text-ink2 font-semibold pl-2.5 pr-4 py-1.5 rounded-full hover:border-brick hover:text-brick cursor-default">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cream2 text-leaf">
          {techIcons[label]}
        </span>
        {label}
      </span>
    );

    /* =======================================================
       About
       ======================================================= */
    const PersonCard = ({ name, role, init, accent, rotate, hand, motif }) => {
      const tiltRef = useMouseTilt(6);
      return (
        <div className="parallax-card bg-white rounded-blob p-2 shadow-soft inline-block" ref={tiltRef} style={{ transform: `rotate(${rotate}deg)` }}>
          <div className={`parallax-inner ${accent} rounded-[26px] w-full aspect-[4/5] flex items-center justify-center text-cream relative overflow-hidden`}>
            <PalmTree className="absolute -bottom-4 -right-4 w-24 opacity-40" />
            {motif && (
              <div className="absolute top-3 left-3 w-12 h-12 opacity-65 text-cream pointer-events-none">
                {motif}
              </div>
            )}
            <div className="text-center px-4 relative">
              <div className="initials-disc w-20 h-20 mx-auto rounded-full bg-cream/15 border-2 border-cream/40 flex items-center justify-center mb-3">
                <span className="font-display font-extrabold text-3xl text-cream">{init}</span>
              </div>
              <p className="font-display font-bold text-2xl leading-tight">{name}</p>
              <p className="font-hand text-xl text-turmeric mt-1">{role}</p>
            </div>
          </div>
          <p className="font-hand text-lg text-ink2 text-center pt-2 pb-1">{hand}</p>
        </div>
      );
    };

    // Hand-drawn role sketches for the person cards. Single-stroke style,
    // currentColor so they inherit cream from the parent.
    const PaletteSketch = () => (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* artist's palette */}
        <path d="M24 8 C 14 8, 6 16, 6 26 C 6 32, 10 36, 16 36 C 18 36, 19 35, 19 33 C 19 31, 21 30, 23 31 C 27 33, 32 32, 36 28 C 42 22, 40 12, 32 9 C 30 8, 27 8, 24 8 Z" />
        {/* paint blobs */}
        <circle cx="14" cy="20" r="2" fill="currentColor" stroke="none"/>
        <circle cx="22" cy="14" r="2" fill="currentColor" stroke="none"/>
        <circle cx="30" cy="18" r="2" fill="currentColor" stroke="none"/>
        {/* brush */}
        <path d="M28 38 L 38 28" />
        <path d="M37 27 L 41 23 L 43 25 L 39 29 Z" fill="currentColor" stroke="none"/>
      </svg>
    );

    const CodeSketch = () => (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* angle brackets / </> */}
        <path d="M16 14 L 6 24 L 16 34" />
        <path d="M32 14 L 42 24 L 32 34" />
        {/* slash through middle */}
        <path d="M28 10 L 20 38" />
      </svg>
    );

    const About = () => {
      const titleRef = useInViewClass("is-in");
      const chipsRef = useInViewClass("is-in");
      return (
      <section id="about" className="relative py-20 md:py-28 bg-cream2/60 overflow-hidden">
        {/* decorative motifs */}
        <PalmTree className="absolute -bottom-2 right-2 w-24 md:w-36 opacity-20 float-sway-mid" style={{ "--r": "-10deg" }} />
        <SparkDeco className="hidden md:block absolute top-16 right-1/3 w-5 h-5 text-turmeric opacity-40 float-mid" />
        <SparkDeco className="hidden md:block absolute top-1/2 left-8 w-4 h-4 text-brick opacity-30 float-slow" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
            <div className="md:col-span-5 relative">
              <div className="grid grid-cols-2 gap-4 md:gap-5 relative">
                <Reveal variant="tilt" className="mt-6">
                  <PersonCard
                    name="Adarsh"
                    role="the design one"
                    init="A"
                    accent="bg-gradient-to-br from-leaf to-leaf2"
                    rotate={-3}
                    hand="— picks every colour"
                    motif={<PaletteSketch />}
                  />
                </Reveal>
                <Reveal variant="tilt" delay={180}>
                  <PersonCard
                    name="Paramesh"
                    role="the dev one"
                    init="P"
                    accent="bg-gradient-to-br from-brick to-brick2"
                    rotate={3}
                    hand="— will fix your build"
                    motif={<CodeSketch />}
                  />
                </Reveal>
              </div>
              <Vallam className="hidden md:block absolute -bottom-12 -left-2 w-44 text-leaf opacity-80" />
              <p className="hidden md:block absolute -top-4 left-1/2 -translate-x-1/2 font-hand text-2xl text-brick rotate-[-4deg]">
                the two of us &darr;
              </p>
            </div>

            <div className="md:col-span-7">
              <Reveal>
                <p className="font-hand text-2xl text-brick mb-2">a little about us</p>
              </Reveal>
              <Reveal delay={100}>
                <h2 ref={titleRef} className="section-title-grow font-display font-extrabold text-4xl md:text-5xl text-ink tracking-tight mb-6">
                  We make websites the way <br/>our <span className="italic">amma</span> makes sambar.
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <div className="space-y-5 text-lg text-ink2 leading-relaxed">
                  <p>
                    Slowly, with care, and only the ingredients that actually belong.
                    We started Aana Pappan in 2026 after years of working at bigger
                    studios and feeling like the warmth had been outsourced. So we set
                    up shop in Kochi, just the two of us, and started making things again.
                  </p>
                  <p>
                    <span className="font-bold text-leaf">Adarsh</span> does the design -
                    layouts, type, the small drawings you'll find tucked into corners.
                    <span className="font-bold text-brick"> Paramesh</span>
                    {" "} writes the code - React,
                    Next.js, the boring database bits. We meet in the middle, argue gently, and ship.
                  </p>
                  <p>
                    We're a brand-new studio, which means two things: <span className="font-semibold">one</span>,
                    you'll get our full attention. <span className="font-semibold">Two</span>, we'll go
                    out of our way to make your project something we can be proud of.
                    Early-bird pricing while we build our portfolio.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div ref={chipsRef} className="stagger-grid mt-8 flex flex-wrap gap-3">
                  {["React", "Next.js", "Tailwind", "WordPress (when needed)", "Framer", "Plain HTML & love"].map(t => (
                    <TechChip key={t} label={t} />
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      );
    };

    /* =======================================================
       Process - interactive click-through timeline
       (replaces Work, since we're a new studio with no portfolio yet)
       ======================================================= */
    const steps = [
      {
        n: "01",
        title: "A first chaaya",
        sub: "30-min call, no charge",
        body:
          "You tell us what you're building, who it's for, and what's been frustrating you about getting started. We mostly listen. By the end, we'll know if we're a good fit.",
        chip: "day 1",
      },
      {
        n: "02",
        title: "A small written plan",
        sub: "scope, timeline, fixed price",
        body:
          "We send a one-pager: what we'll build, what we won't, when you'll see it, what it costs. No surprises later. If anything feels off, we rewrite it together.",
        chip: "day 1–2",
      },
      {
        n: "03",
        title: "Design first, in the open",
        sub: "Adarsh leads, you watch",
        body:
          "You see designs as they happen - not days later in a big reveal. Two rounds of feedback baked in. We'd rather show ugly drafts early than polished things you don't love.",
        chip: "day 3–6",
      },
      {
        n: "04",
        title: "Build, test, repeat",
        sub: "Paramesh leads, you check in",
        body:
          "Code lives on a staging link from day one. You can poke at it from your phone any time. Quick check-ins every couple of days, only if you want them.",
        chip: "day 7–12",
      },
      {
        n: "05",
        title: "Launch product & hands off",
        sub: "plus 30 days of small fixes",
        body:
          "We ship it on day 14, walk you through editing it yourself, and stay on call for a month for typos, tweaks, and “wait, can it also do this?”. After that, support is a friendly WhatsApp away.",
        chip: "day 14+",
      },
    ];

    const Process = () => {
      const [active, setActive] = React.useState(0);
      const titleRef = useInViewClass("is-in");
      return (
        <section id="process" className="relative py-20 md:py-28 overflow-hidden">
          {/* decorative motifs */}
          <PalmTree className="absolute top-8 left-0 w-24 md:w-32 opacity-20 float-sway-slow" style={{ "--r": "-15deg" }} />
          <SparkDeco className="hidden md:block absolute bottom-20 left-1/4 w-4 h-4 text-turmeric opacity-35 float-slow" />
          <SparkDeco className="hidden md:block absolute top-24 right-12 w-5 h-5 text-brick opacity-30 float-mid" />
          <SparkDeco className="hidden md:block absolute top-1/2 right-1/3 w-3 h-3 text-leaf opacity-30 float-slow" />
          <div className="relative max-w-6xl mx-auto px-5 md:px-8">
            <Reveal>
              <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
                <div>
                  <p className="font-hand text-2xl text-brick mb-1">how we work, step by step</p>
                  <h2 ref={titleRef} className="section-title-grow font-display font-extrabold text-4xl md:text-5xl text-ink tracking-tight">
                    Five steps, no <Squiggle>scary</Squiggle> bits.
                  </h2>
                </div>
                <p className="max-w-md text-ink2 leading-relaxed">
                  Hover a step to read more. We follow this for every project,
                  whether it's a one-page menu site or a full e-commerce build.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-12 gap-6 md:gap-10">
              {/* steps list */}
              <div
                className="md:col-span-7 space-y-3"
                onMouseLeave={() => setActive(-1)}
              >
                {steps.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <Reveal key={s.n} delay={i * 90}>
                      <button
                        onClick={() => setActive(i)}
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        className={`relative w-full text-left rounded-blob border-2 px-5 md:px-7 py-5 transition-all duration-300 press ${
                          isActive
                            ? "bg-leaf text-cream border-leaf shadow-warm"
                            : "bg-white text-ink border-ink/10 hover:border-brick"
                        }`}
                      >
                        {isActive && (
                          <span
                            key={`pulse-${active}`}
                            aria-hidden
                            className="active-pulse pointer-events-none absolute inset-0 rounded-blob"
                          />
                        )}
                        <div className="flex items-center gap-5">
                          <span className={`flap-in font-display font-extrabold text-3xl md:text-4xl tabular-nums ${isActive ? "text-turmeric" : "text-brick"}`} style={{ animationDelay: `${i * 90 + 200}ms` }}>
                            {s.n}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                              <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight">{s.title}</h3>
                              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${isActive ? "bg-cream/15 text-cream" : "bg-cream2 text-ink2"}`}>
                                {s.chip}
                              </span>
                            </div>
                            <p className={`font-hand text-lg ${isActive ? "text-turmeric" : "text-brick"}`}>{s.sub}</p>
                          </div>
                          <span
                            aria-hidden
                            className={`text-2xl transition-transform duration-300 ${isActive ? "rotate-90" : ""}`}
                          >
                            &rarr;
                          </span>
                        </div>
                        <div
                          className={`overflow-hidden transition-all duration-500 ease-out ${
                            isActive ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0"
                          }`}
                        >
                          {isActive && (
                            <span
                              key={`underline-${active}`}
                              aria-hidden
                              className="block h-[3px] bg-turmeric rounded-full mb-3 w-20 underline-grow process-active"
                            />
                          )}
                          <p className={`leading-relaxed ${isActive ? "text-cream/90" : "text-ink2"}`}
                            dangerouslySetInnerHTML={{ __html: s.body }}
                          />
                        </div>
                      </button>
                    </Reveal>
                  );
                })}
              </div>

              {/* sticky panel - monthly capacity */}
              <div className="md:col-span-5">
                <Reveal delay={150}>
                  <div className="sticky top-24 bg-cream2/70 rounded-blob p-7 md:p-8 border-2 border-turmeric/30">
                    <p className="font-hand text-2xl text-brick mb-1">how we keep quality up</p>
                    <h3 className="font-display font-extrabold text-3xl text-ink tracking-tight">
                      Three projects a month, <span className="italic">no more.</span>
                    </h3>
                    <p className="mt-4 text-ink2 leading-relaxed">
                      We cap ourselves at three new projects per month. It's the only way
                      to give every site the time and care it deserves - real attention,
                      not a queue. When the slots are full, we tell you straight.
                    </p>

                    <p className="mt-5 mb-2 font-mono text-xs uppercase tracking-wider text-steel">
                      this month — {SITE_CONFIG.monthlySlots.filter(s => s.taken).length} of {SITE_CONFIG.monthlySlots.length} booked
                    </p>
                    <ul className="space-y-3">
                      {SITE_CONFIG.monthlySlots.map((slot) => (
                        <li
                          key={slot.n}
                          className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 ${
                            slot.taken
                              ? "bg-white/60 border-ink/10 text-ink2"
                              : "bg-white border-leaf/30 text-ink"
                          }`}
                        >
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center font-display font-extrabold text-sm ${slot.taken ? "bg-ink/10 text-ink2 line-through" : "bg-leaf text-cream"}`}>
                            {slot.n}
                          </span>
                          <span className="font-semibold text-sm">{slot.label}</span>
                        </li>
                      ))}
                    </ul>

                    <a href="#contact" className="press mt-6 inline-flex items-center gap-2 bg-brick hover:bg-brick2 text-cream font-bold px-6 py-3 rounded-full shadow-soft">
                      Claim a slot <span aria-hidden>&rarr;</span>
                    </a>
                    <p className="mt-3 text-sm text-ink2/80">
                      No obligation. We'll just have a chat first.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      );
    };

    /* =======================================================
       FAQ - common things people ask before reaching out
       ======================================================= */
    const FAQ_ITEMS = [
      {
        q: "How much will my website cost?",
        a: "Honestly - we can't say without knowing what you need. A single landing page is very different from a site with a backend, dashboards, and a database. Tell us what you're after and we'll send you a fixed price within a day. No moving targets, no \"plus tax\" surprises.",
      },
      {
        q: "What if I don't like what you build?",
        a: "Then you don't pay. Simple as that. We design and build first, show it to you, and only ask for payment once you've seen it and you're happy. If it's not right, we either fix it or we part ways - no money exchanged. We figure that's how it should be when you're trusting strangers with your idea.",
      },
      {
        q: "How long does it take?",
        a: "Most projects ship in about 2 weeks from the day we start. The first day or two we plan together, then design happens days 3–6, building happens days 7–12, and we go live around day 14. Bigger projects can take longer - we'll always tell you the timeline upfront and stick to it.",
      },
      {
        q: "What if I don't know exactly what I want?",
        a: "Most people don't, and that's completely fine. The first call is a 30-minute chaaya chat where we figure it out together. You don't need to come prepared with a brief or a Pinterest board - just tell us what you're trying to do, and we'll ask the rest of the questions.",
      },
      {
        q: "Will I be able to update the site myself afterwards?",
        a: "Yes. Before we hand over, we'll walk you (or someone on your team) through editing the basics - text, images, prices, opening hours, whatever you'll change often. If you want a full content management setup so you don't ever need to touch code, we can build that in too.",
      },
      {
        q: "Do you handle the domain, hosting, and email?",
        a: "We help you set it all up in your own name. You'll own your domain, your hosting account, and your email - we just walk you through buying them and getting everything connected. That way you're not locked in to us. (If you'd rather not deal with any of it, we can host it for you on a small monthly fee - just ask.)",
      },
      {
        q: "Is no project too small?",
        a: "Nope - whether it's a single-page portfolio or a full backend with databases, we treat them the same. Same care, same honesty, same timelines. The only thing that changes is the scope and the price.",
      },
      {
        q: "I'm not in Kerala or India - can you still help?",
        a: "Of course. We work with people anywhere in the world. We're based in Kochi but everything happens over email, WhatsApp, or video calls. Time zones haven't been a problem so far.",
      },
    ];

    const Faq = () => {
      const titleRef = useInViewClass("is-in");
      const [open, setOpen] = React.useState(null); // index of currently open item, or null
      return (
        <section id="faq" className="relative py-20 md:py-28 bg-leaf text-cream overflow-hidden">
          {/* subtle decorations - cream/turmeric on green */}
          <SparkDeco className="hidden md:block absolute top-16 left-8 w-4 h-4 text-turmeric opacity-50 float-slow" />
          <SparkDeco className="hidden md:block absolute bottom-20 right-12 w-5 h-5 text-cream opacity-30 float-mid" />
          <PalmTree className="absolute top-12 right-4 w-24 md:w-32 opacity-15 float-sway-slow" style={{ "--r": "10deg" }} />
          <PalmTree className="absolute bottom-8 left-4 w-20 md:w-28 opacity-15 float-sway-mid" style={{ "--r": "-12deg" }} />

          <div className="relative max-w-4xl mx-auto px-5 md:px-8">
            <Reveal>
              <p className="font-hand text-2xl text-turmeric mb-1">questions before you write to us</p>
              <h2 ref={titleRef} className="section-title-grow font-display font-extrabold text-4xl md:text-5xl text-cream tracking-tight mb-3">
                Things people often ask.
              </h2>
              <p className="text-cream/85 max-w-2xl mb-10 leading-relaxed">
                We've answered the most common ones below. If yours isn't here,
                ask us directly - we read every message.
              </p>
            </Reveal>

            <ul className="space-y-3">
              {FAQ_ITEMS.map((item, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={i} delay={i * 50}>
                    <li className={`bg-cream rounded-2xl border-2 transition-colors ${isOpen ? "border-turmeric" : "border-transparent"}`}>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="w-full text-left flex items-start gap-4 px-5 md:px-6 py-4 md:py-5 group"
                      >
                        <span
                          aria-hidden
                          className={`mt-1 inline-flex items-center justify-center w-7 h-7 rounded-full font-display font-extrabold text-lg shrink-0 transition-all ${
                            isOpen ? "bg-brick text-cream rotate-45" : "bg-leaf/15 text-leaf group-hover:bg-turmeric/30"
                          }`}
                        >
                          +
                        </span>
                        <span className="font-display font-bold text-lg md:text-xl text-ink leading-snug flex-1">
                          {item.q}
                        </span>
                      </button>
                      <div className={`overflow-hidden transition-all duration-400 ease-out ${isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
                        <p className="px-5 md:px-6 pb-5 md:pb-6 pl-16 md:pl-[68px] text-ink2 leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={200}>
              <p className="mt-10 text-center font-hand text-2xl text-cream">
                Still wondering something? <a href="#contact" className="grow-underline text-turmeric font-bold">Just ask us &rarr;</a>
              </p>
            </Reveal>
          </div>
        </section>
      );
    };

    /* =======================================================
       Contact
       ======================================================= */
    const Contact = () => {
      // ----------------------------------------------------------
      // Paste your Web3Forms access key here.
      // Get one free at https://web3forms.com (no signup, just email).
      // ----------------------------------------------------------
      const WEB3FORMS_ACCESS_KEY = "9763eaac-fc52-475a-b594-258c6b25396f";

      const [status, setStatus] = React.useState("idle"); // idle | sending | sent | error
      const [errorMsg, setErrorMsg] = React.useState("");

      const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");
        setErrorMsg("");

        const formEl = e.target;
        const data = new FormData(formEl);

        // Honeypot — if a bot fills this, bail silently and pretend it sent.
        if (data.get("botcheck")) {
          setStatus("sent");
          return;
        }

        try {
          const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { Accept: "application/json" },
            body: data,
          });
          const json = await res.json();
          if (json.success) {
            setStatus("sent");
            formEl.reset();
          } else {
            setStatus("error");
            setErrorMsg(json.message || "Something went wrong. Try WhatsApp?");
          }
        } catch (err) {
          setStatus("error");
          setErrorMsg("Couldn't reach the server. Check your connection, or ping us on WhatsApp.");
        }
      };

      const sending = status === "sending";
      const sent = status === "sent";
      const errored = status === "error";

      return (
        <section id="contact" className="relative py-20 md:py-28 paper overflow-hidden">
          {/* subtle decorative motifs - now on cream */}
          <SparkDeco className="hidden md:block absolute top-16 left-12 w-5 h-5 text-turmeric opacity-50 float-slow" />
          <SparkDeco className="hidden md:block absolute bottom-20 right-16 w-4 h-4 text-brick opacity-40 float-mid" />
          <PalmTree className="absolute top-10 right-2 w-20 md:w-28 opacity-25 float-sway-slow" style={{ "--r": "10deg" }} />

          <div className="relative max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-10 md:gap-14">
            <div className="md:col-span-5">
              <Reveal>
                <div className="flex items-end gap-3 mb-2">
                  <ChaayaCup className="w-14 h-16 -mb-1" />
                  <p className="font-hand text-2xl text-brick">come, sit down</p>
                </div>
                <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink tracking-tight leading-[1.05]">
                  Let's chat over <br/>chaaya.
                </h2>
                <p className="mt-5 text-ink2 text-base md:text-lg leading-relaxed max-w-md">
                  Drop a line about your project - even a one-liner is fine. We read everything,
                  and we'll get back within a working day. Promise.
                </p>
              </Reveal>

              <Reveal delay={150}>
                <div className="mt-8 space-y-4">
                  <a href="mailto:support.aanapappan@gmail.com" className="flex items-center gap-4 group">
                    <span className="w-11 h-11 rounded-full bg-leaf/10 text-leaf group-hover:bg-leaf group-hover:text-cream flex items-center justify-center font-bold text-lg transition-colors">@</span>
                    <span className="font-bold text-base md:text-lg text-ink group-hover:text-leaf transition-colors break-all">support.aanapappan@gmail.com</span>
                  </a>
                  <a href="https://wa.me/917387342745" className="flex items-center gap-4 group">
                    <span className="w-11 h-11 rounded-full bg-leaf/10 text-leaf group-hover:bg-leaf group-hover:text-cream flex items-center justify-center font-bold text-lg transition-colors">w</span>
                    <span className="font-bold text-base md:text-lg text-ink group-hover:text-leaf transition-colors">WhatsApp &middot; +91 73873 42745</span>
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={100} className="md:col-span-7">
              <form
                onSubmit={handleSubmit}
                action="https://api.web3forms.com/submit"
                method="POST"
                className="bg-white rounded-blob p-7 md:p-9 text-ink shadow-warm border-4 border-turmeric"
              >
                {/* Web3Forms hidden fields */}
                <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                <input type="hidden" name="subject" value="New project enquiry — Aana Pappan" />
                <input type="hidden" name="from_name" value="Aana Pappan website" />
                {/* Honeypot — real humans don't fill this; bots usually do. */}
                <input type="checkbox" name="botcheck" tabIndex="-1" autoComplete="off" style={{ display: "none" }} />

                {sent ? (
                  <div className="py-10 text-center">
                    <div className="relative inline-block mb-4">
                      <span className="burst-ring" aria-hidden></span>
                      <span className="burst-ring" style={{ animationDelay: "0.18s" }} aria-hidden></span>
                      <div className="text-5xl float-mid"><SparkIcon /></div>
                    </div>
                    <h3 className="font-display font-extrabold text-3xl mb-2">Got it - kollam!</h3>
                    <p className="text-ink2 max-w-sm mx-auto">
                      We'll write back within a working day. Until then, your idea's in good hands.
                    </p>
                    <button type="button" onClick={() => setStatus("idle")} className="press mt-6 text-brick font-bold underline underline-offset-4">
                      send another
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="font-hand text-2xl text-brick mb-1">a few quick details</p>
                    <h3 className="font-display font-extrabold text-3xl tracking-tight mb-6">
                      Tell us about your idea.
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="block">
                        <span className="font-bold text-sm text-ink2">Your name</span>
                        <input type="text" name="name" required placeholder="e.g. Reema" className="mt-1.5 w-full focus-ring rounded-2xl border-2 border-ink/10 focus:border-leaf bg-white px-4 py-3 outline-none font-semibold" />
                      </label>
                      <label className="block">
                        <span className="font-bold text-sm text-ink2">Email or phone</span>
                        <input type="text" name="email" required placeholder="however you prefer" className="mt-1.5 w-full focus-ring rounded-2xl border-2 border-ink/10 focus:border-leaf bg-white px-4 py-3 outline-none font-semibold" />
                      </label>
                    </div>
                    <label className="block mt-4">
                      <span className="font-bold text-sm text-ink2">What kind of project?</span>
                      <div className="mt-1.5 flex flex-wrap gap-2">
                        {["A new website", "Redesign", "Just design", "Just code", "Not sure yet"].map((t, i) => (
                          <label key={t} className="cursor-pointer">
                            <input type="radio" name="project_type" value={t} defaultChecked={i === 0} className="peer sr-only" />
                            <span className="inline-block px-4 py-2 rounded-full border-2 border-ink/10 font-semibold text-ink2 peer-checked:bg-leaf peer-checked:text-cream peer-checked:border-leaf transition-colors whitespace-nowrap hover:border-brick">
                              {t}
                            </span>
                          </label>
                        ))}
                      </div>
                    </label>
                    <label className="block mt-4">
                      <span className="font-bold text-sm text-ink2">A little about it</span>
                      <textarea name="message" rows="4" required placeholder="What is it, who's it for, when do you need it? Or just say hi." className="mt-1.5 w-full focus-ring rounded-2xl border-2 border-ink/10 focus:border-leaf bg-white px-4 py-3 outline-none font-semibold resize-none" />
                    </label>

                    {errored && (
                      <div className="mt-4 px-4 py-3 rounded-2xl bg-brick/10 border-2 border-brick/20 text-brick2 font-semibold text-sm">
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      className="press mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brick hover:bg-brick2 disabled:opacity-60 disabled:cursor-not-allowed text-cream font-bold text-lg px-7 py-4 rounded-full shadow-soft"
                    >
                      {sending ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-cream/40 border-t-cream rounded-full animate-spin" aria-hidden></span>
                          Sending...
                        </>
                      ) : (
                        <>Send it across <span aria-hidden>&rarr;</span></>
                      )}
                    </button>
                    <p className="mt-3 text-sm text-ink2/80">
                      Or just shoot a WhatsApp - we're faster there, honestly.
                    </p>
                  </>
                )}
              </form>
            </Reveal>
          </div>
        </section>
      );
    };

    /* =======================================================
       Footer
       ======================================================= */
    const Footer = () => (
      <footer className="relative bg-cream pt-12 pb-8 overflow-hidden">
        <KasavuBorder className="w-full h-6 mb-10" />
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Elephant className="w-12 h-12" />
              <div>
                <p className="font-display font-extrabold text-xl text-ink tracking-tight">Aana Pappan</p>
                <p className="font-hand text-lg text-brick leading-none">made slowly, in Kochi</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-semibold text-ink2">
              <a href="#services" className="grow-underline hover:text-brick transition-colors">What we do</a>
              <a href="#about" className="grow-underline hover:text-brick transition-colors">About us</a>
              <a href="#process" className="grow-underline hover:text-brick transition-colors">How we work</a>
              <a href="#faq" className="grow-underline hover:text-brick transition-colors">FAQ</a>
              <a href="#contact" className="grow-underline hover:text-brick transition-colors">Contact us</a>
            </div>
          </div>

          <div className="dots my-8 opacity-50"></div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-ink2/80">
            <p>© {new Date().getFullYear()} Aana Pappan · all rights reserved </p>
            <p className="font-hand text-xl text-leaf">വരൂ, വീണ്ടും വരൂ. ✦  come again soon.</p>
          </div>
        </div>
      </footer>
    );

    /* =======================================================
       App
       ======================================================= */
    /* =======================================================
       IntroLoader — portfolio-style progress bar takeover.
       Bar fills (faster early, slower late, like real loading);
       "Welcome" fades in at 30%; whole loader slides up at 100%.
       Plays once per session.
       ======================================================= */
    const IntroLoader = () => {
      const [show, setShow] = React.useState(() => {
        try {
          if (typeof sessionStorage === "undefined") return true;
          if (sessionStorage.getItem("seen-intro") === "1") return false;
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
        } catch (_) {}
        return true;
      });
      const [welcomed, setWelcomed] = React.useState(false);
      const [done, setDone] = React.useState(false);

      React.useEffect(() => {
        if (!show) return;
        try { sessionStorage.setItem("seen-intro", "1"); } catch (_) {}

        // Show "Welcome" almost immediately so the loader has something to read.
        const welcomeTimer = setTimeout(() => setWelcomed(true), 200);
        // Total loader duration: 2.4s of elephants, then slide up.
        const doneTimer = setTimeout(() => {
          setDone(true);
          // Fire as the slide begins so hero animates in while loader leaves.
          window.dispatchEvent(new CustomEvent("intro-slide-up"));
        }, 2400);
        const removeTimer = setTimeout(() => setShow(false), 3200);

        return () => {
          clearTimeout(welcomeTimer);
          clearTimeout(doneTimer);
          clearTimeout(removeTimer);
        };
      }, [show]);

      if (!show) return null;
      return (
        <div id="intro-loader" className={done ? "done" : ""} aria-hidden="true">
          <div className={`loader-welcome ${welcomed ? "visible" : ""}`}>namaskaaram</div>
          <div className="loader-procession" aria-label="Loading">
            <Elephant />
            <Elephant />
            <Elephant />
          </div>
          <div className="loader-name">Aana Pappan</div>
          <div className="loader-role">cosy websites &middot; made in Kochi</div>
        </div>
      );
    };

    /* =======================================================
       Ambient layers (orbs + cursor glow). Mounted once at root.
       ======================================================= */
    const AmbientLayers = () => {
      return (
        <>
          <div className="orb orb1" aria-hidden="true"></div>
          <div className="orb orb2" aria-hidden="true"></div>
          <div className="orb orb3" aria-hidden="true"></div>
        </>
      );
    };

    /* =======================================================
       useInViewClass — adds a CSS class when the ref enters view.
       Used by section-title-grow and stagger-grid. One-shot.
       ======================================================= */
    const useInViewClass = (className = "is-in", threshold = 0.2) => {
      const ref = React.useRef(null);
      React.useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let io;
        try {
          io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
              if (e.isIntersecting) {
                el.classList.add(className);
                io.unobserve(el);
              }
            });
          }, { threshold });
          io.observe(el);
        } catch (_) {
          el.classList.add(className);
        }
        return () => { if (io) io.disconnect(); };
      }, [className, threshold]);
      return ref;
    };

    const App = () => {
      const [introDone, setIntroDone] = React.useState(() => {
        try {
          if (typeof sessionStorage === "undefined") return true;
          if (sessionStorage.getItem("seen-intro") === "1") return true;
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
        } catch (_) {}
        return false;
      });
      // First-visit-of-session flag drives the staged hero entrance.
      const introMode = !introDone;
      return (
        <>
          <IntroLoader />
          <AmbientLayers />
          <Nav />
          <main>
            <Hero introMode={introMode} />
            <Services />
            <Marquee items={[
              "chaaya breaks",
              "honest invoices",
              "fast websites",
              "no jargon",
              "made in Kochi",
              "shipped on time",
              "two humans, no bots",
              "kindness as a feature",
            ]} />
            <About />
            <KasavuBorder className="w-full h-6" />
            <Process />
            <KasavuBorder className="w-full h-6" />
            <Contact />
            <KasavuBorder className="w-full h-6" />
            <Faq />
          </main>
          <Footer />
        </>
      );
    };

    createRoot(document.getElementById("root")).render(<App />);
