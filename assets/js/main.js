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
    function closeMobileNav() {
      mobileNavToggle.setAttribute("aria-expanded", "false");
      mobileNavToggle.classList.remove("active");
      mainNav.classList.remove("active");
      document.body.style.overflow = "";
    }

    mobileNavToggle.addEventListener("click", () => {
      const isExpanded = mobileNavToggle.getAttribute("aria-expanded") === "true";
      mobileNavToggle.setAttribute("aria-expanded", !isExpanded);
      mobileNavToggle.classList.toggle("active");
      mainNav.classList.toggle("active");
      document.body.style.overflow = !isExpanded ? "hidden" : "";
    });

    // Close menu when a link is clicked
    const navLinks = mainNav.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileNav();
      });
    });

    // Close on Escape key press (WCAG 2.1)
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mainNav.classList.contains("active")) {
        closeMobileNav();
        mobileNavToggle.focus();
      }
    });

    // Close when clicking outside menu
    document.addEventListener("click", (e) => {
      if (
        mainNav.classList.contains("active") &&
        !mainNav.contains(e.target) &&
        !mobileNavToggle.contains(e.target)
      ) {
        closeMobileNav();
      }
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

  // Project Category Filter
  const filterChips = document.querySelectorAll(".md-chip[data-filter]");
  const projectCards = document.querySelectorAll(".cards-grid .card[data-category]");

  if (filterChips.length > 0 && projectCards.length > 0) {
    filterChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        filterChips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");

        const targetFilter = chip.getAttribute("data-filter");
        projectCards.forEach((card) => {
          const categories = card.getAttribute("data-category") || "";
          if (targetFilter === "all" || categories.includes(targetFilter)) {
            card.classList.remove("is-hidden");
          } else {
            card.classList.add("is-hidden");
          }
        });
      });
    });
  }

  // 1-Click Copy Email Micro-Interaction
  const copyButtons = document.querySelectorAll(".copy-email-btn");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const email = btn.getAttribute("data-email") || "popatswapnil@gmail.com";
      const tooltip = btn.querySelector(".copy-tooltip");

      navigator.clipboard.writeText(email).then(() => {
        if (tooltip) {
          tooltip.classList.add("show");
          setTimeout(() => {
            tooltip.classList.remove("show");
          }, 2000);
        }
        if (typeof gtag === "function") {
          gtag("event", "copy_email", {
            event_category: "contact",
            event_label: email
          });
        }
      });
    });
  });

  // Scroll-to-Top Floating Action Button (FAB)
  let fab = document.getElementById("scroll-top-fab");
  if (!fab) {
    fab = document.createElement("button");
    fab.id = "scroll-top-fab";
    fab.className = "md-fab";
    fab.setAttribute("aria-label", "Scroll back to top");
    fab.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
    document.body.appendChild(fab);

    fab.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 350) {
        fab.classList.add("visible");
      } else {
        fab.classList.remove("visible");
      }
    }, { passive: true });
  }

  // Scroll-Reveal Micro-Animations (IntersectionObserver)
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("revealed"));
  }
});