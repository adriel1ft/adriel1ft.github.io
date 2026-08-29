(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* Card tilts live in the HTML (data-rot) so they can be edited without
     touching the stylesheet. Without JS the cards simply sit straight. */
  function applyTilts() {
    var cards = document.querySelectorAll("[data-rot]");
    Array.prototype.forEach.call(cards, function (card) {
      var deg = parseFloat(card.getAttribute("data-rot"));
      if (!isNaN(deg)) {
        card.style.setProperty("--rot", deg + "deg");
      }
    });
  }

  function setupReveal() {
    if (reduceMotion.matches || !("IntersectionObserver" in window)) return;

    var targets = document.querySelectorAll(
      ".section-head, .about-grid, .card, .stack-row, .contact-line, .contact-links li"
    );
    if (!targets.length) return;

    root.classList.add("js");

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    Array.prototype.forEach.call(targets, function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 4) * 60 + "ms";
      observer.observe(el);
    });

    /* If the observer never fired at all, drop the whole effect rather than
       leaving the page invisible. */
    window.setTimeout(function () {
      if (!document.querySelector(".reveal.is-in")) {
        root.classList.remove("js");
        observer.disconnect();
      }
    }, 3000);
  }

  /* Easter egg: knock the ink layers out of register, like a bad riso print. */
  function setupMisprint() {
    var button = document.querySelector(".riso");
    if (!button) return;

    button.addEventListener("click", function () {
      var on = document.body.classList.toggle("misprint");
      button.setAttribute("aria-pressed", String(on));
    });
  }

  applyTilts();
  setupReveal();
  setupMisprint();

  if (window.console && console.log) {
    console.log(
      "%c you found the margins ",
      "background:#e0342a;color:#f2ece0;font:600 12px/1.8 monospace;",
      "\nhi — adrielft.work@gmail.com"
    );
  }
})();
