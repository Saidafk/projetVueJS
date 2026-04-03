import { describe, it, expect, beforeEach, vi } from 'vitest'
import { addToWatchlist, getWatchlist } from '../storage'

describe('Storage Service', () => {
  beforeEach(() => {
    // On nettoie le localStorage avant chaque test
    localStorage.clear()
  })

  it('devrait ajouter un film à la watchlist', () => {
    const movie = { id: 1, title: 'Inception', rating: 5, summary: 'Un rêve dans un rêve', image: '' }
    
    addToWatchlist(movie)
    const list = getWatchlist()
    
    expect(list).toHaveLength(1)
    expect(list[0].title).toBe('Inception')
  })

  it('ne devrait pas ajouter deux fois le même film', () => {
    const movie = { id: 1, title: 'Inception' }
    
    addToWatchlist(movie)
    addToWatchlist(movie)
    
    const list = getWatchlist()
    expect(list).toHaveLength(1)
  })
})
