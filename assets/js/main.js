document.addEventListener("DOMContentLoaded", () => {
  // Safe Copyright Year Injection
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Dynamic Years of Experience Calculation (Career started in July 2013)
  function getYearsOfExperience(startYear = 2013, startMonth = 6) { // 0-indexed month: 6 = July
    const now = new Date();
    let years = now.getFullYear() - startYear;
    if (now.getMonth() < startMonth || (now.getMonth() === startMonth && now.getDate() < 1)) {
      years--;
    }
    return Math.max(0, years);
  }

  const expYears = getYearsOfExperience();
  const expYearsText = `${expYears}+`;

  // Dynamically update all elements displaying experience years
  const expElements = document.querySelectorAll(".dynamic-exp-years, [data-dynamic-exp='years']");
  expElements.forEach((el) => {
    el.textContent = expYearsText;
  });

  // Dynamically update raw experience years if any element requests it
  document.querySelectorAll(".dynamic-exp-years-raw, [data-dynamic-exp='raw']").forEach((el) => {
    el.textContent = String(expYears);
  });

  // Dynamically update meta description tags in client DOM if present
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && metaDesc.content) {
    metaDesc.content = metaDesc.content.replace(/\b\d+\+?\s*years\b/gi, `${expYearsText} years`);
  }
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc && ogDesc.content) {
    ogDesc.content = ogDesc.content.replace(/\b\d+\+?\s*years\b/gi, `${expYearsText} years`);
  }
  const twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc && twitterDesc.content) {
    twitterDesc.content = twitterDesc.content.replace(/\b\d+\+?\s*years\b/gi, `${expYearsText} years`);
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
      const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme";
      themeToggle.setAttribute("aria-label", label);
      themeToggle.setAttribute("title", label);
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

  // Project Category Filter & Keyword Search
  const filterChips = document.querySelectorAll(".md-chip[data-filter]");
  const projectCards = document.querySelectorAll(".cards-grid .card[data-category]");
  const searchInput = document.getElementById("project-search");
  const noProjectsMsg = document.getElementById("no-projects-message");

  function applyProjectFilters() {
    if (!projectCards.length) return;
    const activeChip = document.querySelector(".md-chip[data-filter].active");
    const targetFilter = activeChip ? activeChip.getAttribute("data-filter") : "all";
    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

    let visibleCount = 0;
    projectCards.forEach((card) => {
      const categories = card.getAttribute("data-category") || "";
      const matchesCategory = targetFilter === "all" || categories.includes(targetFilter);
      const text = card.textContent.toLowerCase();
      const matchesQuery = !query || text.includes(query);

      if (matchesCategory && matchesQuery) {
        card.classList.remove("is-hidden");
        visibleCount++;
      } else {
        card.classList.add("is-hidden");
      }
    });

    if (noProjectsMsg) {
      noProjectsMsg.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  if (filterChips.length > 0 && projectCards.length > 0) {
    filterChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        filterChips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        applyProjectFilters();
        if (typeof gtag === "function") {
          gtag("event", "filter_click", {
            event_category: "projects",
            event_label: chip.getAttribute("data-filter")
          });
        }
      });
    });
  }

  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      applyProjectFilters();
      debounceTimer = setTimeout(() => {
        if (searchInput.value.trim() && typeof gtag === "function") {
          gtag("event", "project_search", {
            event_category: "search",
            search_term: searchInput.value.trim()
          });
        }
      }, 500);
    });
  }

  // Architecture Notes Accordion Global Toggle
  const toggleAllAccordionsBtn = document.getElementById("toggle-all-accordions");
  if (toggleAllAccordionsBtn) {
    toggleAllAccordionsBtn.addEventListener("click", () => {
      const accordions = document.querySelectorAll(".md-accordion");
      const isAnyClosed = Array.from(accordions).some((acc) => !acc.hasAttribute("open"));
      accordions.forEach((acc) => {
        if (isAnyClosed) {
          acc.setAttribute("open", "");
        } else {
          acc.removeAttribute("open");
        }
      });
      toggleAllAccordionsBtn.textContent = isAnyClosed ? "Collapse All Trade-offs" : "Expand All Trade-offs";
      toggleAllAccordionsBtn.setAttribute("aria-expanded", isAnyClosed ? "true" : "false");
    });
  }

  // 1-Click Copy (Email, Phone, etc.) Micro-Interaction
  const copyButtons = document.querySelectorAll(".copy-btn");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const textToCopy = btn.getAttribute("data-copy") || btn.getAttribute("data-email") || "popatswapnil@gmail.com";
      const tooltip = btn.querySelector(".copy-tooltip");

      navigator.clipboard.writeText(textToCopy).then(() => {
        if (tooltip) {
          tooltip.classList.add("show");
          setTimeout(() => {
            tooltip.classList.remove("show");
          }, 2000);
        }
        if (typeof gtag === "function") {
          gtag("event", "copy_text", {
            event_category: "contact",
            event_label: textToCopy
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

  // PWA Service Worker Registration
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    });
  }
});