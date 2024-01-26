import{i as a,S as f}from"./assets/vendor-7659544d.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const m="https://pixabay.com/api/",d="41971380-5e7df6cf95dc1cfc66e370c4e",p=document.querySelector(".search-form"),h=document.querySelector(".result-container"),c=document.querySelector(".loader");p.addEventListener("submit",g);function g(s){s.preventDefault(),c.classList.remove("is-hidden");const r=s.currentTarget,o=r.elements.picture.value;y(o).then(i=>{const e=i.hits;e.length===0?a.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}):P(e)}).catch(i=>{console.error(i),a.error({position:"topRight",message:"Failed to fetch images. Please try again later."})}).finally(()=>{r.reset(),c.classList.add("is-hidden")})}function y(s){const r=new URLSearchParams({key:d,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${m}?${r}`).then(o=>{if(!o.ok)throw new Error(o.statusText);return o.json()})}const L=new f(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});function P(s){const r=s.map(({webformatURL:o,largeImageURL:i,tags:e,likes:t,views:n,comments:l,downloads:u})=>`
        <li class="gallery-item">
          <a href="${i}">
            <img class="gallery-image" src="${o}" alt="${e}">
          </a>
          <ul class="info-list">
            <li class="info-item">Likes: ${t}</li>
            <li class="info-item">Views: ${n}</li>
            <li class="info-item">Comments: ${l}</li>
            <li class="info-item">Downloads: ${u}</li>
          </ul>
        </li>`).join("");h.innerHTML=r,L.refresh()}
//# sourceMappingURL=commonHelpers.js.map
