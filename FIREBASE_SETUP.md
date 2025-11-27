# 🔥 Guide de Configuration Firebase

Ce guide vous explique comment configurer Firebase pour activer la synchronisation en temps réel de votre liste de Noël.

## 📋 Objectif

Avec Firebase activé, lorsqu'un visiteur clique sur "Marquer comme acheté", **tous les autres visiteurs** voient instantanément le changement sur leur écran, sans recharger la page !

## 🎯 Étape 1 : Créer un projet Firebase

1. **Allez sur [Firebase Console](https://console.firebase.google.com/)**
2. Cliquez sur **"Ajouter un projet"**
3. Nommez votre projet : `liste-noel-2025` (ou autre)
4. Désactivez Google Analytics (optionnel)
5. Cliquez sur **"Créer le projet"**

## 🗄️ Étape 2 : Activer Firestore Database

1. Dans le menu de gauche, cliquez sur **"Firestore Database"**
2. Cliquez sur **"Créer une base de données"**
3. Choisissez **"Démarrer en mode production"**
4. Sélectionnez la région la plus proche (ex: `europe-west1`)
5. Cliquez sur **"Activer"**

## 🔑 Étape 3 : Obtenir vos credentials Firebase

1. Cliquez sur l'icône **⚙️** (Paramètres) > **Paramètres du projet**
2. Scrollez jusqu'à **"Vos applications"**
3. Cliquez sur l'icône **</>** (Web)
4. Nommez votre app : `Liste de Noël Web`
5. **NE cochez PAS** "Firebase Hosting"
6. Cliquez sur **"Enregistrer l'application"**
7. Copiez le code de configuration qui apparaît

Vous devriez voir quelque chose comme :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet-id",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

## ⚙️ Étape 4 : Configurer le projet

1. Ouvrez le fichier **`scripts/firebaseConfig.js`**
2. Remplacez les valeurs `YOUR_XXX` par vos vraies valeurs :

```javascript
const firebaseConfig = {
  apiKey: "VOTRE_VRAIE_API_KEY",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet-id",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

3. **Sauvegardez** le fichier

## 🔒 Étape 5 : Configurer les règles de sécurité

1. Dans Firebase Console, allez dans **"Firestore Database"**
2. Cliquez sur l'onglet **"Règles"**
3. **Copiez-collez** le contenu du fichier `firestore.rules` :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow update: if request.resource.data.diff(resource.data).affectedKeys()
                      .hasOnly(['purchased', 'purchasedAt'])
                    && request.resource.data.purchased is bool;
      allow create: if false;
      allow delete: if false;
    }
  }
}
```

4. Cliquez sur **"Publier"**

### 🛡️ Que font ces règles ?

- ✅ **Lecture** : Tout le monde peut voir les produits
- ✅ **Mise à jour** : Tout le monde peut marquer/démarquer comme acheté
- ❌ **Création/Suppression** : Interdit (seulement via script d'init)

## 📦 Étape 6 : Initialiser Firestore avec vos produits

Cette étape copie tous vos produits de `config.json` vers Firestore.

### Option A : Via le fichier HTML (Recommandé)

1. Ouvrez **`initFirestore.html`** dans votre navigateur
2. Ouvrez la console (F12)
3. Cliquez sur **"Initialiser Firestore"**
4. Vérifiez les logs dans la console
5. ✅ Vous devriez voir "Firestore initialisé avec succès !"

### Option B : Via la console

1. Ouvrez la console du navigateur (F12) sur votre site
2. Collez ce code :

```javascript
import('./scripts/initFirestore.js');
```

3. Appuyez sur Entrée

### ✅ Vérification

1. Allez dans Firebase Console > Firestore Database
2. Vous devriez voir une collection **`products`**
3. Avec 8 documents (vos produits)
4. Chaque document a les champs : `id`, `name`, `price`, `purchased`, etc.

## 🚀 Étape 7 : Tester la synchronisation temps réel

1. **Ouvrez votre site** dans Chrome
2. **Ouvrez votre site** dans Firefox (ou onglet privé)
3. Dans Chrome, cliquez sur **"Marquer comme acheté"** sur un produit
4. 🎉 **Le produit doit se griser instantanément dans Firefox !**

### 🎬 Comportement attendu :

- Le produit devient grisé
- L'image devient en noir et blanc
- Le prix est barré
- Un badge "🎁 DÉJÀ ACHETÉ" apparaît
- Un bouton "Annuler" remplace le bouton "Marquer comme acheté"

## 🔄 Déploiement sur Vercel

Vercel détectera automatiquement vos fichiers Firebase. Aucune configuration supplémentaire nécessaire !

### ⚠️ Important :

Les credentials Firebase dans `firebaseConfig.js` **PEUVENT être publics** car :
- Ils sont protégés par les règles Firestore
- Ils ne permettent pas d'actions dangereuses
- C'est la configuration standard de Firebase Web

**Pas besoin de variables d'environnement** pour ce projet simple.

## 🧪 Mode local vs Mode Firebase

Le site fonctionne dans **deux modes** :

### 📦 Mode local (par défaut)
- Si Firebase n'est **pas configuré** (credentials = `YOUR_XXX`)
- Les produits sont chargés depuis `config.json`
- **Pas de synchronisation** temps réel
- **Pas de boutons** "Marquer comme acheté"

### 🔥 Mode Firebase
- Si Firebase **est configuré** (vraies credentials)
- Les produits sont chargés depuis Firestore
- **Synchronisation** temps réel activée
- **Boutons** "Marquer comme acheté" visibles

Le mode est détecté automatiquement !

## 🐛 Résolution de problèmes

### Erreur : "Firebase: Error (auth/invalid-api-key)"

❌ **Cause** : API Key incorrecte

✅ **Solution** :
1. Vérifiez que vous avez bien copié toute la clé
2. Pas d'espaces avant/après
3. Pas de guillemets en trop

### Erreur : "Missing or insufficient permissions"

❌ **Cause** : Règles Firestore pas configurées

✅ **Solution** :
1. Allez dans Firestore Database > Règles
2. Copiez-collez le contenu de `firestore.rules`
3. Cliquez sur "Publier"

### Les boutons ne s'affichent pas

❌ **Cause** : Firebase non configuré ou non détecté

✅ **Solution** :
1. Ouvrez la console (F12)
2. Cherchez le message : `🔥 Mode Firebase activé`
3. Si vous voyez `📦 Mode local`, vérifiez vos credentials

### Les changements ne sont pas synchronisés

❌ **Cause** : Plusieurs possibilités

✅ **Solution** :
1. Vérifiez votre connexion internet
2. Vérifiez les règles Firestore
3. Ouvrez la console et cherchez les erreurs
4. Testez avec deux navigateurs différents

## 📊 Gestion des produits

### Ajouter un produit

1. Ajoutez le produit dans `config.json`
2. Réexécutez `initFirestore.html`
3. ⚠️ Cela réinitialisera tous les états "acheté"

### Modifier un produit

**Option A** : Modifier dans Firestore directement
- Allez dans Firebase Console > Firestore
- Modifiez le document du produit
- ✅ Changement instantané pour tous

**Option B** : Modifier config.json et réinitialiser
- Modifiez `config.json`
- Réexécutez `initFirestore.html`
- ⚠️ Perd l'état "acheté" de tous les produits

### Réinitialiser les états "acheté"

1. Firebase Console > Firestore Database
2. Sélectionnez tous les documents
3. Modifiez en masse : `purchased` = `false`
4. Ou réexécutez `initFirestore.html`

## 💡 Conseils

- 🔍 **Surveillez les logs** : Ouvrez toujours la console (F12) pour déboguer
- 🔄 **Testez en local** avant de déployer sur Vercel
- 📱 **Testez sur mobile** : La synchro fonctionne aussi !
- 🎯 **Quota gratuit** : Firebase offre 50k lectures/jour gratuitement
- 📈 **Analytics** : Vous pouvez voir l'utilisation dans Firebase Console

## 🎁 Fonctionnalités bonus

### Désactiver Firebase temporairement

Modifiez `firebaseConfig.js` et remettez les valeurs à `YOUR_XXX`.
Le site repassera automatiquement en mode local.

### Voir les changements en temps réel

Ouvrez Firebase Console > Firestore Database et regardez les mises à jour en direct quand vous cliquez sur les boutons !

---

**Besoin d'aide ?** Consultez la [documentation Firebase](https://firebase.google.com/docs/firestore) ou ouvrez une issue sur GitHub.

🎄 **Joyeuses fêtes avec Firebase !**
