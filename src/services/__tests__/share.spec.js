import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shareMovie } from '../share'

describe('Share Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // On simule l'objet navigator
    global.navigator.share = vi.fn()
    global.navigator.clipboard = {
      writeText: vi.fn().mockResolvedValue(true)
    }
  })

  it('devrait utiliser navigator.share si disponible', async () => {
    const movie = { title: 'Inception', id: 1 }
    global.navigator.canShare = vi.fn().mockReturnValue(true)
    
    await shareMovie(movie)
    expect(navigator.share).toHaveBeenCalled()
  })

  it('devrait copier dans le presse-papiers si share n\'est pas dispo', async () => {
    const movie = { title: 'Inception', id: 1 }
    delete global.navigator.share
    
    const result = await shareMovie(movie)
    expect(result.copied).toBe(true)
    expect(navigator.clipboard.writeText).toHaveBeenCalled()
  })
})
