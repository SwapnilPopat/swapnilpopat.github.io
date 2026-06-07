document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const navLinks = document.querySelectorAll("a[data-track]");
  navLinks.forEach((link) => {
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