// Villa Amara — menu, navbar state, reveal, FAQ, lightbox
(function () {
  var nav = document.getElementById("nav");
  var burger = document.getElementById("hamburger");
  var menu = document.getElementById("mobileMenu");

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { menu.classList.remove("open"); });
    });
  }

  // Reveal on scroll
  var items = document.querySelectorAll("main .reveal, .final .reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("visible"); });
  }

  // FAQ accordion (single open)
  var accItems = document.querySelectorAll(".acc-item");
  accItems.forEach(function (item) {
    var btn = item.querySelector(".acc-btn");
    var panel = item.querySelector(".acc-panel");
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      accItems.forEach(function (o) {
        o.classList.remove("open");
        o.querySelector(".acc-panel").style.maxHeight = null;
        o.querySelector(".acc-btn").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Gallery lightbox
  var galItems = Array.from(document.querySelectorAll(".gal-item"));
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var idx = 0;

  function openLb(i) {
    idx = (i + galItems.length) % galItems.length;
    lbImg.src = galItems[idx].getAttribute("data-full");
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ""; }

  galItems.forEach(function (b, i) {
    b.addEventListener("click", function () { openLb(i); });
  });
  var more = document.getElementById("galMore");
  if (more) more.addEventListener("click", function () { openLb(0); });

  document.getElementById("lbClose").addEventListener("click", closeLb);
  document.getElementById("lbPrev").addEventListener("click", function (e) { e.stopPropagation(); openLb(idx - 1); });
  document.getElementById("lbNext").addEventListener("click", function (e) { e.stopPropagation(); openLb(idx + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") openLb(idx - 1);
    if (e.key === "ArrowRight") openLb(idx + 1);
  });
})();
