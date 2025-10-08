import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Code, Briefcase, Mail, Globe, Zap } from 'lucide-react';

const TerminalPortfolio = () => {
  // Détection automatique de la langue du navigateur
  const detectLanguage = () => {
    const browserLang = navigator.language || navigator.userLanguage;
    // Si la langue du navigateur commence par 'fr', on retourne 'fr', sinon 'en'
    return browserLang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
  };

  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lang, setLang] = useState(detectLanguage());
  const [isBooting, setIsBooting] = useState(true);
  const [showMatrix, setShowMatrix] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingLineIndex, setTypingLineIndex] = useState(-1);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const typingIntervalRef = useRef(null);

  // Composant pour le logo avec effet wave
  const AsciiLogo = () => {
    const [wavePhase, setWavePhase] = useState(0);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setWavePhase(prev => (prev + 1) % 20);
      }, 100);
      
      return () => clearInterval(interval);
    }, []);
    
    // Fonction pour obtenir l'intensité de la couleur selon la phase de la vague
    const getColorIntensity = (letterIndex) => {
      const distance = Math.abs((wavePhase % 10) - letterIndex);
      if (distance <= 1) return 'bright';
      if (distance <= 2) return 'normal';
      return 'dim';
    };
    
    // Classes de couleur selon l'intensité
    const getColorClass = (baseColor, letterIndex) => {
      const intensity = getColorIntensity(letterIndex);
      const colorMap = {
        green: {
          bright: 'text-green-300 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]',
          normal: 'text-green-400',
          dim: 'text-green-500'
        },
        cyan: {
          bright: 'text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.8)]',
          normal: 'text-cyan-400',
          dim: 'text-cyan-500'
        },
        blue: {
          bright: 'text-blue-300 drop-shadow-[0_0_8px_rgba(147,197,253,0.8)]',
          normal: 'text-blue-400',
          dim: 'text-blue-500'
        },
        purple: {
          bright: 'text-purple-300 drop-shadow-[0_0_8px_rgba(216,180,254,0.8)]',
          normal: 'text-purple-400',
          dim: 'text-purple-500'
        },
        pink: {
          bright: 'text-pink-300 drop-shadow-[0_0_8px_rgba(249,168,212,0.8)]',
          normal: 'text-pink-400',
          dim: 'text-pink-500'
        },
        red: {
          bright: 'text-red-300 drop-shadow-[0_0_8px_rgba(252,165,165,0.8)]',
          normal: 'text-red-400',
          dim: 'text-red-500'
        },
        orange: {
          bright: 'text-orange-300 drop-shadow-[0_0_8px_rgba(253,186,116,0.8)]',
          normal: 'text-orange-400',
          dim: 'text-orange-500'
        }
      };
      
      return colorMap[baseColor][intensity];
    };
    
    return (
      <div className="my-2 w-full">
        <div className="leading-tight whitespace-pre font-mono text-sm">
          <div><span className="text-cyan-400">╔═════════════════════════════════════════════════════════════════════════════════════╗</span></div>
          <div><span className="text-cyan-400">║</span>                                                                                     <span className="text-cyan-400">║</span></div>
          <div><span className="text-cyan-400">║</span>  <span className={getColorClass('green', 0)}>██████╗ </span> <span className={getColorClass('green', 1)}>█████╗ </span><span className={getColorClass('cyan', 2)}>██████╗ </span><span className={getColorClass('cyan', 3)}>██╗  ██╗</span> <span className={getColorClass('blue', 4)}>█████╗ </span><span className={getColorClass('blue', 5)}>███████╗</span><span className={getColorClass('purple', 6)}>██╗     </span><span className={getColorClass('pink', 7)}>██████╗ </span><span className={getColorClass('red', 8)}>███████╗</span><span className={getColorClass('orange', 9)}>██╗   ██╗</span>  <span className="text-cyan-400">║</span></div>
          <div><span className="text-cyan-400">║</span>  <span className={getColorClass('green', 0)}>██╔══██╗</span><span className={getColorClass('green', 1)}>██╔══██╗</span><span className={getColorClass('cyan', 2)}>██╔══██╗</span><span className={getColorClass('cyan', 3)}>██║  ██║</span><span className={getColorClass('blue', 4)}>██╔══██╗</span><span className={getColorClass('blue', 5)}>██╔════╝</span><span className={getColorClass('purple', 6)}>██║     </span><span className={getColorClass('pink', 7)}>██╔══██╗</span><span className={getColorClass('red', 8)}>██╔════╝</span><span className={getColorClass('orange', 9)}>██║   ██║</span>  <span className="text-cyan-400">║</span></div>
          <div><span className="text-cyan-400">║</span>  <span className={getColorClass('green', 0)}>██████╔╝</span><span className={getColorClass('green', 1)}>███████║</span><span className={getColorClass('cyan', 2)}>██████╔╝</span><span className={getColorClass('cyan', 3)}>███████║</span><span className={getColorClass('blue', 4)}>███████║</span><span className={getColorClass('blue', 5)}>█████╗  </span><span className={getColorClass('purple', 6)}>██║     </span><span className={getColorClass('pink', 7)}>██║  ██║</span><span className={getColorClass('red', 8)}>█████╗  </span><span className={getColorClass('orange', 9)}>██║   ██║</span>  <span className="text-cyan-400">║</span></div>
          <div><span className="text-cyan-400">║</span>  <span className={getColorClass('green', 0)}>██╔══██╗</span><span className={getColorClass('green', 1)}>██╔══██║</span><span className={getColorClass('cyan', 2)}>██╔═══╝ </span><span className={getColorClass('cyan', 3)}>██╔══██║</span><span className={getColorClass('blue', 4)}>██╔══██║</span><span className={getColorClass('blue', 5)}>██╔══╝  </span><span className={getColorClass('purple', 6)}>██║     </span><span className={getColorClass('pink', 7)}>██║  ██║</span><span className={getColorClass('red', 8)}>██╔══╝  </span><span className={getColorClass('orange', 9)}>╚██╗ ██╔╝</span>  <span className="text-cyan-400">║</span></div>
          <div><span className="text-cyan-400">║</span>  <span className={getColorClass('green', 0)}>██║  ██║</span><span className={getColorClass('green', 1)}>██║  ██║</span><span className={getColorClass('cyan', 2)}>██║     </span><span className={getColorClass('cyan', 3)}>██║  ██║</span><span className={getColorClass('blue', 4)}>██║  ██║</span><span className={getColorClass('blue', 5)}>███████╗</span><span className={getColorClass('purple', 6)}>███████╗</span><span className={getColorClass('pink', 7)}>██████╔╝</span><span className={getColorClass('red', 8)}>███████╗</span><span className={getColorClass('orange', 9)}> ╚████╔╝ </span>  <span className="text-cyan-400">║</span></div>
          <div><span className="text-cyan-400">║</span>  <span className="text-gray-500">╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═════╝ ╚══════╝  ╚═══╝  </span>  <span className="text-cyan-400">║</span></div>
          <div><span className="text-cyan-400">║</span>                                                                                     <span className="text-cyan-400">║</span></div>
          <div><span className="text-cyan-400">║</span>                                     <span className="text-yellow-400 font-bold">raphaeldev.fr</span>                                   <span className="text-cyan-400">║</span></div>
          <div><span className="text-cyan-400">║</span>                                                                                     <span className="text-cyan-400">║</span></div>
          <div><span className="text-cyan-400">╚═════════════════════════════════════════════════════════════════════════════════════╝</span></div>
        </div>
      </div>
    );
  };

  const asciiLogo = 'ASCII_LOGO_COMPONENT';

  const translations = {
    fr: {
      welcome: "Bienvenue sur le terminal de Raphael Auberlet",
      bootComplete: "Système chargé. Tapez 'help' pour commencer.",
      help: `Commandes disponibles:
  about       - Qui suis-je ?
  skills      - Stack technique & expertise
  xp          - Parcours professionnel
  projects    - Réalisations marquantes
  contact     - Me contacter
  lang en/fr  - Changer de langue
  matrix      - Easter egg 🟢
  hire        - 💼 Message pour recruteurs
  reboot     - Redémarrer le terminal
  clear       - Effacer l'écran
  help        - Afficher cette aide`,
      about: `╔═══════════════════════════════════════════════════════════╗
║  RAPHAEL AUBERLET                                         ║
║  Responsable SI • DevOps Engineer • Problem Solver        ║
╚═══════════════════════════════════════════════════════════╝

🪖 MA MISSION : Garder le navire à flot ET le moderniser
   → Expert en transformation digitale et automatisation
   → De l'architecture système au déploiement en production
   → Manager technique qui code encore (et qui adore ça !)

💡 MON SUPER-POUVOIR : Je ne code pas, je résous vos problèmes
   → 15+ ans à transformer des idées en systèmes robustes
   → Spécialiste IA/LLM, automation, cloud & infrastructure
   → Du legacy au cutting-edge : j'ai tout vu, tout fait

🌴 BASÉ À LA RÉUNION (974)
   📍 Remote-first • Déplacements possibles • Flexible

🎨 MON PARCOURS ATYPIQUE : De l'ébénisterie au DevOps
   → Même passion pour l'excellence et la créativité
   → Reconversion réussie, découvertes constantes
   → J'apprends encore chaque jour (actuellement : MCP, Ollama)`,
      skills: `╔═══════════════════════════════════════════════════════════╗
║           💪 STACK TECHNIQUE & EXPERTISE                  ║
╚═══════════════════════════════════════════════════════════╝

🤖 IA & AUTOMATION (⭐ Expertise 2024-2025)
  ▸ LLM : Ollama, GPT-4, Claude, RAG
  ▸ MCP : Développement & intégration professionnelle
  ▸ n8n : Workflows d'automatisation avancés
  ▸ Python AI Stack : LangChain, vector DBs

☁️ CLOUD & INFRASTRUCTURE
  ▸ GCP (Google Cloud Platform) • AWS (Amazon)
  ▸ Cloudflare (Workers, R2, CDN, DNS, Tunnels)
  ▸ odoo.sh • Infrastructure as Code
  ▸ Docker • Kubernetes • CI/CD

🐍 BACKEND & FRAMEWORKS
  ▸ Python : Flask, FastAPI, Django
  ▸ Odoo : Développement & customisation
  ▸ PHP : Symfony, Laravel
  ▸ Node.js • API REST/GraphQL

⚙️ DEVOPS & AUTOMATION
  ▸ GitLab CI/CD • GitHub Actions
  ▸ Ansible • Terraform
  ▸ Monitoring : Prometheus, Grafana
  ▸ Linux Administration expert

💻 FRONTEND & MOBILE
  ▸ JavaScript/TypeScript • React
  ▸ HTML5 • CSS3 • Tailwind
  ▸ WinDev • WebDev • WinDev Mobile

🗄️ DATABASES & DATA
  ▸ PostgreSQL • MySQL • MongoDB
  ▸ Redis • Vector Databases
  ▸ Data modeling & optimization

🎯 SOFT SKILLS
  ▸ Management d'équipe IT
  ▸ Architecture système & scalabilité
  ▸ Résolution de problèmes complexes
  ▸ Veille technologique permanente`,
      experience: `╔═══════════════════════════════════════════════════════════╗
║               🚀 PARCOURS PROFESSIONNEL                   ║
╚═══════════════════════════════════════════════════════════╝

[2023 - Présent] SICALAIT - La Réunion
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
└─ 💼 Responsable Systèmes d'Information

   🎯 Mission : "Garder le bateau à flot" pendant la transformation
   
   ✅ Modernisation complète de l'infrastructure IT
   ✅ Migration cloud (GCP) & automatisation DevOps
   ✅ Mise en place CI/CD & conteneurisation
   ✅ Gestion équipe technique & prestataires
   ✅ Architecture système & sécurité
   
   💡 Stack : GCP, Docker, K8s, Odoo, Python, Cloudflare


[2020 - 2023] SDPMA - Fermes & Jardins - La Réunion
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
└─ ⚙️ Ingénieur DevOps & Développeur

   🎯 Mission : Stabiliser, automatiser, optimiser
   
   ✅ Transformation infrastructure (on-premise → cloud)
   ✅ Automatisation complète des déploiements
   ✅ Maintenance logiciels de caisse (conformité légale)
   ✅ Développement apps mobiles d'inventaire
   ✅ Formation équipes aux pratiques DevOps
   
   💡 Stack : AWS, GitLab CI, Docker, Python, WinDev Mobile


[2007 - 2020] 6Kreation - Auto-entrepreneur (12 ans)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
└─ 👔 Directeur & Développeur Full Stack

   🎯 Création & gestion entreprise
   
   ✅ Développement applications de gestion (WINDEV/WebDev)
   ✅ Conception meubles sur mesure (ébénisterie)
   ✅ Gestion complète : commercial, technique, production
   ✅ Reconversion progressive vers le dev & l'IT
   
   💡 Stack : WINDEV, WebDev Mobile, SQL, gestion projet


📈 CHIFFRES CLÉS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • 15+ années d'expérience technique
  • 5 ans à maintenir des infras critiques en production
  • 2 transformations digitales majeures menées à bien
  • ∞ problèmes résolus avec créativité et pragmatisme`,
      projects: `╔═══════════════════════════════════════════════════════════╗
║          ⚡ PROJETS & RÉALISATIONS MARQUANTES              ║
╚═══════════════════════════════════════════════════════════╝

🏭 TRANSFORMATION DIGITALE SICALAIT (2023-2025)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   → Migration infrastructure vers GCP
   → Automatisation complète des déploiements (GitLab CI/CD)
   → Modernisation stack technique (conteneurisation)
   → Zéro downtime pendant la transformation
   
   📊 Impact : +80% vélocité déploiements, -60% incidents
   🛠️ Stack : GCP, Docker, Kubernetes, Odoo, Python


💰 SYSTÈMES DE CAISSE & CONFORMITÉ (2020-2023)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   → Maintenance logiciels de caisse (conformité légale)
   → Mise aux normes fiscales et certifications
   → Développement apps mobiles d'inventaire
   → Synchronisation temps réel stocks/caisses
   
   📊 Impact : 100% conformité, 0 perte de données
   🛠️ Stack : Python, WinDev Mobile, PostgreSQL, API REST


🤖 AUTOMATISATIONS IA & WORKFLOWS (2024-2025)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   → Intégration LLM en production (Ollama, GPT-4)
   → Développement MCP servers pour workflows métier
   → Automatisation n8n : veille, reporting, alertes
   → RAG pour documentation technique interne
   
   📊 Impact : -70% temps tâches répétitives
   🛠️ Stack : Ollama, n8n, MCP, Python, Vector DBs


☁️ INFRASTRUCTURE MULTI-CLOUD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   → Architecture haute disponibilité GCP + AWS
   → CDN & sécurité Cloudflare (Workers, Tunnels)
   → Monitoring & alerting temps réel
   → Disaster recovery & backups automatisés
   
   📊 Impact : 99.9% uptime, sécurité renforcée
   🛠️ Stack : GCP, AWS, Cloudflare, Terraform, Ansible


💡 + DIZAINES DE PROJETS sur mesure
   → Portfolio complet & références disponibles sur demande
   → Code samples sur GitHub : github.com/ralphi2811`,
      contact: `╔═══════════════════════════════════════════════════════════╗
║                  📬 CONTACT & LIENS                       ║
╚═══════════════════════════════════════════════════════════╝

📧 Email
   → contact@raphaeldev.fr
   → Réponse sous 24h garanti

💼 GitHub
   → github.com/ralphi2811
   → Code samples & projets open-source

🔗 LinkedIn
   → linkedin.com/in/raphaelauberlet
   → Réseau professionnel & recommandations

� Téléphone
   → +262 693 39 58 98
   → WhatsApp / Signal disponibles

�📍 Localisation
   → Le Tampon, La Réunion (974)
   → Remote-first • Déplacements France/Europe OK


💡 DISPONIBILITÉ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ✅ Missions freelance / consulting
   ✅ CDI • CDD • Contrats longue durée
   ✅ Remote 100% ou hybride
   ✅ Disponible immédiatement (préavis négociable)


> Tapez 'hire' pour un message spécial recruteurs 😉`,
      hire: `
██╗  ██╗██╗██████╗ ███████╗    ███╗   ███╗███████╗    ██╗
██║  ██║██║██╔══██╗██╔════╝    ████╗ ████║██╔════╝    ██║
███████║██║██████╔╝█████╗      ██╔████╔██║█████╗      ██║
██╔══██║██║██╔══██╗██╔══╝      ██║╚██╔╝██║██╔══╝      ╚═╝
██║  ██║██║██║  ██║███████╗    ██║ ╚═╝ ██║███████╗    ██╗
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚══════╝    ╚═╝

╔═══════════════════════════════════════════════════════════╗
║     POURQUOI VOUS DEVRIEZ ME CONTACTER MAINTENANT :       ║
╚═══════════════════════════════════════════════════════════╝

🎯 VOUS CHERCHEZ QUELQU'UN QUI...
   ✅ Comprend VRAIMENT le business (pas juste la tech)
   ✅ A gardé des systèmes critiques en prod pendant 5 ans
   ✅ Sait coder ET manager (le rare combo)
   ✅ Reste à jour sur l'IA, l'automation, le cloud moderne
   ✅ Peut discuter avec le CEO comme avec les devs

💪 JE NE SUIS PAS...
   ❌ Un dev qui attend qu'on lui dise quoi faire
   ❌ Un manager qui a oublié comment on code
   ❌ Quelqu'un qui a peur de mettre les mains dans le cambouis
   ❌ Un profil "juste de passage" qui va partir dans 6 mois

🚀 JE SUIS...
   ✨ Un problem solver qui adore les défis techniques
   ✨ Un touche-à-tout qui apprend vite (actuellement : MCP)
   ✨ Passionné par l'excellence et l'innovation
   ✨ Créatif (merci l'ébénisterie !)
   ✨ Fiable (j'ai gardé le navire à flot pendant les tempêtes)

💼 CE QUE JE PEUX FAIRE POUR VOUS :
   → Architecturer & déployer votre infra cloud
   → Moderniser votre legacy sans tout casser
   → Automatiser ce qui doit l'être (IA inclus)
   → Former et booster vos équipes techniques
   → Gérer vos projets critiques de A à Z
   → Ou juste résoudre ce problème que personne n'arrive à fixer

👁️ POSTES VISÉS :
   • Head of Engineering / CTO
   • Lead DevOps / SRE / Platform Engineer
   • Architecte Cloud / Solutions Architect
   • Responsable / Directeur Systèmes d'Information
   • Senior Full Stack avec leadership technique
   • Ou on en discute ! (je suis ouvert)

📩 ON DISCUTE ?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   contact@raphaeldev.fr
   +262 693 39 58 98
   linkedin.com/in/raphaelauberlet
   
   Café virtuel offert ☕ • Réponse rapide garantie ⚡

P.S. : Si vous lisez ça, c'est que vous appréciez les profils
       originaux. On est déjà sur la même longueur d'onde 🤝`,
      notFound: "Commande non reconnue. Tapez 'help' pour la liste des commandes."
    },
    en: {
      welcome: "Welcome to Raphael Auberlet's terminal",
      bootComplete: "System loaded. Type 'help' to start.",
      help: `Available commands:
  about       - Who am I?
  skills      - Tech stack & expertise
  xp          - Professional background
  projects    - Key achievements
  contact     - Contact me
  lang en/fr  - Change language
  matrix      - Easter egg 🟢
  hire        - 💼 Message for recruiters
  reboot     - reboot terminal
  clear       - Clear screen
  help        - Display this help`,
      about: `╔═══════════════════════════════════════════════════════════╗
║  RAPHAEL AUBERLET                                         ║
║  IT Manager • DevOps Engineer • Problem Solver            ║
╚═══════════════════════════════════════════════════════════╝

🪖 MY MISSION: Keep the ship afloat AND modernize it
   → Expert in digital transformation & automation
   → From system architecture to production deployment
   → Tech manager who still codes (and loves it!)

💡 MY SUPERPOWER: I don't code, I solve your problems
   → 15+ years turning ideas into robust systems
   → Specialist in AI/LLM, automation, cloud & infrastructure
   → From legacy to cutting-edge: seen it all, done it all

🌴 BASED IN REUNION ISLAND (974)
   📍 Remote-first • Travel available • Flexible

🎨 ATYPICAL BACKGROUND: From woodworking to DevOps
   → Same passion for excellence and creativity
   → Successful career change, constant discovery
   → Still learning every day (currently: MCP, Ollama)`,
      skills: `╔═══════════════════════════════════════════════════════════╗
║               💪 TECH STACK & EXPERTISE                   ║
╚═══════════════════════════════════════════════════════════╝

🤖 AI & AUTOMATION (⭐ 2024-2025 Expertise)
  ▸ LLM: Ollama, GPT-4, Claude, RAG
  ▸ MCP: Development & professional integration
  ▸ n8n: Advanced automation workflows
  ▸ Python AI Stack: LangChain, vector DBs

☁️ CLOUD & INFRASTRUCTURE
  ▸ GCP (Google Cloud Platform) • AWS (Amazon)
  ▸ Cloudflare (Workers, R2, CDN, DNS, Tunnels)
  ▸ odoo.sh • Infrastructure as Code
  ▸ Docker • Kubernetes • CI/CD

🐍 BACKEND & FRAMEWORKS
  ▸ Python: Flask, FastAPI, Django
  ▸ Odoo: Development & customization
  ▸ PHP: Symfony, Laravel
  ▸ Node.js • REST/GraphQL APIs

⚙️ DEVOPS & AUTOMATION
  ▸ GitLab CI/CD • GitHub Actions
  ▸ Ansible • Terraform
  ▸ Monitoring: Prometheus, Grafana
  ▸ Expert Linux Administration

💻 FRONTEND & MOBILE
  ▸ JavaScript/TypeScript • React
  ▸ HTML5 • CSS3 • Tailwind
  ▸ WinDev • WebDev • WinDev Mobile

🗄️ DATABASES & DATA
  ▸ PostgreSQL • MySQL • MongoDB
  ▸ Redis • Vector Databases
  ▸ Data modeling & optimization

🎯 SOFT SKILLS
  ▸ IT team management
  ▸ System architecture & scalability
  ▸ Complex problem solving
  ▸ Continuous tech watch`,
      experience: `╔═══════════════════════════════════════════════════════════╗
║              🚀 PROFESSIONAL BACKGROUND                   ║
╚═══════════════════════════════════════════════════════════╝

[2023 - Present] SICALAIT - Reunion Island
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
└─ 💼 IT Systems Manager
   🎯 Mission: "Keep the ship afloat" during transformation
   ✅ Complete IT infrastructure modernization
   ✅ Cloud migration (GCP) & DevOps automation
   ✅ CI/CD implementation & containerization
   💡 Stack: GCP, Docker, K8s, Odoo, Python, Cloudflare

[2020 - 2023] SDPMA - Fermes & Jardins
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
└─ ⚙️ DevOps Engineer & Developer
   🎯 Mission: Stabilize, automate, optimize
   ✅ Infrastructure transformation (on-premise → cloud)
   ✅ Complete deployment automation
   ✅ POS software maintenance (legal compliance)
   ✅ Mobile inventory apps development
   💡 Stack: AWS, GitLab CI, Docker, Python, WinDev Mobile

[2007 - 2020] 6Kreation - Self-employed (12 years)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
└─ 👔 Director & Full Stack Developer
   ✅ Management apps development (WINDEV/WebDev)
   ✅ Custom furniture design (woodworking)
   ✅ Complete business management
   💡 Stack: WINDEV, WebDev Mobile, SQL

📈 KEY FIGURES: 15+ years • 5 years critical infra • ∞ problems solved`,
      projects: `╔═══════════════════════════════════════════════════════════╗
║                   ⚡ KEY ACHIEVEMENTS                      ║
╚═══════════════════════════════════════════════════════════╝

🏭 SICALAIT DIGITAL TRANSFORMATION (2023-2025)
   → Infrastructure migration to GCP
   → Complete deployment automation (GitLab CI/CD)
   → Zero downtime during transformation
   📊 Impact: +80% deploy velocity, -60% incidents
   🛠️ Stack: GCP, Docker, Kubernetes, Odoo, Python

💰 POS SYSTEMS & COMPLIANCE (2020-2023)
   → POS software maintenance (legal compliance)
   → Tax regulations & certifications  
   → Mobile inventory apps development
   → Real-time stock/POS synchronization
   📊 Impact: 100% compliance, 0 data loss
   🛠️ Stack: Python, WinDev Mobile, PostgreSQL, REST API

🤖 AI AUTOMATION & WORKFLOWS (2024-2025)
   → LLM integration in production (Ollama, GPT-4)
   → MCP servers development for business workflows
   📊 Impact: -70% time on repetitive tasks
   🛠️ Stack: Ollama, n8n, MCP, Python, Vector DBs

☁️ MULTI-CLOUD INFRASTRUCTURE
   → High availability architecture GCP + AWS
   → CDN & security with Cloudflare
   📊 Impact: 99.9% uptime, enhanced security
   🛠️ Stack: GCP, AWS, Cloudflare, Terraform, Ansible

💡 + DOZENS of custom projects
   → Full portfolio & references available
   → Code samples: github.com/ralphi2811`,
      contact: `╔═══════════════════════════════════════════════════════════╗
║            📬 CONTACT & LINKS                             ║
╚═══════════════════════════════════════════════════════════╝

📧 Email → contact@raphaeldev.fr (24h response guaranteed)
💼 GitHub → github.com/ralphi2811
🔗 LinkedIn → linkedin.com/in/raphaelauberlet
☎️ Phone → +262 693 39 58 98
📍 Location → Le Tampon, Reunion Island (974)
   Remote-first • Travel France/Europe OK

💡 AVAILABILITY
   ✅ Freelance/consulting missions
   ✅ Full-time contracts • Long-term projects
   ✅ 100% remote or hybrid
   ✅ Available immediately (negotiable notice period)

> Type 'hire' for a special recruiter message 😉`,
      hire: `
██╗  ██╗██╗██████╗ ███████╗    ███╗   ███╗███████╗    ██╗
██║  ██║██║██╔══██╗██╔════╝    ████╗ ████║██╔════╝    ██║
███████║██║██████╔╝█████╗      ██╔████╔██║█████╗      ██║
██╔══██║██║██╔══██╗██╔══╝      ██║╚██╔╝██║██╔══╝      ╚═╝
██║  ██║██║██║  ██║███████╗    ██║ ╚═╝ ██║███████╗    ██╗
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚══════╝    ╚═╝

╔═══════════════════════════════════════════════════════════╗
║  WHY YOU SHOULD CONTACT ME NOW:                          ║
╚═══════════════════════════════════════════════════════════╝

🎯 YOU'RE LOOKING FOR SOMEONE WHO...
   ✅ REALLY understands business (not just tech)
   ✅ Kept critical systems in prod for 5 years
   ✅ Can code AND manage (the rare combo)
   ✅ Stays current on AI, automation, modern cloud
   ✅ Can talk to CEOs and devs alike

🚀 I AM...
   ✨ A problem solver who loves technical challenges
   ✨ A jack-of-all-trades who learns fast (currently: MCP)
   ✨ Passionate about excellence and innovation
   ✨ Creative (thanks woodworking!)
   ✨ Reliable (kept the ship afloat through storms)

💼 WHAT I CAN DO FOR YOU:
   → Architect & deploy your cloud infrastructure
   → Modernize your legacy without breaking everything
   → Automate what needs to be (AI included)
   → Train and boost your technical teams
   → Manage your critical projects end-to-end
   → Or just fix that problem nobody can solve

👁️ TARGET POSITIONS:
   • Head of Engineering / CTO
   • Lead DevOps / SRE / Platform Engineer
   • Cloud / Solutions Architect
   • IT Director / Systems Manager
   • Senior Full Stack with technical leadership
   • Or let's discuss! (I'm open)

📩 LET'S TALK?
   contact@raphaeldev.fr • +262 693 39 58 98
   linkedin.com/in/raphaelauberlet
   Virtual coffee offered ☕ • Fast response guaranteed ⚡

P.S.: If you're reading this, you appreciate original profiles.
      We're already on the same wavelength 🤝`,
      notFound: "Command not recognized. Type 'help' for command list."
    }
  };

  const t = translations[lang];

  const bootSequence = [
    "RAPHAELDEV TERMINAL OS - ULTRA EDITION",
    "Detecting hardware...",
    "├─ CPU: Brain v2.0 [Overclocked] ✓",
    "├─ RAM: Coffee 64GB DDR5 ✓",
    "├─ GPU: Creativity RTX 4090 ✓",
    "└─ SSD: Experience 15TB NVMe ✓",
    "",
    "Loading game assets...",
    "▸ Level: Senior Developer [UNLOCKED]",
    "▸ XP: 15+ years [MAX]",
    "▸ Skills tree: COMPLETED",
    "▸ Achievement unlocked: 'Full Stack Master'",
    "",
    { type: 'loading' } // Marqueur spécial pour l'animation de loading
  ];

  useEffect(() => {
    if (isBooting) {
      let index = 0;
      let currentCharIndex = 0;
      let currentText = '';
      let currentOutputIndex = 0;
      let timeoutId = null;
      let cancelled = false;
      
      // Afficher un curseur pendant l'attente initiale
      setOutput([{ type: 'system', text: '▊' }]);
      setTypingLineIndex(0);
      
      const bootType = () => {
        if (cancelled) return;
        
        // Effacer le curseur initial au début du boot
        if (index === 0 && currentCharIndex === 0) {
          setOutput([]);
          setTypingLineIndex(-1);
        }
        
        if (index >= bootSequence.length) {
          // Fin de la séquence de boot - lancer l'animation de loading
          startLoadingAnimation();
          return;
        }
        
        const item = bootSequence[index];
        
        // Si c'est le marqueur de loading
        if (typeof item === 'object' && item.type === 'loading') {
          startLoadingAnimation();
          return;
        }
        
        // Si c'est le logo, l'afficher directement
        if (typeof item === 'object' && item.component) {
          setOutput(prev => [...prev, { type: 'logo' }]);
          index++;
          currentCharIndex = 0;
          currentText = '';
          currentOutputIndex++;
          timeoutId = setTimeout(bootType, 50);
          return;
        }
        
        // Si c'est une ligne vide, l'afficher directement
        if (item === '') {
          setOutput(prev => [...prev, { type: 'system', text: '' }]);
          index++;
          currentCharIndex = 0;
          currentText = '';
          currentOutputIndex++;
          timeoutId = setTimeout(bootType, 50);
          return;
        }
        
        // Typewriter pour les lignes de texte
        if (currentCharIndex === 0) {
          // Ajouter une nouvelle ligne vide
          setOutput(prev => [...prev, { type: 'system', text: '' }]);
          setTypingLineIndex(currentOutputIndex);
        }
        
        if (currentCharIndex < item.length) {
          currentText = item.substring(0, currentCharIndex + 1);
          setOutput(prev => {
            const newOutput = [...prev];
            newOutput[currentOutputIndex] = { type: 'system', text: currentText };
            return newOutput;
          });
          currentCharIndex++;
          
          // Scroll pendant la frappe
          if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
          }
          
          timeoutId = setTimeout(bootType, 15); // 15ms entre chaque caractère
        } else {
          // Ligne terminée, passer à la suivante
          setTypingLineIndex(-1);
          index++;
          currentCharIndex = 0;
          currentText = '';
          currentOutputIndex++;
          
          timeoutId = setTimeout(bootType, 250); // Pause de 250ms entre les lignes (augmenté de 100ms à 250ms)
        }
      };
      
      const startLoadingAnimation = () => {
        setOutput(prev => [...prev, { type: 'system', text: '' }]);
        setOutput(prev => [...prev, { type: 'system', text: 'Initializing terminal interface...' }]);
        
        let progress = 0;
        const totalSteps = 20;
        const intervalTime = 200; // 4 secondes / 20 étapes = 200ms
        
        const loadingInterval = setInterval(() => {
          progress++;
          const filled = '▓'.repeat(progress);
          const empty = '░'.repeat(totalSteps - progress);
          const percentage = Math.round((progress / totalSteps) * 100);
          
          setOutput(prev => {
            const newOutput = [...prev];
            // Mettre à jour la dernière ligne avec la barre de progression
            newOutput[newOutput.length - 1] = {
              type: 'system',
              text: `Loading... [${filled}${empty}] ${percentage}%`
            };
            return newOutput;
          });
          
          if (progress >= totalSteps) {
            clearInterval(loadingInterval);
            
            // Attendre un peu puis clear et afficher le logo + messages
            setTimeout(() => {
              setOutput([
                { type: 'logo' },
                { type: 'system', text: '' },
                { type: 'system', text: t.welcome },
                { type: 'system', text: t.bootComplete },
                { type: 'system', text: '' }
              ]);
              setIsBooting(false);
              setTypingLineIndex(-1);
            }, 300);
          }
        }, intervalTime);
      };
      
      // Délai d'une seconde avant de commencer le boot
      timeoutId = setTimeout(bootType, 1000);
      
      // Cleanup
      return () => {
        cancelled = true;
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [isBooting, lang]);

  useEffect(() => {
    if (outputRef.current) {
      // Force scroll immédiat
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
      // Double scroll pour être sûr
      setTimeout(() => {
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
      }, 10);
    }
  }, [output]);

  useEffect(() => {
    if (!isBooting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isBooting, output]);

  const handleContainerClick = (e) => {
    // Ne pas focus si on clique sur un lien ou un bouton
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button')) {
      return;
    }
    if (inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  };

  // Fonction pour détecter et rendre les liens cliquables
  const renderTextWithLinks = (text) => {
    // Regex pour détecter les URLs, emails et numéros de téléphone
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.(com|fr|net|org|io|dev)\/[^\s]*|github\.com\/[^\s]+|linkedin\.com\/[^\s]+)/gi;
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const phoneRegex = /(\+\d{1,3}\s?\d{3}\s?\d{2}\s?\d{2}\s?\d{2})/gi;
    
    const parts = [];
    let lastIndex = 0;
    
    // Combiner tous les matches
    const allMatches = [];
    
    // URLs
    let match;
    while ((match = urlRegex.exec(text)) !== null) {
      allMatches.push({ type: 'url', match: match[0], index: match.index });
    }
    
    // Emails
    emailRegex.lastIndex = 0;
    while ((match = emailRegex.exec(text)) !== null) {
      allMatches.push({ type: 'email', match: match[0], index: match.index });
    }
    
    // Téléphones
    phoneRegex.lastIndex = 0;
    while ((match = phoneRegex.exec(text)) !== null) {
      allMatches.push({ type: 'phone', match: match[0], index: match.index });
    }
    
    // Trier par index
    allMatches.sort((a, b) => a.index - b.index);
    
    // Construire les parties
    allMatches.forEach((item, i) => {
      // Texte avant le lien
      if (item.index > lastIndex) {
        parts.push(text.substring(lastIndex, item.index));
      }
      
      // Le lien
      let href = '';
      if (item.type === 'url') {
        href = item.match.startsWith('http') ? item.match : `https://${item.match}`;
      } else if (item.type === 'email') {
        href = `mailto:${item.match}`;
      } else if (item.type === 'phone') {
        href = `tel:${item.match.replace(/\s/g, '')}`;
      }
      
      parts.push(
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 underline hover:brightness-125 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {item.match}
        </a>
      );
      
      lastIndex = item.index + item.match.length;
    });
    
    // Texte restant
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? parts : text;
  };

  // Fonction pour afficher du texte lettre par lettre
  const typeText = (text, type = 'output') => {
    setIsTyping(true);
    let currentIndex = 0;
    const outputIndex = output.length;
    setTypingLineIndex(outputIndex);
    
    // Ajouter une ligne vide qui sera remplie progressivement
    setOutput(prev => [...prev, { type, text: '' }]);
    
    const typeInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setOutput(prev => {
          const newOutput = [...prev];
          newOutput[outputIndex] = { 
            type, 
            text: text.substring(0, currentIndex + 1)
          };
          return newOutput;
        });
        currentIndex++;
        
        // Scroll pendant la frappe
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTypingLineIndex(-1);
        // Texte final
        setOutput(prev => {
          const newOutput = [...prev];
          newOutput[outputIndex] = { type, text };
          return newOutput;
        });
      }
    }, 10); // 10ms entre chaque caractère pour un effet rapide mais visible
    
    typingIntervalRef.current = typeInterval;
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    setOutput(prev => [...prev, { type: 'input', text: `> ${cmd}` }]);

    if (trimmedCmd === '') return;

    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    // Force scroll après ajout
    setTimeout(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    }, 0);

    if (trimmedCmd === 'clear') {
      setOutput([]);
      return;
    }

    if (trimmedCmd === 'help') {
      typeText(t.help);
      return;
    }

    if (trimmedCmd === 'about') {
      typeText(t.about);
      return;
    }

    if (trimmedCmd === 'skills') {
      typeText(t.skills);
      return;
    }

    if (trimmedCmd === 'xp' || trimmedCmd === 'experience') {
      typeText(t.experience);
      return;
    }

    if (trimmedCmd === 'projects') {
      typeText(t.projects);
      return;
    }

    if (trimmedCmd === 'contact') {
      typeText(t.contact);
      return;
    }

    if (trimmedCmd === 'hire') {
      typeText(t.hire);
      return;
    }

    if (trimmedCmd.startsWith('lang ')) {
      const newLang = trimmedCmd.split(' ')[1];
      if (newLang === 'en' || newLang === 'fr') {
        setLang(newLang);
        setOutput(prev => [...prev, { 
          type: 'output', 
          text: newLang === 'fr' ? 'Langue changée en français' : 'Language changed to English' 
        }]);
      } else {
        setOutput(prev => [...prev, { type: 'error', text: 'Usage: lang en/fr' }]);
      }
      return;
    }

    if (trimmedCmd === 'matrix') {
      setIsTyping(true);
      
      // Capturer l'état actuel
      const currentOutput = [...output];
      
      // Message de chargement
      setOutput([...currentOutput, { type: 'output', text: 'Entering the Matrix...' }]);
      
      // Barre de progression
      const loadingChars = ['[          ]', '[▓         ]', '[▓▓        ]', '[▓▓▓       ]', 
                           '[▓▓▓▓      ]', '[▓▓▓▓▓     ]', '[▓▓▓▓▓▓    ]', '[▓▓▓▓▓▓▓   ]',
                           '[▓▓▓▓▓▓▓▓  ]', '[▓▓▓▓▓▓▓▓▓ ]', '[▓▓▓▓▓▓▓▓▓▓]'];
      
      let loadingIndex = 0;
      
      const loadingInterval = setInterval(() => {
        if (loadingIndex < loadingChars.length) {
          setOutput([
            ...currentOutput, 
            { type: 'output', text: 'Entering the Matrix...' },
            { type: 'system', text: loadingChars[loadingIndex] }
          ]);
          loadingIndex++;
        } else {
          clearInterval(loadingInterval);
          setIsTyping(false);
          
          // Clear et lancer l'effet Matrix après le chargement
          setTimeout(() => {
            setOutput([]);
            setShowMatrix(true);
            
            // Effet Matrix pendant 10 secondes puis reboot
            setTimeout(() => {
              setShowMatrix(false);
              setOutput([]);
              setHistory([]);
              setHistoryIndex(-1);
              setIsBooting(true);
            }, 10000);
          }, 300);
        }
      }, 250); // 250ms x 11 = ~3 secondes
      
      return;
    }

    if (trimmedCmd === 'reboot') {
      setOutput([]);
      setHistory([]);
      setHistoryIndex(-1);
      setIsBooting(true);
      return;
    }

    if (trimmedCmd === 'sudo rm -rf /') {
      setOutput(prev => [...prev, { 
        type: 'error', 
        text: "Nice try! But I'm smarter than that 😉" 
      }]);
      return;
    }

    setOutput(prev => [...prev, { type: 'error', text: t.notFound }]);
  };

  const handleKeyDown = (e) => {
    // Bloquer les inputs pendant la frappe
    if (isTyping && e.key === 'Enter') {
      e.preventDefault();
      return;
    }
    
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  return (
    <div 
      className="h-screen bg-black text-green-400 font-mono p-4 relative overflow-hidden cursor-text flex flex-col"
      onClick={handleContainerClick}
    >
      {/* Matrix effect */}
      {showMatrix && (
        <div className="absolute inset-0 z-50 pointer-events-none bg-black">
          <div className="matrix-rain">
            {[...Array(80)].map((_, i) => (
              <div
                key={i}
                className="matrix-column"
                style={{
                  left: `${(i * 1.25)}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${4 + Math.random() * 4}s`
                }}
              >
                {[...Array(30)].map((_, j) => (
                  <span 
                    key={j}
                    style={{
                      opacity: Math.max(0.1, 1 - (j * 0.05)),
                      color: j === 0 ? '#fff' : '#0f0'
                    }}
                  >
                    {String.fromCharCode(0x30A0 + Math.random() * 96)}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Background ASCII art */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <pre className="text-xs animate-pulse">
{`
    ╔═══════════════════════════════════════╗
    ║    DEVELOPER • DEVOPS • FULL STACK    ║
    ╚═══════════════════════════════════════╝
          ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
         █░░░░░░░░░░░░░░░░░░░░░░░░░░█
         █░░ PYTHON • REACT • PHP ░░█
         █░░ DOCKER • K8S • CI/CD ░░█
         █░░░░░░░░░░░░░░░░░░░░░░░░░░█
          ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
`}
        </pre>
      </div>

      {/* Header - Fixed */}
      <div className="mb-4 border-b border-green-800 pb-4 flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <Terminal className="w-6 h-6" />
          <h1 className="text-xl font-bold">RAPHAELDEV.FR</h1>
          <button
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            className="ml-auto px-3 py-1 border border-green-600 hover:bg-green-900/30 transition-colors rounded"
          >
            <Globe className="w-4 h-4 inline mr-1" />
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
        </div>
        <div className="text-xs opacity-70">
          Type 'help' for available commands | Press ↑↓ for history
        </div>
      </div>

      {/* Terminal output - Scrollable */}
      <div 
        ref={outputRef}
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-transparent mb-4 min-h-0"
      >
        {output.map((line, i) => (
          line.type === 'logo' ? (
            <AsciiLogo key={i} />
          ) : (
            <div key={i} className={`mb-1 ${
              line.type === 'input' ? 'text-cyan-400' : 
              line.type === 'error' ? 'text-red-400' : 
              line.type === 'system' ? 'text-yellow-400' : 
              'text-green-300'
            }`}>
              <pre className="whitespace-pre-wrap break-words">
                {renderTextWithLinks(line.text)}
                {i === typingLineIndex && <span className="animate-pulse">▊</span>}
              </pre>
            </div>
          )
        ))}
      </div>

      {/* Input line - Fixed */}
      {!isBooting && (
        <div className="flex items-center gap-2 flex-shrink-0 pt-2 border-t border-green-800/30">
          <span className="text-cyan-400">visitor@terminal:~$</span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none text-green-400 caret-transparent"
              disabled={isTyping}
              autoFocus
            />
            <span className="absolute left-0 top-0 pointer-events-none text-green-400">
              {input}<span className="animate-pulse">▊</span>
            </span>
          </div>
        </div>
      )}

      <style jsx>{`
        .matrix-rain {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .matrix-column {
          position: absolute;
          top: -150%;
          font-size: 18px;
          color: #0f0;
          animation: matrix-fall linear infinite;
          text-shadow: 0 0 5px #0f0, 0 0 10px #0f0;
          font-family: 'Courier New', monospace;
          display: flex;
          flex-direction: column;
          letter-spacing: 0;
          line-height: 1.2;
        }
        
        @keyframes matrix-fall {
          0% {
            top: -150%;
          }
          100% {
            top: 100%;
          }
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        
        .scrollbar-thumb-green-700::-webkit-scrollbar-thumb {
          background-color: #15803d;
          border-radius: 4px;
        }
        
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default TerminalPortfolio;
