# Scrum

🔙 Retour à la page [Développement](README.md)

## Concepts et définitions

### Qu'est-ce que Scrum ?

> Scrum est un cadre de travail Agile (ou "framework") utilisé principalement pour la gestion de projets et le développement logiciel. Il repose sur des *sprints* (cycles courts et itératifs) pour livrer des fonctionnalités incrémentales et améliorer constamment les résultats. L'objectif de Scrum est de favoriser la collaboration, la transparence et l'adaptabilité, en mettant l'accent sur l'interaction humaine et les retours fréquents.

### Méthodes Agile vs Scrum

- Agile est un ensemble de principes pour gérer des projets de manière itérative et flexible
- Scrum est un cadre précis *basé sur* les principes Agile. Il fournit des rôles, des événements (rituels), et des artefacts spécifiques pour gérer les projets (cf. ci-dessous)

### Les rituels

| Nom | Durée préconisée | Objectif | Intérêt |
|---|---|---|---|
|Daily Standup Meeting | 15 minutes | Partager les progrès quotidiens, identifier les blocages, et synchroniser l'équipe | Favoriser la transparence et aider à résoudre rapidement les problèmes |
| Sprint Planning | 2 à 4 heures | Définir les objectifs du sprint et sélectionner les tâches du backlog | Clarifier ce qui doit être accompli et garantir un alignement des travaux de l'équipe |
| Rétrospective | 1 à 2 heures (en fin de script) | Identifier ce qui a bien fonctionné et ce qui peut être amélioré | Favoriser une amélioration continue du processus |
|Grooming (aka 'refinement') |  1 à 2 heures par sprint | Affiner et prioriser les user stories dans le backlog | Prépare les tâches pour les prochains sprints |
| Poker Planning | Variable | Estimer la complexité des tâches en utilisant des points de complexité ou des story points | Mieux prévoir les efforts nécessaires au développement du projet |

### Les rôles

| Nom | Périmètre | Rôle |
|---|---|---|
|Scrum Master| Responsable de la méthodologie Scrum | Faciliter les rituels, supprimer les obstacles, et protéger l'équipe des distractions extérieures |
| Product Owner | Responsable du backlog produit | Prioriser les user stories en fonction des besoins des utilisateurs et des objectifs business |
| Stakeholder (partie prenante) | Personne ou groupe intéressé par le projet (clients, direction, utilisateurs) | Fournir des retours, définir les attentes, et valider les résultats livrés |

### Rédiger une User Story complète

#### Prérequis

- format standard

```txt
En tant que [type d'utilisateur], je veux [expression du besoin] afin de [bénéfice, objectif].
```

- définition de critères d'acceptation : quelles sont les conditions à remplir pour considérer la tâche comme terminée ?

- définir la priorité et les estimations : chaque user story doit être priorisée et estimée en matière de complexité

#### Exemple

```txt
En tant qu'utilisateur authentifié, je veux pouvoir réinitialiser mon mot de passe, afin de retrouver l'accès à mon compte.
```

Critères d'acceptation : le lien de réinitialisation expire après 24h, l'utilisateur reçoit un email de confirmation lorsque le mot de passe a été modifié.

### Product Backlog

- c'est la liste ordonnée de tout ce qui doit être fait dans le projet
- contenu : user stories, bugs, améliorations, tâches techniques
- géré par le Product Owner avec mise à jour continue
- tri des éléments en fonction de leur priorité, révision des priorités à chaque sprint

### Sprint

- c'est une itération temporelle (~ 2 à 4 semaines) durant laquelle une équipe Scrum travaille sur un ensemble de tâches définies lors du Sprint Planning
- à la fin d'un sprint, livraison d'un incrément fonctionnel
- il doit permettre de faire des ajustements rapides en fonction des retours

### Burndown Chart

- c'est un graphique qui montre l'évolution du travail restant dans un sprint ou un projet
- axe horizontal : temps (jours du sprint)
- axe vertical : travail restant (en story points ou en tâches)
- il permet de suivre la progression du projet et d'identifier si l'équipe est en retard ou en avance

### Unités de complexité : *Story Points* et heures/jours idéaux

- Story Points : évaluer la complexité relative d'une tâche (basée sur l'effort, le risque, et les inconnues)
- heures ou jours idéaux : estimer la durée nécessaire pour accomplir une tâche si aucune interruption n'a lieu

### *Definition of Done* (DoD)

- c'est est une checklist des critères que chaque tâche ou user story doit remplir pour être considérée comme terminée
- permet d'assurer la qualité du travail
- elle définit des attentes claires pour l'équipe et les parties prenantes du projet

## Ressources

- "C'est quoi la méthode SCRUM ?" sur le [site d'Ignition Program](https://ignition-program.com/tuto/la-methode-scrum-pour-les-nuls)
- [Scrum.org](https://www.scrum.org/)
- [Scrum Alliance](https://resources.scrumalliance.org/)
