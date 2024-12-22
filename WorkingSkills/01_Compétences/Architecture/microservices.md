# Architecture en microservices

🔙 Retour à la page [Architecture](README.md)

## Concepts et définitions

### Qu'est-ce que l'architecture en microservices ?

> L'architecture microservices est une approche de conception logicielle dans laquelle une application est décomposée en plusieurs services indépendants et autonomes. Chaque service est responsable d'une fonctionnalité métier spécifique et communique avec les autres services via des API ou des systèmes de messagerie.

### Architecture monolitique VS architecture en microservices

| Type | Monolithique | Microservices |
|---|---|---|
| Structure | Une application unique et centralisée | Plusieurs services indépendants |
| Développement | Forte dépendance entre les modules | Chaque service est autonome |
| Scalabilité | Scalabilité globale de l'application | Scalabilité fine (par service) |
| Déploiement | Une seule unité | Chaque service peut être déployée séparément |
| Maintenance | Les modifications risquent de tout impacter | Changements propres à un service |
| Performance | Plus rapide pour des petites apps simples | Plus efficace pour les grandes applications |
| Base de données | Une base centralisée | Une ou plusieurs bases par service |

### La communication asynchrone entre services

- les services doivent communiquer entre eux pour partager des informations ou coordonner des actions
- communication synchrone ou asynchrone

#### Communication synchrone (ex : REST)

Un service appelle directement un autre via une requête HTTP

- ⊕ : simple à implémenter
- ⊖ : dépendance au bon fonctionnement du service distant

#### Communication asynchrone (ex : systèmes de messagerie)

Les services communiquent via un broker de messages comme RabbitMQ, Kafka ou AWS SQS ; le service émetteur envoie un message dans une file, et le service destinataire le traite plus tard

- ⊕ : fort découplage entre les services, tolérance aux pannes (les messages restent en file d'attente si le service destinataire est temporairement indisponible), les files parallèles facilitent la scalabilité

```txt
Un service "Commandes" envoie un message dans une file pour signaler qu'une commande a été passée.
Un service "Inventaire" consomme ce message et met à jour les stocks.
```

### Déployer un cluster

- les services doivent être déployés dans des environnements scalables et robustes qui nécesssitent souvent l'utilisation de clusters
- un cluster est un ensemble de machines (ou de conteneurs) qui travaillent ensemble pour exécuter plusieurs instances des services
- le cluster permet de répartir la charge entre plusieurs nœuds
- il garantit la disponibilité en cas de panne d'un nœud
- outils courants pour le déploiement de clusters :
  - Docker : permet d'empaqueter chaque microservice dans un conteneur léger et portable
  - Kubernetes : permet d'orchestrer le déploiement, la gestion et la mise à l'échelle des conteneurs.

## Exemples

### Exemple de code commenté

Mise en place d'un conteneur Docker pour un microservice Node.js.

```ts
// fichier src/index.ts
import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// définition d'un endpoint pour tester le microservice
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Dockerized TypeScript Microservice!" });
});

// démarrage du serveur Express
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

```

```json
// package.json
{
  "name": "docker-ts-microservice",
  "version": "1.0.0",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node-dev --respawn src/index.ts"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.15",
    "@types/node": "^20.1.3",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.1.3"
  }
}
```

```dockerfile
# Utilisation d'une image officielle de Node.js
FROM node:alpine-lts

# Définition du répertoire de travail
WORKDIR /app

# Copie des différents fichiers nécessaires dans le conteneur
COPY package.json tsconfig.json ./
COPY src ./src

# Installation des dépendances
RUN npm install

# Compilation de TypeScript
RUN npm run build

# Exposition du port utilisé par l'application
EXPOSE 3000

# Lancement du serveur
CMD npm start
```

Construction de l'image avec la commande :

```bash
docker build - t microservices-test .
```

Lancement du conteneur à partir de l'image avec la commande :

```bash
docker run -d -p 3000:3000 --name ts-microservice-container microservices-test
```

Pour tester le microservice, accéder à `http://localhost:3000` dans un navigateur.

### Utilisation dans un projet personnel

- The Good Corner : [Github](https://github.com/NollieChtn6/the-good-corner)

## Ressources

- "Qu'est-ce que l'architecture de microservices ?", sur [Google Cloud](https://cloud.google.com/learn/what-is-microservices-architecture?hl=fr)
- "Architecture de microservices", sur [Atlassian](https://www.atlassian.com/fr/microservices/microservices-architecture)
