# 🚀 Guide de Déploiement Vercel

Ce guide vous explique comment déployer votre site de Noël sur Vercel avec des mises à jour automatiques.

## 📋 Prérequis

- Un compte GitHub (déjà fait ✅)
- Votre repository GitHub : `https://github.com/HeisenPear/liste-no-l-2025`

## 🎯 Étapes de déploiement

### Option 1 : Déploiement en un clic (Recommandé)

1. **Cliquez sur le bouton "Deploy with Vercel"** dans le README
2. Vercel vous demandera de :
   - Vous connecter avec GitHub
   - Autoriser Vercel à accéder à vos repositories
3. Vérifiez les paramètres (déjà configurés automatiquement)
4. Cliquez sur **"Deploy"**
5. Attendez 1-2 minutes ⏱️
6. Votre site est en ligne ! 🎉

### Option 2 : Import manuel

1. **Allez sur [Vercel.com](https://vercel.com)**
2. Cliquez sur **"Add New Project"**
3. Sélectionnez **"Import Git Repository"**
4. Cherchez `liste-no-l-2025` dans vos repositories
5. Cliquez sur **"Import"**
6. Vercel détecte automatiquement la configuration grâce à `vercel.json`
7. Cliquez sur **"Deploy"**

## ⚙️ Configuration automatique

Le fichier `vercel.json` contient déjà toute la configuration nécessaire :

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

Rien à configurer manuellement ! ✨

## 🔄 Déploiements automatiques

### Comment ça marche ?

Une fois votre projet connecté à Vercel :

1. **Chaque `git push` sur `main`** déclenche automatiquement un nouveau déploiement
2. Vercel construit et déploie votre site
3. Votre site est mis à jour en ~1 minute

### Exemple de workflow

```bash
# 1. Modifier votre config.json (ajouter un produit, changer un prix, etc.)
# 2. Sauvegarder les modifications

# 3. Commit et push
git add config.json
git commit -m "Ajout nouveau produit"
git push

# 4. Vercel déploie automatiquement !
# Vous recevrez un email de confirmation
```

## 🌐 URLs de votre site

Après le déploiement, vous aurez :

- **URL de production** : `https://votre-projet.vercel.app`
  - C'est l'URL principale de votre site
  - Se met à jour à chaque push sur `main`

- **URLs de prévisualisation** :
  - Générées pour chaque pull request
  - Format : `https://votre-projet-[hash].vercel.app`

## 📧 Notifications

Vercel vous envoie des emails pour :
- ✅ Déploiement réussi
- ❌ Erreurs de déploiement
- 🔄 Nouvelles preview deployments

## 🛠️ Paramètres avancés (Optionnel)

### Variables d'environnement

Si vous ajoutez des fonctionnalités qui nécessitent des clés API :

1. Allez dans **Settings** de votre projet Vercel
2. Cliquez sur **Environment Variables**
3. Ajoutez vos variables

### Domaine personnalisé

Pour utiliser votre propre domaine :

1. Allez dans **Settings** > **Domains**
2. Cliquez sur **"Add Domain"**
3. Suivez les instructions pour configurer votre DNS

## 🔍 Monitoring

### Dashboard Vercel

Accédez à `https://vercel.com/dashboard` pour :
- Voir l'historique des déploiements
- Consulter les analytics
- Vérifier les logs
- Gérer les domaines

### Vérifier un déploiement

Après un push :
1. Allez sur votre dashboard Vercel
2. Vous verrez le déploiement "In Progress"
3. Cliquez dessus pour voir les logs en temps réel
4. Une fois terminé, cliquez sur "Visit" pour voir votre site

## 🐛 Résolution de problèmes

### Le déploiement échoue

1. Vérifiez les logs dans le dashboard Vercel
2. Assurez-vous que tous les fichiers sont committé :
   ```bash
   git status
   ```
3. Vérifiez que `vercel.json` est présent

### Les images ne s'affichent pas

1. Vérifiez les chemins dans `config.json`
2. Assurez-vous que les images sont dans le dossier `images/`
3. Vérifiez que les fichiers sont bien committé :
   ```bash
   git ls-files images/
   ```

### Le site n'est pas à jour

1. Vérifiez que vous avez bien push :
   ```bash
   git log origin/main
   ```
2. Attendez 1-2 minutes (le déploiement prend du temps)
3. Videz le cache de votre navigateur (Ctrl+Shift+R ou Cmd+Shift+R)

## 📝 Workflow recommandé

### Pour modifier votre liste de Noël :

1. **Éditez `config.json`** avec vos changements
2. **Testez localement** en ouvrant `index.html` dans votre navigateur
3. **Commit et push** :
   ```bash
   git add config.json
   git commit -m "Mise à jour de la liste"
   git push
   ```
4. **Vérifiez le déploiement** sur Vercel (vous recevrez un email)
5. **Visitez votre site** à `https://votre-projet.vercel.app`

## 🎁 Conseils

- 💡 Faites des commits réguliers avec des messages clairs
- 🔒 Ne committez jamais de données sensibles
- 📱 Testez votre site sur mobile après chaque déploiement
- 🎨 Utilisez les preview deployments pour tester de grandes modifications

## 🆘 Support

- **Documentation Vercel** : [vercel.com/docs](https://vercel.com/docs)
- **Status Vercel** : [vercel-status.com](https://www.vercel-status.com/)
- **GitHub Repository** : [HeisenPear/liste-no-l-2025](https://github.com/HeisenPear/liste-no-l-2025)

---

**Bon déploiement ! 🚀🎄**
