import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41971380-5e7df6cf95dc1cfc66e370c4e';

const refs = {
  form: document.getElementById('search-form'),
  resultContainer: document.getElementById('result-container'),
  loader: document.querySelector('.loader'),
};

refs.form.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const picture = form.elements.picture.value;

  showLoader();

  searchPicturesByParams(picture)
    .then(data => {
      const pictures = data.hits;

      if (pictures.length === 0) {
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }

      createMarkup(pictures);
    })
    .catch(err => {
      console.log(err);
      iziToast.error({
        position: 'topRight',
        message: 'Failed to fetch images. Please try again later.',
      });
    })
    .finally(() => {
      form.reset();
      hideLoader();
    });
}

function searchPicturesByParams(picture) {
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: picture,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
  });

  return fetch(`${BASE_URL}?${urlParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createMarkup(hits) {
  const markUp = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
            <a href="${largeImageURL}">
  <img class="gallery-image" src="${webformatURL}" alt="${tags}" width="370" heigth="300"></a>
  <div class="stats-block">
         <div class="stats">  
             <h2 class="title">Likes</h2>
             <p class="amount">${likes}</p>
         </div>
         <div class="stats">  
             <h2 class="title">Views</h2>
             <p class="amount">${views}</p>
         </div>
          <div class="stats"> 
              <h2 class="title">Comments</h2>
             <p class="amount">${comments}</p>
         </div>
          <div class="stats">  
             <h2 class="title">Downloads</h2>
             <p class="amount">${downloads}</p>
          </div>
              
   </div>
</li>`
    )
    .join('');
  refs.resultContainer.innerHTML = markUp;
  lightbox.refresh();
  console.log(markUp);
}

function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('visible');
  }
}

function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.remove('visible');
  }
}
