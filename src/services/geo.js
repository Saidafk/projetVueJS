/**
 * Service de GéoLocalisation et recherche via l'API Open Data du Gouvernement Français
 * Dataset: Établissements cinématographiques (CNC)
 */

const GOUV_API_URL = "https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records";

/**
 * Recherche les cinémas via l'API data.culture.gouv.fr
 * @param {number} lat Latitude
 * @param {number} lon Longitude
 * @param {number} distance Distance en mètres (ex: 10000 pour 10km)
 * @returns {Promise<Array>} Liste des cinémas formatée
 */
export const fetchNearbyCinemas = async (lat, lon, distance = 10000) => {
  // Syntaxe ODS v2.1 pour la recherche géographique
  const where = `within_distance(geolocalisation, geom'POINT(${lon} ${lat})', ${distance}m)`;
  const url = `${GOUV_API_URL}?where=${encodeURIComponent(where)}&limit=20&order_by=distance(geolocalisation, geom'POINT(${lon} ${lat})')`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erreur API Gouv (${response.status})`);
    
    const data = await response.json();
    
    // On mappe les résultats pour qu'ils soient faciles à utiliser
    return data.results.map(record => ({
      id: record.ndossier, // Identifiant unique CNC
      name: record.nom,
      address: record.adresse,
      city: record.commune,
      zip: record.cp,
      lat: record.geolocalisation.lat,
      lon: record.geolocalisation.lon,
      screens: record.ecrans, // Nombre de salles
      fauteuils: record.fauteuils // Capacité
    }));
  } catch (error) {
    console.error("Erreur API Gouv:", error);
    throw error;
  }
};

/**
 * Obtient la position actuelle via le navigateur
 */
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Géolocalisation non supportée."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => resolve({ lat: p.coords.latitude, lon: p.coords.longitude }),
      (e) => reject(e)
    );
  });
};
