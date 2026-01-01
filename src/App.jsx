import React, { useState, useEffect, useMemo } from 'react';
import { 
  Github, 
  ExternalLink, 
  Mail, 
  User, 
  Code, 
  Briefcase, 
  Send, 
  ChevronRight, 
  Gamepad2,
  Box,
  MessageSquare,
  Globe,
  Cpu,
  Layers,
  Palette,
  Layout,
  Terminal,
  MousePointer2,
  Sparkles
} from 'lucide-react';

/**
 * Enhanced Portfolio Component
 * Customized for: Game Developer, 3D Modeller, Bot Developer.
 * Update: Integrated Formspree API for real email transmissions.
 */

const PERSONAL_INFO = {
  name: "UndefinedBlastro", // Replace with your actual name
  title: "Game Developer | 3D Artist | Bot Developer",
  location: "Remote",
  email: "undefinedblastro@gmail.com",
  discord: "blastro2600x",
  discordLink: "https://discordapp.com/users/1252109019490029618",
  github: "https://github.com/undefinedblastro",
  // FORMSPREE CONFIG: Create a free account at formspree.io and paste your endpoint ID here
  formspreeId: "mykzzoor", 
  about: "I specialize in building immersive worlds and functional digital tools, ranging from procedural Unreal Engine plugins to intelligent Discord bots and sleek web applications.",
  detailedAbout: [
    "I am a multi-disciplinary developer with a deep passion for game systems and 3D art. My work often sits at the intersection of technical engineering and creative design.",
    "From writing C++ for Unreal Engine plugins like my City Generator to crafting stylized shaders and high-poly Blender models, I love the challenge of proceduralism.",
    "Beyond game dev, I build robust Discord bots using discord.js and modern web apps that scale."
  ],
};

const PROJECTS = [
  {
    title: "City Generator",
    category: "Game Dev",
    description: "An Unreal Engine Plugin that procedurally generates vast, optimized cities with road networks and building variety.",
    tech: ["Unreal Engine", "C++", "Blueprints", "Procedural"],
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=800",
    icon: <Gamepad2 className="w-5 h-5" />
  },
  {
    title: "Unreal Toon Shaders",
    category: "Game Dev",
    description: "High-performance stylized shading system for UE5. Optimized for stylized and anime-inspired game aesthetics.",
    tech: ["HLSL", "UE Materials", "Shaders"],
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800",
    icon: <Palette className="w-5 h-5" />
  },
  {
    title: "Mayuki (Discord Bot)",
    category: "Bots",
    description: "A feature-rich Discord bot built with discord.js, focused on community engagement and modular utility.",
    tech: ["Node.js", "discord.js", "MongoDB"],
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=800",
    icon: <MessageSquare className="w-5 h-5" />
  },
  {
    title: "Nexus (Discord Bot)",
    category: "Bots",
    description: "A high-uptime utility bot designed for server automation and advanced logging using discord.js.",
    tech: ["Node.js", "discord.js", "API"],
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1587560699334-bea93391dcef?auto=format&fit=crop&q=80&w=800",
    icon: <MessageSquare className="w-5 h-5" />
  },
  {
    title: "Blender Model #1",
    category: "3D Modeling",
    description: "Detailed 3D model showcasing hard-surface modeling techniques and PBR texturing.",
    tech: ["Blender", "Hard Surface"],
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
    icon: <Box className="w-5 h-5" />
  },
  {
    title: "Blender Model #2",
    category: "3D Modeling",
    description: "Stylized character model with clean topology and game-ready rigging.",
    tech: ["Blender", "Rigging", "Sculpting"],
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
    icon: <Box className="w-5 h-5" />
  },
  {
    title: "Environment Props",
    category: "3D Modeling",
    description: "Modular environment asset pack featuring stylized architecture and optimized textures.",
    tech: ["Blender", "Substance", "Unity"],
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1605142859862-978be7eba909?auto=format&fit=crop&q=80&w=800",
    icon: <Box className="w-5 h-5" />
  },
  {
    title: "Weapon Assets",
    category: "3D Modeling",
    description: "High-fidelity weapon models designed for first-person shooters with clean rigging.",
    tech: ["Blender", "ZBrush", "PBR"],
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&q=80&w=800",
    icon: <Box className="w-5 h-5" />
  },
  {
    title: "Personal Website",
    category: "Web",
    description: "Modern, animated portfolio site built with React and Tailwind CSS for lightning speed.",
    tech: ["React", "Tailwind", "Vite"],
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    icon: <Globe className="w-5 h-5" />
  }
];

const SKILLS = [
  { name: "Game Dev", icon: <Gamepad2 className="w-5 h-5" />, items: ["Unreal Engine", "C++", "Blueprints", "HLSL"] },
  { name: "3D Art", icon: <Box className="w-5 h-5" />, items: ["Blender", "Sculpting", "Hard Surface", "Texturing"] },
  { name: "Bot Dev", icon: <MessageSquare className="w-5 h-5" />, items: ["Node.js", "discord.js", "MongoDB", "API"] },
  { name: "Web/App", icon: <Layout className="w-5 h-5" />, items: ["React", "Tailwind", "JavaScript", "Vite"] }
];

const REVIEWS = [
  {
    name: "Alex Rivera",
    role: "Studio Director",
    content: "The procedural tools created for our project were beyond expectations. Highly efficient and extremely modular.",
    rating: 5
  },
  {
    name: "Sarah Chen",
    role: "Community Lead",
    content: "The custom Discord bot integrated perfectly with our existing systems and automated 90% of our moderation tasks.",
    rating: 5
  },
  {
    name: "Marcus V.",
    role: "Game Artist",
    content: "Exceptional 3D assets. The topology is clean, and the rigging is perfectly suited for real-time engines.",
    rating: 5
  },
  {
    name: "Project Nexus",
    role: "Founder",
    content: "A rare talent that understands both the technical code and the artistic vision. A pleasure to collaborate with.",
    rating: 5
  }
];

const CATEGORIES = ["All", "Game Dev", "3D Modeling", "Bots", "Web"];

const DiscordIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    style={{ pointerEvents: 'none' }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.864-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6533-.2455-1.2743-.5485-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1971.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
  </svg>
);

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Review Rotation State
  const [reviewIndex, setReviewIndex] = useState(0);

  // Interval for Review Rotation (10 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
    };

    const observerOptions = { threshold: 0.1, rootMargin: "0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    window.addEventListener('scroll', handleScroll);
    sections.forEach(s => {
      const rect = s.getBoundingClientRect();
      if (rect.top < window.innerHeight) s.classList.add('is-visible');
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const response = await fetch(`https://formspree.io/f/${PERSONAL_INFO.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(null), 5000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus(null), 5000);
    }
  };

  const filteredProjects = useMemo(() => {
    return activeFilter === "All" 
      ? PROJECTS 
      : PROJECTS.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden relative w-full">
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
        style={{ background: `radial-gradient(800px at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.08), transparent 80%)` }}
      />
      <div className="fixed top-0 left-0 h-1 bg-emerald-500 z-[70] transition-all duration-100" style={{ width: `${scrollProgress}%` }} />

      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent cursor-pointer tracking-tighter" onClick={() => handleNavClick('home')}>
            {PERSONAL_INFO.name.split(' ')[0]}.
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['home', 'about', 'skills', 'projects', 'reviews'].map((item) => (
              <button key={item} onClick={() => handleNavClick(item)} className={`text-xs font-black tracking-widest transition-all hover:text-emerald-400 uppercase relative cursor-pointer ${activeSection === item ? 'text-emerald-400' : 'text-slate-500'}`}>
                {item}
                {activeSection === item && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-500 rounded-full" />}
              </button>
            ))}
            <button onClick={() => handleNavClick('contact')} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/20 active:scale-95 cursor-pointer">Contact</button>
          </div>
          <button className="md:hidden p-2 flex flex-col gap-1.5 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className={`w-6 h-0.5 bg-slate-200 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-slate-200 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-slate-200 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-slate-950 z-[100] transition-transform duration-500 md:hidden flex items-center justify-center ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center gap-10">
           {['home', 'about', 'skills', 'projects', 'reviews', 'contact'].map((item) => (
            <button key={item} onClick={() => handleNavClick(item)} className={`text-4xl font-black uppercase tracking-tighter transition-all cursor-pointer ${activeSection === item ? 'text-emerald-400' : 'text-slate-700'}`}>{item}</button>
          ))}
        </div>
      </div>

      <main className="flex-grow relative z-10 w-full">
        <section id="home" className="px-6 min-h-screen flex flex-col items-center justify-center text-center overflow-hidden relative w-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" style={{ transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)` }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" style={{ transform: `translate(${mousePos.x * -0.03}px, ${mousePos.y * -0.03}px)` }} />
          <div className="max-w-5xl mx-auto z-10 reveal-up">
            <span className="px-5 py-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 inline-block shadow-inner"><Sparkles className="w-3 h-3 inline mr-2 mb-0.5" /> Worlds & Systems</span>
            <h1 className="text-6xl md:text-[110px] font-black mb-10 tracking-tighter leading-[0.85] uppercase">Beyond <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-indigo-400">Interactive.</span></h1>
            <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto mb-14 leading-relaxed font-medium">{PERSONAL_INFO.about}</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button onClick={() => handleNavClick('projects')} className="px-12 py-5 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-900/40 group cursor-pointer">Browse Projects <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></button>
              <button onClick={() => handleNavClick('contact')} className="px-12 py-5 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800 rounded-2xl font-black text-lg transition-all border border-slate-800 hover:border-slate-700 shadow-xl cursor-pointer">Let's Chat</button>
            </div>
          </div>
          <div className="absolute bottom-10 animate-bounce text-slate-600 opacity-50"><MousePointer2 className="w-8 h-8" /></div>
        </section>

        <section id="about" className="py-32 px-6 scroll-reveal flex items-center justify-center min-h-screen w-full">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center overflow-hidden">
            <div className="relative group perspective-1000 reveal-left">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500 to-emerald-500 rounded-[40px] blur-2xl opacity-10" />
              <div className="relative rounded-[40px] bg-slate-900 border border-slate-800 aspect-[4/5] flex flex-col items-center justify-center overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                <img 
                  src={PERSONAL_INFO.avatar} 
                  alt="Avatar" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute bottom-8 flex gap-3"><div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /><div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150" /></div>
              </div>
            </div>
            <div className="reveal-right">
              <h2 className="text-5xl font-black mb-10 flex items-center gap-5 tracking-tighter"><div className="w-12 h-1 bg-emerald-500 rounded-full" /> WHO I AM</h2>
              <div className="space-y-8 text-slate-400 text-xl leading-relaxed font-medium">{PERSONAL_INFO.detailedAbout.map((p, i) => <p key={i}>{p}</p>)}</div>
              <div className="mt-12 flex gap-5">
                 <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="p-5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-emerald-400 transition-all transform hover:scale-110 cursor-pointer"><Github className="w-8 h-8" /></a>
                 <a href={PERSONAL_INFO.discordLink} target="_blank" rel="noopener noreferrer" className="p-5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-emerald-400 transition-all transform hover:scale-110 flex items-center justify-center cursor-pointer"><DiscordIcon className="w-8 h-8" /></a>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-32 px-6 scroll-reveal w-full">
          <div className="max-w-6xl mx-auto overflow-hidden">
            <div className="text-center mb-24 reveal-up">
              <h2 className="text-6xl font-black mb-6 tracking-tighter uppercase">The Toolkit</h2>
              <p className="text-slate-500 font-bold text-2xl">The engine behind my creations</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {SKILLS.map((skill, idx) => (
                <div key={idx} className="p-10 bg-slate-900/50 border border-slate-800 rounded-[3rem] hover:border-emerald-500/40 transition-all group reveal-up" style={{ transitionDelay: `${idx * 100}ms` }}>
                  <div className="mb-8 p-4 bg-slate-800 text-emerald-400 rounded-2xl inline-block group-hover:scale-110 transition-transform">{skill.icon}</div>
                  <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">{skill.name}</h3>
                  <div className="flex flex-wrap gap-2">{skill.items.map((item, i) => <span key={i} className="px-4 py-2 bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl">{item}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-32 px-6 scroll-reveal w-full">
          <div className="max-w-7xl mx-auto overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12 reveal-up">
              <div>
                <h2 className="text-6xl font-black mb-6 uppercase tracking-tighter">Work</h2>
                <p className="text-slate-500 text-2xl font-bold">Games, Bots & 3D Assets</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === cat ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30' : 'bg-slate-900 text-slate-500 border border-slate-800 hover:border-slate-700'}`}>{cat}</button>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProjects.map((project, idx) => (
                <div key={project.title} className="group bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden hover:translate-y-[-12px] transition-all duration-500 reveal-up">
                  <div className="relative h-64 bg-slate-800 overflow-hidden">
                    <div className="absolute inset-0 bg-slate-800 flex items-center justify-center opacity-20"><Code className="w-20 h-20" /></div>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-40" />
                    <div className="absolute top-6 left-6 p-3 bg-slate-950/90 rounded-2xl border border-slate-800 text-emerald-400">{project.icon}</div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100 gap-6">
                       <p className="px-8 text-center text-slate-100 font-bold text-sm leading-relaxed">{project.description}</p>
                       <div className="flex gap-4">
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-4 bg-white text-slate-950 rounded-2xl hover:bg-emerald-500 transition-all"><Github className="w-5 h-5" /></a>
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-4 bg-white text-slate-950 rounded-2xl hover:bg-emerald-500 transition-all"><ExternalLink className="w-5 h-5" /></a>
                       </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-lg border border-emerald-500/20 mb-4 inline-block">{project.category}</span>
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tight group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                    <div className="flex flex-wrap gap-2">{project.tech.map((t, i) => <span key={i} className="text-[9px] font-black text-slate-500 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800/50">{t}</span>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section - Now Auto-Rotating every 10s */}
        <section id="reviews" className="py-32 px-6 scroll-reveal w-full">
          <div className="max-w-4xl mx-auto overflow-hidden">
            <div className="text-center mb-20 reveal-up">
              <h2 className="text-6xl font-black mb-6 tracking-tighter uppercase">Reviews</h2>
              <p className="text-slate-500 font-bold text-2xl uppercase tracking-tighter">Community Feedback</p>
            </div>
            
            <div className="relative min-h-[350px] flex items-center justify-center">
              {REVIEWS.map((review, idx) => (
                <div 
                  key={idx} 
                  className={`absolute inset-0 p-10 md:p-16 bg-slate-900/50 border border-slate-800 rounded-[3rem] transition-all duration-1000 flex flex-col justify-center
                    ${idx === reviewIndex ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95 pointer-events-none'}`}
                >
                  <div className="absolute top-8 right-12 text-emerald-500/5">
                    <Quote className="w-24 h-24 rotate-180" />
                  </div>
                  <div className="flex gap-1 mb-8">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-emerald-500 text-emerald-500" />)}
                  </div>
                  <p className="text-slate-300 mb-10 italic text-xl md:text-2xl leading-relaxed font-medium">
                    "{review.content}"
                  </p>
                  <div>
                    <h4 className="font-black text-emerald-400 text-2xl uppercase tracking-tighter">{review.name}</h4>
                    <p className="text-xs font-black text-slate-600 uppercase tracking-[0.2em]">{review.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Navigation Dots */}
            <div className="flex justify-center gap-3 mt-12">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewIndex(i)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${i === reviewIndex ? 'w-12 bg-emerald-500' : 'w-3 bg-slate-800 hover:bg-slate-700'}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-32 px-6 scroll-reveal flex items-center justify-center min-h-screen w-full">
          <div className="max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-[4rem] p-10 md:p-24 relative overflow-hidden shadow-2xl w-full">
            <div className="relative z-10 grid lg:grid-cols-2 gap-20">
              <div className="reveal-left">
                <h2 className="text-7xl font-black mb-10 leading-[0.9] uppercase tracking-tighter">Say <span className="text-emerald-400 underline decoration-8 decoration-emerald-500/10 underline-offset-8">Hello</span>.</h2>
                <p className="text-slate-400 mb-12 text-xl font-medium leading-relaxed">Available for Unreal projects, bot development, and technical art collaborations.</p>
                <div className="space-y-10">
                  <div className="flex items-center gap-6 group"><Mail className="w-8 h-8 text-emerald-400" /><div><p className="text-xs text-slate-500 font-black uppercase tracking-widest">Email</p><p className="text-slate-200 font-bold text-xl">{PERSONAL_INFO.email}</p></div></div>
                  <a href={PERSONAL_INFO.discordLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group hover:translate-x-2 transition-transform cursor-pointer"><DiscordIcon className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" /><div><p className="text-xs text-slate-500 font-black uppercase tracking-widest">Discord</p><p className="text-slate-200 font-bold text-xl hover:text-emerald-400 transition-colors">{PERSONAL_INFO.discord}</p></div></a>
                </div>
              </div>
              <form onSubmit={handleContactSubmit} className="space-y-6 reveal-right">
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-8 py-5 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none" placeholder="Name" />
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-8 py-5 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none" placeholder="Email" />
                <textarea rows="4" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-8 py-5 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none resize-none" placeholder="Message"></textarea>
                <button type="submit" disabled={formStatus === 'sending'} className="w-full py-6 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 rounded-2xl font-black text-xl flex items-center justify-center gap-4 transition-all">{formStatus === 'sending' ? 'Sending...' : <>Send Transmission <Terminal className="w-6 h-6" /></>}</button>
                {formStatus === 'success' && <div className="p-4 bg-emerald-500/10 text-emerald-400 text-center font-black rounded-xl animate-pulse mt-4">Transmission Received!</div>}
                {formStatus === 'error' && <div className="p-4 bg-red-500/10 text-red-400 text-center font-black rounded-xl mt-4">Transmission failed.</div>}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-24 px-6 border-t border-slate-900/50 text-center bg-slate-950 relative z-20 mt-auto w-full overflow-hidden">
        <div className="text-6xl font-black text-slate-900 tracking-tighter uppercase mb-12 select-none opacity-20">{PERSONAL_INFO.name.split(' ')[0]}<span className="text-emerald-500">.</span></div>
        <div className="flex justify-center gap-12 mb-12">
           <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-emerald-400 transition-all transform hover:scale-125 cursor-pointer"><Github className="w-8 h-8" /></a>
           <a href={PERSONAL_INFO.discordLink} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-emerald-400 transition-all transform hover:scale-125 flex items-center justify-center cursor-pointer"><DiscordIcon className="w-8 h-8" /></a>
        </div>
        <div className="text-slate-500 font-black text-[10px] uppercase tracking-[0.4em]">&copy; {new Date().getFullYear()} {PERSONAL_INFO.name}</div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        :root, html, body { background-color: #020617 !important; margin: 0; padding: 0; width: 100%; min-height: 100%; color-scheme: dark; overflow-x: hidden; }
        #root { background-color: #020617; min-height: 100vh; display: flex; flex-direction: column; width: 100%; max-width: 100%; overflow-x: hidden; }
        .reveal-up, .reveal-left, .reveal-right { opacity: 0; transition: all 1s cubic-bezier(0.22, 1, 0.36, 1); will-change: transform, opacity; }
        .reveal-up { transform: translateY(40px); }
        .reveal-left { transform: translateX(-40px); }
        .reveal-right { transform: translateX(40px); }
        .is-visible .reveal-up, .is-visible .reveal-left, .is-visible .reveal-right, .is-visible.reveal-up, .is-visible.reveal-left, .is-visible.reveal-right { opacity: 1 !important; transform: translate(0, 0) !important; }
        .perspective-1000 { perspective: 1000px; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #10b981; }
      `}} />
    </div>
  );
};

export default App;