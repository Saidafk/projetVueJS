const BASE_URL = 'https://api.tvmaze.com';

export const getAllMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/shows`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des données');
    
    const data = await response.json();
    
    return data.map(item => ({
      id: item.id,
      title: item.name,
      image: item.image ? item.image.medium : 'https://via.placeholder.com/210x295?text=Pas+d%27image',
      rating: item.rating?.average || 'N/A',
      summary: item.summary ? item.summary.replace(/<[^>]*>/g, '') : 'Pas de résumé disponible.',
      year: item.premiered ? item.premiered.split('-')[0] : 'N/A',
      genres: item.genres || []
    }));
  } catch (error) {
    console.error("Erreur API :", error);
    return [];
  }
};
