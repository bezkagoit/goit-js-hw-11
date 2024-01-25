import{S as u,i as c}from"./assets/vendor-7659544d.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const d="https://pixabay.com/api/",m="41971380-5e7df6cf95dc1cfc66e370c4e",f=document.querySelector(".search-form"),h=document.querySelector(".search-input"),a=document.querySelector(".gallery"),p=new u(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});a.style.display="none";f.addEventListener("submit",y);function y(s){s.preventDefault();const o=encodeURIComponent(h.value.trim());if(o.trim()===""){c.error({title:"Error",message:"Please enter a search query."});return}g(o).then(r=>{a.innerHTML="",a.insertAdjacentHTML("beforeend",v(r.hits)),p.refresh()}).catch(r=>{console.error(r),c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})})}function g(s){const o=new URLSearchParams({key:m,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${d}?${o}`).then(r=>{if(!r.ok)throw new Error(r.statusText);return r.json()})}function v(s){return s.map(({webformatURL:o,largeImageURL:r,tags:n,likes:e,views:t,comments:i,downloads:l})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${r}">
        <img
          class="gallery-image"
          src="${o}"
          alt="${n}"
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
              <p class="amount"> ${i}</p>
            </div>
             <div>
              <h2 class="title">Downloads</h2>
              <p class="amount"> ${l}</p>
            </div>
        </div>`).join("")}
//# sourceMappingURL=commonHelpers.js.map
