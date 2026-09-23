(function () {
  "use strict";

  var root = document.documentElement;
  var targets = document.querySelectorAll(".reveal");

  if (
    !targets.length ||
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  root.classList.add("js");

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
  );

  Array.prototype.forEach.call(targets, function (el) {
    observer.observe(el);
  });

  /* If the observer never fires, show everything rather than leaving the
     page blank. */
  window.setTimeout(function () {
    if (!document.querySelector(".reveal.is-in")) {
      root.classList.remove("js");
      observer.disconnect();
    }
  }, 2500);
})();

/* Shooting stars. One crosses the screen every few seconds, behind the text.
   Tuning lives in the CONFIG block below. */
(function () {
  "use strict";

  var CONFIG = {
    gapMin: 3500, // ms between stars, minimum
    gapMax: 8000, // ms between stars, maximum
    angleMin: 16, // travel direction in degrees, down-right
    angleMax: 34,
    distMin: 340, // px travelled before fading out
    distMax: 620,
    durMin: 1.1, // seconds to cross
    durMax: 1.9,
    tailMin: 55, // px of trail behind the star
    tailMax: 120
  };

  var sky = document.querySelector(".sky");

  if (!sky || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function shoot() {
    var star = document.createElement("div");

    star.className = "shooting";
    star.textContent = "★";
    star.style.setProperty("--angle", rand(CONFIG.angleMin, CONFIG.angleMax) + "deg");
    star.style.setProperty("--dist", rand(CONFIG.distMin, CONFIG.distMax) + "px");
    star.style.setProperty("--dur", rand(CONFIG.durMin, CONFIG.durMax) + "s");
    star.style.setProperty("--tail", rand(CONFIG.tailMin, CONFIG.tailMax) + "px");

    /* start off the top-left edge often enough that stars appear to come
       from outside the window rather than popping in mid-air */
    star.style.left = rand(-10, 70) + "vw";
    star.style.top = rand(-5, 60) + "vh";

    star.addEventListener("animationend", function () {
      star.remove();
    });

    sky.appendChild(star);
  }

  function loop() {
    /* no point animating in a tab nobody is looking at */
    if (!document.hidden) shoot();
    window.setTimeout(loop, rand(CONFIG.gapMin, CONFIG.gapMax));
  }

  window.setTimeout(loop, 1500);
})();
