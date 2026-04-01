import { reactive } from 'vue'

const state = reactive({
  movies: JSON.parse(localStorage.getItem('cinelist-movies') || '[]'),
})

function saveToStorage() {
  localStorage.setItem('cinelist-movies', JSON.stringify(state.movies))
}

export function useMovies() {
  function addMovie(title, genre) {
    state.movies.push({
      id: Date.now(),
      title: title.trim(),
      genre: genre.trim(),
      favorite: false,
    })
    saveToStorage()
  }

  function toggleFavorite(id) {
    const movie = state.movies.find((m) => m.id === id)
    if (movie) {
      movie.favorite = !movie.favorite
      saveToStorage()
    }
  }

  function removeMovie(id) {
    const idx = state.movies.findIndex((m) => m.id === id)
    if (idx !== -1) {
      state.movies.splice(idx, 1)
      saveToStorage()
    }
  }

  return {
    movies: state.movies,
    addMovie,
    toggleFavorite,
    removeMovie,
  }
}
