import Notiflix from 'notiflix';

export function messageOnEmptyInput() {
  Notiflix.Notify.failure(
    `❌ "Sorry, there is no request. Please enter the query."`
  );
}

export function messageOnNoImages() {
  Notiflix.Notify.failure(
    `❌ "Sorry, there are no images matching your search query. Please try again."`
  );
}

export function messageOnImagesAreOver() {
  Notiflix.Notify.failure(
    `❌ "We're sorry, but you've reached the end of search results."`
  );
}

export function messageOnFoundAllImages(totalHits) {
  Notiflix.Notify.success(`✅ Hooray! We found ${totalHits} images.`);
}
