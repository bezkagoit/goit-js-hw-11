import{i as c,S as d}from"./assets/vendor-5b791d57.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const f="https://pixabay.com/api/",m="41971380-5e7df6cf95dc1cfc66e370c4e",n={form:document.getElementById("search-form"),resultContainer:document.getElementById("result-container"),loader:document.querySelector(".loader")};n.form.addEventListener("submit",h);function h(t){t.preventDefault();const s=t.currentTarget,o=s.elements.picture.value;v(),p(o).then(a=>{const e=a.hits;e.length===0&&c.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),y(e)}).catch(a=>{console.log(a),c.error({position:"topRight",message:"Failed to fetch images. Please try again later."})}).finally(()=>{s.reset(),L()})}function p(t){const s=new URLSearchParams({key:m,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15});return fetch(`${f}?${s}`).then(o=>{if(!o.ok)throw new Error(o.statusText);return o.json()})}let g=new d(".gallery a",{captionsData:"alt",captionDelay:250});function y(t){const s=t.map(({webformatURL:o,largeImageURL:a,tags:e,likes:r,views:i,comments:l,downloads:u})=>`<li class="gallery-item">
            <a href="${a}">
  <img class="gallery-image" src="${o}" alt="${e}" width="370" heigth="300"></a>
  <div class="stats-block">
         <div class="stats">  
             <h2 class="title">Likes</h2>
             <p class="amount">${r}</p>
         </div>
         <div class="stats">  
             <h2 class="title">Views</h2>
             <p class="amount">${i}</p>
         </div>
          <div class="stats"> 
              <h2 class="title">Comments</h2>
             <p class="amount">${l}</p>
         </div>
          <div class="stats">  
             <h2 class="title">Downloads</h2>
             <p class="amount">${u}</p>
          </div>
              
   </div>
</li>`).join("");n.resultContainer.innerHTML=s,g.refresh(),console.log(s)}function v(){const t=document.querySelector(".loader");t&&t.classList.add("visible")}function L(){const t=document.querySelector(".loader");t&&t.classList.remove("visible")}
//# sourceMappingURL=commonHelpers.js.map
