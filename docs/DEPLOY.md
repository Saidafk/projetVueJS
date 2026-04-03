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
    listen 8080;
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
sudo ln -sf /etc/nginx/sites-available/cinelist /etc/nginx/sites-enabled/ && 
sudo rm -f /etc/nginx/sites-enabled/default && 
sudo chown -R www-data:www-data /var/www/cinelist && 
sudo chmod -R 755 /var/www/cinelist && 
sudo nginx -t && 
sudo systemctl restart nginx
```

### 4. Gestion des droits `sudo` sur le VPS dans un workflow CI

L'erreur `sudo: un terminal est requis pour lire le mot de passe` survient lors de l'exécution de commandes `sudo` dans un environnement non interactif comme GitHub Actions. Pour résoudre cela, il faut configurer le serveur VPS pour permettre à l'utilisateur SSH d'exécuter ces commandes sans demander de mot de passe.

#### Option 1 : Configuration `NOPASSWD` (Recommandée et plus sécurisée)

Connectez-vous à votre VPS via SSH et utilisez la commande `sudo visudo` pour éditer le fichier de configuration `sudoers`. **Soyez très prudent en modifiant ce fichier, une erreur pourrait vous empêcher d'utiliser `sudo` même en tant qu'administrateur.**

Ajoutez la ligne suivante à la fin du fichier, en remplaçant `votre_utilisateur_ssh` par le nom d'utilisateur que vous utilisez pour la connexion SSH (par exemple, `deploy` ou `${{ secrets.SSH_USER }}`). Si les chemins des commandes sont différents sur votre VPS, ajustez-les.

```
votre_utilisateur_ssh ALL=(ALL) NOPASSWD: /usr/bin/chmod, /usr/bin/chown, /usr/bin/systemctl restart nginx
```

*   **Explication :**
    *   `votre_utilisateur_ssh` : Le nom de l'utilisateur SSH.
    *   `ALL=(ALL)` : L'utilisateur peut exécuter des commandes en tant que n'importe quel utilisateur (y compris root).
    *   `NOPASSWD:` : Indique qu'aucun mot de passe ne sera demandé.
    *   `/usr/bin/chmod, /usr/bin/chown, /usr/bin/systemctl restart nginx` : La liste des commandes spécifiques autorisées sans mot de passe.

Si vous souhaitez autoriser toutes les commandes sans mot de passe pour cet utilisateur (ce qui est moins sécurisé), vous pouvez utiliser :
```
votre_utilisateur_ssh ALL=(ALL) NOPASSWD: ALL
```

Sauvegardez et quittez l'éditeur (`Ctrl+X`, puis `Y`, puis `Entrée` si vous utilisez `nano`). Les modifications prendront effet immédiatement.

#### Option 2 : Passer le mot de passe via `sudo -S` (Moins sécurisée)

Si vous ne pouvez pas modifier le fichier `sudoers` sur le VPS, vous pouvez passer le mot de passe via un secret GitHub. Cela nécessite de configurer un secret nommé `SUDO_PASSWORD` dans les paramètres de votre dépôt GitHub.

Ensuite, modifiez le script de votre action `appleboy/ssh-action` dans votre workflow CI. Si votre script actuel ressemble à ceci :

```yaml
script: |
  # ... autres commandes ...
  sudo chmod -R 755 /var/www/cinelist
  sudo chown -R www-data:www-data /var/www/cinelist
  sudo systemctl restart nginx
```

Vous devriez le modifier pour utiliser `echo` et `sudo -S` :

```yaml
script: |
  # ... autres commandes ...
  echo '${{ secrets.SUDO_PASSWORD }}' | sudo -S chmod -R 755 /var/www/cinelist
  echo '${{ secrets.SUDO_PASSWORD }}' | sudo -S chown -R www-data:www-data /var/www/cinelist
  echo '${{ secrets.SUDO_PASSWORD }}' | sudo -S systemctl restart nginx
```
**Attention :** Stocker et utiliser le mot de passe root ou d'un utilisateur privilégié comme secret constitue un risque de sécurité. Privilégiez toujours la méthode `NOPASSWD` si possible.

---

### 4. Commandes de secours (Debug)
En cas de problème ou d'écran blanc :

*   **Logs d'erreurs Nginx :** `sudo tail -f /var/log/nginx/error.log`
*   **Statut du service Nginx :** `sudo systemctl status nginx`
*   **Test de syntaxe configuration Nginx :** `sudo nginx -t`
