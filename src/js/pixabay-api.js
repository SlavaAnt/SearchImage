// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import Notiflix from 'notiflix';
// import { fetchAPI } from './js/fetch-api-servise';
// // import { fetchAPI } from './js/pixabay-api';

// let searchQuery = '';
// let page = 1;

// let lightbox = new SimpleLightbox('.gallery__container a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// let options = {
//   root: null,
//   rootMargin: '300px',
//   threshold: 1.0,
// };

// // let observer = new IntersectionObserver(onLoadMore, options);

// const refs = {
//   galleryContainer: document.querySelector('.js-gallery'),
//   form: document.querySelector('.js-search-form'),
//   btnLoadMore: document.querySelector('.js-load-more'),
// };

// refs.form.addEventListener('submit', onSearchImages);
// refs.btnLoadMore.addEventListener('click', onLoadMore);

// async function onSearchImages(evt) {
//   evt.preventDefault();
//   newSearchQuery();

//   searchQuery = evt.currentTarget.elements.searchQuery.value;

//   fetchAPI(searchQuery, page)
//     .then(({ data: { hits, totalHits } }) => {
//       renderImage(hits, totalHits);
//       // observer.observe(refs.btnLoadMore);
//     })
//     .catch(err => Notiflix.Notify.failure(err.message));
// }

// function renderImage(hits, totalHits) {
//   if (!hits.length) {
//     messageOnNoImages();
//   } else {
//     messageOnFoundAllImages(totalHits);

//     refs.galleryContainer.insertAdjacentHTML(
//       'beforeend',
//       createMarkupOnCard(hits)
//     );
//     lightbox.refresh();

//     if (hits.length < totalHits) {
//       refs.btnLoadMore.hidden = false;
//       refs.btnLoadMore.classList.add('btn__load-more');
//     } else {
//       messageOnImagesAreOver();
//     }
//   }
// }

// function newSearchQuery() {
//   refs.btnLoadMore.hidden = true;
//   refs.btnLoadMore.classList.remove('btn__load-more');
//   refs.galleryContainer.innerHTML = '';
//   page = 1;
// }

// function onLoadMore() {
//   page += 1;
//   fetchAPI(searchQuery, page)
//     .then(({ data: { hits, totalHits } }) => {
//       if (!hits.length) {
//         messageOnNoImages();
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
//         messageOnImagesAreOver();
//       }
//     })
//     .catch(err => {
//       console.dir(err);
//       Notiflix.Notify.failure(err.message);
//     });

//   scroll();
// }

// function createMarkupOnCard(hits) {
//   return hits
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `
//           <div class="card cards__item">
//             <a href="${largeImageURL}">
//               <img class="card__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
//             </a>
//             <div class="card__info">
//               <p class="card__info__item">
//                 <b>Likes: ${likes}</b>
//               </p>
//               <p class="card__info__item">
//                 <b>Views: ${views}</b>
//               </p>
//               <p class="card__info__item">
//                 <b>Comments: ${comments}</b>
//               </p>
//               <p class="card__info__item">
//                 <b>Downloads: ${downloads}</b>
//               </p>
//             </div>
//         </div>

//     `
//     )
//     .join('');
// }

// function scroll() {
//   const { height: cardHeight } = document
//     .querySelector('.js-gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }

// function messageOnNoImages() {
//   Notiflix.Notify.failure(
//     `❌ "Sorry, there are no images matching your search query. Please try again."`
//   );
// }

// function messageOnImagesAreOver() {
//   Notiflix.Notify.failure(
//     `❌ "We're sorry, but you've reached the end of search results."`
//   );
// }

// function messageOnFoundAllImages(totalHits) {
//   Notiflix.Notify.success(`✅ Hooray! We found ${totalHits} images.`);
// }
