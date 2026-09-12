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
