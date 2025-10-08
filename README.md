# 🖥️ Portfolio Terminal - Raphaël Auberlet

Portfolio interactif en forme de terminal Linux, développé avec React et Vite. Une manière originale de présenter son parcours et ses compétences de Responsable SI & DevOps Engineer !

![Terminal Portfolio](https://img.shields.io/badge/React-18.2-blue) ![Vite](https://img.shields.io/badge/Vite-4.4-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-3.3-cyan)

🌐 **Visitez le site** : [raphaeldev.fr](https://raphaeldev.fr)

## ✨ Fonctionnalités

### 🎮 Interface & Animations
- 🚀 **Séquence de boot Gaming PC** au chargement avec effet typewriter
- 💻 **Interface terminal** interactive avec curseur personnalisé (▊)
- � **Logo RAPHAELDEV** avec animation vague de couleurs et effet glow
- 🎨 **Animation Matrix** épique (10 secondes) avec cascade de caractères
- ⌨️ **Effet typewriter** sur toutes les réponses pour un rendu authentique
- 📱 **Responsive** et adapté à tous les écrans

### 🌍 Expérience utilisateur
- 🌐 **Détection automatique de langue** (FR si navigateur français, sinon EN)
- 🔗 **Liens cliquables** : URLs, emails, numéros de téléphone (s'ouvrent dans un nouvel onglet)
- 📜 **Historique des commandes** avec navigation (↑↓)
- ♻️ **Commande reboot** pour redémarrer la séquence de boot
- 🎯 **Raccourcis de commandes** : `xp` = `experience`

### 🎁 Easter Eggs (10+ cachés !)
- 🕵️ **hack/hacker** - Mode hacker
- ☕ **coffee/café** - ASCII art de café détaillé
- 🍺 **beer/bière** - ASCII art de bière avec tchin multilingue
- 🎮 **konami** - Le fameux code Konami
- 🔐 **sudo** - Tentative d'accès root
- 🌌 **42** - La réponse à la grande question
- 📁 **ls/dir** - Lister les fichiers
- 👤 **whoami** - Qui êtes-vous ?
- 📄 **cat secret.txt** - Fichier secret
- 📡 **ping** - Test réseau
- ⚡ **godmode** - Mode dieu (indice vers l'easter egg ultime)
- 🐱🌀 **oiia** - Easter egg ULTIME avec vidéo fullscreen (plusieurs déclencheurs possibles !)

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

- **Les traductions** (objets `translations.fr` et `translations.en`)
  - Sections : welcome, about, skills, experience, projects, contact, hire
  - Messages système et easter eggs
- **Les commandes disponibles** dans la fonction `executeCommand()`
- **Les informations de contact** : email, téléphone, LinkedIn, GitHub
- **Le parcours professionnel** avec métriques et réalisations
- **Les compétences techniques** organisées par catégorie
- **Les easter eggs** : ajoutez vos propres surprises !
- **Les animations** : durées, couleurs, effets

### Modifier les animations

Dans `TerminalPortfolio.jsx` :
- **Typewriter** : Ajustez `intervalTime` (actuellement 10ms par caractère)
- **Wave animation** : Modifiez l'intervalle de la vague (100ms) et les phases de couleurs
- **Matrix** : Changez la durée (10000ms), le nombre de colonnes (80)
- **Boot sequence** : Personnalisez les messages et délais

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

### Commandes principales
- `about` - À propos de moi (Responsable SI & DevOps avec 15+ ans d'expérience)
- `skills` - Compétences techniques (IA/Automation, Cloud, DevOps, Infrastructure)
- `experience` / `xp` - Parcours professionnel détaillé avec résultats mesurables
- `projects` - Projets & réalisations marquantes
- `contact` - Me contacter (email, téléphone, LinkedIn, GitHub)
- `hire` - Message spécial pour les recruteurs et CTOs
- `lang en/fr` - Changer de langue (ou automatique selon votre navigateur)
- `matrix` - Lancer l'animation Matrix (10 secondes d'effets visuels)
- `reboot` - Redémarrer le terminal avec la séquence de boot
- `clear` - Effacer le terminal
- `help` - Afficher toutes les commandes

### Easter Eggs (Commandes cachées) 🎁
Trouvez-les par vous-même ! Indices :
- Des commandes de hacking 🕵️
- Des boissons ☕🍺
- Des codes secrets 🎮
- Des commandes système 📁
- Et un easter egg ULTIME... 🐱🌀

> **Astuce** : Tapez `easter` pour des indices supplémentaires !

## 🎨 Personnalisation des couleurs

Les couleurs du terminal peuvent être modifiées dans le composant `TerminalPortfolio.jsx` :

- `bg-black` - Fond noir du terminal
- `text-green-400` - Texte principal (vert terminal classique)
- `text-cyan-400` - Commandes utilisateur
- `text-red-400` - Messages d'erreur
- `text-yellow-400` - Messages système et avertissements
- `text-blue-400` - Informations et liens
- Drop shadows et effets glow pour le logo et les animations

### Couleurs de l'animation vague (Logo)
Le logo RAPHAELDEV utilise un cycle de 20 phases avec 3 niveaux d'intensité :
- **Bright** (phase 0-6) : `text-green-200` avec glow fort
- **Normal** (phase 7-13) : `text-green-400`
- **Dim** (phase 14-19) : `text-green-600` avec glow faible

## 🚀 Fonctionnalités avancées

### Auto-détection de langue
Le terminal détecte automatiquement la langue du navigateur :
```javascript
const detectLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.startsWith('fr') ? 'fr' : 'en';
};
```

### Liens cliquables automatiques
Tous les liens (URLs, emails, téléphones) sont automatiquement détectés et rendus cliquables avec :
- `target="_blank"` - Ouverture dans un nouvel onglet
- `rel="noopener noreferrer"` - Sécurité renforcée
- Préservation du focus sur le terminal

### Easter Egg OIIA (Spinning Cat) 🐱🌀
L'easter egg ultime avec plusieurs déclencheurs :
- `oiia` - Commande principale
- `spinning cat` - Nom explicite
- `spin` / `spincat` / `cat spin` - Variantes
- `🐱🌀` - Emojis directs

Séquence :
1. Premier avertissement → `oiia confirm`
2. Second avertissement → `oiia launch`
3. Compte à rebours 3-2-1
4. Vidéo YouTube en fullscreen avec bouton fermer et touche ESC

## 📄 License

Ce projet est open source et disponible sous licence MIT.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 👤 Auteur

**Raphaël Auberlet** - Responsable SI & DevOps Engineer
- 📧 Email: contact@raphaeldev.fr
- 📱 Téléphone: +262 693 39 58 98
- 💼 LinkedIn: [raphaelauberlet](https://linkedin.com/in/raphaelauberlet)
- 🐙 GitHub: [ralphi2811](https://github.com/ralphi2811)
- 📍 Location: Le Tampon, La Réunion (974)
- 🌐 Site: [raphaeldev.fr](https://raphaeldev.fr)

**Expertise** : 15+ ans d'expérience en infrastructure, DevOps, Cloud et automatisation. Spécialisé en transformation digitale, IA/ML, et leadership technique.

## 🎯 Objectif du projet

Ce portfolio terminal a été conçu pour :
- ✅ Se démarquer des CV traditionnels
- ✅ Démontrer mes compétences techniques de manière interactive
- ✅ Créer une expérience mémorable pour les recruteurs et CTOs
- ✅ Montrer mon attention aux détails et ma créativité
- ✅ Intégrer de l'humour avec les easter eggs tout en restant professionnel

**Disponible** pour des postes de Responsable SI, DSI, CTO, Lead DevOps.

---

⭐ Si vous aimez ce projet, n'oubliez pas de lui donner une étoile sur GitHub !

💬 **Recruteurs / CTOs** : Tapez `hire` dans le terminal pour un message personnalisé !
