"use strict";

window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };

const GOOGLE_ANALYTICS_ID = "G-X06N0YVTF8";
const campaignParams = new URLSearchParams(window.location.search);
const businessEmail = "reginaldoguincho24h@gmail.com";
const BRAND_LOGO = "/assets/logo.png";
const BRAND_FAVICON = "/assets/favicon.png";

function applyBrandRefresh() {
  if (!document.querySelector('link[data-brand-theme]')) {
    const theme = document.createElement("link");
    theme.rel = "stylesheet";
    theme.href = "/brand-theme.css";
    theme.dataset.brandTheme = "reginaldo-2026";
    document.head.appendChild(theme);
  }

  document.querySelectorAll('link[rel~="icon"]').forEach((link) => {
    link.href = BRAND_FAVICON;
    link.type = "image/png";
  });
  if (!document.querySelector('link[rel="apple-touch-icon"]')) {
    const appleIcon = document.createElement("link");
    appleIcon.rel = "apple-touch-icon";
    appleIcon.href = BRAND_FAVICON;
    document.head.appendChild(appleIcon);
  }

  document.querySelectorAll('img[src*="logo-reginaldo-guincho"],img[src*="logo-cabecalho"]').forEach((image) => {
    image.src = BRAND_LOGO;
    image.removeAttribute("width");
    image.removeAttribute("height");
  });

  document.querySelectorAll('script[type="application/ld+json"]').forEach((node) => {
    if (node.textContent.includes("logo-reginaldo-guincho.webp")) {
      node.textContent = node.textContent.replaceAll("/assets/logo-reginaldo-guincho.webp", BRAND_LOGO);
    }
  });
}

function injectNewGalleryPhotos() {
  const newPhotos = [
    {src:"/assets/guincho_carro.jpeg",label:"Sedã em transporte",alt:"Caminhão plataforma do Reginaldo Guincho transportando sedã em Formosa-GO"},
    {src:"/assets/guincho_carro_2.jpeg",label:"Carro clássico",alt:"Reginaldo Guincho transportando carro clássico em caminhão plataforma"},
    {src:"/assets/guincho_carro_3.jpeg",label:"Picape 4x4",alt:"Reginaldo Guincho transportando picape 4x4 em Formosa-GO"},
    {src:"/assets/guincho_moto.jpeg",label:"Motocicleta",alt:"Reginaldo Guincho transportando motocicleta em caminhão plataforma"}
  ];

  document.querySelectorAll(".gallery-grid--rich,.services-gallery").forEach((gallery) => {
    newPhotos.forEach((photo) => {
      if (gallery.querySelector(`[data-full="${photo.src}"]`)) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "gallery-item gallery-item--new";
      button.dataset.full = photo.src;
      button.dataset.label = photo.label;
      button.innerHTML = `<img src="${photo.src}" alt="${photo.alt}" loading="lazy"><span>${photo.label} <i class="fa-solid fa-plus"></i></span>`;
      gallery.appendChild(button);
    });
  });
}

function installGoogleAnalytics() {
  const existingGtagScript = Array.from(document.scripts).find((script) =>
    script.src && script.src.includes("googletagmanager.com/gtag/js")
  );

  if (!existingGtagScript) {
    const analyticsScript = document.createElement("script");
    analyticsScript.async = true;
    analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
    analyticsScript.dataset.analyticsId = GOOGLE_ANALYTICS_ID;
    document.head.appendChild(analyticsScript);
    window.gtag("js", new Date());
  }

  if (!window.__reginaldoGa4Configured) {
    window.gtag("config", GOOGLE_ANALYTICS_ID);
    window.__reginaldoGa4Configured = true;
  }
}

applyBrandRefresh();
installGoogleAnalytics();

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

  if (window.location.pathname.startsWith("/bio") && !document.querySelector(".bio-back-button, .bio-back-home")) {
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
injectNewGalleryPhotos();

function sendEvent(eventName, location) {
  const eventData = {
    event_label: location || "unknown",
    page_path: window.location.pathname,
    utm_source: campaignParams.get("utm_source") || undefined,
    utm_medium: campaignParams.get("utm_medium") || undefined,
    utm_campaign: campaignParams.get("utm_campaign") || undefined,
    utm_content: campaignParams.get("utm_content") || undefined
  };

  window.dataLayer.push({ event: eventName, ...eventData });
  if (typeof window.gtag === "function") window.gtag("event", eventName, eventData);
}

document.querySelectorAll(".track-call").forEach((link) => link.addEventListener("click", () => sendEvent("call_click", link.dataset.location)));
document.querySelectorAll(".track-whatsapp").forEach((link) => link.addEventListener("click", () => sendEvent("whatsapp_click", link.dataset.location)));
document.querySelectorAll(".track-instagram").forEach((link) => link.addEventListener("click", () => sendEvent("instagram_click", link.dataset.location)));
document.querySelectorAll(".track-email").forEach((link) => link.addEventListener("click", () => sendEvent("email_click", link.dataset.location)));
document.querySelectorAll(".track-cta").forEach((link) => link.addEventListener("click", () => sendEvent("cta_click", link.dataset.location)));

const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const open = !mobileMenu.classList.contains("open");
    mobileMenu.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });
  mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }));
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
  lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !lightbox.hidden) closeLightbox(); });
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

window.dataLayer.push({ event: "page_ready", tracked_events: ["call_click", "whatsapp_click", "instagram_click", "email_click", "cta_click"] });
