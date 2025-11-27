# 🎄 Ma Liste de Noël 2024

Un site web moderne et élégant pour afficher votre liste de cadeaux de Noël avec un design professionnel, des animations subtiles et une expérience utilisateur optimale.

![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Fonctionnalités

- 🎨 **Design moderne** avec effet glassmorphism
- 🌙 **Mode sombre/clair** avec toggle élégant
- 🔍 **Recherche en temps réel** pour trouver rapidement un produit
- 🏷️ **Filtres par catégorie** dynamiques
- 📱 **Responsive design** (mobile-first)
- ❄️ **Effet neige** subtil et performant
- ⏱️ **Compteur** jusqu'à Noël
- 🎯 **Badges de priorité** (haute/moyenne/basse)
- 🖼️ **Images avec effet zoom** au survol
- ⚡ **Performance optimisée** (vanilla JavaScript, lazy loading)
- ♿ **Accessible** (ARIA labels, navigation clavier)
- 🎭 **Animations fluides** avec CSS3

## 📁 Structure du projet

```
Noel web site/
├── index.html              # Page principale
├── config.json             # Configuration des produits et du site
├── README.md              # Documentation
├── styles/
│   └── main.css           # Styles principaux
├── scripts/
│   ├── main.js            # Logique principale
│   └── snow.js            # Effet neige
├── images/                # Dossier pour vos images de produits
│   ├── azzaro-wanted.jpg
│   ├── pantalon-flanelle.jpg
│   ├── lego-tournesols.jpg
│   ├── livre-argent.jpg
│   ├── cardigan-mango.jpg
│   ├── manteau-laine.jpg
│   └── pull-mango.jpg
└── assets/                # Autres ressources (optionnel)
```

## 🚀 Installation

1. **Clonez ou téléchargez** ce projet
2. **Ajoutez vos images** dans le dossier `images/`
3. **Modifiez** le fichier `config.json` selon vos besoins
4. **Ouvrez** `index.html` dans votre navigateur

Aucune installation de dépendances n'est nécessaire !

## ⚙️ Configuration

### Modifier les produits

Éditez le fichier `config.json` pour personnaliser votre liste :

```json
{
  "siteTitle": "Ma Liste de Noël 2024",
  "siteSubtitle": "Quelques idées cadeaux qui me feraient plaisir",
  "footerMessage": "Joyeuses fêtes ! 🎄",
  "socialLinks": {
    "instagram": "https://instagram.com/votre-compte",
    "facebook": "",
    "twitter": ""
  },
  "products": [
    {
      "id": 1,
      "name": "Nom du produit",
      "category": "Mode",
      "description": "Description courte du produit",
      "price": "99€",
      "priority": "haute",
      "image": "images/mon-produit.jpg",
      "url": "https://lien-vers-le-produit.com"
    }
  ]
}
```

### Paramètres disponibles

#### Configuration générale
- `siteTitle` : Titre principal du site
- `siteSubtitle` : Sous-titre (optionnel)
- `footerMessage` : Message dans le footer
- `socialLinks` : Liens vers vos réseaux sociaux (laisser vide pour masquer)

#### Produits
- `id` : Identifiant unique (nombre)
- `name` : Nom du produit
- `category` : Catégorie (Mode, Déco, Culture, Tech, etc.)
- `description` : Description courte (optionnel)
- `price` : Prix avec devise
- `priority` : `"haute"`, `"moyenne"` ou `"basse"`
- `image` : Chemin vers l'image (relatif au fichier HTML)
- `url` : Lien d'achat du produit

### Ajouter de nouvelles catégories

Les catégories sont automatiquement détectées depuis vos produits. Ajoutez simplement un produit avec une nouvelle catégorie dans `config.json` et un bouton de filtre sera créé automatiquement.

Pour personnaliser l'emoji de catégorie, éditez la fonction `getCategoryEmoji()` dans `scripts/main.js` :

```javascript
function getCategoryEmoji(category) {
    const emojis = {
        'Mode': '👔',
        'Parfum': '🎁',
        'Déco': '🏠',
        'VotreCategorie': '🎯'  // Ajoutez votre catégorie ici
    };
    return emojis[category] || '🎁';
}
```

## 🎨 Personnalisation du design

### Modifier les couleurs

Éditez les variables CSS dans `styles/main.css` :

```css
:root {
    --color-primary: #8B2635;      /* Couleur principale */
    --color-secondary: #2D5E3E;    /* Couleur secondaire */
    --color-accent: #D4AF37;       /* Couleur d'accent */
    /* ... autres couleurs ... */
}
```

### Modifier les polices

Les polices actuelles :
- **Titres** : Playfair Display (serif élégant)
- **Corps** : Inter (sans-serif moderne)

Pour changer, modifiez l'import dans `index.html` et les variables dans `main.css`.

### Ajuster l'effet neige

Dans `scripts/snow.js`, modifiez la configuration :

```javascript
const config = {
    snowflakeCount: 50,    // Nombre de flocons
    maxSize: 3,            // Taille max
    minSize: 1,            // Taille min
    maxSpeed: 1,           // Vitesse max
    minSpeed: 0.2,         // Vitesse min
    opacity: 0.6           // Opacité
};
```

Pour désactiver complètement l'effet neige, retirez cette ligne dans `index.html` :
```html
<script src="scripts/snow.js" defer></script>
```

## 📸 Optimisation des images

### Formats recommandés
- **Format** : JPG pour photos, PNG pour images avec transparence
- **Dimensions** : 800×800px minimum
- **Poids** : < 200 Ko par image (compression recommandée)

### Outils de compression
- [TinyPNG](https://tinypng.com/) - Compression en ligne
- [Squoosh](https://squoosh.app/) - Outil Google
- [ImageOptim](https://imageoptim.com/) - Application Mac

## 🌐 Déploiement

### GitHub Pages (gratuit)

1. Créez un repository GitHub
2. Uploadez tous les fichiers
3. Allez dans Settings > Pages
4. Sélectionnez la branche `main`
5. Votre site sera accessible à `https://votre-nom.github.io/nom-du-repo/`

### Netlify (gratuit)

1. Glissez-déposez votre dossier sur [Netlify Drop](https://app.netlify.com/drop)
2. Votre site est en ligne en quelques secondes !

### Vercel (gratuit)

1. Installez [Vercel CLI](https://vercel.com/download)
2. Lancez `vercel` dans votre dossier
3. Suivez les instructions

## 🔧 Personnalisation avancée

### Ajouter de nouvelles animations

Les animations sont définies dans `styles/main.css`. Exemple :

```css
@keyframes monAnimation {
    from { opacity: 0; }
    to { opacity: 1; }
}

.mon-element {
    animation: monAnimation 1s ease-out;
}
```

### Modifier le countdown

Pour changer la date cible (actuellement 25 décembre), éditez dans `scripts/main.js` :

```javascript
let christmas = new Date(currentYear, 11, 25); // Mois: 0-11 (11 = décembre)
```

### Ajouter des champs personnalisés

1. Ajoutez le champ dans `config.json`
2. Modifiez la fonction `renderProducts()` dans `scripts/main.js`
3. Ajoutez les styles correspondants dans `styles/main.css`

## 📱 Support navigateurs

- ✅ Chrome/Edge (dernières versions)
- ✅ Firefox (dernières versions)
- ✅ Safari (dernières versions)
- ✅ Opera (dernières versions)
- ⚠️ Internet Explorer : non supporté

## ⚡ Performance

Le site est optimisé pour une performance maximale :

- **Vanilla JavaScript** : Pas de framework lourd
- **Lazy loading** : Images chargées à la demande
- **CSS optimisé** : Utilisation de `transform` et `opacity` pour les animations
- **Animations GPU** : Hardware acceleration
- **Reduced motion** : Respect des préférences utilisateur

Score Lighthouse attendu : **>95/100**

## 🐛 Dépannage

### Les images ne s'affichent pas
- Vérifiez que le chemin dans `config.json` est correct
- Assurez-vous que les images sont dans le dossier `images/`
- Vérifiez la console du navigateur (F12) pour les erreurs

### Le mode sombre ne fonctionne pas
- Videz le cache du navigateur (Ctrl+Shift+R)
- Vérifiez que JavaScript est activé

### Les produits ne s'affichent pas
- Vérifiez la syntaxe du fichier `config.json` sur [JSONLint](https://jsonlint.com/)
- Ouvrez la console (F12) pour voir les erreurs

### L'effet neige ralentit le site
- Réduisez `snowflakeCount` dans `scripts/snow.js`
- Ou désactivez complètement l'effet

## 📝 License

Ce projet est libre d'utilisation pour un usage personnel.

## 🎁 Crédits

- **Design** : Inspiré par Apple, Airbnb, Stripe
- **Icônes** : Lucide Icons (SVG inline)
- **Polices** : Google Fonts (Playfair Display, Inter)

## 💡 Astuces

1. **Images manquantes** : Un emoji s'affiche automatiquement si l'image n'est pas trouvée
2. **Liens vides** : Vous pouvez laisser les URLs en placeholder et les remplir progressivement
3. **Réseaux sociaux** : Laissez les liens vides (`""`) pour masquer les icônes
4. **Raccourci clavier** : Appuyez sur `Esc` pour effacer la recherche
5. **Mode sombre** : La préférence est sauvegardée dans le navigateur

## 📞 Support

Pour toute question ou suggestion d'amélioration, n'hésitez pas à ouvrir une issue ou à me contacter.

---

**Joyeux Noël ! 🎄✨**
