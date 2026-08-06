(function () {
  "use strict";

  var canvas = document.getElementById("field");
  var ctx = canvas.getContext("2d");
  var cursorPlus = document.getElementById("cursorPlus");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  var ARROW_COLOR = "#5b9bff";
  var CELL = 30;
  var ARROW_LEN = 11;
  var ALPHA = 0.42;

  // Cloud-like coverage: two octaves of value noise sampled per cell, slowly
  // translated over time. A cell is either drawn or it isn't — no per-cell
  // alpha fade — so the field reads as a noise map where arrows switch on and
  // off at the drifting cloud edge, not as soft static blobs.
  var NOISE_SCALE = 0.0048;
  var NOISE_THRESHOLD = 0.63;
  var DRIFT_SPEED_X = 0.000018;
  var DRIFT_SPEED_Y = 0.000011;

  // Magnetic-field scatter: cells within FIELD_RADIUS of the cursor are pushed
  // radially outward, like iron filings parting around a pole, while still
  // pointing at it. Falls off to zero displacement beyond FIELD_RADIUS.
  var FIELD_RADIUS = 150;
  var MAX_DISPLACE = 16;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var w = 0, h = 0, cells = [];
  var mouse = { x: -9999, y: -9999 };
  var startTime = performance.now();
  var noiseSeed = Math.random() * 10000;

  function hash(ix, iy) {
    var s = Math.sin(ix * 127.1 + iy * 311.7 + noiseSeed) * 43758.5453123;
    return s - Math.floor(s);
  }
  function smooth(t) { return t * t * (3 - 2 * t); }
  function valueNoise(x, y) {
    var ix = Math.floor(x), iy = Math.floor(y);
    var fx = x - ix, fy = y - iy;
    var a = hash(ix, iy), b = hash(ix + 1, iy), c = hash(ix, iy + 1), d = hash(ix + 1, iy + 1);
    var u = smooth(fx), v = smooth(fy);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function cloudNoise(x, y) {
    return valueNoise(x, y) * 0.7 + valueNoise(x * 2.3 + 50, y * 2.3 - 50) * 0.3;
  }

  function layout() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var cols = Math.ceil(w / CELL);
    var rows = Math.ceil(h / CELL);
    cells = [];
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        cells.push({ bx: c * CELL + CELL / 2, by: r * CELL + CELL / 2, x: 0, y: 0, angle: 0 });
      }
    }
  }

  function draw(elapsed) {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = ARROW_COLOR;
    ctx.lineCap = "round";
    ctx.lineWidth = 1.4;
    ctx.globalAlpha = ALPHA;

    var half = ARROW_LEN / 2;
    var driftX = elapsed * DRIFT_SPEED_X;
    var driftY = elapsed * DRIFT_SPEED_Y;

    for (var i = 0; i < cells.length; i++) {
      var n = cells[i];

      var v = cloudNoise(n.bx * NOISE_SCALE + driftX, n.by * NOISE_SCALE + driftY);
      if (v <= NOISE_THRESHOLD) continue;

      var dx = n.bx - mouse.x;
      var dy = n.by - mouse.y;
      var dist = Math.sqrt(dx * dx + dy * dy) || 1;

      var t = Math.max(0, 1 - dist / FIELD_RADIUS);
      var push = t * t * MAX_DISPLACE;
      n.x = n.bx + (dx / dist) * push;
      n.y = n.by + (dy / dist) * push;

      // Rotation always tracks the cursor from the cell's displaced position.
      // Small, gentle motion of tiny marks, not the kind of large/fast motion
      // prefers-reduced-motion targets, and it's this site's one deliberate
      // signature interaction — so it isn't gated behind that media feature
      // the way the ambient drift and the scroll-reveal animations are.
      n.angle = Math.atan2(mouse.y - n.y, mouse.x - n.x);

      ctx.save();
      ctx.translate(n.x, n.y);
      ctx.rotate(n.angle);
      ctx.beginPath();
      ctx.moveTo(-half, 0);
      ctx.lineTo(half, 0);
      ctx.moveTo(half - ARROW_LEN * 0.34, -ARROW_LEN * 0.26);
      ctx.lineTo(half, 0);
      ctx.lineTo(half - ARROW_LEN * 0.34, ARROW_LEN * 0.26);
      ctx.stroke();
      ctx.restore();
    }
  }

  var raf = null;
  function tick(now) {
    draw(reduceMotion ? 0 : now - startTime);
    raf = requestAnimationFrame(tick);
  }

  layout();
  draw(0);
  raf = requestAnimationFrame(tick);

  window.addEventListener("resize", layout);

  // Cell tracking is never gated behind pointer-type detection: some hybrid
  // touch+mouse laptops mis-report (hover:none)/(pointer:coarse) for a real
  // mouse, which would silently kill all reactivity. mousemove simply never
  // fires on pure touch devices, so this is safe unconditionally.
  window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  if (!coarsePointer) {
    window.addEventListener("mousemove", function (e) {
      cursorPlus.style.transform = "translate3d(" + (e.clientX - 8) + "px," + (e.clientY - 8) + "px,0)";
      cursorPlus.style.opacity = "1";
    });
    window.addEventListener("mouseleave", function () {
      cursorPlus.style.opacity = "0";
    });
  }

  // Scroll reveal: content is visible by default in CSS (no-JS / reduced-motion safe).
  // Only when motion is allowed do we arm the hidden->visible transition via JS.
  if (!reduceMotion && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll("[data-reveal]");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (t) { io.observe(t); });
  }

  // The About section's two side-by-side lists (contacts / education facts)
  // are meant to land on the same bottom line. CSS Grid row-alignment
  // (align-self: end, same grid-row) left a small residual gap that varied
  // with font metrics, not layout — measuring and correcting it directly is
  // more reliable here than chasing it further in CSS. No-ops below 781px,
  // where the two lists stack into one column and this doesn't apply.
  var aboutContacts = document.querySelector(".about__contacts");
  var aboutFacts = document.querySelector(".about__facts");
  if (aboutContacts && aboutFacts) {
    var alignAboutColumns = function () {
      aboutContacts.style.transform = "";
      aboutFacts.style.transform = "";
      if (window.innerWidth <= 780) return;
      var diff = aboutContacts.getBoundingClientRect().bottom - aboutFacts.getBoundingClientRect().bottom;
      if (Math.abs(diff) < 0.5) return;
      if (diff > 0) {
        aboutFacts.style.transform = "translateY(" + diff + "px)";
      } else {
        aboutContacts.style.transform = "translateY(" + -diff + "px)";
      }
    };
    alignAboutColumns();
    window.addEventListener("resize", alignAboutColumns);
    var portraitImg = document.querySelector(".about__portrait img");
    if (portraitImg && !portraitImg.complete) portraitImg.addEventListener("load", alignAboutColumns);
  }
})();
