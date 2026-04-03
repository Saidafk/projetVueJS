export const shareMovie = async (movie) => {
  const baseUrl = window.location.origin + window.location.pathname;
  const url = `${baseUrl}#/movie/${movie.id}`;
  const shareData = {
    title: movie.title || 'CinéList',
    text: movie.summary ? movie.summary.slice(0, 140) : 'Découvre ce film sur CinéList',
    url
  };

  try {
    if (navigator && navigator.share) {
      await navigator.share(shareData);
      return { success: true };
    }

    // Fallback: try clipboard
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
      return { success: true, copied: true, url };
    }

    return { success: false, reason: 'no-share-api' };
  } catch (err) {
    return { success: false, error: err };
  }
};
