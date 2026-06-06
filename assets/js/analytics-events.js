document.addEventListener("click", function (event) {
  const link = event.target.closest("a");

  if (!link) return;

  const href = link.getAttribute("href");
  const label = link.innerText.trim() || href;

  if (!href || typeof gtag !== "function") return;

  // Track resume clicks
  if (href.toLowerCase().includes("resume")) {
    gtag("event", "resume_click", {
      event_category: "engagement",
      event_label: label,
      link_url: href
    });
  }

  // Track email clicks
  if (href.startsWith("mailto:")) {
    gtag("event", "email_click", {
      event_category: "contact",
      event_label: label,
      link_url: href
    });
  }

  // Track external links
  if (href.startsWith("http") && !href.includes("swapnilpopat.github.io")) {
    gtag("event", "external_link_click", {
      event_category: "outbound",
      event_label: label,
      link_url: href
    });
  }
});