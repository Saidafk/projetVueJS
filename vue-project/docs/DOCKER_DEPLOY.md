# Déploiement Docker - CinéList

Ce document explique comment sont organisés les fichiers de déploiement Docker et comment déployer l'application localement.

## Emplacement des fichiers
- Fichiers de déploiement (compose + Dockerfile + nginx) : `deploy/`
- `.dockerignore` : à la racine du projet (utilisé lors du build)

Contenu principal :
- `deploy/Dockerfile` : Docker multi-stage (Node → build → Nginx)
- `deploy/docker-compose.yml` : compose qui build le projet depuis le contexte parent
- `deploy/nginx.conf` : configuration Nginx (support du mode history de Vue Router)

## Commandes locales
Depuis la racine du projet (`vue-project/`) :

```bash
# Lancer en mode détaché (rebuild si nécessaire)
docker compose -f deploy/docker-compose.yml up --build -d

# Arrêter et enlever les conteneurs
docker compose -f deploy/docker-compose.yml down

# Build manual (optionnel)
docker build -f deploy/Dockerfile -t cinelist ..
# Puis run
docker run -p 8080:8080 cinelist
```

## Remarques
- Le `build.context` du `docker-compose.yml` pointe sur la racine `..` pour inclure tout le code source.
- Garder `.dockerignore` à la racine : Docker lit `.dockerignore` depuis le contexte de build.
- Le `Dockerfile` utilise `npm install --legacy-peer-deps` pour contourner des conflits de peer dependencies lors du build.

## Tâche VS Code
Une tâche VS Code est fournie pour démarrer rapidement (voir `.vscode/tasks.json`).

## Taskfile (go-task)
Vous pouvez utiliser `go-task` (Taskfile) pour automatiser les commandes de déploiement. Installer le CLI :

```bash
npm install -g @go-task/cli
```

Fichier : `Taskfile.yml` à la racine. Commandes utiles :

```bash
# Installer le CLI (setup)
task setup

# Build local et image docker
task build

# Lancer (détaché)
task up

# Stop
task down

# Logs
task logs
```

Le `Taskfile.yml` utilise `deploy/docker-compose.yml` et `deploy/Dockerfile`.
