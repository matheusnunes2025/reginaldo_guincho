"use strict";

window.dataLayer = window.dataLayer || [];

var campaignParams = new URLSearchParams(window.location.search);

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

document.querySelectorAll(".track-call").forEach(function (link) {
  link.addEventListener("click", function () {
    sendEvent("call_click", link.dataset.location);
  });
});

document.querySelectorAll(".track-whatsapp").forEach(function (link) {
  link.addEventListener("click", function () {
    sendEvent("whatsapp_click", link.dataset.location);
  });
});

document.querySelectorAll(".track-cta").forEach(function (link) {
  link.addEventListener("click", function () {
    sendEvent("cta_click", link.dataset.location);
  });
});

var lightbox = document.getElementById("lightbox");
var lightboxImage = document.getElementById("lightbox-image");
var lightboxCaption = document.getElementById("lightbox-caption");
var lightboxClose = document.getElementById("lightbox-close");
var lastFocusedElement = null;

function closeLightbox() {
  lightbox.hidden = true;
  document.body.classList.remove("modal-open");
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll(".gallery-item").forEach(function (button) {
  button.addEventListener("click", function () {
    lastFocusedElement = button;
    lightboxImage.src = button.dataset.full;
    lightboxImage.alt = button.querySelector("img").alt;
    lightboxCaption.textContent = button.dataset.label;
    lightbox.hidden = false;
    document.body.classList.add("modal-open");
    lightboxClose.focus();
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
});

document.getElementById("current-year").textContent = String(new Date().getFullYear());

window.dataLayer.push({
  event: "page_ready",
  tracked_events: ["call_click", "whatsapp_click", "cta_click"]
});
