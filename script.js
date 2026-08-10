"use strict";

window.dataLayer = window.dataLayer || [];
const campaignParams = new URLSearchParams(window.location.search);

function sendEvent(eventName, location) {
  window.dataLayer.push({
    event: eventName,
    event_label: location || "unknown",
    page_path: window.location.pathname,
    utm_source: campaignParams.get("utm_source") || undefined,
    utm_medium: campaignParams.get("utm_medium") || undefined,
    utm_campaign: campaignParams.get("utm_campaign") || undefined,
    utm_content: campaignParams.get("utm_content") || undefined
  });
}

document.querySelectorAll(".track-call").forEach((link) => {
  link.addEventListener("click", () => sendEvent("call_click", link.dataset.location));
});

document.querySelectorAll(".track-whatsapp").forEach((link) => {
  link.addEventListener("click", () => sendEvent("whatsapp_click", link.dataset.location));
});

document.querySelectorAll(".track-instagram").forEach((link) => {
  link.addEventListener("click", () => sendEvent("instagram_click", link.dataset.location));
});

document.querySelectorAll(".track-cta").forEach((link) => {
  link.addEventListener("click", () => sendEvent("cta_click", link.dataset.location));
});

const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const open = !mobileMenu.classList.contains("open");
    mobileMenu.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");
let lastFocusedElement = null;

function closeLightbox() {
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.classList.remove("modal-open");
  if (lastFocusedElement) lastFocusedElement.focus();
}

if (lightbox && lightboxImage && lightboxCaption && lightboxClose) {
  document.querySelectorAll(".gallery-item").forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.querySelector("img");
      lastFocusedElement = button;
      lightboxImage.src = button.dataset.full || image?.src || "";
      lightboxImage.alt = image?.alt || "Serviço de guincho";
      lightboxCaption.textContent = button.dataset.label || "Serviço realizado";
      lightbox.hidden = false;
      document.body.classList.add("modal-open");
      lightboxClose.focus();
    });
  });
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
}

const yearNode = document.getElementById("current-year");
if (yearNode) yearNode.textContent = String(new Date().getFullYear());

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

window.dataLayer.push({
  event: "page_ready",
  tracked_events: ["call_click", "whatsapp_click", "instagram_click", "cta_click"]
});
