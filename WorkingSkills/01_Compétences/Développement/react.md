# React

🔙 Retour à la page [Développement](README.md)

## Concepts et définitions

### Qu'est-ce que React ?

> React est une bibliothèque JavaScript open-source permettant de créer des interfaces utilisateur (UI). Elle repose sur un système de composants réutilisables et modulaires et s'appuie sur un DOM virtuel (virtual DOM) pour optimiser les mises à jour de l'interface.

### Contrôler l'affichage avec le state

- le state (état) est une donnée locale d'un composant (state)
- il sert à gérer des informations dynamiques qui peuvent changer au cours de la vie du composant
- on le déclare avec le hook `useState`
- lorsqu'il change via la fonction `setState`, React effectue automatiquement le re-render du composant pour afficher les nouvelles valeurs

```tsx

import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState<number>(0); // variable d'état `count` initialisée à 0

  return (
    <div>
      <p>Le compteur est à : {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrémenter</button> {// mise à jour de l'état
    </div>
  );
}
```

### Composants enfants et props

- les props sont des données transmises d'un composant parent à un composant enfant pour personnaliser le rendu d'un composant
- elles permettent de rendre le composant réutilisable et dynamique

```tsx
function WelcomeMessage({ name }) {
  return <p>Bienvenue, { name } !</p>;
}

function App() {
  return <WelcomeMessage name="Alice" />; // la string "Alice" est transmise en tant que prop
}

```

### Déclenchement d'instructions en fonction de l'action de l'utilisateur

- utilisation des gestionnaires d'événements pour écouter et répondre aux actions de l'utilisateur (clics, frappes au clavier, etc.)
- les gestionnaires d'événements (`onClick`, `onChange`, etc.) sont des fonctions associées au DOM
- les actions de l'utilisateur déclenchent des mises à jour de l'état ou des opérations spécifiques

```tsx
function ClickHandler() {
  const handleClick = () => {
    alert('Bouton cliqué !');
  };

  return <button onClick={handleClick}>Cliquez-moi</button>;
}
 ```

### Déclenchement d'instructions en fonction du cycle de vie d'un composant ou de la valeur de ses props

- utilisation du hook `useEffect` pour déclencher des instructions lorsque le composant est monté, mis à jour ou démonté
- `useEffect` est aussi utilisé pour gérer des effets secondaires comme les appels aux API, les timers, etc. (le deuxième argument `[]` permet de contrôler quand l'effet est exécuté : à chaque rendu, une seule fois ou lorsque les valeurs changent)

React utilise des hooks comme useEffect pour déclencher des instructions à différents moments :

```ts
import React, { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000); // exécution au moment du montage

    return () => clearInterval(interval); // nettoyage au moment du démontage
  }, []);

  return <p>Temps écoulé : {seconds} secondes</p>;
```

### Utilisation d'un reducer

- le hook `useReducer` permet de gérer des états complexes
- il fonctionne avec une fonction reducer qui décrit comment l'état évolue en fonction d'une action

```ts
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) { // selon le type d'action, on incrémente ou on décrémente le compteur
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Compteur : {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
    </div>
  );
}
```

### Stockage de l'état dans un contexte

- le contexte de React permet de partager un état ou des données entre plusieurs composants sans avoir à passer les props manuellement à chaque niveau (prop-drilling)
- on utilise `useContext` pour créer le contexte
- il permet aux composants descendants d'accéder aux données stockées dans le contexte
- le contexte est idéal pour gérer des états globaux comme le nom de l'utilisateur, le thème, la langue

```tsx
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({ name: "Alice", loggedIn: true });

  return (
    <UserContext.Provider value={user}>
      {children} {/* rendu des composants enfants */}
    </UserContext.Provider>
  );
}

function UserProfile() {
  const user = useContext(UserContext); // accès au contexte

  return <p>Utilisateur : {user.name}</p>;
}

function App() {
  return (
    <UserProvider>
      <UserProfile /> {/* utilisation du contexte */}
    </UserProvider>
  );
}
```

## Exemples

### Exemple de code commenté

Ce composant gère un bouton configurable permettant d'incrémenter ou de décrémenter un compteur de minutes :

```ts
import { Plus, Minus } from "lucide-react";

// définition des props du composant
type SettingsButtonProps = {
  action: "increment" | "decrement";
  disabled: boolean;
  onClick: () => void;
};

export function SettingsButton({ action, disabled, onClick }: SettingsButtonProps) {
  // changement de l'icône du bouton en fonction du type d'action
  const icon = action === "increment" ? <Plus className="icon" /> : <Minus className="icon" />;

  // gestion de la fonction déclenchée au click avec  l'écouteur d'événement `onClick`
  return (
    <button className="btn settings-btn" onClick={onClick} disabled={disabled} type="button">
      {icon}
    </button>
  );
}
```

### Utilisation dans un projet personnel

- 🍅 Pomodoro : [Github](https://github.com/NollieChtn6/Pomodoro-Timer) ou [version en ligne](https://pomodoro-timer.nolliechtn6.com/)

## Ressources

- Les illustrations de Maggie Appleton sur le fonctionnement de React : [son blog](https://maggieappleton.com/reactpotato)
