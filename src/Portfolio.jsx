import React, { useState, useEffect, useRef } from 'react';
import { Code2, Database, Terminal, Zap, Briefcase, Mail, MessageCircle, Instagram, ChevronDown, X, Send, Globe } from 'lucide-react';
import './Portfolio.css';
import './FullPage.css';
import './Interactive.css';

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showBudgetPopup, setShowBudgetPopup] = useState(false);
  const [language, setLanguage] = useState('pt'); // pt or en
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [botState, setBotState] = useState('normal'); // normal, blinking, sleeping, happy, dizzy
  const containerRef = useRef(null);
  const lastMoveTime = useRef(Date.now());
  const lastMousePos = useRef({ x: 0, y: 0 });
  const inactivityTimer = useRef(null);
  
  const pages = ['home', 'about', 'skills', 'projects', 'contact'];
  
  const profileImage = "https://i.imgur.com/zRsf04n.jpeg";

  // Translations
  const translations = {
    pt: {
      developer: 'Developer & Data Analyst',
      specialist: 'Especialista em automação, desenvolvimento de sistemas e soluções sob medida para qualquer tipo de projeto',
      viewProjects: 'Ver Projetos',
      contact: 'Contato',
      aboutMe: 'Sobre Mim',
      aboutText1: 'Sou desenvolvedor especializado em',
      aboutText1b: 'automação de processos',
      aboutText1c: 'criação de sistemas sob medida',
      aboutText1d: 'Transformo ideias em soluções funcionais e eficientes.',
      aboutText2: 'Do conceito à implementação, desenvolvo',
      aboutText2b: 'qualquer tipo de projeto',
      aboutText2c: 'que envolva automação, análise de dados, aplicações web, sistemas desktop ou integração de APIs. Se pode ser automatizado ou programado, eu posso criar.',
      aboutText3: 'Minha abordagem combina',
      aboutText3b: 'versatilidade técnica',
      aboutText3c: 'foco em resultados práticos',
      aboutText3d: 'Cada projeto é único e merece uma solução personalizada que realmente resolva o problema.',
      skills: 'Habilidades',
      proficiency: 'proficiency',
      completedProjects: 'Projetos Concluídos',
      linesOfCode: 'Linhas de Código',
      satisfiedClients: 'Clientes Satisfeitos',
      coffees: 'Xícaras de Café',
      finishedProjects: 'Projetos Finalizados',
      clickToAdd: 'Clique para adicionar screenshot',
      letsTalk: 'Vamos Conversar?',
      contactText: 'Interessado em discutir um projeto ou oportunidade? Entre em contato através dos canais abaixo.',
      inProduction: 'Em produção',
      getBudget: 'Faça seu Orçamento',
      budgetTitle: 'NOVO ORÇAMENTO - TERMINAL',
      budgetName: 'Seu nome',
      budgetEmail: 'Seu email',
      budgetPhone: 'WhatsApp (opcional)',
      budgetProjectType: 'Tipo de projeto',
      budgetDescription: 'Descreva seu projeto',
      budgetDeadline: 'Prazo desejado (opcional)',
      sendViaEmail: 'Enviar por Email',
      sendViaWhatsApp: 'Enviar por WhatsApp',
      projectTypes: {
        automation: 'Automação de Processos',
        webapp: 'Aplicação Web',
        bot: 'Bot/Chatbot',
        analysis: 'Análise de Dados',
        desktop: 'Sistema Desktop',
        other: 'Outro'
      }
    },
    en: {
      developer: 'Developer & Data Analyst',
      specialist: 'Expert in automation, systems development and custom solutions for any type of project',
      viewProjects: 'View Projects',
      contact: 'Contact',
      aboutMe: 'About Me',
      aboutText1: 'I am a developer specialized in',
      aboutText1b: 'process automation',
      aboutText1c: 'custom systems creation',
      aboutText1d: 'I transform ideas into functional and efficient solutions.',
      aboutText2: 'From concept to implementation, I develop',
      aboutText2b: 'any type of project',
      aboutText2c: 'involving automation, data analysis, web applications, desktop systems or API integration. If it can be automated or programmed, I can create it.',
      aboutText3: 'My approach combines',
      aboutText3b: 'technical versatility',
      aboutText3c: 'focus on practical results',
      aboutText3d: 'Each project is unique and deserves a customized solution that truly solves the problem.',
      skills: 'Skills',
      proficiency: 'proficiency',
      completedProjects: 'Completed Projects',
      linesOfCode: 'Lines of Code',
      satisfiedClients: 'Satisfied Clients',
      coffees: 'Cups of Coffee',
      finishedProjects: 'Finished Projects',
      clickToAdd: 'Click to add screenshot',
      letsTalk: "Let's Talk?",
      contactText: 'Interested in discussing a project or opportunity? Contact me through the channels below.',
      inProduction: 'In production',
      getBudget: 'Get a Quote',
      budgetTitle: 'NEW BUDGET - TERMINAL',
      budgetName: 'Your name',
      budgetEmail: 'Your email',
      budgetPhone: 'WhatsApp (optional)',
      budgetProjectType: 'Project type',
      budgetDescription: 'Describe your project',
      budgetDeadline: 'Desired deadline (optional)',
      sendViaEmail: 'Send via Email',
      sendViaWhatsApp: 'Send via WhatsApp',
      projectTypes: {
        automation: 'Process Automation',
        webapp: 'Web Application',
        bot: 'Bot/Chatbot',
        analysis: 'Data Analysis',
        desktop: 'Desktop System',
        other: 'Other'
      }
    }
  };

  const t = translations[language];

  const skills = [
    { name: 'Python & Flask', icon: <Code2 />, level: 95, color: '#00d9ff' },
    { name: 'Excel & VBA', icon: <Database />, level: 90, color: '#a855f7' },
    { name: language === 'pt' ? 'Análise de Dados' : 'Data Analysis', icon: <Terminal />, level: 88, color: '#06b6d4' },
    { name: language === 'pt' ? 'Automação & Sistemas' : 'Automation & Systems', icon: <Zap />, level: 92, color: '#8b5cf6' },
    { name: language === 'pt' ? 'Logística & Trading' : 'Logistics & Trading', icon: <Briefcase />, level: 85, color: '#14b8a6' }
  ];

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: language === 'pt' ? 'Sistema HVI - Análise de Algodão' : 'HVI System - Cotton Analysis',
      description: language === 'pt' 
        ? 'Aplicação Flask completa para extração e análise de dados HVI de PDFs. Interface visual com drag-and-drop, processamento em lote e exportação Excel automatizada.'
        : 'Complete Flask application for HVI data extraction and analysis from PDFs. Visual interface with drag-and-drop, batch processing and automated Excel export.',
      tags: ['Python', 'Flask', 'PDF Processing', 'Data Analysis'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
    },
    {
      id: 3,
      title: language === 'pt' ? 'Dashboard Analytics em Tempo Real' : 'Real-Time Analytics Dashboard',
      description: language === 'pt'
        ? 'Dashboard interativo com métricas de performance, KPIs e visualizações dinâmicas. Integração com múltiplas fontes de dados e atualização automática.'
        : 'Interactive dashboard with performance metrics, KPIs and dynamic visualizations. Integration with multiple data sources and automatic updates.',
      tags: ['React', 'Chart.js', 'API', 'Real-time'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
    },
    {
      id: 4,
      title: language === 'pt' ? 'Sistema de Email Marketing Automatizado' : 'Automated Email Marketing System',
      description: language === 'pt'
        ? 'Plataforma completa para campanhas de email com segmentação inteligente, templates personalizáveis e análise de métricas de conversão.'
        : 'Complete platform for email campaigns with smart segmentation, customizable templates and conversion metrics analysis.',
      tags: ['Python', 'API', 'Automation', 'Analytics'],
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80'
    }
  ]);

  // Budget form state
  const [budgetForm, setBudgetForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    description: '',
    deadline: ''
  });

  const handleImageUpload = (projectId, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjects(prev => prev.map(p => 
          p.id === projectId ? { ...p, image: reader.result } : p
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const goToPage = (pageIndex) => {
    if (isTransitioning || pageIndex === currentPage) return;
    if (pageIndex < 0 || pageIndex >= pages.length) return;
    
    setIsTransitioning(true);
    setCurrentPage(pageIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  // LÓGICA COMPLETA DO BOT COM TODAS AS REAÇÕES - CORRIGIDA
  useEffect(() => {
    let dizzyTimeout = null;
    let lastState = 'normal';
    
    const handleMouseMove = (e) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      setMousePos({ x: newX, y: newY });
      
      const now = Date.now();
      const timeDiff = now - lastMoveTime.current;
      
      // Calcular velocidade do mouse
      const distance = Math.sqrt(
        Math.pow(newX - lastMousePos.current.x, 2) + 
        Math.pow(newY - lastMousePos.current.y, 2)
      );
      const speed = distance / Math.max(timeDiff, 1);
      
      // RESETAR TIMER DE INATIVIDADE
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
      
      // CALCULAR DISTÂNCIA DO BOTÃO DE ORÇAMENTO (canto superior esquerdo)
      const budgetButtonX = 100;
      const budgetButtonY = 30;
      const distanceToBudgetButton = Math.sqrt(
        Math.pow(newX - budgetButtonX, 2) + 
        Math.pow(newY - budgetButtonY, 2)
      );
      
      // DETERMINAR NOVO ESTADO (prioridade: Feliz > Tonto > Normal)
      let newState = 'normal';
      
      if (distanceToBudgetButton < 150) {
        // Perto do botão = FELIZ ❤️
        newState = 'happy';
        // Cancelar timeout de tonto se existir
        if (dizzyTimeout) {
          clearTimeout(dizzyTimeout);
          dizzyTimeout = null;
        }
      } else if (speed > 3) {
        // Balançando rápido = TONTO ✨
        newState = 'dizzy';
        // Cancelar timeout anterior
        if (dizzyTimeout) {
          clearTimeout(dizzyTimeout);
        }
        // Criar novo timeout para voltar ao normal
        dizzyTimeout = setTimeout(() => {
          setBotState('normal');
          lastState = 'normal';
          dizzyTimeout = null;
        }, 1500);
      } else {
        // Verificar se ainda está no timeout de tonto
        if (dizzyTimeout !== null) {
          newState = 'dizzy'; // Manter tonto até o timeout
        } else {
          newState = 'normal';
        }
      }
      
      // Atualizar estado apenas se mudou
      if (newState !== lastState) {
        setBotState(newState);
        lastState = newState;
      }
      
      // DEFINIR TIMER PARA DORMIR (3 segundos de inatividade)
      inactivityTimer.current = setTimeout(() => {
        setBotState('sleeping');
        lastState = 'sleeping';
        if (dizzyTimeout) {
          clearTimeout(dizzyTimeout);
          dizzyTimeout = null;
        }
      }, 3000);
      
      lastMoveTime.current = now;
      lastMousePos.current = { x: newX, y: newY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Timer inicial para dormir
    inactivityTimer.current = setTimeout(() => {
      setBotState('sleeping');
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
      if (dizzyTimeout) {
        clearTimeout(dizzyTimeout);
      }
    };
  }, []);

  // Auto-piscar a cada 3-5 segundos quando em estado normal
  useEffect(() => {
    if (botState === 'normal') {
      const blinkInterval = setInterval(() => {
        setBotState('blinking');
        setTimeout(() => setBotState('normal'), 200);
      }, Math.random() * 2000 + 3000);
      
      return () => clearInterval(blinkInterval);
    }
  }, [botState]);

  // Fullpage navigation
  useEffect(() => {
    const handleWheel = (e) => {
      if (isTransitioning || showBudgetPopup) {
        e.preventDefault();
        return;
      }
      
      if (e.deltaY > 0) {
        goToPage(currentPage + 1);
      } else {
        goToPage(currentPage - 1);
      }
    };

    const handleKeyDown = (e) => {
      if (showBudgetPopup) return;
      if (e.key === 'ArrowDown') goToPage(currentPage + 1);
      if (e.key === 'ArrowUp') goToPage(currentPage - 1);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, isTransitioning, showBudgetPopup]);

  const handleSendBudget = (method) => {
    const message = `🚀 NOVO ORÇAMENTO

👤 Nome: ${budgetForm.name}
📧 Email: ${budgetForm.email}
📱 WhatsApp: ${budgetForm.phone || 'Não informado'}
📂 Tipo: ${budgetForm.projectType}

📝 Descrição:
${budgetForm.description}

⏰ Prazo: ${budgetForm.deadline || 'Flexível'}`;

    if (method === 'whatsapp') {
      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/5513988793802?text=${encoded}`, '_blank');
    } else {
      window.location.href = `mailto:gabriel121638@gmail.com?subject=Novo Orçamento - ${budgetForm.name}&body=${encodeURIComponent(message)}`;
    }

    setShowBudgetPopup(false);
    setBudgetForm({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      description: '',
      deadline: ''
    });
  };

  return (
    <div className="fullpage-container" ref={containerRef}>
      
      {/* Background ESTÁTICO */}
      <div className="bg-light-1"></div>
      <div className="bg-light-2"></div>
      <div className="bg-light-3"></div>
      <div className="grid-pattern"></div>
      <div className="gradient-blur gradient-1"></div>
      <div className="gradient-blur gradient-2"></div>
      <div className="gradient-blur gradient-3"></div>

      {/* Animated Bot Companion COM TODAS AS REAÇÕES */}
      <div 
        className={`bot-companion ${botState}`}
        style={{
          left: `${mousePos.x + 20}px`,
          top: `${mousePos.y + 20}px`
        }}
      >
        <div className="bot-body">
          <div className={`bot-eye ${botState}`}></div>
          <div className={`bot-eye ${botState}`}></div>
        </div>
        {botState === 'sleeping' && <div className="zzz">💤</div>}
        {botState === 'happy' && <div className="heart">❤️</div>}
        {botState === 'dizzy' && <div className="stars">✨</div>}
      </div>

      {/* Language Toggle */}
      <button 
        className="language-toggle"
        onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
      >
        <Globe size={20} />
        <span>{language === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}</span>
      </button>

      {/* Budget Button */}
      <button 
        className="budget-button"
        onClick={() => setShowBudgetPopup(true)}
      >
        <Terminal size={20} />
        {t.getBudget}
      </button>

      {/* Budget Popup */}
      {showBudgetPopup && (
        <div className="budget-popup-overlay" onClick={() => setShowBudgetPopup(false)}>
          <div className="budget-popup terminal-style" onClick={(e) => e.stopPropagation()}>
            <div className="terminal-header">
              <span>{'>'} {t.budgetTitle}</span>
              <button onClick={() => setShowBudgetPopup(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="terminal-content">
              <div className="terminal-line">
                <span className="prompt">$</span>
                <input
                  type="text"
                  placeholder={t.budgetName}
                  value={budgetForm.name}
                  onChange={(e) => setBudgetForm({...budgetForm, name: e.target.value})}
                  className="terminal-input"
                />
              </div>

              <div className="terminal-line">
                <span className="prompt">$</span>
                <input
                  type="email"
                  placeholder={t.budgetEmail}
                  value={budgetForm.email}
                  onChange={(e) => setBudgetForm({...budgetForm, email: e.target.value})}
                  className="terminal-input"
                />
              </div>

              <div className="terminal-line">
                <span className="prompt">$</span>
                <input
                  type="tel"
                  placeholder={t.budgetPhone}
                  value={budgetForm.phone}
                  onChange={(e) => setBudgetForm({...budgetForm, phone: e.target.value})}
                  className="terminal-input"
                />
              </div>

              <div className="terminal-line">
                <span className="prompt">$</span>
                <select
                  value={budgetForm.projectType}
                  onChange={(e) => setBudgetForm({...budgetForm, projectType: e.target.value})}
                  className="terminal-input"
                >
                  <option value="">{t.budgetProjectType}</option>
                  <option value={t.projectTypes.automation}>{t.projectTypes.automation}</option>
                  <option value={t.projectTypes.webapp}>{t.projectTypes.webapp}</option>
                  <option value={t.projectTypes.bot}>{t.projectTypes.bot}</option>
                  <option value={t.projectTypes.analysis}>{t.projectTypes.analysis}</option>
                  <option value={t.projectTypes.desktop}>{t.projectTypes.desktop}</option>
                  <option value={t.projectTypes.other}>{t.projectTypes.other}</option>
                </select>
              </div>

              <div className="terminal-line">
                <span className="prompt">$</span>
                <textarea
                  placeholder={t.budgetDescription}
                  value={budgetForm.description}
                  onChange={(e) => setBudgetForm({...budgetForm, description: e.target.value})}
                  className="terminal-input terminal-textarea"
                  rows="4"
                />
              </div>

              <div className="terminal-line">
                <span className="prompt">$</span>
                <input
                  type="text"
                  placeholder={t.budgetDeadline}
                  value={budgetForm.deadline}
                  onChange={(e) => setBudgetForm({...budgetForm, deadline: e.target.value})}
                  className="terminal-input"
                />
              </div>

              <div className="terminal-actions">
                <button 
                  onClick={() => handleSendBudget('email')}
                  className="terminal-btn"
                  disabled={!budgetForm.name || !budgetForm.email || !budgetForm.description}
                >
                  <Mail size={18} />
                  {t.sendViaEmail}
                </button>
                <button 
                  onClick={() => handleSendBudget('whatsapp')}
                  className="terminal-btn whatsapp"
                  disabled={!budgetForm.name || !budgetForm.description}
                >
                  <MessageCircle size={18} />
                  {t.sendViaWhatsApp}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Indicators */}
      <div className="page-indicators">
        {pages.map((page, index) => (
          <button
            key={page}
            onClick={() => goToPage(index)}
            className={`page-dot ${currentPage === index ? 'active' : ''}`}
            aria-label={page}
          >
            <span className="dot-label">{page}</span>
          </button>
        ))}
      </div>

      {/* Pages Wrapper */}
      <div 
        className="pages-wrapper"
        style={{ transform: `translateY(-${currentPage * 100}vh)` }}
      >
        
        {/* HOME PAGE */}
        <section className="page">
          <div className="page-content">
            <div className="max-w-7xl w-full mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                
                <div className="text-left">
                  <div className="animate-slide-up">
                    <div className="inline-block mb-4">
                      <span className="text-[#00d9ff] font-['JetBrains_Mono'] text-sm tracking-wider">
                        {'<developer>'}
                      </span>
                    </div>
                  </div>
                  
                  <h1 className="text-6xl md:text-8xl font-['JetBrains_Mono'] font-bold mb-6">
                    <span className="neon-text" style={{ color: '#00d9ff' }}>Gabriel</span>
                    <br />
                    <span className="text-white">Corrêa</span>
                  </h1>
                  
                  <div>
                    <p className="text-xl md:text-2xl text-gray-400 mb-2 font-['JetBrains_Mono']">
                      {t.developer}
                      <span className="terminal-cursor"></span>
                    </p>
                    <p className="text-base text-gray-500 mb-8 max-w-lg">
                      {t.specialist}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => goToPage(3)} className="glass-card px-6 py-3 inline-flex items-center gap-2 hover:text-[#00d9ff] transition-colors text-sm">
                      <Terminal size={18} />
                      {t.viewProjects}
                    </button>
                    <button onClick={() => goToPage(4)} className="px-6 py-3 inline-flex items-center gap-2 border border-[#00d9ff] rounded-xl hover:bg-[#00d9ff] hover:text-black transition-all text-sm">
                      {t.contact}
                    </button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="profile-image-container">
                    <div className="profile-glow"></div>
                    <img 
                      src={profileImage}
                      alt="Gabriel Corrêa"
                      className="profile-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {currentPage === 0 && (
            <button onClick={() => goToPage(1)} className="scroll-indicator">
              <ChevronDown size={32} />
            </button>
          )}
        </section>

        {/* ABOUT PAGE */}
        <section className="page">
          <div className="page-content">
            <div className="max-w-4xl w-full mx-auto px-6">
              <div className="glass-card p-12">
                <h2 className="text-5xl font-['JetBrains_Mono'] font-bold mb-8">
                  <span className="text-[#00d9ff]">{'> '}</span>
                  {t.aboutMe}
                </h2>
                
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                  <p>
                    {t.aboutText1} <span className="text-[#00d9ff] font-semibold">{t.aboutText1b}</span> {language === 'pt' ? 'e' : 'and'} 
                    <span className="text-purple-400 font-semibold"> {t.aboutText1c}</span>. {t.aboutText1d}
                  </p>
                  
                  <p>
                    {t.aboutText2} <span className="text-cyan-400">{t.aboutText2b}</span> {t.aboutText2c}
                  </p>
                  
                  <p>
                    {t.aboutText3} <span className="text-[#00d9ff]">{t.aboutText3b}</span> {language === 'pt' ? 'com' : 'with'} 
                    <span className="text-purple-400"> {t.aboutText3c}</span>. {t.aboutText3d}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-gray-700">
                    <div className="flex items-center gap-2 text-[#00d9ff]">
                      <Code2 size={20} />
                      <span>Python & Flask</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-400">
                      <Database size={20} />
                      <span>Excel & VBA</span>
                    </div>
                    <div className="flex items-center gap-2 text-cyan-400">
                      <Terminal size={20} />
                      <span>Data Analysis</span>
                    </div>
                    <div className="flex items-center gap-2 text-teal-400">
                      <Briefcase size={20} />
                      <span>Automation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS PAGE */}
        <section className="page">
          <div className="page-content">
            <div className="max-w-6xl w-full mx-auto px-6">
              <h2 className="text-5xl font-['JetBrains_Mono'] font-bold mb-16 text-center">
                <span className="text-[#00d9ff]">{'> '}</span>
                {t.skills}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {skills.map((skill) => (
                  <div key={skill.name} className="glass-card p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div 
                        className="p-3 rounded-lg"
                        style={{ 
                          background: `${skill.color}20`,
                          color: skill.color 
                        }}
                      >
                        {skill.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-['JetBrains_Mono'] font-semibold text-lg">
                          {skill.name}
                        </h3>
                        <p className="text-sm text-gray-500">{skill.level}% {t.proficiency}</p>
                      </div>
                    </div>
                    
                    <div className="skill-bar">
                      <div 
                        className="skill-fill"
                        style={{ 
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: t.completedProjects, value: '15+' },
                  { label: t.linesOfCode, value: '50K+' },
                  { label: t.satisfiedClients, value: '100%' },
                  { label: t.coffees, value: '∞' }
                ].map((stat) => (
                  <div key={stat.label} className="glass-card p-6 text-center">
                    <div className="text-4xl font-['JetBrains_Mono'] font-bold text-[#00d9ff] mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS PAGE */}
        <section className="page">
          <div className="page-content">
            <div className="max-w-6xl w-full mx-auto px-6">
              <h2 className="text-5xl font-['JetBrains_Mono'] font-bold mb-16 text-center">
                <span className="text-[#00d9ff]">{'> '}</span>
                {t.finishedProjects}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="glass-card project-card overflow-hidden group">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent"></div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-['JetBrains_Mono'] font-bold text-xl mb-3 text-white">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span 
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full bg-[#00d9ff] bg-opacity-10 text-[#00d9ff] border border-[#00d9ff] border-opacity-30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT PAGE */}
        <section className="page">
          <div className="page-content">
            <div className="max-w-4xl w-full text-center mx-auto px-6">
              <h2 className="text-5xl font-['JetBrains_Mono'] font-bold mb-8">
                <span className="text-[#00d9ff]">{'> '}</span>
                {t.letsTalk}
              </h2>
              
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                {t.contactText}
              </p>

              <div className="flex flex-wrap gap-6 justify-center">
                <a 
                  href="mailto:gabriel121638@gmail.com" 
                  className="glass-card px-8 py-4 inline-flex items-center gap-3 hover:text-[#00d9ff] transition-colors"
                >
                  <Mail size={24} />
                  <span className="font-['JetBrains_Mono']">Email</span>
                </a>
                
                <a 
                  href="https://wa.me/5513988793802" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card px-8 py-4 inline-flex items-center gap-3 hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle size={24} />
                  <span className="font-['JetBrains_Mono']">WhatsApp</span>
                </a>
                
                <div 
                  className="glass-card px-8 py-4 inline-flex items-center gap-3 opacity-50 cursor-not-allowed relative group"
                  title={t.inProduction}
                >
                  <Instagram size={24} />
                  <span className="font-['JetBrains_Mono']">Instagram</span>
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#00d9ff] text-black text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {t.inProduction}
                  </span>
                </div>
              </div>

              <div className="mt-20 pt-12 border-t border-gray-800">
                <p className="text-gray-500 font-['JetBrains_Mono'] text-sm">
                  {'</developer>'} © 2025 Gabriel Corrêa. {language === 'pt' ? 'Feito com' : 'Made with'} React & Tailwind.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
