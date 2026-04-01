# 🚀 Déploiement VPS - CinéList

Ce guide récapitule la procédure pour déployer l'application Vue.js sur le serveur VPS.

---

### 1. Sur ton PC (Build & Envoi)
Générer le dossier `/dist` et l'envoyer sur le VPS via SCP.

```bash
npm run build && scp -r ./dist/* deploy@31.207.33.201:/var/www/cinelist/
```

### 2. Sur le VPS (Configuration Nginx)
Fichier de configuration : `/etc/nginx/sites-available/cinelist`

```nginx
server {
    listen 80;
    server_name 31.207.33.201;
    root /var/www/cinelist;
    index index.html;

    location / {
        # Support du mode History de Vue Router
        try_files $uri $uri/ /index.html;
    }

    # Cache pour les assets statiques
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

### 3. Sur le VPS (Lignes de commande)
Activer la configuration, gérer les droits et redémarrer Nginx :

```bash
sudo ln -sf /etc/nginx/sites-available/cinelist /etc/nginx/sites-enabled/ && \
sudo rm -f /etc/nginx/sites-enabled/default && \
sudo chown -R www-data:www-data /var/www/cinelist && \
sudo chmod -R 755 /var/www/cinelist && \
sudo nginx -t && \
sudo systemctl restart nginx
```

### 4. Commandes de secours (Debug)
En cas de problème ou d'écran blanc :

*   **Logs d'erreurs :** `sudo tail -f /var/log/nginx/error.log`
*   **Statut du service :** `sudo systemctl status nginx`
*   **Test de syntaxe config :** `sudo nginx -t`
