# Docker

🔙 Retour à la page [Tests, CI et déploiement](README.md)

## Concepts et définitions

### Qu'est-ce que Docker ?

> Docker est une plateforme permettant de containeriser des applications. Un **conteneur** est une unité logicielle légère, portable et isolée qui contient tout ce dont une application a besoin pour fonctionner : son code, ses bibliothèques, ses dépendances, et son environnement d'exécution. Cela garantit que l'application s'exécute de manière identique sur n'importe quel environnement (développement, tests, production).

### Avantages

- facilite le déploiement, la scalabilité et la gestion des applications
- réduit les problèmes de compatibilité entre environnements

### Création d'une image docker

- une image Docker est un modèle de base pour créer des conteneurs
- contient tout ce qu'il faut pour exécuter une application
- fichier clé : le Dockerfile, un script qui "décrit" comment construire l'image
- construire l'image à l'aide de la commande `docker build -t my-docker-app .` où `-t` correspond au tag de l'image (son nom) et `.` indique que le Dockerfile se trouve dans le répertoire courant

### Exécution d'un container

- un conteneur est une **instance en cours d’exécution d’une image** Docker
- lancer un conteneur avec la commande `docker run -d -p 3000:3000 --name my-container my-node-app` où `-d` lance le conteneur en mode "détaché" (il tourne en arrière plan), `-p 3000:3000` mappe le port 3000 de la machine hôte avec le port 3000 du conteneur,  `--name` spécifie le nom du conteneur et `my-node-app` le nom de l'image à exécuter.

#### Commandes avec Docker

- `docker ps`: voir les conteneurs en cours d’exécution
- `docker stop my-container` : arrêter un conteneur
- `docker rm my-container` : supprimer un conteneur

### Orchestration de containers avec docker-compose

- Docker Compose est un outil qui permet de définir et d’exécuter des applications multi-conteneurs à l’aide d’un fichier YAML.

#### Commandes utiles avec Docker Compose

- `docker compose up` : lancer les conteneurs définis dans `docker-compose.yml`
- `docker-compose down` : arrêter les conteneurs

### Docker vs Docker Compose

| Docker | Docker Compose |
|---|---|
| Gère un seul conteneur à la fois | Permet de gérer plusieurs conteneurs (multi-services) |
| Utilise des commandes manuelles (docker build, docker run, etc.) | Utilise un fichier YAML pour automatiser les configurations |
| Idéal pour des applications simples ou des tests rapides | Idéal pour des environnements complexes (base de données, back-end, front-end) |

### Autres commandes à retenir

- `docker ps` : lister les processus (conteneurs) Docker (avec `-a`, lister les conteneurs arrêtés)
- `docker stop <container_id>` ou `docker stop <container_name>` : arrêter un conteneur
- `docker logs <container_id>` ou `docker logs <container_name>` (avec `-f` (follow))
- `docker login` : lier le poste local au compte DockerHub
- `docker build -t <docker_username>/<container_name> .` : effectuer un build d'une image à partir du Dockerfile local (`.`) en l'assignant à l'user `docker_username` et en lui donnant le nom `container_name`
- `docker push <docker_username>/<container_name>` : envoyer vers DockerHub
- `docker pull <docker_username>/<container_name>` : récupérer de DockerHub
- `docker image rm <image_id>` ou `docker image rm <image_id>` : supprimer une image (⚠️ elle ne doit être liée à aucun conteneur, même un conteneur éteint)
- `docker compose up` : lire le `docker-compose.yml` et instancier les images listées

  - `-f <file_name>` :  permet de donner le path du fichier de config `file_name` à lire
  - `--build` : effectuer le rebuild de toutes les images concernées (prendre en compte les modifs de package.json par exemple)
  - `-d` : récuperer la main une fois les containers lancés (detached)
  - `-f /path_to_compose.yaml` : utiliser un compose.yaml specifique
  - `--env-file /path_to_file.env` : utiliser un .env specifique

- `docker compose down` : arrêter les containers
- `docker system prune -af --volumes` : supprimer l'ensemble des images/containers/volumes (permet de récupérer de la place sur le disque)
- `docker exec -it <container_id> sh` : rentrer dans le container possédant l'id `container_id` et ouvrir un terminal d'exploration
- `docker builder prune --all` : vider le cache de Docker
- `docker system df` : connaitre l'espace utilisé par Docker

## Exemples

### Exemple d'un Dockerfile simple pour une application Node.js

```docker
# Utiliser une image de base officielle
FROM node:16

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires dans l'image
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Exposer le port utilisé par l'application
EXPOSE 3000

# Commande à exécuter pour démarrer l'application
CMD ["npm", "start"]
```

### Exemple d’un fichier `docker-compose.yml`

```yaml
version: '3.9'

# 1 service = 1 conteneur
services:

  # Application Node.js
  app:
    build:
      context: .
      # Dockerfile créé pour l'application
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development

  # Base de données PostgreSQL
  db:
    # Utilisation d"une image préexistante
    image: postgres:14
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydatabase
    ports:
      - "5432:5432"
```

### Utilisation dans un projet personnel

- The Good Corner, projet de formation : [Github](https://github.com/NollieChtn6/the-good-corner)

## Ressources

- Docker CLI [Cheat Sheet](https://docs.docker.com/get-started/docker_cheatsheet.pdf)
- "Tout savoir sur Docker Compose", sur [Datascientest](https://datascientest.com/docker-compose-tout-savoir)
