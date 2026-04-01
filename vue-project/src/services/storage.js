const WATCHLIST_KEY = 'cinelist_watchlist';
const FAVORIS_KEY = 'cinelist_favoris';
const REVIEWS_KEY = 'cinelist_reviews';

// Helper générique pour le localStorage
const getFromStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// --- WATCHLIST ---
export const getWatchlist = () => getFromStorage(WATCHLIST_KEY);

export const addToWatchlist = (movie) => {
  const list = getWatchlist();
  if (!list.find(m => m.id === movie.id)) {
    list.push(movie);
    saveToStorage(WATCHLIST_KEY, list);
    return true;
  }
  return false;
};

export const removeFromWatchlist = (movieId) => {
  const list = getWatchlist();
  const filtered = list.filter(m => m.id !== movieId);
  saveToStorage(WATCHLIST_KEY, filtered);
};

// --- FAVORIS ---
export const getFavoris = () => getFromStorage(FAVORIS_KEY);

export const addToFavoris = (movie) => {
  const list = getFavoris();
  if (!list.find(m => m.id === movie.id)) {
    list.push(movie);
    saveToStorage(FAVORIS_KEY, list);
    return true;
  }
  return false;
};

export const removeFromFavoris = (movieId) => {
  const list = getFavoris();
  const filtered = list.filter(m => m.id !== movieId);
  saveToStorage(FAVORIS_KEY, filtered);
};

// --- REVIEWS ---
export const getReviews = () => getFromStorage(REVIEWS_KEY);

export const saveReview = (movieId, review) => {
  const reviews = getReviews();
  const index = reviews.findIndex(r => r.movieId === movieId);
  
  if (index !== -1) {
    reviews[index] = { movieId, ...review };
  } else {
    reviews.push({ movieId, ...review });
  }
  
  saveToStorage(REVIEWS_KEY, reviews);
};

export const getReviewByMovie = (movieId) => {
  const reviews = getReviews();
  return reviews.find(r => r.movieId === movieId);
};
