// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41971380-5e7df6cf95dc1cfc66e370c4e';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const galleryList = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

galleryList.style.display = 'none';
searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();

  const query = encodeURIComponent(searchInput.value.trim());

  if (query.trim() === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
    });
    return;
  }

  getPicture(query)
    .then(data => {
      galleryList.innerHTML = '';
      galleryList.insertAdjacentHTML('beforeend', createCardMarkup(data.hits));

      lightbox.refresh();
    })
    .catch(error => {
      console.error(error);
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    });
}

function getPicture(name) {
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  return fetch(`${BASE_URL}?${urlParams}`).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}

function createCardMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img
          class="gallery-image"
          src="${webformatURL}"
          alt="${tags}"
        />
      </a>
    </li>
        <div class="block">
             <div>
              <h2 class="title">Likes</h2>
              <p class="amount"> ${likes}</p>
            </div>
             <div>
              <h2 class="title">Views</h2>
              <p class="amount"> ${views}</p>
            </div>
             <div>
              <h2 class="title">Comments</h2>
              <p class="amount"> ${comments}</p>
            </div>
             <div>
              <h2 class="title">Downloads</h2>
              <p class="amount"> ${downloads}</p>
            </div>
        </div>`
    )
    .join('');
}
