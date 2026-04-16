import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import avaIcon from "@/img/ICON AVA.png";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "¡Hola! Soy tu asistente especializado en Sistemas de Gestión de Calidad. Puedo ayudarte con ISO 9001, mejora continua, auditorías, procesos de calidad y mucho más. ¿En qué puedo asistirte hoy?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("iso") || input.includes("9001")) {
      return "La norma ISO 9001 es el estándar internacional para sistemas de gestión de calidad. Establece los requisitos para implementar un SGC efectivo, enfocándose en la satisfacción del cliente, el liderazgo, la participación del personal, el enfoque basado en procesos y la mejora continua. ¿Te gustaría saber más sobre algún requisito específico?";
    }
    
    if (input.includes("auditor") || input.includes("auditoría")) {
      return "Las auditorías de calidad son fundamentales para verificar el cumplimiento de los requisitos del SGC. Existen tres tipos principales: auditorías internas (primera parte), auditorías a proveedores (segunda parte) y auditorías de certificación (tercera parte). ¿Necesitas orientación sobre cómo preparar o realizar una auditoría?";
    }
    
    if (input.includes("mejora continua") || input.includes("pdca") || input.includes("phva")) {
      return "El ciclo PDCA (Plan-Do-Check-Act) o PHVA (Planificar-Hacer-Verificar-Actuar) es la base de la mejora continua. Este enfoque sistemático permite a las organizaciones: 1) Planificar objetivos y procesos, 2) Implementar lo planificado, 3) Verificar resultados, y 4) Actuar sobre las desviaciones. ¿Quieres ejemplos de aplicación práctica?";
    }
    
    if (input.includes("indicador") || input.includes("kpi") || input.includes("métrica")) {
      return "Los indicadores de calidad (KPIs) son métricas clave para monitorear el desempeño del SGC. Algunos indicadores comunes incluyen: tasa de defectos, satisfacción del cliente, tiempo de ciclo, cumplimiento de entregas y costos de no calidad. Es importante que sean SMART: Específicos, Medibles, Alcanzables, Relevantes y Temporales. ¿Necesitas ayuda para definir indicadores para tu proceso?";
    }
    
    if (input.includes("no conformidad") || input.includes("acción correctiva")) {
      return "Una no conformidad es el incumplimiento de un requisito especificado. Cuando se detecta, debe iniciarse una acción correctiva que incluye: 1) Identificar y corregir el problema inmediato, 2) Investigar la causa raíz (usando herramientas como 5 Por Qués o Diagrama de Ishikawa), 3) Implementar acciones para eliminar la causa, y 4) Verificar la eficacia. ¿Tienes alguna no conformidad específica que analizar?";
    }
    
    if (input.includes("documentación") || input.includes("procedimiento") || input.includes("registro")) {
      return "La documentación del SGC incluye la política de calidad, objetivos, procedimientos, instrucciones de trabajo y registros. Según ISO 9001:2015, la documentación debe ser apropiada al contexto de la organización. Es clave mantenerla controlada, actualizada y accesible. Los registros proporcionan evidencia de conformidad y eficacia del sistema. ¿Necesitas orientación sobre qué documentar?";
    }
    
    if (input.includes("satisfacción del cliente") || input.includes("cliente")) {
      return "La satisfacción del cliente es un resultado clave del SGC. Se puede medir mediante: encuestas de satisfacción, análisis de quejas y reclamos, evaluación de cumplimiento de requisitos, y retroalimentación directa. Es fundamental establecer canales de comunicación efectivos y responder proactivamente a las necesidades del cliente. ¿Quieres conocer métodos para mejorar la satisfacción del cliente?";
    }
    
    if (input.includes("riesgo") || input.includes("análisis de riesgo")) {
      return "El enfoque basado en riesgos es fundamental en ISO 9001:2015. Implica identificar riesgos y oportunidades que pueden afectar la conformidad de productos/servicios y la satisfacción del cliente. Las organizaciones deben: evaluar probabilidad e impacto, priorizar riesgos, implementar controles preventivos, y monitorear su eficacia. ¿Te gustaría información sobre herramientas de análisis de riesgos?";
    }
    
    if (input.includes("hola") || input.includes("ayuda") || input.includes("help")) {
      return "¡Con gusto! Puedo ayudarte con temas como: ISO 9001, auditorías de calidad, mejora continua (PDCA), indicadores de desempeño, acciones correctivas, gestión de riesgos, documentación del SGC, y satisfacción del cliente. ¿Sobre qué tema específico te gustaría conversar?";
    }
    
    if (input.includes("gracias")) {
      return "¡De nada! Estoy aquí para ayudarte con cualquier duda sobre gestión de calidad. No dudes en preguntar si necesitas más información.";
    }
    
    return "Entiendo tu consulta sobre calidad. Para brindarte la mejor respuesta, podría ser más específico sobre: ¿Te refieres a implementación de ISO 9001, resolución de no conformidades, desarrollo de indicadores, preparación de auditorías, o mejora de procesos? Cuéntame más detalles para poder asistirte mejor.";
  };

  const suggestedQuestions = [
    "¿Qué es ISO 9001?",
    "¿Cómo preparar una auditoría?",
    "Explícame el ciclo PDCA",
    "¿Qué son los KPIs de calidad?",
  ];

  return (
    <div className="w-full max-w-4xl h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
                message.sender === "user"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {message.sender === "ai" && (
                <div className="flex items-center gap-2 mb-1">
                  <img src={avaIcon} alt="AVA" className="w-4 h-4 rounded-full" />
                  <span className="text-xs text-indigo-600">Asistente IA</span>
                </div>
              )}
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[70%] rounded-2xl px-4 py-3 bg-gray-100">
              <div className="flex items-center gap-2">
                <img src={avaIcon} alt="AVA" className="w-4 h-4 rounded-full" />
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-4 sm:px-6 pb-3">
          <p className="text-xs text-muted-foreground mb-2">Preguntas sugeridas:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputValue(question)}
                className="px-3 py-1.5 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe tu pregunta sobre calidad..."
            className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
