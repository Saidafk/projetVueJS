import { describe, it, expect, vi } from 'vitest'
import { getAllMovies } from '../api'

describe('API Service', () => {
  it('devrait transformer les données TVMaze correctement', async () => {
    // Format direct de l'API /shows (celui que tu utilises)
    const mockData = [
      {
        id: 123,
        name: 'Test Movie',
        rating: { average: 8.5 },
        summary: '<p>Description</p>',
        image: { medium: 'img.jpg' },
        genres: ['Drama'],
        premiered: '2024-03-15'
      }
    ]

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    })

    const movies = await getAllMovies(1) // On teste juste 1 page
    
    expect(movies[0]).toEqual({
      id: 123,
      title: 'Test Movie',
      rating: 8.5,
      summary: 'Description',
      image: 'img.jpg',
      year: '2024',
      genres: ['Drama']
    })
  })
})
