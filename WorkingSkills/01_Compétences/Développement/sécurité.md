# Sécurité

🔙 Retour à la page [Développement](README.md)

## Concepts et définitions

### La sécurité dans une application

> La sécurité est un élément crucial du développement d'une application web. Une application vulnérable peut être la cible d'attaques mettant en péril la confidentialité des données des utilisateurs, la disponibilité du service et l'intégrité du système.

### L'OWASP

- acronyme de Open Web Application Security Project
- organisation à but non lucratif dédiée à la sécurité des applications web
- elle fournit des ressources, des outils et des bonnes pratiques pour aider les développeurs à sécuriser leurs applications
- elle publie régulièrement le *Top 10 OWASP*, une liste des vulnérabilités les plus critiques rencontrées dans les applications web.
- elle fournit aussi des outils comme OWASP ZAP (scanner de vulnérabilités open-source)

### Les injections SQL

C'est un type d'attaque qui exploite une faille de sécurité dans une application interagissant avec une base de données.

#### :skull: Principe

L'attaquant insère des requêtes SQL malveillantes dans un champ utilisateur non sécurisé ; cela peut lui permettre de lire, modifier ou supprimer des données sensibles, ou exécuter des commandes administrateur sur la base de données.

#### Exemple d'injection SQL

```sql
SELECT * FROM users WHERE email = 'attacker@example.com' OR '1'='1';
-- Si les champs ne sont pas protégés, cette requête affiche tous les utilisateurs de la base de données
```

#### :shield: Se protéger contre les injections SQL

- utiliser des requêtes préparées avec des paramètres

``` ts
const query = "SELECT * FROM users WHERE email = ?";

db.execute(query, [userEmail]);
```

- éviter d'exécuter des requêtes construites dynamiquement à partir des entrées utilisateur.
- limiter les permissions des utilisateurs de la base de données.

### Le XSS (Cross-Site Scripting)

Le XSS est une attaque où un attaquant injecte du code malveillant (souvent du JavaScript) dans une page web afin d'exécuter du code dans le navigateur des utilisateurs.

#### :skull: Types de XSS

- XSS stocké : l'attaque est enregistrée dans la base de données et affecte tous les utilisateurs qui consultent la page.
- XSS réfléchi : l'attaque est intégrée dans une URL et s'exécute quand la victime clique dessus.
- XSS basé sur le DOM : l'attaque manipule le DOM de la page à l'aide de JavaScript.

#### Exemple de XSS

Si un champ de commentaire permet d'enregistrer `<script>alert('XSS!')</script>`, alors chaque utilisateur consultant la page exécutera cette alerte.

#### :shield: Se protéger contre les attaques XSS

- échapper correctement les entrées utilisateurs avant de les afficher (HTML, JS, URL encoding)
- utiliser Content Security Policy (CSP) pour limiter l'exécution de scripts non autorisés
- ne jamais insérer des entrées utilisateur directement dans du code HTML sans validation

### Le CSRF (Cross-Site Request Forgery)

Le CSRF est une attaque où un attaquant exploite l'authentification d'un utilisateur pour effectuer une action non autorisée sur un site web.

#### :skull: Fonctionnement

Si un utilisateur est connecté à son compte, un attaquant peut lui faire exécuter une action à son insu, comme modifier son mot de passe ou envoyer de l'argent.

#### Exemple de CSRF

``` html
<img src="https://bank.com/transfer?amount=1000&to=attacker" />

<!-- 
 L'attaquant envoie un lien frauduleux à un utilisateur connecté.
 Si la requête n'est pas protégée, la transaction sera effectuée.
 >
```

#### :shield: Se protéger contre les attaques CSRF

- utiliser des tokens CSRF : chaque requête critique inclut un token unique qui doit être validé
- vérifier l'origine des requêtes avec les en-têtes `Referer` et `Origin`
- restreindre les méthodes `HTTP` en désactivant les actions sensibles via `GET` (utiliser `POST` ou `DELETE`)

## Ressources

- [OWASP Top Ten](https://owasp.org/www-project-top-ten/)
- 9 failles de sécurité à connaître, [Kincy](https://kincy.fr/faille-securite/)
