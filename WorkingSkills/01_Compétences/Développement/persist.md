# Authentification persistante

🔙 Retour à la page [Développement](README.md)

## Concepts et définitions

### Qu'est-ce que l'authentification persistante ?

> L'authentification persistante permet de reconnaître un utilisateur lors de ses interactions avec l'application, sans qu'il ait à se reconnecter à chaque requête.

### Les principales méthodes : avantages et inconvénients

|Méthode |Description | Avantages | Inconvénients |
|--|--|--|--|
|Session côté serveur | L’utilisateur reçoit un identifiant de session stocké sur le serveur, et un cookie lui est attribué. | Sécurisé (données côté serveur), expiration configurable | Consommation de mémoire serveur, nécessite un équilibrage si plusieurs serveurs |
| JWT (JSON Web Token)  | Un token signé est stocké côté client et envoyé avec chaque requête pour identifier l’utilisateur. | Statelss (pas de charge côté serveur), extensible (informations embarquées) | Risque si mal stocké (ex : localStorage), expiration à bien gérer |
| OAuth 2.0 + OpenID Connect | Authentification déléguée via un fournisseur tiers (Google, Facebook, etc.), l’application reçoit un token valide. | Sécurité renforcée, gestion facilitée | Dépendance à un fournisseur tiers, plus complexe à implémenter |
| Cookies sécurisés (HttpOnly, Secure, SameSite) |L’utilisateur reçoit un cookie d’authentification géré automatiquement par le navigateur. | Sécurisé contre XSS, facile à gérer | Vulnérable aux attaques CSRF si mal configuré |
| Session Storage / Local Storage | Stocke un token d’authentification dans le navigateur pour l’envoyer aux requêtes API. | Simple à mettre en place | Risque en cas de vol de token via XSS |

### Session côté serveur vs JWT

| Critère | Session | JWT |
|--|--|--|
|Stockage|Serveur|Client (navigateur ou application)|
|Évolutivité|Plus complexe si plusieurs serveurs (nécessite Redis, etc.)|Plus facile à gérer (stateless)|
|Sécurité|Moins de risque de vol si cookie sécurisé|Peut être compromis si mal stocké|
|Expiration|Gérée côté serveur|Doit être bien gérée via refresh token|
|Cas d'usage| Apps avec backend|APIs RESTful, SPAs, apps mobiles|

### Gestion des tokens et sessions

#### Gestion des sessions (côté serveur)

Fonctionnement d'une session classique :

1) L’utilisateur s’authentifie, une session est créée côté serveur avec un identifiant unique.
2) Un cookie de session est envoyé au navigateur (Set-Cookie: session_id=xyz; HttpOnly; Secure).
3) À chaque requête, le navigateur renvoie le cookie, permettant de retrouver l’utilisateur.
4) La session expire après un certain temps ou si l’utilisateur se déconnecte.

✅ Bonnes pratiques :

- activer HttpOnly et Secure sur les cookies (protection contre XSS)
- définir un SameSite=Strict pour éviter les attaques CSRF
- nettoyer les sessions expirées en base

#### Gestion des JWT (JSON Web Tokens)

JWT permet d'identifier un utilisateur sans état (stateless).

1) L’utilisateur s’authentifie et reçoit un token signé (header.payload.signature).
2) Le token est envoyé avec chaque requête API (Authorization: Bearer xyz).
3) Le serveur vérifie la signature pour valider l’identité de l’utilisateur.
4) Un refresh token peut être utilisé pour générer un nouveau JWT quand il expire.

✅ Bonnes pratiques :

- ne jamais stocker un JWT dans localStorage (risque XSS)
- privilégier les cookies sécurisés avec HttpOnly
- utiliser un refresh token pour éviter une expiration trop courte

### Gestion de l’expiration et de la déconnexion

#### Expiration des sessions et des tokens

Sessions côté serveur :

- expirent après une durée définie

JWT :

- expire selon la valeur du exp dans le payload
- utilisation de refresh tokens pour renouveler l’authentification

#### Déconnexion sécurisée

Sessions :

- supprimer l’identifiant de session côté serveur
- supprimer le cookie client (Set-Cookie: session_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT)

JWT :

- invalider le token côté serveur via une blacklist
- révoquer le refresh token

### Points principaux à retenir pour la sécurisation

- limiter la durée de vie des sessions et tokens
- activer 2FA pour éviter l’usurpation d’identité
- surveiller les connexions suspectes (IP, device)
- utiliser HTTPS pour chiffrer les échanges
- implémenter une déconnexion automatique après inactivité

## Exemples

### Exemple de code commenté

—

### Utilisation dans un projet personnel

- Titre du projet : [Github](https://github.com/NollieChtn6/) ou [version en ligne](https://mywebsite.com)

## Ressources

- "JWT vs Session Authentication", par [Royal Jain sur DEV](https://dev.to/codeparrot/jwt-vs-session-authentication-1mol)
