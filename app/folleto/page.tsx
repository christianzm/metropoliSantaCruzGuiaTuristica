"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
// Si usas lucide-react:
import { Menu, X } from "lucide-react";

const Folletos = () => {
  const [selectedFolleto, setSelectedFolleto] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const folletos = [
    {
      id: 1,
      titulo: "Guía de Santa Cruz",
      descripcion: "Descubre la capital oriental con esta guía completa",
      imagen: "/folleto/imagen1.png",
      pdf: "/folleto/GUIA1.pdf",
      flipLink:
        "https://www.flipbookpdf.net/web/site/4a7228472db7afcd145adacdb37da9111da26deb202506.pdf.html",
      portadaFlip:
        "https://www.flipbookpdf.net/web/files/flipbooks/4a7228472db7afcd145adacdb37da9111da26deb202506.pdf/1.jpg",
    },
  ];

  const openFolleto = (folleto: React.SetStateAction<null>) => {
    setSelectedFolleto(folleto);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedFolleto(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* NAVBAR INICIO */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between md:grid md:grid-cols-3 md:items-center">
          {/* Logo y nombre */}
          <Link
            href="/"
            className="flex items-center gap-3 select-none hover:opacity-80 transition"
          >
            <img
              src="/logo upds verde.png"
              alt="Logo UPDS"
              className="w-10 h-10"
            />
            <img
              src="/Logotipo 3 verde.png"
              alt="Turismo Metropolitano Logo"
              className="w-10 h-10"
            />
            <span className="font-bold text-green-700 text-2xl">
              Turismo Metropolitano
            </span>
          </Link>
          {/* Enlaces centrados (desktop) */}
          <div className="hidden md:flex justify-center">
            <div className="flex gap-8 items-center">
              <Link
                href="/"
                className={`transition-colors hover:text-green-400 ${
                  isScrolled
                    ? "text-gray-700 hover:text-green-600"
                    : "text-black"
                }`}
              >
                Inicio
              </Link>
              <Link
                href="/explore"
                className={`transition-colors hover:text-green-400 ${
                  isScrolled
                    ? "text-gray-700 hover:text-green-600"
                    : "text-black"
                }`}
              >
                Explorar
              </Link>
                             <Link
                href="/infosantacruz"
                className={`transition-colors hover:text-green-400 ${
                  isScrolled
                    ? "text-gray-700 hover:text-green-600"
                    : "text-black"
                }`}
              >
                Santa Cruz
              </Link>
              <Link
                href="/entretenimiento"
                className={`transition-colors hover:text-green-400 ${
                  isScrolled
                    ? "text-gray-700 hover:text-green-600"
                    : "text-black"
                }`}
              >
                Rincones para Disfrutar
              </Link>
            </div>
          </div>
          {/* Botón menú móvil */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="w-6 h-6 text-green-700" />
              ) : (
                <Menu className="w-6 h-6 text-green-700" />
              )}
            </button>
          </div>
          {/* Espacio vacío solo en desktop */}
          <div className="hidden md:block" />
        </div>
        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden bg-white px-4 pb-4">
            <div className="flex flex-col items-start gap-4">
              <Link
                href="/"
                className="hover:text-green-700 transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/explore"
                className="hover:text-green-700 transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Explorar
              </Link>
              <Link
                href="/infosantacruz"
                className="hover:text-green-700 transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Santa Cruz
              </Link>
              <Link
                href="/entretenimiento"
                className="hover:text-green-700 transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Rincones para Disfrutar
              </Link>
            </div>
          </div>
        )}
      </nav>
      {/* NAVBAR FIN */}

      <main className="flex-grow">
        <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px]">
          <img
            src="..\images\imag2.jpg"
            alt="Folletos y guías digitales"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl md:text-9xl font-bold text-white font-serif italic drop-shadow-lg px-6 text-center">
              Folletos y guías digitales
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center mt-12 mb-10 px-4">
          <div className="w-20 h-[3px] mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"></div>
          <p className="text-base md:text-lg text-gray-700 font-normal leading-relaxed font-sans">
            Vive una experiencia inolvidable en Santa Cruz. Explora nuestras
            rutas, sabores y cultura con guías digitales diseñadas para ayudarte
            a descubrir lo mejor de cada destino.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {folletos.map((folleto) => (
              <div
                key={folleto.id}
                className="bg-white border border-gray-100 rounded-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={folleto.imagen}
                    alt={folleto.titulo}
                    className="w-full h-[40rem] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">
                    {folleto.titulo}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{folleto.descripcion}</p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => openFolleto(folleto)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Ver
                    </button>
                    <a
                      href={folleto.pdf}
                      download="GUIA1"
                      className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Descargar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {modalOpen && selectedFolleto && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-xl w-full h-full sm:h-auto sm:max-h-[95vh] sm:w-full sm:max-w-5xl flex flex-col shadow-2xl overflow-hidden">
            {/* Encabezado */}
            <div className="flex justify-between items-center bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-3">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white truncate">
                {selectedFolleto.titulo}
              </h3>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Contenido PDF */}
            <div className="flex-1 overflow-auto">
              <div className="w-full h-[calc(100vh-120px)] sm:h-auto sm:aspect-video">
                <iframe
                  src={selectedFolleto.flipLink}
                  title={selectedFolleto.titulo}
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Santa Cruz de la Sierra - Bolivia</p>
          <p className="mt-2">Información turística actualizada</p>
        </div>
      </footer>
    </div>
  );
};

export default Folletos;
