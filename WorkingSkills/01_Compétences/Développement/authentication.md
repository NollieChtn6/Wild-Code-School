# Authentification

🔙 Retour à la page [Développement](README.md)

## Concepts et définitions

### Qu'est-ce que l'authentification ?

> L’authentification est le processus qui permet de vérifier l’identité d’un utilisateur ou d’un système avant d’accéder à une ressource. Elle garantit que la personne ou l’entité qui tente de se connecter est bien celle qu’elle prétend être. L’authentification est souvent couplée à l’autorisation, qui détermine les actions qu’un utilisateur peut effectuer une fois authentifié.

### Différents types d'authentification

Plusieurs types d'authentification possibles :

- authentification par mot de passe (classique, mais vulnérable) :
  - hashage sécurisé (bcrypt, argon2, PBKDF2)
  - ajout d’un "sel" (salt) pour éviter les attaques par rainbow table
  - règles de complexité pour éviter les mots de passe faibles (caractères, chiffres, etc.)
- authentification à deux facteurs (2FA) (renforce la sécurité avec un second élément)
- authentification biométrique (empreinte digitale, reconnaissance faciale)
- authentification basée sur un token (JWT, OAuth, etc.)
- authentification sans mot de passe (lien magique, clé FIDO2)

#### Méthodes de stockage des mots de passe et des sessions

Pour les mots de passe :

- utiliser un algorithme de hashage sécurisé (bcrypt, argon2, PBKDF2)
- ajouter un "sel" (salt) pour chaque mot de passe pour éviter les attaques par rainbow table
- ne jamais stocker un token JWT dans le localStorage, préférer un cookie HttpOnly

Pour les sessions :

- sessions côté serveur (stockées en base de données, associées à un cookie sécurisé)
- Tokens JWT (stockés côté client et envoyés à chaque requête)

#### Protocoles dédiés pour gérer l’authentification de manière sécurisée

- OAuth 2.0 : permet à un utilisateur de s’authentifier via un tiers (Google, Facebook…)
- OpenID Connect (OIDC) : Extension de OAuth 2.0, ajoute la gestion des identités
- SAML (Security Assertion Markup Language) : Courant en entreprise, notamment pour le SSO
- LDAP (Lightweight Directory Access Protocol) : Utilisé pour gérer les utilisateurs en entreprise

#### Nouvelles méthodes d'authentification sans mots de passe

- WebAuthn & Passkeys : utilisation de clés cryptographiques pour se connecter sans mot de passe
- Magic Link : envoi d’un lien par email pour authentifier un utilisateur
- FIDO2 & Clés physiques : sécurisation via des clés matérielles (Yubikey, Google Titan)

#### Avantages et inconvénients de chaque méthode

| Méthode | Avantages | Inconvénients |
|---------|-----------|---------------|
|Mot de passe classique |Simple à implémenter, compatible avec tout |Vulnérable au phishing, aux fuites de données, et aux attaques par force brute|
|Authentification à deux facteurs (2FA) | Ajoute une couche de sécurité supplémentaire | Peut être contraignant pour l'utilisateur (nécessite un appareil supplémentaire) |
| Authentification biométrique (empreinte, reconnaissance faciale) |Rapide, difficile à falsifier | Peut poser des problèmes de confidentialité (stockage des données biométriques)|
| Token-based (JWT, OAuth, API Keys) | Pratique pour les applications web et mobiles | Risque si le token est compromis (ex : stockage non sécurisé)  |
| Authentification sans mot de passe (Magic Link, WebAuthn) | Supprime les mots de passe donc réduit les attaques par vol de credentials  | Dépendance aux emails/SMS ou aux navigateurs compatibles|

### Reconnaissance de l'utilisateur authentifié : l'authentification persistante

Une fois authentifié, un utilisateur doit être reconnu sans avoir à se reconnecter à chaque action.

👉🏻 cf. fiche associée : [🔐 Authentification persistante](persist.md)

### Authentification faible et/ou défectueuse

#### Risques

✔ attaques par force brute (test de multiples combinaisons de mots de passe)
✔ phishing (vol de mots de passe via des sites ou emails frauduleux)
✔ attaques par interception (Man-in-the-Middle) (si les identifiants ne sont pas protégés par HTTPS)
✔ réutilisation de mots de passe (si un utilisateur utilise le même mot de passe sur plusieurs sites)
✔ attaques par vol de session (exploitation de sessions non sécurisées)
✔ vol de token JWT ou API Keys (si ces derniers sont mal stockés côté client)

#### ✅ Bonnes pratiques pour réduire les risques liés aux mots de passe

- forcer des mots de passe forts (longs, complexes)
- implémenter un verrouillage après plusieurs tentatives échouées
- toujours utiliser HTTPS pour protéger les échanges
- stocker les mots de passe de manière sécurisée (bcrypt, Argon2, PBKDF2)
- activer le 2FA ou utiliser une authentification sans mot de passe

#### ✅ Bonnes pratiques pour sécuriser l'authentification et la gestion des sessions

- utiliser HTTPS pour chiffrer les échanges
- limiter les tentatives de connexion pour bloquer les attaques par force brute
- activer le 2FA (par application mobile ou clé physique)
- définir une expiration des sessions pour éviter les connexions persistantes indésirables
- implémenter des cookies sécurisés (HttpOnly, SameSite=Strict, Secure)

### Rôles, autorisations et gestion des Accès

#### Authentification vs autorisation

- authentification : prouve l'identité d'un utilisateur, mais ne définit pas ce qu'il peut faire
- autorisation : définit les droits d'accès de l'utilisateur qui définit ses droits d’accès

#### Types de rôles

- utilisateur standard : accès limité aux fonctionnalités de base
- administrateur : accès avancé, peut gérer les autres utilisateurs
- super-administrateur : accès total au système
- rôles personnalisés (par exemple : un 'éditeur' peut publier du contenu, mais pas gérer les utilisateurs)

#### Méthodes d’implémentation

✔ RBAC (Role-Based Access Control) : attribuer un rôle global (ex: admin, user, manager)

✔ ABAC (Attribute-Based Access Control) : permissions plus granulaires basées sur des attributs (ex: un employé peut voir ses propres données, mais pas celles des autres)

✔ ACL (Access Control List) : définit des règles précises par ressource (ex: un fichier peut être accessible en lecture mais pas en écriture)

⚠️ Une mauvaise gestion des autorisations peut entraîner des escalades de privilèges, où un utilisateur obtient des accès qu’il ne devrait pas avoir.

## Exemples

### Exemple de code commenté

—

### Utilisation dans un projet personnel

- Mise en place d'un système d'authentification par mot de passe et 'Connect With Google' : [Github](https://github.com/NollieChtn6/Authentication-Form)

## Ressources

- [Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) d'OWASP
