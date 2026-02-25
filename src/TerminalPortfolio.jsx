import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Terminal, Code, Briefcase, Mail, Globe, Zap } from 'lucide-react';

const TerminalPortfolio = () => {
  // Détection automatique de la langue du navigateur
  const detectLanguage = () => {
    const browserLang = navigator.language || navigator.userLanguage;
    // Si la langue du navigateur commence par 'fr', on retourne 'fr', sinon 'en'
    return browserLang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
  };

  // Géolocalisation - Redirection si La Réunion (DÉSACTIVÉ)
  // useEffect(() => {
  //   const checkGeolocation = async () => {
  //     try {
  //       const response = await fetch('https://ipapi.co/json/');
  //       const data = await response.json();
  //       if (data.country_code === 'RE' || 
  //           data.region_code === 'RE' || 
  //           (data.country_code === 'FR' && data.region === 'Reunion')) {
  //         window.location.href = 'https://linkedin.com/in/raphaelauberlet';
  //       }
  //     } catch (error) {
  //       console.log('Geolocation check failed, continuing normally');
  //     }
  //   };
  //   checkGeolocation();
  // }, []);

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

  // ═══════════════════════════════════════════════════════════════════════════
  // 🎉 SYSTÈME D'ÉVÉNEMENTS SAISONNIERS
  // Pour ajouter un événement : ajouter une entrée dans seasonalEvents
  // avec les conditions (mois, jour, etc.) et les propriétés visuelles
  // ═══════════════════════════════════════════════════════════════════════════
  const seasonalEvents = [
    {
      id: 'christmas',
      name: 'Noël',
      // Condition : du 1er au 31 décembre
      isActive: () => {
        const now = new Date();
        return now.getMonth() === 11; // Décembre (0-indexed)
      },
      // Effet visuel : neige qui tombe
      effect: 'snow',
      // Émojis décoratifs pour le header
      headerEmoji: '🎄',
      // Message spécial (optionnel)
      message: { fr: 'Joyeuses fêtes ! 🎅', en: 'Happy Holidays! 🎅' }
    },
    // ──────────────────────────────────────────────────────────────────────────
    // AJOUTER D'AUTRES ÉVÉNEMENTS ICI :
    // ──────────────────────────────────────────────────────────────────────────
    // {
    //   id: 'halloween',
    //   name: 'Halloween',
    //   isActive: () => {
    //     const now = new Date();
    //     return now.getMonth() === 9 && now.getDate() >= 25; // 25-31 Octobre
    //   },
    //   effect: 'bats', // ou 'pumpkins', etc.
    //   headerEmoji: '🎃',
    //   message: { fr: 'Boo ! 👻', en: 'Boo! 👻' }
    // },
    // {
    //   id: 'valentine',
    //   name: 'Saint-Valentin',
    //   isActive: () => {
    //     const now = new Date();
    //     return now.getMonth() === 1 && now.getDate() >= 10 && now.getDate() <= 14;
    //   },
    //   effect: 'hearts',
    //   headerEmoji: '💕',
    //   message: { fr: 'Joyeuse Saint-Valentin !', en: 'Happy Valentine\'s Day!' }
    // },
    // ──────────────────────────────────────────────────────────────────────────
  ];

  // Déterminer l'événement actif
  const getActiveEvent = () => {
    return seasonalEvents.find(event => event.isActive()) || null;
  };

  const [activeEvent] = useState(getActiveEvent());

  // ❄️ Composant Snowfall optimisé (mémorisé pour éviter les re-renders)
  const Snowfall = useMemo(() => {
    if (!activeEvent || activeEvent.effect !== 'snow') return null;
    
    // Pré-calculer les flocons une seule fois
    const snowflakes = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${(i * 3.33) + Math.random() * 2}%`,
      delay: `${(i * 0.3) % 8}s`,
      duration: `${8 + (i % 5) * 2}s`,
      opacity: 0.4 + (i % 4) * 0.15,
      size: `${10 + (i % 4) * 3}px`,
      symbol: ['❄', '❅', '❆', '✼', '❉'][i % 5]
    }));

    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="snowflake"
            style={{
              left: flake.left,
              animationDelay: flake.delay,
              animationDuration: flake.duration,
              opacity: flake.opacity,
              fontSize: flake.size
            }}
          >
            {flake.symbol}
          </div>
        ))}
      </div>
    );
  }, [activeEvent]);

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
      welcome: ">> Raphaël Auberlet • DSI / CTO | Stratégie Cloud & Cybersécurité",
      bootComplete: "🚀 nashi.cloud • Nouveau projet, nouvelles ambitions • Tapez 'help' pour commencer",
      help: `
Commandes disponibles:
  about       - Qui suis-je ?
  skills      - Stack technique & expertise
  xp          - Parcours professionnel
  projects    - Réalisations marquantes
  contact     - Me contacter
  cv          - 📄 Voir/télécharger mon CV
  lang en/fr  - Changer de langue
  matrix      - 🥚
  hire        - 💼 Message pour recruteurs
  easter      - 🎁 (pour les curieux)
  reboot      - Redémarrer le terminal
  clear       - Effacer l'écran
  help        - Afficher cette aide`,
      about: `
╔═══════════════════════════════════════════════════════════╗
║  RAPHAEL AUBERLET                                         ║
║  DSI / CTO | Stratégie Cloud & Cybersécurité              ║
╚═══════════════════════════════════════════════════════════╝

🚀 NOUVEAU PROJET - JANVIER 2026
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Fondateur & Architecte Cloud chez nashi.cloud
   Infrastructure Cloud souveraine et sécurisée 100% OpenSource

💡 MON EXPERTISE : Vision Stratégique + Excellence Technique
   → 18 ans d'expérience IT (de développeur à DSI)
   → Spécialiste Gouvernance SI, Architecture Cloud & DevOps
   → Expert stack OpenSource : Linux (Kernel), Rust, KVM, Kubernetes
   → Focus : Souveraineté numérique, Sécurité, Performance

🎯 CE QUE J'APPORTE :
   → Direction & Pilotage SI (Budgets, ERP, Schémas directeurs)
   → Architecture Cloud Native & Infrastructure critique
   → DevOps & Security by Design
   → Transformation digitale et optimisation des processus

🌴 BASÉ À LA RÉUNION (974)
   📍 Remote-first • Déplacements France/Europe/International
   🌍 Mobilité complète selon projets

🎨 MON PARCOURS : De l'artisanat à l'architecture Cloud
   → Passion pour l'excellence et la maîtrise technique
   → Autodidacte avec veille technologique permanente
   → Du code aux décisions stratégiques`,
      skills: `
╔═══════════════════════════════════════════════════════════╗
║           💪 STACK TECHNIQUE & EXPERTISE                  ║
╚═══════════════════════════════════════════════════════════╝

🎯 GOUVERNANCE & MANAGEMENT
  ▸ Stratégie SI & Schémas directeurs
  ▸ Alignement IT-Business & Budgets (OpEx/CapEx)
  ▸ Direction de Projets & Migration ERP (Odoo)
  ▸ Conformité RGPD & Gouvernance des données

💻 EXPERTISE TECHNIQUE SYSTÈME
  ▸ Linux Expert : Kernel tuning, Hardening
  ▸ Virtualisation : KVM, Podman, Kubernetes
  ▸ Rust : Développement performance-critical
  ▸ Infrastructure critique & Haute disponibilité

☁️ CLOUD & DEVOPS
  ▸ Architecture Cloud Native (100% OpenSource)
  ▸ DevOps : CI/CD, Terraform, Ansible, Docker
  ▸ Sécurité : Security by Design, Audit, PCA/PRA
  ▸ Souveraineté numérique & Stack européenne

🐍 DÉVELOPPEMENT & AUTOMATION
  ▸ Rust : Orchestration & Performance
  ▸ Python : Automation, IA & Scripting
  ▸ API REST & Microservices
  ▸ Odoo : Développement & Customisation

🗄️ INFRASTRUCTURE & DATA
  ▸ PostgreSQL • MySQL • MongoDB
  ▸ Redis • Vector Databases
  ▸ Monitoring : Prometheus, Grafana
  ▸ Architecture distribuée

🎯 SOFT SKILLS
  ▸ Direction SI & Management d'équipe
  ▸ Architecture système & Scalabilité
  ▸ Résolution de problèmes complexes
  ▸ Veille technologique permanente`,
      experience: `
╔═══════════════════════════════════════════════════════════╗
║               🚀 PARCOURS PROFESSIONNEL                   ║
╚═══════════════════════════════════════════════════════════╝

🔥 NOUVEAU PROJET - JANVIER 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Jan 2026 - Présent] nashi.cloud
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
└─ 🚀 Fondateur & Architecte Cloud

   🎯 Mission : Infrastructure Cloud souveraine et sécurisée
   
   ✅ Stratégie & Conception (Stack 100% OpenSource)
   ✅ Ingénierie Rust : Orchestration optimisée
   ✅ Sécurité : Security by Design, chaîne de confiance
   ✅ R&D : Souveraineté numérique & Cloud Native
   
   💡 Stack : Rust, Linux (Kernel), KVM, Kubernetes


[Août 2023 - Nov 2025] SICALAIT / SDPMA - La Réunion
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
└─ 💼 Responsable Systèmes d'Information (RSI)

   🎯 Mission : Pilotage SI et transformation digitale
   
   ✅ Pilotage SI : Management département IT & budgets
   ✅ Direction Projet ERP : Migration complète vers Odoo (MOA)
   ✅ Opérations : Sécurité & continuité de service groupe
   ✅ Architecture : Cloud, DevOps, CI/CD
   
   💡 Stack : Odoo, GCP, Docker, Kubernetes, Python


[Mai 2020 - Août 2023] SDPMA - La Réunion
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
└─ ⚙️ Lead Développeur & Architecte Solution

   🎯 Mission : Architecture & développement solutions métier
   
   ✅ Architecture Core Business : Système de caisse (POS)
   ✅ Omnicanalité : Interconnexion stocks temps réel
   ✅ Optimisation Logistique : Applications mobiles métier
   ✅ DevOps : Automatisation complète déploiements
   
   💡 Stack : Python, WinDev Mobile, AWS, GitLab CI


[2007 - 2020] Indépendant - Auto-entrepreneur (13 ans)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
└─ 👔 Expert IT & Consultant Fullstack

   🎯 Mission : Expertise technique & solutions sur mesure
   
   ✅ Expertise Linux : Administration serveurs critiques
   ✅ Architecture web haute disponibilité
   ✅ Solutions métier complexes pour clients internationaux
   ✅ Gestion complète : commercial, technique, production
   
   💡 Stack : Linux, WINDEV, WebDev, SQL


📈 CHIFFRES CLÉS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • 18 années d'expérience technique
  • 2 transformations digitales majeures menées à bien
  • Direction SI avec gestion budgets & équipes
  • ∞ problèmes résolus avec créativité et pragmatisme`,
      projects: `
╔═══════════════════════════════════════════════════════════╗
║          ⚡ PROJETS & RÉALISATIONS MARQUANTES              ║
╚═══════════════════════════════════════════════════════════╝

🚀 nashi.cloud - INFRASTRUCTURE CLOUD SOUVERAINE (2026)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   → Création infrastructure Cloud 100% OpenSource
   → Ingénierie Rust : orchestration optimisée
   → Security by Design & chaîne de confiance maîtrisée
   → Focus : Souveraineté numérique & performance
   
   📊 Impact : Solution européenne, sécurisée, performante
   🛠️ Stack : Rust, Linux (Kernel), KVM, Kubernetes


🏭 MIGRATION ERP & TRANSFORMATION SI SICALAIT (2023-2025)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   → Direction projet migration complète vers Odoo (MOA)
   → Refonte processus métier & gouvernance SI
   → Migration cloud (GCP) & automatisation DevOps
   → Gestion budgets & arbitrage investissements IT
   
   📊 Impact : Transformation digitale réussie, SI unifié
   🛠️ Stack : Odoo, GCP, Docker, Kubernetes, Python


💰 ARCHITECTURE POS & OMNICANALITÉ (2020-2023)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   → Conception système de caisse (POS) centralisé
   → Interconnexion temps réel stocks/e-commerce
   → Applications mobiles métier pour logistique
   → Conformité légale & certifications
   
   📊 Impact : 100% conformité, 0 perte de données
   🛠️ Stack : Python, WinDev Mobile, PostgreSQL, API REST


☁️ INFRASTRUCTURE CRITIQUE & HAUTE DISPONIBILITÉ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   → Architecture multi-cloud haute disponibilité
   → Monitoring & alerting temps réel
   → Disaster recovery & backups automatisés
   → Hardening système & audit sécurité
   
   📊 Impact : 99.9% uptime, sécurité renforcée
   🛠️ Stack : Linux, KVM, Prometheus, Grafana, Terraform


💡 + NOMBREUX PROJETS sur mesure
   → 18 ans d'expertise à concevoir des solutions robustes
   → Portfolio complet & références disponibles sur demande
   → Code samples sur GitHub : github.com/ralphi2811`,
      contact: `
╔═══════════════════════════════════════════════════════════╗
║                  📬 CONTACT & LIENS                       ║
╚═══════════════════════════════════════════════════════════╝

📧 Email
   → raphael@nashi.cloud
   → Réponse sous 24h garanti

💼 GitHub
   → github.com/ralphi2811
   → Code samples & projets open-source

🔗 LinkedIn
   → linkedin.com/in/raphaelauberlet
   → Réseau professionnel & recommandations

📄 CV
   → https://ralphi2811.github.io/cv/
   → Télécharger PDF: https://ralphi2811.github.io/cv/cv.pdf

🌐 nashi.cloud
   → https://nashi.cloud
   → Infrastructure Cloud souveraine

☎️ Téléphone
   → +262 693 39 58 98
   → WhatsApp / Télégram disponibles

📍 Localisation
   → Le Tampon, La Réunion (974)
   → Remote-first • Déplacements France/Europe/International


💡 DISPONIBILITÉ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🚀 Actif sur nashi.cloud - Ouvert aux collaborations
   ✅ Consulting & Conseil stratégique
   ✅ Architecture Cloud & Infrastructure
   ✅ Missions freelance / projets spécifiques
   ✅ Remote ou déplacements selon projets


> Tapez 'hire' pour un message spécial recruteurs 😉`,
      cv: `
╔═══════════════════════════════════════════════════════════╗
║                    📄 CURRICULUM VITAE                    ║
╚═══════════════════════════════════════════════════════════╝

🌐 CV en ligne (interactif)
   → https://ralphi2811.github.io/cv/
   → Version web avec sélection de langue FR/EN
   → Navigation interactive et moderne

📥 Télécharger le PDF
   → https://ralphi2811.github.io/cv/cv.pdf
   → Format standard pour impression
   → Téléchargement direct

💡 Le CV complet contient :
   ✓ Parcours professionnel détaillé
   ✓ Stack technique complète
   ✓ Formations et certifications
   ✓ Projets phares et réalisations
   ✓ Langues et centres d'intérêt

> Ouvrez le lien dans votre navigateur pour consulter ou télécharger`,
      hire: `
██╗  ██╗██╗██████╗ ███████╗    ███╗   ███╗███████╗    ██╗
██║  ██║██║██╔══██╗██╔════╝    ████╗ ████║██╔════╝    ██║
███████║██║██████╔╝█████╗      ██╔████╔██║█████╗      ██║
██╔══██║██║██╔══██╗██╔══╝      ██║╚██╔╝██║██╔══╝      ╚═╝
██║  ██║██║██║  ██║███████╗    ██║ ╚═╝ ██║███████╗    ██╗
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚══════╝    ╚═╝

╔═══════════════════════════════════════════════════════════╗
║  🚀 FONDATEUR nashi.cloud - OUVERT AUX COLLABORATIONS 🚀  ║
╚═══════════════════════════════════════════════════════════╝

⚡ NOUVEAU PROJET - JANVIER 2026
   Création de nashi.cloud : Infrastructure Cloud souveraine
   Ouvert aux missions de conseil & architecture

🎯 VOUS CHERCHEZ QUELQU'UN QUI...
   ✅ Comprend VRAIMENT le business (pas juste la tech)
   ✅ Allie vision stratégique DSI ET expertise technique
   ✅ A piloté des transformations SI complètes (ERP, Cloud)
   ✅ Maîtrise Linux Kernel, Rust, Architecture Cloud Native
   ✅ Sait parler au CEO comme aux équipes techniques
   ✅ A 18 ans d'XP du code aux décisions stratégiques

💪 JE NE SUIS PAS...
   ❌ Un consultant qui ne code plus depuis 10 ans
   ❌ Un dev qui ne comprend pas les enjeux business
   ❌ Quelqu'un qui a peur des infrastructures critiques

🚀 JE SUIS...
   ✨ DSI/CTO qui aime garder les mains dans la tech
   ✨ Architecte Cloud avec focus souveraineté & sécurité
   ✨ Expert Linux & Rust pour performance critique
   ✨ Passionné par l'excellence et la robustesse
   ✨ Fiable (j'ai mené 2 transformations digitales majeures)

💼 CE QUE JE PEUX FAIRE POUR VOUS :
   → Direction SI & Conseil stratégique IT
   → Architecture Cloud souveraine & sécurisée
   → Migration ERP & transformation digitale
   → Audit infrastructure & sécurité
   → Formation équipes DevOps & Cloud Native
   → Résolution de problèmes complexes

👁️ MISSIONS & COLLABORATIONS :
   • Conseil stratégique DSI/CTO
   • Architecture Cloud & Infrastructure critique
   • Direction de projets IT majeurs
   • Audit technique & sécurité
   • Formation & mentoring équipes
   • Ou on en discute ! (ouvert aux projets innovants)

📩 ON ÉCHANGE ?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   raphael@nashi.cloud
   +262 693 39 58 98
   linkedin.com/in/raphaelauberlet
   
   Café virtuel offert ☕ • Réponse rapide garantie ⚡

P.S. : Si vous lisez ça, c'est que vous appréciez les profils
       originaux. On est déjà sur la même longueur d'onde 🤝`,
      easter: `
╔══════════════════════════════════════════════════════════╗
║           🎁 COMMANDES CACHÉES & EASTER EGGS             ║
║         (Parce que les meilleurs sont curieux!)          ║
╚══════════════════════════════════════════════════════════╝

🔓 HACKING & SÉCURITÉ
  hack/hacker     - Mode pirate activé (accès root garanti !)
  sudo [cmd]      - Essayez, pour voir... 😏

🎮 CULTURE GEEK
  konami          - ↑↑↓↓←→←→BA (les vrais savent)
  42              - La réponse à LA question
  cat secret.txt  - Pour les explorateurs de fichiers

🖥️  COMMANDES UNIX (FAKÉES)
  ls/dir          - Lister les "fichiers"
  whoami          - Qui êtes-vous vraiment ?
  ping            - Test de connexion réseau

💡 ASTUCE : Certaines commandes ont des variantes...
   Essayez en français ET en anglais !

🎯 CHALLENGE : Trouvez la commande qui n'est PAS listée ici 😉`,
      notFound: "Commande non reconnue. Tapez 'help' pour la liste des commandes."
    },
    en: {
      welcome: ">> Raphaël Auberlet • CIO / CTO | Cloud Strategy & Cybersecurity",
      bootComplete: "🚀 nashi.cloud • New project, new ambitions • Type 'help' to start",
      help: `Available commands:
  about       - Who am I?
  skills      - Tech stack & expertise
  xp          - Professional background
  projects    - Key achievements
  contact     - Contact me
  cv          - 📄 View/download my CV
  lang en/fr  - Change language
  matrix      - 🥚
  hire        - 💼 Message for recruiters
  easter      - 🎁 (for the curious)
  reboot     - reboot terminal
  clear       - Clear screen
  help        - Display this help`,
      about: `
╔═══════════════════════════════════════════════════════════╗
║  RAPHAEL AUBERLET                                         ║
║  CIO / CTO | Cloud Strategy & Cybersecurity               ║
╚═══════════════════════════════════════════════════════════╝

🚀 NEW PROJECT - JANUARY 2026
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Founder & Cloud Architect at nashi.cloud
   Sovereign and secure Cloud infrastructure 100% OpenSource

💡 MY EXPERTISE: Strategic Vision + Technical Excellence
   → 18 years of IT experience (from developer to CIO)
   → Specialist in IT Governance, Cloud Architecture & DevOps
   → Expert OpenSource stack: Linux (Kernel), Rust, KVM, Kubernetes
   → Focus: Digital sovereignty, Security, Performance

🎯 WHAT I BRING:
   → IT Management & Direction (Budgets, ERP, Strategic plans)
   → Cloud Native Architecture & Critical Infrastructure
   → DevOps & Security by Design
   → Digital transformation and process optimization

🌴 BASED IN REUNION ISLAND (974)
   📍 Remote-first • Travel France/Europe/International
   🌍 Full mobility depending on projects

🎨 MY JOURNEY: From craftsmanship to Cloud architecture
   → Passion for excellence and technical mastery
   → Self-taught with continuous technology watch
   → From code to strategic decisions`,
      skills: `
╔═══════════════════════════════════════════════════════════╗
║               💪 TECH STACK & EXPERTISE                   ║
╚═══════════════════════════════════════════════════════════╝

🎯 GOVERNANCE & MANAGEMENT
  ▸ IT Strategy & Master plans
  ▸ IT-Business Alignment & Budgets (OpEx/CapEx)
  ▸ Project Management & ERP Migration (Odoo)
  ▸ GDPR Compliance & Data governance

💻 TECHNICAL SYSTEM EXPERTISE
  ▸ Linux Expert: Kernel tuning, Hardening
  ▸ Virtualization: KVM, Podman, Kubernetes
  ▸ Rust: Performance-critical development
  ▸ Critical infrastructure & High availability

☁️ CLOUD & DEVOPS
  ▸ Cloud Native Architecture (100% OpenSource)
  ▸ DevOps: CI/CD, Terraform, Ansible, Docker
  ▸ Security: Security by Design, Audit, DRP/BCP
  ▸ Digital sovereignty & European stack

🐍 DEVELOPMENT & AUTOMATION
  ▸ Rust: Orchestration & Performance
  ▸ Python: Automation, AI & Scripting
  ▸ REST API & Microservices
  ▸ Odoo: Development & Customization

🗄️ INFRASTRUCTURE & DATA
  ▸ PostgreSQL • MySQL • MongoDB
  ▸ Redis • Vector Databases
  ▸ Monitoring: Prometheus, Grafana
  ▸ Distributed architecture

🎯 SOFT SKILLS
  ▸ IT Management & Team leadership
  ▸ System Architecture & Scalability
  ▸ Complex problem solving
  ▸ Continuous technology watch`,
      experience: `
╔═══════════════════════════════════════════════════════════╗
║              🚀 PROFESSIONAL BACKGROUND                   ║
╚═══════════════════════════════════════════════════════════╝

🔥 NEW PROJECT - JANUARY 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Jan 2026 - Present] nashi.cloud
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
└─ 🚀 Founder & Cloud Architect

   🎯 Mission: Sovereign and secure Cloud infrastructure
   
   ✅ Strategy & Design (100% OpenSource Stack)
   ✅ Rust Engineering: Optimized orchestration
   ✅ Security: Security by Design, trust chain
   ✅ R&D: Digital sovereignty & Cloud Native
   
   💡 Stack: Rust, Linux (Kernel), KVM, Kubernetes


[Aug 2023 - Nov 2025] SICALAIT / SDPMA - Reunion Island
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
└─ 💼 Chief Information Officer (CIO)

   🎯 Mission: IT Management & digital transformation
   
   ✅ IT Management: IT department & budget management
   ✅ ERP Project Management: Full migration to Odoo (PMO)
   ✅ Operations: Security & business continuity for group
   ✅ Architecture: Cloud, DevOps, CI/CD
   
   💡 Stack: Odoo, GCP, Docker, Kubernetes, Python


[May 2020 - Aug 2023] SDPMA - Reunion Island
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
└─ ⚙️ Lead Developer & Solution Architect

   🎯 Mission: Architecture & business solutions development
   
   ✅ Core Business Architecture: Point of Sale (POS) system
   ✅ Omnichannel: Real-time stock interconnection
   ✅ Logistics Optimization: Business mobile apps
   ✅ DevOps: Complete deployment automation
   
   💡 Stack: Python, WinDev Mobile, AWS, GitLab CI


[2007 - 2020] Self-employed - Freelancer (13 years)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
└─ 👔 IT Expert & Fullstack Consultant

   🎯 Mission: Technical expertise & custom solutions
   
   ✅ Linux Expertise: Critical server administration
   ✅ High availability web architecture
   ✅ Complex business solutions for international clients
   ✅ Complete management: commercial, technical, production
   
   💡 Stack: Linux, WINDEV, WebDev, SQL


📈 KEY FIGURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • 18 years of technical experience
  • 2 major digital transformations led
  • IT Management with budget & team management
  • ∞ problems solved with creativity and pragmatism`,
      projects: `
╔═══════════════════════════════════════════════════════════╗
║                   ⚡ KEY ACHIEVEMENTS                      ║
╚═══════════════════════════════════════════════════════════╝

🚀 nashi.cloud - SOVEREIGN CLOUD INFRASTRUCTURE (2026)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   → 100% OpenSource Cloud infrastructure creation
   → Rust Engineering: optimized orchestration
   → Security by Design & controlled trust chain
   → Focus: Digital sovereignty & performance
   
   📊 Impact: European solution, secure, performant
   🛠️ Stack: Rust, Linux (Kernel), KVM, Kubernetes


🏭 ERP MIGRATION & IT TRANSFORMATION SICALAIT (2023-2025)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   → ERP Project Management: full migration to Odoo (PMO)
   → Business process redesign & IT governance
   → Cloud migration (GCP) & DevOps automation
   → Budget management & IT investment arbitration
   
   📊 Impact: Successful digital transformation, unified IT
   🛠️ Stack: Odoo, GCP, Docker, Kubernetes, Python


💰 POS ARCHITECTURE & OMNICHANNEL (2020-2023)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   → Centralized Point of Sale (POS) system design
   → Real-time stock/e-commerce interconnection
   → Business mobile apps for logistics
   → Legal compliance & certifications
   
   📊 Impact: 100% compliance, 0 data loss
   🛠️ Stack: Python, WinDev Mobile, PostgreSQL, REST API


☁️ CRITICAL & HIGH AVAILABILITY INFRASTRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   → Multi-cloud high availability architecture
   → Real-time monitoring & alerting
   → Disaster recovery & automated backups
   → System hardening & security audit
   
   📊 Impact: 99.9% uptime, enhanced security
   🛠️ Stack: Linux, KVM, Prometheus, Grafana, Terraform


💡 + MANY custom projects
   → 18 years of expertise designing robust solutions
   → Full portfolio & references available on request
   → Code samples: github.com/ralphi2811`,
      contact: `
╔═══════════════════════════════════════════════════════════╗
║                   📬 CONTACT & LINKS                      ║
╚═══════════════════════════════════════════════════════════╝

📧 Email → raphael@nashi.cloud (24h response guaranteed)
💼 GitHub → github.com/ralphi2811
🔗 LinkedIn → linkedin.com/in/raphaelauberlet
📄 CV → https://ralphi2811.github.io/cv/
   Download PDF: https://ralphi2811.github.io/cv/cv.pdf
🌐 nashi.cloud → https://nashi.cloud
☎️ Phone → +262 693 39 58 98
📍 Location → Le Tampon, Reunion Island (974)
💻 Remote-first • Travel France/Europe/International

💡 AVAILABILITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🚀 Active on nashi.cloud - Open to collaborations
   ✅ Strategic IT consulting & advisory
   ✅ Cloud Architecture & Infrastructure
   ✅ Freelance missions / specific projects
   ✅ Remote or travel depending on projects

> Type 'hire' for a special recruiter message 😉`,
      cv: `
╔═══════════════════════════════════════════════════════════╗
║                    📄 CURRICULUM VITAE                    ║
╚═══════════════════════════════════════════════════════════╝

🌐 Online CV (interactive)
   → https://ralphi2811.github.io/cv/
   → Web version with FR/EN language selection
   → Modern and interactive navigation

📥 Download PDF
   → https://ralphi2811.github.io/cv/cv.pdf
   → Standard format for printing
   → Direct download

💡 The complete CV contains:
   ✓ Detailed professional background
   ✓ Complete tech stack
   ✓ Education and certifications
   ✓ Flagship projects and achievements
   ✓ Languages and interests

> Open the link in your browser to view or download`,
      hire: `
██╗  ██╗██╗██████╗ ███████╗    ███╗   ███╗███████╗    ██╗
██║  ██║██║██╔══██╗██╔════╝    ████╗ ████║██╔════╝    ██║
███████║██║██████╔╝█████╗      ██╔████╔██║█████╗      ██║
██╔══██║██║██╔══██╗██╔══╝      ██║╚██╔╝██║██╔══╝      ╚═╝
██║  ██║██║██║  ██║███████╗    ██║ ╚═╝ ██║███████╗    ██╗
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚══════╝    ╚═╝

╔═══════════════════════════════════════════════════════════╗
║  🚀 nashi.cloud FOUNDER - OPEN TO COLLABORATIONS 🚀       ║
╚═══════════════════════════════════════════════════════════╝

⚡ NEW PROJECT - JANUARY 2026
   nashi.cloud creation: Sovereign Cloud infrastructure
   Open to consulting & architecture missions

🎯 YOU'RE LOOKING FOR SOMEONE WHO...
   ✅ REALLY understands business (not just tech)
   ✅ Combines CIO strategic vision AND technical expertise
   ✅ Has led complete IT transformations (ERP, Cloud)
   ✅ Masters Linux Kernel, Rust, Cloud Native Architecture
   ✅ Can talk to CEOs as well as technical teams
   ✅ Has 18 years XP from code to strategic decisions

💪 I'M NOT...
   ❌ A consultant who hasn't coded in 10 years
   ❌ A dev who doesn't understand business issues
   ❌ Someone afraid of critical infrastructure

🚀 I AM...
   ✨ CIO/CTO who loves keeping hands in tech
   ✨ Cloud Architect focusing on sovereignty & security
   ✨ Linux & Rust expert for critical performance
   ✨ Passionate about excellence and robustness
   ✨ Reliable (led 2 major digital transformations)

💼 WHAT I CAN DO FOR YOU:
   → IT Management & Strategic IT consulting
   → Sovereign & secure Cloud architecture
   → ERP migration & digital transformation
   → Infrastructure & security audit
   → DevOps & Cloud Native team training
   → Complex problem solving

👁️ MISSIONS & COLLABORATIONS:
   • Strategic CIO/CTO consulting
   • Cloud Architecture & Critical infrastructure
   • Major IT project management
   • Technical & security audit
   • Team training & mentoring
   • Or let's discuss! (open to innovative projects)

📩 LET'S EXCHANGE?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   raphael@nashi.cloud
   +262 693 39 58 98
   linkedin.com/in/raphaelauberlet
   
   Virtual coffee offered ☕ • Fast response guaranteed ⚡

P.S.: If you're reading this, you appreciate original profiles.
      We're already on the same wavelength 🤝`,
      easter: `
╔══════════════════════════════════════════════════════════╗
║           🎁 HIDDEN COMMANDS & EASTER EGGS               ║
║         (Because the best devs are curious)              ║
╚══════════════════════════════════════════════════════════╝

🔓 HACKING & SECURITY
  hack/hacker     - Pirate mode ON (root access guaranteed!)
  sudo [cmd]      - Try it, you'll see... 😏

🎮 GEEK CULTURE
  konami          - ↑↑↓↓←→←→BA (real gamers know)
  42              - The answer to THE question
  cat secret.txt  - For file explorers

🖥️  UNIX COMMANDS (FAKED)
  ls/dir          - List "files"
  whoami          - Who are you really?
  ping            - Network connection test

💡 TIP: Some commands have variants...
   Try in French AND English!

🎯 CHALLENGE: Find the command that's NOT listed here 😉`,
      notFound: "Command not recognized. Type 'help' for command list."
    }
  };

  const t = translations[lang];

  const bootSequence = [
    "INSERT COIN TO START...",
    "SELECT CHARACTER: [RAPHAËL AUBERLET]",
    "CLASS: DSI / ARCHITECT / DEVOPS WIZARD",
    "",
    "STATS:",
    "├─ STRENGTH (Back-end): [██████████] 99",
    "├─ AGILITY (DevOps):    [██████████] 99",
    "└─ INTELLECT (Lead):    [██████████] 95",
    "",
    "INVENTORY:",
    "▸ Legendary Helm of 'Root Access'",
    "▸ Enchanted Keyboard of '+5 Productivity'",
    "▸ Infinite Coffee Potion",
    "",
    "WORLD STATUS: 'Deployment in progress...'",
    { type: 'loading' }
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

  // Fonction pour envoyer des événements à Umami
  const trackCommand = (command, category = 'terminal_command') => {
    if (window.umami) {
      window.umami.track(`terminal: ${command}`, {
        command: command,
        category: category,
        language: lang
      });
    }
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    setOutput(prev => [...prev, { type: 'input', text: `> ${cmd}` }]);

    if (trimmedCmd === '') return;
    
    // Tracker la commande
    trackCommand(trimmedCmd);

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
      trackCommand('clear', 'system');
      return;
    }

    if (trimmedCmd === 'help') {
      typeText(t.help);
      return;
    }

    if (trimmedCmd === 'easter' || trimmedCmd === 'eggs') {
      typeText(t.easter);
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

    if (trimmedCmd === 'cv') {
      typeText(t.cv);
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

    // Easter egg: hacker mode
    if (trimmedCmd === 'hack' || trimmedCmd === 'hacker') {
      trackCommand(trimmedCmd, 'easter_egg');
      const hackerText = lang === 'fr' 
        ? `🔓 INITIALISATION DU MODE HACKER...
    
[████████████████████████] 100%

✅ Accès root obtenu
✅ Firewall contourné
✅ Cryptage désactivé
✅ Base de données accessible

⚠️  AVERTISSEMENT : Vous êtes maintenant en mode GOD 
💀 Avec un grand pouvoir vient une grande responsabilité...

PS : Tapez 'hire' pour utiliser ce pouvoir pour le bien 😎`
        : `🔓 INITIALIZING HACKER MODE...
    
[████████████████████████] 100%

✅ Root access granted
✅ Firewall bypassed
✅ Encryption disabled
✅ Database accessible

⚠️  WARNING: You are now in GOD mode
💀 With great power comes great responsibility...

PS: Type 'hire' to use this power for good 😎`;
      typeText(hackerText);
      return;
    }

    // Easter egg: konami code easter egg
    if (trimmedCmd === 'konami' || trimmedCmd === '↑↑↓↓←→←→ba') {
      trackCommand('konami', 'easter_egg');
      const konamiText = lang === 'fr'
        ? `🎮 CODE KONAMI ACTIVÉ !
    
╔═══════════════════════════════╗
║  🌟 +30 VIES SUPPLÉMENTAIRES  ║
║  ⚡ MODE INVINCIBLE ON        ║
║  🚀 VITESSE x2                ║
║  💎 TOUS LES POWER-UPS        ║
╚═══════════════════════════════╝

🎯 Achievement Unlocked: "Old School Gamer"
👾 Tu connais les classiques ! Respect !`
        : `🎮 KONAMI CODE ACTIVATED!
    
╔═══════════════════════════════╗
║  🌟 +30 EXTRA LIVES           ║
║  ⚡ INVINCIBLE MODE ON        ║
║  🚀 SPEED x2                  ║
║  💎 ALL POWER-UPS             ║
╚═══════════════════════════════╝

🎯 Achievement Unlocked: "Old School Gamer"
👾 You know the classics! Respect!`;
      typeText(konamiText);
      return;
    }

    // Easter egg: sudo
    if (trimmedCmd === 'sudo' || trimmedCmd.startsWith('sudo ')) {
      const sudoText = lang === 'fr'
        ? `🔐 [sudo] mot de passe pour visitor : 
⏳ Authentification en cours...
❌ Désolé, essayez encore.
❌ sudo: 3 tentatives d'authentification incorrectes
🚫 Cet incident sera signalé.

😏 Astuce : Essayez "hack" à la place...`
        : `🔐 [sudo] password for visitor: 
⏳ Authenticating...
❌ Sorry, try again.
❌ sudo: 3 incorrect authentication attempts
🚫 This incident will be reported.

😏 Hint: Try "hack" instead...`;
      typeText(sudoText);
      return;
    }

    // Easter egg: 42
    if (trimmedCmd === '42') {
      const text42 = lang === 'fr'
        ? `🌌 42 : La réponse à la grande question sur la vie, l'univers et le reste.

"Après des millions d'années de calcul, l'ordinateur Deep Thought 
a enfin trouvé la réponse : 42"

💭 Mais quelle était la question ?

🤔 Douglas Adams approuve ce message.`
        : `🌌 42: The Answer to the Ultimate Question of Life, the Universe, and Everything.

"After millions of years of computation, the supercomputer Deep Thought 
finally found the answer: 42"

💭 But what was the question?

🤔 Douglas Adams approves this message.`;
      typeText(text42);
      return;
    }

    // Easter egg: ls
    if (trimmedCmd === 'ls' || trimmedCmd === 'dir') {
      const lsText = `
drwxr-xr-x  2 visitor visitor 4096 Oct  8 2025 ./
drwxr-xr-x  3 root    root    4096 Oct  8 2025 ../
-rw-r--r--  1 visitor visitor  220 Oct  8 2025 .bash_logout
-rw-r--r--  1 visitor visitor 3526 Oct  8 2025 .bashrc
-rw-r--r--  1 visitor visitor  807 Oct  8 2025 .profile
-rwxr-xr-x  1 visitor visitor 8192 Oct  8 2025 skills.exe
-rwxr-xr-x  1 visitor visitor 4096 Oct  8 2025 experience.dat
-rwxr-xr-x  1 visitor visitor 2048 Oct  8 2025 hire_me.sh
-rw-r--r--  1 visitor visitor  666 Oct  8 2025 cv.pdf
-rw-r--r--  1 visitor visitor   42 Oct  8 2025 secret.txt

${lang === 'fr' ? '💡 Astuce : Les commandes Linux standards ne marchent pas ici... Tapez "help" !' : '💡 Hint: Standard Linux commands don\'t work here... Type "help"!'}`;
      typeText(lsText);
      return;
    }

    // Easter egg: whoami
    if (trimmedCmd === 'whoami') {
      const whoamiText = lang === 'fr'
        ? `visitor

🤔 Mais la vraie question est : qui est Raphaël ?
💡 Tapez "about" pour le découvrir !`
        : `visitor

🤔 But the real question is: who is Raphaël?
💡 Type "about" to find out!`;
      typeText(whoamiText);
      return;
    }

    // Easter egg: cat secret.txt
    if (trimmedCmd === 'cat secret.txt' || trimmedCmd === 'cat secret') {
      const secretText = lang === 'fr'
        ? `📄 secret.txt:

🎯 Bravo ! Vous avez trouvé le fichier caché !

🔍 La curiosité est une qualité que j'apprécie beaucoup.
💎 Elle fait partie des valeurs qui me définissent.
✨ Et visiblement, on partage cette approche !

➡️  Tapez "hire" pour découvrir comment je peux contribuer à vos projets`
        : `📄 secret.txt:

🎯 Well done! You found the hidden file!

🔍 Curiosity is a quality I deeply appreciate.
💎 It's one of the values that define me.
✨ And apparently, we share this approach!

➡️  Type "hire" to discover how I can contribute to your projects`;
      typeText(secretText);
      return;
    }

    // Easter egg: ping
    if (trimmedCmd === 'ping' || trimmedCmd.startsWith('ping ')) {
      const pingText = `
PING raphaeldev.fr (185.199.108.153) 56(84) bytes of data.
64 bytes from raphaeldev.fr: icmp_seq=1 ttl=64 time=0.042 ms
64 bytes from raphaeldev.fr: icmp_seq=2 ttl=64 time=0.037 ms
64 bytes from raphaeldev.fr: icmp_seq=3 ttl=64 time=0.039 ms
64 bytes from raphaeldev.fr: icmp_seq=4 ttl=64 time=0.041 ms

--- raphaeldev.fr ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3ms
rtt min/avg/max/mdev = 0.037/0.039/0.042/0.002 ms

✅ ${lang === 'fr' ? 'Serveur opérationnel !' : 'Server operational!'}`;
      typeText(pingText);
      return;
    }

    // Easter egg SECRET (non documenté - le challenge !)
    if (trimmedCmd === 'godmode' || trimmedCmd === 'god mode') {
      trackCommand('godmode', 'easter_egg_secret');
      const godmodeText = lang === 'fr'
        ? `
🏆 ACHIEVEMENT UNLOCKED: "The Curious One"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 FÉLICITATIONS ! Vous avez trouvé la commande secrète !

╔═══════════════════════════════════════════════════════╗
║                  ⚡ GOD MODE ACTIVÉ ⚡                  ║
╚═══════════════════════════════════════════════════════╝

🌟 BONUS DÉBLOQUÉS :
   ✓ Vision parfaite du code (+100% de clarté)
   ✓ Bugs évaporés automatiquement
   ✓ Café illimité ☕☕☕
   ✓ Tickets Jira qui se ferment tous seuls
   ✓ Meetings raccourcis de 90%
   ✓ Production toujours stable (99.999% uptime)

💎 STATUT : Vous êtes officiellement passé niveau EXPERT !

🎯 CE QUI NOUS RAPPROCHE :
   → La curiosité et la persévérance ✓
   → L'amour des défis techniques ✓
   → Un bon sens de l'humour ✓
   → L'attention aux détails ✓

💼 Si ce profil vous intéresse : tapez 'hire' !
   J'aimerais beaucoup échanger avec vous 🤝

🤫 PS : Il existe UN easter egg encore plus secret...
   Indices : 🐱 + 🌀 + 4 lettres...`
        : `
🏆 ACHIEVEMENT UNLOCKED: "The Curious One"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 CONGRATULATIONS! You found the secret command!

╔═══════════════════════════════════════════════════════╗
║                  ⚡ GOD MODE ACTIVATED ⚡               ║
╚═══════════════════════════════════════════════════════╝

🌟 UNLOCKED BONUSES:
   ✓ Perfect code vision (+100% clarity)
   ✓ Bugs automatically evaporated
   ✓ Unlimited coffee ☕☕☕
   ✓ Jira tickets that close themselves
   ✓ Meetings shortened by 90%
   ✓ Always stable production (99.999% uptime)

💎 STATUS: You've officially reached EXPERT level!

🎯 WHAT BRINGS US TOGETHER:
   → Curiosity and persistence ✓
   → Love for technical challenges ✓
   → A good sense of humor ✓
   → Attention to detail ✓

💼 If this profile interests you: type 'hire'!
   I'd love to chat with you 🤝

🤫 PS: There is ONE even more secret easter egg...
   Hints: 🐱 + 🌀 + 4 letters...`;
      typeText(godmodeText);
      return;
    }

    // Easter egg ULTIME : OIIA (Spinning Cat)
    // Multiples façons de le déclencher
    if (trimmedCmd === 'oiia' || 
        trimmedCmd === 'spinning cat' || 
        trimmedCmd === 'spin' ||
        trimmedCmd === '🐱🌀' ||
        trimmedCmd === 'cat spin' ||
        trimmedCmd === 'spincat') {
      trackCommand('oiia_warning', 'easter_egg_ultimate');
      
      const warningSequence = lang === 'fr' ? [
        '⚠️  ALERTE SYSTÈME ⚠️',
        '',
        '🚨 Activation imminente du PROTOCOLE OIIA',
        '',
        '❓ Pourquoi diable voudriez-vous lancer cette commande ?',
        '   → La curiosité l\'emporte sur votre bon sens ?',
        '   → Les chats qui tournent vous fascinent à ce point ?',
        '   → Vous avez fini de consulter le CV au moins ?',
        '',
        '⏰ Vous pouvez encore faire demi-tour...',
        '💭 Prenez le temps d\'y réfléchir...',
        '',
        '🔄 Pour continuer quand même : "oiia confirm"',
        '❌ Pour annuler (choix sage) : n\'importe quoi d\'autre',
      ] : [
        '⚠️  SYSTEM WARNING ⚠️',
        '',
        '🚨 You are about to activate PROTOCOL OIIA',
        '',
        '❓ WHY would you want to do that?',
        '   → Are you curious enough to risk your mental health?',
        '   → Do you like spinning cats?',
        '   → Have you really finished reading the resume?',
        '',
        '⏰ There\'s still time to back out...',
        '💭 Think carefully...',
        '',
        '🔄 To confirm, type "oiia confirm"',
        '❌ To cancel, type anything else',
      ];

      warningSequence.forEach(line => {
        setOutput(prev => [...prev, { type: 'system', text: line }]);
      });
      return;
    }

    // Confirmation OIIA - Niveau 2
    if (trimmedCmd === 'oiia confirm') {
      trackCommand('oiia_confirm', 'easter_egg_ultimate');
      const secondWarning = lang === 'fr' ? [
        '',
        '🤔 Sérieusement ?',
        '',
        '⚠️  SECOND AVERTISSEMENT ⚠️',
        '',
        '📋 Voici ce qui va vous arriver :',
        '   1. L\'écran passera en plein écran',
        '   2. Un chat tournera sans fin',
        '   3. De la musique envahira vos oreilles',
        '   4. Impossible de revenir en arrière',
        '   5. Votre productivité chutera de 100%',
        '   6. Vos collègues vous jugeront',
        '',
        '😱 Vous êtes VRAIMENT sûr de vouloir ça ?',
        '',
        '✅ Pour lancer (assumez) : "oiia launch"',
        '🏃 Pour esquiver (prudent) : autre chose',
      ] : [
        '',
        '🤔 Really?',
        '',
        '⚠️  SECOND WARNING ⚠️',
        '',
        '📋 What will happen:',
        '   1. Your screen will go fullscreen',
        '   2. A cat will spin',
        '   3. Music will play',
        '   4. You can\'t go back',
        '   5. Your productivity will drop by 100%',
        '',
        '😱 Are you ABSOLUTELY SURE?',
        '',
        '✅ To launch: type "oiia launch"',
        '🏃 To run away like a coward: type something else',
      ];

      secondWarning.forEach(line => {
        setOutput(prev => [...prev, { type: 'system', text: line }]);
      });
      return;
    }

    // Lancement FINAL
    if (trimmedCmd === 'oiia launch' || trimmedCmd === 'oiia yes' || trimmedCmd === 'oiia go') {
      trackCommand('oiia_launch', 'easter_egg_ultimate');
      const finalCountdown = lang === 'fr' ? [
        '',
        '🎯 Bon... Vous l\'aurez voulu.',
        '',
        '⏱️  LANCEMENT IMMINENT...',
        '   ▸ 3...',
        '   ▸ 2...',
        '   ▸ 1...',
        '',
        '🌀 ✨ OIIA ACTIVÉ ✨ 🐱',
        '',
        '🚀 Que la force du chat tournoyant soit avec vous !',
        ''
      ] : [
        '',
        '🎯 Alright. You asked for it.',
        '',
        '⏱️  LAUNCHING IN...',
        '   3...',
        '   2...',
        '   1...',
        '',
        '🌀 OIIA ACTIVATED 🐱',
        '',
        '🚀 May the spinning cat force be with you!',
        ''
      ];

      finalCountdown.forEach(line => {
        setOutput(prev => [...prev, { type: 'system', text: line }]);
      });

      // Lancer la vidéo en fullscreen après 2 secondes
      setTimeout(() => {
        // Créer un iframe fullscreen
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/IxX_QHay02M?si=XF7tlgXKAE0LlGcE&autoplay=1&mute=0&controls=0&loop=1&playlist=IxX_QHay02M';
        iframe.style.position = 'fixed';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100vw';
        iframe.style.height = '100vh';
        iframe.style.border = 'none';
        iframe.style.zIndex = '9999';
        iframe.allow = 'autoplay; fullscreen';
        iframe.allowFullscreen = true;
        
        document.body.appendChild(iframe);

        // Tenter le fullscreen
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
          iframe.webkitRequestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
          iframe.mozRequestFullScreen();
        } else if (iframe.msRequestFullscreen) {
          iframe.msRequestFullscreen();
        }

        // Bouton pour fermer (ESC ou clic)
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '❌ FERMER (ESC)';
        closeButton.style.position = 'fixed';
        closeButton.style.top = '20px';
        closeButton.style.right = '20px';
        closeButton.style.zIndex = '10000';
        closeButton.style.padding = '10px 20px';
        closeButton.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        closeButton.style.color = '#00ff00';
        closeButton.style.border = '2px solid #00ff00';
        closeButton.style.borderRadius = '5px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.fontFamily = 'monospace';
        closeButton.style.fontSize = '14px';
        
        closeButton.onclick = () => {
          document.body.removeChild(iframe);
          document.body.removeChild(closeButton);
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
          // Reboot du terminal
          setOutput([]);
          setHistory([]);
          setHistoryIndex(-1);
          setIsBooting(true);
        };

        document.body.appendChild(closeButton);

        // Fermer avec ESC
        const handleEsc = (e) => {
          if (e.key === 'Escape') {
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe);
              document.body.removeChild(closeButton);
            }
            document.removeEventListener('keydown', handleEsc);
            // Reboot du terminal
            setOutput([]);
            setHistory([]);
            setHistoryIndex(-1);
            setIsBooting(true);
          }
        };
        document.addEventListener('keydown', handleEsc);
      }, 2000);

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

      {/* 🎄 Effets saisonniers (mémorisés) */}
      {Snowfall}

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
          <h1 className="text-xl font-bold">
            {activeEvent?.headerEmoji && <span className="mr-2">{activeEvent.headerEmoji}</span>}
            RAPHAELDEV.FR
            {activeEvent?.headerEmoji && <span className="ml-2">{activeEvent.headerEmoji}</span>}
          </h1>
          <button
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            className="ml-auto px-3 py-1 border border-green-600 hover:bg-green-900/30 transition-colors rounded"
          >
            <Globe className="w-4 h-4 inline mr-1" />
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
        </div>
        <div className="text-xs opacity-70">
          {activeEvent?.message ? (
            <span className="text-yellow-300">{activeEvent.message[lang]} • </span>
          ) : null}
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

        /* ❄️ Animation neige */
        .snowflake {
          position: absolute;
          top: -20px;
          color: #fff;
          animation: snowfall linear infinite;
          text-shadow: 0 0 5px #fff, 0 0 10px #b0e0e6;
        }
        
        @keyframes snowfall {
          0% {
            top: -5%;
            transform: translateX(0) rotate(0deg);
          }
          100% {
            top: 105%;
            transform: translateX(100px) rotate(360deg);
          }
        }

        /* 🎃 Animation chauves-souris (pour Halloween) */
        .bat {
          position: absolute;
          top: -20px;
          animation: bat-fly linear infinite;
        }
        
        @keyframes bat-fly {
          0% {
            top: -5%;
            transform: translateX(0) scaleX(1);
          }
          25% {
            transform: translateX(50px) scaleX(-1);
          }
          50% {
            transform: translateX(0) scaleX(1);
          }
          75% {
            transform: translateX(-50px) scaleX(-1);
          }
          100% {
            top: 105%;
            transform: translateX(0) scaleX(1);
          }
        }

        /* 💕 Animation coeurs (pour Saint-Valentin) */
        .heart {
          position: absolute;
          bottom: -20px;
          animation: heart-rise linear infinite;
        }
        
        @keyframes heart-rise {
          0% {
            bottom: -5%;
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            bottom: 105%;
            transform: translateX(50px) scale(0.5);
            opacity: 0;
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
