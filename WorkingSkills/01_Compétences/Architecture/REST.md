# API REST

🔙 Retour à la page [Architecture](README.md)

## Concepts et définitions

### Qu'est-ce qu'une API REST ?

> Une `API REST` (ou API RESTful) est une interface permettant à différentes applications de communiquer entre elles  par le biais du protocole `HTTP`, en suivant les principes de l'architecture `REST` (Representational State Transfer).

### Caractéristiques d'une API REST

- stateless : chaque requête est indépendente (pas de conservation des données utilisateur)
- utilisation des verbes `HTTP` pour effectuer des opérations (cf. ci-dessous)
- standardisation du format pour les échanges de données (JSON ou XML)
- uniformisation dans la structure des routes et des réponses

### Les verbes `HTTP`

Les verbes `HTTP` décrivent l'action que l'on souhaite effectuer sur une ressource.

- `GET`: récupérer des informations

```ts
// récupérer les informations de l'utilisateur dont l'id est 1
GET /users/1
```

- `POST` : créer une nouvelle ressource

```ts
// ajouter un nouvel utilisateur
POST /users
```

- `PUT` : mettre à jour une ressource existante (entière)

```ts
// modifier les informations de l'utilisateur dont l'id est 1
PUT /users/1
```

- `PATCH` : mettre à jour une ressource existante (partielle)

```ts
// modifier uniquement l'email de l'utilisateur dont l'id est 1
PATCH /users/1
```

- `DELETE` : supprimer une ressource

```ts
// supprimer l'utilisateur dont l'id est 1
DELETE /users/1
```

### Les statuts `HTTP`

Les codes de statut `HTTP` indiquent le résultat d'une requête. Ils sont regroupés en plusieurs familles :

- `2XX` (succès de la requête) :
  - `200` : OK (requête réussie)
  - `201` : Created (création d'une nouvelle ressource)
  - `204` : No Content (aucune donnée retournée, mais succès)

- `4XX` (erreur côté client) :
  - `400` : Bad Request (erreur dans la requête envoyée)
  - `401` : Unauthorized (authentification requise)
  - `403` : Forbidden (accès interdit)
  - `404` : Not Found (ressource introuvable)

- `5XX` (erreur côté serveur) :
  - `500` : Internal Server Error (erreur interne au serveur)
  - `503` : Service Unavailable (service temporairement indisponible)

### Les endpoints

Un endpoint est une URL associée à une ressource ou à une action de l'API REST.

```ts
// endpoint :  /users
GET /users // récupérer tous les utilisateurs
GET /users/:id // récupérer un utilisateur spécifique
POST /users // créer un utilisateur
PUT /users/:id // mettre à jour un utilisateur
DELETE /users/:id // supprimer un utilisateur
```

Le endpoint peut également inclure des paramètres de requête pour filtrer ou trier les données :

```ts
GET /users?age=25&sort=desc
```

### CORS (Cross-Origin Resource Sharing)

CORS est un mécanisme de sécurité qui permet à une application front-end d'accéder à une API située sur un autre domaine.

Par défaut, pour des raisons de sécurité, les navigateurs bloquent les requêtes effectuées vers des domaines différents de celui de l'application front-end.
CORS permet d'autoriser ou de refuser ces requêtes en ajoutant des en-têtes HTTP spécifiques.

```ts
// configuration de cors côté serveur à l'aide du middleware `cors`

import cors from "cors";
app.use(cors({
  origin: "https://example.com", // spécification du domaine autorisé
  methods: ["GET", "POST"], // spécification des méthodes autorisées
}));
```

### Bonnes pratiques pour la nomenclature

Une bonne nomenclature facilite la compréhension et la maintenance d’une API :

- les routes doivent représenter des *ressources*, pas des actions
  - 👍🏻 Correct : `/users`
  - 👎🏻 Incorrect : `/getUsers`, `/createUser`
- utilisations de noms au pluriel (faciliter la généralisation des endpoints)
  - 👍🏻 Correct : `/users`, `/products`
  - 👎🏻 Incorrect : `/user`, `/product`
- hiérarchisation logique (structurer les routes pour refléter la relation entre les ressources)
  - 👍🏻 Correct : `GET /users/:id/comments` (récupérer les commentaires d'un utilisateur donné)
- pas de verbes dans les routes (les verbes HTTP suffisent à spécifier l'action)
  - 👍🏻 Correct : `DELETE /user/:id`
  - 👎🏻 Incorrect : `/deleteUser/:id`
- utilisation d'identifiants clairs, unites et explicites
  - 👍🏻 Correct : `/users/:id` (`:id` est l'identifiant unique de l'utilisateur)

## Exemples

### Exemple de code commenté

```ts
// création d'un routeur pour gérer les requêtes liées à la ressource `task`
export const tasksRouter = require("express").Router();

import * as tasksController from "../controllers/tasksController";

// récupérer la liste des tâches
tasksRouter.get("/tasks", tasksController.getAllTasks);
// récupérer une tâche
tasksRouter.get("/tasks/:id", tasksController.getTaskById);
// ajouter une tâche
tasksRouter.post("/tasks/create", tasksController.createNewTask);
// modification d'une tâche
tasksRouter.patch("/tasks/:id/update", tasksController.updateTask);
// modification du statut d'une tâche
tasksRouter.patch("/tasks/:id/toggle-status", tasksController.updateTaskStatus);
// suppression d'une tâche
tasksRouter.delete("/tasks/:id/delete", tasksController.deleteTag);

```

### Utilisation dans un projet personnel

- To Do List 2.0 : [Github](https://github.com/NollieChtn6/Todo-List-2.0)

## Ressources

- Les codes `HTTP`... vus par les chats : [HTTP Cats](https://http.cat/)
- "Une API REST, qu'est-ce que c'est ?", sur le [site de Red Hat](https://www.redhat.com/fr/topics/api/what-is-a-rest-api)
- "Qu'est-ce qu'une API REST ?", sur le [site d'IBM](https://www.ibm.com/fr-fr/topics/rest-apis)
