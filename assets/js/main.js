document.addEventListener("DOMContentLoaded", () => {
  // Safe Copyright Year Injection
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Theme Toggling Logic
  const themeToggle = document.getElementById("theme-toggle");
  const sunIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  function getTheme() {
    return document.documentElement.getAttribute("data-theme") || "dark";
  }

  function updateToggleIcon(theme) {
    if (themeToggle) {
      themeToggle.innerHTML = theme === "light" ? moonIcon : sunIcon;
    }
  }

  // Initialize toggle icon state based on current active theme
  const currentTheme = getTheme();
  updateToggleIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = getTheme() === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("theme", nextTheme);
      updateToggleIcon(nextTheme);
    });
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

  // Analytics event tracking
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