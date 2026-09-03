(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.getElementById("navToggle");
  var mobile = document.getElementById("navMobile");
  var hero = document.getElementById("hero");

  if (toggle && mobile) {
    toggle.addEventListener("click", function () {
      mobile.classList.toggle("open");
      toggle.setAttribute(
        "aria-label",
        mobile.classList.contains("open") ? "Close menu" : "Open menu"
      );
    });
    mobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobile.classList.remove("open");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 12) header.classList.add("scrolled");
    else header.classList.remove("scrolled");

    // Light nav while over full-bleed hero
    if (hero) {
      var heroBottom = hero.offsetTop + hero.offsetHeight - 80;
      if (window.scrollY < heroBottom) header.classList.add("on-hero");
      else header.classList.remove("on-hero");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Soft autoplay for videos when in view (muted only)
  if ("IntersectionObserver" in window) {
    var vids = document.querySelectorAll(".sig-video, .reel-item video");
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var v = entry.target;
          if (entry.isIntersecting) {
            v.play().catch(function () {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.35 }
    );
    vids.forEach(function (v) {
      io.observe(v);
      function markReady() {
        var wrap = v.closest(".sig-featured-media, .sig-media, .reel-item");
        if (wrap) wrap.classList.add("has-video");
      }
      v.addEventListener("loadeddata", markReady);
      v.addEventListener("loadedmetadata", markReady);
      v.addEventListener("canplay", markReady);
      if (v.readyState >= 2) markReady();
    });

    // Reveal on scroll
    var reveals = document.querySelectorAll(".reveal");
    var rio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            rio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) {
      rio.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
  }
})();
