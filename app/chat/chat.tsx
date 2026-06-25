"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Definición para compatibilidad con navegadores que usan prefijo
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const FloatingChat: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "user" | "ia"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false); // <-- NUEVO: Estado para el micrófono
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null); // <-- NUEVO: Ref para la instancia de SpeechRecognition
  const router = useRouter(); // <-- NUEVO: Hook para la navegación

  // Auto-scroll al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // NUEVO: Efecto para inicializar el reconocimiento de voz
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false; // Solo una frase a la vez
      recognition.lang = 'es-ES'; // Establecer idioma a español
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleSend(transcript, true); // Enviar automáticamente y solicitar respuesta por voz
      };

      recognition.onerror = (event: any) => {
        console.error("Error de reconocimiento de voz:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn("El reconocimiento de voz no es compatible con este navegador.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Se deshabilita la advertencia de dependencias porque handleSend se usa de una manera que evita cierres viciados.

  const handleSend = async (messageText?: string, speakResponse: boolean = false) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    const userText = textToSend;
    // 1. Mostrar mensaje del usuario inmediatamente
    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setInput("");
    setIsLoading(true);

    try {
      // 2. Llamar a TU propio backend (protegido)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al conectar con el servidor");
      }

      // 3. Mostrar respuesta de la IA
      setMessages((prev) => [...prev, { from: "ia", text: data.reply }]);

      // NUEVO: Reproducir la respuesta si se solicitó
      if (speakResponse && data.reply) {
        window.speechSynthesis.cancel(); // Cancela cualquier habla anterior
        const utterance = new SpeechSynthesisUtterance(data.reply);
        utterance.lang = "es-ES";
        // NUEVO: Navegar a /explore cuando termine de hablar
        utterance.onend = () => {
          router.push('/explore');
        };
        window.speechSynthesis.speak(utterance);
      }

    } catch (error: any) {
      console.error("Error chat:", error);
      setMessages((prev) => [
        ...prev,
        { from: "ia", text: `⚠️ Hubo un error: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // NUEVO: Handler para el clic en el micrófono
  const handleMicClick = () => {
    if (!recognitionRef.current) {
      alert("El reconocimiento de voz no es compatible con tu navegador.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  return (
    <div>
      {/* Botón Flotante */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 1000,
            borderRadius: "50%", width: 60, height: 60,
            background: "linear-gradient(135deg, #2ecc40 0%, #fff 60%, #27ae60 100%)",
            color: "#222", border: "2px solid #808080", fontSize: 30,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}
          aria-label="Abrir chat"
        >
          💬
        </button>
      )}

      {/* Ventana del Chat */}
      {open && (
        <div
          style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 1000,
            width: 340, height: 480,
            background: "#fff", borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            display: "flex", flexDirection: "column", overflow: "hidden",
            border: "1px solid #e0e0e0"
          }}
        >
          {/* Cabecera */}
          <div
            style={{
              background: "linear-gradient(90deg, #2ecc40 0%, #27ae60 100%)",
              color: "#fff", padding: "16px", fontWeight: "bold",
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}
          >
            <span>Asistente Virtual</span>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "transparent", border: "none", color: "#fff", fontSize: 24, cursor: "pointer" }}
            >
              ×
            </button>
          </div>

          {/* Área de Mensajes */}
          <div
            style={{
              flex: 1, padding: 16, overflowY: "auto", background: "#f9f9f9",
              display: "flex", flexDirection: "column", gap: 12
            }}
          >
            {messages.length === 0 && (
              <div style={{ textAlign: "center", color: "#888", marginTop: "40%", fontSize: 14 }}>
                👋 ¡Hola! ¿En qué puedo ayudarte hoy Turista?
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                  background: msg.from === "user" ? "#2ecc40" : "#fff",
                  color: msg.from === "user" ? "#fff" : "#333",
                  borderRadius: "12px", borderBottomRightRadius: msg.from === "user" ? 0 : 12, borderBottomLeftRadius: msg.from === "user" ? 12 : 0,
                  padding: "10px 14px", maxWidth: "80%", fontSize: "14px", lineHeight: "1.5",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
                }}
              >
                <div>{msg.text}</div>
                
                {/* NUEVO: Opción Explora debajo del mensaje si es de la IA */}
                {msg.from === "ia" && (
                  <div style={{ marginTop: "8px", borderTop: "1px solid #eee", paddingTop: "8px", textAlign: "right" }}>
                    <Link 
                      href="/explore" 
                      style={{ color: "#27ae60", textDecoration: "none", fontWeight: "bold", fontSize: "12px" }}
                    >
                      Explora ➔
                    </Link>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div style={{ alignSelf: "flex-start", background: "#eee", padding: "8px 12px", borderRadius: 12, fontSize: 12, color: "#666" }}>
                Escribiendo...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ padding: 12, borderTop: "1px solid #eee", background: "#fff", display: "flex", gap: 8 }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe tu mensaje..."
              disabled={isLoading}
              style={{
                flex: 1, padding: "10px 12px", borderRadius: 20,
                border: "1px solid #ddd", outline: "none", fontSize: 14
              }}
            />
            {/* NUEVO: Botón de Micrófono */}
            <button
              onClick={handleMicClick}
              disabled={isLoading}
              style={{
                background: isListening ? "#e74c3c" : "#f0f0f0",
                color: isListening ? "#fff" : "#333",
                border: "1px solid #ddd",
                borderRadius: "50%",
                width: 40, height: 40,
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18,
                transition: "background 0.3s"
              }}
            >
              🎤
            </button>
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              style={{
                background: isLoading ? "#ccc" : "#2ecc40",
                color: "#fff", border: "none", borderRadius: "50%",
                width: 40, height: 40, cursor: isLoading ? "default" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChat;