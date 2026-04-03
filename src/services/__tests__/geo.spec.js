import { describe, it, expect, vi } from 'vitest'
import { fetchNearbyCinemas } from '../geo'

describe('Geo Service', () => {
  it('devrait transformer les données CNC (record.cp, record.ndossier...) correctement', async () => {
    const mockCncData = {
      results: [
        {
          ndossier: 'REX123',
          nom: 'Le Grand Rex',
          adresse: '1 boulevard Poissonnière',
          cp: '75002',
          commune: 'Paris',
          geolocalisation: { lat: 48.87, lon: 2.34 },
          fauteuils: 2000,
          ecrans: 7
        }
      ]
    }

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockCncData)
    })

    const cinemas = await fetchNearbyCinemas(48.8, 2.3)
    
    expect(cinemas[0]).toEqual({
      id: 'REX123',
      name: 'Le Grand Rex',
      address: '1 boulevard Poissonnière',
      zip: '75002',
      city: 'Paris',
      lat: 48.87,
      lon: 2.34,
      screens: 7,
      fauteuils: 2000
    })
  })
})
