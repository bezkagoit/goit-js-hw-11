import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41971380-5e7df6cf95dc1cfc66e370c4e';

const searchForm = document.querySelector('.search-form');
const resultContainer = document.querySelector('.result-container');
const loader = document.querySelector('.loader');

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();

  loader.classList.remove('is-hidden');

  const form = event.currentTarget;
  const picture = form.elements.picture.value;

  getPicture(picture)
    .then(data => {
      const pictures = data.hits;

      if (pictures.length === 0) {
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        createMarkup(pictures);
      }
    })
    .catch(error => {
      console.error(error);
      iziToast.error({
        position: 'topRight',
        message: 'Failed to fetch images. Please try again later.',
      });
    })
    .finally(() => {
      form.reset();
      loader.classList.add('is-hidden');
    });
}

function getPicture(picture) {
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: picture,
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

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
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
      }) => {
        return `
        <li class="gallery-item">
          <a href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}">
          </a>
          <ul class="info-list">
            <li class="info-item">Likes: ${likes}</li>
            <li class="info-item">Views: ${views}</li>
            <li class="info-item">Comments: ${comments}</li>
            <li class="info-item">Downloads: ${downloads}</li>
          </ul>
        </li>`;
      }
    )
    .join('');
  resultContainer.innerHTML = markUp;
  lightbox.refresh();
}
