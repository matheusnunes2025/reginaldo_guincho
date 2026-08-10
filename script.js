"use strict";
window.dataLayer=window.dataLayer||[];
const campaignParams=new URLSearchParams(window.location.search);
function sendEvent(eventName,location){window.dataLayer.push({event:eventName,event_label:location||"unknown",page_path:window.location.pathname,utm_source:campaignParams.get("utm_source")||undefined,utm_medium:campaignParams.get("utm_medium")||undefined,utm_campaign:campaignParams.get("utm_campaign")||undefined,utm_content:campaignParams.get("utm_content")||undefined});}
document.querySelectorAll(".track-call").forEach(link=>link.addEventListener("click",()=>sendEvent("call_click",link.dataset.location)));
document.querySelectorAll(".track-whatsapp").forEach(link=>link.addEventListener("click",()=>sendEvent("whatsapp_click",link.dataset.location)));
document.querySelectorAll(".track-instagram").forEach(link=>link.addEventListener("click",()=>sendEvent("instagram_click",link.dataset.location)));
document.querySelectorAll(".track-cta").forEach(link=>link.addEventListener("click",()=>sendEvent("cta_click",link.dataset.location)));
const lightbox=document.getElementById("lightbox");
const lightboxImage=document.getElementById("lightbox-image");
const lightboxCaption=document.getElementById("lightbox-caption");
const lightboxClose=document.getElementById("lightbox-close");
let lastFocusedElement=null;
function closeLightbox(){if(!lightbox)return;lightbox.hidden=true;document.body.classList.remove("modal-open");if(lastFocusedElement)lastFocusedElement.focus();}
if(lightbox&&lightboxImage&&lightboxCaption&&lightboxClose){document.querySelectorAll(".gallery-item").forEach(button=>button.addEventListener("click",()=>{lastFocusedElement=button;const img=button.querySelector("img");lightboxImage.src=button.dataset.full||img?.src||"";lightboxImage.alt=img?.alt||"";lightboxCaption.textContent=button.dataset.label||"";lightbox.hidden=false;document.body.classList.add("modal-open");lightboxClose.focus();}));lightboxClose.addEventListener("click",closeLightbox);lightbox.addEventListener("click",event=>{if(event.target===lightbox)closeLightbox();});document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!lightbox.hidden)closeLightbox();});}
const year=document.getElementById("current-year");if(year)year.textContent=String(new Date().getFullYear());
window.dataLayer.push({event:"page_ready",tracked_events:["call_click","whatsapp_click","instagram_click","cta_click"]});