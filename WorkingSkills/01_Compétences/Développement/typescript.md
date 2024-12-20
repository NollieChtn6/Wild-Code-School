# Typescript

🔙 Retour à la page [Développement](README.md)

## Concepts et définitions

### Qu'est-ce que Typescript ?

> C'est une surcouche de JavaScript : il y ajoute un typage statique et des fonctionnalités avancées comme les interfaces, les classes et les decorators. Typescript n'étant pas interprétable immédiatement, il doit d'abord être transpilé en JavaScript standard avant d'être exécuté.

### L'intérêt de Typescript dans l'IDE

- amélioration de la DX grâce aux suggestions et à l'auto-complétion du code fournies par la détection des types
- détection des erreurs au moment de la compilation
- facilitation de la navigation dans le projet

### Les types de bases

- `string` : chaîne de caractères

```ts
const username: string = "John";
```

- `number` : nombre

```ts
const age: number = 30;
```

- `boolean` : valeur vraie ou fausse

```ts
const isAdmin: boolean = false;
```

- `any` : désactiver le typage d'une variable (⚠️ à utiliser en dernier recours)

```ts
const value: any = 255;
```

- `array` : tableau typé

```ts
const studentGrades: number[] = [12, 18, 16, 11];
```

- `tuple` : tableau avec un type défini pour chaque élément

```ts
const authenticatedUser: [string, number] = ["John", 30];
```

- `enum` : ensemble de constantes avec des noms lisibles et significatifs

```ts
enum Direction {North, South, West, East}
```

### Interfaces VS Classes

#### Interface

> Une interface définit un contrat ou une structure. Elle décrit ce qu'un objet ou une classe doit contenir (elle est purement déclarative et ne fournit pas de code exécutable). Elle garantit qu'un objet respecte une forme spécifique.

```ts
interface User {
  id: number;
  name: string;
  isAdmin(): boolean;
}
```

#### Classe

> Une classe est un plan de construction pour créer des objets. Elle peut contenir à la fois des propriétés et des méthodes, avec leur implémentation. Elle permet de créer des objets avec un état et un comportement spécifiques, en lui passant par exemple des valeurs par défaut et des méthodes implémentées.

```ts
class User {
  id: number;
  name: string;
  role: string = "user"; // on spécifie une valeur par défaut

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  isAdmin(): boolean {
    return this.role === "admin";
  }
}


```

#### Héritage (`extends`)

- une interface peut hériter d'une ou plusieurs interfaces (on parle alaors de composition)

```ts
interface Animal {
  name: string;
}

interface Cat extends Animal {
  breed: string;
}

const pet: Cat = { // on spécifie que `pet` est de type `Cat`
  name: "Patate",
  breed: "Scottish Straight"
};
```

- une classe peut hériter d'une autre classe (mais une et une seule : pas d'héritage multiple)

```ts
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  speak(): string {
    return `${this.name} makes a sound.`;
  }
}

class Cat extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    super(name); // `super` permet d'appeler le constructeur de la classe parente
    this.breed = breed;
  }

  speak(): string {
    return `${this.name} meows!`;
  }
}

const pet = new Cat("Patate", "Scottish Straight");
console.log(pet.speak()); // affiche : Patate meows!

```

#### Implémentation (`implements`)

- une classe peut implémenter une ou plusieurs interfaces : cela permet de s'assurer que la classe respecte un contrat spécifié.

```ts
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

class Bird implements Flyable {
  fly(): void {
    console.log("Flying high!");
  }
}

class Duck implements Flyable, Swimmable {
  fly(): void {
    console.log("Flying low!");
  }

  swim(): void {
    console.log("Swimming in the lake!");
  }
}
```

#### Synthèse

|Type | Interface | Classe |
|----|---|---|
|Objectif | Définir un contrat (forme de l'objet ou de la classe) | Fournir une implémentation |
|Code exécutable | Non | Oui (propriétés, méthodes, constructeurs)|
|Héritage | Hérite de plusieurs interface | Hérite d'une seule classe |
|Utilisation | S'applique aux objets, fonctions ou classes| Crée des instances d'objets |

### Decorators

🚧

## Exemples

### Exemple de code commenté

```ts
/**
 * Générer un tableau contenant tous les nombres compris entre deux nombres donnés.
 * 
 * @param startNum - Le nombre de début de la plage (exclu).
 * @param endNum - Le nombre de fin de la plage (exclu).
 * @returns Un tableau contenant les nombres compris entre `startNum` et `endNum`.
 * 
 */
function getRange(startNum: number, endNum: number): number[] {
  const range: number[] = [];
  if (startNum === endNum) return range;
  for (let i = startNum + 1; i < endNum; i++) {
    range.push(i);
  }
  return range;
}
```

### Utilisation dans un projet personnel

- 🔐 Générateur de mot de passe aléatoire : [Github](https://github.com/NollieChtn6/Password-Generator) ou [version en ligne](https://password-generator.nolliechtn6.com/)

## Ressources

- Définir et utiliser les classes TypeScript, sur [Ionos](https://www.ionos.fr/digitalguide/sites-internet/developpement-web/typescript-classes/)
