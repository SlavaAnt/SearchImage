import Notiflix from 'notiflix';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34699567-4c11968861ced30ee65cf0653';

class FetchAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    // this.per_page = 200;
  }

  async fetchAPI() {
    const params = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
      // per_page: this.per_page,
    });

    try {
      const response = await axios.get(`${BASE_URL}?${params}`);
      this.incrementPage();
      return response.data;
    } catch (err) {
      Notiflix.Notify.failure(err.response.data);
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  // quantityImages() {
  //   return (this.page - 1) * this.per_page;
  // }
}

export { FetchAPI };
