# 🖥️ Portfolio Terminal - Raphael Auberlet

Portfolio interactif en forme de terminal Linux, développé avec React et Vite. Une manière originale de présenter son parcours et ses compétences de développeur !

![Terminal Portfolio](https://img.shields.io/badge/React-18.2-blue) ![Vite](https://img.shields.io/badge/Vite-4.4-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-3.3-cyan)

## ✨ Fonctionnalités

- 🚀 **Séquence de boot** réaliste au chargement
- 💻 **Interface terminal** interactive avec historique des commandes
- 🌍 **Multilingue** (FR/EN) avec traduction dynamique
- 🎨 **Animation Matrix** (Easter egg)
- 📱 **Responsive** et adapté à tous les écrans
- ⌨️ **Raccourcis clavier** (↑↓ pour l'historique)
- 🎯 **Commandes disponibles** : about, skills, experience, projects, contact, hire, etc.

## 🛠️ Technologies utilisées

- **React 18** - Bibliothèque UI
- **Vite 4** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Icônes modernes
- **GitHub Pages** - Hébergement gratuit

## 📦 Installation

### Prérequis

- Node.js 18+ et npm

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/VOTRE_USERNAME/portfolio-terminal.git
cd portfolio-terminal
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer en mode développement**
```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

## 🚀 Build et déploiement

### Build local

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

### Preview du build

```bash
npm run preview
```

### Déploiement sur GitHub Pages

#### Méthode 1 : GitHub Actions (Automatique - Recommandé)

1. **Configurer le repository GitHub**
   - Allez dans `Settings` > `Pages`
   - Dans `Source`, sélectionnez `GitHub Actions`

2. **Modifier le fichier `vite.config.js`**
   ```js
   base: '/nom-de-votre-repo/', // Remplacez par le nom de votre repo
   ```

3. **Pousser sur GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git
   git push -u origin main
   ```

4. Le workflow GitHub Actions se lancera automatiquement et déploiera votre site !

Votre site sera accessible à : `https://VOTRE_USERNAME.github.io/VOTRE_REPO/`

#### Méthode 2 : Déploiement manuel avec gh-pages

```bash
npm run deploy
```

Cette commande build le projet et le déploie sur la branche `gh-pages`.

## ⚙️ Configuration

### Personnalisation du contenu

Modifiez le fichier `src/TerminalPortfolio.jsx` pour personnaliser :

- Les traductions (objets `translations.fr` et `translations.en`)
- Les commandes disponibles
- Les informations de contact
- Le parcours professionnel
- Les compétences techniques

### Modifier la base URL

Dans `vite.config.js`, changez la valeur de `base` :

```js
export default defineConfig({
  plugins: [react()],
  base: '/votre-nom-de-repo/', // ⚠️ Important pour GitHub Pages
})
```

## 📝 Commandes du terminal

Une fois le site lancé, tapez `help` pour voir toutes les commandes disponibles :

- `about` - À propos de moi
- `skills` - Compétences techniques
- `experience` - Parcours professionnel
- `projects` - Projets & réalisations
- `contact` - Me contacter
- `lang en/fr` - Changer de langue
- `matrix` - Animation Matrix
- `hire` - Message spécial recruteurs
- `clear` - Effacer le terminal
- `help` - Afficher l'aide

## 🎨 Personnalisation des couleurs

Les couleurs du terminal peuvent être modifiées dans le composant `TerminalPortfolio.jsx` :

- `bg-black` - Fond noir
- `text-green-400` - Texte vert terminal
- `text-cyan-400` - Commandes
- `text-red-400` - Erreurs
- `text-yellow-400` - Messages système

## 📄 License

Ce projet est open source et disponible sous licence MIT.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 👤 Auteur

**Raphael Auberlet**
- Email: ralphi2811@gmail.com
- LinkedIn: [raphaelauberlet](https://linkedin.com/in/raphaelauberlet)
- Location: La Réunion (974)

---

⭐ Si vous aimez ce projet, n'oubliez pas de lui donner une étoile sur GitHub !
