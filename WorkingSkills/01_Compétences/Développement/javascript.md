# Javascript

🔙 Retour à la page [Développement](README.md)

## Concepts et définitions

### Qu'est-ce que Javascript ?

> JavaScript (JS) est un langage de programmation principalement utilisé pour le développement web. Il permet d’ajouter de l’interactivité aux pages web, de manipuler le DOM (Document Object Model) et d’interagir avec des serveurs via des API. JS est un langage interprété, dynamique et orienté objet, qui fonctionne côté client mais peut aussi être exécuté côté serveur avec Node.js.

### Structures de base

#### Variables

- utilisation de `var`, `let` et `const` pour déclarer des variables

```js
var oldWay = "Var peut être redéclaré et a une portée globale";
let modernWay = "Let est limité au bloc où il est déclaré";
const immutable = "Const est une constante, sa valeur ne peut être réassignée";
```

#### Types de données

```js
let number = 42;            // number
let text = "Hello";         // string
let isTrue = true;          // boolean
let array = [1, 2, 3];      // array
let object = { name: "JS" }; // object
let nothing = null;         // null
let unknown;                // undefined
```

#### Structures de contrôle

- conditions :

```js
if (x > 10) {
  console.log("x est grand !");
} else {
  console.log("x est petit.");
}
```

- boucles :

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
while (x > 0) {
  x--;
}
```

#### Fonctions

```js
function add(a, b) {
  return a + b;
}

const multiply = (a, b) => a * b; 
```

### Normes ECMAScript

- spécification qui définit JavaScript
- un tournant en 2015 avec ES6

### Utilisation de l'asynchrone

- JavaScript est mono-thread mais utilise l’asynchrone pour éviter de bloquer l’exécution du code.
- ✅ avantages :
  - éviter de bloquer l’UI
  - éxécuter plusieurs tâches en parallèle

#### Callbacks (ancienne méthode)

```js

function fetchData(callback) {
  setTimeout(() => {
    callback("Données récupérées !");
  }, 2000);
}

fetchData(console.log);
```

❌ Inconvénients : complexité ++ quand les callbacks s’enchaînent

#### Promises (ES6)

```js
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Données chargées"), 2000);
});
fetchData.then(console.log).catch(console.error);
```

#### `async` / `await` (ES8)

```js
async function getData() {
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  console.log(data);
}
getData();
```

### Le mot-clé `this`

- représente l’objet auquel une fonction est attachée
- le comportement varie selon le contexte

#### Cas 1 : dans un objet

```js
const obj = {
  name: "JavaScript",
  sayHello() {
    console.log(`Hello, I am ${this.name}`); // this fait référence à l'objet
  }
};
obj.sayHello(); // "Hello, I'm Javascript"
```

### Cas 2 : dans une fonction globale

```js
function showThis() {
  console.log(this);
}
showThis(); // En mode non-strict, this référence l’objet global (window dans un navigateur, global dans Node.js).
```

#### Cas 3 : dans une fonction fléchée

```js
const arrowFunc = () => console.log(this);
arrowFunc(); // `this` est hérité du contexte parent
```

#### Cas 4 : `this` dans une méthode `setTimeOut()`

```js
const obj = {
  name: "JS",
  showThis: function () {
    setTimeout(() => {
      console.log(this.name); // "JS" grâce à la fonction fléchée
    }, 1000);
  }
};
obj.showThis();
```

#### Cas 5 : manipulation de `this` avec `call`, `apply`, `bind`

```js
function greet() {
  console.log(`Hello ${this.name}`);
}

const user = { name: "Alice" };

greet.call(user);  // "Hello Alice"
greet.apply(user); // "Hello Alice"

const boundGreet = greet.bind(user);
boundGreet(); // "Hello Alice"
```

Dans l'exemple ci-dessus, `call()` et `apply()` appellent immédiatement la fonction en changeant this, tandis que `bind()` retourne une nouvelle fonction.

## Exemples

### Exemple de code commenté

—

### Utilisation dans un projet personnel

—

## Ressources

- "A Brief History of ECMAScript Versions in JavaScript" sur [Web Reference](https://easyretro.io/publicboard/CKptcnGJ6COXaBqvPJBlGwnUOSC3/ee3158a3-ab55-424b-a2aa-40d1521a1fcb?list=false)
