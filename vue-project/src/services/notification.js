/**
 * Service de Notifications Natives (Web Notifications API)
 */

/**
 * Demande la permission à l'utilisateur d'envoyer des notifications
 * @returns {Promise<boolean>} True si accordé
 */
export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.warn("Ce navigateur ne supporte pas les notifications.");
    return false;
  }

  if (Notification.permission === "granted") return true;

  const permission = await Notification.requestPermission();
  return permission === "granted";
};

/**
 * Envoie une notification native au système (Windows/Mac/Android)
 * @param {string} title Titre de la notification
 * @param {Object} options Options de la notification (body, icon, etc.)
 */
export const sendNativeNotification = async (title, options = {}) => {
  const hasPermission = await requestNotificationPermission();

  if (hasPermission) {
    const defaultOptions = {
      icon: "/favicon_movie.png",
      badge: "/favicon_movie.png",
      vibrate: [200, 100, 200],
      ...options
    };

    new Notification(title, defaultOptions);
  }
};
