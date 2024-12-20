# GraphQL

🔙 Retour à la page [Architecture](README.md)

## Concepts et définitions

### Qu'est-ce que GraphQL ?

> GraphQL est un langage de requête pour les API ainsi qu'un runtime pour exécuter ces requêtes sur des données. Créé par Facebook, c'est une alternative flexible et efficace à REST.

### GraphQL vs API REST

| Caractéristique | REST | GraphQL |
|---|---|---|
| Endpoints | Plusieurs endpoints spécifiques | Un seul endpoint pour toutes les données |
| Données renvoyées | Toutes les données ne sont pas forcément utilisées | Précisions sur les données attendues |
| Appels réseau | Plusieurs appels pour des ressources | Un seul appel pour toutes les données|
| Flexibilité | - | + |

```ts
GET /users/:id // récupérer un utilisateur
GET /users/:id/posts // récupérer les posts de l'utilisateur
```

```graphql
# récupérer un utilisateur et tous ses posts
query {
  user(id: 1) {
    name
    email
    posts {
      title
    }
  }
}
```

### Les avantages de GraphQL

- éviter le problème de surcharge ou le manque de données renvoyées par REST : on récupère uniquement les champs souhaités
- limiter les appels au réseau : une seule requête suffit
- complexité du versioning : les APIs REST nécessitent des versions pour introduire les changements tandis qu'avec GraphQL, il suffit d'étendre les schémas
- faciliter la documentation : les schémas sont auto-documentés avec GraphQL tandis que les APIs REST nécessitent une documentation séparée

### Qu'est-ce qu'un schéma ?

- c'est la structure des données et des opérations disponibles dans une API GraphQL
- il est rédigé à l'aide du GraphQL Schema Definition Language (SDL)

```graphql
# définir un type "User"
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post]
}

# définir un type "Post"
type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}

# définir un type "Query"
type Query {
  user(id: ID!): User
  posts: [Post]
}

# définir les opérations de modification
type Mutation {
  createUser(name: String!, email: String!): User
}

# définir les opérations de modification en temps réel
type Subscription {
  postAdded: Post
}
```

### Les `Query`

- les queries sont utilisées pour lire les données
- équivalentes au `GET` des APIs REST

```graphql
# récupérer un utilisateur et ses posts
query {
  user(id: 1) {
    name
    email
    posts {
      title
    }
  }
}
```

### Les `Mutation`

- les mutations sont utilisées pour modifier des données
- elles permettent de créer, de mettre à jour ou de supprimer une ressource (équivalentes aux `POST`, `PATCH`, `PUT` et `DELETE` des APIs REST)

```graphql
# création d'un nouvel utilisateur
mutation {
  createUser(name: "Alice", email: "alice@example.com") {
    id
    name
  }
}
```

### Les `Subscription`

- les souscriptions permettent de recevoir des mises à jour en temps réel lorsqu'une donnée change
- elles utilisent souvent des protocoles comme WebSockets

```graphql
# être notifié lors de l'ajout d'un post
subscription {
  postAdded {
    id
    title
  }
}
```

## Exemples

### Exemple de code commenté

Mise en place d'un dupe d'un célèbre site de petites annonces :

```ts
import { Query, Resolver, Arg } from "type-graphql";
import { CategoryEntity } from "../entities/Category";
import { AdEntity } from "../entities/Ad";

@Resolver(CategoryEntity)
export class CategoryResolver {
  @Query(() => [CategoryEntity])
  async categories(): Promise<CategoryEntity[]> {
    const categories = await CategoryEntity.find();
    return categories;
  }

// récupérer 
  @Query(() => CategoryEntity)
  async categoryById(@Arg("id") id: number): Promise<CategoryEntity> {
    const selectedCategory = await CategoryEntity.findOneByOrFail({ id });
    if (!selectedCategory) {
      throw new Error("Category not found!");
    }
    return selectedCategory;
  }

 // récupérer les annonces en fonction de la catégorie sélectionnée
  @Query(() => [AdEntity])
  async adsByCategory(@Arg("categoryId") categoryId: number): Promise<AdEntity[]> {
    const ads = await AdEntity.find({
      relations: {
        category: true,
      },
      where: {
        category: { id: categoryId },
      },
    });
    return ads;
  }
}
```

### Utilisation dans un projet personnel

- Générateur d'histoires aléatoires : [Github](https://github.com/NollieChtn6/Random-Stories-Generator)

## Ressources

- [Site officiel de GraphQL](https://graphql.org/)
- "Comprendre GraphQL en 5 minutes" sur [JeSuisUnDev](https://www.jesuisundev.com/comprendre-graphql-en-5-minutes/)
