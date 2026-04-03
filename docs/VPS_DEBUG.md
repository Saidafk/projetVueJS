echo "ssh-rsa VOTRE_CLE_PUBLIQUE utilisateur@machine" >> /home/deploy/.ssh/authorized_keys

# 🔐 Guide de dépannage : Configuration SSH pour GitHub Actions

## Contexte
Ce guide explique comment résoudre un problème d’authentification SSH entre GitHub Actions et un VPS Debian, et détaille la procédure complète pour une connexion sécurisée.

---

## Problème rencontré

**Erreur dans GitHub Actions :**
```
ssh: handshake failed: ssh: unable to authenticate, attempted methods [none publickey], no supported methods remain
```
**Erreur en connexion manuelle :**
```
deploy@31.207.33.201: Permission denied (publickey,password).
```

### Causes identifiées
- La clé privée dans le secret GitHub (`SSH_PRIVATE_KEY`) ne correspondait pas à la clé publique sur le serveur.
- Aucune paire de clés SSH n’était présente pour l’utilisateur `deploy` sur le VPS.

---

## Solution étape par étape

### 1. Accès au VPS via console KVM
Connexion via la console KVM de l’hébergeur (accès direct, sans SSH) pour intervenir en tant que root.

### 2. Ajout d’une clé publique existante
Sur le VPS, en root :
```sh
mkdir -p /home/deploy/.ssh
echo "ssh-rsa VOTRE_CLE_PUBLIQUE utilisateur@machine" >> /home/deploy/.ssh/authorized_keys
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
```

### 3. Génération d’une paire de clés dédiée à GitHub Actions
En tant que `deploy` sur le VPS :
```sh
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/id_ed25519 -N ""
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys
```
- `-t ed25519` : algorithme moderne et sécurisé
- `-N ""` : aucune passphrase (pour usage automatisé)

### 4. Récupération de la clé privée pour GitHub
```sh
cat ~/.ssh/id_ed25519
```
Copier tout le contenu (y compris `-----BEGIN OPENSSH PRIVATE KEY-----` et `-----END OPENSSH PRIVATE KEY-----`).

### 5. Mise à jour du secret GitHub
Dans le dépôt GitHub : **Settings → Secrets and variables → Actions → SSH_PRIVATE_KEY**
Collez le contenu complet de la clé privée.

---

## Vérification du fichier `authorized_keys`
Le fichier `/home/deploy/.ssh/authorized_keys` doit contenir une clé par ligne :
```
ssh-rsa AAAA...== ElPatrono1337
ssh-ed25519 AAAA...== github-actions-deploy
```

---

## Checklist de dépannage SSH

| Vérification                | Commande                                    |
|---------------------------- |---------------------------------------------|
| Contenu de authorized_keys  | `cat ~/.ssh/authorized_keys`                |
| Permissions du dossier .ssh | `ls -la ~/.ssh`                             |
| État du service SSH         | `sudo systemctl status ssh`                 |
| Auth par clé activée        | `grep PubkeyAuthentication /etc/ssh/sshd_config` |
| IP bannie par fail2ban      | `sudo fail2ban-client status sshd`          |
| Logs SSH en temps réel      | `sudo journalctl -u ssh -f`                 |

**Permissions correctes :**
```sh
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
chown -R deploy:deploy ~/.ssh
```

**Débannir une IP avec fail2ban :**
```sh
sudo fail2ban-client set sshd unbanip VOTRE_IP
```

---

## Exemple de configuration du workflow GitHub Actions
```yaml
- name: 🚀 Déploiement SSH
  uses: appleboy/ssh-action@v1.0.3
  with:
    host: ${{ secrets.SSH_HOST }}
    username: ${{ secrets.SSH_USER }}
    key: ${{ secrets.SSH_PRIVATE_KEY }}
    script: |
      mkdir -p /var/www/cinelist
      rm -rf /var/www/cinelist/*
      # ... suite du déploiement
```

---

## Secrets GitHub requis

| Secret           | Valeur (exemple)                |
|------------------|---------------------------------|
| SSH_HOST         | 31.207.33.201                   |
| SSH_USER         | deploy                          |
| SSH_PRIVATE_KEY  | contenu de ~/.ssh/id_ed25519    |

---

## Récapitulatif des flux de clés

| Machine locale      | VPS (deploy@31.207.33.201)         |
|---------------------|------------------------------------|
| id_rsa.pub          | → ~/.ssh/authorized_keys           |
| id_ed25519.pub      | → ~/.ssh/authorized_keys           |

**GitHub Secret :**
```
SSH_PRIVATE_KEY = contenu de ~/.ssh/id_ed25519 (VPS)
```

> ⚠️ Ne jamais committer une clé privée dans un dépôt Git. Toujours passer par les secrets GitHub.