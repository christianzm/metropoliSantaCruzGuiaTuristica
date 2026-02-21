"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link"; // <-- NUEVO: Importación para la navegación

const FloatingChat: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "user" | "ia"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
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
            <button
              onClick={handleSend}
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