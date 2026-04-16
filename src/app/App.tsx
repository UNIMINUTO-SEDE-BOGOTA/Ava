import { useState } from "react";
import { MainContent } from "./components/main-content";
// Estos imports se mantienen porque el código comentado los utiliza, pero no afectan la ejecución.
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);

  // Función para iniciar el chat - redirige a la aplicación externa
  const handleStartChat = () => {
    window.open('https://orange-stone-0f7eba510.3.azurestaticapps.net', '_blank');
  };

  const handleViewDemo = () => {
    console.log("Mostrando demo de AVA...");
    setIsDemoOpen(true);
  };

  // Simular mensajes no leídos (ya no se usa porque el botón está comentado, pero se deja por si acaso)
  const simulateNewMessage = () => {
    if (!isChatOpen) {
      setUnreadMessages(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* MainContent contiene los botones principales que redirigen al chat externo */}
      <MainContent 
        onStartChat={handleStartChat}
        onViewDemo={handleViewDemo}
      />
      
      {/* 
        ============================================================
        CHAT SIDEBAR (CHAT INTERNO)
        ============================================================
        Este sidebar se muestra cuando isChatOpen = true. 
        ACTUALMENTE ESTÁ DESHABILITADO PORQUE EL CHAT AHORA REDIRIGE 
        A UNA APLICACIÓN EXTERNA. 
        Para volver a activar el chat interno, descomentar el bloque 
        y ajustar la lógica de handleStartChat.
      */}
      {isChatOpen && (
        <ChatSidebar 
          onClose={() => setIsChatOpen(false)}
          onNewMessage={() => {}}
        />
      )}
      
      {/* 
        ============================================================
        BOTÓN FLOTANTE DE CHAT (DESHABILITADO)
        ============================================================
        Este botón estaba originalmente diseñado para abrir el chat 
        interno. Por requerimiento, ahora el chat se maneja a través 
        del enlace externo (ver handleStartChat) y los botones en 
        MainContent. Se deja este bloque comentado como documentación 
        para futuras referencias. Si se desea restaurar, eliminar los 
        comentarios y ajustar la lógica.

        NOTA: El bloque estaba causando un error de sintaxis por mal 
        cerrado; se ha corregido y comentado adecuadamente.
      */}

      {/*
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        onClick={handleStartChat}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-full shadow-2xl hover:from-orange-600 hover:to-orange-700 transition-all z-40 hover:scale-110 duration-300 group"
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6" />
          {unreadMessages > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {unreadMessages}
            </motion.div>
          )}
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Chatear con AVA
          </div>
        </div>
      </motion.button>
      */}
      
      {/* Demo Interface (sin cambios) */}
      {isDemoOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <h2 className="text-xl font-bold">Demo de AVA</h2>
              <button 
                onClick={() => setIsDemoOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-4 h-[calc(90vh-80px)] overflow-y-auto">
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold mb-4">Demo de AVA en acción</h3>
                <p className="text-gray-600 mb-6">
                  Esta es una demostración de cómo AVA puede ayudarte con la gestión de calidad.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100">
                    <h4 className="font-bold text-blue-700 mb-3">ISO 9001</h4>
                    <p className="text-gray-700 mb-4">Consulta sobre la implementación de sistemas de gestión de calidad</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl border border-orange-100">
                    <h4 className="font-bold text-orange-700 mb-3">Auditorías</h4>
                    <p className="text-gray-700 mb-4">Preparación y ejecución de auditorías internas y externas</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl border border-green-100">
                    <h4 className="font-bold text-green-700 mb-3">Mejora Continua</h4>
                    <p className="text-gray-700 mb-4">Implementación de ciclos PDCA y optimización de procesos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;