import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

import { FetchAPI } from './js/fetch-api-servise-class';
import * as messages from './js/messages';

import './js/theme-change';

const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
  form: document.querySelector('.js-search-form'),
  btnLoadMore: document.querySelector('.js-load-more'),
};

const fetchApiServise = new FetchAPI();

let lightbox = new SimpleLightbox('.gallery__container a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// let options = {
//   root: null,
//   rootMargin: '300px',
//   threshold: 1.0,
// };

// let observer = new IntersectionObserver(onLoadMore, options);

refs.form.addEventListener('submit', onSearchImages);
refs.btnLoadMore.addEventListener('click', onLoadMore);

async function onSearchImages(evt) {
  evt.preventDefault();
  onNewSearchQuery();

  fetchApiServise.query = evt.currentTarget.elements.searchQuery.value;

  if (!fetchApiServise.query) {
    messages.messageOnEmptyInput();
    return;
  }

  fetchApiServise
    .fetchAPI()
    .then(({ hits, totalHits }) => {
      renderImages(hits, totalHits);
      // observer.observe(refs.btnLoadMore);
    })
    .catch(err => Notiflix.Notify.failure(err.message));
}

function renderImages(hits, totalHits) {
  if (!hits.length) {
    messages.messageOnNoImages();
  } else {
    messages.messageOnFoundAllImages(totalHits);

    refs.galleryContainer.insertAdjacentHTML(
      'beforeend',
      createMarkupOnCard(hits)
    );
    lightbox.refresh();

    if (hits.length < totalHits) {
      refs.btnLoadMore.hidden = false;
      refs.btnLoadMore.classList.add('btn__load-more');
    } else {
      messages.messageOnImagesAreOver();
    }
  }
}

function onLoadMore() {
  fetchApiServise
    .fetchAPI()
    .then(({ hits, totalHits }) => {
      if (!hits.length) {
        messages.messageOnNoImages();
      }
      refs.galleryContainer.insertAdjacentHTML(
        'beforeend',
        createMarkupOnCard(hits)
      );
      lightbox.refresh();

      const currentHits = refs.galleryContainer.children.length;
      // const currentHits2 = fetchApiServise.quantityImages();

      if (currentHits > totalHits) {
        // if (currentHits2 > totalHits) {
        refs.btnLoadMore.hidden = true;
        refs.btnLoadMore.classList.remove('btn__load-more');
        // observer.unobserve(refs.btnLoadMore);
        messages.messageOnImagesAreOver();
      }
    })
    .catch(err => {
      console.dir(err);
      Notiflix.Notify.failure(err.message);
    });

  scroll();
}

function onNewSearchQuery() {
  refs.btnLoadMore.hidden = true;
  refs.btnLoadMore.classList.remove('btn__load-more');
  refs.galleryContainer.innerHTML = '';
  fetchApiServise.resetPage();
}

function createMarkupOnCard(hits) {
  return hits
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
          <div class="card cards__item">
            <a href="${largeImageURL}">
              <img class="card__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="card__info">
              <p class="card__info__item">
                <b>Likes: ${likes}</b>
              </p>
              <p class="card__info__item">
                <b>Views: ${views}</b>
              </p>
              <p class="card__info__item">
                <b>Comments: ${comments}</b>
              </p>
              <p class="card__info__item">
                <b>Downloads: ${downloads}</b>
              </p>
            </div>
        </div>
     
    `
    )
    .join('');
}

function scroll() {
  const { height: cardHeight } = document
    .querySelector('.js-gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

// ////////////////////////////
// Без використання класу
// .............................
// import { fetchAPI } from './js/fetch-api-servise';
// let searchQuery = '';
// let page = 1;
// async function onSearchImages(evt) {
//   evt.preventDefault();
//   onNewSearchQuery();

//   fetchApiServise.query = evt.currentTarget.elements.searchQuery.value;

//    fetchAPI(searchQuery, page)
//       .then(({ data: { hits, totalHits } }) => {
//         renderImages(hits, totalHits);
//         // observer.observe(refs.btnLoadMore);
//       })    .catch(err => Notiflix.Notify.failure(err.message));
// }

// function renderImages(hits, totalHits) {
//   if (!hits.length) {
//     messages.messageOnNoImages();
//   } else {
//     messages.messageOnFoundAllImages(totalHits);

//     refs.galleryContainer.insertAdjacentHTML(
//       'beforeend',
//       createMarkupOnCard(hits)
//     );
//     lightbox.refresh();

//     if (hits.length < totalHits) {
//       refs.btnLoadMore.hidden = false;
//       refs.btnLoadMore.classList.add('btn__load-more');
//     } else {
//       messages.messageOnImagesAreOver();
//     }
//   }
// }

// function onNewSearchQuery() {
//   refs.btnLoadMore.hidden = true;
//   refs.btnLoadMore.classList.remove('btn__load-more');
//   refs.galleryContainer.innerHTML = '';
//   fetchApiServise.page = 1;
// }

// function onLoadMore() {
//    page += 1;
//   fetchAPI(searchQuery, page)
//       .fetchAPI(searchQuery, page)
//     .then(({ data: { hits, totalHits } }) => {
//       if (!hits.length) {
//         messages.messageOnNoImages();
//       }
//       refs.galleryContainer.insertAdjacentHTML(
//         'beforeend',
//         createMarkupOnCard(hits)
//       );
//       lightbox.refresh();

//       const currentHits = refs.galleryContainer.children.length;

//       if (currentHits === totalHits) {
//         refs.btnLoadMore.hidden = true;
//         refs.btnLoadMore.classList.remove('btn__load-more');
//         // observer.unobserve(refs.btnLoadMore);
//         messages.messageOnImagesAreOver();
//       }
//     })
//     .catch(err => {
//       console.dir(err);
//       Notiflix.Notify.failure(err.message);
//     });

//   scroll();
// }
