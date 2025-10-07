import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Code, Briefcase, Mail, Globe, Zap } from 'lucide-react';

const TerminalPortfolio = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lang, setLang] = useState('fr');
  const [isBooting, setIsBooting] = useState(true);
  const [showMatrix, setShowMatrix] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingLineIndex, setTypingLineIndex] = useState(-1);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const typingIntervalRef = useRef(null);

  // Composant pour le logo avec couleurs
  const AsciiLogo = () => (
    <div className="my-2 w-full">
      <div className="leading-tight whitespace-pre font-mono text-sm">
        <div><span className="text-cyan-400">╔══════════════════════════════════════════════════════════════╗</span></div>
        <div><span className="text-cyan-400">║</span>                                                              <span className="text-cyan-400">║</span></div>
        <div><span className="text-cyan-400">║</span>     <span className="text-green-400">██████╗ </span> <span className="text-green-300">█████╗ </span><span className="text-cyan-400">██████╗ </span><span className="text-cyan-300">██╗  ██╗</span> <span className="text-blue-400">█████╗ </span><span className="text-blue-300">███████╗</span><span className="text-purple-400">██╗     </span> <span className="text-cyan-400">║</span></div>
        <div><span className="text-cyan-400">║</span>     <span className="text-green-400">██╔══██╗</span><span className="text-green-300">██╔══██╗</span><span className="text-cyan-400">██╔══██╗</span><span className="text-cyan-300">██║  ██║</span><span className="text-blue-400">██╔══██╗</span><span className="text-blue-300">██╔════╝</span><span className="text-purple-400">██║     </span> <span className="text-cyan-400">║</span></div>
        <div><span className="text-cyan-400">║</span>     <span className="text-green-400">██████╔╝</span><span className="text-green-300">███████║</span><span className="text-cyan-400">██████╔╝</span><span className="text-cyan-300">███████║</span><span className="text-blue-400">███████║</span><span className="text-blue-300">█████╗  </span><span className="text-purple-400">██║     </span> <span className="text-cyan-400">║</span></div>
        <div><span className="text-cyan-400">║</span>     <span className="text-green-400">██╔══██╗</span><span className="text-green-300">██╔══██║</span><span className="text-cyan-400">██╔═══╝ </span><span className="text-cyan-300">██╔══██║</span><span className="text-blue-400">██╔══██║</span><span className="text-blue-300">██╔══╝  </span><span className="text-purple-400">██║     </span> <span className="text-cyan-400">║</span></div>
        <div><span className="text-cyan-400">║</span>     <span className="text-green-400">██║  ██║</span><span className="text-green-300">██║  ██║</span><span className="text-cyan-400">██║     </span><span className="text-cyan-300">██║  ██║</span><span className="text-blue-400">██║  ██║</span><span className="text-blue-300">███████╗</span><span className="text-purple-400">███████╗ </span><span className="text-cyan-400">║</span></div>
        <div><span className="text-cyan-400">║</span>     <span className="text-gray-500">╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝ </span><span className="text-cyan-400">║</span></div>
        <div><span className="text-cyan-400">║</span>                                                              <span className="text-cyan-400">║</span></div>
        <div><span className="text-cyan-400">║</span>                    <span className="text-yellow-400 font-bold">AUBERLET Terminal OS</span>                      <span className="text-cyan-400">║</span></div>
        <div><span className="text-cyan-400">║</span>                                                              <span className="text-cyan-400">║</span></div>
        <div><span className="text-cyan-400">╚══════════════════════════════════════════════════════════════╝</span></div>
      </div>
    </div>
  );

  const asciiLogo = 'ASCII_LOGO_COMPONENT';

  const translations = {
    fr: {
      welcome: "Bienvenue sur le terminal de Raphael Auberlet",
      bootComplete: "Système chargé. Tapez 'help' pour commencer.",
      help: `Commandes disponibles:
  about       - À propos de moi
  skills      - Compétences techniques
  experience  - Parcours professionnel
  projects    - Projets & réalisations
  contact     - Me contacter
  lang en/fr  - Changer de langue
  matrix      - Animation Matrix
  hire        - Message spécial recruteurs
  restart     - Redémarrer le terminal
  clear       - Effacer le terminal
  help        - Afficher cette aide`,
      about: `╔═══════════════════════════════════════════════╗
║  RAPHAEL AUBERLET - Développeur Full Stack    ║
║  Responsable Systèmes d'Information           ║
╚═══════════════════════════════════════════════╝

🌴 Basé à La Réunion (974)
💼 15+ ans d'expérience en développement
🚀 Passionné de DevOps, Python, et nouvelles technos

De l'ébénisterie au code - un parcours atypique !
J'ai transformé ma passion pour la création en expertise
technique. Aujourd'hui, je conçois des systèmes robustes
et élégants, comme je fabriquais des meubles sur mesure.`,
      skills: `╔══════════════════════════════════════╗
║        STACK TECHNIQUE               ║
╚══════════════════════════════════════╝

Backend:
  ▸ Python / Django / Symfony
  ▸ PHP / Node.js
  ▸ API REST / SOAP

DevOps:
  ▸ Docker / Kubernetes
  ▸ CI/CD (GitLab, GitHub Actions)
  ▸ Linux Administration

Frontend:
  ▸ JavaScript / React
  ▸ HTML5 / CSS3 / Tailwind
  ▸ WebDev / WinDev Mobile

Databases:
  ▸ PostgreSQL / MySQL
  ▸ MongoDB / Redis`,
      experience: `╔══════════════════════════════════════════════╗
║         PARCOURS PROFESSIONNEL               ║
╚══════════════════════════════════════════════╝

[2023 - Présent] SICALAIT
└─ Responsable Systèmes d'Information
   Gestion infrastructure IT, projets DevOps

[2020 - 2023] SDPMA - Fermes & Jardins
└─ Ingénieur DevOps
   Automatisation, CI/CD, conteneurisation

[2007 - 2020] 6Kreation (12 ans)
└─ Directeur & Développeur
   Création société, dev WINDEV/WebDev
   Conception meubles sur mesure`,
      projects: `╔══════════════════════════════════════════════╗
║          PROJETS & RÉALISATIONS              ║
╚══════════════════════════════════════════════╝

🔧 Infrastructure SICALAIT
   Migration cloud, automatisation DevOps
   Stack: Docker, K8s, GitLab CI

🌐 Applications métier agricoles
   ERP personnalisés, gestion coopérative
   Stack: Python, PHP, PostgreSQL

📱 Applications mobiles
   Solutions terrain pour techniciens
   Stack: WinDev Mobile, API REST

💼 Projets disponible sur demande
   Portfolio complet & références clients`,
      contact: `╔══════════════════════════════════════════════╗
║            CONTACT                           ║
╚══════════════════════════════════════════════╝

📧 Email:    ralphi2811@gmail.com
📱 Tél:      +262 693 39 58 98
🔗 LinkedIn: linkedin.com/in/raphaelauberlet
📍 Location: Le Tampon, La Réunion (974)

💡 Disponible pour projets freelance
   et missions longue durée

> Tapez 'hire' pour un message spécial ;)`,
      hire: `
██╗  ██╗██╗██████╗ ███████╗    ███╗   ███╗███████╗
██║  ██║██║██╔══██╗██╔════╝    ████╗ ████║██╔════╝
███████║██║██████╔╝█████╗      ██╔████╔██║█████╗  
██╔══██║██║██╔══██╗██╔══╝      ██║╚██╔╝██║██╔══╝  
██║  ██║██║██║  ██║███████╗    ██║ ╚═╝ ██║███████╗
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚══════╝

Vous cherchez un dev qui comprend VRAIMENT le métier ?

✨ Je ne fais pas que coder, je résous des problèmes
🚀 15 ans d'expérience du dev au management IT
🎯 Autonome, créatif, et toujours à jour
🌍 Remote-friendly, disponible immédiatement

📩 ralphi2811@gmail.com
Let's build something amazing together!`,
      notFound: "Commande non reconnue. Tapez 'help' pour la liste des commandes."
    },
    en: {
      welcome: "Welcome to Raphael Auberlet's terminal",
      bootComplete: "System loaded. Type 'help' to start.",
      help: `Available commands:
  about       - About me
  skills      - Technical skills
  experience  - Professional background
  projects    - Projects & achievements
  contact     - Contact me
  lang en/fr  - Change language
  matrix      - Matrix animation
  hire        - Special message for recruiters
  restart     - Restart terminal
  clear       - Clear terminal
  help        - Display this help`,
      about: `╔═══════════════════════════════════════════════╗
║  RAPHAEL AUBERLET - Full Stack Developer    ║
║  IT Systems Manager                         ║
╚═══════════════════════════════════════════════╝

🌴 Based in La Réunion Island (974)
💼 15+ years of development experience
🚀 Passionate about DevOps, Python, and new tech

From woodworking to code - an atypical journey!
I transformed my passion for creation into technical
expertise. Today, I design robust and elegant systems,
just like I used to craft custom furniture.`,
      skills: `╔══════════════════════════════════════╗
║        TECH STACK                    ║
╚══════════════════════════════════════╝

Backend:
  ▸ Python / Django / Symfony
  ▸ PHP / Node.js
  ▸ REST / SOAP APIs

DevOps:
  ▸ Docker / Kubernetes
  ▸ CI/CD (GitLab, GitHub Actions)
  ▸ Linux Administration

Frontend:
  ▸ JavaScript / React
  ▸ HTML5 / CSS3 / Tailwind
  ▸ WebDev / WinDev Mobile

Databases:
  ▸ PostgreSQL / MySQL
  ▸ MongoDB / Redis`,
      experience: `╔══════════════════════════════════════════════╗
║         PROFESSIONAL BACKGROUND              ║
╚══════════════════════════════════════════════╝

[2023 - Present] SICALAIT
└─ IT Systems Manager
   IT infrastructure, DevOps projects

[2020 - 2023] SDPMA - Fermes & Jardins
└─ DevOps Engineer
   Automation, CI/CD, containerization

[2007 - 2020] 6Kreation (12 years)
└─ Director & Developer
   Company creation, WINDEV/WebDev dev
   Custom furniture design`,
      projects: `╔══════════════════════════════════════════════╗
║          PROJECTS & ACHIEVEMENTS             ║
╚══════════════════════════════════════════════╝

🔧 SICALAIT Infrastructure
   Cloud migration, DevOps automation
   Stack: Docker, K8s, GitLab CI

🌐 Agricultural business applications
   Custom ERP, cooperative management
   Stack: Python, PHP, PostgreSQL

📱 Mobile applications
   Field solutions for technicians
   Stack: WinDev Mobile, REST API

💼 Full portfolio available on request
   Complete portfolio & client references`,
      contact: `╔══════════════════════════════════════════════╗
║            CONTACT                           ║
╚══════════════════════════════════════════════╝

📧 Email:    ralphi2811@gmail.com
📱 Phone:    +262 693 39 58 98
🔗 LinkedIn: linkedin.com/in/raphaelauberlet
📍 Location: Le Tampon, Reunion Island (974)

💡 Available for freelance projects
   and long-term missions

> Type 'hire' for a special message ;)`,
      hire: `
██╗  ██╗██╗██████╗ ███████╗    ███╗   ███╗███████╗
██║  ██║██║██╔══██╗██╔════╝    ████╗ ████║██╔════╝
███████║██║██████╔╝█████╗      ██╔████╔██║█████╗  
██╔══██║██║██╔══██╗██╔══╝      ██║╚██╔╝██║██╔══╝  
██║  ██║██║██║  ██║███████╗    ██║ ╚═╝ ██║███████╗
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚══════╝

Looking for a dev who REALLY understands the business?

✨ I don't just code, I solve problems
🚀 15 years from dev to IT management
🎯 Autonomous, creative, always up-to-date
🌍 Remote-friendly, available immediately

📩 ralphi2811@gmail.com
Let's build something amazing together!`,
      notFound: "Command not recognized. Type 'help' for command list."
    }
  };

  const t = translations[lang];

  const bootSequence = [
    "BIOS v2.4.1 - Raphael Auberlet Terminal OS",
    "Initializing system...",
    "Loading kernel modules... [OK]",
    "Mounting file systems... [OK]",
    "Starting network services... [OK]",
    "Loading developer profile... [OK]",
    "Initializing coffee.service... [OK]",
    "",
    { type: 'logo', component: true },
    "",
    t.welcome,
    t.bootComplete,
    ""
  ];

  useEffect(() => {
    if (isBooting) {
      let index = 0;
      const bootInterval = setInterval(() => {
        if (index < bootSequence.length) {
          const item = bootSequence[index];
          // Vérifier si c'est un objet avec le logo
          if (typeof item === 'object' && item.component) {
            setOutput(prev => [...prev, { type: 'logo' }]);
          } else {
            setOutput(prev => [...prev, { type: 'system', text: item }]);
          }
          index++;
        } else {
          clearInterval(bootInterval);
          setIsBooting(false);
        }
      }, 200);
      return () => clearInterval(bootInterval);
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

    if (trimmedCmd === 'experience') {
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

    if (trimmedCmd === 'restart') {
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
    ║   DEVELOPER • DEVOPS • FULL STACK    ║
    ╚═══════════════════════════════════════╝
          ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
         █░░░░░░░░░░░░░░░░░░░░░░░░█
         █░ PYTHON • REACT • PHP ░█
         █░ DOCKER • K8S • CI/CD ░█
         █░░░░░░░░░░░░░░░░░░░░░░░░█
          ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
`}
        </pre>
      </div>

      {/* Header - Fixed */}
      <div className="mb-4 border-b border-green-800 pb-4 flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <Terminal className="w-6 h-6" />
          <h1 className="text-xl font-bold">RAPHAEL_AUBERLET.terminal</h1>
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
                {line.text}
                {i === typingLineIndex && <span className="animate-pulse">▊</span>}
              </pre>
            </div>
          )
        ))}
      </div>

      {/* Input line - Fixed */}
      {!isBooting && (
        <div className="flex items-center gap-2 flex-shrink-0 pt-2 border-t border-green-800/30">
          <span className="text-cyan-400">raphael@terminal:~$</span>
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
