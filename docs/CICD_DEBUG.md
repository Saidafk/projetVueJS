# 🛠️ Guide de Résolution CI/CD - CinéList

Ce document récapitule la configuration mise en place et les points de blocage à vérifier pour finaliser le déploiement automatique.

---

## 🏗️ Structure Actuelle du Projet
Pour que GitHub Actions fonctionne, le dossier `.github` doit impérativement être à la racine :
```text
projetVueJS/               <-- Racine du dépôt Git
├── .github/workflows/
│   └── deploy.yml         <-- Fichier de config
├── vue-project/           <-- Ton code Vue.js
│   ├── src/
│   ├── package.json
│   └── dist/              <-- Généré lors du build
└── package-lock.json
```

---

## 🔑 Les 3 Secrets GitHub à vérifier
Va dans **Settings > Secrets and variables > Actions** et vérifie ces 3 secrets :

1.  **`SSH_HOST`** : `31.207.33.201`
2.  **`SSH_USER`** : `deploy` (ou ton utilisateur VPS)
3.  **`SSH_PRIVATE_KEY`** : Le contenu de ta clé privée.
    *   **⚠️ Point Critique :** La clé DOIT commencer par exactement **5 tirets**.
    *   `-----BEGIN OPENSSH PRIVATE KEY-----` (ou RSA)
    *   Vérifie qu'il n'y a pas d'espace ou de ligne vide avant le premier tiret.

---

## 🛠️ Actions à tenter demain

### 1. Régénérer une clé propre (Format PEM)
Si l'erreur `no key found` persiste, crée une clé au format RSA simple sur ton PC :
```bash
# Dans ton terminal PC
ssh-keygen -t rsa -b 4096 -m PEM -f $HOME/.ssh/id_rsa_vps
```
1.  Copie la clé **PRIVÉE** (`id_rsa_vps`) dans le secret GitHub `SSH_PRIVATE_KEY`.
2.  Copie la clé **PUBLIQUE** (`id_rsa_vps.pub`) sur ton VPS :
    ```bash
    # Sur le VPS
    echo "CONTENU_DE_TA_CLE_PUBLIQUE" >> ~/.ssh/authorized_keys
    chmod 600 ~/.ssh/authorized_keys
    ```

### 2. Tester la connexion manuellement
Avant de relancer GitHub, vérifie que la clé fonctionne depuis ton PC :
```bash
ssh -i $HOME/.ssh/id_rsa_vps deploy@31.207.33.201
```
Si tu te connectes sans mot de passe, alors GitHub réussira aussi.

### 3. Relancer le déploiement
Pas besoin de faire un `git push` à chaque fois. Sur GitHub, va dans l'onglet **Actions**, clique sur le job en rouge et appuie sur le bouton **"Re-run all jobs"**.

---

## 📝 Note sur le Workflow
Le fichier `deploy.yml` est configuré pour :
1.  Entrer dans `vue-project/`.
2.  Faire le `npm install` et `npm run build`.
3.  Prendre le contenu de `vue-project/dist/`.
4.  L'envoyer dans `/var/www/cinelist/` sur le VPS.
