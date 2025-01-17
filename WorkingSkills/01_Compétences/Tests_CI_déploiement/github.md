# Github

🔙 Retour à la page [Tests, CI et déploiement](README.md)

## Concepts et définitions

### Qu'est-ce que Github ?

> GitHub est une plateforme de collaboration et d'hébergement de code basée sur Git, un système de contrôle de version distribué.

### Fonctionnalités de Github

- hébergement de dépôts Git (repos)
- gestion des versions du code source
- collaboration sur les projets : pull requests (PR), issues, discussions
- automatiqation des workflows avec les Github Actions
- déploiement des applications directement depuis le repo

### Commandes de base

#### Initialisation d'un projet

- démarrer un projet avec GitHub avec `git init` (initialisation d'un repo en local)
- ajouter les fichiers (`git add .`)
- créer le premier commit (`git commit -m "initial commit"`)
- créer un dépôt sur Github
- lier le dépôt local au dépôt distant : `git remote add origin https://github.com/<username>/<repository_name>.git`
- définir la branche principale : `git branch -M main`
- pousser le code : `git push -u origin main`

#### Travailler avec les branches

- créer une nouvelle branche : `git branch <branch_name>`
- passer sur une branche : `git checkout <branch_name>`
- créer une nouvelle branche + basculer dessus (commande 2-en-1) : `git checkout -b <branch_name>`
- fusionner une branche avec la branche `main` (ou autre branche) : se déplacer sur la branche `main` (`git checkout main`) puis `git merge <branch_name>`

### Réorganiser ou nettoyer l'historique des commits avec `git rebase`

#### Objectifs principaux

- créer un historique de commits propres en supprimant les commits "inutiles" ou en fusionnant les commits similaires
- synchroniser une branche avec une autre **sans les fusionner** (si une branche de de travail est en retard par rapport à la branche principale, cela permet de récupérer les derniers changements de la branche tout en gardant un historique linéaire)

#### Fonctionnement

**Cas 1 : mettre une branche à jour à partir de `main` :**

- on travaille sur une branche `feature` et des changements ont été intégrés à la branche `main` et on souhaite intégrer ces changements dans `feature`.

```bash
git checkout feature
git rebase main
```

→ Git va déplacer temporairement les commits de `feature` (qui ne sont pas dans `main`) et appliquer les nouveaux commits de `main` sur `feature`. Les commits de `feature` sont réappliqués par-dessus, comme s’ils avaient été créés après les nouveaux commits de `main`.

**Cas 2 : nettoyer des commits avec `git rebase -i`**

- on souhaite réécrire l'historique de commits ; pour cela, on utilise l'option interactive `-i`
- on peut fusionner, réorganiser ou modifier des commits
- actions possibles :

  - `pick` : garder le commit tel quel
  - `squash` : combiner ce commit avec le précédent
  - `edit` : modifier le contenu ou le message du commit
  - `reword` : modifier uniquement le message du commit
  - `drop` : supprimer le commit

```bash
git rebase -i HEAD~3

pick 123abc Ajout de la fonctionnalité X
pick 456def Correction d'un bug
pick 789ghi Mise à jour de la documentation
```

→ On ouvre l'éditeur avec la liste des trois derniers commits. On indique l'action à effectuer pour chaque commit.

#### Différence entre `git rebase` and `git merge`

| Type | `git merge` | `git rebase` |
|---|---|---|
| Résultat | Crée un commit de fusion (merge commit) | Réapplique les commits sur une autre base |
| Conséquence sur l'historique | Conserve l’historique complet (avec bifurcations) | Crée un historique linéaire |
| Gestion des conflits | Résolus pendant la fusion | Résolus pendant le rebase (commit par commit) |
| Contexte de travail privilégié | Collaboration en équipe, histoire de tout conserver | Travail individuel ou nettoyage d’historique |

#### Précautions

❌ Ne pas utiliser `git rebase` sur une branche déjà partagée avec d’autre (l'historique étant réécrit, cela peut provoquer des conflits pour les autres collaborateurs)

### *Pull Request* vs *Merge Request*

#### Pull Request (PR)

- outil/plateforme : principalement sur GitHub
- concept : demande pour fusionner des modifications (généralement d'une branche de fonctionnalité) dans une autre branche (souvent la branche principale, `main` ou `master`)
- workflow :
  
  1) création d'une nouvelle branche : elle est modifiée puis poussée sur le repo distant
  2) création d'une Pull Request en comparant la branche courante et la branche cible
  3) les collaborateurs examinent, commentent, et approuvent ou demandent des modifications avant la fusion

#### Merge Request (MR)

- outil/plateforme : principalement sur GitLab
- concept : demande similaire à une Pull Request, mais l'accent est mis sur l'acte de fusionner des modifications dans une branche cible.
- workflow :

  1) création d'une nouvelle branche : elle est modifiée puis poussée sur le repo distant
  2) création d'une Merge Request sur GitLab en spécifiant la branche source et la branche cible
  3) les collaborateurs examinent, commentent, et approuvent ou demandent des modifications avant la fusion

#### Différences principales entre PR et MR

| Type | Pull Request (GitHub) | Merge Request (GitLab) |
|---|---|---|
| Terminologie | "Pull Request" (demande de tirer) | "Merge Request" (demande de fusionner) |
| Objectif | Demander d'examiner les modifications | Demander d'intéfrer les modifications |
| Plateforme principale | GitHub | GitLab |
| Fonctionnalités spécifiques | GitHub propose un flux de discussion autour des Pull Requests et des intégrations avec Actions | GitLab permet une intégration native avec CI/CD et les pipelines au sein des Merge Requests |

- GitHub utilise le terme "Pull" car cela fait référence à l'action de tirer les modifications d'une branche pour les fusionner
- GitLab met l'accent sur la fusion des modifications (objectif final de la manipulation)

### GitHub Actions

#### Principe

- plateforme d'intégration et de livraison continues (CI/CD) intégrée à GitHub
- permet d'automatiser des workflows, comme les tests, les déploiements ou l'analyse de code, directement depuis un repo GitHub
- possibilité de créer des workflows basés sur des événements dans un repo (push, pull requests, issues, ou événements programmés)

#### Avantages de GitHub Actions

- intégration native avec GitHub (pas besoin de configurer un outil tiers, tout se fait directement depuis le repo)
- personnalisable (workflows personnalisables à l'aide de fichiers YAML)
- prise en charge de multiples environnements (Linux, macOS, ou Windows)
- vaste écosystème d'actions (GitHub fournit une marketplace proposant des actions réutilisables créées par la communauté)

#### Principales actions disponibles dans la marketplace

- actions/checkout : cloner le dépôt pour travailler dessus
- actions/setup-node : Configurer Node.js dans l’environnement.
    actions/upload-artifact : Enregistrer des fichiers ou des artefacts générés par le workflow.
    actions/cache : Mettre en cache les dépendances pour accélérer les workflows.

#### Utilisation des GitHub Actions

- automatisation des tests (par exemple, lancer les tests automatiquement sur chaque push ou pull request)
- automatisation du déploiement d'une application (par exemple, déployer sur des services comme AWS, Azure, Netlify ou Firebase lorsque du code est fusionné dans `main`)
- analyser du code avec des outils comme ESLint, Prettier ou des vérificateurs de sécurité
- générer et publier des builds automatiquement

#### Fonctionnement des GitHub Actions

- 3 concepts principaux : workflows, jobs et steps

**Workflows :**

- suite de tâches automatisées définies dans un fichier YAML
- stockés dans le répertoire .github/workflows du repo
- déclenchés par des événements (push ou une pull request, par exemple)

**Jobs :**

- composent le workflow (un workflow est composé de plusieurs jobs)
- série d'étapes exécutées dans un environnement isolé

**Steps :**

- tâches individuelles exécutées dans un job
- peuvent inclure des commandes shell ou des actions, qui sont des tâches préconfigurées

#### Exemple

```yaml
name: CI Workflow

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Install Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 16

    - name: Install dependencies
      run: npm install

    - name: Run tests
      run: npm test
```

Explications des commandes :

- `name` : nom du workflow (ici, "CI Workflow")
- `on` : les événements qui déclenchent le workflow (`push`, c'est-à-dire lorsqu'un push est fait sur la branche `main` et `pull_request`, lorsqu'une pull request est créée ou modifiée vers `main`)
- `jobs` : le workflow est divisé en `jobs` (ici, un seul job nommé `build`)
- `runs-on` : l’environnement sur lequel le job s’exécute (ici, ubuntu-latest)
- `steps` : les étapes du job (`uses` : utilisation d'une action préexistante depuis la marketplace,`run` : exécution de commandes shell comme `npm install`, `npm test`, etc.)

## Ressources

- GitHub Actions documentation on [GitHub](https://github.com/features/actions)
- "Pull Request vs Merge Request: Differences and Similarities" sur [Hatica](https://www.hatica.io/blog/pull-request-vs-merge-request/)
- "Pull Request vs. Merge Request: Definition, Differences and More" sur [simplilearn](https://www.simplilearn.com/pull-vs-merge-request-definition-differences-benefits-article)
