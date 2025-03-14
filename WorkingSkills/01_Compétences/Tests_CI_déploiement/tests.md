# Tests

🔙 Retour à la page [Tests, CI et déploiement](README.md)

## Concepts et définitions

### Que sont les tests ?

> Les tests sont un ensemble de processus permettant de vérifier qu’une application fonctionne comme prévu et respecte les exigences métier. Ils sont essentiels pour garantir la stabilité du code, éviter les régressions et améliorer la maintenabilité du projet.

### Les tests unitaires

- vérifient qu’une unité de code (fonction, classe, méthode) fonctionne correctement de manière isolée.

- permettent de tester une petite portion du code indépendamment du reste de l’application

```ts
// Typescript + Jest

function add(a: number, b: number): number {
  return a + b;
}
test("adding 2 to 3 must return 5", () => {
  expect(add(2, 3)).toBe(5);
});

```

#### ✅ Objectifs des tests unitaires

- détecter rapidement les erreurs
- faciliter la refactorisation du code
- assurer la stabilité des fonctionnalités de base d'une app

### Les mocks (simulacres)

- permettent de remplacer des dépendances externes (base de données, API, services, etc.) pour tester une unité de code sans dépendre d’éléments externes

- permettent de simuler le comportement d’une dépendance pour isoler le test

```ts
// Typescript + Jest

const fetchData = async () => {
  return await fetch("https://api.example.com/data").then(res => res.json());
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: "mocked data" }),
  })
) as jest.Mock;

test("fetchData should return mocked data", async () => {
  const data = await fetchData();
  expect(data).toEqual({ data: "mocked data" });
});
```

#### ✅ Objectifs des mocks

- éviter de tester l'app en dépendant surnune API externe
- simuler des cas d’erreurs ou des temps de réponse spécifiques
- rendre les tests plus rapides et prévisibles

### Les tests d'intégration

- vérifient que plusieurs composants fonctionnent bien ensemble
- contrairement aux tests unitaires, ils ne testent pas une seule fonction isolée, mais plutôt le lien entre différentes parties du système
- permettent de tester l'interaction entre plusieurs modules (par exemple, une API et une BDD)

```ts
// Utilisation de Jest et Superset pour tester une API Express

import request from "supertest";
import app from "../app"; // ~ server

test("GET /users returns a list of users", async () => {
  const response = await request(app).get("/users");
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("users");
});

```

#### ✅ Objectifs des tests d'intégration

- vérifier le bon fonctionnement entre plusieurs composants
- détecter des erreurs liées aux interactions entre services
- tester les routes d’une API, la connexion à une base de données, etc.

### Les tests de Bout en Bout (End-to-End ou E2E)

- simulent un parcours utilisateur complet pour s’assurer que l’application fonctionne correctement du début à la fin
- vérifient qu’un utilisateur peut utiliser l’application sans problème, en testant les interactions réelles entre le front-end, le back-end et la base de données

```ts
// Avec Cypress

describe("Connection test", () => {
  it("Logs in with valid credentials", () => {
    cy.visit("/login");
    cy.get("input[name=email]").type("user@example.com");
    cy.get("input[name=password]").type("password123");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/dashboard");
  });
});
```

#### ✅ Objectifs des tests E2E

- simuler des scénarios utilisateurs réels
- vérifier le bon fonctionnement des flux métier
- tester des cas complexes qui impliquent plusieurs systèmes

### Le TDD (Test-Driven Development)

- consiste à écrire les tests avant d’écrire le code
- principe de fonctionnement :

  - écrire un test qui échoue (= fonctionnalité pas encore implémentée)
  - écrire le minimum de code pour faire passer le test
  - refactoriser le code tout en s’assurant que les tests passent toujours

```ts

// écriture du test === échec

test("addition de 2 et 2 doit retourner 4", () => {
  expect(add(2, 2)).toBe(4);
});

// implémentation de la fonction pour passer le test

function add(a: number, b: number): number {
  return a + b;
}

// refactorisation si besoin
```

#### Objectifs du TDD

- favoriser un code propre et bien structuré
- assurer une couverture de test élevée
- faciliter la détection des erreurs dès le début du développement

### Les tests par Snapshot

- permettent de capturer un état d’un composant (ex. un rendu React) et de s’assurer qu’il ne change pas de manière inattendue
- détectent les modifications involontaires dans l’interface utilisateur ou les structures de données

```ts
// React + Jest

import React from "react";
import renderer from "react-test-renderer";
import MyComponent from "../MyComponent";

test("Rendu du composant ne change pas", () => {
  const tree = renderer.create(<MyComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});

```

Lors du premier test, Jest enregistre un snapshot du rendu.
Si le rendu change, Jest demandera de valider la modification.

#### ✅ Objectifs des tests par snapshot

- détecter les modifications non intentionnelles dans l’UI
- faciliter la vérification des composants React/Vue/Angular
- assurer la stabilité visuelle d’une application

## Exemples

### Exemple de code commenté

cf. blocs de code ci-dessus

### Utilisation dans un projet personnel

- Utilisation de Vitest pour tester la génération des mots de passe aléatoires en fonction de plusieurs critères (Password Generator) : [Github](https://github.com/NollieChtn6/Password-Generator) ou [version en ligne](https://password-generator.nolliechtn6.com/)

## Ressources

- "Les différents types de tests logiciels" sur [Atlassian](https://www.atlassian.com/fr/continuous-delivery/software-testing/types-of-software-testing)
- "Le test-driven development (TDD) : avantages et 3 étapes à suivre" sur [Hubspot Blog](https://blog.hubspot.fr/website/test-driven-development)
- "Guide des méthodologies de test de logiciels : un aperçu de haut niveau" sur [Parasoft](https://fr.parasoft.com/blog/software-testing-methodologies-guide-a-high-level-overview/)
- "Les types de tests" sur [Test-Academy](https://testacademy.fr/les-types-de-test/)
