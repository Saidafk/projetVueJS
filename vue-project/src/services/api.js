const BASE_URL = 'https://api.tvmaze.com';

export const getAllMovies = async (maxPages = 4) => {
  try {
    let allData = [];
    
    for (let i = 0; i < maxPages; i++) {
      const response = await fetch(`${BASE_URL}/shows?page=${i}`);
      if (!response.ok) break;
      
      const data = await response.json();
      if (data.length === 0) break;
      
      allData = [...allData, ...data];
    }
    
    return allData.map(item => ({
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
