import { Play, CheckCircle, Sparkles, BookOpen, User, TrendingUp, HelpCircle, Mail, MessageCircle, X, Maximize2, Zap, Shield, Target, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import verAva1 from "@/img/Ver_AVA1.png";
import verAva2 from "@/img/Ver_AVA2.png";
import avaIcon from "@/img/ICON AVA.png";
import avapVideo from "/avap.mp4";

export function MainContent({ onStartChat }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showFullscreenVideo, setShowFullscreenVideo] = useState(false);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  
  const avaImages = [verAva1, verAva2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % avaImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [avaImages.length]);

  const openModal = (modalType: string) => setActiveModal(modalType);
  const closeModal = () => setActiveModal(null);
  const openContactModal = () => setShowContactModal(true);
  const closeContactModal = () => setShowContactModal(false);

  const openFullscreenVideo = () => {
    if (videoRef.current) {
      setCurrentVideoTime(videoRef.current.currentTime);
      if (isVideoPlaying) videoRef.current.pause();
      setIsVideoPlaying(false);
    }
    setShowFullscreenVideo(true);
  };

  const closeFullscreenVideo = () => {
    if (fullscreenVideoRef.current) {
      setCurrentVideoTime(fullscreenVideoRef.current.currentTime);
      fullscreenVideoRef.current.pause();
    }
    setShowFullscreenVideo(false);
  };

  useEffect(() => {
    if (showFullscreenVideo && fullscreenVideoRef.current) {
      fullscreenVideoRef.current.currentTime = currentVideoTime;
      setTimeout(() => {
        fullscreenVideoRef.current?.play().catch(console.error);
      }, 100);
    }
  }, [showFullscreenVideo, currentVideoTime]);

  const openTeamsChat = () => {
    window.open('https://teams.microsoft.com/l/chat/0/0?users=calidadyriesgosbgta@uniminuto.edu', '_blank');
  };

  const openEmail = () => {
    const destinatario = encodeURIComponent('calidadyriesgosbgta@uniminuto.edu');
    const asunto = encodeURIComponent('Consulta sobre AVA');
    window.open(`https://outlook.office.com/mail/deeplink/compose?to=${destinatario}&subject=${asunto}`, '_blank');
  };

  const handleStartChat = () => {
    window.open('https://chat-ava-u.vercel.app', '_blank');
  };

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsVideoPlaying(true)).catch(console.error);
      }
    }
  };

  const actionButtons = [
    { id: "conoceme", title: "Conóceme", description: "¿Quién es AVA?", icon: User, color: "#e15e29",
      modalContent: { title: "¿Quién es AVA?", content: `AVA (Asistente Virtual de Apoyo) es tu compañera experta en Sistemas de Gestión de Calidad.\n\nEstá especializada en la norma ISO 9001:2015 y en buenas prácticas de gestión de calidad. Ha sido entrenada en normativas, auditorías y mejora continua, y está disponible para acompañarte en tus procesos en cualquier momento.` } },
    { id: "normas", title: "Pautas de AVA", description: "Normativas ISO", icon: BookOpen, color: "#008b8b",
      modalContent: { title: "Normas de Calidad", content: `AVA cuenta con conocimientos en estándares de Sistemas de Gestión de Calidad (SGC).\n\nDomina la norma ISO 9001:2015 para sistemas de gestión de calidad, así como la ISO 9000.` } },
    { id: "procesos", title: "Procesos", description: "Gestión y mejora", icon: TrendingUp, color: "#2e5871",
      modalContent: { title: "Gestión de Procesos", content: `AVA te apoya en el análisis e interpretación de procesos de SGC de UNIMINUTO.\n\nPuede ayudarte a identificar procesos, entender indicadores de SGC y analizar riesgos estratégicos. Facilita la consulta de herramientas de SGC para la toma de decisiones informadas.` } },
    { id: "ayuda", title: "¿Cómo usar?", description: "Guía rápida", icon: HelpCircle, color: "#d1b742",
      modalContent: { 
  title: "Como usar AVA", 
  content: `Para iniciar cualquier chat con AVA, simplemente escribe "HOLA".

AVA esta entrenada para ser lo mas detallada posible en Sistemas de Gestion de Calidad.

Ejemplos de consultas:
Consulta Tecnica ISO 9001:2015
Entender indicadores de SGC
Realizar una auditoria
Identificar oportunidades de mejora

Escribe "HOLA" para comenzar.` 
}
    }
  ];

  const features = [
    { text: "Respuestas instantáneas sobre ISO 9001", icon: Zap, color: "#e15e29" },
    { text: "Consulta Glorario del SGC", icon: Shield, color: "#008b8b" },
    { text: "Preguntas sobre ISOLUCION", icon: Target, color: "#2e5871" },
    { text: "Simulador de Auditorías", icon: Layers, color: "#d1b742" }
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Hero Section con fondo dinámico de estrellas fugaces */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Fondo animado con gradientes y partículas */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e15e29] via-[#2e5871] to-[#008b8b]" />
        
        {/* Animación de ondas/estrellas fugaces */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Estrella fugaz 1 */}
          <motion.div
            className="absolute w-1 h-1 bg-white rounded-full shadow-lg"
            style={{ boxShadow: "0 0 20px 2px rgba(255,255,255,0.8)" }}
            animate={{
              x: ["0%", "100%"],
              y: ["0%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0,
              ease: "linear"
            }}
          />
          {/* Estrella fugaz 2 */}
          <motion.div
            className="absolute w-0.5 h-0.5 bg-[#d1b742] rounded-full"
            style={{ boxShadow: "0 0 15px 2px rgba(209,183,66,0.8)" }}
            animate={{
              x: ["100%", "0%"],
              y: ["20%", "80%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 1,
              ease: "linear"
            }}
          />
          {/* Estrella fugaz 3 */}
          <motion.div
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{ boxShadow: "0 0 12px 1px rgba(255,255,255,0.8)" }}
            animate={{
              x: ["-20%", "120%"],
              y: ["50%", "30%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: 0.5,
              ease: "linear"
            }}
          />
          {/* Estrella fugaz 4 */}
          <motion.div
            className="absolute w-0.5 h-0.5 bg-[#e15e29] rounded-full"
            style={{ boxShadow: "0 0 15px 2px rgba(225,94,41,0.8)" }}
            animate={{
              x: ["50%", "-20%"],
              y: ["-10%", "90%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 2,
              ease: "linear"
            }}
          />
          {/* Estrella fugaz 5 */}
          <motion.div
            className="absolute w-1 h-1 bg-[#008b8b] rounded-full"
            style={{ boxShadow: "0 0 20px 2px rgba(0,139,139,0.8)" }}
            animate={{
              x: ["120%", "-20%"],
              y: ["80%", "20%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              delay: 1.5,
              ease: "linear"
            }}
          />
          {/* Estrella fugaz 6 - más grande */}
          <motion.div
            className="absolute w-1.5 h-1.5 bg-white rounded-full"
            style={{ boxShadow: "0 0 25px 3px rgba(255,255,255,0.9)" }}
            animate={{
              x: ["0%", "100%"],
              y: ["60%", "0%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              delay: 0.8,
              ease: "linear"
            }}
          />
          {/* Estrella fugaz 7 */}
          <motion.div
            className="absolute w-0.5 h-0.5 bg-[#d1b742] rounded-full"
            style={{ boxShadow: "0 0 18px 2px rgba(209,183,66,0.8)" }}
            animate={{
              x: ["80%", "-10%"],
              y: ["10%", "70%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              delay: 2.5,
              ease: "linear"
            }}
          />
          {/* Estrella fugaz 8 */}
          <motion.div
            className="absolute w-1 h-1 bg-[#e15e29] rounded-full"
            style={{ boxShadow: "0 0 20px 2px rgba(225,94,41,0.8)" }}
            animate={{
              x: ["-10%", "110%"],
              y: ["30%", "50%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              delay: 3,
              ease: "linear"
            }}
          />
        </div>

        {/* Partículas estáticas (estrellas fijas) */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/30 to-white/10 blur-xl" />
                  <img src={avaIcon} alt="AVA" className="relative w-20 h-20 rounded-2xl shadow-2xl" />
                </motion.div>
                <div className="backdrop-blur-xl bg-white/20 rounded-full px-4 py-2 border border-white/30">
                  <Sparkles className="w-4 h-4 text-[#d1b742] inline mr-2" />
                  <span className="text-sm text-white">Asistente Virtual de Apoyo</span>
                </div>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold">
                <span className="text-white">Conoce a </span>
                <span className="bg-gradient-to-r from-[#d1b742] via-white to-[#d1b742] bg-clip-text text-transparent">AVA</span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
                Tu asistente inteligente especializado en Sistemas de Gestión de Calidad.
                Respuestas expertas en ISO 9001, auditorías, mejora continua y más.
              </p>
              
              {/* Botones principales - mismo tamaño */}
              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={handleStartChat}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 rounded-xl overflow-hidden shadow-2xl cursor-pointer min-w-[200px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#e15e29] to-[#e15e29]/80" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center justify-center gap-3">
                    <img src={avaIcon} alt="AVA" className="w-7 h-7" />
                    <span className="text-white font-semibold">Iniciar Chat con AVA</span>
                  </div>
                </motion.button>
                
                <motion.button
                  onClick={openContactModal}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="backdrop-blur-xl bg-white/10 border border-white/30 px-8 py-4 rounded-xl text-white font-semibold hover:bg-white/20 transition-all cursor-pointer flex items-center justify-center gap-2 min-w-[160px]"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contáctanos
                </motion.button>
              </div>

              {/* Botones pequeños - todos del mismo tamaño */}
              <div className="pt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {actionButtons.map((button) => {
                    const Icon = button.icon;
                    return (
                      <motion.button
                        key={button.id}
                        onClick={() => openModal(button.id)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ borderColor: `${button.color}40` }}
                        className="backdrop-blur-xl bg-white/10 border rounded-xl px-3 py-3 transition-all hover:bg-white/20 cursor-pointer group min-w-[120px]"
                      >
                        <div className="flex flex-col items-center text-center gap-1">
                          <Icon className="w-5 h-5" style={{ color: button.color }} />
                          <div className="text-left">
                            <div className="font-medium text-white text-xs">{button.title}</div>
                            <div className="text-white/60 text-[10px]">{button.description}</div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right side - Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
              ref={videoSectionRef}
            >
              <div className="relative w-full max-w-2xl">
                <div className="absolute -inset-4 bg-gradient-to-r from-white/20 via-[#d1b742]/20 to-white/20 rounded-3xl blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl bg-black/30 border border-white/20">
                  <div className="relative aspect-video">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover cursor-pointer"
                      poster="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop&q=80"
                      onClick={handlePlayVideo}
                      preload="metadata"
                      playsInline
                      onTimeUpdate={() => videoRef.current && setCurrentVideoTime(videoRef.current.currentTime)}
                    >
                      <source src={avapVideo} type="video/mp4" />
                    </video>
                    
                    <button
                      onClick={openFullscreenVideo}
                      className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-2 rounded-full transition-all hover:scale-110 cursor-pointer z-10"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                    
                    {!isVideoPlaying && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 flex flex-col items-center justify-center cursor-pointer" onClick={handlePlayVideo}>
                        <motion.div 
                          className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl mb-4"
                          style={{ background: "linear-gradient(135deg, #e15e29, #d1b742)" }}
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                        >
                          <Play className="w-10 h-10 text-white ml-1" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-white mb-1">¿Quién es AVA?</h3>
                        <p className="text-white/80 text-sm">Duración: 49 segundos</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section - Tarjetas del mismo tamaño */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-6 backdrop-blur-xl bg-gradient-to-r from-[#e15e29]/10 to-[#008b8b]/10 border border-[#e15e29]/20">
              <CheckCircle className="w-5 h-5 text-[#008b8b]" />
              <span className="text-sm font-medium text-[#2e5871]">Disponible Ahora</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#e15e29] via-[#d1b742] to-[#008b8b] bg-clip-text text-transparent">
                ¿Qué puede hacer AVA por ti?
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              AVA está diseñado para ser tu compañero experto en gestión de calidad, disponible 24/7
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative cursor-pointer h-full"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#e15e29] via-[#d1b742] to-[#008b8b] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
                  <div className="relative backdrop-blur-xl bg-white/80 rounded-2xl p-6 border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                    <motion.div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}cc)` }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="font-semibold text-gray-800 text-base mb-2">{feature.text}</h3>
                    <div className="flex-1" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r from-[#e15e29]/10 to-[#008b8b]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Sparkles className="w-4 h-4 text-[#d1b742]" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sección Power BI */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2e5871]/5 via-transparent to-[#e15e29]/5" />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#2e5871] to-[#008b8b] bg-clip-text text-transparent">
                Dashboard de Calidad y Riesgos
              </span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Visualización en tiempo real de los indicadores de gestión de calidad y riesgos institucionales
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-[#e15e29]/20 via-[#d1b742]/20 to-[#008b8b]/20 rounded-3xl blur-2xl" />
            <div className="relative backdrop-blur-xl bg-white/40 rounded-3xl overflow-hidden shadow-2xl border border-white/50 p-4">
              <div className="relative w-full h-[600px] rounded-2xl overflow-hidden">
                <iframe 
                  title="PB CalidadyRiesgos"
                  width="100%" 
                  height="100%" 
                  src="https://app.powerbi.com/view?r=eyJrIjoiNWQ4ODhlYmQtMGUxMC00ZjU0LTgzMzEtMTIxNTZiZWM0N2EwIiwidCI6ImIxYmE4NWViLWEyNTMtNDQ2Ny05ZWU4LWQ0ZjhlZDRkZjMwMCIsImMiOjR9"
                  frameBorder="0"
                  allowFullScreen
                  className="rounded-xl"
                />
              </div>
              <div className="text-center mt-6 p-4 backdrop-blur-sm bg-white/30 rounded-xl">
                <p className="text-gray-700">
                  <span className="font-semibold text-[#2e5871]">Dashboard interactivo de Power BI</span>
                  <span className="text-gray-600 ml-2">- Actualizado en tiempo real</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e15e29] via-[#2e5871] to-[#008b8b]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">¿Listo para comenzar?</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Abre el chat con AVA y comienza a obtener respuestas expertas sobre gestión de calidad
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <motion.button
                onClick={handleStartChat}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 rounded-xl overflow-hidden shadow-2xl cursor-pointer min-w-[220px]"
              >
                <div className="absolute inset-0 bg-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#e15e29] to-[#d1b742] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center justify-center gap-3">
                  <img src={avaIcon} alt="AVA" className="w-7 h-7" />
                  <span className="font-semibold text-[#2e5871] group-hover:text-white transition-colors">Chatear con AVA ahora</span>
                </div>
              </motion.button>
              
              <motion.button
                onClick={openContactModal}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="backdrop-blur-xl bg-white/10 border border-white/30 px-8 py-4 rounded-xl text-white font-semibold hover:bg-white/20 transition-all cursor-pointer flex items-center justify-center gap-2 min-w-[160px]"
              >
                <MessageCircle className="w-5 h-5" />
                Contáctanos
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modales - mantener igual */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#e15e29] via-[#d1b742] to-[#008b8b] rounded-2xl blur-xl opacity-50" />
              <div className="relative backdrop-blur-xl bg-white/95 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-gray-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#e15e29] to-[#d1b742] flex items-center justify-center">
                        {(() => {
                          const Icon = actionButtons.find(b => b.id === activeModal)?.icon;
                          return Icon ? <Icon className="w-5 h-5 text-white" /> : null;
                        })()}
                      </div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {actionButtons.find(b => b.id === activeModal)?.modalContent.title}
                      </h2>
                    </div>
                    <button onClick={closeModal} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition cursor-pointer">
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <div className="prose prose-lg max-w-none">
                    {actionButtons.find(b => b.id === activeModal)?.modalContent.content.split('\n').map((line, idx) => (
                      <p key={idx} className="text-gray-700 mb-3 whitespace-pre-wrap">
                        {line.startsWith('•') ? (
                          <span className="flex items-start gap-2">
                            <span className="text-[#e15e29] mt-1">•</span>
                            <span>{line.substring(1)}</span>
                          </span>
                        ) : line}
                      </p>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 mt-6 pt-6 flex justify-end gap-3">
                    <button onClick={closeModal} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition cursor-pointer">Cerrar</button>
                    <button onClick={() => { closeModal(); handleStartChat(); }} className="px-6 py-2 bg-gradient-to-r from-[#e15e29] to-[#e15e29]/80 text-white rounded-lg hover:shadow-lg transition cursor-pointer">Chatear con AVA</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Contacto */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeContactModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#e15e29] via-[#d1b742] to-[#008b8b] rounded-2xl blur-xl opacity-50" />
              <div className="relative backdrop-blur-xl bg-white/95 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-gray-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#e15e29] to-[#d1b742] flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-800">Contáctanos</h2>
                    </div>
                    <button onClick={closeContactModal} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition cursor-pointer">
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-6 text-center">¿Tienes preguntas o necesitas ayuda?</p>
                  <div className="space-y-4">
                    <button onClick={openTeamsChat} className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#008b8b] to-[#008b8b]/80 text-white hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer">
                      <MessageCircle className="w-5 h-5" /> Chat de Microsoft Teams
                    </button>
                    <button onClick={openEmail} className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#e15e29] to-[#e15e29]/80 text-white hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer">
                      <Mail className="w-5 h-5" /> Correo Electrónico
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Video Fullscreen */}
      <AnimatePresence>
        {showFullscreenVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFullscreenVideo}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl h-[85vh] rounded-2xl overflow-hidden bg-black"
            >
              <video ref={fullscreenVideoRef} className="w-full h-full object-contain" autoPlay controls preload="auto" controlsList="nodownload">
                <source src={avapVideo} type="video/mp4" />
              </video>
              <button onClick={closeFullscreenVideo} className="absolute top-6 right-6 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all hover:scale-110 cursor-pointer z-10">
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-6 left-6 text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="font-medium">Presentación de AVA</p>
                <p className="text-sm text-white/70">Asistente Virtual de Apoyo</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}