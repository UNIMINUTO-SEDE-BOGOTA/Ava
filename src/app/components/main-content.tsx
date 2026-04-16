import { Play, CheckCircle, Sparkles, BookOpen, User, TrendingUp, HelpCircle, Clock, Wrench, Mail, MessageCircle, X, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import verAva1 from "@/img/Ver_AVA1.png";
import verAva2 from "@/img/Ver_AVA2.png";
import avaIcon from "@/img/ICON AVA.png";
import avapVideo from "/avap.mp4";

// NOTA: Se ha eliminado cualquier burbuja de chat flotante que pudiera existir en otros componentes.
// Si hubiera algún elemento visual de chat emergente, debe ser removido para mantener coherencia con
// la nueva redirección al enlace externo.

export function MainContent({ onStartChat, onViewDemo }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showFullscreenVideo, setShowFullscreenVideo] = useState(false);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  
  // Todas las imágenes de AVA que tienes
  const avaImages = [
    verAva1,
    verAva2,
    // Puedes agregar más imágenes aquí si las tienes
  ];

  // Carrusel automático para las imágenes de AVA
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % avaImages.length);
    }, 3000); // Cambia cada 3 segundos
    return () => clearInterval(interval);
  }, [avaImages.length]);

  // Funciones para manejar los modales
  const openModal = (modalType: string) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Función para abrir/cerrar modal de contacto
  const openContactModal = () => {
    setShowContactModal(true);
  };

  const closeContactModal = () => {
    setShowContactModal(false);
  };

  // Función para abrir video en pantalla completa
  const openFullscreenVideo = () => {
    if (videoRef.current) {
      // Guarda el tiempo actual del video principal
      setCurrentVideoTime(videoRef.current.currentTime);
      // Pausa el video principal si está reproduciéndose
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
    setShowFullscreenVideo(true);
  };

  // Función para cerrar video en pantalla completa
  const closeFullscreenVideo = () => {
    if (fullscreenVideoRef.current) {
      // Guarda el tiempo actual del video en pantalla completa
      setCurrentVideoTime(fullscreenVideoRef.current.currentTime);
      fullscreenVideoRef.current.pause();
    }
    setShowFullscreenVideo(false);
  };

  // Efecto para sincronizar el tiempo cuando se abre el video en pantalla completa
  useEffect(() => {
    if (showFullscreenVideo && fullscreenVideoRef.current) {
      // Establece el tiempo en el video de pantalla completa
      fullscreenVideoRef.current.currentTime = currentVideoTime;
      
      // Reproduce automáticamente después de un pequeño delay
      setTimeout(() => {
        if (fullscreenVideoRef.current) {
          fullscreenVideoRef.current.play().catch(error => {
            console.error("Error al reproducir video en pantalla completa:", error);
          });
        }
      }, 100);
    }
  }, [showFullscreenVideo, currentVideoTime]);

  // Función para redirigir a Teams
  const openTeamsChat = () => {
    window.open('https://teams.microsoft.com/l/chat/0/0?users=calidadyriesgosbgta@uniminuto.edu', '_blank');
  };

  // Función para redirigir a correo
  const openEmail = () => {
    const destinatario = encodeURIComponent('calidadyriesgosbgta@uniminuto.edu');
    const asunto = encodeURIComponent('Consulta sobre AVA');
    window.open(
      `https://outlook.office.com/mail/deeplink/compose?to=${destinatario}&subject=${asunto}`,
      '_blank'
    );
  };

  // Función para centrar en la sección del video
  const scrollToVideo = () => {
    if (videoSectionRef.current) {
      videoSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  // Función para iniciar el chat
  const handleStartChat = () => {
    window.open('https://chat-ava-u.vercel.app', '_blank');
  };

  // Función para ver la demo
  const handleViewDemo = () => {
    if (onViewDemo) {
      onViewDemo();
    } else {
      console.log("Mostrando demo...");
    }
  };

  // Función para manejar la reproducción del video con scroll
  const handlePlayVideoWithScroll = () => {
    scrollToVideo();
    setTimeout(() => {
      handlePlayVideo();
    }, 500);
  };

  // Función para manejar la reproducción del video principal
  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => setIsVideoPlaying(true))
          .catch(error => {
            console.error("Error al reproducir el video:", error);
            setIsVideoPlaying(false);
          });
      }
    }
  };

  const actionButtons = [
    {
      id: "conoceme",
      title: "Conóceme",
      description: "¿Quién es AVA?",
      icon: User,
      modalContent: {
        title: "¿Quién es AVA?",
        content: `AVA (Asistente Virtual de Apoyo) es tu compañera experta en Sistemas de Gestión de Calidad.

Está especializada en la norma ISO 9001:2015 y en buenas prácticas de gestión de calidad. 
Ha sido entrenada en normativas, auditorías y mejora continua, y está disponible para acompañarte en tus procesos en cualquier momento.`
      }
    },
    {
      id: "normas",
      title: "Pautas de AVA",
      description: "Normativas ISO",
      icon: BookOpen,
      modalContent: {
        title: "Normas de Calidad",
        content: `AVA cuenta con conocimientos en estándares de Sistemas de Gestión de Calidad (SGC).

Domina la norma ISO 9001:2015 para sistemas de gestión de calidad, así como la ISO 9000.`
      }
    },
    {
      id: "procesos",
      title: "Procesos",
      description: "Gestión y mejora",
      icon: TrendingUp,
      modalContent: {
        title: "Gestión de Procesos",
        content: `AVA te apoya en el análisis e interpretación de procesos de SGC de UNIMINUTO.

Puede ayudarte a identificar procesos, entender indicadores de SGC y analizar riesgos estratégicos.
Facilita la consulta de herramientas de SGC para la toma de decisiones informadas.`
      }
    },
    {
      id: "ayuda",
      title: "¿Cómo usar?",
      description: "Guía rápida",
      icon: HelpCircle,
      modalContent: {
        title: "¿Cómo usar AVA?",
        content: `Para obtener mejores resultados, formula preguntas claras y específicas, incluyendo contexto para que AVA te pueda brindar una mejor respuesta.
Es recomendable mencionar la norma, el proceso o la situación que deseas consultar.

Por ejemplo, puedes consultar cómo:
• Documentar un procedimiento
• Entender indicadores de SGC
• Realizar una auditoría interna o externa
• Interpretar requisitos de una norma
• Como crear una acción correctiva
• Identificar oportunidades de mejora

Dependiendo de tu caso específico, AVA te hará sugerencias generales sobre qué podrías hacer.

Está diseñada para apoyarte en consultas técnicas, interpretación de requisitos, desarrollo de documentación, preparación de auditorías y análisis de situaciones relacionadas con la gestión de calidad.`
      }
    }
  ];

  const features = [
    "Respuestas instantáneas sobre ISO 9001",
    "Gestión de no conformidades",
    "Guía sobre mejora continua",
    "Simulador de Auditorías Interna/Externa"
  ];

  const upcomingFeatures = [
    "Análisis de indicadores KPI",
    "Asesoría en auditorías de calidad", 
    "Evaluación de riesgos",
    "Integración del asistente AVA al chat de TEAMS"
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Hero Section - VIDEO A LA DERECHA */}
      <div className="bg-gradient-to-br from-[#ffc000] to-[#012657] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Text content con icono de AVA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={avaIcon} alt="AVA" className="w-20 h-20" />
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span className="text-sm text-white">Asistente Virtual de Apoyo</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-5xl lg:text-6xl mb-6 text-white font-bold">
                Conoce a <span className="text-[#012657]">AVA</span>
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mb-8">
                Tu asistente inteligente especializado en Sistemas de Gestión de Calidad.
                Respuestas expertas en ISO 9001, auditorías, mejora continua y más.
              </p>
              
              {/* Botones principales CON CARRUSEL DE IMÁGENES - VERSIÓN MINIMALISTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
                  <button onClick={handleStartChat}
                    className="w-full sm:w-auto px-8 py-4 bg-white text-[#012657] font-semibold rounded-xl hover:bg-yellow-100 transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <img src={avaIcon} alt="AVA" className="w-9 h-9" />
                    Iniciar Chat
                  </button>
                  
                  <div className="relative flex items-center gap-3 w-full sm:w-auto">
                    <button 
                      onClick={handleViewDemo}
                      className="w-full sm:w-auto px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all border border-white/40 hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      Ver Demo
                    </button>

                    {/* Carrusel - oculto en móvil para no interferir */}
                    <div className="relative w-24 h-24 hidden sm:block">
                      {avaImages.map((img, index) => (
                        <motion.img
                          key={index}
                          src={img}
                          alt={`AVA ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover rounded-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                          transition={{ duration: 0.5 }}
                        />
                      ))}
                      <div className="absolute bottom-2 inset-x-0 flex justify-center items-center gap-1">
                        {avaImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones pequeños horizontales */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <p className="text-white/80 text-sm mb-3">Explora más sobre AVA:</p>
                <div className="flex flex-wrap gap-2">
                  {actionButtons.map((button) => {
                    const Icon = button.icon;
                    return (
                      <motion.button
                        key={button.id}
                        onClick={() => openModal(button.id)}
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-transparent text-white px-4 py-2 rounded-lg 
                        border border-white/25 backdrop-blur-sm
                        hover:border-white/60 hover:bg-white/10 transition-all 
                        flex items-center gap-2 min-w-[120px] cursor-pointer"
                      >
                        <Icon className="w-4 h-4" />
                        <div className="text-left">
                          <div className="font-medium text-xs">{button.title}</div>
                          <div className="text-xs opacity-90">{button.description}</div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - VIDEO RECTANGULAR (16:9) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
              ref={videoSectionRef}
            >
              {/* CONTENEDOR RECTANGULAR (16:9) */}
              <div className="relative w-full max-w-2xl h-[22rem] rounded-3xl overflow-hidden shadow-2xl bg-black">
                {/* Video elemento */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover cursor-pointer"
                  poster="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop&q=80"
                  onClick={handlePlayVideo}
                  preload="metadata"
                  playsInline
                  onTimeUpdate={() => {
                    if (videoRef.current) {
                      setCurrentVideoTime(videoRef.current.currentTime);
                    }
                  }}
                >
                  <source src={avapVideo} type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
                
                {/* Botón de expandir video */}
                <button
                  onClick={openFullscreenVideo}
                  className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-sm transition-all hover:scale-110 cursor-pointer shadow-lg z-10"
                  title="Ver video en pantalla completa"
                >
                  <Maximize2 className="w-6 h-6" />
                </button>
                
                {/* Overlay y botón de play */}
                {!isVideoPlaying && (
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 flex flex-col items-center justify-center cursor-pointer"
                    onClick={handlePlayVideo}
                  >
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl mb-6"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <Play className="w-12 h-12 text-white ml-2" />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-center"
                    >
                      <h3 className="text-2xl font-bold text-white mb-2">
                        ¿Quién es AVA?
                      </h3>
                      <p className="text-white/90 max-w-md text-lg">
                        Haz clic para ver la presentación completa
                      </p>
                      <p className="text-white/70 text-sm mt-1">
                        Duración: 49 segundos
                      </p>
                    </motion.div>
                  </div>
                )}
                
                {/* Controles cuando está reproduciendo */}
                {isVideoPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={handlePlayVideo}
                          className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-all hover:scale-105 cursor-pointer"
                        >
                          <span className="text-white font-bold text-lg">⏸️</span>
                        </button>
                        <div>
                          <div className="text-white font-medium">
                            Reproduciendo: ¿Quién es AVA?
                          </div>
                          <div className="text-white/70 text-sm">
                            Haz clic para pausar
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={openFullscreenVideo}
                          className="text-white/90 hover:text-white text-sm bg-gradient-to-r from-orange-500/40 to-orange-600/40 px-3 py-1.5 rounded-full border border-orange-500/30 hover:border-orange-500/60 transition-all cursor-pointer flex items-center gap-2"
                        >
                          <Maximize2 className="w-4 h-4" />
                          Pantalla completa
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal para los botones */}
      <AnimatePresence>
        {activeModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              >
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 sticky top-0 z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {actionButtons.find(b => b.id === activeModal)?.icon && (
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          {(() => {
                            const Icon = actionButtons.find(b => b.id === activeModal)?.icon;
                            return Icon ? <Icon className="w-5 h-5" /> : null;
                          })()}
                        </div>
                      )}
                      <h2 className="text-xl font-bold">
                        {actionButtons.find(b => b.id === activeModal)?.modalContent.title}
                      </h2>
                    </div>
                    <button
                      onClick={closeModal}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                  <div className="p-6">
                    <div className="prose prose-lg max-w-none">
                      {actionButtons.find(b => b.id === activeModal)?.modalContent.content.split('\n').map((line, index) => (
                        <p key={index} className="text-gray-700 mb-3 whitespace-pre-wrap">
                          {line.startsWith('•') || line.startsWith('📋') || line.startsWith('🔧') ? (
                            <span className="flex items-start gap-2">
                              <span className="mt-1">{line.charAt(0)}</span>
                              <span>{line.substring(1)}</span>
                            </span>
                          ) : line.startsWith('**') && line.endsWith('**') ? (
                            <strong className="text-gray-900 block mb-2">
                              {line.replace(/\*\*/g, '')}
                            </strong>
                          ) : (
                            line
                          )}
                        </p>
                      ))}
                    </div>
                  
                    <div className="border-t border-gray-200 mt-8 pt-6 bg-white">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={closeModal}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                        >
                          Cerrar
                        </button>
                        <button
                          onClick={() => {
                            closeModal();
                            handleStartChat();
                          }}
                          className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition cursor-pointer"
                        >
                          Chatear con AVA
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Features Section - DISPONIBLE AHORA - EN AZUL */}
      <div className="bg-gradient-to-br from-blue-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full mb-6">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Disponible Ahora</span>
            </div>
            <h2 className="text-neutral-900 mb-4">¿Qué puede hacer AVA por ti?</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              AVA está diseñado para ser tu compañero experto en gestión de calidad,
              disponible 24/7 para responder tus preguntas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={`current-${index}`}
                initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: -20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  rotateX: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                    damping: 12
                  }
                }}
                whileHover={{ scale: 1.05, y: -8 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer relative"
              >
                {/* Burbuja "Piloto" solo para el último elemento (Simulador de Auditorías) */}
                {index === features.length - 1 && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-2 py-1 rounded-full z-10">
                    Piloto
                  </div>
                )}
                
                <motion.div 
                  className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <CheckCircle className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-neutral-800 font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección Power BI - MÁS GRANDE */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Dashboard de Calidad y Riesgos
            </h2>
            <p className="text-neutral-600 max-w-3xl mx-auto text-lg">
              Visualización en tiempo real de los indicadores de gestión de calidad y riesgos institucionales
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-7xl mx-auto"
          >
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 p-4">
              <div className="relative w-full h-[600px] rounded-2xl overflow-hidden">
                <iframe 
                  title="PB CalidadyRiesgos"
                  width="100%" 
                  height="100%" 
                  src="https://app.powerbi.com/view?r=eyJrIjoiNWQ4ODhlYmQtMGUxMC00ZjU0LTgzMzEtMTIxNTZiZWM0N2EwIiwidCI6ImIxYmE4NWViLWEyNTMtNDQ2Ny05ZWU4LWQ0ZjhlZDRkZjMwMCIsImMiOjR9"
                  frameBorder="0"
                  allowFullScreen={true}
                  className="rounded-xl"
                  style={{ minHeight: '600px' }}
                />
              </div>
              <div className="text-center mt-8 p-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Dashboard interactivo de Power BI</span> - 
                  <span className="text-gray-600 ml-2">Actualizado en tiempo real con indicadores de calidad y gestión de riesgos</span>
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Puedes interactuar con los gráficos, filtrar información y explorar los datos
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Upcoming Features Section - EN DESARROLLO - EN NARANJA */}
      <div className="bg-gradient-to-br from-orange-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full mb-6">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">En Desarrollo</span>
            </div>
            <h2 className="text-neutral-900 mb-4">Próximamente con AVA</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Estamos trabajando en nuevas funcionalidades para hacer de AVA tu aliado 
              aún más completo en gestión de calidad.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {upcomingFeatures.map((feature, index) => (
              <motion.div
                key={`upcoming-${index}`}
                initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: -20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  rotateX: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                    damping: 12
                  }
                }}
                whileHover={{ scale: 1.05, y: -8 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 bg-gradient-to-br from-orange-50 to-white p-4 rounded-xl border border-orange-200 hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer relative"
              >
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-2 py-1 rounded-full">
                  Próximamente
                </div>
                
                <motion.div 
                  className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Wrench className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-neutral-800 font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Video en Pantalla Completa - MODIFICADO */}
      <AnimatePresence>
        {showFullscreenVideo && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeFullscreenVideo}
              className="fixed inset-0 bg-black z-[100] flex items-center justify-center p-4 cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-6xl h-[85vh] rounded-2xl overflow-hidden bg-black"
              >
                {/* Video SEPARADO para pantalla completa */}
                <video
                  ref={fullscreenVideoRef}
                  className="w-full h-full object-contain"
                  autoPlay
                  controls
                  preload="auto"
                  controlsList="nodownload"
                >
                  <source src={avapVideo} type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
                
                <button
                  onClick={closeFullscreenVideo}
                  className="absolute top-6 right-6 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-sm transition-all hover:scale-110 cursor-pointer shadow-lg z-10"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="absolute bottom-6 left-6 text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg z-10">
                  <p className="font-medium">Presentación de AVA</p>
                  <p className="text-sm text-white/70">Asistente Virtual de Apoyo</p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal de Contacto */}
      <AnimatePresence>
        {showContactModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeContactModal}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
              >
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl font-bold">Contáctanos</h2>
                    </div>
                    <button
                      onClick={closeContactModal}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-700 mb-6 text-center">
                    ¿Tienes preguntas o necesitas ayuda? Contáctanos a través de:
                  </p>
                  
                  <div className="space-y-4">
                    <button
                      onClick={openTeamsChat}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-3 cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Chat de Microsoft Teams</span>
                    </button>
                    
                    <button
                      onClick={openEmail}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center gap-3 cursor-pointer"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Correo Electrónico</span>
                    </button>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-gray-600 text-sm text-center">
                      Horario de atención: Lunes a Viernes 8:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-white mb-4">¿Listo para comenzar?</h2>
            <p className="text-orange-100 text-lg mb-8">
              Abre el chat con AVA y comienza a obtener respuestas expertas sobre gestión de calidad
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={handleStartChat}
                className="px-8 py-4 bg-white text-orange-600 rounded-xl hover:bg-neutral-100 transition-all shadow-lg inline-flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <img src={avaIcon} alt="AVA" className="w-9 h-9" />
                Chatear con AVA ahora
              </button>
              
              <button 
                onClick={openContactModal}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                Contáctanos
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
