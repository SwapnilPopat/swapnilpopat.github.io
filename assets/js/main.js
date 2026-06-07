document.addEventListener("DOMContentLoaded", () => {
  // Safe Copyright Year Injection
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mobile Menu Toggle Logic
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (mobileNavToggle && mainNav) {
    mobileNavToggle.addEventListener("click", () => {
      const isExpanded = mobileNavToggle.getAttribute("aria-expanded") === "true";
      mobileNavToggle.setAttribute("aria-expanded", !isExpanded);
      mobileNavToggle.classList.toggle("active");
      mainNav.classList.toggle("active");
    });

    // Close menu when a link is clicked
    const navLinks = mainNav.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNavToggle.setAttribute("aria-expanded", "false");
        mobileNavToggle.classList.remove("active");
        mainNav.classList.remove("active");
      });
    });
  }

  // Analytics event tracking (if needed for custom data-track elements)
  const trackedLinks = document.querySelectorAll("a[data-track]");
  trackedLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (typeof gtag === "function") {
        gtag("event", "click", {
          event_category: "navigation",
          event_label: link.getAttribute("data-track")
        });
      }
    });
  });
});