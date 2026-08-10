"use strict";

window.dataLayer = window.dataLayer || [];
const campaignParams = new URLSearchParams(window.location.search);
const businessEmail = "reginaldoguincho24h@gmail.com";

function injectBusinessContact() {
  document.querySelectorAll(".footer-contact").forEach((footerContact) => {
    if (!footerContact.querySelector('a[href^="mailto:"]')) {
      const emailLink = document.createElement("a");
      emailLink.href = `mailto:${businessEmail}`;
      emailLink.className = "track-email";
      emailLink.dataset.location = "footer_email";
      emailLink.innerHTML = `<i class="fa-solid fa-envelope" aria-hidden="true"></i> ${businessEmail}`;
      footerContact.appendChild(emailLink);
    }
  });

  const contactMethods = document.querySelector(".contact-methods");
  if (contactMethods && !contactMethods.querySelector('a[href^="mailto:"]')) {
    const emailCard = document.createElement("a");
    emailCard.href = `mailto:${businessEmail}`;
    emailCard.className = "contact-method track-email";
    emailCard.dataset.location = "contact_card_email";
    emailCard.innerHTML = `<span class="contact-method-icon"><i class="fa-solid fa-envelope"></i></span><div><small>E-MAIL</small><strong>${businessEmail}</strong><p>Toque para enviar um e-mail.</p></div><i class="fa-solid fa-chevron-right"></i>`;
    contactMethods.appendChild(emailCard);
  }

  const bioContactMeta = document.querySelector(".bio-contact-meta");
  if (bioContactMeta && !bioContactMeta.querySelector('a[href^="mailto:"]')) {
    const emailRow = document.createElement("div");
    emailRow.className = "bio-email-row";
    emailRow.innerHTML = `<i class="fa-solid fa-envelope"></i> <a class="track-email" data-location="bio_email" href="mailto:${businessEmail}">${businessEmail}</a>`;
    const socials = bioContactMeta.querySelector(".bio-socials");
    if (socials) bioContactMeta.insertBefore(emailRow, socials);
    else bioContactMeta.appendChild(emailRow);
  }

  if (window.location.pathname.startsWith("/bio") && !document.querySelector(".bio-back-button")) {
    const backLink = document.createElement("a");
    backLink.href = "/";
    backLink.className = "bio-back-button";
    backLink.setAttribute("aria-label", "Voltar para a página inicial");
    backLink.innerHTML = `<i class="fa-solid fa-arrow-left"></i><span>Voltar ao site</span>`;
    document.body.prepend(backLink);

    const style = document.createElement("style");
    style.textContent = `
      .bio-back-button{position:fixed;z-index:55;top:max(12px,env(safe-area-inset-top));left:12px;min-height:44px;display:inline-flex;align-items:center;gap:8px;padding:0 13px;border:1px solid rgba(255,255,255,.16);border-radius:999px;color:#fff;background:rgba(8,8,8,.86);box-shadow:0 10px 28px rgba(0,0,0,.34);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);font-size:.68rem;font-weight:900;letter-spacing:.02em;text-decoration:none;transition:transform .2s ease,background .2s ease}
      .bio-back-button i{color:#ffc400}
      .bio-back-button:hover{transform:translateY(-1px);background:#111}
      .bio-email-row{margin-top:4px;overflow-wrap:anywhere}
      .bio-email-row i{color:#ffc400;margin-right:4px}
      .bio-email-row a{text-decoration:none;color:#d7d7d4;font-weight:700}
      @media(max-width:420px){.bio-back-button{top:max(8px,env(safe-area-inset-top));left:8px;min-height:40px;padding:0 11px;font-size:.62rem}.bio-back-button span{display:none}.bio-back-button{width:40px;justify-content:center;padding:0}}
    `;
    document.head.appendChild(style);
  }
}

injectBusinessContact();

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

document.querySelectorAll(".track-email").forEach((link) => {
  link.addEventListener("click", () => sendEvent("email_click", link.dataset.location));
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
  tracked_events: ["call_click", "whatsapp_click", "instagram_click", "email_click", "cta_click"]
});
