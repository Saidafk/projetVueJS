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

// --- PWA Badge helpers ---
export const updateAppBadge = (count) => {
  try {
    if (typeof navigator !== 'undefined' && 'setAppBadge' in navigator && typeof navigator.setAppBadge === 'function') {
      if (count > 0) navigator.setAppBadge(count);
      else if ('clearAppBadge' in navigator) navigator.clearAppBadge();
    } else if (typeof navigator !== 'undefined' && 'setExperimentalAppBadge' in navigator) {
      if (count > 0) navigator.setExperimentalAppBadge(count);
      else if ('clearAppBadge' in navigator) navigator.clearAppBadge();
    } else {
      // fallback: update document title to show count
      if (typeof document !== 'undefined') {
        document.title = count > 0 ? `(${count}) CinéList` : 'CinéList';
      }
    }
  } catch (e) {
    // ignore failures (e.g. permissions/environment)
  }
};

export const refreshFavorisBadge = () => {
  const list = getFromStorage(FAVORIS_KEY);
  updateAppBadge(list.length);
};

export const refreshWatchlistBadge = () => {
  const list = getFromStorage(WATCHLIST_KEY);
  updateAppBadge(list.length);
};

// --- WATCHLIST ---
export const getWatchlist = () => getFromStorage(WATCHLIST_KEY);

export const addToWatchlist = (movie) => {
  const list = getWatchlist();
  if (!list.find(m => m.id === movie.id)) {
    list.push(movie);
    saveToStorage(WATCHLIST_KEY, list);
    try { refreshWatchlistBadge(); } catch (e) {}
    return true;
  }
  return false;
};

export const removeFromWatchlist = (movieId) => {
  const list = getWatchlist();
  const filtered = list.filter(m => m.id !== movieId);
  saveToStorage(WATCHLIST_KEY, filtered);
  try { refreshWatchlistBadge(); } catch (e) {}
};

// --- FAVORIS ---
export const getFavoris = () => getFromStorage(FAVORIS_KEY);

export const addToFavoris = (movie) => {
  const list = getFavoris();
  if (!list.find(m => m.id === movie.id)) {
    list.push(movie);
    saveToStorage(FAVORIS_KEY, list);
    refreshFavorisBadge();
    return true;
  }
  return false;
};

export const removeFromFavoris = (movieId) => {
  const list = getFavoris();
  const filtered = list.filter(m => m.id !== movieId);
  saveToStorage(FAVORIS_KEY, filtered);
  refreshFavorisBadge();
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
