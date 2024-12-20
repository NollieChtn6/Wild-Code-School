# Node.js

🔙 Retour à la page [Développement](README.md)

## Concepts et définitions

### Qu'est-ce que Node.js ?

> Node.js est un environnement d'exécution JavaScript basé sur le moteur V8 de Google Chrome. Il permet d'exécuter du JavaScript côté serveur.

### Le système de _livereloading_

- prend les modifications en compte sans avoir besoin d'arrêter et de redémarrer le serveur manuellement
- exemple d'outil : Nodemon, qui permet de redémarrer automatiquement une application Node.js lorsque des fichiers sont modifiés (utiliser la commande : `nodemon app.ts`)

## Exemples

### Exemple de code commenté

Connexion à une base de données Postgresql à l'aide de TypeORM et mise en place d'un serveur GraphQL

```ts
// config/db.ts

import { DataSource } from "typeorm";
import { AdEntity } from "../entities/Ad";
import { CategoryEntity } from "../entities/Category";
import { TagEntity } from "../entities/Tag";
import { config } from "dotenv";

config();
const { DB_HOST, DB_PASSWORD, DB_USER, DB_NAME } = process.env;

// initialisation d'une nouvelle source de données (typeORM)
const dataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: 5432,
  entities: [AdEntity, CategoryEntity, TagEntity],
  synchronize: true,
});


/**
 * Fonction asynchrone permettant d'initialiser la source de données (la connexion à la base de données).
 * Elle tente de se connecter à la base de données et doit afficher un message en fonction du succès ou de l'échec.
 */

export const initializeDataSource = async () => {
  dataSource
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized successfully");
    })
    .catch((error) => {
  console.log("Error during Data Source initialization", error);
  });
};

```

```ts
// index.ts

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { initializeDataSource } from "./config/db";
import { AdResolver } from "./resolvers/AdResolver";
import { CategoryResolver } from "./resolvers/CategoryResolver";
import { TagResolver } from "./resolvers/TagResolver";

const PORT = 4000;

const startServer = async () => {
  // use function to initialize data source
  await initializeDataSource();
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver],
  });
  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  console.log(`Server ready at ${url}`);
};

startServer();


```

### Utilisation dans un projet personnel

- 👤 Formulaire d'authentification : [Github](https://github.com/NollieChtn6/Authentication-Form)

## Ressources
