import{i as c,S as u}from"./assets/vendor-7659544d.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const d="https://pixabay.com/api/",m="41971380-5e7df6cf95dc1cfc66e370c4e",h=document.querySelector(".search-form"),f=document.querySelector(".search-input"),n=document.querySelector(".gallery");n.style.display="none";h.addEventListener("submit",p);function p(s){s.preventDefault();const o=encodeURIComponent(f.value.trim());if(o.trim()===""){c.error({title:"Error",message:"Please enter a search query."});return}y(o).then(r=>{n.innerHTML="",n.insertAdjacentHTML("beforeend",g(r.hits)),new u(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh()}).catch(r=>{console.error(r),c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})})}function y(s){const o=new URLSearchParams({key:m,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${d}?${o}`).then(r=>{if(!r.ok)throw new Error(r.statusText);return r.json()})}function g(s){return s.map(({webformatURL:o,largeImageURL:r,tags:i,likes:e,views:t,comments:a,downloads:l})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${r}">
        <img
          class="gallery-image"
          src="${o}"
          alt="${i}"
        />
      </a>
    </li>
        <div class="block">
             <div>
              <h2 class="title">Likes</h2>
              <p class="amount"> ${e}</p>
            </div>
             <div>
              <h2 class="title">Views</h2>
              <p class="amount"> ${t}</p>
            </div>
             <div>
              <h2 class="title">Comments</h2>
              <p class="amount"> ${a}</p>
            </div>
             <div>
              <h2 class="title">Downloads</h2>
              <p class="amount"> ${l}</p>
            </div>
        </div>`).join("")}
//# sourceMappingURL=commonHelpers.js.map
