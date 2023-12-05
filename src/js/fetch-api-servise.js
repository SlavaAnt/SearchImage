import Notiflix from 'notiflix';
import axios from 'axios';

async function fetchAPI(searchQuery, page) {
  const BASE_URL = 'https://pixabay.com/api/';

  const params = new URLSearchParams({
    // key: '34699567-4c11968861ced30ee65cf0653',
    key: '34699567-4c11968861ced30ee65cf0653',
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 40,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${params}`);

    return response;
  } catch (err) {
    // console.log(err.response.data);
    Notiflix.Notify.failure(err.response.data);
  }
}

// function fetchAPI() {
//   const BASE_URL = 'https://pixabay.com/api/';
//   const params = new URLSearchParams({
//     key: '34699567-4c11968861ced30ee65cf0653',
//     q: 'dog',
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//   });
//   return fetch(`${BASE_URL}?${params}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     return response.json();
//   });
// }

// async function fetchAPI() {
// const BASE_URL = 'https://pixabay.com/api/';
// const params = new URLSearchParams({
//   key: '34699567-4c11968861ced30ee65cf0653',
//   q: 'dog',
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: true,
// });
//   const response = await fetch(`${BASE_URL}?${params}`);
// if (!response.ok) {
//   throw new Error(response.statusText);
// }
//   return response.json();
// }

export { fetchAPI };
